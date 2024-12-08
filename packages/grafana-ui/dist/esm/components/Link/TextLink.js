import { css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import { textUtil, locationUtil } from '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { customWeight } from '../Text/utils.js';
import { Link } from './Link.js';

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
const svgSizes = {
  h1: "xl",
  h2: "xl",
  h3: "lg",
  h4: "lg",
  h5: "md",
  h6: "md",
  body: "md",
  bodySmall: "xs"
};
const TextLink = forwardRef(
  (_a, ref) => {
    var _b = _a, { href, color = "link", external = false, inline = true, variant = "body", weight, icon, children } = _b, rest = __objRest(_b, ["href", "color", "external", "inline", "variant", "weight", "icon", "children"]);
    const validUrl = textUtil.sanitizeUrl(href != null ? href : "");
    const theme = useTheme2();
    const styles = getLinkStyles(theme, inline, variant, weight, color);
    const externalIcon = icon || "external-link-alt";
    if (external) {
      return /* @__PURE__ */ React__default.createElement("a", __spreadProps(__spreadValues({ href: validUrl, ref }, rest), { target: "_blank", rel: "noreferrer", className: styles }), children, /* @__PURE__ */ React__default.createElement(Icon, { size: svgSizes[variant] || "md", name: externalIcon }));
    }
    const strippedUrl = locationUtil.stripBaseFromUrl(validUrl);
    return /* @__PURE__ */ React__default.createElement(Link, __spreadProps(__spreadValues({ ref, href: strippedUrl }, rest), { className: styles }), children, icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, size: svgSizes[variant] || "md" }));
  }
);
TextLink.displayName = "TextLink";
const getLinkStyles = (theme, inline, variant, weight, color) => {
  return css([
    variant && __spreadValues({}, theme.typography[variant]),
    weight && {
      fontWeight: customWeight(weight, theme)
    },
    color && {
      color: theme.colors.text[color]
    },
    {
      alignItems: "center",
      gap: "0.25em",
      display: "inline-flex",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
        color: theme.colors.text.link
      }
    },
    inline && {
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none"
      }
    }
  ]);
};

export { TextLink, getLinkStyles };
//# sourceMappingURL=TextLink.js.map
