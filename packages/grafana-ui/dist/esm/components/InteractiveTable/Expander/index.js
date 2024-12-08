import { css } from '@emotion/css';
import React__default from 'react';
import { IconButton } from '../../IconButton/IconButton.js';

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
const expanderContainerStyles = css({
  display: "flex",
  alignItems: "center",
  height: "100%"
});
function ExpanderCell({ row, __rowID }) {
  return /* @__PURE__ */ React__default.createElement("div", { className: expanderContainerStyles }, /* @__PURE__ */ React__default.createElement(
    IconButton,
    __spreadProps(__spreadValues({
      tooltip: "toggle row expanded",
      "aria-controls": __rowID,
      name: row.isExpanded ? "angle-down" : "angle-right",
      "aria-expanded": row.isExpanded
    }, row.getToggleRowExpandedProps()), {
      size: "lg"
    })
  ));
}
function ExpanderHeader({ isAllRowsExpanded, toggleAllRowsExpanded }) {
  return /* @__PURE__ */ React__default.createElement("div", { className: expanderContainerStyles }, /* @__PURE__ */ React__default.createElement(
    IconButton,
    {
      "aria-label": !isAllRowsExpanded ? "Expand all rows" : "Collapse all rows",
      name: !isAllRowsExpanded ? "table-expand-all" : "table-collapse-all",
      onClick: () => toggleAllRowsExpanded(),
      size: "lg",
      tooltip: !isAllRowsExpanded ? "Expand all rows" : "Collapse all rows",
      variant: "secondary"
    }
  ));
}

export { ExpanderCell, ExpanderHeader };
//# sourceMappingURL=index.js.map
