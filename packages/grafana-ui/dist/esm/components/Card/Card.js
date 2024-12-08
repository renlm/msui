import { cx, css } from '@emotion/css';
import React__default, { memo, useMemo, useContext, cloneElement } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { getCardContainerStyles, CardContainer } from './CardContainer.js';

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
const CardContext = React__default.createContext(null);
const Card = (_a) => {
  var _b = _a, {
    disabled,
    href,
    onClick,
    children,
    isSelected,
    isCompact,
    className
  } = _b, htmlProps = __objRest(_b, [
    "disabled",
    "href",
    "onClick",
    "children",
    "isSelected",
    "isCompact",
    "className"
  ]);
  const hasHeadingComponent = useMemo(
    () => React__default.Children.toArray(children).some((c) => React__default.isValidElement(c) && c.type === Heading),
    [children]
  );
  const disableHover = disabled || !onClick && !href;
  const onCardClick = onClick && !disabled ? onClick : void 0;
  const styles = useStyles2(getCardContainerStyles, disabled, disableHover, isSelected, isCompact);
  return /* @__PURE__ */ React__default.createElement(
    CardContainer,
    __spreadValues({
      disableEvents: disabled,
      disableHover,
      isSelected,
      className: cx(styles.container, className)
    }, htmlProps),
    /* @__PURE__ */ React__default.createElement(CardContext.Provider, { value: { href, onClick: onCardClick, disabled, isSelected } }, !hasHeadingComponent && /* @__PURE__ */ React__default.createElement(Heading, null), children)
  );
};
const Heading = ({ children, className, "aria-label": ariaLabel }) => {
  const context = useContext(CardContext);
  const styles = useStyles2(getHeadingStyles);
  const { href, onClick, isSelected } = context != null ? context : {
    href: void 0,
    onClick: void 0,
    isSelected: void 0
  };
  return /* @__PURE__ */ React__default.createElement("h2", { className: cx(styles.heading, className) }, href ? /* @__PURE__ */ React__default.createElement("a", { href, className: styles.linkHack, "aria-label": ariaLabel, onClick }, children) : onClick ? /* @__PURE__ */ React__default.createElement("button", { onClick, className: styles.linkHack, "aria-label": ariaLabel, type: "button" }, children) : /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children), isSelected !== void 0 && /* @__PURE__ */ React__default.createElement("input", { "aria-label": "option", type: "radio", checked: isSelected, readOnly: true }));
};
Heading.displayName = "Heading";
const getHeadingStyles = (theme) => ({
  heading: css({
    gridArea: "Heading",
    justifySelf: "start",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 0,
    fontSize: theme.typography.size.md,
    letterSpacing: "inherit",
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    "& input[readonly]": {
      cursor: "inherit"
    }
  }),
  linkHack: css({
    all: "unset",
    "&::after": {
      position: "absolute",
      content: '""',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: theme.shape.radius.default
    },
    "&:focus-visible": {
      outline: "none",
      outlineOffset: 0,
      boxShadow: "none",
      "&::after": __spreadProps(__spreadValues({}, getFocusStyles(theme)), {
        zIndex: 1
      })
    }
  })
});
const Tags = ({ children, className }) => {
  const styles = useStyles2(getTagStyles);
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.tagList, className) }, children);
};
Tags.displayName = "Tags";
const getTagStyles = (theme) => ({
  tagList: css({
    position: "relative",
    gridArea: "Tags",
    alignSelf: "center"
  })
});
const Description = ({ children, className }) => {
  const styles = useStyles2(getDescriptionStyles);
  return /* @__PURE__ */ React__default.createElement("p", { className: cx(styles.description, className) }, children);
};
Description.displayName = "Description";
const getDescriptionStyles = (theme) => ({
  description: css({
    width: "100%",
    gridArea: "Description",
    margin: theme.spacing(1, 0, 0),
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.body.lineHeight
  })
});
const Figure = ({ children, align = "start", className }) => {
  const styles = useStyles2(getFigureStyles);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(
        styles.media,
        className,
        css({
          alignSelf: align
        })
      )
    },
    children
  );
};
Figure.displayName = "Figure";
const getFigureStyles = (theme) => ({
  media: css({
    position: "relative",
    gridArea: "Figure",
    marginRight: theme.spacing(2),
    width: "40px",
    "> img": {
      width: "100%"
    },
    "&:empty": {
      display: "none"
    }
  })
});
const Meta = memo(({ children, className, separator = "|" }) => {
  const styles = useStyles2(getMetaStyles);
  let meta = children;
  const filtered = React__default.Children.toArray(children).filter(Boolean);
  if (!filtered.length) {
    return null;
  }
  meta = filtered.map((element, i) => /* @__PURE__ */ React__default.createElement("div", { key: `element_${i}`, className: styles.metadataItem }, element));
  if (filtered.length > 1 && separator) {
    meta = filtered.reduce((prev, curr, i) => [
      prev,
      /* @__PURE__ */ React__default.createElement("span", { key: `separator_${i}`, className: styles.separator }, separator),
      curr
    ]);
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.metadata, className) }, meta);
});
Meta.displayName = "Meta";
const getMetaStyles = (theme) => ({
  metadata: css({
    gridArea: "Meta",
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    margin: theme.spacing(0.5, 0, 0),
    lineHeight: theme.typography.bodySmall.lineHeight,
    overflowWrap: "anywhere"
  }),
  metadataItem: css({
    // Needed to allow for clickable children in metadata
    zIndex: 0
  }),
  separator: css({
    margin: `0 ${theme.spacing(1)}`
  })
});
const BaseActions = ({ children, disabled, variant, className }) => {
  const styles = useStyles2(getActionStyles);
  const context = useContext(CardContext);
  const isDisabled = (context == null ? void 0 : context.disabled) || disabled;
  const css2 = variant === "primary" ? styles.actions : styles.secondaryActions;
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(css2, className) }, React__default.Children.map(children, (child) => {
    return React__default.isValidElement(child) ? cloneElement(child, __spreadValues({ disabled: isDisabled }, child.props)) : null;
  }));
};
const getActionStyles = (theme) => ({
  actions: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    gridArea: "Actions",
    marginTop: theme.spacing(2)
  }),
  secondaryActions: css({
    alignSelf: "center",
    color: theme.colors.text.secondary,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    gridArea: "Secondary",
    marginTop: theme.spacing(2)
  })
});
const Actions = ({ children, disabled, className }) => {
  return /* @__PURE__ */ React__default.createElement(BaseActions, { variant: "primary", disabled, className }, children);
};
Actions.displayName = "Actions";
const SecondaryActions = ({ children, disabled, className }) => {
  return /* @__PURE__ */ React__default.createElement(BaseActions, { variant: "secondary", disabled, className }, children);
};
SecondaryActions.displayName = "SecondaryActions";
const getCardStyles = (theme) => {
  return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({
    inner: css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap"
    })
  }, getHeadingStyles(theme)), getMetaStyles(theme)), getDescriptionStyles(theme)), getFigureStyles(theme)), getActionStyles(theme)), getTagStyles());
};
Card.Heading = Heading;
Card.Tags = Tags;
Card.Figure = Figure;
Card.Meta = Meta;
Card.Actions = Actions;
Card.SecondaryActions = SecondaryActions;
Card.Description = Description;

export { Card, getCardStyles };
//# sourceMappingURL=Card.js.map
