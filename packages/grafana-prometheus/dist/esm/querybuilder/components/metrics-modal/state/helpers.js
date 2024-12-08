import { reportInteraction } from '@grafana/runtime';
import { getMetadataType, getMetadataHelp } from '../../../../language_provider.js';
import { regexifyLabelValuesQueryString } from '../../../parsingUtils.js';
import { setFilteredMetricCount } from '../MetricsModal.js';

async function setMetrics(datasource, query, initialMetrics) {
  var _a, _b;
  let hasMetadata = true;
  const metadata = datasource.languageProvider.metricsMetadata;
  if (metadata && Object.keys(metadata).length === 0) {
    hasMetadata = false;
  }
  let nameHaystackDictionaryData = {};
  let metaHaystackDictionaryData = {};
  let metricsData;
  metricsData = initialMetrics == null ? void 0 : initialMetrics.map((m) => {
    const metricData = buildMetricData(m, datasource);
    const metaDataString = `${m}\xA6${metricData.description}`;
    nameHaystackDictionaryData[m] = metricData;
    metaHaystackDictionaryData[metaDataString] = metricData;
    return metricData;
  });
  return {
    isLoading: false,
    hasMetadata,
    metrics: metricsData != null ? metricsData : [],
    metaHaystackDictionary: metaHaystackDictionaryData,
    nameHaystackDictionary: nameHaystackDictionaryData,
    totalMetricCount: (_a = metricsData == null ? void 0 : metricsData.length) != null ? _a : 0,
    filteredMetricCount: (_b = metricsData == null ? void 0 : metricsData.length) != null ? _b : 0
  };
}
function buildMetricData(metric, datasource) {
  let type = getMetadataType(metric, datasource.languageProvider.metricsMetadata);
  const description = getMetadataHelp(metric, datasource.languageProvider.metricsMetadata);
  ["histogram", "summary"].forEach((t) => {
    if ((description == null ? void 0 : description.toLowerCase().includes(t)) && type !== t) {
      type += ` (${t})`;
    }
  });
  const oldHistogramMatch = metric.match(/^\w+_bucket$|^\w+_bucket{.*}$/);
  if (type === "histogram" && !oldHistogramMatch) {
    type = "native histogram";
  }
  const metricData = {
    value: metric,
    type,
    description
  };
  return metricData;
}
function displayedMetrics(state, dispatch) {
  const filteredSorted = filterMetrics(state);
  if (!state.isLoading && state.filteredMetricCount !== filteredSorted.length) {
    dispatch(setFilteredMetricCount(filteredSorted.length));
  }
  return sliceMetrics(filteredSorted, state.pageNum, state.resultsPerPage);
}
function filterMetrics(state) {
  let filteredMetrics = state.metrics;
  if (state.fuzzySearchQuery && !state.useBackend) {
    if (state.fullMetaSearch) {
      filteredMetrics = state.metaHaystackOrder.map((needle) => state.metaHaystackDictionary[needle]);
    } else {
      filteredMetrics = state.nameHaystackOrder.map((needle) => state.nameHaystackDictionary[needle]);
    }
  }
  if (state.selectedTypes.length > 0) {
    filteredMetrics = filteredMetrics.filter((m, idx) => {
      const matchesSelectedType = state.selectedTypes.some((t) => {
        if (m.type && t.value) {
          return m.type.includes(t.value);
        }
        if (!m.type && t.value === "no type") {
          return true;
        }
        return false;
      });
      return matchesSelectedType;
    });
  }
  if (!state.includeNullMetadata) {
    filteredMetrics = filteredMetrics.filter((m) => {
      return m.type !== void 0 && m.description !== void 0;
    });
  }
  return filteredMetrics;
}
function calculatePageList(state) {
  if (!state.metrics.length) {
    return [];
  }
  const calcResultsPerPage = state.resultsPerPage === 0 ? 1 : state.resultsPerPage;
  const pages = Math.floor(filterMetrics(state).length / calcResultsPerPage) + 1;
  return [...Array(pages).keys()].map((i) => i + 1);
}
function sliceMetrics(metrics, pageNum, resultsPerPage) {
  const calcResultsPerPage = resultsPerPage === 0 ? 1 : resultsPerPage;
  const start = pageNum === 1 ? 0 : (pageNum - 1) * calcResultsPerPage;
  const end = start + calcResultsPerPage;
  return metrics.slice(start, end);
}
const calculateResultsPerPage = (results, defaultResults, max) => {
  if (results < 1) {
    return 1;
  }
  if (results > max) {
    return max;
  }
  return results != null ? results : defaultResults;
};
async function getBackendSearchMetrics(metricText, labels, datasource) {
  const queryString = regexifyLabelValuesQueryString(metricText);
  const labelsParams = labels.map((label) => {
    return `,${label.label}="${label.value}"`;
  });
  const params = `label_values({__name__=~".*${queryString}"${labels ? labelsParams.join() : ""}},__name__)`;
  const results = datasource.metricFindQuery(params);
  return await results.then((results2) => {
    return results2.map((result) => buildMetricData(result.text, datasource));
  });
}
function tracking(event, state, metric, query) {
  switch (event) {
    case "grafana_prom_metric_encycopedia_tracking":
      reportInteraction(event, {
        metric,
        hasMetadata: state == null ? void 0 : state.hasMetadata,
        totalMetricCount: state == null ? void 0 : state.totalMetricCount,
        fuzzySearchQuery: state == null ? void 0 : state.fuzzySearchQuery,
        fullMetaSearch: state == null ? void 0 : state.fullMetaSearch,
        selectedTypes: state == null ? void 0 : state.selectedTypes,
        useRegexSearch: state == null ? void 0 : state.useBackend,
        includeResultsWithoutMetadata: state == null ? void 0 : state.includeNullMetadata
      });
    case "grafana_prom_metric_encycopedia_disable_text_wrap_interaction":
      reportInteraction(event, {
        disableTextWrap: state == null ? void 0 : state.disableTextWrap
      });
    case "grafana_prometheus_metric_encyclopedia_open":
      reportInteraction(event, {
        query
      });
  }
}
const promTypes = [
  {
    value: "counter",
    description: "A cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart."
  },
  {
    value: "gauge",
    description: "A metric that represents a single numerical value that can arbitrarily go up and down."
  },
  {
    value: "histogram",
    description: "A histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets."
  },
  {
    value: "native histogram",
    description: "Native histograms are different from classic Prometheus histograms in a number of ways: Native histogram bucket boundaries are calculated by a formula that depends on the scale (resolution) of the native histogram, and are not user defined."
  },
  {
    value: "summary",
    description: "A summary samples observations (usually things like request durations and response sizes) and can calculate configurable quantiles over a sliding time window."
  },
  {
    value: "unknown",
    description: "These metrics have been given the type unknown in the metadata."
  },
  {
    value: "no type",
    description: "These metrics have no defined type in the metadata."
  }
];
const placeholders = {
  browse: "Search metrics by name",
  metadataSearchSwitch: "Include description in search",
  type: "Filter by type",
  includeNullMetadata: "Include results with no metadata",
  setUseBackend: "Enable regex search"
};

export { calculatePageList, calculateResultsPerPage, displayedMetrics, filterMetrics, getBackendSearchMetrics, placeholders, promTypes, setMetrics, sliceMetrics, tracking };
//# sourceMappingURL=helpers.js.map
