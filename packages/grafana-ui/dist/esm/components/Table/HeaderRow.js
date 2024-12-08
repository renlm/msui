import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { getFieldTypeIcon } from '../../types/icon.js';
import { Icon } from '../Icon/Icon.js';
import { Filter } from './Filter.js';

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
const HeaderRow = (props) => {
  const { headerGroups, showTypeIcons, tableStyles } = props;
  const e2eSelectorsTable = selectors.components.Panels.Visualization.Table;
  return /* @__PURE__ */ React__default.createElement("div", { role: "rowgroup", className: tableStyles.headerRow }, headerGroups.map((headerGroup) => {
    const _a = headerGroup.getHeaderGroupProps(), { key } = _a, headerGroupProps = __objRest(_a, ["key"]);
    return /* @__PURE__ */ React__default.createElement(
      "div",
      __spreadProps(__spreadValues({
        className: tableStyles.thead
      }, headerGroupProps), {
        key,
        "aria-label": e2eSelectorsTable.header,
        role: "row"
      }),
      headerGroup.headers.map(
        (column, index) => renderHeaderCell(column, tableStyles, showTypeIcons)
      )
    );
  }));
};
function renderHeaderCell(column, tableStyles, showTypeIcons) {
  var _a;
  const headerProps = column.getHeaderProps();
  const field = (_a = column.field) != null ? _a : null;
  const tableFieldOptions = field == null ? void 0 : field.config.custom;
  if (column.canResize) {
    headerProps.style.userSelect = column.isResizing ? "none" : "auto";
  }
  headerProps.style.position = "absolute";
  headerProps.style.justifyContent = column.justifyContent;
  headerProps.style.left = column.totalLeft;
  let headerContent = column.render("Header");
  let sortHeaderContent = column.canSort && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("button", __spreadProps(__spreadValues({}, column.getSortByToggleProps()), { className: tableStyles.headerCellLabel }), showTypeIcons && /* @__PURE__ */ React__default.createElement(Icon, { name: getFieldTypeIcon(field), title: field == null ? void 0 : field.type, size: "sm", className: tableStyles.typeIcon }), /* @__PURE__ */ React__default.createElement("div", null, headerContent), column.isSorted && (column.isSortedDesc ? /* @__PURE__ */ React__default.createElement(Icon, { size: "lg", name: "arrow-down", className: tableStyles.sortIcon }) : /* @__PURE__ */ React__default.createElement(Icon, { name: "arrow-up", size: "lg", className: tableStyles.sortIcon }))), column.canFilter && /* @__PURE__ */ React__default.createElement(Filter, { column, tableStyles, field }));
  if (sortHeaderContent && (tableFieldOptions == null ? void 0 : tableFieldOptions.headerComponent)) {
    sortHeaderContent = /* @__PURE__ */ React__default.createElement(tableFieldOptions.headerComponent, { field, defaultContent: sortHeaderContent });
  } else if (tableFieldOptions == null ? void 0 : tableFieldOptions.headerComponent) {
    headerContent = /* @__PURE__ */ React__default.createElement(tableFieldOptions.headerComponent, { field, defaultContent: headerContent });
  }
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: tableStyles.headerCell }, headerProps), { role: "columnheader" }), column.canSort && sortHeaderContent, !column.canSort && headerContent, !column.canSort && column.canFilter && /* @__PURE__ */ React__default.createElement(Filter, { column, tableStyles, field }), column.canResize && /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, column.getResizerProps()), { className: tableStyles.resizeHandle })));
}

export { HeaderRow };
//# sourceMappingURL=HeaderRow.js.map
