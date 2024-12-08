import { isFunction } from 'lodash';
import React__default from 'react';
import { ThresholdsMode, getFieldConfigWithMinMax, VizOrientation } from '@grafana/data';
import { BarGaugeDisplayMode, TableCellDisplayMode, BarGaugeValueMode } from '@grafana/schema';
import { BarGauge } from '../BarGauge/BarGauge.js';
import { DataLinksContextMenu } from '../DataLinks/DataLinksContextMenu.js';
import { getCellOptions, getAlignmentFactor } from './utils.js';

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
const defaultScale = {
  mode: ThresholdsMode.Absolute,
  steps: [
    {
      color: "blue",
      value: -Infinity
    },
    {
      color: "green",
      value: 20
    }
  ]
};
const BarGaugeCell = (props) => {
  var _a;
  const { field, innerWidth, tableStyles, cell, cellProps, row } = props;
  const displayValue = field.display(cell.value);
  const cellOptions = getCellOptions(field);
  let config = getFieldConfigWithMinMax(field, false);
  if (!config.thresholds) {
    config = __spreadProps(__spreadValues({}, config), {
      thresholds: defaultScale
    });
  }
  let barGaugeMode = BarGaugeDisplayMode.Gradient;
  let valueDisplayMode = void 0;
  if (cellOptions.type === TableCellDisplayMode.Gauge) {
    barGaugeMode = (_a = cellOptions.mode) != null ? _a : BarGaugeDisplayMode.Gradient;
    valueDisplayMode = cellOptions.valueDisplayMode !== void 0 ? cellOptions.valueDisplayMode : BarGaugeValueMode.Text;
  }
  const getLinks = () => {
    if (!isFunction(field.getLinks)) {
      return [];
    }
    return field.getLinks({ valueRowIndex: row.index });
  };
  const hasLinks = Boolean(getLinks().length);
  const alignmentFactors = getAlignmentFactor(field, displayValue, cell.row.index);
  const renderComponent = (menuProps) => {
    const { openMenu, targetClassName } = menuProps;
    return /* @__PURE__ */ React__default.createElement(
      BarGauge,
      {
        width: innerWidth,
        height: tableStyles.cellHeightInner,
        field: config,
        display: field.display,
        text: { valueSize: 14 },
        value: displayValue,
        orientation: VizOrientation.Horizontal,
        theme: tableStyles.theme,
        alignmentFactors,
        onClick: openMenu,
        className: targetClassName,
        itemSpacing: 1,
        lcdCellWidth: 8,
        displayMode: barGaugeMode,
        valueDisplayMode
      }
    );
  };
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, cellProps), { className: tableStyles.cellContainer }), hasLinks && /* @__PURE__ */ React__default.createElement(DataLinksContextMenu, { links: getLinks, style: { display: "flex", width: "100%" } }, (api) => renderComponent(api)), !hasLinks && renderComponent({}));
};

export { BarGaugeCell };
//# sourceMappingURL=BarGaugeCell.js.map
