import React__default from 'react';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { IconButton } from '../IconButton/IconButton.js';
import { getSelectStyles } from './getSelectStyles.js';

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
const MultiValueContainer = ({ innerProps, children }) => {
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, innerProps), { className: styles.multiValueContainer }), children);
};
const MultiValueRemove = ({ children, innerProps }) => {
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  return /* @__PURE__ */ React__default.createElement(IconButton, __spreadProps(__spreadValues({}, innerProps), { name: "times", size: "sm", className: styles.multiValueRemove, tooltip: "Remove" }));
};

export { MultiValueContainer, MultiValueRemove };
//# sourceMappingURL=MultiValue.js.map
