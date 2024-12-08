import { cx, css } from '@emotion/css';
import React__default from 'react';
import SVG from 'react-inlinesvg';
import { isIconName } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { getIconSubDir, getSvgSize, getIconRoot } from './utils.js';

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
const getIconStyles = (theme) => {
  return {
    icon: css({
      display: "inline-block",
      fill: "currentColor",
      flexShrink: 0,
      label: "Icon",
      // line-height: 0; is needed for correct icon alignment in Safari
      lineHeight: 0,
      verticalAlign: "middle"
    }),
    orange: css({
      fill: theme.v1.palette.orange
    })
  };
};
const Icon = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { size = "md", type = "default", name, className, style, title = "" } = _b, rest = __objRest(_b, ["size", "type", "name", "className", "style", "title"]);
    const styles = useStyles2(getIconStyles);
    if (!isIconName(name)) {
      console.warn("Icon component passed an invalid icon name", name);
    }
    const iconName = name === "fa fa-spinner" ? "spinner" : name;
    const iconRoot = getIconRoot();
    const svgSize = getSvgSize(size);
    const svgHgt = svgSize;
    const svgWid = name.startsWith("gf-bar-align") ? 16 : name.startsWith("gf-interp") ? 30 : svgSize;
    const subDir = getIconSubDir(iconName, type);
    const svgPath = `${iconRoot}${subDir}/${iconName}.svg`;
    const composedClassName = cx(
      styles.icon,
      className,
      type === "mono" ? { [styles.orange]: name === "favorite" } : "",
      iconName === "spinner" && "fa-spin"
    );
    return /* @__PURE__ */ React__default.createElement(
      SVG,
      __spreadValues({
        "aria-hidden": rest.tabIndex === void 0 && !title && !rest["aria-label"] && !rest["aria-labelledby"] && !rest["aria-describedby"],
        innerRef: ref,
        src: svgPath,
        width: svgWid,
        height: svgHgt,
        title,
        className: composedClassName,
        style
      }, rest)
    );
  }
);
Icon.displayName = "Icon";

export { Icon };
//# sourceMappingURL=Icon.js.map
