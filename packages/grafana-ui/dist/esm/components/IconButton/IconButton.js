import { cx, css } from '@emotion/css';
import React__default from 'react';
import { deprecationWarning, colorManipulator } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { IconRenderer } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { getSvgSize } from '../Icon/utils.js';
import { Tooltip } from '../Tooltip/Tooltip.js';

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
const IconButton = React__default.forwardRef((props, ref) => {
  const { size = "md", variant = "secondary" } = props;
  let limitedIconSize;
  if (size === "xxl" || size === "xxxl") {
    deprecationWarning("IconButton", 'size="xxl" and size="xxxl"', 'size="xl"');
    limitedIconSize = "xl";
  } else {
    limitedIconSize = size;
  }
  const styles = useStyles2(getStyles, limitedIconSize, variant);
  let ariaLabel;
  let buttonRef;
  if ("tooltip" in props) {
    const { tooltip } = props;
    ariaLabel = typeof tooltip === "string" ? tooltip : void 0;
  } else if ("ariaLabel" in props || "aria-label" in props) {
    const { ariaLabel: deprecatedAriaLabel, ["aria-label"]: ariaLabelProp } = props;
    ariaLabel = ariaLabelProp || deprecatedAriaLabel;
    buttonRef = ref;
  }
  if ("tooltip" in props) {
    const _a = props, { name, iconType, className, tooltip, tooltipPlacement } = _a, restProps = __objRest(_a, ["name", "iconType", "className", "tooltip", "tooltipPlacement"]);
    return /* @__PURE__ */ React__default.createElement(Tooltip, { ref, content: tooltip, placement: tooltipPlacement }, /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadProps(__spreadValues({}, restProps), {
        ref: buttonRef,
        "aria-label": ariaLabel,
        className: cx(styles.button, className),
        type: "button"
      }),
      /* @__PURE__ */ React__default.createElement(IconRenderer, { icon: name, size: limitedIconSize, className: styles.icon, iconType })
    ));
  } else {
    const _b = props, { name, iconType, className } = _b, restProps = __objRest(_b, ["name", "iconType", "className"]);
    return /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadProps(__spreadValues({}, restProps), {
        ref: buttonRef,
        "aria-label": ariaLabel,
        className: cx(styles.button, className),
        type: "button"
      }),
      /* @__PURE__ */ React__default.createElement(IconRenderer, { icon: name, size: limitedIconSize, className: styles.icon, iconType })
    );
  }
});
IconButton.displayName = "IconButton";
const getStyles = (theme, size, variant) => {
  const hoverSize = getSvgSize(size) + theme.spacing.gridSize;
  let iconColor = theme.colors.text.primary;
  if (variant === "primary") {
    iconColor = theme.colors.primary.text;
  } else if (variant === "destructive") {
    iconColor = theme.colors.error.text;
  }
  return {
    button: css({
      zIndex: 0,
      position: "relative",
      margin: `0 ${theme.spacing.x0_5} 0 0`,
      boxShadow: "none",
      border: "none",
      display: "inline-flex",
      background: "transparent",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      color: iconColor,
      "&[disabled], &:disabled": {
        cursor: "not-allowed",
        color: theme.colors.action.disabledText,
        opacity: 0.65
      },
      "&:before": {
        zIndex: -1,
        position: "absolute",
        opacity: 0,
        width: `${hoverSize}px`,
        height: `${hoverSize}px`,
        borderRadius: theme.shape.radius.default,
        content: '""',
        [theme.transitions.handleMotion("no-preference", "reduce")]: {
          transitionDuration: "0.2s",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionProperty: "opacity"
        }
      },
      "&:focus, &:focus-visible": getFocusStyles(theme),
      "&:focus:not(:focus-visible)": getMouseFocusStyles(),
      "&:hover": {
        "&:before": {
          backgroundColor: variant === "secondary" ? theme.colors.action.hover : colorManipulator.alpha(iconColor, 0.12),
          opacity: 1
        }
      }
    }),
    icon: css({
      verticalAlign: "baseline"
    })
  };
};

export { IconButton };
//# sourceMappingURL=IconButton.js.map
