var DataTopic = /* @__PURE__ */ ((DataTopic2) => {
  DataTopic2["AlertStates"] = "alertStates";
  DataTopic2["Annotations"] = "annotations";
  DataTopic2["Series"] = "series";
  return DataTopic2;
})(DataTopic || {});
var ScaleDimensionMode = /* @__PURE__ */ ((ScaleDimensionMode2) => {
  ScaleDimensionMode2["Linear"] = "linear";
  ScaleDimensionMode2["Quad"] = "quad";
  return ScaleDimensionMode2;
})(ScaleDimensionMode || {});
var ScalarDimensionMode = /* @__PURE__ */ ((ScalarDimensionMode2) => {
  ScalarDimensionMode2["Clamped"] = "clamped";
  ScalarDimensionMode2["Mod"] = "mod";
  return ScalarDimensionMode2;
})(ScalarDimensionMode || {});
var TextDimensionMode = /* @__PURE__ */ ((TextDimensionMode2) => {
  TextDimensionMode2["Field"] = "field";
  TextDimensionMode2["Fixed"] = "fixed";
  TextDimensionMode2["Template"] = "template";
  return TextDimensionMode2;
})(TextDimensionMode || {});
var ResourceDimensionMode = /* @__PURE__ */ ((ResourceDimensionMode2) => {
  ResourceDimensionMode2["Field"] = "field";
  ResourceDimensionMode2["Fixed"] = "fixed";
  ResourceDimensionMode2["Mapping"] = "mapping";
  return ResourceDimensionMode2;
})(ResourceDimensionMode || {});
var FrameGeometrySourceMode = /* @__PURE__ */ ((FrameGeometrySourceMode2) => {
  FrameGeometrySourceMode2["Auto"] = "auto";
  FrameGeometrySourceMode2["Coords"] = "coords";
  FrameGeometrySourceMode2["Geohash"] = "geohash";
  FrameGeometrySourceMode2["Lookup"] = "lookup";
  return FrameGeometrySourceMode2;
})(FrameGeometrySourceMode || {});
var HeatmapCalculationMode = /* @__PURE__ */ ((HeatmapCalculationMode2) => {
  HeatmapCalculationMode2["Count"] = "count";
  HeatmapCalculationMode2["Size"] = "size";
  return HeatmapCalculationMode2;
})(HeatmapCalculationMode || {});
var HeatmapCellLayout = /* @__PURE__ */ ((HeatmapCellLayout2) => {
  HeatmapCellLayout2["auto"] = "auto";
  HeatmapCellLayout2["ge"] = "ge";
  HeatmapCellLayout2["le"] = "le";
  HeatmapCellLayout2["unknown"] = "unknown";
  return HeatmapCellLayout2;
})(HeatmapCellLayout || {});
var LogsSortOrder = /* @__PURE__ */ ((LogsSortOrder2) => {
  LogsSortOrder2["Ascending"] = "Ascending";
  LogsSortOrder2["Descending"] = "Descending";
  return LogsSortOrder2;
})(LogsSortOrder || {});
var AxisPlacement = /* @__PURE__ */ ((AxisPlacement2) => {
  AxisPlacement2["Auto"] = "auto";
  AxisPlacement2["Bottom"] = "bottom";
  AxisPlacement2["Hidden"] = "hidden";
  AxisPlacement2["Left"] = "left";
  AxisPlacement2["Right"] = "right";
  AxisPlacement2["Top"] = "top";
  return AxisPlacement2;
})(AxisPlacement || {});
var AxisColorMode = /* @__PURE__ */ ((AxisColorMode2) => {
  AxisColorMode2["Series"] = "series";
  AxisColorMode2["Text"] = "text";
  return AxisColorMode2;
})(AxisColorMode || {});
var VisibilityMode = /* @__PURE__ */ ((VisibilityMode2) => {
  VisibilityMode2["Always"] = "always";
  VisibilityMode2["Auto"] = "auto";
  VisibilityMode2["Never"] = "never";
  return VisibilityMode2;
})(VisibilityMode || {});
var GraphDrawStyle = /* @__PURE__ */ ((GraphDrawStyle2) => {
  GraphDrawStyle2["Bars"] = "bars";
  GraphDrawStyle2["Line"] = "line";
  GraphDrawStyle2["Points"] = "points";
  return GraphDrawStyle2;
})(GraphDrawStyle || {});
var GraphTransform = /* @__PURE__ */ ((GraphTransform2) => {
  GraphTransform2["Constant"] = "constant";
  GraphTransform2["NegativeY"] = "negative-Y";
  return GraphTransform2;
})(GraphTransform || {});
var LineInterpolation = /* @__PURE__ */ ((LineInterpolation2) => {
  LineInterpolation2["Linear"] = "linear";
  LineInterpolation2["Smooth"] = "smooth";
  LineInterpolation2["StepAfter"] = "stepAfter";
  LineInterpolation2["StepBefore"] = "stepBefore";
  return LineInterpolation2;
})(LineInterpolation || {});
var ScaleDistribution = /* @__PURE__ */ ((ScaleDistribution2) => {
  ScaleDistribution2["Linear"] = "linear";
  ScaleDistribution2["Log"] = "log";
  ScaleDistribution2["Ordinal"] = "ordinal";
  ScaleDistribution2["Symlog"] = "symlog";
  return ScaleDistribution2;
})(ScaleDistribution || {});
var GraphGradientMode = /* @__PURE__ */ ((GraphGradientMode2) => {
  GraphGradientMode2["Hue"] = "hue";
  GraphGradientMode2["None"] = "none";
  GraphGradientMode2["Opacity"] = "opacity";
  GraphGradientMode2["Scheme"] = "scheme";
  return GraphGradientMode2;
})(GraphGradientMode || {});
var StackingMode = /* @__PURE__ */ ((StackingMode2) => {
  StackingMode2["None"] = "none";
  StackingMode2["Normal"] = "normal";
  StackingMode2["Percent"] = "percent";
  return StackingMode2;
})(StackingMode || {});
var BarAlignment = /* @__PURE__ */ ((BarAlignment2) => {
  BarAlignment2[BarAlignment2["After"] = 1] = "After";
  BarAlignment2[BarAlignment2["Before"] = -1] = "Before";
  BarAlignment2[BarAlignment2["Center"] = 0] = "Center";
  return BarAlignment2;
})(BarAlignment || {});
var ScaleOrientation = /* @__PURE__ */ ((ScaleOrientation2) => {
  ScaleOrientation2[ScaleOrientation2["Horizontal"] = 0] = "Horizontal";
  ScaleOrientation2[ScaleOrientation2["Vertical"] = 1] = "Vertical";
  return ScaleOrientation2;
})(ScaleOrientation || {});
var ScaleDirection = /* @__PURE__ */ ((ScaleDirection2) => {
  ScaleDirection2[ScaleDirection2["Down"] = -1] = "Down";
  ScaleDirection2[ScaleDirection2["Left"] = -1] = "Left";
  ScaleDirection2[ScaleDirection2["Right"] = 1] = "Right";
  ScaleDirection2[ScaleDirection2["Up"] = 1] = "Up";
  return ScaleDirection2;
})(ScaleDirection || {});
const defaultLineStyle = {
  dash: []
};
var GraphThresholdsStyleMode = /* @__PURE__ */ ((GraphThresholdsStyleMode2) => {
  GraphThresholdsStyleMode2["Area"] = "area";
  GraphThresholdsStyleMode2["Dashed"] = "dashed";
  GraphThresholdsStyleMode2["DashedAndArea"] = "dashed+area";
  GraphThresholdsStyleMode2["Line"] = "line";
  GraphThresholdsStyleMode2["LineAndArea"] = "line+area";
  GraphThresholdsStyleMode2["Off"] = "off";
  GraphThresholdsStyleMode2["Series"] = "series";
  return GraphThresholdsStyleMode2;
})(GraphThresholdsStyleMode || {});
var LegendDisplayMode = /* @__PURE__ */ ((LegendDisplayMode2) => {
  LegendDisplayMode2["Hidden"] = "hidden";
  LegendDisplayMode2["List"] = "list";
  LegendDisplayMode2["Table"] = "table";
  return LegendDisplayMode2;
})(LegendDisplayMode || {});
const defaultReduceDataOptions = {
  calcs: []
};
var VizOrientation = /* @__PURE__ */ ((VizOrientation2) => {
  VizOrientation2["Auto"] = "auto";
  VizOrientation2["Horizontal"] = "horizontal";
  VizOrientation2["Vertical"] = "vertical";
  return VizOrientation2;
})(VizOrientation || {});
const defaultOptionsWithTimezones = {
  timezone: []
};
var BigValueColorMode = /* @__PURE__ */ ((BigValueColorMode2) => {
  BigValueColorMode2["Background"] = "background";
  BigValueColorMode2["BackgroundSolid"] = "background_solid";
  BigValueColorMode2["None"] = "none";
  BigValueColorMode2["Value"] = "value";
  return BigValueColorMode2;
})(BigValueColorMode || {});
var BigValueGraphMode = /* @__PURE__ */ ((BigValueGraphMode2) => {
  BigValueGraphMode2["Area"] = "area";
  BigValueGraphMode2["Line"] = "line";
  BigValueGraphMode2["None"] = "none";
  return BigValueGraphMode2;
})(BigValueGraphMode || {});
var BigValueJustifyMode = /* @__PURE__ */ ((BigValueJustifyMode2) => {
  BigValueJustifyMode2["Auto"] = "auto";
  BigValueJustifyMode2["Center"] = "center";
  return BigValueJustifyMode2;
})(BigValueJustifyMode || {});
var BigValueTextMode = /* @__PURE__ */ ((BigValueTextMode2) => {
  BigValueTextMode2["Auto"] = "auto";
  BigValueTextMode2["Name"] = "name";
  BigValueTextMode2["None"] = "none";
  BigValueTextMode2["Value"] = "value";
  BigValueTextMode2["ValueAndName"] = "value_and_name";
  return BigValueTextMode2;
})(BigValueTextMode || {});
var PercentChangeColorMode = /* @__PURE__ */ ((PercentChangeColorMode2) => {
  PercentChangeColorMode2["Inverted"] = "inverted";
  PercentChangeColorMode2["SameAsValue"] = "same_as_value";
  PercentChangeColorMode2["Standard"] = "standard";
  return PercentChangeColorMode2;
})(PercentChangeColorMode || {});
var TooltipDisplayMode = /* @__PURE__ */ ((TooltipDisplayMode2) => {
  TooltipDisplayMode2["Multi"] = "multi";
  TooltipDisplayMode2["None"] = "none";
  TooltipDisplayMode2["Single"] = "single";
  return TooltipDisplayMode2;
})(TooltipDisplayMode || {});
var SortOrder = /* @__PURE__ */ ((SortOrder2) => {
  SortOrder2["Ascending"] = "asc";
  SortOrder2["Descending"] = "desc";
  SortOrder2["None"] = "none";
  return SortOrder2;
})(SortOrder || {});
const defaultVizLegendOptions = {
  calcs: []
};
var BarGaugeDisplayMode = /* @__PURE__ */ ((BarGaugeDisplayMode2) => {
  BarGaugeDisplayMode2["Basic"] = "basic";
  BarGaugeDisplayMode2["Gradient"] = "gradient";
  BarGaugeDisplayMode2["Lcd"] = "lcd";
  return BarGaugeDisplayMode2;
})(BarGaugeDisplayMode || {});
var BarGaugeValueMode = /* @__PURE__ */ ((BarGaugeValueMode2) => {
  BarGaugeValueMode2["Color"] = "color";
  BarGaugeValueMode2["Hidden"] = "hidden";
  BarGaugeValueMode2["Text"] = "text";
  return BarGaugeValueMode2;
})(BarGaugeValueMode || {});
var BarGaugeNamePlacement = /* @__PURE__ */ ((BarGaugeNamePlacement2) => {
  BarGaugeNamePlacement2["Auto"] = "auto";
  BarGaugeNamePlacement2["Left"] = "left";
  BarGaugeNamePlacement2["Top"] = "top";
  return BarGaugeNamePlacement2;
})(BarGaugeNamePlacement || {});
var BarGaugeSizing = /* @__PURE__ */ ((BarGaugeSizing2) => {
  BarGaugeSizing2["Auto"] = "auto";
  BarGaugeSizing2["Manual"] = "manual";
  return BarGaugeSizing2;
})(BarGaugeSizing || {});
var TableCellDisplayMode = /* @__PURE__ */ ((TableCellDisplayMode2) => {
  TableCellDisplayMode2["Auto"] = "auto";
  TableCellDisplayMode2["BasicGauge"] = "basic";
  TableCellDisplayMode2["ColorBackground"] = "color-background";
  TableCellDisplayMode2["ColorBackgroundSolid"] = "color-background-solid";
  TableCellDisplayMode2["ColorText"] = "color-text";
  TableCellDisplayMode2["Custom"] = "custom";
  TableCellDisplayMode2["DataLinks"] = "data-links";
  TableCellDisplayMode2["Gauge"] = "gauge";
  TableCellDisplayMode2["GradientGauge"] = "gradient-gauge";
  TableCellDisplayMode2["Image"] = "image";
  TableCellDisplayMode2["JSONView"] = "json-view";
  TableCellDisplayMode2["LcdGauge"] = "lcd-gauge";
  TableCellDisplayMode2["Sparkline"] = "sparkline";
  return TableCellDisplayMode2;
})(TableCellDisplayMode || {});
var TableCellBackgroundDisplayMode = /* @__PURE__ */ ((TableCellBackgroundDisplayMode2) => {
  TableCellBackgroundDisplayMode2["Basic"] = "basic";
  TableCellBackgroundDisplayMode2["Gradient"] = "gradient";
  return TableCellBackgroundDisplayMode2;
})(TableCellBackgroundDisplayMode || {});
const defaultTableFooterOptions = {
  fields: [],
  reducer: []
};
var TableCellHeight = /* @__PURE__ */ ((TableCellHeight2) => {
  TableCellHeight2["Auto"] = "auto";
  TableCellHeight2["Lg"] = "lg";
  TableCellHeight2["Md"] = "md";
  TableCellHeight2["Sm"] = "sm";
  return TableCellHeight2;
})(TableCellHeight || {});
var VariableFormatID = /* @__PURE__ */ ((VariableFormatID2) => {
  VariableFormatID2["CSV"] = "csv";
  VariableFormatID2["Date"] = "date";
  VariableFormatID2["Distributed"] = "distributed";
  VariableFormatID2["DoubleQuote"] = "doublequote";
  VariableFormatID2["Glob"] = "glob";
  VariableFormatID2["HTML"] = "html";
  VariableFormatID2["JSON"] = "json";
  VariableFormatID2["Lucene"] = "lucene";
  VariableFormatID2["PercentEncode"] = "percentencode";
  VariableFormatID2["Pipe"] = "pipe";
  VariableFormatID2["QueryParam"] = "queryparam";
  VariableFormatID2["Raw"] = "raw";
  VariableFormatID2["Regex"] = "regex";
  VariableFormatID2["SQLString"] = "sqlstring";
  VariableFormatID2["SingleQuote"] = "singlequote";
  VariableFormatID2["Text"] = "text";
  VariableFormatID2["UriEncode"] = "uriencode";
  return VariableFormatID2;
})(VariableFormatID || {});
var LogsDedupStrategy = /* @__PURE__ */ ((LogsDedupStrategy2) => {
  LogsDedupStrategy2["exact"] = "exact";
  LogsDedupStrategy2["none"] = "none";
  LogsDedupStrategy2["numbers"] = "numbers";
  LogsDedupStrategy2["signature"] = "signature";
  return LogsDedupStrategy2;
})(LogsDedupStrategy || {});
var ComparisonOperation = /* @__PURE__ */ ((ComparisonOperation2) => {
  ComparisonOperation2["EQ"] = "eq";
  ComparisonOperation2["GT"] = "gt";
  ComparisonOperation2["GTE"] = "gte";
  ComparisonOperation2["LT"] = "lt";
  ComparisonOperation2["LTE"] = "lte";
  ComparisonOperation2["NEQ"] = "neq";
  return ComparisonOperation2;
})(ComparisonOperation || {});
const defaultTimeZone = "browser";

export { AxisColorMode, AxisPlacement, BarAlignment, BarGaugeDisplayMode, BarGaugeNamePlacement, BarGaugeSizing, BarGaugeValueMode, BigValueColorMode, BigValueGraphMode, BigValueJustifyMode, BigValueTextMode, ComparisonOperation, DataTopic, FrameGeometrySourceMode, GraphDrawStyle, GraphGradientMode, GraphThresholdsStyleMode, GraphTransform, HeatmapCalculationMode, HeatmapCellLayout, LegendDisplayMode, LineInterpolation, LogsDedupStrategy, LogsSortOrder, PercentChangeColorMode, ResourceDimensionMode, ScalarDimensionMode, ScaleDimensionMode, ScaleDirection, ScaleDistribution, ScaleOrientation, SortOrder, StackingMode, TableCellBackgroundDisplayMode, TableCellDisplayMode, TableCellHeight, TextDimensionMode, TooltipDisplayMode, VariableFormatID, VisibilityMode, VizOrientation, defaultLineStyle, defaultOptionsWithTimezones, defaultReduceDataOptions, defaultTableFooterOptions, defaultTimeZone, defaultVizLegendOptions };
//# sourceMappingURL=common.gen.js.map
