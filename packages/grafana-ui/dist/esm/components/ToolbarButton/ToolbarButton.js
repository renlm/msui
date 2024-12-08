import { cx, css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import { isIconName } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles, mediaUp } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { getPropertiesForVariant } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
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
const ToolbarButton = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      tooltip,
      icon,
      iconSize,
      className,
      children,
      imgSrc,
      imgAlt,
      fullWidth,
      isOpen,
      narrow,
      variant = "default",
      iconOnly,
      "aria-label": ariaLabel,
      isHighlighted
    } = _b, rest = __objRest(_b, [
      "tooltip",
      "icon",
      "iconSize",
      "className",
      "children",
      "imgSrc",
      "imgAlt",
      "fullWidth",
      "isOpen",
      "narrow",
      "variant",
      "iconOnly",
      "aria-label",
      "isHighlighted"
    ]);
    const styles = useStyles2(getStyles);
    const buttonStyles = cx(
      {
        [styles.button]: true,
        [styles.buttonFullWidth]: fullWidth,
        [styles.narrow]: narrow
      },
      styles[variant],
      className
    );
    const contentStyles = cx({
      [styles.content]: true,
      [styles.contentWithIcon]: !!icon,
      [styles.contentWithRightIcon]: isOpen !== void 0
    });
    const body = /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadValues({
        ref,
        className: buttonStyles,
        "aria-label": getButtonAriaLabel(ariaLabel, tooltip),
        "aria-expanded": isOpen
      }, rest),
      renderIcon(icon, iconSize),
      imgSrc && /* @__PURE__ */ React__default.createElement("img", { className: styles.img, src: imgSrc, alt: imgAlt != null ? imgAlt : "" }),
      children && !iconOnly && /* @__PURE__ */ React__default.createElement("div", { className: contentStyles }, children),
      isOpen === false && /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-down" }),
      isOpen === true && /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-up" }),
      isHighlighted && /* @__PURE__ */ React__default.createElement("div", { className: styles.highlight })
    );
    return tooltip ? /* @__PURE__ */ React__default.createElement(Tooltip, { ref, content: tooltip, placement: "bottom" }, body) : body;
  }
);
ToolbarButton.displayName = "ToolbarButton";
function getButtonAriaLabel(ariaLabel, tooltip) {
  return ariaLabel ? ariaLabel : tooltip ? selectors.components.PageToolbar.item(tooltip) : void 0;
}
function renderIcon(icon, iconSize) {
  if (!icon) {
    return null;
  }
  if (isIconName(icon)) {
    return /* @__PURE__ */ React__default.createElement(Icon, { name: icon, size: `${iconSize ? iconSize : "lg"}` });
  }
  return icon;
}
const getStyles = (theme) => {
  const primaryVariant = getPropertiesForVariant(theme, "primary", "solid");
  const destructiveVariant = getPropertiesForVariant(theme, "destructive", "solid");
  const defaultOld = css({
    color: theme.colors.text.primary,
    background: theme.colors.secondary.main,
    "&:hover": {
      color: theme.colors.text.primary,
      background: theme.colors.secondary.shade,
      border: `1px solid ${theme.colors.border.medium}`
    }
  });
  return {
    button: css({
      label: "toolbar-button",
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: theme.spacing(theme.components.height.md),
      padding: theme.spacing(0, 1),
      borderRadius: theme.shape.radius.default,
      lineHeight: `${theme.components.height.md * theme.spacing.gridSize - 2}px`,
      fontWeight: theme.typography.fontWeightMedium,
      border: `1px solid ${theme.colors.secondary.border}`,
      whiteSpace: "nowrap",
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: theme.transitions.create(["background", "box-shadow", "border-color", "color"], {
          duration: theme.transitions.duration.short
        })
      },
      "&:focus, &:focus-visible": __spreadProps(__spreadValues({}, getFocusStyles(theme)), {
        zIndex: 1
      }),
      "&:focus:not(:focus-visible)": getMouseFocusStyles(),
      "&:hover": {
        boxShadow: theme.shadows.z1
      },
      "&[disabled], &:disabled": {
        cursor: "not-allowed",
        opacity: theme.colors.action.disabledOpacity,
        background: theme.colors.action.disabledBackground,
        boxShadow: "none",
        "&:hover": {
          color: theme.colors.text.disabled,
          background: theme.colors.action.disabledBackground,
          boxShadow: "none"
        }
      }
    }),
    default: css({
      color: theme.colors.text.secondary,
      background: "transparent",
      border: `1px solid transparent`,
      "&:hover": {
        color: theme.colors.text.primary,
        background: theme.colors.background.secondary
      }
    }),
    canvas: defaultOld,
    active: cx(
      defaultOld,
      css({
        "&::before": {
          display: "block",
          content: '" "',
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          bottom: 0,
          borderRadius: theme.shape.radius.default,
          backgroundImage: theme.colors.gradients.brandHorizontal
        }
      })
    ),
    primary: css(primaryVariant),
    destructive: css(destructiveVariant),
    narrow: css({
      padding: theme.spacing(0, 0.5)
    }),
    img: css({
      width: "16px",
      height: "16px",
      marginRight: theme.spacing(1)
    }),
    buttonFullWidth: css({
      flexGrow: 1
    }),
    content: css({
      flexGrow: 1
    }),
    contentWithIcon: css({
      display: "none",
      paddingLeft: theme.spacing(1),
      [`@media ${mediaUp(theme.v1.breakpoints.md)}`]: {
        display: "block"
      }
    }),
    contentWithRightIcon: css({
      paddingRight: theme.spacing(0.5)
    }),
    highlight: css({
      backgroundColor: theme.colors.success.main,
      borderRadius: theme.shape.radius.circle,
      width: "6px",
      height: "6px",
      position: "absolute",
      top: "-3px",
      right: "-3px",
      zIndex: 1
    })
  };
};

export { ToolbarButton };
//# sourceMappingURL=ToolbarButton.js.map
