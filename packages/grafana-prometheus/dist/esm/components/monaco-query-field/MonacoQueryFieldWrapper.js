import React, { useRef } from 'react';
import { MonacoQueryFieldLazy } from './MonacoQueryFieldLazy.js';

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
const MonacoQueryFieldWrapper = (props) => {
  const lastRunValueRef = useRef(null);
  const _a = props, { onRunQuery, onChange } = _a, rest = __objRest(_a, ["onRunQuery", "onChange"]);
  const handleRunQuery = (value) => {
    lastRunValueRef.current = value;
    onChange(value);
    onRunQuery();
  };
  const handleBlur = (value) => {
    onChange(value);
  };
  const handleChange = (value) => {
    onChange(value);
  };
  return /* @__PURE__ */ React.createElement(MonacoQueryFieldLazy, __spreadValues({ onChange: handleChange, onRunQuery: handleRunQuery, onBlur: handleBlur }, rest));
};

export { MonacoQueryFieldWrapper };
//# sourceMappingURL=MonacoQueryFieldWrapper.js.map
