import React__default, { useRef } from 'react';
import { useTheme2 } from '../../themes/ThemeContext.js';
import { AsyncSelect, Select } from '../Select/Select.js';

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
function SegmentSelect(_a) {
  var _b = _a, {
    value,
    placeholder = "",
    options = [],
    onChange,
    onClickOutside,
    loadOptions = void 0,
    width: widthPixels,
    noOptionsMessage = "",
    allowCustomValue = false,
    allowEmptyValue = false
  } = _b, rest = __objRest(_b, [
    "value",
    "placeholder",
    "options",
    "onChange",
    "onClickOutside",
    "loadOptions",
    "width",
    "noOptionsMessage",
    "allowCustomValue",
    "allowEmptyValue"
  ]);
  const ref = useRef(null);
  const theme = useTheme2();
  let width = widthPixels > 0 ? widthPixels / theme.spacing.gridSize : void 0;
  let Component;
  let asyncOptions = {};
  if (loadOptions) {
    Component = AsyncSelect;
    asyncOptions = { loadOptions, defaultOptions: true };
  } else {
    Component = Select;
  }
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, rest), { ref }), /* @__PURE__ */ React__default.createElement(
    Component,
    __spreadValues({
      width,
      noOptionsMessage,
      placeholder,
      autoFocus: true,
      isOpen: true,
      onChange,
      options,
      value,
      closeMenuOnSelect: false,
      onCloseMenu: () => {
        if (ref && ref.current) {
          const input = ref.current.querySelector('input[id^="react-select-"]');
          if (input && (input.value || allowEmptyValue)) {
            onChange({ value: input.value, label: input.value });
          } else {
            onClickOutside();
          }
        }
      },
      allowCustomValue
    }, asyncOptions)
  ));
}

export { SegmentSelect };
//# sourceMappingURL=SegmentSelect.js.map
