import { partition, groupBy, forOwn, flatten } from 'lodash';
import { getFieldDisplayName, DataTopic, FieldType, TIME_SERIES_TIME_FIELD_NAME, getDisplayProcessor, TIME_SERIES_VALUE_FIELD_NAME, DataFrameType, CoreApp } from '@grafana/data';
import { config, getDataSourceSrv } from '@grafana/runtime';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const INFINITY_SAMPLE_REGEX = /^[+-]?inf(?:inity)?$/i;
const isTableResult = (dataFrame, options) => {
  var _a, _b, _c, _d;
  if (options.app === CoreApp.Explore && (((_b = (_a = dataFrame.meta) == null ? void 0 : _a.custom) == null ? void 0 : _b.resultType) === "vector" || ((_d = (_c = dataFrame.meta) == null ? void 0 : _c.custom) == null ? void 0 : _d.resultType) === "scalar")) {
    return true;
  }
  const target = options.targets.find((target2) => target2.refId === dataFrame.refId);
  return (target == null ? void 0 : target.format) === "table";
};
const isCumulativeHeatmapResult = (dataFrame, options) => {
  var _a;
  if (((_a = dataFrame.meta) == null ? void 0 : _a.type) === DataFrameType.HeatmapCells) {
    return false;
  }
  const target = options.targets.find((target2) => target2.refId === dataFrame.refId);
  return (target == null ? void 0 : target.format) === "heatmap";
};
function transformV2(response, request, options) {
  if (config.featureToggles.prometheusDataplane) {
    response.data.forEach((f) => {
      const target = request.targets.find((t) => t.refId === f.refId);
      if (target && target.legendFormat === "__auto") {
        f.fields.forEach((field) => {
          var _a, _b;
          if (((_a = field.labels) == null ? void 0 : _a.__name__) && ((_b = field.labels) == null ? void 0 : _b.__name__) === field.name) {
            const fieldCopy = __spreadProps(__spreadValues({}, field), { name: TIME_SERIES_VALUE_FIELD_NAME });
            field.config.displayNameFromDS = getFieldDisplayName(fieldCopy, f, response.data);
          }
        });
      }
    });
  }
  const [tableFrames, framesWithoutTable] = partition(response.data, (df) => isTableResult(df, request));
  const processedTableFrames = transformDFToTable(tableFrames);
  const [exemplarFrames, framesWithoutTableAndExemplars] = partition(
    framesWithoutTable,
    (df) => {
      var _a, _b;
      return ((_b = (_a = df.meta) == null ? void 0 : _a.custom) == null ? void 0 : _b.resultType) === "exemplar";
    }
  );
  const { exemplarTraceIdDestinations: destinations } = options;
  const processedExemplarFrames = exemplarFrames.map((dataFrame) => {
    var _a;
    if (destinations == null ? void 0 : destinations.length) {
      for (const exemplarTraceIdDestination of destinations) {
        const traceIDField = dataFrame.fields.find((field) => field.name === exemplarTraceIdDestination.name);
        if (traceIDField) {
          const links = getDataLinks(exemplarTraceIdDestination);
          traceIDField.config.links = ((_a = traceIDField.config.links) == null ? void 0 : _a.length) ? [...traceIDField.config.links, ...links] : links;
        }
      }
    }
    return __spreadProps(__spreadValues({}, dataFrame), { meta: __spreadProps(__spreadValues({}, dataFrame.meta), { dataTopic: DataTopic.Annotations }) });
  });
  const [heatmapResults, framesWithoutTableHeatmapsAndExemplars] = partition(
    framesWithoutTableAndExemplars,
    (df) => isCumulativeHeatmapResult(df, request)
  );
  heatmapResults.forEach((df) => {
    var _a;
    if (df.name == null) {
      let f = df.fields.find((f2) => f2.type === FieldType.number);
      if (f) {
        let le = (_a = f.labels) == null ? void 0 : _a.le;
        if (le) {
          df.name = le;
          f.config.displayNameFromDS = le;
        }
      }
    }
  });
  const heatmapResultsGroupedByQuery = groupBy(heatmapResults, (h) => h.refId);
  let processedHeatmapResultsGroupedByQuery = [];
  for (const query in heatmapResultsGroupedByQuery) {
    const heatmapResultsGroup = heatmapResultsGroupedByQuery[query];
    const heatmapResultsGroupedByValues = groupBy(heatmapResultsGroup, (dataFrame) => {
      var _b;
      const values = dataFrame.fields.find((field) => field.type === FieldType.number);
      if ((values == null ? void 0 : values.labels) && HISTOGRAM_QUANTILE_LABEL_NAME in values.labels) {
        const _a = values == null ? void 0 : values.labels, notLE = __objRest(_a, ["le"]);
        return Object.values(notLE).join();
      }
      return Object.values((_b = values == null ? void 0 : values.labels) != null ? _b : []).join();
    });
    forOwn(heatmapResultsGroupedByValues, (dataFrames, key) => {
      const sortedHeatmap = dataFrames.sort(sortSeriesByLabel);
      processedHeatmapResultsGroupedByQuery.push(mergeHeatmapFrames(transformToHistogramOverTime(sortedHeatmap)));
    });
  }
  const otherFrames = framesWithoutTableHeatmapsAndExemplars.map((dataFrame) => {
    const df = __spreadProps(__spreadValues({}, dataFrame), {
      meta: __spreadProps(__spreadValues({}, dataFrame.meta), {
        preferredVisualisationType: "graph"
      })
    });
    return df;
  });
  const flattenedProcessedHeatmapFrames = flatten(processedHeatmapResultsGroupedByQuery);
  return __spreadProps(__spreadValues({}, response), {
    data: [...otherFrames, ...processedTableFrames, ...flattenedProcessedHeatmapFrames, ...processedExemplarFrames]
  });
}
const HISTOGRAM_QUANTILE_LABEL_NAME = "le";
function transformDFToTable(dfs) {
  if (dfs.length === 0 || dfs.length === 1 && dfs[0].length === 0) {
    return dfs;
  }
  const dataFramesByRefId = groupBy(dfs, "refId");
  const refIds = Object.keys(dataFramesByRefId);
  const frames = refIds.map((refId) => {
    const valueText = getValueText(refIds.length, refId);
    const valueField = getValueField({ data: [], valueName: valueText });
    const timeField = getTimeField([]);
    const labelFields = [];
    dataFramesByRefId[refId].forEach((df) => {
      var _a;
      const frameValueField = df.fields[1];
      const promLabels = (_a = frameValueField == null ? void 0 : frameValueField.labels) != null ? _a : {};
      Object.keys(promLabels).sort().forEach((label) => {
        if (!labelFields.some((l) => l.name === label)) {
          const numberField = label === HISTOGRAM_QUANTILE_LABEL_NAME;
          labelFields.push({
            name: label,
            config: { filterable: true },
            type: numberField ? FieldType.number : FieldType.string,
            values: []
          });
        }
      });
    });
    dataFramesByRefId[refId].forEach((df) => {
      var _a, _b, _c, _d;
      const timeFields = (_b = (_a = df.fields[0]) == null ? void 0 : _a.values) != null ? _b : [];
      const dataFields = (_d = (_c = df.fields[1]) == null ? void 0 : _c.values) != null ? _d : [];
      timeFields.forEach((value) => timeField.values.push(value));
      dataFields.forEach((value) => {
        var _a2;
        valueField.values.push(parseSampleValue(value));
        const labelsForField = (_a2 = df.fields[1].labels) != null ? _a2 : {};
        labelFields.forEach((field) => field.values.push(getLabelValue(labelsForField, field.name)));
      });
    });
    const fields = [timeField, ...labelFields, valueField];
    return {
      refId,
      fields,
      // Prometheus specific UI for instant queries
      meta: __spreadProps(__spreadValues({}, dataFramesByRefId[refId][0].meta), {
        preferredVisualisationType: "rawPrometheus"
      }),
      length: timeField.values.length
    };
  });
  return frames;
}
function getValueText(responseLength, refId = "") {
  return responseLength > 1 ? `Value #${refId}` : "Value";
}
function getDataLinks(options) {
  var _a;
  const dataLinks = [];
  if (options.datasourceUid) {
    const dataSourceSrv = getDataSourceSrv();
    const dsSettings = dataSourceSrv.getInstanceSettings(options.datasourceUid);
    if (dsSettings) {
      dataLinks.push({
        title: options.urlDisplayLabel || `Query with ${dsSettings == null ? void 0 : dsSettings.name}`,
        url: "",
        internal: {
          query: { query: "${__value.raw}", queryType: "traceql" },
          datasourceUid: options.datasourceUid,
          datasourceName: (_a = dsSettings == null ? void 0 : dsSettings.name) != null ? _a : "Data source not found"
        }
      });
    }
  }
  if (options.url) {
    dataLinks.push({
      title: options.urlDisplayLabel || `Go to ${options.url}`,
      url: options.url,
      targetBlank: true
    });
  }
  return dataLinks;
}
function getLabelValue(metric, label) {
  if (metric.hasOwnProperty(label)) {
    if (label === HISTOGRAM_QUANTILE_LABEL_NAME) {
      return parseSampleValue(metric[label]);
    }
    return metric[label];
  }
  return "";
}
function getTimeField(data, isMs = false) {
  return {
    name: TIME_SERIES_TIME_FIELD_NAME,
    type: FieldType.time,
    config: {},
    values: data.map((val) => isMs ? val[0] : val[0] * 1e3)
  };
}
function getValueField({
  data,
  valueName = TIME_SERIES_VALUE_FIELD_NAME,
  parseValue = true,
  labels,
  displayNameFromDS
}) {
  return {
    name: valueName,
    type: FieldType.number,
    display: getDisplayProcessor(),
    config: {
      displayNameFromDS
    },
    labels,
    values: data.map((val) => parseValue ? parseSampleValue(val[1]) : val[1])
  };
}
function getOriginalMetricName(labelData) {
  const metricName = labelData.__name__ || "";
  delete labelData.__name__;
  const labelPart = Object.entries(labelData).map((label) => `${label[0]}="${label[1]}"`).join(",");
  return `${metricName}{${labelPart}}`;
}
function mergeHeatmapFrames(frames) {
  if (frames.length === 0 || frames.length === 1 && frames[0].length === 0) {
    return [];
  }
  const timeField = frames[0].fields.find((field) => field.type === FieldType.time);
  const countFields = frames.map((frame) => {
    let field = frame.fields.find((field2) => field2.type === FieldType.number);
    return __spreadProps(__spreadValues({}, field), {
      name: field.config.displayNameFromDS
    });
  });
  return [
    __spreadProps(__spreadValues({}, frames[0]), {
      meta: __spreadProps(__spreadValues({}, frames[0].meta), {
        type: DataFrameType.HeatmapRows
      }),
      fields: [timeField, ...countFields]
    })
  ];
}
function transformToHistogramOverTime(seriesList) {
  for (let i = seriesList.length - 1; i > 0; i--) {
    const topSeries = seriesList[i].fields.find((s) => s.type === FieldType.number);
    const bottomSeries = seriesList[i - 1].fields.find((s) => s.type === FieldType.number);
    if (!topSeries || !bottomSeries) {
      throw new Error("Prometheus heatmap transform error: data should be a time series");
    }
    for (let j = 0; j < topSeries.values.length; j++) {
      const bottomPoint = bottomSeries.values[j] || [0];
      topSeries.values[j] -= bottomPoint;
      if (topSeries.values[j] < 1e-9) {
        topSeries.values[j] = 0;
      }
    }
  }
  return seriesList;
}
function sortSeriesByLabel(s1, s2) {
  var _a, _b, _c, _d, _e, _f;
  let le1, le2;
  try {
    le1 = parseSampleValue((_c = (_b = (_a = s1.fields[1].state) == null ? void 0 : _a.displayName) != null ? _b : s1.name) != null ? _c : s1.fields[1].name);
    le2 = parseSampleValue((_f = (_e = (_d = s2.fields[1].state) == null ? void 0 : _d.displayName) != null ? _e : s2.name) != null ? _f : s2.fields[1].name);
  } catch (err) {
    console.error(err);
    return 0;
  }
  if (le1 > le2) {
    return 1;
  }
  if (le1 < le2) {
    return -1;
  }
  return 0;
}
function parseSampleValue(value) {
  if (INFINITY_SAMPLE_REGEX.test(value)) {
    return value[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  return parseFloat(value);
}

export { getOriginalMetricName, parseSampleValue, sortSeriesByLabel, transformDFToTable, transformToHistogramOverTime, transformV2 };
//# sourceMappingURL=result_transformer.js.map
