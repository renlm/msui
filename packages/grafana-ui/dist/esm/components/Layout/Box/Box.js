import { cx, css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
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
const Box = forwardRef((props, ref) => {
  const _a = props, {
    children,
    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    display,
    backgroundColor,
    grow,
    shrink,
    basis,
    flex,
    borderColor,
    borderStyle,
    borderRadius,
    direction,
    justifyContent,
    alignItems,
    boxShadow,
    element,
    gap,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight
  } = _a, rest = __objRest(_a, [
    "children",
    "margin",
    "marginX",
    "marginY",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight",
    "padding",
    "paddingX",
    "paddingY",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "display",
    "backgroundColor",
    "grow",
    "shrink",
    "basis",
    "flex",
    "borderColor",
    "borderStyle",
    "borderRadius",
    "direction",
    "justifyContent",
    "alignItems",
    "boxShadow",
    "element",
    "gap",
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight"
  ]);
  const styles = useStyles2(
    getStyles,
    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    display,
    backgroundColor,
    grow,
    shrink,
    basis,
    flex,
    borderColor,
    borderStyle,
    borderRadius,
    direction,
    justifyContent,
    alignItems,
    boxShadow,
    gap
  );
  const sizeStyles = useStyles2(getSizeStyles, width, minWidth, maxWidth, height, minHeight, maxHeight);
  const Element = element != null ? element : "div";
  return /* @__PURE__ */ React__default.createElement(Element, __spreadValues({ ref, className: cx(styles.root, sizeStyles) }, rest), children);
});
Box.displayName = "Box";
const customBorderColor = (color, theme) => {
  switch (color) {
    case "error":
    case "success":
    case "info":
    case "warning":
      return theme.colors[color].borderTransparent;
    default:
      return color ? theme.colors.border[color] : void 0;
  }
};
const customBackgroundColor = (color, theme) => {
  switch (color) {
    case "error":
    case "success":
    case "info":
    case "warning":
      return theme.colors[color].transparent;
    default:
      return color ? theme.colors.background[color] : void 0;
  }
};
const getStyles = (theme, margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, display, backgroundColor, grow, shrink, basis, flex, borderColor, borderStyle, borderRadius, direction, justifyContent, alignItems, boxShadow, gap) => {
  return {
    root: css([
      getResponsiveStyle(theme, margin, (val) => ({
        margin: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginX, (val) => ({
        marginLeft: theme.spacing(val),
        marginRight: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginY, (val) => ({
        marginTop: theme.spacing(val),
        marginBottom: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginTop, (val) => ({
        marginTop: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginBottom, (val) => ({
        marginBottom: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginLeft, (val) => ({
        marginLeft: theme.spacing(val)
      })),
      getResponsiveStyle(theme, marginRight, (val) => ({
        marginRight: theme.spacing(val)
      })),
      getResponsiveStyle(theme, padding, (val) => ({
        padding: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingX, (val) => ({
        paddingLeft: theme.spacing(val),
        paddingRight: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingY, (val) => ({
        paddingTop: theme.spacing(val),
        paddingBottom: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingTop, (val) => ({
        paddingTop: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingBottom, (val) => ({
        paddingBottom: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingLeft, (val) => ({
        paddingLeft: theme.spacing(val)
      })),
      getResponsiveStyle(theme, paddingRight, (val) => ({
        paddingRight: theme.spacing(val)
      })),
      getResponsiveStyle(theme, display, (val) => ({
        display: val
      })),
      getResponsiveStyle(theme, backgroundColor, (val) => ({
        backgroundColor: customBackgroundColor(val, theme)
      })),
      getResponsiveStyle(theme, direction, (val) => ({
        flexDirection: val
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
      })),
      getResponsiveStyle(theme, borderStyle, (val) => ({
        borderStyle: val
      })),
      getResponsiveStyle(theme, borderColor, (val) => ({
        borderColor: customBorderColor(val, theme)
      })),
      (borderStyle || borderColor) && {
        borderWidth: "1px"
      },
      getResponsiveStyle(theme, justifyContent, (val) => ({
        justifyContent: val
      })),
      getResponsiveStyle(theme, alignItems, (val) => ({
        alignItems: val
      })),
      getResponsiveStyle(theme, borderRadius, (val) => ({
        borderRadius: theme.shape.radius[val]
      })),
      getResponsiveStyle(theme, boxShadow, (val) => ({
        boxShadow: theme.shadows[val]
      })),
      getResponsiveStyle(theme, gap, (val) => ({
        gap: theme.spacing(val)
      }))
    ])
  };
};

export { Box };
//# sourceMappingURL=Box.js.map
