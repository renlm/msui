import React__default, { Component, createRef } from 'react';
import uPlot from 'uplot';
import { pluginLog } from './utils.js';
import 'uplot/dist/uPlot.min.css';

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function sameDims(prevProps, nextProps) {
  return nextProps.width === prevProps.width && nextProps.height === prevProps.height;
}
function sameData(prevProps, nextProps) {
  return nextProps.data === prevProps.data;
}
function sameConfig(prevProps, nextProps) {
  return nextProps.config === prevProps.config;
}
class UPlotChart extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "plotContainer", createRef());
    __publicField(this, "plotCanvasBBox", createRef());
    this.state = {
      plot: null
    };
  }
  reinitPlot() {
    var _a;
    let { width, height, plotRef } = this.props;
    (_a = this.state.plot) == null ? void 0 : _a.destroy();
    if (width === 0 && height === 0) {
      return;
    }
    this.props.config.addHook("setSize", (u) => {
      const canvas = u.over;
      if (!canvas) {
        return;
      }
    });
    const config = __spreadValues({
      width: Math.floor(this.props.width),
      height: Math.floor(this.props.height)
    }, this.props.config.getConfig());
    pluginLog("UPlot", false, "Reinitializing plot", config);
    const plot = new uPlot(config, this.props.data, this.plotContainer.current);
    if (plotRef) {
      plotRef(plot);
    }
    this.setState({ plot });
  }
  componentDidMount() {
    this.reinitPlot();
  }
  componentWillUnmount() {
    var _a;
    (_a = this.state.plot) == null ? void 0 : _a.destroy();
  }
  componentDidUpdate(prevProps) {
    let { plot } = this.state;
    if (!sameDims(prevProps, this.props)) {
      plot == null ? void 0 : plot.setSize({
        width: Math.floor(this.props.width),
        height: Math.floor(this.props.height)
      });
    } else if (!sameConfig(prevProps, this.props)) {
      this.reinitPlot();
    } else if (!sameData(prevProps, this.props)) {
      plot == null ? void 0 : plot.setData(this.props.data);
    }
  }
  render() {
    return /* @__PURE__ */ React__default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React__default.createElement("div", { ref: this.plotContainer, "data-testid": "uplot-main-div" }), this.props.children);
  }
}

export { UPlotChart };
//# sourceMappingURL=Plot.js.map
