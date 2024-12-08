const pluginVersion = "11.1.11";
var QueryEditorMode = /* @__PURE__ */ ((QueryEditorMode2) => {
  QueryEditorMode2["Builder"] = "builder";
  QueryEditorMode2["Code"] = "code";
  return QueryEditorMode2;
})(QueryEditorMode || {});
var LokiQueryType = /* @__PURE__ */ ((LokiQueryType2) => {
  LokiQueryType2["Instant"] = "instant";
  LokiQueryType2["Range"] = "range";
  LokiQueryType2["Stream"] = "stream";
  return LokiQueryType2;
})(LokiQueryType || {});
var SupportingQueryType = /* @__PURE__ */ ((SupportingQueryType2) => {
  SupportingQueryType2["DataSample"] = "dataSample";
  SupportingQueryType2["InfiniteScroll"] = "infiniteScroll";
  SupportingQueryType2["LogsSample"] = "logsSample";
  SupportingQueryType2["LogsVolume"] = "logsVolume";
  return SupportingQueryType2;
})(SupportingQueryType || {});
var LokiQueryDirection = /* @__PURE__ */ ((LokiQueryDirection2) => {
  LokiQueryDirection2["Backward"] = "backward";
  LokiQueryDirection2["Forward"] = "forward";
  return LokiQueryDirection2;
})(LokiQueryDirection || {});

export { LokiQueryDirection, LokiQueryType, QueryEditorMode, SupportingQueryType, pluginVersion };
