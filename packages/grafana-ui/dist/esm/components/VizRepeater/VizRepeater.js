import { clamp } from 'lodash';
import React__default, { PureComponent } from 'react';
import { VizOrientation } from '@grafana/data';
import { calculateGridDimensions } from '../../utils/squares.js';

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
class VizRepeater extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: props.getValues()
    };
  }
  componentDidUpdate(prevProps) {
    const { renderCounter, source } = this.props;
    if (renderCounter !== prevProps.renderCounter || source !== prevProps.source) {
      this.setState({ values: this.props.getValues() });
    }
  }
  getOrientation() {
    const { orientation, width, height } = this.props;
    if (orientation === VizOrientation.Auto) {
      if (width > height) {
        return VizOrientation.Vertical;
      } else {
        return VizOrientation.Horizontal;
      }
    }
    return orientation;
  }
  renderGrid() {
    const { renderValue, height, width, itemSpacing, getAlignmentFactors, orientation } = this.props;
    const { values } = this.state;
    const grid = calculateGridDimensions(width, height, itemSpacing, values.length);
    const alignmentFactors = getAlignmentFactors ? getAlignmentFactors(values, grid.width, grid.height) : {};
    let xGrid = 0;
    let yGrid = 0;
    let items = [];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const isLastRow = yGrid === grid.yCount - 1;
      const itemWidth = isLastRow ? grid.widthOnLastRow : grid.width;
      const itemHeight = grid.height;
      const xPos = xGrid * itemWidth + itemSpacing * xGrid;
      const yPos = yGrid * itemHeight + itemSpacing * yGrid;
      const itemStyles = {
        position: "absolute",
        left: xPos,
        top: yPos,
        width: `${itemWidth}px`,
        height: `${itemHeight}px`
      };
      items.push(
        /* @__PURE__ */ React__default.createElement("div", { key: i, style: itemStyles }, renderValue({
          value,
          width: itemWidth,
          height: itemHeight,
          alignmentFactors,
          orientation,
          count: values.length
        }))
      );
      xGrid++;
      if (xGrid === grid.xCount) {
        xGrid = 0;
        yGrid++;
      }
    }
    return /* @__PURE__ */ React__default.createElement("div", { style: { position: "relative" } }, items);
  }
  render() {
    const {
      renderValue,
      height,
      width,
      itemSpacing,
      getAlignmentFactors,
      autoGrid,
      orientation,
      maxVizHeight,
      minVizWidth,
      minVizHeight
    } = this.props;
    const { values } = this.state;
    if (autoGrid && orientation === VizOrientation.Auto) {
      return this.renderGrid();
    }
    const itemStyles = {
      display: "flex"
    };
    const repeaterStyle = {
      display: "flex",
      overflow: `${minVizWidth ? "auto" : "hidden"} ${minVizHeight ? "auto" : "hidden"}`
    };
    let vizHeight = height;
    let vizWidth = width;
    const resolvedOrientation = this.getOrientation();
    switch (resolvedOrientation) {
      case VizOrientation.Horizontal:
        const defaultVizHeight = (height + itemSpacing) / values.length - itemSpacing;
        repeaterStyle.flexDirection = "column";
        repeaterStyle.height = `${height}px`;
        itemStyles.marginBottom = `${itemSpacing}px`;
        vizWidth = width;
        vizHeight = clamp(defaultVizHeight, minVizHeight != null ? minVizHeight : 0, maxVizHeight != null ? maxVizHeight : defaultVizHeight);
        break;
      case VizOrientation.Vertical:
        repeaterStyle.flexDirection = "row";
        repeaterStyle.justifyContent = "space-between";
        itemStyles.marginRight = `${itemSpacing}px`;
        vizHeight = height;
        vizWidth = Math.max(width / values.length - itemSpacing + itemSpacing / values.length, minVizWidth != null ? minVizWidth : 0);
    }
    itemStyles.width = `${vizWidth}px`;
    itemStyles.height = `${vizHeight}px`;
    const alignmentFactors = getAlignmentFactors ? getAlignmentFactors(values, vizWidth, vizHeight) : {};
    return /* @__PURE__ */ React__default.createElement("div", { style: repeaterStyle }, values.map((value, index) => {
      return /* @__PURE__ */ React__default.createElement("div", { key: index, style: getItemStylesForIndex(itemStyles, index, values.length) }, renderValue({
        value,
        width: vizWidth,
        height: vizHeight,
        alignmentFactors,
        orientation: resolvedOrientation,
        count: values.length
      }));
    }));
  }
}
__publicField(VizRepeater, "defaultProps", {
  itemSpacing: 8
});
function getItemStylesForIndex(itemStyles, index, length) {
  if (index === length - 1) {
    return __spreadProps(__spreadValues({}, itemStyles), {
      marginRight: 0,
      marginBottom: 0
    });
  }
  return itemStyles;
}

export { VizRepeater };
//# sourceMappingURL=VizRepeater.js.map
