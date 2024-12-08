import React__default from 'react';

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
function fontSizeReductionFactor(fontSize) {
  if (fontSize < 20) {
    return 0.9;
  }
  if (fontSize < 26) {
    return 0.8;
  }
  return 0.6;
}
const FormattedValueDisplay = (_a) => {
  var _b = _a, { value, className, style } = _b, htmlProps = __objRest(_b, ["value", "className", "style"]);
  var _a2, _b2;
  const hasPrefix = ((_a2 = value.prefix) != null ? _a2 : "").length > 0;
  const hasSuffix = ((_b2 = value.suffix) != null ? _b2 : "").length > 0;
  let suffixStyle;
  if (style && style.fontSize && typeof style.fontSize === "number") {
    const fontSize = style.fontSize;
    const reductionFactor = fontSizeReductionFactor(fontSize);
    suffixStyle = { fontSize: fontSize * reductionFactor };
  }
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className, style }, htmlProps), /* @__PURE__ */ React__default.createElement("div", null, hasPrefix && /* @__PURE__ */ React__default.createElement("span", null, value.prefix), /* @__PURE__ */ React__default.createElement("span", null, value.text), hasSuffix && /* @__PURE__ */ React__default.createElement("span", { style: suffixStyle }, value.suffix)));
};
FormattedValueDisplay.displayName = "FormattedDisplayValue";

export { FormattedValueDisplay };
//# sourceMappingURL=FormattedValueDisplay.js.map
