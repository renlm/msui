const pluginVersion = "11.1.11";
const defaultMetricStat = {
  statistics: []
};
var MetricQueryType = /* @__PURE__ */ ((MetricQueryType2) => {
  MetricQueryType2[MetricQueryType2["Query"] = 1] = "Query";
  MetricQueryType2[MetricQueryType2["Search"] = 0] = "Search";
  return MetricQueryType2;
})(MetricQueryType || {});
var MetricEditorMode = /* @__PURE__ */ ((MetricEditorMode2) => {
  MetricEditorMode2[MetricEditorMode2["Builder"] = 0] = "Builder";
  MetricEditorMode2[MetricEditorMode2["Code"] = 1] = "Code";
  return MetricEditorMode2;
})(MetricEditorMode || {});
const defaultQueryEditorFunctionExpression = {
  parameters: []
};
var QueryEditorExpressionType = /* @__PURE__ */ ((QueryEditorExpressionType2) => {
  QueryEditorExpressionType2["And"] = "and";
  QueryEditorExpressionType2["Function"] = "function";
  QueryEditorExpressionType2["FunctionParameter"] = "functionParameter";
  QueryEditorExpressionType2["GroupBy"] = "groupBy";
  QueryEditorExpressionType2["Operator"] = "operator";
  QueryEditorExpressionType2["Or"] = "or";
  QueryEditorExpressionType2["Property"] = "property";
  return QueryEditorExpressionType2;
})(QueryEditorExpressionType || {});
var QueryEditorPropertyType = /* @__PURE__ */ ((QueryEditorPropertyType2) => {
  QueryEditorPropertyType2["String"] = "string";
  return QueryEditorPropertyType2;
})(QueryEditorPropertyType || {});
const defaultCloudWatchLogsQuery = {
  logGroupNames: [],
  logGroups: [],
  statsGroups: []
};

export { MetricEditorMode, MetricQueryType, QueryEditorExpressionType, QueryEditorPropertyType, defaultCloudWatchLogsQuery, defaultMetricStat, defaultQueryEditorFunctionExpression, pluginVersion };
