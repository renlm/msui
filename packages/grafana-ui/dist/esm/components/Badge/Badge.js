import { cx, css } from '@emotion/css';
import React__default from 'react';
import Skeleton from 'react-loading-skeleton';
import tinycolor from 'tinycolor2';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { attachSkeleton } from '../../utils/skeleton.js';
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
const BadgeComponent = React__default.memo((_a) => {
  var _b = _a, { icon, color, text, tooltip, className } = _b, otherProps = __objRest(_b, ["icon", "color", "text", "tooltip", "className"]);
  const styles = useStyles2(getStyles, color);
  const badge = /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: cx(styles.wrapper, className) }, otherProps), icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, size: "sm" }), text);
  return tooltip ? /* @__PURE__ */ React__default.createElement(Tooltip, { content: tooltip, placement: "auto" }, badge) : badge;
});
BadgeComponent.displayName = "Badge";
const BadgeSkeleton = ({ rootProps }) => {
  const styles = useStyles2(getSkeletonStyles);
  return /* @__PURE__ */ React__default.createElement(Skeleton, __spreadValues({ width: 60, height: 22, containerClassName: styles.container }, rootProps));
};
const Badge = attachSkeleton(BadgeComponent, BadgeSkeleton);
const getSkeletonStyles = () => ({
  container: css({
    lineHeight: 1
  })
});
const getStyles = (theme, color) => {
  let sourceColor = theme.visualization.getColorByName(color);
  let borderColor = "";
  let bgColor = "";
  let textColor = "";
  if (theme.isDark) {
    bgColor = tinycolor(sourceColor).setAlpha(0.15).toString();
    borderColor = tinycolor(sourceColor).setAlpha(0.25).toString();
    textColor = tinycolor(sourceColor).lighten(15).toString();
  } else {
    bgColor = tinycolor(sourceColor).setAlpha(0.15).toString();
    borderColor = tinycolor(sourceColor).setAlpha(0.25).toString();
    textColor = tinycolor(sourceColor).darken(20).toString();
  }
  return {
    wrapper: css({
      display: "inline-flex",
      padding: "1px 4px",
      borderRadius: theme.shape.radius.default,
      background: bgColor,
      border: `1px solid ${borderColor}`,
      color: textColor,
      fontWeight: theme.typography.fontWeightRegular,
      gap: "2px",
      fontSize: theme.typography.bodySmall.fontSize,
      lineHeight: theme.typography.bodySmall.lineHeight,
      alignItems: "center"
    })
  };
};

export { Badge };
//# sourceMappingURL=Badge.js.map
