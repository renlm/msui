import { cx, css } from '@emotion/css';
import React__default from 'react';
import { InlineFormLabel } from '../FormLabel/FormLabel.js';

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
const FormField = (_a) => {
  var _b = _a, {
    label,
    tooltip,
    labelWidth = 6,
    inputWidth = 12,
    inputEl,
    className,
    interactive
  } = _b, inputProps = __objRest(_b, [
    "label",
    "tooltip",
    "labelWidth",
    "inputWidth",
    "inputEl",
    "className",
    "interactive"
  ]);
  const styles = getStyles();
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.formField, className) }, /* @__PURE__ */ React__default.createElement(InlineFormLabel, { width: labelWidth, tooltip, interactive }, label), inputEl || /* @__PURE__ */ React__default.createElement(
    "input",
    __spreadProps(__spreadValues({
      type: "text",
      className: `gf-form-input ${inputWidth ? `width-${inputWidth}` : ""}`
    }, inputProps), {
      disabled: inputProps.disabled
    })
  ));
};
FormField.displayName = "FormField";
const getStyles = () => {
  return {
    formField: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      textAlign: "left",
      position: "relative"
    })
  };
};

export { FormField };
//# sourceMappingURL=FormField.js.map
