import { css } from '@emotion/css';
import { useFocusRing } from '@react-aria/focus';
import React__default from 'react';
import tinycolor from 'tinycolor2';
import { selectors } from '@grafana/e2e-selectors';
import { useTheme2 } from '../../themes/ThemeContext.js';

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
var ColorSwatchVariant = /* @__PURE__ */ ((ColorSwatchVariant2) => {
  ColorSwatchVariant2["Small"] = "small";
  ColorSwatchVariant2["Large"] = "large";
  return ColorSwatchVariant2;
})(ColorSwatchVariant || {});
const ColorSwatch = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { color, label, variant = "small" /* Small */, isSelected, "aria-label": ariaLabel } = _b, otherProps = __objRest(_b, ["color", "label", "variant", "isSelected", "aria-label"]);
    const theme = useTheme2();
    const { isFocusVisible, focusProps } = useFocusRing();
    const styles = getStyles(theme, variant, color, isFocusVisible, isSelected);
    const hasLabel = !!label;
    const colorLabel = ariaLabel || label;
    return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref, className: styles.wrapper, "data-testid": selectors.components.ColorSwatch.name }, otherProps), hasLabel && /* @__PURE__ */ React__default.createElement("span", { className: styles.label }, label), /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadProps(__spreadValues({
        className: styles.swatch
      }, focusProps), {
        "aria-label": colorLabel ? `${colorLabel} color` : "Pick a color",
        type: "button"
      })
    ));
  }
);
const getStyles = (theme, variant, color, isFocusVisible, isSelected) => {
  const tc = tinycolor(color);
  const isSmall = variant === "small" /* Small */;
  const swatchSize = isSmall ? "16px" : "32px";
  let border = "none";
  if (tc.getAlpha() < 0.1) {
    border = `2px solid ${theme.colors.border.medium}`;
  }
  return {
    wrapper: css({
      display: "flex",
      alignItems: "center",
      cursor: "pointer"
    }),
    label: css({
      marginRight: theme.spacing(1)
    }),
    swatch: css({
      width: swatchSize,
      height: swatchSize,
      background: `${color}`,
      border,
      borderRadius: theme.shape.radius.circle,
      outlineOffset: "1px",
      outline: isFocusVisible ? `2px solid  ${theme.colors.primary.main}` : "none",
      boxShadow: isSelected ? `inset 0 0 0 2px ${color}, inset 0 0 0 4px ${theme.colors.getContrastText(color)}` : "none",
      [theme.transitions.handleMotion("no-preference")]: {
        transition: theme.transitions.create(["transform"], {
          duration: theme.transitions.duration.short
        })
      },
      "&:hover": {
        transform: "scale(1.1)"
      },
      "@media (forced-colors: active)": {
        forcedColorAdjust: "none"
      }
    })
  };
};
ColorSwatch.displayName = "ColorSwatch";

export { ColorSwatch, ColorSwatchVariant };
//# sourceMappingURL=ColorSwatch.js.map
