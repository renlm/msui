import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

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
const InlineSegmentGroup = (_a) => {
  var _b = _a, { children, className, grow } = _b, htmlProps = __objRest(_b, ["children", "className", "grow"]);
  const styles = useStyles2(getStyles, grow);
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: cx(styles.container, className) }, htmlProps), children);
};
InlineSegmentGroup.displayName = "InlineSegmentGroup";
const getStyles = (theme, grow) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      textAlign: "left",
      position: "relative",
      flex: `${grow ? 1 : 0} 0 auto`,
      marginBottom: theme.spacing(0.5)
    })
  };
};

export { InlineSegmentGroup };
//# sourceMappingURL=InlineSegmentGroup.js.map
