import { cx, css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';

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
const TitleItem = forwardRef(
  (_a, ref) => {
    var _b = _a, { className, children, href, onClick, target, title } = _b, rest = __objRest(_b, ["className", "children", "href", "onClick", "target", "title"]);
    const styles = useStyles2(getStyles);
    if (href) {
      return /* @__PURE__ */ React__default.createElement(
        "a",
        __spreadValues({
          ref,
          href,
          onClick,
          target,
          title,
          className: cx(styles.linkItem, className)
        }, rest),
        children
      );
    } else if (onClick) {
      return /* @__PURE__ */ React__default.createElement(Button, { ref, className: cx(styles.item, className), variant: "secondary", fill: "text", onClick }, children);
    } else {
      return /* @__PURE__ */ React__default.createElement("span", __spreadValues({ ref, className: cx(styles.item, className) }, rest), children);
    }
  }
);
TitleItem.displayName = "TitleItem";
const getStyles = (theme) => {
  const item = css({
    color: `${theme.colors.text.secondary}`,
    label: "panel-header-item",
    cursor: "auto",
    border: "none",
    borderRadius: `${theme.shape.radius.default}`,
    padding: `${theme.spacing(0, 1)}`,
    height: `${theme.spacing(theme.components.panel.headerHeight)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus, &:focus-visible": __spreadProps(__spreadValues({}, getFocusStyles(theme)), {
      zIndex: 1
    }),
    "&: focus:not(:focus-visible)": getMouseFocusStyles(),
    "&:hover ": {
      boxShadow: `${theme.shadows.z1}`,
      background: `${theme.colors.background.secondary}`,
      color: `${theme.colors.text.primary}`
    }
  });
  return {
    item,
    linkItem: cx(item, css({ cursor: "pointer" }))
  };
};

export { TitleItem };
//# sourceMappingURL=TitleItem.js.map
