import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';

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
const CardInner = ({ children, href }) => {
  const { inner } = useStyles2(getCardInnerStyles);
  return href ? /* @__PURE__ */ React__default.createElement("a", { className: inner, href }, children) : /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children);
};
const getCardInnerStyles = (theme) => ({
  inner: css({
    display: "flex",
    width: "100%",
    padding: theme.spacing(2)
  })
});
const CardContainer = (_a) => {
  var _b = _a, {
    children,
    disableEvents,
    disableHover,
    isSelected,
    className,
    href
  } = _b, props = __objRest(_b, [
    "children",
    "disableEvents",
    "disableHover",
    "isSelected",
    "className",
    "href"
  ]);
  const { oldContainer } = useStyles2(getCardContainerStyles, disableEvents, disableHover, isSelected);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, props), { className: cx(oldContainer, className) }), /* @__PURE__ */ React__default.createElement(CardInner, { href }, children));
};
const getCardContainerStyles = (theme, disabled = false, disableHover = false, isSelected, isCompact) => {
  const isSelectable = isSelected !== void 0;
  return {
    container: css(__spreadValues(__spreadValues(__spreadValues({
      display: "grid",
      position: "relative",
      gridTemplateColumns: "auto 1fr auto",
      gridTemplateRows: "1fr auto auto auto",
      gridAutoColumns: "1fr",
      gridAutoFlow: "row",
      gridTemplateAreas: `
        "Figure Heading Tags"
        "Figure Meta Tags"
        "Figure Description Tags"
        "Figure Actions Secondary"`,
      width: "100%",
      padding: theme.spacing(isCompact ? 1 : 2),
      background: theme.colors.background.secondary,
      borderRadius: theme.shape.radius.default,
      marginBottom: "8px",
      pointerEvents: disabled ? "none" : "auto",
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
          duration: theme.transitions.duration.short
        })
      }
    }, !disableHover && {
      "&:hover": {
        background: theme.colors.emphasize(theme.colors.background.secondary, 0.03),
        cursor: "pointer",
        zIndex: 1
      },
      "&:focus": getFocusStyles(theme)
    }), isSelectable && {
      cursor: "pointer"
    }), isSelected && {
      outline: `solid 2px ${theme.colors.primary.border}`
    })),
    oldContainer: css(__spreadValues({
      display: "flex",
      width: "100%",
      background: theme.colors.background.secondary,
      borderRadius: theme.shape.radius.default,
      position: "relative",
      pointerEvents: disabled ? "none" : "auto",
      marginBottom: theme.spacing(1),
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
          duration: theme.transitions.duration.short
        })
      }
    }, !disableHover && {
      "&:hover": {
        background: theme.colors.emphasize(theme.colors.background.secondary, 0.03),
        cursor: "pointer",
        zIndex: 1
      },
      "&:focus": getFocusStyles(theme)
    }))
  };
};

export { CardContainer, getCardContainerStyles };
//# sourceMappingURL=CardContainer.js.map
