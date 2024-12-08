var PrometheusCacheLevel = /* @__PURE__ */ ((PrometheusCacheLevel2) => {
  PrometheusCacheLevel2["Low"] = "Low";
  PrometheusCacheLevel2["Medium"] = "Medium";
  PrometheusCacheLevel2["High"] = "High";
  PrometheusCacheLevel2["None"] = "None";
  return PrometheusCacheLevel2;
})(PrometheusCacheLevel || {});
var PromApplication = /* @__PURE__ */ ((PromApplication2) => {
  PromApplication2["Cortex"] = "Cortex";
  PromApplication2["Mimir"] = "Mimir";
  PromApplication2["Prometheus"] = "Prometheus";
  PromApplication2["Thanos"] = "Thanos";
  return PromApplication2;
})(PromApplication || {});
var LegendFormatMode = /* @__PURE__ */ ((LegendFormatMode2) => {
  LegendFormatMode2["Auto"] = "__auto";
  LegendFormatMode2["Verbose"] = "__verbose";
  LegendFormatMode2["Custom"] = "__custom";
  return LegendFormatMode2;
})(LegendFormatMode || {});
var PromVariableQueryType = /* @__PURE__ */ ((PromVariableQueryType2) => {
  PromVariableQueryType2[PromVariableQueryType2["LabelNames"] = 0] = "LabelNames";
  PromVariableQueryType2[PromVariableQueryType2["LabelValues"] = 1] = "LabelValues";
  PromVariableQueryType2[PromVariableQueryType2["MetricNames"] = 2] = "MetricNames";
  PromVariableQueryType2[PromVariableQueryType2["VarQueryResult"] = 3] = "VarQueryResult";
  PromVariableQueryType2[PromVariableQueryType2["SeriesQuery"] = 4] = "SeriesQuery";
  PromVariableQueryType2[PromVariableQueryType2["ClassicQuery"] = 5] = "ClassicQuery";
  return PromVariableQueryType2;
})(PromVariableQueryType || {});

export { LegendFormatMode, PromApplication, PromVariableQueryType, PrometheusCacheLevel };
//# sourceMappingURL=types.js.map
