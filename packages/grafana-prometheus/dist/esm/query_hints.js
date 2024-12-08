import { size } from 'lodash';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const SUM_HINT_THRESHOLD_COUNT = 20;
function getQueryHints(query, series, datasource) {
  var _a;
  const hints = [];
  const metricsMetadata = (_a = datasource == null ? void 0 : datasource.languageProvider) == null ? void 0 : _a.metricsMetadata;
  const oldHistogramMetric = query.trim().match(/^\w+_bucket$|^\w+_bucket{.*}$/);
  if (oldHistogramMetric) {
    const label = "Selected metric has buckets.";
    hints.push({
      type: "HISTOGRAM_QUANTILE",
      label,
      fix: {
        label: "Consider calculating aggregated quantile by adding histogram_quantile().",
        action: {
          type: "ADD_HISTOGRAM_QUANTILE",
          query
        }
      }
    });
  } else if (metricsMetadata && simpleQueryCheck(query)) {
    const queryTokens = getQueryTokens(query);
    const { nameMetric } = checkMetricType(queryTokens, "histogram", metricsMetadata, false);
    const nativeHistogramNameMetric = nameMetric;
    if (nativeHistogramNameMetric) {
      const label = "Selected metric is a native histogram.";
      hints.push(
        {
          type: "HISTOGRAM_AVG",
          label,
          fix: {
            label: "Consider calculating the arithmetic average of observed values by adding histogram_avg().",
            action: {
              type: "ADD_HISTOGRAM_AVG",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_COUNT",
          label,
          fix: {
            label: "Consider calculating the count of observations by adding histogram_count().",
            action: {
              type: "ADD_HISTOGRAM_COUNT",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_SUM",
          label,
          fix: {
            label: "Consider calculating the sum of observations by adding histogram_sum().",
            action: {
              type: "ADD_HISTOGRAM_SUM",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_FRACTION",
          label,
          fix: {
            label: "Consider calculating the estimated fraction of observations between the provided lower and upper values by adding histogram_fraction().",
            action: {
              type: "ADD_HISTOGRAM_FRACTION",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_STDDEV",
          label,
          fix: {
            label: "Consider calculating the estimated standard deviation of observations by adding histogram_stddev().",
            action: {
              type: "ADD_HISTOGRAM_STDDEV",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_STDVAR",
          label,
          fix: {
            label: "Consider calculating the estimated standard variance of observations by adding histogram_stdvar().",
            action: {
              type: "ADD_HISTOGRAM_STDVAR",
              query
            }
          }
        }
      );
    }
  }
  if (query.indexOf("rate(") === -1 && query.indexOf("increase(") === -1) {
    const nameMatch = query.match(new RegExp("\\b((?<!:)\\w+_(total|sum|count)(?!:))\\b"));
    let counterNameMetric = nameMatch ? nameMatch[1] : "";
    let certain = false;
    if (metricsMetadata) {
      const queryTokens = getQueryTokens(query);
      const metricTypeChecked = checkMetricType(queryTokens, "counter", metricsMetadata, certain);
      counterNameMetric = metricTypeChecked.nameMetric;
      certain = metricTypeChecked.certain;
    }
    if (counterNameMetric) {
      const fixableQuery = simpleQueryCheck(query);
      const verb = certain ? "is" : "looks like";
      let label = `Selected metric ${verb} a counter.`;
      let fix;
      if (fixableQuery) {
        fix = {
          label: "Consider calculating rate of counter by adding rate().",
          action: {
            type: "ADD_RATE",
            query
          }
        };
      } else {
        label = `${label} Consider calculating rate of counter by adding rate().`;
      }
      hints.push({
        type: "APPLY_RATE",
        label,
        fix
      });
    }
  }
  if (datasource && datasource.ruleMappings) {
    const mapping = datasource.ruleMappings;
    const mappingForQuery = Object.keys(mapping).reduce((acc, ruleName) => {
      if (query.search(ruleName) > -1) {
        return __spreadProps(__spreadValues({}, acc), {
          [ruleName]: mapping[ruleName]
        });
      }
      return acc;
    }, {});
    if (size(mappingForQuery) > 0) {
      const label = "Query contains recording rules.";
      hints.push({
        type: "EXPAND_RULES",
        label,
        fix: {
          label: "Expand rules",
          action: {
            type: "EXPAND_RULES",
            query,
            options: mappingForQuery
          }
        }
      });
    }
  }
  if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
    const simpleMetric = query.trim().match(/^\w+$/);
    if (simpleMetric) {
      hints.push({
        type: "ADD_SUM",
        label: "Many time series results returned.",
        fix: {
          label: "Consider aggregating with sum().",
          action: {
            type: "ADD_SUM",
            query,
            preventSubmit: true
          }
        }
      });
    }
  }
  return hints;
}
function getInitHints(datasource) {
  const hints = [];
  if (datasource.lookupsDisabled) {
    hints.push({
      label: `Labels and metrics lookup was disabled in data source settings.`,
      type: "INFO"
    });
  }
  return hints;
}
function getQueryTokens(query) {
  return Array.from(query.matchAll(/\$?[a-zA-Z_:][a-zA-Z0-9_:]*/g)).map(([match]) => match).filter((token) => !token.startsWith("$")).flatMap((token) => token.split(":"));
}
function checkMetricType(queryTokens, metricType, metricsMetadata, certain) {
  var _a;
  const nameMetric = (_a = queryTokens.find((metricName) => {
    const metadata = metricsMetadata[metricName];
    if (metadata && metadata.type.toLowerCase() === metricType) {
      certain = true;
      return true;
    } else {
      return false;
    }
  })) != null ? _a : "";
  return { nameMetric, certain };
}
function simpleQueryCheck(query) {
  return query.trim().match(/^\w+$|^\w+{.*}$/);
}

export { SUM_HINT_THRESHOLD_COUNT, getInitHints, getQueryHints };
//# sourceMappingURL=query_hints.js.map
