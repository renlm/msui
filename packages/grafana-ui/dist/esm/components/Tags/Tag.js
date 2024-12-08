import { cx, css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import '@grafana/data';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import { attachSkeleton } from '../../utils/skeleton.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import { getTagColorsFromName, getTagColor } from '../../utils/tags.js';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { Icon } from '../Icon/Icon.js';

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
const TagComponent = forwardRef((_a, ref) => {
  var _b = _a, { name, onClick, icon, className, colorIndex } = _b, rest = __objRest(_b, ["name", "onClick", "icon", "className", "colorIndex"]);
  const theme = useTheme2();
  const styles = getTagStyles(theme, name, colorIndex);
  const onTagClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick == null ? void 0 : onClick(name, event);
  };
  const classes = cx(styles.wrapper, className, { [styles.hover]: onClick !== void 0 });
  return onClick ? /* @__PURE__ */ React__default.createElement("button", __spreadProps(__spreadValues({}, rest), { className: classes, onClick: onTagClick, ref }), icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon }), name) : /* @__PURE__ */ React__default.createElement("span", __spreadProps(__spreadValues({}, rest), { className: classes, ref }), icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon }), name);
});
TagComponent.displayName = "Tag";
const TagSkeleton = ({ rootProps }) => {
  const styles = useStyles2(getSkeletonStyles);
  return /* @__PURE__ */ React__default.createElement(Skeleton, __spreadValues({ width: 60, height: 22, containerClassName: styles.container }, rootProps));
};
const Tag = attachSkeleton(TagComponent, TagSkeleton);
const getSkeletonStyles = () => ({
  container: css({
    lineHeight: 1
  })
});
const getTagStyles = (theme, name, colorIndex) => {
  let colors;
  if (colorIndex === void 0) {
    colors = getTagColorsFromName(name);
  } else {
    colors = getTagColor(colorIndex);
  }
  return {
    wrapper: css({
      appearance: "none",
      borderStyle: "none",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.size.sm,
      lineHeight: theme.typography.bodySmall.lineHeight,
      verticalAlign: "baseline",
      backgroundColor: colors.color,
      color: theme.v1.palette.gray98,
      whiteSpace: "nowrap",
      textShadow: "none",
      padding: "3px 6px",
      borderRadius: theme.shape.radius.default
    }),
    hover: css({
      "&:hover": {
        opacity: 0.85,
        cursor: "pointer"
      }
    })
  };
};

export { Tag };
//# sourceMappingURL=Tag.js.map
