import { startCase } from 'lodash';
import React__default, { useCallback } from 'react';
import { FilterPill } from '../../components/FilterPill/FilterPill.js';
import { Stack } from '../../components/Layout/Stack/Stack.js';

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
const SeriesConfigEditor = ({ value, onChange }) => {
  const onChangeToggle = useCallback(
    (prop) => {
      onChange(__spreadProps(__spreadValues({}, value), { [prop]: !value[prop] }));
    },
    [value, onChange]
  );
  return /* @__PURE__ */ React__default.createElement(Stack, { gap: 0.5 }, Object.keys(value).map((k) => {
    const key = k;
    return /* @__PURE__ */ React__default.createElement(
      FilterPill,
      {
        icon: value[key] ? "eye-slash" : "eye",
        onClick: () => onChangeToggle(key),
        key,
        label: startCase(key),
        selected: value[key]
      }
    );
  }));
};
function addHideFrom(builder) {
  builder.addCustomEditor({
    id: "hideFrom",
    name: "Hide in area",
    category: ["Series"],
    path: "hideFrom",
    defaultValue: {
      tooltip: false,
      viz: false,
      legend: false
    },
    editor: SeriesConfigEditor,
    override: SeriesConfigEditor,
    shouldApply: () => true,
    hideFromDefaults: true,
    process: (value) => value
  });
}

export { addHideFrom };
//# sourceMappingURL=hideSeries.js.map
