import * as React from 'react';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Input } from '../Input/Input.js';
import { Stack } from '../Layout/Stack/Stack.js';

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
const CONFIGURED_TEXT = "configured";
const RESET_BUTTON_TEXT = "Reset";
const SecretInput = (_a) => {
  var _b = _a, { isConfigured, onReset } = _b, props = __objRest(_b, ["isConfigured", "onReset"]);
  return /* @__PURE__ */ React.createElement(Stack, null, !isConfigured && /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues({}, props), { type: "password" })), isConfigured && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues({}, props), { type: "text", disabled: true, value: CONFIGURED_TEXT })), /* @__PURE__ */ React.createElement(Button, { onClick: onReset, variant: "secondary" }, RESET_BUTTON_TEXT)));
};

export { CONFIGURED_TEXT, RESET_BUTTON_TEXT, SecretInput };
//# sourceMappingURL=SecretInput.js.map
