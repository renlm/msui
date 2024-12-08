import { cx, css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

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
const ButtonGroup = forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, rest = __objRest(_b, ["className", "children"]);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref, className: cx("button-group", styles.wrapper, className) }, rest), children);
});
ButtonGroup.displayName = "ButtonGroup";
const getStyles = (theme) => ({
  wrapper: css({
    display: "flex",
    "> .button-group:not(:first-child) > button, > button:not(:first-child)": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "> .button-group:not(:last-child) > button, > button:not(:last-child)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightWidth: 0
    }
  })
});

export { ButtonGroup };
//# sourceMappingURL=ButtonGroup.js.map
