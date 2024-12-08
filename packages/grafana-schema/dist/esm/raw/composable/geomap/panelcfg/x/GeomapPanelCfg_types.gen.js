const pluginVersion = "11.1.11";
const defaultOptions = {
  layers: []
};
const defaultMapViewConfig = {
  allLayers: true,
  id: "zero",
  lat: 0,
  lon: 0,
  zoom: 1
};
var TooltipMode = /* @__PURE__ */ ((TooltipMode2) => {
  TooltipMode2["Details"] = "details";
  TooltipMode2["None"] = "none";
  return TooltipMode2;
})(TooltipMode || {});
var MapCenterID = /* @__PURE__ */ ((MapCenterID2) => {
  MapCenterID2["Coords"] = "coords";
  MapCenterID2["Fit"] = "fit";
  MapCenterID2["Zero"] = "zero";
  return MapCenterID2;
})(MapCenterID || {});

export { MapCenterID, TooltipMode, defaultMapViewConfig, defaultOptions, pluginVersion };
