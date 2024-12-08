import { cx, css } from '@emotion/css';
import { debounce } from 'lodash';
import React__default, { forwardRef, useState, useMemo, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import '../../utils/skeleton.js';
import { Input } from '../Input/Input.js';

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
const ColorInput = forwardRef(
  (_a, ref) => {
    var _b = _a, { color, onChange, isClearable = false, onClick, onBlur, disabled, buttonAriaLabel } = _b, inputProps = __objRest(_b, ["color", "onChange", "isClearable", "onClick", "onBlur", "disabled", "buttonAriaLabel"]);
    const [value, setValue] = useState(color);
    const [previousColor, setPreviousColor] = useState(color);
    const updateColor = useMemo(() => debounce(onChange, 100), []);
    useEffect(() => {
      const newColor = tinycolor(color);
      if (newColor.isValid() && color !== previousColor) {
        setValue(newColor.toString());
        setPreviousColor(color);
      }
    }, [color, previousColor]);
    const onChangeColor = (event) => {
      const { value: colorValue } = event.currentTarget;
      setValue(colorValue);
      if (colorValue === "" && isClearable) {
        updateColor(colorValue);
        return;
      }
      const newColor = tinycolor(colorValue);
      if (newColor.isValid()) {
        updateColor(newColor.toString());
      }
    };
    const onBlurInput = (event) => {
      const newColor = tinycolor(value);
      if (!newColor.isValid()) {
        setValue(color);
      }
      onBlur == null ? void 0 : onBlur(event);
    };
    return /* @__PURE__ */ React__default.createElement(
      Input,
      __spreadProps(__spreadValues({}, inputProps), {
        value,
        onChange: onChangeColor,
        disabled,
        onClick,
        onBlur: onBlurInput,
        addonBefore: /* @__PURE__ */ React__default.createElement(ColorPreview, { onClick, ariaLabel: buttonAriaLabel, disabled, color }),
        ref
      })
    );
  }
);
ColorInput.displayName = "ColorInput";
const ColorPreview = ({ color, onClick, disabled, ariaLabel }) => {
  const styles = useStyles2(getColorPreviewStyles);
  return /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": ariaLabel,
      disabled: disabled || !onClick,
      className: cx(
        styles,
        css({
          backgroundColor: color
        })
      )
    }
  );
};
const getColorPreviewStyles = (theme) => css({
  height: "100%",
  width: `${theme.spacing.gridSize * 4}px`,
  borderRadius: `${theme.shape.radius.default} 0 0 ${theme.shape.radius.default}`,
  border: `1px solid ${theme.colors.border.medium}`
});

export { ColorInput as default };
//# sourceMappingURL=ColorInput.js.map
