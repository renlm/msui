import { cx, css } from '@emotion/css';
import React__default, { forwardRef, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { useThrottleFn } from 'react-use';
import { colorManipulator } from '@grafana/data';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { ClickOutsideWrapper } from '../ClickOutsideWrapper/ClickOutsideWrapper.js';
import ColorInput from './ColorInput.js';
import { getStyles as getStyles$1 } from './SpectrumPalette.js';

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
const ColorPickerInput = forwardRef(
  (_a, ref) => {
    var _b = _a, { value = "", onChange, returnColorAs = "rgb" } = _b, inputProps = __objRest(_b, ["value", "onChange", "returnColorAs"]);
    const [currentColor, setColor] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme2();
    const styles = useStyles2(getStyles);
    const paletteStyles = useStyles2(getStyles$1);
    useThrottleFn(
      (c) => {
        if (c === value) {
          return;
        }
        if (!c) {
          onChange("");
          return;
        }
        const color = theme.visualization.getColorByName(c);
        if (returnColorAs === "rgb") {
          onChange(colorManipulator.asRgbString(color));
        } else {
          onChange(colorManipulator.asHexString(color));
        }
      },
      500,
      [currentColor]
    );
    return /* @__PURE__ */ React__default.createElement(ClickOutsideWrapper, { onClick: () => setIsOpen(false) }, /* @__PURE__ */ React__default.createElement("div", { className: styles.wrapper }, isOpen && !inputProps.disabled && /* @__PURE__ */ React__default.createElement(
      RgbaStringColorPicker,
      {
        "data-testid": "color-popover",
        color: currentColor,
        onChange: setColor,
        className: cx(paletteStyles.root, styles.picker)
      }
    ), /* @__PURE__ */ React__default.createElement(
      ColorInput,
      __spreadProps(__spreadValues({}, inputProps), {
        theme,
        color: currentColor,
        onChange: setColor,
        buttonAriaLabel: "Open color picker",
        onClick: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
        ref,
        isClearable: true
      })
    )));
  }
);
ColorPickerInput.displayName = "ColorPickerInput";
const getStyles = (theme) => {
  return {
    wrapper: css({
      position: "relative"
    }),
    picker: css({
      "&.react-colorful": {
        position: "absolute",
        width: "100%",
        zIndex: 11,
        bottom: "36px"
      }
    }),
    inner: css({
      position: "absolute"
    })
  };
};

export { ColorPickerInput };
//# sourceMappingURL=ColorPickerInput.js.map
