import { css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React, { useRef } from 'react';
import { useStyles2, Stack, Switch } from '@grafana/ui';

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
function QueryHeaderSwitch(_a) {
  var _b = _a, { label } = _b, inputProps = __objRest(_b, ["label"]);
  const dashedLabel = label.replace(" ", "-");
  const switchIdRef = useRef(uniqueId(`switch-${dashedLabel}`));
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement(Stack, { gap: 1 }, /* @__PURE__ */ React.createElement("label", { htmlFor: switchIdRef.current, className: styles.switchLabel }, label), /* @__PURE__ */ React.createElement(Switch, __spreadProps(__spreadValues({}, inputProps), { id: switchIdRef.current })));
}
const getStyles = (theme) => {
  return {
    switchLabel: css({
      color: theme.colors.text.secondary,
      cursor: "pointer",
      fontSize: theme.typography.bodySmall.fontSize,
      "&:hover": {
        color: theme.colors.text.primary
      }
    })
  };
};

export { QueryHeaderSwitch };
//# sourceMappingURL=QueryHeaderSwitch.js.map
