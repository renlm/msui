import { css } from '@emotion/css';
import React__default, { forwardRef } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { getResponsiveStyle } from '../utils/responsiveness.js';

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
const Grid = forwardRef((props, ref) => {
  const _a = props, { alignItems, children, gap, columns, minColumnWidth } = _a, rest = __objRest(_a, ["alignItems", "children", "gap", "columns", "minColumnWidth"]);
  const styles = useStyles2(getGridStyles, gap, columns, minColumnWidth, alignItems);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ ref }, rest), { className: styles.grid }), children);
});
Grid.displayName = "Grid";
const getGridStyles = (theme, gap, columns, minColumnWidth, alignItems) => {
  return {
    grid: css([
      { display: "grid" },
      getResponsiveStyle(theme, gap, (val) => ({
        gap: theme.spacing(val)
      })),
      minColumnWidth && getResponsiveStyle(theme, minColumnWidth, (val) => ({
        gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing(val)}, 1fr))`
      })),
      columns && getResponsiveStyle(theme, columns, (val) => ({
        gridTemplateColumns: `repeat(${val}, 1fr)`
      })),
      getResponsiveStyle(theme, alignItems, (val) => ({
        alignItems: val
      }))
    ])
  };
};

export { Grid };
//# sourceMappingURL=Grid.js.map
