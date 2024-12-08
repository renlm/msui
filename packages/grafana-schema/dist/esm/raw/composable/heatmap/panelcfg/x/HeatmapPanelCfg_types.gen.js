import { V as VisibilityMode, d as TooltipDisplayMode } from '../../../../../common.gen-8ea2300f.js';

const pluginVersion = "11.1.11";
var HeatmapColorMode = /* @__PURE__ */ ((HeatmapColorMode2) => {
  HeatmapColorMode2["Opacity"] = "opacity";
  HeatmapColorMode2["Scheme"] = "scheme";
  return HeatmapColorMode2;
})(HeatmapColorMode || {});
var HeatmapColorScale = /* @__PURE__ */ ((HeatmapColorScale2) => {
  HeatmapColorScale2["Exponential"] = "exponential";
  HeatmapColorScale2["Linear"] = "linear";
  return HeatmapColorScale2;
})(HeatmapColorScale || {});
var HeatmapSelectionMode = /* @__PURE__ */ ((HeatmapSelectionMode2) => {
  HeatmapSelectionMode2["X"] = "x";
  HeatmapSelectionMode2["Xy"] = "xy";
  HeatmapSelectionMode2["Y"] = "y";
  return HeatmapSelectionMode2;
})(HeatmapSelectionMode || {});
const defaultOptions = {
  calculate: false,
  cellGap: 1,
  cellValues: {},
  color: {
    /**
     * mode:     HeatmapColorMode // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
     */
    scheme: "Oranges",
    fill: "dark-orange",
    /**
     * scale:    HeatmapColorScale // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
     */
    reverse: false,
    exponent: 0.5,
    steps: 64
  },
  exemplars: {
    color: "rgba(255,0,255,0.7)"
  },
  filterValues: {
    le: 1e-9
  },
  legend: {
    show: true
  },
  selectionMode: "x" /* X */,
  showValue: VisibilityMode.Auto,
  tooltip: {
    mode: TooltipDisplayMode.Single,
    yHistogram: false,
    showColorScale: false
  }
};

export { HeatmapColorMode, HeatmapColorScale, HeatmapSelectionMode, defaultOptions, pluginVersion };
