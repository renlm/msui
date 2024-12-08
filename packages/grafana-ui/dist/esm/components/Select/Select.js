import React__default from 'react';
import { SelectBase } from './SelectBase.js';
import '@emotion/css';
import 'react-select';
import 'hoist-non-react-statics';
import 'micro-memoize';
import '@grafana/data';
import 'tinycolor2';
import '../Input/Input.js';

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
function Select(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadValues({}, props));
}
function MultiSelect(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadProps(__spreadValues({}, props), { isMulti: true }));
}
function AsyncSelect(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadValues({}, props));
}
function VirtualizedSelect(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadValues({ virtualized: true }, props));
}
function AsyncVirtualizedSelect(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadValues({ virtualized: true }, props));
}
function AsyncMultiSelect(props) {
  return /* @__PURE__ */ React__default.createElement(SelectBase, __spreadProps(__spreadValues({}, props), { isMulti: true }));
}

export { AsyncMultiSelect, AsyncSelect, AsyncVirtualizedSelect, MultiSelect, Select, VirtualizedSelect };
//# sourceMappingURL=Select.js.map
