const defaultAnnotationTarget = {
  tags: []
};
const defaultAnnotationPanelFilter = {
  exclude: false,
  ids: []
};
const defaultAnnotationContainer = {
  list: []
};
const defaultAnnotationQuery = {
  builtIn: 0,
  enable: true,
  hide: false
};
const defaultVariableModel = {
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
const defaultTimePickerConfig = {
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
const defaultPanel = {
  links: [],
  repeatDirection: "h",
  targets: [],
  transformations: [],
  transparent: false
};
const defaultFieldConfigSource = {
  overrides: []
};
const defaultMatcherConfig = {
  id: ""
};
const defaultFieldConfig = {
  links: [],
  mappings: []
};
const defaultRowPanel = {
  collapsed: false,
  panels: []
};
const defaultDashboard = {
  editable: true,
  fiscalYearStartMonth: 0,
  graphTooltip: 0 /* Off */,
  links: [],
  panels: [],
  schemaVersion: 39,
  tags: [],
  timezone: "browser"
};

export { DashboardCursorSync, FieldColorModeId, MappingType, SpecialValueMatch, ThresholdsMode, VariableRefresh, VariableSort, defaultAnnotationContainer, defaultAnnotationPanelFilter, defaultAnnotationQuery, defaultAnnotationTarget, defaultDashboard, defaultDashboardCursorSync, defaultDashboardLink, defaultFieldConfig, defaultFieldConfigSource, defaultGridPos, defaultMatcherConfig, defaultPanel, defaultRowPanel, defaultThresholdsConfig, defaultTimePickerConfig, defaultVariableModel };
//# sourceMappingURL=dashboard_types.gen.js.map
