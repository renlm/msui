import { css } from '@emotion/css';
import React__default, { Component, createRef } from 'react';
import '@grafana/data';
import { withTheme2 } from '../../themes/ThemeContext.js';
import { stylesFactory } from '../../themes/stylesFactory.js';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { closePopover } from '../../utils/closePopover.js';
import { Popover } from '../Tooltip/Popover.js';
import { PopoverController } from '../Tooltip/PopoverController.js';
import { ColorPickerPopover } from './ColorPickerPopover.js';
import { ColorSwatch } from './ColorSwatch.js';
import { SeriesColorPickerPopover } from './SeriesColorPickerPopover.js';

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const colorPickerFactory = (popover, displayName = "ColorPicker") => {
  var _a;
  return _a = class extends Component {
    constructor() {
      super(...arguments);
      __publicField(this, "pickerTriggerRef", createRef());
    }
    render() {
      const { theme, children, onChange, color } = this.props;
      const styles = getStyles(theme);
      const popoverElement = React__default.createElement(popover, __spreadProps(__spreadValues({}, __spreadProps(__spreadValues({}, this.props), { children: null })), {
        onChange
      }));
      return /* @__PURE__ */ React__default.createElement(PopoverController, { content: popoverElement, hideAfter: 300 }, (showPopper, hidePopper, popperProps) => {
        return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, this.pickerTriggerRef.current && /* @__PURE__ */ React__default.createElement(
          Popover,
          __spreadProps(__spreadValues({}, popperProps), {
            referenceElement: this.pickerTriggerRef.current,
            wrapperClassName: styles.colorPicker,
            onMouseLeave: hidePopper,
            onMouseEnter: showPopper,
            onKeyDown: (event) => closePopover(event, hidePopper)
          })
        ), children ? children({
          ref: this.pickerTriggerRef,
          showColorPicker: showPopper,
          hideColorPicker: hidePopper
        }) : /* @__PURE__ */ React__default.createElement(
          ColorSwatch,
          {
            ref: this.pickerTriggerRef,
            onClick: showPopper,
            onMouseLeave: hidePopper,
            color: theme.visualization.getColorByName(color || "#000000"),
            "aria-label": color
          }
        ));
      });
    }
  }, __publicField(_a, "displayName", displayName), _a;
};
const ColorPicker = withTheme2(colorPickerFactory(ColorPickerPopover, "ColorPicker"));
const SeriesColorPicker = withTheme2(colorPickerFactory(SeriesColorPickerPopover, "SeriesColorPicker"));
const getStyles = stylesFactory((theme) => {
  return {
    colorPicker: css({
      position: "absolute",
      zIndex: theme.zIndex.tooltip,
      color: theme.colors.text.primary,
      maxWidth: "400px",
      fontSize: theme.typography.size.sm
    })
  };
});

export { ColorPicker, SeriesColorPicker, colorPickerFactory };
//# sourceMappingURL=ColorPicker.js.map
