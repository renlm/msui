import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { Tooltip } from '../Tooltip/Tooltip.js';

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
const InlineLabel = (_a) => {
  var _b = _a, {
    children,
    className,
    tooltip,
    width,
    transparent,
    interactive,
    as: Component = "label"
  } = _b, rest = __objRest(_b, [
    "children",
    "className",
    "tooltip",
    "width",
    "transparent",
    "interactive",
    "as"
  ]);
  const styles = useStyles2(getInlineLabelStyles, transparent, width);
  return /* @__PURE__ */ React__default.createElement(Component, __spreadValues({ className: cx(styles.label, className) }, rest), children, tooltip && /* @__PURE__ */ React__default.createElement(Tooltip, { interactive, placement: "top", content: tooltip, theme: "info" }, /* @__PURE__ */ React__default.createElement(Icon, { tabIndex: 0, name: "info-circle", size: "sm", className: styles.icon })));
};
const getInlineLabelStyles = (theme, transparent = false, width) => {
  return {
    label: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0,
      padding: theme.spacing(0, 1),
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.size.sm,
      backgroundColor: transparent ? "transparent" : theme.colors.background.secondary,
      height: theme.spacing(theme.components.height.md),
      lineHeight: theme.spacing(theme.components.height.md),
      marginRight: theme.spacing(0.5),
      borderRadius: theme.shape.radius.default,
      border: "none",
      width: width ? width !== "auto" ? `${8 * width}px` : width : "100%",
      color: theme.colors.text.primary
    }),
    icon: css({
      color: theme.colors.text.secondary,
      marginLeft: "10px",
      ":hover": {
        color: theme.colors.text.primary
      }
    })
  };
};

export { InlineLabel, getInlineLabelStyles };
//# sourceMappingURL=InlineLabel.js.map
