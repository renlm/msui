import { css } from '@emotion/css';
import { flip, shift, useFloating, autoUpdate, useClick, useDismiss, useInteractions } from '@floating-ui/react';
import React__default, { useState } from 'react';
import { dateTime } from '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { Input } from '../../Input/Input.js';
import { DatePicker } from '../DatePicker/DatePicker.js';

var __defProp = Object.defineProperty;
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
const formatDate = (date) => dateTime(date).format("L");
const DatePickerWithInput = (_a) => {
  var _b = _a, {
    value,
    minDate,
    maxDate,
    onChange,
    closeOnSelect,
    placeholder = "Date"
  } = _b, rest = __objRest(_b, [
    "value",
    "minDate",
    "maxDate",
    "onChange",
    "closeOnSelect",
    "placeholder"
  ]);
  const [open, setOpen] = useState(false);
  const styles = useStyles2(getStyles);
  const middleware = [
    flip({
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open,
    placement: "bottom-start",
    onOpenChange: setOpen,
    middleware,
    whileElementsMounted: autoUpdate,
    strategy: "fixed"
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement(
    Input,
    __spreadValues(__spreadValues({
      ref: refs.setReference,
      type: "text",
      autoComplete: "off",
      placeholder,
      value: value ? formatDate(value) : value,
      onChange: (ev) => {
        if (ev.target.value === "") {
          onChange("");
        }
      },
      className: styles.input
    }, rest), getReferenceProps())
  ), /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: styles.popover, ref: refs.setFloating, style: floatingStyles }, getFloatingProps()), /* @__PURE__ */ React__default.createElement(
    DatePicker,
    {
      isOpen: open,
      value: value && typeof value !== "string" ? value : dateTime().toDate(),
      minDate,
      maxDate,
      onChange: (ev) => {
        onChange(ev);
        if (closeOnSelect) {
          setOpen(false);
        }
      },
      onClose: () => setOpen(false)
    }
  )));
};
const getStyles = (theme) => {
  return {
    container: css({
      position: "relative"
    }),
    input: css({
      /* hides the native Calendar picker icon given when using type=date */
      "input[type='date']::-webkit-inner-spin-button, input[type='date']::-webkit-calendar-picker-indicator": {
        display: "none",
        WebkitAppearance: "none"
      }
    }),
    popover: css({
      zIndex: theme.zIndex.tooltip
    })
  };
};

export { DatePickerWithInput, formatDate };
//# sourceMappingURL=DatePickerWithInput.js.map
