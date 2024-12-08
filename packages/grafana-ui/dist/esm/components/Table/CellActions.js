import React__default, { useState, useCallback } from 'react';
import { IconButton } from '../IconButton/IconButton.js';
import { Stack } from '../Layout/Stack/Stack.js';
import { TableCellInspector } from './TableCellInspector.js';
import { FILTER_FOR_OPERATOR, FILTER_OUT_OPERATOR } from './types.js';
import { getTextAlign } from './utils.js';

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
function CellActions({ field, cell, previewMode, showFilters, onCellFilterAdded }) {
  var _a;
  const [isInspecting, setIsInspecting] = useState(false);
  const isRightAligned = getTextAlign(field) === "flex-end";
  const inspectEnabled = Boolean((_a = field.config.custom) == null ? void 0 : _a.inspect);
  const commonButtonProps = {
    size: "sm",
    tooltipPlacement: "top"
  };
  const onFilterFor = useCallback(
    (event) => {
      if (onCellFilterAdded) {
        onCellFilterAdded({ key: field.name, operator: FILTER_FOR_OPERATOR, value: cell.value });
      }
    },
    [cell, field, onCellFilterAdded]
  );
  const onFilterOut = useCallback(
    (event) => {
      if (onCellFilterAdded) {
        onCellFilterAdded({ key: field.name, operator: FILTER_OUT_OPERATOR, value: cell.value });
      }
    },
    [cell, field, onCellFilterAdded]
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: `cellActions${isRightAligned ? " cellActionsLeft" : ""}` }, /* @__PURE__ */ React__default.createElement(Stack, { gap: 0.5 }, inspectEnabled && /* @__PURE__ */ React__default.createElement(
    IconButton,
    __spreadValues({
      name: "eye",
      tooltip: "Inspect value",
      onClick: () => {
        setIsInspecting(true);
      }
    }, commonButtonProps)
  ), showFilters && /* @__PURE__ */ React__default.createElement(IconButton, __spreadValues({ name: "search-plus", onClick: onFilterFor, tooltip: "Filter for value" }, commonButtonProps)), showFilters && /* @__PURE__ */ React__default.createElement(IconButton, __spreadValues({ name: "search-minus", onClick: onFilterOut, tooltip: "Filter out value" }, commonButtonProps)))), isInspecting && /* @__PURE__ */ React__default.createElement(
    TableCellInspector,
    {
      mode: previewMode,
      value: cell.value,
      onDismiss: () => {
        setIsInspecting(false);
      }
    }
  ));
}

export { CellActions };
//# sourceMappingURL=CellActions.js.map
