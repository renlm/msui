import React__default from 'react';
import { PluginSignatureStatus } from '@grafana/data';
import { Badge } from '../Badge/Badge.js';

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
const PluginSignatureBadge = (_a) => {
  var _b = _a, { status, color } = _b, otherProps = __objRest(_b, ["status", "color"]);
  const display = getSignatureDisplayModel(status);
  return /* @__PURE__ */ React__default.createElement(Badge, __spreadValues({ text: display.text, color: display.color, icon: display.icon, tooltip: display.tooltip }, otherProps));
};
PluginSignatureBadge.displayName = "PluginSignatureBadge";
function getSignatureDisplayModel(signature) {
  if (!signature) {
    signature = PluginSignatureStatus.invalid;
  }
  switch (signature) {
    case PluginSignatureStatus.internal:
      return { text: "Core", color: "blue", tooltip: "Core plugin that is bundled with Grafana" };
    case PluginSignatureStatus.valid:
      return { text: "Signed", icon: "lock", color: "green", tooltip: "Signed and verified plugin" };
    case PluginSignatureStatus.invalid:
      return {
        text: "Invalid signature",
        icon: "exclamation-triangle",
        color: "red",
        tooltip: "Invalid plugin signature"
      };
    case PluginSignatureStatus.modified:
      return {
        text: "Modified signature",
        icon: "exclamation-triangle",
        color: "red",
        tooltip: "Valid signature but content has been modified"
      };
    case PluginSignatureStatus.missing:
      return {
        text: "Missing signature",
        icon: "exclamation-triangle",
        color: "red",
        tooltip: "Missing plugin signature"
      };
    default:
      return {
        text: "Unsigned",
        icon: "exclamation-triangle",
        color: "red",
        tooltip: "Unsigned external plugin"
      };
  }
}

export { PluginSignatureBadge };
//# sourceMappingURL=PluginSignatureBadge.js.map
