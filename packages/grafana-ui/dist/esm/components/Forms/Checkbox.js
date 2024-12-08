import { cx, css } from '@emotion/css';
import React__default, { useCallback } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { getLabelStyles } from './Label.js';

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
const Checkbox = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { label, description, value, htmlValue, onChange, disabled, className, indeterminate, invalid } = _b, inputProps = __objRest(_b, ["label", "description", "value", "htmlValue", "onChange", "disabled", "className", "indeterminate", "invalid"]);
    const handleOnChange = useCallback(
      (e) => {
        if (onChange) {
          onChange(e);
        }
      },
      [onChange]
    );
    const styles = useStyles2(getCheckboxStyles, invalid);
    const ariaChecked = indeterminate ? "mixed" : void 0;
    return /* @__PURE__ */ React__default.createElement("label", { className: cx(styles.wrapper, className) }, /* @__PURE__ */ React__default.createElement("div", { className: styles.checkboxWrapper }, /* @__PURE__ */ React__default.createElement(
      "input",
      __spreadProps(__spreadValues({
        type: "checkbox",
        className: cx(styles.input, indeterminate && styles.inputIndeterminate),
        checked: value,
        disabled,
        onChange: handleOnChange,
        value: htmlValue,
        "aria-checked": ariaChecked
      }, inputProps), {
        ref
      })
    ), /* @__PURE__ */ React__default.createElement("span", { className: styles.checkmark })), label && /* @__PURE__ */ React__default.createElement("span", { className: styles.label }, label), description && /* @__PURE__ */ React__default.createElement("span", { className: styles.description }, description));
  }
);
const getCheckboxStyles = (theme, invalid = false) => {
  const labelStyles = getLabelStyles(theme);
  const checkboxSize = 2;
  const labelPadding = 1;
  const getBorderColor = (color) => {
    return invalid ? theme.colors.error.border : color;
  };
  return {
    wrapper: css({
      display: "inline-grid",
      alignItems: "center",
      columnGap: theme.spacing(labelPadding),
      // gridAutoRows is needed to prevent https://github.com/grafana/grafana/issues/68570 in safari
      gridAutoRows: "max-content",
      position: "relative",
      verticalAlign: "middle"
    }),
    input: css({
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
      width: "100% !important",
      // global styles unset this
      height: "100%",
      opacity: 0,
      "&:focus + span, &:focus-visible + span": getFocusStyles(theme),
      "&:focus:not(:focus-visible) + span": getMouseFocusStyles(),
      /**
       * Using adjacent sibling selector to style checked state.
       * Primarily to limit the classes necessary to use when these classes will be used
       * for angular components styling
       * */
      "&:checked + span": {
        background: theme.colors.primary.main,
        border: `1px solid ${getBorderColor(theme.colors.primary.main)}`,
        "&:hover": {
          background: theme.colors.primary.shade
        },
        "&:after": {
          content: '""',
          position: "absolute",
          zIndex: 2,
          left: "4px",
          top: 0,
          width: "6px",
          height: "12px",
          border: `solid ${theme.colors.primary.contrastText}`,
          borderWidth: "0 3px 3px 0",
          transform: "rotate(45deg)"
        }
      },
      "&:disabled + span": {
        backgroundColor: theme.colors.action.disabledBackground,
        cursor: "not-allowed",
        border: `1px solid ${getBorderColor(theme.colors.action.disabledBackground)}`,
        "&:hover": {
          backgroundColor: theme.colors.action.disabledBackground
        },
        "&:after": {
          borderColor: theme.colors.action.disabledText
        }
      }
    }),
    inputIndeterminate: css({
      "&[aria-checked='mixed'] + span": {
        border: `1px solid ${getBorderColor(theme.colors.primary.main)}`,
        background: theme.colors.primary.main,
        "&:hover": {
          background: theme.colors.primary.shade
        },
        "&:after": {
          content: '""',
          position: "absolute",
          zIndex: 2,
          left: "2px",
          right: "2px",
          top: "calc(50% - 1.5px)",
          height: "3px",
          border: `1.5px solid ${theme.colors.primary.contrastText}`,
          backgroundColor: theme.colors.primary.contrastText,
          width: "auto",
          transform: "none"
        }
      },
      "&:disabled[aria-checked='mixed'] + span": {
        backgroundColor: theme.colors.action.disabledBackground,
        border: `1px solid ${getBorderColor(theme.colors.error.transparent)}`,
        "&:after": {
          borderColor: theme.colors.action.disabledText
        }
      }
    }),
    checkboxWrapper: css({
      display: "flex",
      alignItems: "center",
      gridColumnStart: 1,
      gridRowStart: 1
    }),
    checkmark: css({
      position: "relative",
      zIndex: 2,
      display: "inline-block",
      width: theme.spacing(checkboxSize),
      height: theme.spacing(checkboxSize),
      borderRadius: theme.shape.radius.default,
      background: theme.components.input.background,
      border: `1px solid ${getBorderColor(theme.components.input.borderColor)}`,
      "&:hover": {
        cursor: "pointer",
        borderColor: getBorderColor(theme.components.input.borderHover)
      }
    }),
    label: cx(
      labelStyles.label,
      css({
        gridColumnStart: 2,
        gridRowStart: 1,
        position: "relative",
        zIndex: 2,
        cursor: "pointer",
        maxWidth: "fit-content",
        lineHeight: theme.typography.bodySmall.lineHeight,
        marginBottom: 0
      })
    ),
    description: cx(
      labelStyles.description,
      css({
        gridColumnStart: 2,
        gridRowStart: 2,
        lineHeight: theme.typography.bodySmall.lineHeight,
        marginTop: 0
      })
    )
  };
};
Checkbox.displayName = "Checkbox";

export { Checkbox, getCheckboxStyles };
//# sourceMappingURL=Checkbox.js.map
