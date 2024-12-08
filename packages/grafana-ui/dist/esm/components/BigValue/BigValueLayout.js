import React__default from 'react';
import tinycolor from 'tinycolor2';
import { FieldType, formattedValueToString } from '@grafana/data';
import { GraphDrawStyle, PercentChangeColorMode } from '@grafana/schema';
import '../../utils/dom.js';
import { getTextColorForAlphaBackground } from '../../utils/colors.js';
import 'slate';
import { calculateFontSize } from '../../utils/measureText.js';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { Sparkline } from '../Sparkline/Sparkline.js';
import { BigValueColorMode, BigValueTextMode, BigValueJustifyMode } from './BigValue.js';
import { percentChangeString } from './PercentChange.js';

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
const LINE_HEIGHT = 1.2;
const MAX_TITLE_SIZE = 30;
const VALUE_FONT_WEIGHT = 500;
class BigValueLayout {
  constructor(props) {
    this.props = props;
    __publicField(this, "titleFontSize");
    __publicField(this, "valueFontSize");
    __publicField(this, "chartHeight");
    __publicField(this, "chartWidth");
    __publicField(this, "valueColor");
    __publicField(this, "panelPadding");
    __publicField(this, "justifyCenter");
    __publicField(this, "titleToAlignTo");
    __publicField(this, "valueToAlignTo");
    __publicField(this, "maxTextWidth");
    __publicField(this, "maxTextHeight");
    __publicField(this, "textValues");
    var _a;
    const { width, height, value, text } = props;
    this.valueColor = (_a = value.color) != null ? _a : "gray";
    this.panelPadding = height > 100 ? 12 : 8;
    this.textValues = getTextValues(props);
    this.justifyCenter = shouldJustifyCenter(props.justifyMode, this.textValues.title);
    this.valueToAlignTo = this.textValues.valueToAlignTo;
    this.titleToAlignTo = this.textValues.titleToAlignTo;
    this.titleFontSize = 0;
    this.valueFontSize = 0;
    this.chartHeight = 0;
    this.chartWidth = 0;
    this.maxTextWidth = width - this.panelPadding * 2;
    this.maxTextHeight = height - this.panelPadding * 2;
    if (text) {
      if (text.titleSize) {
        this.titleFontSize = text.titleSize;
        this.titleToAlignTo = void 0;
      }
      if (text.valueSize) {
        this.valueFontSize = text.valueSize;
        this.valueToAlignTo = "";
      }
    }
  }
  getTitleStyles() {
    const styles = {
      fontSize: `${this.titleFontSize}px`,
      lineHeight: LINE_HEIGHT
    };
    if (this.props.colorMode === BigValueColorMode.Background || this.props.colorMode === BigValueColorMode.BackgroundSolid) {
      styles.color = getTextColorForAlphaBackground(this.valueColor, this.props.theme.isDark);
    }
    return styles;
  }
  getValueStyles() {
    const styles = {
      fontSize: this.valueFontSize,
      fontWeight: VALUE_FONT_WEIGHT,
      lineHeight: LINE_HEIGHT,
      position: "relative",
      zIndex: 1
    };
    if (this.justifyCenter) {
      styles.textAlign = "center";
    }
    switch (this.props.colorMode) {
      case BigValueColorMode.Value:
        styles.color = this.valueColor;
        break;
      case BigValueColorMode.Background:
      case BigValueColorMode.BackgroundSolid:
        styles.color = getTextColorForAlphaBackground(this.valueColor, this.props.theme.isDark);
        break;
      case BigValueColorMode.None:
        styles.color = this.props.theme.colors.text.primary;
        break;
    }
    return styles;
  }
  getPercentChangeStyles(percentChange, percentChangeColorMode, valueStyles) {
    const VALUE_TO_PERCENT_CHANGE_RATIO = 2.5;
    const valueContainerStyles = this.getValueAndTitleContainerStyles();
    const percentFontSize = Math.max(this.valueFontSize / VALUE_TO_PERCENT_CHANGE_RATIO, 12);
    let iconSize = Math.max(this.valueFontSize / 3, 10);
    const themeVisualizationColors = this.props.theme.visualization;
    const color = getPercentChangeColor(percentChange, percentChangeColorMode, valueStyles, themeVisualizationColors);
    const containerStyles = {
      fontSize: percentFontSize,
      fontWeight: VALUE_FONT_WEIGHT,
      lineHeight: LINE_HEIGHT,
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: Math.max(percentFontSize / 3, 4),
      zIndex: 1,
      color
    };
    if (this.justifyCenter) {
      containerStyles.textAlign = "center";
    }
    if (valueContainerStyles.flexDirection === "column" && percentFontSize > 12) {
      containerStyles.marginTop = -(percentFontSize / 4);
    }
    if (valueContainerStyles.flexDirection === "row") {
      containerStyles.alignItems = "baseline";
      containerStyles.lineHeight = LINE_HEIGHT * VALUE_TO_PERCENT_CHANGE_RATIO;
    }
    switch (this.props.colorMode) {
      case BigValueColorMode.Background:
      case BigValueColorMode.BackgroundSolid:
        containerStyles.color = getTextColorForAlphaBackground(this.valueColor, this.props.theme.isDark);
        break;
    }
    if (this.props.textMode === BigValueTextMode.None) {
      containerStyles.fontSize = calculateFontSize(
        percentChangeString(percentChange),
        this.maxTextWidth * 0.8,
        this.maxTextHeight * 0.8,
        LINE_HEIGHT,
        void 0,
        VALUE_FONT_WEIGHT
      );
      iconSize = containerStyles.fontSize * 0.8;
    }
    return {
      containerStyles,
      iconSize
    };
  }
  getValueAndTitleContainerStyles() {
    const styles = {
      display: "flex",
      flexWrap: "wrap"
    };
    if (this.justifyCenter) {
      styles.alignItems = "center";
      styles.justifyContent = "center";
      styles.flexGrow = 1;
      styles.gap = "0.75ch";
    }
    return styles;
  }
  getPanelStyles() {
    const { width, height, theme, colorMode, textMode } = this.props;
    const panelStyles = {
      width: `${width}px`,
      height: `${height}px`,
      padding: `${textMode === BigValueTextMode.None ? 2 : this.panelPadding}px`,
      borderRadius: theme.shape.radius.default,
      position: "relative",
      display: "flex"
    };
    const themeFactor = theme.isDark ? 1 : -0.7;
    switch (colorMode) {
      case BigValueColorMode.Background:
        const bgColor2 = tinycolor(this.valueColor).darken(15 * themeFactor).spin(8).toRgbString();
        const bgColor3 = tinycolor(this.valueColor).darken(5 * themeFactor).spin(-8).toRgbString();
        panelStyles.background = `linear-gradient(120deg, ${bgColor2}, ${bgColor3})`;
        break;
      case BigValueColorMode.BackgroundSolid:
        panelStyles.background = tinycolor(this.valueColor).toString();
        break;
      case BigValueColorMode.Value:
        panelStyles.background = `transparent`;
        break;
    }
    if (this.justifyCenter) {
      panelStyles.alignItems = "center";
      panelStyles.flexDirection = "row";
    }
    return panelStyles;
  }
  renderChart() {
    var _a;
    const { sparkline, colorMode } = this.props;
    if (!sparkline || ((_a = sparkline.y) == null ? void 0 : _a.type) !== FieldType.number) {
      return null;
    }
    let fillColor;
    let lineColor;
    switch (colorMode) {
      case BigValueColorMode.Background:
      case BigValueColorMode.BackgroundSolid:
        fillColor = "rgba(255,255,255,0.4)";
        lineColor = tinycolor(this.valueColor).brighten(40).toRgbString();
        break;
      case BigValueColorMode.None:
      case BigValueColorMode.Value:
      default:
        lineColor = this.valueColor;
        fillColor = tinycolor(this.valueColor).setAlpha(0.2).toRgbString();
        break;
    }
    const config = {
      custom: {
        drawStyle: GraphDrawStyle.Line,
        lineWidth: 1,
        fillColor,
        lineColor
      }
    };
    return /* @__PURE__ */ React__default.createElement("div", { style: this.getChartStyles() }, /* @__PURE__ */ React__default.createElement(
      Sparkline,
      {
        height: this.chartHeight,
        width: this.chartWidth,
        sparkline,
        config,
        theme: this.props.theme
      }
    ));
  }
  getChartStyles() {
    return {
      position: "absolute",
      right: 0,
      bottom: 0
    };
  }
}
class WideNoChartLayout extends BigValueLayout {
  constructor(props) {
    var _a, _b;
    super(props);
    const valueWidthPercent = ((_a = this.titleToAlignTo) == null ? void 0 : _a.length) ? 0.3 : 1;
    if (this.valueToAlignTo.length) {
      this.valueFontSize = calculateFontSize(
        this.valueToAlignTo,
        this.maxTextWidth * valueWidthPercent,
        this.maxTextHeight,
        LINE_HEIGHT,
        void 0,
        VALUE_FONT_WEIGHT
      );
    }
    if ((_b = this.titleToAlignTo) == null ? void 0 : _b.length) {
      this.titleFontSize = calculateFontSize(
        this.titleToAlignTo,
        this.maxTextWidth * 0.6,
        this.maxTextHeight,
        LINE_HEIGHT,
        MAX_TITLE_SIZE
      );
      this.titleFontSize = Math.min(this.valueFontSize * 0.7, this.titleFontSize);
    }
  }
  getValueAndTitleContainerStyles() {
    const styles = super.getValueAndTitleContainerStyles();
    styles.flexDirection = "row";
    styles.alignItems = "center";
    styles.flexGrow = 1;
    if (!this.justifyCenter) {
      styles.justifyContent = "space-between";
    }
    return styles;
  }
  renderChart() {
    return null;
  }
  getPanelStyles() {
    const panelStyles = super.getPanelStyles();
    panelStyles.alignItems = "center";
    return panelStyles;
  }
}
class WideWithChartLayout extends BigValueLayout {
  constructor(props) {
    var _a;
    super(props);
    const { width, height } = props;
    const chartHeightPercent = 0.5;
    const titleWidthPercent = 0.6;
    const valueWidthPercent = 1 - titleWidthPercent;
    const textHeightPercent = 0.4;
    this.chartWidth = width;
    this.chartHeight = height * chartHeightPercent;
    if ((_a = this.titleToAlignTo) == null ? void 0 : _a.length) {
      this.titleFontSize = calculateFontSize(
        this.titleToAlignTo,
        this.maxTextWidth * titleWidthPercent,
        this.maxTextHeight * textHeightPercent,
        LINE_HEIGHT,
        MAX_TITLE_SIZE
      );
    }
    if (this.valueToAlignTo.length) {
      this.valueFontSize = calculateFontSize(
        this.valueToAlignTo,
        this.maxTextWidth * valueWidthPercent,
        this.maxTextHeight * chartHeightPercent,
        LINE_HEIGHT,
        void 0,
        VALUE_FONT_WEIGHT
      );
    }
  }
  getValueAndTitleContainerStyles() {
    const styles = super.getValueAndTitleContainerStyles();
    styles.flexDirection = "row";
    styles.flexGrow = 1;
    if (!this.justifyCenter) {
      styles.justifyContent = "space-between";
    }
    return styles;
  }
  getPanelStyles() {
    const styles = super.getPanelStyles();
    styles.flexDirection = "row";
    styles.justifyContent = "space-between";
    return styles;
  }
}
class StackedWithChartLayout extends BigValueLayout {
  constructor(props) {
    var _a, _b;
    super(props);
    const { width, height } = props;
    const titleHeightPercent = 0.15;
    const chartHeightPercent = 0.25;
    let titleHeight = 0;
    this.chartHeight = height * chartHeightPercent;
    this.chartWidth = width;
    if ((_a = this.titleToAlignTo) == null ? void 0 : _a.length) {
      this.titleFontSize = calculateFontSize(
        this.titleToAlignTo,
        this.maxTextWidth,
        height * titleHeightPercent,
        LINE_HEIGHT,
        MAX_TITLE_SIZE
      );
      titleHeight = this.titleFontSize * LINE_HEIGHT;
    }
    if (this.valueToAlignTo.length) {
      this.valueFontSize = calculateFontSize(
        this.valueToAlignTo,
        this.maxTextWidth,
        this.maxTextHeight - this.chartHeight - titleHeight,
        LINE_HEIGHT,
        void 0,
        VALUE_FONT_WEIGHT
      );
    }
    if ((_b = this.titleToAlignTo) == null ? void 0 : _b.length) {
      this.titleFontSize = Math.min(this.valueFontSize * 0.7, this.titleFontSize);
    }
    this.chartHeight = height - this.titleFontSize * LINE_HEIGHT - this.valueFontSize * LINE_HEIGHT;
  }
  getValueAndTitleContainerStyles() {
    const styles = super.getValueAndTitleContainerStyles();
    styles.flexDirection = "column";
    styles.justifyContent = "center";
    return styles;
  }
  getPanelStyles() {
    const styles = super.getPanelStyles();
    styles.flexDirection = "column";
    return styles;
  }
}
class StackedWithNoChartLayout extends BigValueLayout {
  constructor(props) {
    var _a, _b;
    super(props);
    const { height } = props;
    const titleHeightPercent = 0.15;
    let titleHeight = 0;
    if ((_a = this.titleToAlignTo) == null ? void 0 : _a.length) {
      this.titleFontSize = calculateFontSize(
        this.titleToAlignTo,
        this.maxTextWidth,
        height * titleHeightPercent,
        LINE_HEIGHT,
        MAX_TITLE_SIZE
      );
      titleHeight = this.titleFontSize * LINE_HEIGHT;
    }
    if (this.valueToAlignTo.length) {
      this.valueFontSize = calculateFontSize(
        this.valueToAlignTo,
        this.maxTextWidth,
        this.maxTextHeight - titleHeight,
        LINE_HEIGHT,
        void 0,
        VALUE_FONT_WEIGHT
      );
    }
    if ((_b = this.titleToAlignTo) == null ? void 0 : _b.length) {
      this.titleFontSize = Math.min(this.valueFontSize * 0.7, this.titleFontSize);
    }
  }
  getValueAndTitleContainerStyles() {
    const styles = super.getValueAndTitleContainerStyles();
    styles.flexDirection = "column";
    styles.flexGrow = 1;
    return styles;
  }
  renderChart() {
    return null;
  }
  getPanelStyles() {
    const styles = super.getPanelStyles();
    styles.alignItems = "center";
    return styles;
  }
}
function buildLayout(props) {
  const { width, height, sparkline } = props;
  const useWideLayout = width / height > 2.5 && !props.disableWideLayout;
  if (useWideLayout) {
    if (height > 50 && !!sparkline && sparkline.y.values.length > 1) {
      return new WideWithChartLayout(props);
    } else {
      return new WideNoChartLayout(props);
    }
  }
  if (height > 100 && sparkline && sparkline.y.values.length > 1) {
    return new StackedWithChartLayout(props);
  } else {
    return new StackedWithNoChartLayout(props);
  }
}
function shouldJustifyCenter(justifyMode, title) {
  if (justifyMode === BigValueJustifyMode.Center) {
    return true;
  }
  return (title != null ? title : "").length === 0;
}
function getTextValues(props) {
  const { value, alignmentFactors, count } = props;
  let { textMode } = props;
  const titleToAlignTo = alignmentFactors ? alignmentFactors.title : value.title;
  const valueToAlignTo = formattedValueToString(alignmentFactors ? alignmentFactors : value);
  if (textMode === BigValueTextMode.Auto && (count != null ? count : 1) === 1) {
    textMode = BigValueTextMode.Value;
  }
  switch (textMode) {
    case BigValueTextMode.Name:
      return __spreadProps(__spreadValues({}, value), {
        title: void 0,
        prefix: void 0,
        suffix: void 0,
        text: value.title || "",
        titleToAlignTo: void 0,
        valueToAlignTo: titleToAlignTo != null ? titleToAlignTo : "",
        tooltip: formattedValueToString(value)
      });
    case BigValueTextMode.Value:
      return __spreadProps(__spreadValues({}, value), {
        title: void 0,
        titleToAlignTo: void 0,
        valueToAlignTo,
        tooltip: value.title
      });
    case BigValueTextMode.None:
      return {
        numeric: value.numeric,
        color: value.color,
        title: void 0,
        text: "",
        titleToAlignTo: void 0,
        valueToAlignTo: "1",
        tooltip: `Name: ${value.title}
Value: ${formattedValueToString(value)}`
      };
    case BigValueTextMode.ValueAndName:
    default:
      return __spreadProps(__spreadValues({}, value), {
        titleToAlignTo,
        valueToAlignTo
      });
  }
}
function getPercentChangeColor(percentChange, percentChangeColorMode, valueStyles, themeVisualizationColors) {
  if (percentChangeColorMode === PercentChangeColorMode.SameAsValue) {
    return valueStyles.color;
  } else {
    return percentChange * (percentChangeColorMode === PercentChangeColorMode.Inverted ? -1 : 1) > 0 ? themeVisualizationColors.getColorByName("green") : themeVisualizationColors.getColorByName("red");
  }
}

export { BigValueLayout, StackedWithChartLayout, StackedWithNoChartLayout, WideNoChartLayout, WideWithChartLayout, buildLayout, getPercentChangeColor, shouldJustifyCenter };
//# sourceMappingURL=BigValueLayout.js.map
