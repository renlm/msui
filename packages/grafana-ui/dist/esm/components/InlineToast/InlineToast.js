import { cx, css } from '@emotion/css';
import { offset, flip, shift, useFloating, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import React__default, { useLayoutEffect } from 'react';
import '@grafana/data';
import { useStyles2, useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { Portal } from '../Portal/Portal.js';

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
function InlineToast({ referenceElement, children, suffixIcon, placement }) {
  const styles = useStyles2(getStyles);
  const theme = useTheme2();
  const middleware = [
    offset(8),
    flip({
      fallbackAxisSideDirection: "end",
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open: true,
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
    strategy: "fixed"
  });
  useLayoutEffect(() => {
    refs.setReference(referenceElement);
  }, [referenceElement, refs]);
  const { styles: placementStyles } = useTransitionStyles(context, {
    initial: ({ side }) => {
      return {
        opacity: 0,
        transform: getInitialTransform(side, theme)
      };
    },
    duration: theme.transitions.duration.shortest
  });
  return /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement("div", { style: __spreadValues({ display: "inline-block" }, floatingStyles), ref: refs.setFloating, "aria-live": "polite" }, /* @__PURE__ */ React__default.createElement("span", { className: cx(styles.root), style: placementStyles }, children && /* @__PURE__ */ React__default.createElement("span", null, children), suffixIcon && /* @__PURE__ */ React__default.createElement(Icon, { name: suffixIcon }))));
}
const getStyles = (theme) => {
  return {
    root: css(__spreadProps(__spreadValues({}, theme.typography.bodySmall), {
      willChange: "transform",
      background: theme.components.tooltip.background,
      color: theme.components.tooltip.text,
      padding: theme.spacing(0.5, 1.5),
      // get's an extra .5 of vertical padding to account for the rounded corners
      borderRadius: theme.shape.radius.pill,
      display: "inline-flex",
      gap: theme.spacing(0.5),
      alignItems: "center"
    }))
  };
};
const getInitialTransform = (placement, theme) => {
  const gap = 1;
  switch (placement) {
    case "top":
      return `translateY(${theme.spacing(gap)})`;
    case "bottom":
      return `translateY(-${theme.spacing(gap)})`;
    case "left":
      return `translateX(${theme.spacing(gap)})`;
    case "right":
      return `translateX(-${theme.spacing(gap)})`;
  }
};

export { InlineToast };
//# sourceMappingURL=InlineToast.js.map
