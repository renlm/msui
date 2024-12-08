import { cx, css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { Icon } from '../Icon/Icon.js';
import { Counter } from './Counter.js';

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
const VerticalTab = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { label, active, icon, counter, className, suffix: Suffix, onChangeTab, href } = _b, otherProps = __objRest(_b, ["label", "active", "icon", "counter", "className", "suffix", "onChangeTab", "href"]);
    const tabsStyles = useStyles2(getTabStyles);
    const content = () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon }), label, typeof counter === "number" && /* @__PURE__ */ React__default.createElement(Counter, { value: counter }), Suffix && /* @__PURE__ */ React__default.createElement(Suffix, { className: tabsStyles.suffix }));
    const linkClass = cx(tabsStyles.link, active && tabsStyles.activeStyle);
    return /* @__PURE__ */ React__default.createElement(
      "a",
      __spreadProps(__spreadValues({
        href,
        className: linkClass
      }, otherProps), {
        onClick: onChangeTab,
        "aria-label": otherProps["aria-label"] || selectors.components.Tab.title(label),
        role: "tab",
        "aria-selected": active,
        ref
      }),
      content()
    );
  }
);
VerticalTab.displayName = "Tab";
const getTabStyles = (theme) => {
  return {
    link: css({
      padding: "6px 12px",
      display: "block",
      height: "100%",
      cursor: "pointer",
      position: "relative",
      color: theme.colors.text.primary,
      svg: {
        marginRight: theme.spacing(1)
      },
      "&:hover, &:focus": {
        textDecoration: "underline"
      }
    }),
    activeStyle: css({
      label: "activeTabStyle",
      color: theme.colors.text.maxContrast,
      overflow: "hidden",
      "&::before": {
        display: "block",
        content: '" "',
        position: "absolute",
        left: 0,
        width: "4px",
        bottom: "2px",
        top: "2px",
        borderRadius: theme.shape.radius.default,
        backgroundImage: "linear-gradient(0deg, #f05a28 30%, #fbca0a 99%)"
      }
    }),
    suffix: css({
      marginLeft: theme.spacing(1)
    })
  };
};

export { VerticalTab };
//# sourceMappingURL=VerticalTab.js.map
