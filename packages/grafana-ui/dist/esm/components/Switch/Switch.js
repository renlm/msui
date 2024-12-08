import { cx, css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default, { useRef } from 'react';
import { deprecationWarning } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
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
const Switch = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { value, checked, onChange, id, label, disabled, invalid = false } = _b, inputProps = __objRest(_b, ["value", "checked", "onChange", "id", "label", "disabled", "invalid"]);
    if (checked) {
      deprecationWarning("Switch", "checked prop", "value");
    }
    const styles = useStyles2(getSwitchStyles);
    const switchIdRef = useRef(id ? id : uniqueId("switch-"));
    return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.switch, invalid && styles.invalid) }, /* @__PURE__ */ React__default.createElement(
      "input",
      __spreadProps(__spreadValues({
        type: "checkbox",
        disabled,
        checked: value,
        onChange: (event) => {
          !disabled && (onChange == null ? void 0 : onChange(event));
        },
        id: switchIdRef.current
      }, inputProps), {
        ref
      })
    ), /* @__PURE__ */ React__default.createElement("label", { htmlFor: switchIdRef.current, "aria-label": label != null ? label : "Toggle switch" }, /* @__PURE__ */ React__default.createElement(Icon, { name: "check", size: "xs" })));
  }
);
Switch.displayName = "Switch";
const InlineSwitch = React__default.forwardRef(
  (_c, ref) => {
    var _d = _c, { transparent, className, showLabel, label, value, id, invalid } = _d, props = __objRest(_d, ["transparent", "className", "showLabel", "label", "value", "id", "invalid"]);
    const styles = useStyles2(getSwitchStyles, transparent);
    return /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: cx(styles.inlineContainer, className, props.disabled && styles.disabled, invalid && styles.invalid)
      },
      showLabel && /* @__PURE__ */ React__default.createElement(
        "label",
        {
          htmlFor: id,
          className: cx(styles.inlineLabel, value && styles.inlineLabelEnabled, "inline-switch-label")
        },
        label
      ),
      /* @__PURE__ */ React__default.createElement(Switch, __spreadProps(__spreadValues({}, props), { id, label, ref, value }))
    );
  }
);
InlineSwitch.displayName = "Switch";
const getSwitchStyles = (theme, transparent) => ({
  switch: css({
    width: "32px",
    height: "16px",
    position: "relative",
    lineHeight: 1,
    input: {
      opacity: 0,
      left: "-100vw",
      zIndex: -1e3,
      position: "absolute",
      "&:checked + label": {
        background: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
        "&:hover": {
          background: theme.colors.primary.shade
        },
        svg: {
          transform: "translate3d(17px, -50%, 0)",
          background: theme.colors.primary.contrastText,
          color: theme.colors.primary.main
        }
      },
      "&:disabled + label": {
        background: theme.colors.action.disabledBackground,
        borderColor: theme.colors.border.weak,
        cursor: "not-allowed",
        svg: {
          background: theme.colors.text.disabled
        }
      },
      "&:disabled:checked + label": {
        background: theme.colors.primary.transparent,
        svg: {
          color: theme.colors.primary.contrastText
        }
      },
      "&:focus + label, &:focus-visible + label": getFocusStyles(theme),
      "&:focus:not(:focus-visible) + label": getMouseFocusStyles()
    },
    label: {
      width: "100%",
      height: "100%",
      cursor: "pointer",
      borderRadius: theme.shape.radius.pill,
      background: theme.components.input.background,
      border: `1px solid ${theme.components.input.borderColor}`,
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: theme.components.input.borderHover
      },
      svg: {
        position: "absolute",
        display: "block",
        color: "transparent",
        width: "12px",
        height: "12px",
        borderRadius: theme.shape.radius.circle,
        background: theme.colors.text.secondary,
        boxShadow: theme.shadows.z1,
        top: "50%",
        transform: "translate3d(1px, -50%, 0)",
        transition: "transform 0.2s cubic-bezier(0.19, 1, 0.22, 1)",
        "@media (forced-colors: active)": {
          border: `1px solid ${theme.colors.primary.contrastText}`
        }
      }
    }
  }),
  inlineContainer: css({
    padding: theme.spacing(0, 1),
    height: theme.spacing(theme.components.height.md),
    display: "inline-flex",
    alignItems: "center",
    background: transparent ? "transparent" : theme.components.input.background,
    border: `1px solid ${transparent ? "transparent" : theme.components.input.borderColor}`,
    borderRadius: theme.shape.radius.default,
    "&:hover": {
      border: `1px solid ${transparent ? "transparent" : theme.components.input.borderHover}`,
      ".inline-switch-label": {
        color: theme.colors.text.primary
      }
    }
  }),
  disabled: css({
    backgroundColor: "rgba(204, 204, 220, 0.04)",
    color: "rgba(204, 204, 220, 0.6)",
    border: "1px solid rgba(204, 204, 220, 0.04)"
  }),
  inlineLabel: css({
    cursor: "pointer",
    paddingRight: theme.spacing(1),
    color: theme.colors.text.secondary,
    whiteSpace: "nowrap"
  }),
  inlineLabelEnabled: css({
    color: theme.colors.text.primary
  }),
  invalid: css({
    "input + label, input:checked + label, input:hover + label": {
      border: `1px solid ${theme.colors.error.border}`
    }
  })
});

export { InlineSwitch, Switch };
//# sourceMappingURL=Switch.js.map
