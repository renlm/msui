const pluginVersion = "11.1.11";
var PieChartType = /* @__PURE__ */ ((PieChartType2) => {
  PieChartType2["Donut"] = "donut";
  PieChartType2["Pie"] = "pie";
  return PieChartType2;
})(PieChartType || {});
var PieChartLabels = /* @__PURE__ */ ((PieChartLabels2) => {
  PieChartLabels2["Name"] = "name";
  PieChartLabels2["Percent"] = "percent";
  PieChartLabels2["Value"] = "value";
  return PieChartLabels2;
})(PieChartLabels || {});
var PieChartLegendValues = /* @__PURE__ */ ((PieChartLegendValues2) => {
  PieChartLegendValues2["Percent"] = "percent";
  PieChartLegendValues2["Value"] = "value";
  return PieChartLegendValues2;
})(PieChartLegendValues || {});
const defaultPieChartLegendOptions = {
  values: []
};
const defaultOptions = {
  displayLabels: []
};

export { PieChartLabels, PieChartLegendValues, PieChartType, defaultOptions, defaultPieChartLegendOptions, pluginVersion };
