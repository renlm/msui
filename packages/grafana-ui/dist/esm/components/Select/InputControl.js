import { cx, css } from '@emotion/css';
import React__default from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { inputPadding } from '../Forms/commonStyles.js';
import { getInputStyles } from '../Input/Input.js';

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
const InputControl = React__default.forwardRef(
  function InputControl2(_a, ref) {
    var _b = _a, { focused, invalid, disabled, children, innerProps, prefix } = _b; __objRest(_b, ["focused", "invalid", "disabled", "children", "innerProps", "prefix"]);
    const styles = useStyles2(getInputControlStyles, invalid, !!prefix);
    return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: styles.input }, innerProps), { ref }), prefix && /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.prefix) }, prefix), children);
  }
);
const getInputControlStyles = (theme, invalid, withPrefix) => {
  const styles = getInputStyles({ theme, invalid });
  return {
    input: cx(
      inputPadding(theme),
      css({
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingRight: 0,
        position: "relative",
        boxSizing: "border-box"
      }),
      withPrefix && css({
        paddingLeft: 0
      })
    ),
    prefix: cx(
      styles.prefix,
      css({
        position: "relative"
      })
    )
  };
};

export { InputControl };
//# sourceMappingURL=InputControl.js.map
