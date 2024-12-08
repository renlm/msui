import { cx } from '@emotion/css';
import React__default, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { VizOrientation, ThresholdsMode, GAUGE_DEFAULT_MINIMUM, GAUGE_DEFAULT_MAXIMUM, formattedValueToString, FALLBACK_COLOR, getFieldColorMode, FieldColorModeId } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { BarGaugeDisplayMode, BarGaugeValueMode, BarGaugeNamePlacement } from '@grafana/schema';
import { measureText, calculateFontSize } from '../../utils/measureText.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { FormattedValueDisplay } from '../FormattedValueDisplay/FormattedValueDisplay.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MIN_VALUE_HEIGHT = 18;
const MAX_VALUE_HEIGHT = 50;
const MAX_VALUE_WIDTH = 150;
const TITLE_LINE_HEIGHT = 1.5;
const VALUE_LINE_HEIGHT = 1;
const VALUE_LEFT_PADDING = 10;
class BarGauge extends PureComponent {
  render() {
    const { onClick, className, theme } = this.props;
    const { title } = this.props.value;
    const styles = getTitleStyles(this.props);
    if (onClick) {
      return /* @__PURE__ */ React__default.createElement(
        "button",
        {
          type: "button",
          style: styles.wrapper,
          onClick,
          className: cx(clearButtonStyles(theme), className)
        },
        /* @__PURE__ */ React__default.createElement("div", { style: styles.title }, title),
        this.renderBarAndValue()
      );
    }
    return /* @__PURE__ */ React__default.createElement("div", { style: styles.wrapper, className }, title && /* @__PURE__ */ React__default.createElement("div", { style: styles.title }, title), this.renderBarAndValue());
  }
  renderBarAndValue() {
    switch (this.props.displayMode) {
      case "lcd":
        return this.renderRetroBars();
      case "basic":
      case "gradient":
      default:
        return this.renderBasicAndGradientBars();
    }
  }
  renderBasicAndGradientBars() {
    const { value, showUnfilled, valueDisplayMode } = this.props;
    const styles = getBasicAndGradientStyles(this.props);
    return /* @__PURE__ */ React__default.createElement("div", { style: styles.wrapper }, valueDisplayMode !== BarGaugeValueMode.Hidden && /* @__PURE__ */ React__default.createElement(
      FormattedValueDisplay,
      {
        "data-testid": selectors.components.Panels.Visualization.BarGauge.valueV2,
        value,
        style: styles.value
      }
    ), showUnfilled && /* @__PURE__ */ React__default.createElement("div", { style: styles.emptyBar }), /* @__PURE__ */ React__default.createElement("div", { style: styles.bar }));
  }
  renderRetroBars() {
    var _a, _b;
    const {
      display,
      field,
      value,
      itemSpacing,
      alignmentFactors,
      orientation,
      lcdCellWidth,
      text,
      valueDisplayMode,
      theme
    } = this.props;
    const { valueHeight, valueWidth, maxBarHeight, maxBarWidth, wrapperWidth, wrapperHeight } = calculateBarAndValueDimensions(this.props);
    const minValue = (_a = field.min) != null ? _a : GAUGE_DEFAULT_MINIMUM;
    const maxValue = (_b = field.max) != null ? _b : GAUGE_DEFAULT_MAXIMUM;
    const isVert = isVertical(orientation);
    const valueRange = maxValue - minValue;
    const maxSize = isVert ? maxBarHeight : maxBarWidth;
    const cellSpacing = itemSpacing;
    const cellCount = Math.floor(maxSize / lcdCellWidth);
    const cellSize = Math.floor((maxSize - cellSpacing * cellCount) / cellCount);
    const valueColor = getTextValueColor(this.props);
    const valueToBaseSizeOn = alignmentFactors ? alignmentFactors : value;
    const valueStyles = getValueStyles(valueToBaseSizeOn, valueColor, valueWidth, valueHeight, orientation, text);
    const containerStyles = {
      width: `${wrapperWidth}px`,
      height: `${wrapperHeight}px`,
      display: "flex"
    };
    if (isVert) {
      containerStyles.flexDirection = "column-reverse";
      containerStyles.alignItems = "center";
    } else {
      containerStyles.flexDirection = "row";
      containerStyles.alignItems = "center";
      valueStyles.justifyContent = "flex-end";
    }
    const cells = [];
    for (let i = 0; i < cellCount; i++) {
      const currentValue = minValue + valueRange / cellCount * i;
      const cellColor = getCellColor(currentValue, value, display);
      const cellStyles = {
        borderRadius: theme.shape.radius.default
      };
      if (cellColor.isLit) {
        cellStyles.backgroundImage = `radial-gradient(${cellColor.background} 10%, ${cellColor.backgroundShade})`;
      } else {
        cellStyles.backgroundColor = cellColor.background;
      }
      if (isVert) {
        cellStyles.height = `${cellSize}px`;
        cellStyles.width = `${maxBarWidth}px`;
        cellStyles.marginTop = `${cellSpacing}px`;
      } else {
        cellStyles.width = `${cellSize}px`;
        cellStyles.height = `${maxBarHeight}px`;
        cellStyles.marginRight = `${cellSpacing}px`;
      }
      cells.push(/* @__PURE__ */ React__default.createElement("div", { key: i.toString(), style: cellStyles }));
    }
    return /* @__PURE__ */ React__default.createElement("div", { style: containerStyles }, cells, valueDisplayMode !== BarGaugeValueMode.Hidden && /* @__PURE__ */ React__default.createElement(
      FormattedValueDisplay,
      {
        "data-testid": selectors.components.Panels.Visualization.BarGauge.valueV2,
        value,
        style: valueStyles
      }
    ));
  }
}
__publicField(BarGauge, "defaultProps", {
  lcdCellWidth: 12,
  value: {
    text: "100",
    numeric: 100
  },
  displayMode: BarGaugeDisplayMode.Gradient,
  orientation: VizOrientation.Horizontal,
  field: {
    min: 0,
    max: 100,
    thresholds: {
      mode: ThresholdsMode.Absolute,
      steps: []
    }
  },
  itemSpacing: 8,
  showUnfilled: true
});
function isVertical(orientation) {
  return orientation === VizOrientation.Vertical;
}
function calculateTitleDimensions(props) {
  var _a, _b;
  const { height, width, alignmentFactors, orientation, text, namePlacement } = props;
  const title = alignmentFactors ? alignmentFactors.title : props.value.title;
  if (!title) {
    return { fontSize: 0, width: 0, height: 0, placement: "above" };
  }
  if (isVertical(orientation)) {
    const fontSize = (_a = text == null ? void 0 : text.titleSize) != null ? _a : 14;
    return {
      fontSize,
      width,
      height: fontSize * TITLE_LINE_HEIGHT,
      placement: "below"
    };
  }
  const shouldDisplayValueAbove = height > 40 && namePlacement === BarGaugeNamePlacement.Auto || namePlacement === BarGaugeNamePlacement.Top;
  if (shouldDisplayValueAbove) {
    if (text == null ? void 0 : text.titleSize) {
      return {
        fontSize: text == null ? void 0 : text.titleSize,
        width: 0,
        height: text.titleSize * TITLE_LINE_HEIGHT,
        placement: "above"
      };
    }
    const maxTitleHeightRatio2 = 0.45;
    const titleHeight2 = Math.max(Math.min(height * maxTitleHeightRatio2, MAX_VALUE_HEIGHT), 17);
    return {
      fontSize: titleHeight2 / TITLE_LINE_HEIGHT,
      width: 0,
      height: titleHeight2,
      placement: "above"
    };
  }
  const maxTitleHeightRatio = 0.6;
  const titleHeight = Math.max(height * maxTitleHeightRatio, MIN_VALUE_HEIGHT);
  const titleFontSize = titleHeight / TITLE_LINE_HEIGHT;
  const textSize = measureText(title, titleFontSize);
  const textWidth = Math.min(textSize.width + 15, width * 0.4);
  return {
    fontSize: (_b = text == null ? void 0 : text.titleSize) != null ? _b : titleFontSize,
    height: 0,
    width: textWidth,
    placement: "left"
  };
}
function getTitleStyles(props) {
  const wrapperStyles = {
    display: "flex",
    overflow: "hidden",
    width: "100%"
  };
  const titleDim = calculateTitleDimensions(props);
  const titleStyles = {
    fontSize: `${titleDim.fontSize}px`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    alignItems: "center",
    alignSelf: "center"
  };
  if (isVertical(props.orientation)) {
    wrapperStyles.flexDirection = "column-reverse";
    titleStyles.textAlign = "center";
  } else {
    if (titleDim.placement === "above") {
      wrapperStyles.flexDirection = "column";
    } else {
      wrapperStyles.flexDirection = "row";
      titleStyles.width = `${titleDim.width}px`;
      titleStyles.textAlign = "right";
      titleStyles.paddingRight = "10px";
    }
  }
  return {
    wrapper: wrapperStyles,
    title: titleStyles
  };
}
function calculateBarAndValueDimensions(props) {
  var _a;
  const { height, width, orientation, text, alignmentFactors, valueDisplayMode } = props;
  const titleDim = calculateTitleDimensions(props);
  const value = alignmentFactors != null ? alignmentFactors : props.value;
  const valueString = formattedValueToString(value);
  let maxBarHeight = 0;
  let maxBarWidth = 0;
  let valueHeight = 0;
  let valueWidth = 0;
  let wrapperWidth = 0;
  let wrapperHeight = 0;
  const fontSizeToMeasureWith = (_a = text == null ? void 0 : text.valueSize) != null ? _a : Math.max(titleDim.fontSize, 12);
  const realTextSize = measureText(valueString, fontSizeToMeasureWith);
  const realValueWidth = realTextSize.width + VALUE_LEFT_PADDING * 2;
  if (isVertical(orientation)) {
    if (text == null ? void 0 : text.valueSize) {
      valueHeight = text.valueSize * VALUE_LINE_HEIGHT;
    } else {
      valueHeight = Math.min(Math.max(height * 0.1, MIN_VALUE_HEIGHT), MAX_VALUE_HEIGHT);
    }
    valueWidth = width;
    if (valueDisplayMode === BarGaugeValueMode.Hidden) {
      valueHeight = 0;
      valueWidth = 0;
    }
    maxBarHeight = height - (titleDim.height + valueHeight);
    maxBarWidth = width;
    wrapperWidth = width;
    wrapperHeight = height - titleDim.height;
  } else {
    if (valueDisplayMode === BarGaugeValueMode.Hidden) {
      valueHeight = 0;
      valueWidth = 0;
    } else {
      valueHeight = height - titleDim.height;
      valueWidth = Math.max(Math.min(width * 0.2, MAX_VALUE_WIDTH), realValueWidth);
    }
    maxBarHeight = height - titleDim.height;
    maxBarWidth = width - valueWidth - titleDim.width;
    if (titleDim.placement === "above") {
      wrapperWidth = width;
      wrapperHeight = height - titleDim.height;
    } else {
      wrapperWidth = width - titleDim.width;
      wrapperHeight = height;
    }
  }
  return {
    valueWidth,
    valueHeight,
    maxBarWidth,
    maxBarHeight,
    wrapperHeight,
    wrapperWidth
  };
}
function getCellColor(positionValue, value, display) {
  if (positionValue === null) {
    return {
      background: FALLBACK_COLOR,
      border: FALLBACK_COLOR
    };
  }
  const color = display ? display(positionValue).color : null;
  if (color) {
    if (value === null || isNaN(value.numeric) || positionValue !== null && positionValue > value.numeric) {
      return {
        background: tinycolor(color).setAlpha(0.18).toRgbString(),
        border: "transparent",
        isLit: false
      };
    } else {
      return {
        background: tinycolor(color).setAlpha(0.95).toRgbString(),
        backgroundShade: tinycolor(color).setAlpha(0.55).toRgbString(),
        border: tinycolor(color).setAlpha(0.9).toRgbString(),
        isLit: true
      };
    }
  }
  return {
    background: FALLBACK_COLOR,
    border: FALLBACK_COLOR
  };
}
function getValuePercent(value, minValue, maxValue) {
  const valueRatio = Math.min((value - minValue) / (maxValue - minValue), 1);
  return isNaN(valueRatio) ? 0 : valueRatio;
}
function getBasicAndGradientStyles(props) {
  var _a, _b, _c;
  const { displayMode, field, value, alignmentFactors, orientation, theme, text } = props;
  const { valueWidth, valueHeight, maxBarHeight, maxBarWidth } = calculateBarAndValueDimensions(props);
  const minValue = (_a = field.min) != null ? _a : GAUGE_DEFAULT_MINIMUM;
  const maxValue = (_b = field.max) != null ? _b : GAUGE_DEFAULT_MAXIMUM;
  const valuePercent = getValuePercent(value.numeric, minValue, maxValue);
  const textColor = getTextValueColor(props);
  const barColor = (_c = value.color) != null ? _c : FALLBACK_COLOR;
  const valueToBaseSizeOn = alignmentFactors ? alignmentFactors : value;
  const valueStyles = getValueStyles(valueToBaseSizeOn, textColor, valueWidth, valueHeight, orientation, text);
  const isBasic = displayMode === "basic";
  const wrapperStyles = {
    display: "flex",
    flexGrow: 1
  };
  const barStyles = {
    borderRadius: theme.shape.radius.default,
    position: "relative",
    zIndex: 1
  };
  const emptyBar = {
    background: theme.colors.background.secondary,
    flexGrow: 1,
    display: "flex",
    borderRadius: theme.shape.radius.default,
    position: "relative"
  };
  if (isVertical(orientation)) {
    const barHeight = Math.max(valuePercent * maxBarHeight, 1);
    wrapperStyles.flexDirection = "column";
    wrapperStyles.justifyContent = "flex-end";
    barStyles.transition = "height 1s";
    barStyles.height = `${barHeight}px`;
    barStyles.width = `${maxBarWidth}px`;
    emptyBar.bottom = "-3px";
    emptyBar.width = `${valueWidth}px`;
    if (isBasic) {
      barStyles.background = `${tinycolor(barColor).setAlpha(0.35).toRgbString()}`;
      barStyles.borderTop = `2px solid ${barColor}`;
    } else {
      barStyles.background = getBarGradient(props, maxBarHeight);
    }
  } else {
    const barWidth = Math.max(valuePercent * maxBarWidth, 1);
    wrapperStyles.flexDirection = "row-reverse";
    wrapperStyles.justifyContent = "flex-end";
    wrapperStyles.alignItems = "stretch";
    barStyles.transition = "width 1s";
    barStyles.height = `${maxBarHeight}px`;
    barStyles.width = `${barWidth}px`;
    emptyBar.left = "-3px";
    emptyBar.height = `${valueHeight}px`;
    if (isBasic) {
      barStyles.background = `${tinycolor(barColor).setAlpha(0.35).toRgbString()}`;
      barStyles.borderRight = `2px solid ${barColor}`;
    } else {
      barStyles.background = getBarGradient(props, maxBarWidth);
    }
  }
  return {
    wrapper: wrapperStyles,
    bar: barStyles,
    value: valueStyles,
    emptyBar
  };
}
function getBarGradient(props, maxSize) {
  var _a, _b;
  const { field, value, orientation, theme } = props;
  const cssDirection = isVertical(orientation) ? "0deg" : "90deg";
  const minValue = field.min;
  const maxValue = field.max;
  let gradient = "";
  let lastpos = 0;
  let mode = getFieldColorMode((_a = field.color) == null ? void 0 : _a.mode);
  if (mode.id === FieldColorModeId.Thresholds) {
    const thresholds = field.thresholds;
    for (let i = 0; i < thresholds.steps.length; i++) {
      const threshold = thresholds.steps[i];
      const color = props.theme.visualization.getColorByName(threshold.color);
      const valuePercent = thresholds.mode === ThresholdsMode.Percentage ? threshold.value / 100 : getValuePercent(threshold.value, minValue, maxValue);
      const pos = valuePercent * maxSize;
      const offset = Math.round(pos - (pos - lastpos) / 2);
      const thresholdValue = thresholds.mode === ThresholdsMode.Percentage ? minValue + (maxValue - minValue) * valuePercent : threshold.value;
      if (gradient === "") {
        gradient = `linear-gradient(${cssDirection}, ${color}, ${color}`;
      } else if (value.numeric < thresholdValue) {
        break;
      } else {
        lastpos = pos;
        gradient += ` ${offset}px, ${color}`;
      }
    }
    return gradient + ")";
  }
  if (mode.isContinuous && mode.getColors) {
    const scheme = mode.getColors(theme);
    for (let i = 0; i < scheme.length; i++) {
      const color = scheme[i];
      if (gradient === "") {
        gradient = `linear-gradient(${cssDirection}, ${color} 0px`;
      } else {
        const valuePercent = i / (scheme.length - 1);
        const pos = valuePercent * maxSize;
        gradient += `, ${color} ${pos}px`;
      }
    }
    return gradient + ")";
  }
  return (_b = value.color) != null ? _b : FALLBACK_COLOR;
}
function getTextValueColor(props) {
  if (props.valueDisplayMode === "text") {
    return props.theme.colors.text.primary;
  }
  const { value } = props;
  if (value.color) {
    return value.color;
  }
  return FALLBACK_COLOR;
}
function getValueStyles(value, color, width, height, orientation, text) {
  var _a, _b;
  const styles = {
    color,
    height: `${height}px`,
    width: `${width}px`,
    display: "flex",
    alignItems: "center",
    lineHeight: VALUE_LINE_HEIGHT
  };
  let textWidth = width;
  const formattedValueString = formattedValueToString(value);
  if (isVertical(orientation)) {
    styles.fontSize = (_a = text == null ? void 0 : text.valueSize) != null ? _a : calculateFontSize(formattedValueString, textWidth, height, VALUE_LINE_HEIGHT);
    styles.justifyContent = `center`;
  } else {
    styles.fontSize = (_b = text == null ? void 0 : text.valueSize) != null ? _b : calculateFontSize(formattedValueString, textWidth - VALUE_LEFT_PADDING * 2, height, VALUE_LINE_HEIGHT);
    styles.justifyContent = `flex-end`;
    styles.paddingLeft = `${VALUE_LEFT_PADDING}px`;
    styles.paddingRight = `${VALUE_LEFT_PADDING}px`;
    textWidth -= VALUE_LEFT_PADDING;
  }
  return styles;
}

export { BarGauge, calculateBarAndValueDimensions, getBarGradient, getBasicAndGradientStyles, getCellColor, getTextValueColor, getTitleStyles, getValuePercent };
//# sourceMappingURL=BarGauge.js.map
