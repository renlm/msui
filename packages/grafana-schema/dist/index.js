'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

const defaultTableFieldOptions = {
  align: "auto",
  inspect: false,
  cellOptions: {
    type: TableCellDisplayMode.Auto
  }
};
var LoadingState = /* @__PURE__ */ ((LoadingState2) => {
  LoadingState2["NotStarted"] = "NotStarted";
  LoadingState2["Loading"] = "Loading";
  LoadingState2["Streaming"] = "Streaming";
  LoadingState2["Done"] = "Done";
  LoadingState2["Error"] = "Error";
  return LoadingState2;
})(LoadingState || {});

const defaultAccessPolicy = {
  rules: []
};

const defaultAnnotationTarget = {
  tags: []
};
const defaultAnnotationPanelFilter = {
  exclude: false,
  ids: []
};
const defaultAnnotationContainer$1 = {
  list: []
};
const defaultAnnotationQuery$1 = {
  builtIn: 0,
  enable: true,
  hide: false
};
const defaultVariableModel$1 = {
  includeAll: false,
  multi: false,
  options: [],
  skipUrlSync: false
};
var VariableRefresh = /* @__PURE__ */ ((VariableRefresh2) => {
  VariableRefresh2[VariableRefresh2["never"] = 0] = "never";
  VariableRefresh2[VariableRefresh2["onDashboardLoad"] = 1] = "onDashboardLoad";
  VariableRefresh2[VariableRefresh2["onTimeRangeChanged"] = 2] = "onTimeRangeChanged";
  return VariableRefresh2;
})(VariableRefresh || {});
var VariableSort = /* @__PURE__ */ ((VariableSort2) => {
  VariableSort2[VariableSort2["alphabeticalAsc"] = 1] = "alphabeticalAsc";
  VariableSort2[VariableSort2["alphabeticalCaseInsensitiveAsc"] = 5] = "alphabeticalCaseInsensitiveAsc";
  VariableSort2[VariableSort2["alphabeticalCaseInsensitiveDesc"] = 6] = "alphabeticalCaseInsensitiveDesc";
  VariableSort2[VariableSort2["alphabeticalDesc"] = 2] = "alphabeticalDesc";
  VariableSort2[VariableSort2["disabled"] = 0] = "disabled";
  VariableSort2[VariableSort2["naturalAsc"] = 7] = "naturalAsc";
  VariableSort2[VariableSort2["naturalDesc"] = 8] = "naturalDesc";
  VariableSort2[VariableSort2["numericalAsc"] = 3] = "numericalAsc";
  VariableSort2[VariableSort2["numericalDesc"] = 4] = "numericalDesc";
  return VariableSort2;
})(VariableSort || {});
const defaultDashboardLink = {
  asDropdown: false,
  includeVars: false,
  keepTime: false,
  tags: [],
  targetBlank: false
};
var FieldColorModeId = /* @__PURE__ */ ((FieldColorModeId2) => {
  FieldColorModeId2["ContinuousBlPu"] = "continuous-BlPu";
  FieldColorModeId2["ContinuousBlYlRd"] = "continuous-BlYlRd";
  FieldColorModeId2["ContinuousBlues"] = "continuous-blues";
  FieldColorModeId2["ContinuousGrYlRd"] = "continuous-GrYlRd";
  FieldColorModeId2["ContinuousGreens"] = "continuous-greens";
  FieldColorModeId2["ContinuousPurples"] = "continuous-purples";
  FieldColorModeId2["ContinuousRdYlGr"] = "continuous-RdYlGr";
  FieldColorModeId2["ContinuousReds"] = "continuous-reds";
  FieldColorModeId2["ContinuousYlBl"] = "continuous-YlBl";
  FieldColorModeId2["ContinuousYlRd"] = "continuous-YlRd";
  FieldColorModeId2["Fixed"] = "fixed";
  FieldColorModeId2["PaletteClassic"] = "palette-classic";
  FieldColorModeId2["PaletteClassicByName"] = "palette-classic-by-name";
  FieldColorModeId2["Shades"] = "shades";
  FieldColorModeId2["Thresholds"] = "thresholds";
  return FieldColorModeId2;
})(FieldColorModeId || {});
const defaultGridPos = {
  h: 9,
  w: 12,
  x: 0,
  y: 0
};
var ThresholdsMode = /* @__PURE__ */ ((ThresholdsMode2) => {
  ThresholdsMode2["Absolute"] = "absolute";
  ThresholdsMode2["Percentage"] = "percentage";
  return ThresholdsMode2;
})(ThresholdsMode || {});
const defaultThresholdsConfig = {
  steps: []
};
var MappingType = /* @__PURE__ */ ((MappingType2) => {
  MappingType2["RangeToText"] = "range";
  MappingType2["RegexToText"] = "regex";
  MappingType2["SpecialValue"] = "special";
  MappingType2["ValueToText"] = "value";
  return MappingType2;
})(MappingType || {});
var SpecialValueMatch = /* @__PURE__ */ ((SpecialValueMatch2) => {
  SpecialValueMatch2["Empty"] = "empty";
  SpecialValueMatch2["False"] = "false";
  SpecialValueMatch2["NaN"] = "nan";
  SpecialValueMatch2["Null"] = "null";
  SpecialValueMatch2["NullAndNan"] = "null+nan";
  SpecialValueMatch2["True"] = "true";
  return SpecialValueMatch2;
})(SpecialValueMatch || {});
const defaultTimePickerConfig$1 = {
  hidden: false,
  refresh_intervals: ["5s", "10s", "30s", "1m", "5m", "15m", "30m", "1h", "2h", "1d"],
  time_options: ["5m", "15m", "1h", "6h", "12h", "24h", "2d", "7d", "30d"]
};
var DashboardCursorSync = /* @__PURE__ */ ((DashboardCursorSync2) => {
  DashboardCursorSync2[DashboardCursorSync2["Crosshair"] = 1] = "Crosshair";
  DashboardCursorSync2[DashboardCursorSync2["Off"] = 0] = "Off";
  DashboardCursorSync2[DashboardCursorSync2["Tooltip"] = 2] = "Tooltip";
  return DashboardCursorSync2;
})(DashboardCursorSync || {});
const defaultDashboardCursorSync = 0 /* Off */;
const defaultPanel$1 = {
  links: [],
  repeatDirection: "h",
  targets: [],
  transformations: [],
  transparent: false
};
const defaultFieldConfigSource$1 = {
  overrides: []
};
const defaultMatcherConfig$1 = {
  id: ""
};
const defaultFieldConfig$1 = {
  links: [],
  mappings: []
};
const defaultRowPanel$1 = {
  collapsed: false,
  panels: []
};
const defaultDashboard$1 = {
  editable: true,
  fiscalYearStartMonth: 0,
  graphTooltip: 0 /* Off */,
  links: [],
  panels: [],
  schemaVersion: 39,
  tags: [],
  timezone: "browser"
};

var __defProp = Object.defineProperty;
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
var VariableHide = /* @__PURE__ */ ((VariableHide2) => {
  VariableHide2[VariableHide2["dontHide"] = 0] = "dontHide";
  VariableHide2[VariableHide2["hideLabel"] = 1] = "hideLabel";
  VariableHide2[VariableHide2["hideVariable"] = 2] = "hideVariable";
  return VariableHide2;
})(VariableHide || {});
const defaultDashboard = defaultDashboard$1;
const defaultVariableModel = __spreadValues({}, defaultVariableModel$1);
const defaultTimePickerConfig = defaultTimePickerConfig$1;
const defaultPanel = defaultPanel$1;
const defaultRowPanel = defaultRowPanel$1;
const defaultFieldConfig = defaultFieldConfig$1;
const defaultFieldConfigSource = defaultFieldConfigSource$1;
const defaultMatcherConfig = defaultMatcherConfig$1;
const defaultAnnotationQuery = defaultAnnotationQuery$1;
const defaultAnnotationContainer = defaultAnnotationContainer$1;

exports.AxisColorMode = AxisColorMode;
exports.AxisPlacement = AxisPlacement;
exports.BarAlignment = BarAlignment;
exports.BarGaugeDisplayMode = BarGaugeDisplayMode;
exports.BarGaugeNamePlacement = BarGaugeNamePlacement;
exports.BarGaugeSizing = BarGaugeSizing;
exports.BarGaugeValueMode = BarGaugeValueMode;
exports.BigValueColorMode = BigValueColorMode;
exports.BigValueGraphMode = BigValueGraphMode;
exports.BigValueJustifyMode = BigValueJustifyMode;
exports.BigValueTextMode = BigValueTextMode;
exports.ComparisonOperation = ComparisonOperation;
exports.DashboardCursorSync = DashboardCursorSync;
exports.DataTopic = DataTopic;
exports.FieldColorModeId = FieldColorModeId;
exports.FrameGeometrySourceMode = FrameGeometrySourceMode;
exports.GraphDrawStyle = GraphDrawStyle;
exports.GraphGradientMode = GraphGradientMode;
exports.GraphThresholdsStyleMode = GraphThresholdsStyleMode;
exports.GraphTransform = GraphTransform;
exports.HeatmapCalculationMode = HeatmapCalculationMode;
exports.HeatmapCellLayout = HeatmapCellLayout;
exports.LegendDisplayMode = LegendDisplayMode;
exports.LineInterpolation = LineInterpolation;
exports.LoadingState = LoadingState;
exports.LogsDedupStrategy = LogsDedupStrategy;
exports.LogsSortOrder = LogsSortOrder;
exports.MappingType = MappingType;
exports.PercentChangeColorMode = PercentChangeColorMode;
exports.ResourceDimensionMode = ResourceDimensionMode;
exports.ScalarDimensionMode = ScalarDimensionMode;
exports.ScaleDimensionMode = ScaleDimensionMode;
exports.ScaleDirection = ScaleDirection;
exports.ScaleDistribution = ScaleDistribution;
exports.ScaleOrientation = ScaleOrientation;
exports.SortOrder = SortOrder;
exports.SpecialValueMatch = SpecialValueMatch;
exports.StackingMode = StackingMode;
exports.TableCellBackgroundDisplayMode = TableCellBackgroundDisplayMode;
exports.TableCellDisplayMode = TableCellDisplayMode;
exports.TableCellHeight = TableCellHeight;
exports.TextDimensionMode = TextDimensionMode;
exports.ThresholdsMode = ThresholdsMode;
exports.TooltipDisplayMode = TooltipDisplayMode;
exports.VariableFormatID = VariableFormatID;
exports.VariableHide = VariableHide;
exports.VariableRefresh = VariableRefresh;
exports.VariableSort = VariableSort;
exports.VisibilityMode = VisibilityMode;
exports.VizOrientation = VizOrientation;
exports.defaultAccessPolicy = defaultAccessPolicy;
exports.defaultAnnotationContainer = defaultAnnotationContainer;
exports.defaultAnnotationPanelFilter = defaultAnnotationPanelFilter;
exports.defaultAnnotationQuery = defaultAnnotationQuery;
exports.defaultAnnotationTarget = defaultAnnotationTarget;
exports.defaultDashboard = defaultDashboard;
exports.defaultDashboardCursorSync = defaultDashboardCursorSync;
exports.defaultDashboardLink = defaultDashboardLink;
exports.defaultFieldConfig = defaultFieldConfig;
exports.defaultFieldConfigSource = defaultFieldConfigSource;
exports.defaultGridPos = defaultGridPos;
exports.defaultLineStyle = defaultLineStyle;
exports.defaultMatcherConfig = defaultMatcherConfig;
exports.defaultOptionsWithTimezones = defaultOptionsWithTimezones;
exports.defaultPanel = defaultPanel;
exports.defaultReduceDataOptions = defaultReduceDataOptions;
exports.defaultRowPanel = defaultRowPanel;
exports.defaultTableFieldOptions = defaultTableFieldOptions;
exports.defaultTableFooterOptions = defaultTableFooterOptions;
exports.defaultThresholdsConfig = defaultThresholdsConfig;
exports.defaultTimePickerConfig = defaultTimePickerConfig;
exports.defaultTimeZone = defaultTimeZone;
exports.defaultVariableModel = defaultVariableModel;
exports.defaultVizLegendOptions = defaultVizLegendOptions;
//# sourceMappingURL=index.js.map
