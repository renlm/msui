import React__default from 'react';
import { fieldReducers, ReducerID } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { EmptyCell, FooterCell } from './FooterCell.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function FooterRow(props) {
  const { totalColumnsWidth, footerGroups, isPaginationVisible, tableStyles } = props;
  const e2eSelectorsTable = selectors.components.Panels.Visualization.Table;
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      style: {
        position: isPaginationVisible ? "relative" : "absolute",
        width: totalColumnsWidth ? `${totalColumnsWidth}px` : "100%",
        bottom: "0px"
      }
    },
    footerGroups.map((footerGroup) => {
      const _a = footerGroup.getFooterGroupProps(), { key } = _a, footerGroupProps = __objRest(_a, ["key"]);
      return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: tableStyles.tfoot }, footerGroupProps), { key, "data-testid": e2eSelectorsTable.footer }), footerGroup.headers.map((column) => renderFooterCell(column, tableStyles)));
    })
  );
}
function renderFooterCell(column, tableStyles) {
  var _a;
  const footerProps = column.getHeaderProps();
  if (!footerProps) {
    return null;
  }
  footerProps.style = (_a = footerProps.style) != null ? _a : {};
  footerProps.style.position = "absolute";
  footerProps.style.justifyContent = column.justifyContent;
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: tableStyles.headerCell }, footerProps), column.render("Footer"));
}
function getFooterValue(index, footerValues, isCountRowsSet) {
  if (footerValues === void 0) {
    return EmptyCell;
  }
  if (isCountRowsSet) {
    if (footerValues[index] === void 0) {
      return EmptyCell;
    }
    const key = fieldReducers.get(ReducerID.count).name;
    return FooterCell({ value: [{ [key]: String(footerValues[index]) }] });
  }
  return FooterCell({ value: footerValues[index] });
}

export { FooterRow, getFooterValue };
//# sourceMappingURL=FooterRow.js.map
