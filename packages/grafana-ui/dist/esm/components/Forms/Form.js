import { css } from '@emotion/css';
import React__default, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
function Form(_a) {
  var _b = _a, {
    defaultValues,
    onSubmit,
    validateOnMount = false,
    validateFieldsOnMount,
    children,
    validateOn = "onSubmit",
    maxWidth = 600
  } = _b, htmlProps = __objRest(_b, [
    "defaultValues",
    "onSubmit",
    "validateOnMount",
    "validateFieldsOnMount",
    "children",
    "validateOn",
    "maxWidth"
  ]);
  const _a2 = useForm({
    mode: validateOn,
    defaultValues
  }), { handleSubmit, trigger, formState } = _a2, rest = __objRest(_a2, ["handleSubmit", "trigger", "formState"]);
  useEffect(() => {
    if (validateOnMount) {
      trigger(validateFieldsOnMount);
    }
  }, [trigger, validateFieldsOnMount, validateOnMount]);
  return /* @__PURE__ */ React__default.createElement(
    "form",
    __spreadValues({
      className: css({
        maxWidth: maxWidth !== "none" ? maxWidth + "px" : maxWidth,
        width: "100%"
      }),
      onSubmit: handleSubmit(onSubmit)
    }, htmlProps),
    children(__spreadValues({ errors: formState.errors, formState, trigger }, rest))
  );
}

export { Form };
//# sourceMappingURL=Form.js.map
