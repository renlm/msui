import React__default, { Component } from 'react';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { fieldMatchers, FieldMatcherID, FieldType, DataHoverEvent, LegacyGraphHoverEvent, DataHoverClearEvent } from '@grafana/data';
import { PanelContextRoot } from '../../components/PanelChrome/PanelContext.js';
import { VizLayout } from '../../components/VizLayout/VizLayout.js';
import { UPlotChart } from '../../components/uPlot/Plot.js';
import { pluginLog, findMidPointYPosition } from '../../components/uPlot/utils.js';
import { preparePlotFrame } from './utils.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function sameProps(prevProps, nextProps, propsToDiff = []) {
  for (const propName of propsToDiff) {
    if (typeof propName === "function") {
      if (!propName(prevProps, nextProps)) {
        return false;
      }
    } else if (nextProps[propName] !== prevProps[propName]) {
      return false;
    }
  }
  return true;
}
class GraphNG extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "panelContext", {});
    __publicField(this, "plotInstance");
    __publicField(this, "subscription", new Subscription());
    __publicField(this, "getTimeRange", () => this.props.timeRange);
    let state = this.prepState(props);
    state.alignedData = state.config.prepData([state.alignedFrame]);
    this.state = state;
    this.plotInstance = React__default.createRef();
  }
  prepState(props, withConfig = true) {
    var _a;
    let state = null;
    const { frames, fields, preparePlotFrame: preparePlotFrame$1 } = props;
    const preparePlotFrameFn = preparePlotFrame$1 || preparePlotFrame;
    const alignedFrame = preparePlotFrameFn(
      frames,
      fields || {
        x: fieldMatchers.get(FieldMatcherID.firstTimeField).get({}),
        y: fieldMatchers.get(FieldMatcherID.byTypes).get(/* @__PURE__ */ new Set([FieldType.number, FieldType.enum]))
      },
      props.timeRange
    );
    pluginLog("GraphNG", false, "data aligned", alignedFrame);
    if (alignedFrame) {
      let config = (_a = this.state) == null ? void 0 : _a.config;
      if (withConfig) {
        config = props.prepConfig(alignedFrame, this.props.frames, this.getTimeRange);
        pluginLog("GraphNG", false, "config prepared", config);
      }
      state = {
        alignedFrame,
        config
      };
      pluginLog("GraphNG", false, "data prepared", state.alignedData);
    }
    return state;
  }
  handleCursorUpdate(evt) {
    var _a, _b;
    const time = (_b = (_a = evt.payload) == null ? void 0 : _a.point) == null ? void 0 : _b.time;
    const u = this.plotInstance.current;
    if (u && time) {
      const left = u.valToPos(time, "x");
      let top;
      if (left) {
        top = findMidPointYPosition(u, u.posToIdx(left));
      }
      if (!top || !left) {
        return;
      }
      u.setCursor({
        left,
        top
      });
    }
  }
  componentDidMount() {
    this.panelContext = this.context;
    const { eventBus } = this.panelContext;
    this.subscription.add(
      eventBus.getStream(DataHoverEvent).pipe(throttleTime(50)).subscribe({
        next: (evt) => {
          if (eventBus === evt.origin) {
            return;
          }
          this.handleCursorUpdate(evt);
        }
      })
    );
    this.subscription.add(
      eventBus.getStream(LegacyGraphHoverEvent).pipe(throttleTime(50)).subscribe({
        next: (evt) => this.handleCursorUpdate(evt)
      })
    );
    this.subscription.add(
      eventBus.getStream(DataHoverClearEvent).pipe(throttleTime(50)).subscribe({
        next: () => {
          var _a;
          const u = (_a = this.plotInstance) == null ? void 0 : _a.current;
          if (u && !u.cursor._lock) {
            u.setCursor({
              left: -10,
              top: -10
            });
          }
        }
      })
    );
  }
  componentDidUpdate(prevProps) {
    const { frames, structureRev, timeZone, propsToDiff } = this.props;
    const propsChanged = !sameProps(prevProps, this.props, propsToDiff);
    if (frames !== prevProps.frames || propsChanged || timeZone !== prevProps.timeZone) {
      let newState = this.prepState(this.props, false);
      if (newState) {
        const shouldReconfig = this.state.config === void 0 || timeZone !== prevProps.timeZone || structureRev !== prevProps.structureRev || !structureRev || propsChanged;
        if (shouldReconfig) {
          newState.config = this.props.prepConfig(newState.alignedFrame, this.props.frames, this.getTimeRange);
          pluginLog("GraphNG", false, "config recreated", newState.config);
        }
        newState.alignedData = newState.config.prepData([newState.alignedFrame]);
        this.setState(newState);
      }
    }
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  render() {
    const { width, height, children, renderLegend } = this.props;
    const { config, alignedFrame, alignedData } = this.state;
    if (!config) {
      return null;
    }
    return /* @__PURE__ */ React__default.createElement(VizLayout, { width, height, legend: renderLegend(config) }, (vizWidth, vizHeight) => /* @__PURE__ */ React__default.createElement(
      UPlotChart,
      {
        config,
        data: alignedData,
        width: vizWidth,
        height: vizHeight,
        plotRef: (u) => this.plotInstance.current = u
      },
      children ? children(config, alignedFrame) : null
    ));
  }
}
__publicField(GraphNG, "contextType", PanelContextRoot);

export { GraphNG };
//# sourceMappingURL=GraphNG.js.map
