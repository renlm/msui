import $ from 'jquery';
import React__default, { PureComponent } from 'react';
import { formattedValueToString, GAUGE_DEFAULT_MINIMUM, GAUGE_DEFAULT_MAXIMUM, ThresholdsMode } from '@grafana/data';
import { VizOrientation } from '@grafana/schema';
import { calculateFontSize } from '../../utils/measureText.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { calculateGaugeAutoProps, getFormattedThresholds, DEFAULT_THRESHOLDS } from './utils.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Gauge extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "canvasElement", null);
    __publicField(this, "renderVisualization", () => {
      var _a;
      const { width, value, height, onClick, text, theme, orientation } = this.props;
      const autoProps = calculateGaugeAutoProps(width, height, value.title, orientation);
      const gaugeWidth = orientation === VizOrientation.Vertical ? `${autoProps.gaugeHeight}px` : "100%";
      const gaugeElement = /* @__PURE__ */ React__default.createElement(
        "div",
        {
          style: { height: `${autoProps.gaugeHeight}px`, width: gaugeWidth },
          ref: (element) => this.canvasElement = element
        }
      );
      return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, onClick ? /* @__PURE__ */ React__default.createElement("button", { className: clearButtonStyles(theme), type: "button", onClick }, gaugeElement) : gaugeElement, autoProps.showLabel && /* @__PURE__ */ React__default.createElement(
        "div",
        {
          style: {
            textAlign: "center",
            fontSize: (_a = text == null ? void 0 : text.titleSize) != null ? _a : autoProps.titleFontSize,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            position: "relative",
            width: gaugeWidth,
            top: "-4px",
            cursor: "default"
          }
        },
        value.title
      ));
    });
  }
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate() {
    this.draw();
  }
  draw() {
    var _a, _b, _c, _d, _e, _f;
    const { field, showThresholdLabels, showThresholdMarkers, width, height, theme, value, orientation } = this.props;
    const autoProps = calculateGaugeAutoProps(width, height, value.title);
    const calculatedGaugeWidth = orientation === VizOrientation.Vertical ? autoProps.gaugeHeight : width;
    const dimension = Math.min(calculatedGaugeWidth, autoProps.gaugeHeight);
    const backgroundColor = theme.colors.background.secondary;
    const gaugeWidthReduceRatio = showThresholdLabels ? 1.5 : 1;
    const gaugeWidth = Math.min(dimension / 5.5, 40) / gaugeWidthReduceRatio;
    const thresholdMarkersWidth = gaugeWidth / 5;
    const text = formattedValueToString(value);
    const valueWidthBase = Math.min(calculatedGaugeWidth, dimension * 1.3) * 0.9;
    const valueWidth = valueWidthBase - ((gaugeWidth + (showThresholdMarkers ? thresholdMarkersWidth : 0) + (showThresholdLabels ? 10 : 0)) * 2 + 10);
    const fontSize = (_b = (_a = this.props.text) == null ? void 0 : _a.valueSize) != null ? _b : calculateFontSize(text, valueWidth, dimension, 1, gaugeWidth * 1.7);
    const thresholdLabelFontSize = Math.max(fontSize / 2.5, 12);
    let min = (_c = field.min) != null ? _c : GAUGE_DEFAULT_MINIMUM;
    let max = (_d = field.max) != null ? _d : GAUGE_DEFAULT_MAXIMUM;
    let numeric = value.numeric;
    if (((_e = field.thresholds) == null ? void 0 : _e.mode) === ThresholdsMode.Percentage) {
      min = 0;
      max = 100;
      if (value.percent === void 0) {
        numeric = (numeric - min) / (max - min) * 100;
      } else {
        numeric = value.percent * 100;
      }
    }
    const decimals = field.decimals === void 0 ? 2 : field.decimals;
    if (showThresholdMarkers) {
      min = +min.toFixed(decimals);
      max = +max.toFixed(decimals);
    }
    const options = {
      series: {
        gauges: {
          gauge: {
            min,
            max,
            neutralValue: (_f = field.custom) == null ? void 0 : _f.neutral,
            background: { color: backgroundColor },
            border: { color: null },
            shadow: { show: false },
            width: gaugeWidth
          },
          frame: { show: false },
          label: { show: false },
          layout: { margin: 0, thresholdWidth: 0, vMargin: 0 },
          cell: { border: { width: 0 } },
          threshold: {
            values: getFormattedThresholds(decimals, field, value, theme),
            label: {
              show: showThresholdLabels,
              margin: thresholdMarkersWidth + 1,
              font: { size: thresholdLabelFontSize }
            },
            show: showThresholdMarkers,
            width: thresholdMarkersWidth
          },
          value: {
            color: value.color,
            formatter: () => {
              return text;
            },
            font: { size: fontSize, family: theme.typography.fontFamily }
          },
          show: true
        }
      }
    };
    const plotSeries = {
      data: [[0, numeric]],
      label: value.title
    };
    try {
      if (this.canvasElement) {
        $.plot(this.canvasElement, [plotSeries], options);
      }
    } catch (err) {
      console.error("Gauge rendering error", err, options, value);
    }
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden"
        },
        className: this.props.className
      },
      this.renderVisualization()
    );
  }
}
__publicField(Gauge, "defaultProps", {
  showThresholdMarkers: true,
  showThresholdLabels: false,
  field: {
    min: 0,
    max: 100,
    thresholds: DEFAULT_THRESHOLDS
  }
});

export { Gauge };
//# sourceMappingURL=Gauge.js.map
