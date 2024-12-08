import { css } from '@emotion/css';
import Tooltip from 'rc-tooltip';
import React__default, { useRef, useEffect } from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';

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
const HandleTooltip = (props) => {
  const _a = props, { value, children, visible, placement, tipFormatter } = _a, restProps = __objRest(_a, ["value", "children", "visible", "placement", "tipFormatter"]);
  const tooltipRef = useRef(null);
  const rafRef = useRef(null);
  const styles = useStyles2(tooltipStyles);
  function cancelKeepAlign() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
  }
  function keepAlign() {
    rafRef.current = requestAnimationFrame(() => {
      var _a2;
      (_a2 = tooltipRef.current) == null ? void 0 : _a2.forceAlign();
    });
  }
  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [value, visible]);
  return /* @__PURE__ */ React__default.createElement(
    Tooltip,
    __spreadValues({
      overlayClassName: styles.tooltip,
      placement,
      overlay: tipFormatter != null ? tipFormatter : value,
      overlayInnerStyle: { minHeight: "auto" },
      ref: tooltipRef,
      visible
    }, restProps),
    children
  );
};
const tooltipStyles = (theme) => {
  return {
    tooltip: css({
      position: "absolute",
      display: "block",
      visibility: "visible",
      fontSize: theme.typography.bodySmall.fontSize,
      opacity: 0.9,
      padding: 3,
      zIndex: theme.zIndex.tooltip
    })
  };
};

export { HandleTooltip as default };
//# sourceMappingURL=HandleTooltip.js.map
