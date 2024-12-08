import { cx, css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import { Icon } from '../Icon/Icon.js';
import { Box } from '../Layout/Box/Box.js';
import { Text } from '../Text/Text.js';

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
const Alert = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      title,
      onRemove,
      children,
      buttonContent,
      elevated,
      bottomSpacing,
      topSpacing,
      className,
      severity = "error"
    } = _b, restProps = __objRest(_b, [
      "title",
      "onRemove",
      "children",
      "buttonContent",
      "elevated",
      "bottomSpacing",
      "topSpacing",
      "className",
      "severity"
    ]);
    const theme = useTheme2();
    const hasTitle = Boolean(title);
    const styles = getStyles(theme, severity, hasTitle, elevated, bottomSpacing, topSpacing);
    const rolesBySeverity = {
      error: "alert",
      warning: "alert",
      info: "status",
      success: "status"
    };
    const role = restProps["role"] || rolesBySeverity[severity];
    const ariaLabel = restProps["aria-label"] || title;
    return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref, className: cx(styles.wrapper, className), role, "aria-label": ariaLabel }, restProps), /* @__PURE__ */ React__default.createElement(
      Box,
      {
        "data-testid": selectors.components.Alert.alertV2(severity),
        display: "flex",
        backgroundColor: severity,
        borderRadius: "default",
        paddingY: 1,
        paddingX: 2,
        borderStyle: "solid",
        borderColor: severity,
        alignItems: "stretch",
        boxShadow: elevated ? "z3" : void 0
      },
      /* @__PURE__ */ React__default.createElement(Box, { paddingTop: 1, paddingRight: 2 }, /* @__PURE__ */ React__default.createElement("div", { className: styles.icon }, /* @__PURE__ */ React__default.createElement(Icon, { size: "xl", name: getIconFromSeverity(severity) }))),
      /* @__PURE__ */ React__default.createElement(Box, { paddingY: 1, grow: 1 }, /* @__PURE__ */ React__default.createElement(Text, { color: "primary", weight: "medium" }, title), children && /* @__PURE__ */ React__default.createElement("div", { className: styles.content }, children)),
      onRemove && !buttonContent && /* @__PURE__ */ React__default.createElement("div", { className: styles.close }, /* @__PURE__ */ React__default.createElement(
        Button,
        {
          "aria-label": "Close alert",
          icon: "times",
          onClick: onRemove,
          type: "button",
          fill: "text",
          variant: "secondary"
        }
      )),
      onRemove && buttonContent && /* @__PURE__ */ React__default.createElement(Box, { marginLeft: 1, display: "flex", alignItems: "center" }, /* @__PURE__ */ React__default.createElement(Button, { "aria-label": "Close alert", variant: "secondary", onClick: onRemove, type: "button" }, buttonContent))
    ));
  }
);
Alert.displayName = "Alert";
const getIconFromSeverity = (severity) => {
  switch (severity) {
    case "error":
      return "exclamation-circle";
    case "warning":
      return "exclamation-triangle";
    case "info":
      return "info-circle";
    case "success":
      return "check";
  }
};
const getStyles = (theme, severity, hasTitle, elevated, bottomSpacing, topSpacing) => {
  const color = theme.colors[severity];
  return {
    wrapper: css({
      flexGrow: 1,
      marginBottom: theme.spacing(bottomSpacing != null ? bottomSpacing : 2),
      marginTop: theme.spacing(topSpacing != null ? topSpacing : 0),
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: theme.colors.background.primary,
        zIndex: -1
      }
    }),
    icon: css({
      color: color.text
    }),
    content: css({
      color: theme.colors.text.primary,
      paddingTop: hasTitle ? theme.spacing(0.5) : 0,
      maxHeight: "50vh",
      overflowY: "auto"
    }),
    close: css({
      position: "relative",
      color: theme.colors.text.secondary,
      background: "none",
      display: "flex",
      top: "-6px",
      right: "-14px"
    })
  };
};

export { Alert, getIconFromSeverity };
//# sourceMappingURL=Alert.js.map
