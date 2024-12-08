import { TableCellDisplayMode } from '../common/common.gen.js';
export { AxisColorMode, AxisPlacement, BarAlignment, BarGaugeDisplayMode, BarGaugeNamePlacement, BarGaugeSizing, BarGaugeValueMode, BigValueColorMode, BigValueGraphMode, BigValueJustifyMode, BigValueTextMode, ComparisonOperation, DataTopic, FrameGeometrySourceMode, GraphDrawStyle, GraphGradientMode, GraphThresholdsStyleMode, GraphTransform, HeatmapCalculationMode, HeatmapCellLayout, LegendDisplayMode, LineInterpolation, LogsDedupStrategy, LogsSortOrder, PercentChangeColorMode, ResourceDimensionMode, ScalarDimensionMode, ScaleDimensionMode, ScaleDirection, ScaleDistribution, ScaleOrientation, SortOrder, StackingMode, TableCellBackgroundDisplayMode, TableCellDisplayMode, TableCellHeight, TextDimensionMode, TooltipDisplayMode, VariableFormatID, VisibilityMode, VizOrientation, defaultLineStyle, defaultOptionsWithTimezones, defaultReduceDataOptions, defaultTableFooterOptions, defaultTimeZone, defaultVizLegendOptions } from '../common/common.gen.js';

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

export { LoadingState, defaultTableFieldOptions };
//# sourceMappingURL=common.types.js.map
