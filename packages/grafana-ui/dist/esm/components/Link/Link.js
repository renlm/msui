import React__default, { forwardRef } from 'react';
import { Link as Link$1 } from 'react-router-dom';
import { locationUtil, textUtil } from '@grafana/data';

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
const Link = forwardRef((_a, ref) => {
  var _b = _a, { href, children } = _b, rest = __objRest(_b, ["href", "children"]);
  const validUrl = locationUtil.stripBaseFromUrl(textUtil.sanitizeUrl(href != null ? href : ""));
  return /* @__PURE__ */ React__default.createElement(Link$1, __spreadValues({ ref, to: validUrl }, rest), children);
});
Link.displayName = "Link";

export { Link };
//# sourceMappingURL=Link.js.map
