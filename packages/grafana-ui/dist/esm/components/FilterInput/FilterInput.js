import React__default from 'react';
import { unEscapeStringFromRegex, escapeStringForRegex } from '@grafana/data';
import { useCombinedRefs } from '../../utils/useCombinedRefs.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Icon } from '../Icon/Icon.js';
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
const FilterInput = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { value, width, onChange, escapeRegex = true } = _b, restProps = __objRest(_b, ["value", "width", "onChange", "escapeRegex"]);
    const innerRef = React__default.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const suffix = value !== "" ? /* @__PURE__ */ React__default.createElement(
      Button,
      {
        icon: "times",
        fill: "text",
        size: "sm",
        onClick: (e) => {
          var _a2;
          (_a2 = innerRef.current) == null ? void 0 : _a2.focus();
          onChange("");
          e.stopPropagation();
        }
      },
      "Clear"
    ) : null;
    return /* @__PURE__ */ React__default.createElement(
      Input,
      __spreadProps(__spreadValues({
        prefix: /* @__PURE__ */ React__default.createElement(Icon, { name: "search" }),
        suffix,
        width,
        type: "text",
        value: escapeRegex ? unEscapeStringFromRegex(value != null ? value : "") : value,
        onChange: (event) => onChange(escapeRegex ? escapeStringForRegex(event.currentTarget.value) : event.currentTarget.value)
      }, restProps), {
        ref: combinedRef
      })
    );
  }
);
FilterInput.displayName = "FilterInput";

export { FilterInput };
//# sourceMappingURL=FilterInput.js.map
