import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getChildId } from '../../utils/reactUtils.js';
import { FieldValidationMessage } from './FieldValidationMessage.js';
import { InlineLabel } from './InlineLabel.js';

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
const InlineField = (_a) => {
  var _b = _a, {
    children,
    label,
    tooltip,
    labelWidth = "auto",
    invalid,
    loading,
    disabled,
    required,
    className,
    htmlFor,
    grow,
    shrink,
    error,
    transparent,
    interactive
  } = _b, htmlProps = __objRest(_b, [
    "children",
    "label",
    "tooltip",
    "labelWidth",
    "invalid",
    "loading",
    "disabled",
    "required",
    "className",
    "htmlFor",
    "grow",
    "shrink",
    "error",
    "transparent",
    "interactive"
  ]);
  const theme = useTheme2();
  const styles = getStyles(theme, grow, shrink);
  const inputId = htmlFor != null ? htmlFor : getChildId(children);
  const labelElement = typeof label === "string" ? /* @__PURE__ */ React__default.createElement(
    InlineLabel,
    {
      interactive,
      width: labelWidth,
      tooltip,
      htmlFor: inputId,
      transparent
    },
    `${label}${required ? " *" : ""}`
  ) : label;
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: cx(styles.container, className) }, htmlProps), labelElement, /* @__PURE__ */ React__default.createElement("div", { className: styles.childContainer }, React__default.cloneElement(children, { invalid, disabled, loading }), invalid && error && /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.fieldValidationWrapper) }, /* @__PURE__ */ React__default.createElement(FieldValidationMessage, null, error))));
};
InlineField.displayName = "InlineField";
const getStyles = (theme, grow, shrink) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      textAlign: "left",
      position: "relative",
      flex: `${grow ? 1 : 0} ${shrink ? 1 : 0} auto`,
      margin: `0 ${theme.spacing(0.5)} ${theme.spacing(0.5)} 0`
    }),
    childContainer: css({
      flex: `${grow ? 1 : 0} ${shrink ? 1 : 0} auto`
    }),
    fieldValidationWrapper: css({
      marginTop: theme.spacing(0.5)
    })
  };
};

export { InlineField };
//# sourceMappingURL=InlineField.js.map
