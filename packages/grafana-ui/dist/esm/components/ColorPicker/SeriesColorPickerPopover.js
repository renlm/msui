import React__default from 'react';
import '@grafana/data';
import { withTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { InlineField } from '../Forms/InlineField.js';
import { InlineSwitch } from '../Switch/Switch.js';
import { ColorPickerPopover } from './ColorPickerPopover.js';

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
const SeriesColorPickerPopover = (props) => {
  const _a = props, { yaxis, onToggleAxis, color } = _a, colorPickerProps = __objRest(_a, ["yaxis", "onToggleAxis", "color"]);
  const customPickers = onToggleAxis ? {
    yaxis: {
      name: "Y-Axis",
      tabComponent() {
        return /* @__PURE__ */ React__default.createElement(InlineField, { labelWidth: 20, label: "Use right y-axis" }, /* @__PURE__ */ React__default.createElement(InlineSwitch, { value: yaxis === 2, label: "Use right y-axis", onChange: onToggleAxis }));
      }
    }
  } : void 0;
  return /* @__PURE__ */ React__default.createElement(ColorPickerPopover, __spreadProps(__spreadValues({}, colorPickerProps), { color: color || "#000000", customPickers }));
};
const SeriesColorPickerPopoverWithTheme = withTheme2(SeriesColorPickerPopover);

export { SeriesColorPickerPopover, SeriesColorPickerPopoverWithTheme };
//# sourceMappingURL=SeriesColorPickerPopover.js.map
