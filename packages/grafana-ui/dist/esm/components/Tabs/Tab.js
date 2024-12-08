import { cx, css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
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
const Tab = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { label, active, icon, onChangeTab, counter, suffix: Suffix, className, href } = _b, otherProps = __objRest(_b, ["label", "active", "icon", "onChangeTab", "counter", "suffix", "className", "href"]);
    const tabsStyles = useStyles2(getStyles);
    const clearStyles = useStyles2(clearButtonStyles);
    const content = () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon }), label, typeof counter === "number" && /* @__PURE__ */ React__default.createElement(Counter, { value: counter }), Suffix && /* @__PURE__ */ React__default.createElement(Suffix, { className: tabsStyles.suffix }));
    const linkClass = cx(clearStyles, tabsStyles.link, active ? tabsStyles.activeStyle : tabsStyles.notActive);
    const commonProps = __spreadProps(__spreadValues({
      className: linkClass
    }, otherProps), {
      onClick: onChangeTab,
      "aria-label": otherProps["aria-label"] || selectors.components.Tab.title(label),
      role: "tab",
      "aria-selected": active
    });
    if (href) {
      return /* @__PURE__ */ React__default.createElement("div", { className: tabsStyles.item }, /* @__PURE__ */ React__default.createElement(
        "a",
        __spreadProps(__spreadValues({}, commonProps), {
          href,
          ref
        }),
        content()
      ));
    }
    return /* @__PURE__ */ React__default.createElement("div", { className: tabsStyles.item }, /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadProps(__spreadValues({}, commonProps), {
        type: "button",
        ref
      }),
      content()
    ));
  }
);
Tab.displayName = "Tab";
const getStyles = (theme) => {
  return {
    item: css({
      listStyle: "none",
      position: "relative",
      display: "flex",
      whiteSpace: "nowrap",
      padding: theme.spacing(0.5)
    }),
    link: css({
      color: theme.colors.text.secondary,
      padding: theme.spacing(1, 1.5, 0.5),
      borderRadius: theme.shape.radius.default,
      display: "block",
      height: "100%",
      svg: {
        marginRight: theme.spacing(1)
      },
      "&:focus-visible": getFocusStyles(theme),
      "&::before": {
        display: "block",
        content: '" "',
        position: "absolute",
        left: 0,
        right: 0,
        height: "4px",
        borderRadius: theme.shape.radius.default,
        bottom: 0
      }
    }),
    notActive: css({
      "a:hover, &:hover, &:focus": {
        color: theme.colors.text.primary,
        "&::before": {
          backgroundColor: theme.colors.action.hover
        }
      }
    }),
    activeStyle: css({
      label: "activeTabStyle",
      color: theme.colors.text.primary,
      overflow: "hidden",
      "&::before": {
        backgroundImage: theme.colors.gradients.brandHorizontal
      }
    }),
    suffix: css({
      marginLeft: theme.spacing(1)
    })
  };
};

export { Tab };
//# sourceMappingURL=Tab.js.map
