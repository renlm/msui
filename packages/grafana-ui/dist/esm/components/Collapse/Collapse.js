import { cx, css } from '@emotion/css';
import React__default, { useState } from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
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
const getStyles = (theme) => ({
  collapse: css({
    label: "collapse",
    marginBottom: theme.spacing(1),
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.weak}`,
    position: "relative",
    borderRadius: theme.shape.radius.default,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0"
  }),
  collapseBody: css({
    label: "collapse__body",
    padding: theme.spacing(theme.components.panel.padding),
    paddingTop: 0,
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }),
  bodyContentWrapper: css({
    label: "bodyContentWrapper",
    flex: 1,
    overflow: "hidden"
  }),
  loader: css({
    label: "collapse__loader",
    height: "2px",
    position: "relative",
    overflow: "hidden",
    background: "none",
    margin: theme.spacing(0.5)
  }),
  loaderActive: css({
    label: "collapse__loader_active",
    "&:after": {
      content: "' '",
      display: "block",
      width: "25%",
      top: 0,
      height: "250%",
      position: "absolute",
      animation: "loader 2s cubic-bezier(0.17, 0.67, 0.83, 0.67) 500ms",
      animationIterationCount: 100,
      left: "-25%",
      background: theme.colors.primary.main
    },
    "@keyframes loader": {
      from: {
        left: "-25%",
        opacity: 0.1
      },
      to: {
        left: "100%",
        opacity: 1
      }
    }
  }),
  header: css({
    label: "collapse__header",
    padding: theme.spacing(1, 2, 1, 2),
    display: "flex"
  }),
  headerCollapsed: css({
    label: "collapse__header--collapsed",
    padding: theme.spacing(1, 2, 1, 2)
  }),
  headerLabel: css({
    label: "collapse__header-label",
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(1),
    fontSize: theme.typography.size.md,
    display: "flex",
    flex: "0 0 100%"
  }),
  icon: css({
    label: "collapse__icon",
    margin: theme.spacing(0.25, 1, 0, -1)
  })
});
const ControlledCollapse = (_a) => {
  var _b = _a, { isOpen, onToggle } = _b, otherProps = __objRest(_b, ["isOpen", "onToggle"]);
  const [open, setOpen] = useState(isOpen);
  return /* @__PURE__ */ React__default.createElement(
    Collapse,
    __spreadProps(__spreadValues({
      isOpen: open,
      collapsible: true
    }, otherProps), {
      onToggle: () => {
        setOpen(!open);
        if (onToggle) {
          onToggle(!open);
        }
      }
    })
  );
};
const Collapse = ({
  isOpen,
  label,
  loading,
  collapsible,
  onToggle,
  className,
  children
}) => {
  const buttonStyles = useStyles2(clearButtonStyles);
  const style = useStyles2(getStyles);
  const onClickToggle = () => {
    if (onToggle) {
      onToggle(!isOpen);
    }
  };
  const panelClass = cx([style.collapse, className]);
  const loaderClass = loading ? cx([style.loader, style.loaderActive]) : cx([style.loader]);
  const headerClass = collapsible ? cx([style.header]) : cx([style.headerCollapsed]);
  return /* @__PURE__ */ React__default.createElement("div", { className: panelClass }, /* @__PURE__ */ React__default.createElement("button", { type: "button", className: cx(buttonStyles, headerClass), onClick: onClickToggle }, collapsible && /* @__PURE__ */ React__default.createElement(Icon, { className: style.icon, name: isOpen ? "angle-down" : "angle-right" }), /* @__PURE__ */ React__default.createElement("div", { className: cx([style.headerLabel]) }, label)), isOpen && /* @__PURE__ */ React__default.createElement("div", { className: cx([style.collapseBody]) }, /* @__PURE__ */ React__default.createElement("div", { className: loaderClass }), /* @__PURE__ */ React__default.createElement("div", { className: style.bodyContentWrapper }, children)));
};
Collapse.displayName = "Collapse";

export { Collapse, ControlledCollapse };
//# sourceMappingURL=Collapse.js.map
