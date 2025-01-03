import React__default, { useEffect } from 'react';
import { measureText } from '../../utils/measureText.js';
import { Input } from './Input.js';

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
const AutoSizeInput = React__default.forwardRef((props, ref) => {
  const _a = props, { defaultValue = "", minWidth = 10, maxWidth, onCommitChange, onKeyDown, onBlur } = _a, restProps = __objRest(_a, ["defaultValue", "minWidth", "maxWidth", "onCommitChange", "onKeyDown", "onBlur"]);
  const [value, setValue] = React__default.useState(defaultValue);
  const [inputWidth, setInputWidth] = React__default.useState(minWidth);
  useEffect(() => {
    setInputWidth(getWidthFor(value.toString(), minWidth, maxWidth));
  }, [value, maxWidth, minWidth]);
  return /* @__PURE__ */ React__default.createElement(
    Input,
    __spreadProps(__spreadValues({}, restProps), {
      ref,
      value: value.toString(),
      onChange: (event) => {
        setValue(event.currentTarget.value);
      },
      width: inputWidth,
      onBlur: (event) => {
        if (onBlur) {
          onBlur(event);
        } else if (onCommitChange) {
          onCommitChange(event);
        }
      },
      onKeyDown: (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        } else if (event.key === "Enter" && onCommitChange) {
          onCommitChange(event);
        }
      },
      "data-testid": "autosize-input"
    })
  );
});
function getWidthFor(value, minWidth, maxWidth) {
  if (!value) {
    return minWidth;
  }
  const extraSpace = 3;
  const realWidth = measureText(value.toString(), 14).width / 8 + extraSpace;
  if (minWidth && realWidth < minWidth) {
    return minWidth;
  }
  if (maxWidth && realWidth > maxWidth) {
    return maxWidth;
  }
  return realWidth;
}
AutoSizeInput.displayName = "AutoSizeInput";

export { AutoSizeInput };
//# sourceMappingURL=AutoSizeInput.js.map
