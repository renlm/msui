import React__default from 'react';
import { Icon } from '../Icon/Icon.js';

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
function RowExpander({ row, tableStyles }) {
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: tableStyles.expanderCell }, row.getToggleRowExpandedProps()), /* @__PURE__ */ React__default.createElement(
    Icon,
    {
      "aria-label": row.isExpanded ? "Collapse row" : "Expand row",
      name: row.isExpanded ? "angle-down" : "angle-right",
      size: "lg"
    }
  ));
}

export { RowExpander };
//# sourceMappingURL=RowExpander.js.map
