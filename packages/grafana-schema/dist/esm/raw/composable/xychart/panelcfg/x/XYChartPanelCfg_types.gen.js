import { V as VisibilityMode } from '../../../../../common.gen-8ea2300f.js';

const pluginVersion = "11.1.11";
var SeriesMapping = /* @__PURE__ */ ((SeriesMapping2) => {
  SeriesMapping2["Auto"] = "auto";
  SeriesMapping2["Manual"] = "manual";
  return SeriesMapping2;
})(SeriesMapping || {});
var ScatterShow = /* @__PURE__ */ ((ScatterShow2) => {
  ScatterShow2["Lines"] = "lines";
  ScatterShow2["Points"] = "points";
  ScatterShow2["PointsAndLines"] = "points+lines";
  return ScatterShow2;
})(ScatterShow || {});
const defaultXYDimensionConfig = {
  exclude: []
};
const defaultFieldConfig = {
  label: VisibilityMode.Auto,
  show: "points" /* Points */
};
const defaultOptions = {
  series: []
};

export { ScatterShow, SeriesMapping, defaultFieldConfig, defaultOptions, defaultXYDimensionConfig, pluginVersion };
