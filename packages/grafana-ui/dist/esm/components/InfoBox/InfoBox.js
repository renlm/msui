import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Alert } from '../Alert/Alert.js';
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
const InfoBox = React__default.memo(
  React__default.forwardRef(
    (_a, ref) => {
      var _b = _a, { title, className, children, branded, url, urlTitle, onDismiss, severity = "info" } = _b, otherProps = __objRest(_b, ["title", "className", "children", "branded", "url", "urlTitle", "onDismiss", "severity"]);
      const styles = useStyles2(getStyles);
      return /* @__PURE__ */ React__default.createElement(Alert, __spreadProps(__spreadValues({ severity, className }, otherProps), { ref, title }), /* @__PURE__ */ React__default.createElement("div", null, children), url && /* @__PURE__ */ React__default.createElement("a", { href: url, className: cx("external-link", styles.docsLink), target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ React__default.createElement(Icon, { name: "book" }), " ", urlTitle || "Read more"));
    }
  )
);
InfoBox.displayName = "InfoBox";
const getStyles = (theme) => ({
  docsLink: css({
    display: "inline-block",
    marginTop: theme.spacing(2)
  })
});

export { InfoBox };
//# sourceMappingURL=InfoBox.js.map
