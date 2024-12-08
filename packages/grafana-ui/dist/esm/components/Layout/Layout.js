import { cx, css } from '@emotion/css';
import React__default from 'react';
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
const Layout = (_a) => {
  var _b = _a, {
    children,
    orientation = 0 /* Horizontal */,
    spacing = "sm",
    justify = "flex-start",
    align = "normal",
    wrap = false,
    width = "100%",
    height = "100%"
  } = _b, rest = __objRest(_b, [
    "children",
    "orientation",
    "spacing",
    "justify",
    "align",
    "wrap",
    "width",
    "height"
  ]);
  const styles = useStyles2(getStyles, orientation, spacing, justify, align, wrap);
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: styles.layout, style: { width, height } }, rest), React__default.Children.toArray(children).filter(Boolean).map((child, index) => {
    return /* @__PURE__ */ React__default.createElement("div", { className: styles.childWrapper, key: index }, child);
  }));
};
const HorizontalGroup = ({
  children,
  spacing,
  justify,
  align = "center",
  wrap,
  width,
  height
}) => /* @__PURE__ */ React__default.createElement(
  Layout,
  {
    spacing,
    justify,
    orientation: 0 /* Horizontal */,
    align,
    width,
    height,
    wrap
  },
  children
);
const VerticalGroup = ({
  children,
  spacing,
  justify,
  align,
  width,
  height
}) => /* @__PURE__ */ React__default.createElement(
  Layout,
  {
    spacing,
    justify,
    orientation: 1 /* Vertical */,
    align,
    width,
    height
  },
  children
);
const Container = ({ children, padding, margin, grow, shrink }) => {
  const styles = useStyles2(getContainerStyles, padding, margin);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(
        styles.wrapper,
        grow !== void 0 && css({ flexGrow: grow }),
        shrink !== void 0 && css({ flexShrink: shrink })
      )
    },
    children
  );
};
const getStyles = (theme, orientation, spacing, justify, align, wrap) => {
  const finalSpacing = spacing !== "none" ? theme.spacing(spacingToNumber[spacing]) : 0;
  const marginCompensation = orientation === 0 /* Horizontal */ && !wrap || orientation === 1 /* Vertical */ ? 0 : `-${finalSpacing}`;
  const label = orientation === 1 /* Vertical */ ? "vertical-group" : "horizontal-group";
  return {
    layout: css({
      label,
      display: "flex",
      flexDirection: orientation === 1 /* Vertical */ ? "column" : "row",
      flexWrap: wrap ? "wrap" : "nowrap",
      justifyContent: justify,
      alignItems: align,
      height: "100%",
      maxWidth: "100%",
      // compensate for last row margin when wrapped, horizontal layout
      marginBottom: marginCompensation
    }),
    childWrapper: css({
      label: "layoutChildrenWrapper",
      marginBottom: orientation === 0 /* Horizontal */ && !wrap ? 0 : finalSpacing,
      marginRight: orientation === 0 /* Horizontal */ ? finalSpacing : 0,
      display: "flex",
      alignItems: align,
      "&:last-child": {
        marginBottom: orientation === 1 /* Vertical */ ? 0 : void 0,
        marginRight: orientation === 0 /* Horizontal */ ? 0 : void 0
      }
    })
  };
};
const spacingToNumber = {
  none: 0,
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3
};
const getContainerStyles = (theme, padding, margin) => {
  const paddingSize = padding && padding !== "none" && theme.spacing(spacingToNumber[padding]) || 0;
  const marginSize = margin && margin !== "none" && theme.spacing(spacingToNumber[margin]) || 0;
  return {
    wrapper: css({
      label: "container",
      margin: marginSize,
      padding: paddingSize
    })
  };
};

export { Container, HorizontalGroup, Layout, VerticalGroup };
//# sourceMappingURL=Layout.js.map
