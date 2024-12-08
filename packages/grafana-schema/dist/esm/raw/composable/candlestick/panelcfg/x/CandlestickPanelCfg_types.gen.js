const pluginVersion = "11.1.11";
var VizDisplayMode = /* @__PURE__ */ ((VizDisplayMode2) => {
  VizDisplayMode2["Candles"] = "candles";
  VizDisplayMode2["CandlesVolume"] = "candles+volume";
  VizDisplayMode2["Volume"] = "volume";
  return VizDisplayMode2;
})(VizDisplayMode || {});
var CandleStyle = /* @__PURE__ */ ((CandleStyle2) => {
  CandleStyle2["Candles"] = "candles";
  CandleStyle2["OHLCBars"] = "ohlcbars";
  return CandleStyle2;
})(CandleStyle || {});
var ColorStrategy = /* @__PURE__ */ ((ColorStrategy2) => {
  ColorStrategy2["CloseClose"] = "close-close";
  ColorStrategy2["OpenClose"] = "open-close";
  return ColorStrategy2;
})(ColorStrategy || {});
const defaultCandlestickColors = {
  down: "red",
  flat: "gray",
  up: "green"
};
const defaultOptions = {
  candleStyle: "candles" /* Candles */,
  colorStrategy: "open-close" /* OpenClose */,
  colors: {
    down: "red",
    up: "green",
    flat: "gray"
  },
  fields: {},
  includeAllFields: false,
  mode: "candles+volume" /* CandlesVolume */
};

export { CandleStyle, ColorStrategy, VizDisplayMode, defaultCandlestickColors, defaultOptions, pluginVersion };
