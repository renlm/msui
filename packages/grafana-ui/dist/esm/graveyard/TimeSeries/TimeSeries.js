import React__default, { Component } from 'react';
import { PanelContextRoot } from '../../components/PanelChrome/PanelContext.js';
import { hasVisibleLegendSeries, PlotLegend } from '../../components/uPlot/PlotLegend.js';
import { withTheme2 } from '../../themes/ThemeContext.js';
import { GraphNG } from '../GraphNG/GraphNG.js';
import { preparePlotConfigBuilder } from './utils.js';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const propsToDiff = ["legend", "options", "theme"];
class UnthemedTimeSeries extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "prepConfig", (alignedFrame, allFrames, getTimeRange) => {
      const { sync } = this.context;
      const { theme, timeZone, renderers, tweakAxis, tweakScale } = this.props;
      return preparePlotConfigBuilder({
        frame: alignedFrame,
        theme,
        timeZones: Array.isArray(timeZone) ? timeZone : [timeZone],
        getTimeRange,
        sync,
        allFrames,
        renderers,
        tweakScale,
        tweakAxis
      });
    });
    __publicField(this, "renderLegend", (config) => {
      const { legend, frames } = this.props;
      if (!config || legend && !legend.showLegend || !hasVisibleLegendSeries(config, frames)) {
        return null;
      }
      return /* @__PURE__ */ React__default.createElement(PlotLegend, __spreadValues({ data: frames, config }, legend));
    });
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(
      GraphNG,
      __spreadProps(__spreadValues({}, this.props), {
        prepConfig: this.prepConfig,
        propsToDiff,
        renderLegend: this.renderLegend
      })
    );
  }
}
__publicField(UnthemedTimeSeries, "contextType", PanelContextRoot);
const TimeSeries = withTheme2(UnthemedTimeSeries);
TimeSeries.displayName = "TimeSeries";

export { TimeSeries, UnthemedTimeSeries };
//# sourceMappingURL=TimeSeries.js.map
