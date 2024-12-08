import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { getPropertiesForButtonSize } from '../Forms/commonStyles.js';
import { Icon } from '../Icon/Icon.js';
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
const Button = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "primary",
      size = "md",
      fill = "solid",
      icon,
      fullWidth,
      children,
      className,
      type = "button",
      tooltip,
      disabled,
      tooltipPlacement,
      onClick
    } = _b, otherProps = __objRest(_b, [
      "variant",
      "size",
      "fill",
      "icon",
      "fullWidth",
      "children",
      "className",
      "type",
      "tooltip",
      "disabled",
      "tooltipPlacement",
      "onClick"
    ]);
    const theme = useTheme2();
    const styles = getButtonStyles({
      theme,
      size,
      variant,
      fill,
      fullWidth,
      iconOnly: !children
    });
    const buttonStyles = cx(
      styles.button,
      {
        [styles.disabled]: disabled
      },
      className
    );
    const hasTooltip = Boolean(tooltip);
    const button = /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadProps(__spreadValues({
        className: buttonStyles,
        type,
        onClick: disabled ? void 0 : onClick
      }, otherProps), {
        "aria-disabled": hasTooltip && disabled,
        disabled: !hasTooltip && disabled,
        ref: tooltip ? void 0 : ref
      }),
      /* @__PURE__ */ React__default.createElement(IconRenderer, { icon, size, className: styles.icon }),
      children && /* @__PURE__ */ React__default.createElement("span", { className: styles.content }, children)
    );
    if (tooltip) {
      return /* @__PURE__ */ React__default.createElement(Tooltip, { ref, content: tooltip, placement: tooltipPlacement }, button);
    }
    return button;
  }
);
Button.displayName = "Button";
const LinkButton = React__default.forwardRef(
  (_c, ref) => {
    var _d = _c, {
      variant = "primary",
      size = "md",
      fill = "solid",
      icon,
      fullWidth,
      children,
      className,
      onBlur,
      onFocus,
      disabled,
      tooltip,
      tooltipPlacement
    } = _d, otherProps = __objRest(_d, [
      "variant",
      "size",
      "fill",
      "icon",
      "fullWidth",
      "children",
      "className",
      "onBlur",
      "onFocus",
      "disabled",
      "tooltip",
      "tooltipPlacement"
    ]);
    const theme = useTheme2();
    const styles = getButtonStyles({
      theme,
      fullWidth,
      size,
      variant,
      fill,
      iconOnly: !children
    });
    const linkButtonStyles = cx(
      styles.button,
      {
        [css(styles.disabled, {
          pointerEvents: "none"
        })]: disabled
      },
      className
    );
    const button = /* @__PURE__ */ React__default.createElement(
      "a",
      __spreadProps(__spreadValues({
        className: linkButtonStyles
      }, otherProps), {
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled,
        ref: tooltip ? void 0 : ref
      }),
      /* @__PURE__ */ React__default.createElement(IconRenderer, { icon, size, className: styles.icon }),
      children && /* @__PURE__ */ React__default.createElement("span", { className: styles.content }, children)
    );
    if (tooltip) {
      return /* @__PURE__ */ React__default.createElement(Tooltip, { ref, content: tooltip, placement: tooltipPlacement }, button);
    }
    return button;
  }
);
LinkButton.displayName = "LinkButton";
const IconRenderer = ({ icon, size, className, iconType }) => {
  if (!icon) {
    return null;
  }
  if (React__default.isValidElement(icon)) {
    return React__default.cloneElement(icon, {
      className,
      size
    });
  }
  return /* @__PURE__ */ React__default.createElement(Icon, { name: icon, size, className, type: iconType });
};
const getButtonStyles = (props) => {
  const { theme, variant, fill = "solid", size, iconOnly, fullWidth } = props;
  const { height, padding, fontSize } = getPropertiesForButtonSize(size, theme);
  const variantStyles = getPropertiesForVariant(theme, variant, fill);
  const disabledStyles = getPropertiesForDisabled(theme, variant, fill);
  const focusStyle = getFocusStyles(theme);
  const paddingMinusBorder = theme.spacing.gridSize * padding - 1;
  return {
    button: css(__spreadProps(__spreadValues(__spreadValues({
      label: "button",
      display: "inline-flex",
      alignItems: "center",
      fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      fontFamily: theme.typography.fontFamily,
      padding: `0 ${paddingMinusBorder}px`,
      height: theme.spacing(height),
      // Deduct border from line-height for perfect vertical centering on windows and linux
      lineHeight: `${theme.spacing.gridSize * height - 2}px`,
      verticalAlign: "middle",
      cursor: "pointer",
      borderRadius: theme.shape.radius.default,
      "&:focus": focusStyle,
      "&:focus-visible": focusStyle,
      "&:focus:not(:focus-visible)": getMouseFocusStyles()
    }, fullWidth && {
      flexGrow: 1,
      justifyContent: "center"
    }), variantStyles), {
      ":disabled": disabledStyles,
      "&[disabled]": disabledStyles
    })),
    disabled: css(disabledStyles, {
      "&:hover": css(disabledStyles)
    }),
    img: css({
      width: "16px",
      height: "16px",
      margin: theme.spacing(0, 1, 0, 0.5)
    }),
    icon: iconOnly ? css({
      // Important not to set margin bottom here as it would override internal icon bottom margin
      marginRight: theme.spacing(-padding / 2),
      marginLeft: theme.spacing(-padding / 2)
    }) : css({
      marginRight: theme.spacing(padding / 2)
    }),
    content: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "100%"
    })
  };
};
function getButtonVariantStyles(theme, color, fill) {
  let outlineBorderColor = color.border;
  let borderColor = "transparent";
  let hoverBorderColor = "transparent";
  if (color.name === "secondary") {
    borderColor = color.border;
    hoverBorderColor = theme.colors.emphasize(color.border, 0.25);
    outlineBorderColor = theme.colors.border.strong;
  }
  if (fill === "outline") {
    return {
      background: "transparent",
      color: color.text,
      border: `1px solid ${outlineBorderColor}`,
      transition: theme.transitions.create(["background-color", "border-color", "color"], {
        duration: theme.transitions.duration.short
      }),
      "&:hover": {
        background: color.transparent,
        borderColor: theme.colors.emphasize(outlineBorderColor, 0.25),
        color: color.text
      }
    };
  }
  if (fill === "text") {
    return {
      background: "transparent",
      color: color.text,
      border: "1px solid transparent",
      transition: theme.transitions.create(["background-color", "color"], {
        duration: theme.transitions.duration.short
      }),
      "&:focus": {
        outline: "none",
        textDecoration: "none"
      },
      "&:hover": {
        background: color.transparent,
        textDecoration: "none"
      }
    };
  }
  return {
    background: color.main,
    color: color.contrastText,
    border: `1px solid ${borderColor}`,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": {
      background: color.shade,
      color: color.contrastText,
      boxShadow: theme.shadows.z1,
      borderColor: hoverBorderColor
    }
  };
}
function getPropertiesForDisabled(theme, variant, fill) {
  const disabledStyles = {
    cursor: "not-allowed",
    boxShadow: "none",
    color: theme.colors.text.disabled,
    transition: "none"
  };
  if (fill === "text") {
    return __spreadProps(__spreadValues({}, disabledStyles), {
      background: "transparent",
      border: `1px solid transparent`
    });
  }
  if (fill === "outline") {
    return __spreadProps(__spreadValues({}, disabledStyles), {
      background: "transparent",
      border: `1px solid ${theme.colors.border.weak}`
    });
  }
  return __spreadProps(__spreadValues({}, disabledStyles), {
    background: theme.colors.action.disabledBackground,
    border: `1px solid transparent`
  });
}
function getPropertiesForVariant(theme, variant, fill) {
  switch (variant) {
    case "secondary":
      return getButtonVariantStyles(theme, theme.colors.secondary, fill);
    case "destructive":
      return getButtonVariantStyles(theme, theme.colors.error, fill);
    case "success":
      return getButtonVariantStyles(theme, theme.colors.success, fill);
    case "primary":
    default:
      return getButtonVariantStyles(theme, theme.colors.primary, fill);
  }
}
const clearButtonStyles = (theme) => {
  return css({
    background: "transparent",
    color: theme.colors.text.primary,
    border: "none",
    padding: 0
  });
};
const clearLinkButtonStyles = (theme) => {
  return css({
    background: "transparent",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    color: "inherit",
    height: "100%",
    "&:hover": {
      background: "transparent",
      color: "inherit"
    }
  });
};

export { Button, IconRenderer, LinkButton, clearButtonStyles, clearLinkButtonStyles, getButtonStyles, getPropertiesForVariant };
//# sourceMappingURL=Button.js.map
