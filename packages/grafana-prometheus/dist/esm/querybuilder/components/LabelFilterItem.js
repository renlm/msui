import debounce from 'debounce-promise';
import React, { useState } from 'react';
import { toOption } from '@grafana/data';
import { InputGroup, AccessoryButton } from '@grafana/experimental';
import { Select, AsyncSelect } from '@grafana/ui';
import { truncateResult } from '../../language_utils.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

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
function LabelFilterItem({
  item,
  defaultOp,
  onChange,
  onDelete,
  onGetLabelNames,
  onGetLabelValues,
  invalidLabel,
  invalidValue,
  getLabelValuesAutofillSuggestions,
  debounceDuration
}) {
  var _a, _b, _c, _d;
  const [state, setState] = useState({});
  const [labelNamesMenuOpen, setLabelNamesMenuOpen] = useState(false);
  const [labelValuesMenuOpen, setLabelValuesMenuOpen] = useState(false);
  const isMultiSelect = (operator = item.op) => {
    var _a2;
    return (_a2 = operators.find((op) => op.label === operator)) == null ? void 0 : _a2.isMultiValue;
  };
  const getSelectOptionsFromString = (item2) => {
    if (item2) {
      const regExp = /\(([^)]+)\)/;
      const matches = item2 == null ? void 0 : item2.match(regExp);
      if (matches && matches[0].indexOf("|") > 0) {
        return [item2];
      }
      if (item2.indexOf("|") > 0) {
        return item2.split("|");
      }
      return [item2];
    }
    return [];
  };
  const labelValueSearch = debounce(
    (query) => getLabelValuesAutofillSuggestions(query, item.label),
    debounceDuration
  );
  const itemValue = (_a = item == null ? void 0 : item.value) != null ? _a : "";
  return /* @__PURE__ */ React.createElement("div", { key: itemValue, "data-testid": "prometheus-dimensions-filter-item" }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(
    Select,
    {
      placeholder: "Select label",
      "data-testid": selectors.components.QueryBuilder.labelSelect,
      inputId: "prometheus-dimensions-filter-item-key",
      width: "auto",
      value: item.label ? toOption(item.label) : null,
      allowCustomValue: true,
      onOpenMenu: async () => {
        setState({ isLoadingLabelNames: true });
        const labelNames = await onGetLabelNames(item);
        setLabelNamesMenuOpen(true);
        setState({ labelNames, isLoadingLabelNames: void 0 });
      },
      onCloseMenu: () => {
        setLabelNamesMenuOpen(false);
      },
      isOpen: labelNamesMenuOpen,
      isLoading: (_b = state.isLoadingLabelNames) != null ? _b : false,
      options: state.labelNames,
      onChange: (change) => {
        var _a2;
        if (change.label) {
          onChange(__spreadProps(__spreadValues({}, item), {
            op: (_a2 = item.op) != null ? _a2 : defaultOp,
            label: change.label
            // eslint-ignore
          }));
        }
      },
      invalid: invalidLabel
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      "data-testid": selectors.components.QueryBuilder.matchOperatorSelect,
      className: "query-segment-operator",
      value: toOption((_c = item.op) != null ? _c : defaultOp),
      options: operators,
      width: "auto",
      onChange: (change) => {
        if (change.value != null) {
          onChange(__spreadProps(__spreadValues({}, item), {
            op: change.value,
            value: isMultiSelect(change.value) ? item.value : getSelectOptionsFromString(item == null ? void 0 : item.value)[0]
            // eslint-ignore
          }));
        }
      }
    }
  ), /* @__PURE__ */ React.createElement(
    AsyncSelect,
    {
      placeholder: "Select value",
      "data-testid": selectors.components.QueryBuilder.valueSelect,
      inputId: "prometheus-dimensions-filter-item-value",
      width: "auto",
      value: isMultiSelect() ? getSelectOptionsFromString(itemValue).map(toOption) : getSelectOptionsFromString(itemValue).map(toOption)[0],
      allowCustomValue: true,
      formatCreateLabel: (input) => input,
      createOptionPosition: ((_d = item.op) == null ? void 0 : _d.includes("~")) ? "first" : "last",
      onOpenMenu: async () => {
        setState({ isLoadingLabelValues: true });
        const labelValues = await onGetLabelValues(item);
        truncateResult(labelValues);
        setLabelValuesMenuOpen(true);
        setState(__spreadProps(__spreadValues({}, state), {
          labelValues,
          isLoadingLabelValues: void 0
        }));
      },
      onCloseMenu: () => {
        setLabelValuesMenuOpen(false);
      },
      isOpen: labelValuesMenuOpen,
      defaultOptions: state.labelValues,
      isMulti: isMultiSelect(),
      isLoading: state.isLoadingLabelValues,
      loadOptions: labelValueSearch,
      onChange: (change) => {
        var _a2, _b2;
        if (change.value) {
          onChange(__spreadProps(__spreadValues({}, item), {
            value: change.value,
            op: (_a2 = item.op) != null ? _a2 : defaultOp
            // eslint-ignore
          }));
        } else {
          const changes = change.map((change2) => {
            return change2.label;
          }).join("|");
          onChange(__spreadProps(__spreadValues({}, item), { value: changes, op: (_b2 = item.op) != null ? _b2 : defaultOp }));
        }
      },
      invalid: invalidValue
    }
  ), /* @__PURE__ */ React.createElement(AccessoryButton, { "aria-label": `remove-${item.label}`, icon: "times", variant: "secondary", onClick: onDelete })));
}
const operators = [
  { label: "=", value: "=", isMultiValue: false },
  { label: "!=", value: "!=", isMultiValue: false },
  { label: "=~", value: "=~", isMultiValue: true },
  { label: "!~", value: "!~", isMultiValue: true }
];

export { LabelFilterItem };
//# sourceMappingURL=LabelFilterItem.js.map
