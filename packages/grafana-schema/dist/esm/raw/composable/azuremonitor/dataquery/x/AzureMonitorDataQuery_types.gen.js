const pluginVersion = "%VERSION%";
const defaultAzureMonitorQuery = {
  subscriptions: []
};
var AzureQueryType = /* @__PURE__ */ ((AzureQueryType2) => {
  AzureQueryType2["AzureMonitor"] = "Azure Monitor";
  AzureQueryType2["AzureResourceGraph"] = "Azure Resource Graph";
  AzureQueryType2["AzureTraces"] = "Azure Traces";
  AzureQueryType2["GrafanaTemplateVariableFn"] = "Grafana Template Variable Function";
  AzureQueryType2["LocationsQuery"] = "Azure Regions";
  AzureQueryType2["LogAnalytics"] = "Azure Log Analytics";
  AzureQueryType2["MetricNamesQuery"] = "Azure Metric Names";
  AzureQueryType2["NamespacesQuery"] = "Azure Namespaces";
  AzureQueryType2["ResourceGroupsQuery"] = "Azure Resource Groups";
  AzureQueryType2["ResourceNamesQuery"] = "Azure Resource Names";
  AzureQueryType2["SubscriptionsQuery"] = "Azure Subscriptions";
  AzureQueryType2["TraceExemplar"] = "traceql";
  AzureQueryType2["WorkspacesQuery"] = "Azure Workspaces";
  return AzureQueryType2;
})(AzureQueryType || {});
const defaultAzureMetricQuery = {
  allowedTimeGrainsMs: [],
  dimensionFilters: [],
  resources: []
};
const defaultAzureLogsQuery = {
  resources: []
};
const defaultAzureTracesQuery = {
  filters: [],
  resources: [],
  traceTypes: []
};
const defaultAzureTracesFilter = {
  filters: []
};
var ResultFormat = /* @__PURE__ */ ((ResultFormat2) => {
  ResultFormat2["Logs"] = "logs";
  ResultFormat2["Table"] = "table";
  ResultFormat2["TimeSeries"] = "time_series";
  ResultFormat2["Trace"] = "trace";
  return ResultFormat2;
})(ResultFormat || {});
const defaultAzureMetricDimension = {
  filters: []
};

export { AzureQueryType, ResultFormat, defaultAzureLogsQuery, defaultAzureMetricDimension, defaultAzureMetricQuery, defaultAzureMonitorQuery, defaultAzureTracesFilter, defaultAzureTracesQuery, pluginVersion };
