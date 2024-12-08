import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { getResponsiveStyle } from '../utils/responsiveness.js';
import { getSizeStyles } from '../utils/styles.js';

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
const Stack = React__default.forwardRef((props, ref) => {
  const _a = props, {
    gap = 1,
    alignItems,
    justifyContent,
    direction,
    wrap,
    children,
    grow,
    shrink,
    basis,
    flex,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight
  } = _a, rest = __objRest(_a, [
    "gap",
    "alignItems",
    "justifyContent",
    "direction",
    "wrap",
    "children",
    "grow",
    "shrink",
    "basis",
    "flex",
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight"
  ]);
  const styles = useStyles2(getStyles, gap, alignItems, justifyContent, direction, wrap, grow, shrink, basis, flex);
  const sizeStyles = useStyles2(getSizeStyles, width, minWidth, maxWidth, height, minHeight, maxHeight);
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref, className: cx(styles.flex, sizeStyles) }, rest), children);
});
Stack.displayName = "Stack";
const getStyles = (theme, gap, alignItems, justifyContent, direction, wrap, grow, shrink, basis, flex) => {
  return {
    flex: css([
      {
        display: "flex"
      },
      getResponsiveStyle(theme, direction, (val) => ({
        flexDirection: val
      })),
      getResponsiveStyle(theme, wrap, (val) => ({
        flexWrap: val
      })),
      getResponsiveStyle(theme, alignItems, (val) => ({
        alignItems: val
      })),
      getResponsiveStyle(theme, justifyContent, (val) => ({
        justifyContent: val
      })),
      getResponsiveStyle(theme, gap, (val) => ({
        gap: theme.spacing(val)
      })),
      getResponsiveStyle(theme, grow, (val) => ({
        flexGrow: val
      })),
      getResponsiveStyle(theme, shrink, (val) => ({
        flexShrink: val
      })),
      getResponsiveStyle(theme, basis, (val) => ({
        flexBasis: val
      })),
      getResponsiveStyle(theme, flex, (val) => ({
        flex: val
      }))
    ])
  };
};

export { Stack };
//# sourceMappingURL=Stack.js.map
