const pluginVersion = "11.1.11";
var HorizontalConstraint = /* @__PURE__ */ ((HorizontalConstraint2) => {
  HorizontalConstraint2["Center"] = "center";
  HorizontalConstraint2["Left"] = "left";
  HorizontalConstraint2["LeftRight"] = "leftright";
  HorizontalConstraint2["Right"] = "right";
  HorizontalConstraint2["Scale"] = "scale";
  return HorizontalConstraint2;
})(HorizontalConstraint || {});
var VerticalConstraint = /* @__PURE__ */ ((VerticalConstraint2) => {
  VerticalConstraint2["Bottom"] = "bottom";
  VerticalConstraint2["Center"] = "center";
  VerticalConstraint2["Scale"] = "scale";
  VerticalConstraint2["Top"] = "top";
  VerticalConstraint2["TopBottom"] = "topbottom";
  return VerticalConstraint2;
})(VerticalConstraint || {});
var BackgroundImageSize = /* @__PURE__ */ ((BackgroundImageSize2) => {
  BackgroundImageSize2["Contain"] = "contain";
  BackgroundImageSize2["Cover"] = "cover";
  BackgroundImageSize2["Fill"] = "fill";
  BackgroundImageSize2["Original"] = "original";
  BackgroundImageSize2["Tile"] = "tile";
  return BackgroundImageSize2;
})(BackgroundImageSize || {});
var HttpRequestMethod = /* @__PURE__ */ ((HttpRequestMethod2) => {
  HttpRequestMethod2["GET"] = "GET";
  HttpRequestMethod2["POST"] = "POST";
  HttpRequestMethod2["PUT"] = "PUT";
  return HttpRequestMethod2;
})(HttpRequestMethod || {});
var ConnectionPath = /* @__PURE__ */ ((ConnectionPath2) => {
  ConnectionPath2["Straight"] = "straight";
  return ConnectionPath2;
})(ConnectionPath || {});
const defaultCanvasConnection = {
  vertices: []
};
const defaultCanvasElementOptions = {
  connections: []
};
const defaultOptions = {
  infinitePan: true,
  inlineEditing: true,
  panZoom: true,
  showAdvancedTypes: true
};

export { BackgroundImageSize, ConnectionPath, HorizontalConstraint, HttpRequestMethod, VerticalConstraint, defaultCanvasConnection, defaultCanvasElementOptions, defaultOptions, pluginVersion };
