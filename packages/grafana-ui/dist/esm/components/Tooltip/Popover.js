import { offset, flip, shift, arrow, useFloating, autoUpdate, useTransitionStyles, FloatingArrow } from '@floating-ui/react';
import React__default, { useRef, useLayoutEffect } from 'react';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getPlacement } from '../../utils/tooltipUtils.js';
import { Portal } from '../Portal/Portal.js';

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
function Popover(_a) {
  var _b = _a, {
    content,
    show,
    placement,
    className,
    wrapperClassName,
    referenceElement,
    renderArrow
  } = _b, rest = __objRest(_b, [
    "content",
    "show",
    "placement",
    "className",
    "wrapperClassName",
    "referenceElement",
    "renderArrow"
  ]);
  const theme = useTheme2();
  const arrowRef = useRef(null);
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
  if (renderArrow) {
    middleware.push(
      arrow({
        element: arrowRef
      })
    );
  }
  const { context, refs, floatingStyles } = useFloating({
    open: show,
    placement: getPlacement(placement),
    middleware,
    whileElementsMounted: autoUpdate,
    strategy: "fixed"
  });
  useLayoutEffect(() => {
    refs.setReference(referenceElement);
  }, [referenceElement, refs]);
  const { styles: placementStyles } = useTransitionStyles(context, {
    initial: () => ({
      opacity: 0
    }),
    duration: theme.transitions.duration.enteringScreen
  });
  return show ? /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement(
    "div",
    __spreadValues({
      ref: refs.setFloating,
      style: __spreadValues(__spreadValues({}, floatingStyles), placementStyles),
      className: wrapperClassName
    }, rest),
    /* @__PURE__ */ React__default.createElement("div", { className }, renderArrow && /* @__PURE__ */ React__default.createElement(FloatingArrow, { fill: theme.colors.border.weak, ref: arrowRef, context }), typeof content === "string" && content, React__default.isValidElement(content) && React__default.cloneElement(content), typeof content === "function" && content({}))
  )) : void 0;
}

export { Popover };
//# sourceMappingURL=Popover.js.map
