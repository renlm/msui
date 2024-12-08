import { cx, css } from '@emotion/css';
import { omit } from 'lodash';
import React__default from 'react';
import { Button } from '../Button/Button.js';
import { FormField } from '../FormField/FormField.js';

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
const getSecretFormFieldStyles = () => {
  return {
    noRadiusInput: css({
      borderBottomRightRadius: "0 !important",
      borderTopRightRadius: "0 !important"
    }),
    noRadiusButton: css({
      borderBottomLeftRadius: "0 !important",
      borderTopLeftRadius: "0 !important"
    })
  };
};
const SecretFormField = (_a) => {
  var _b = _a, {
    label = "Password",
    labelWidth,
    inputWidth = 12,
    onReset,
    isConfigured,
    tooltip,
    placeholder = "Password",
    interactive
  } = _b, inputProps = __objRest(_b, [
    "label",
    "labelWidth",
    "inputWidth",
    "onReset",
    "isConfigured",
    "tooltip",
    "placeholder",
    "interactive"
  ]);
  const styles = getSecretFormFieldStyles();
  return /* @__PURE__ */ React__default.createElement(
    FormField,
    {
      label,
      tooltip,
      interactive,
      labelWidth,
      inputEl: isConfigured ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
        "input",
        __spreadValues({
          type: "text",
          className: cx(`gf-form-input width-${inputWidth}`, styles.noRadiusInput),
          disabled: true,
          value: "configured"
        }, omit(inputProps, "value"))
      ), /* @__PURE__ */ React__default.createElement(Button, { onClick: onReset, variant: "secondary", type: "button" }, "Reset")) : /* @__PURE__ */ React__default.createElement(
        "input",
        __spreadValues({
          type: "password",
          className: `gf-form-input width-${inputWidth}`,
          placeholder
        }, inputProps)
      )
    }
  );
};
SecretFormField.displayName = "SecretFormField";

export { SecretFormField };
//# sourceMappingURL=SecretFormField.js.map
