import { isEqual } from 'lodash';
import React__default, { PureComponent } from 'react';
import { nullToValue, compareDataFrameStructures, FieldType, getFieldColorModeForField } from '@grafana/data';
import { GraphDrawStyle, VisibilityMode, AxisPlacement, ScaleOrientation, ScaleDirection } from '@grafana/schema';
import { UPlotChart } from '../uPlot/Plot.js';
import { UPlotConfigBuilder } from '../uPlot/config/UPlotConfigBuilder.js';
import { preparePlotData2, getStackingGroups } from '../uPlot/utils.js';
import { preparePlotFrame } from './utils.js';

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
const defaultConfig = {
  drawStyle: GraphDrawStyle.Line,
  showPoints: VisibilityMode.Auto,
  axisPlacement: AxisPlacement.Hidden,
  pointSize: 2
};
class Sparkline extends PureComponent {
  constructor(props) {
    super(props);
    const alignedDataFrame = preparePlotFrame(props.sparkline, props.config);
    this.state = {
      data: preparePlotData2(alignedDataFrame, getStackingGroups(alignedDataFrame)),
      alignedDataFrame,
      configBuilder: this.prepareConfig(alignedDataFrame)
    };
  }
  static getDerivedStateFromProps(props, state) {
    const _frame = preparePlotFrame(props.sparkline, props.config);
    const frame = nullToValue(_frame);
    if (!frame) {
      return __spreadValues({}, state);
    }
    return __spreadProps(__spreadValues({}, state), {
      data: preparePlotData2(frame, getStackingGroups(frame)),
      alignedDataFrame: frame
    });
  }
  componentDidUpdate(prevProps, prevState) {
    var _a, _b;
    const { alignedDataFrame } = this.state;
    if (!alignedDataFrame) {
      return;
    }
    let rebuildConfig = false;
    if (prevProps.sparkline !== this.props.sparkline) {
      const isStructureChanged = !compareDataFrameStructures(this.state.alignedDataFrame, prevState.alignedDataFrame);
      const isRangeChanged = !isEqual(
        (_a = alignedDataFrame.fields[1].state) == null ? void 0 : _a.range,
        (_b = prevState.alignedDataFrame.fields[1].state) == null ? void 0 : _b.range
      );
      rebuildConfig = isStructureChanged || isRangeChanged;
    } else {
      rebuildConfig = !isEqual(prevProps.config, this.props.config);
    }
    if (rebuildConfig) {
      this.setState({ configBuilder: this.prepareConfig(alignedDataFrame) });
    }
  }
  getYRange(field) {
    var _a, _b, _c, _d;
    let { min, max } = (_a = this.state.alignedDataFrame.fields[1].state) == null ? void 0 : _a.range;
    const noValue = +((_b = this.state.alignedDataFrame.fields[1].config) == null ? void 0 : _b.noValue);
    if (!Number.isNaN(noValue)) {
      min = Math.min(min, +noValue);
      max = Math.max(max, +noValue);
    }
    if (min === max) {
      if (min === 0) {
        max = 100;
      } else {
        min = 0;
        max *= 2;
      }
      return [min, max];
    }
    return [Math.max(min, (_c = field.config.min) != null ? _c : -Infinity), Math.min(max, (_d = field.config.max) != null ? _d : Infinity)];
  }
  prepareConfig(data) {
    var _a;
    const { theme } = this.props;
    const builder = new UPlotConfigBuilder();
    builder.setCursor({
      show: false,
      x: false,
      // no crosshairs
      y: false
    });
    const xField = data.fields[0];
    builder.addScale({
      scaleKey: "x",
      orientation: ScaleOrientation.Horizontal,
      direction: ScaleDirection.Right,
      isTime: false,
      //xField.type === FieldType.time,
      range: () => {
        const { sparkline } = this.props;
        if (sparkline.x) {
          if (sparkline.timeRange && sparkline.x.type === FieldType.time) {
            return [sparkline.timeRange.from.valueOf(), sparkline.timeRange.to.valueOf()];
          }
          const vals = sparkline.x.values;
          return [vals[0], vals[vals.length - 1]];
        }
        return [0, sparkline.y.values.length - 1];
      }
    });
    builder.addAxis({
      scaleKey: "x",
      theme,
      placement: AxisPlacement.Hidden
    });
    for (let i = 0; i < data.fields.length; i++) {
      const field = data.fields[i];
      const config = field.config;
      const customConfig = __spreadValues(__spreadValues({}, defaultConfig), config.custom);
      if (field === xField || field.type !== FieldType.number) {
        continue;
      }
      const scaleKey = config.unit || "__fixed";
      builder.addScale({
        scaleKey,
        orientation: ScaleOrientation.Vertical,
        direction: ScaleDirection.Up,
        range: () => this.getYRange(field)
      });
      builder.addAxis({
        scaleKey,
        theme,
        placement: AxisPlacement.Hidden
      });
      const colorMode = getFieldColorModeForField(field);
      const seriesColor = colorMode.getCalculator(field, theme)(0, 0);
      const pointsMode = customConfig.drawStyle === GraphDrawStyle.Points ? VisibilityMode.Always : customConfig.showPoints;
      builder.addSeries({
        pxAlign: false,
        scaleKey,
        theme,
        colorMode,
        thresholds: config.thresholds,
        drawStyle: customConfig.drawStyle,
        lineColor: (_a = customConfig.lineColor) != null ? _a : seriesColor,
        lineWidth: customConfig.lineWidth,
        lineInterpolation: customConfig.lineInterpolation,
        showPoints: pointsMode,
        pointSize: customConfig.pointSize,
        fillOpacity: customConfig.fillOpacity,
        fillColor: customConfig.fillColor,
        lineStyle: customConfig.lineStyle,
        gradientMode: customConfig.gradientMode
      });
    }
    return builder;
  }
  render() {
    const { data, configBuilder } = this.state;
    const { width, height } = this.props;
    return /* @__PURE__ */ React__default.createElement(UPlotChart, { data, config: configBuilder, width, height });
  }
}

export { Sparkline };
//# sourceMappingURL=Sparkline.js.map
