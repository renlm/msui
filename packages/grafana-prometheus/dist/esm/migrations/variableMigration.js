import { promQueryModeller } from '../querybuilder/PromQueryModeller.js';
import { buildVisualQueryFromString } from '../querybuilder/parsing.js';
import { PromVariableQueryType } from '../types.js';

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
const PrometheusLabelNamesRegex = /^label_names\(\)\s*$/;
const PrometheusLabelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_$][a-zA-Z0-9_]*)\)\s*$/;
const PrometheusMetricNamesRegex = /^metrics\((.+)\)\s*$/;
const PrometheusQueryResultRegex = /^query_result\((.+)\)\s*$/;
const PrometheusLabelNamesRegexWithMatch = /^label_names\((.+)\)\s*$/;
function migrateVariableQueryToEditor(rawQuery) {
  if (typeof rawQuery !== "string") {
    return rawQuery;
  }
  const queryBase = {
    refId: "PrometheusDatasource-VariableQuery",
    qryType: PromVariableQueryType.LabelNames
  };
  const labelNamesMatchQuery = rawQuery.match(PrometheusLabelNamesRegexWithMatch);
  if (labelNamesMatchQuery) {
    return __spreadProps(__spreadValues({}, queryBase), {
      qryType: PromVariableQueryType.LabelNames,
      match: labelNamesMatchQuery[1]
    });
  }
  const labelNames = rawQuery.match(PrometheusLabelNamesRegex);
  if (labelNames) {
    return __spreadProps(__spreadValues({}, queryBase), {
      qryType: PromVariableQueryType.LabelNames
    });
  }
  const labelValuesCheck = rawQuery.match(/^label_values\(/);
  if (labelValuesCheck) {
    const labelValues = rawQuery.match(PrometheusLabelValuesRegex);
    const label = labelValues ? labelValues[2] : "";
    const metric = labelValues ? labelValues[1] : "";
    if (metric) {
      const visQuery = buildVisualQueryFromString(metric);
      return __spreadProps(__spreadValues({}, queryBase), {
        qryType: PromVariableQueryType.LabelValues,
        label,
        metric: visQuery.query.metric,
        labelFilters: visQuery.query.labels
      });
    } else {
      return __spreadProps(__spreadValues({}, queryBase), {
        qryType: PromVariableQueryType.LabelValues,
        label
      });
    }
  }
  const metricNamesCheck = rawQuery.match(/^metrics\(/);
  if (metricNamesCheck) {
    const metricNames = rawQuery.match(PrometheusMetricNamesRegex);
    const metric = metricNames ? metricNames[1] : "";
    return __spreadProps(__spreadValues({}, queryBase), {
      qryType: PromVariableQueryType.MetricNames,
      metric
    });
  }
  const queryResultCheck = rawQuery.match(/^query_result\(/);
  if (queryResultCheck) {
    const queryResult = rawQuery.match(PrometheusQueryResultRegex);
    const varQuery = queryResult ? queryResult[1] : "";
    return __spreadProps(__spreadValues({}, queryBase), {
      qryType: PromVariableQueryType.VarQueryResult,
      varQuery
    });
  }
  if (!labelNames && !labelValuesCheck && !metricNamesCheck && !queryResultCheck) {
    return __spreadProps(__spreadValues({}, queryBase), {
      qryType: PromVariableQueryType.SeriesQuery,
      seriesQuery: rawQuery
    });
  }
  return queryBase;
}
function migrateVariableEditorBackToVariableSupport(QueryVariable) {
  var _a, _b, _c;
  switch (QueryVariable.qryType) {
    case PromVariableQueryType.LabelNames:
      if (QueryVariable.match) {
        return `label_names(${QueryVariable.match})`;
      }
      return "label_names()";
    case PromVariableQueryType.LabelValues:
      if (QueryVariable.metric || QueryVariable.labelFilters && QueryVariable.labelFilters.length !== 0) {
        const visualQueryQuery = {
          metric: QueryVariable.metric,
          labels: (_a = QueryVariable.labelFilters) != null ? _a : [],
          operations: []
        };
        const metric = promQueryModeller.renderQuery(visualQueryQuery);
        return `label_values(${metric},${QueryVariable.label})`;
      } else {
        return `label_values(${QueryVariable.label})`;
      }
    case PromVariableQueryType.MetricNames:
      return `metrics(${QueryVariable.metric})`;
    case PromVariableQueryType.VarQueryResult:
      const varQuery = removeLineBreaks(QueryVariable.varQuery);
      return `query_result(${varQuery})`;
    case PromVariableQueryType.SeriesQuery:
      return (_b = QueryVariable.seriesQuery) != null ? _b : "";
    case PromVariableQueryType.ClassicQuery:
      return (_c = QueryVariable.classicQuery) != null ? _c : "";
  }
  return "";
}
function removeLineBreaks(input) {
  return input ? input.replace(/[\r\n]+/gm, "") : "";
}

export { PrometheusLabelNamesRegex, PrometheusLabelNamesRegexWithMatch, PrometheusLabelValuesRegex, PrometheusMetricNamesRegex, PrometheusQueryResultRegex, migrateVariableEditorBackToVariableSupport, migrateVariableQueryToEditor };
//# sourceMappingURL=variableMigration.js.map
