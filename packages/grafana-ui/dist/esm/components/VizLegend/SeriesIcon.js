import { cx, css } from '@emotion/css';
import React__default from 'react';
import { fieldColorModeRegistry } from '@grafana/data';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
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
const SeriesIcon = React__default.memo(
  React__default.forwardRef((_a, ref) => {
    var _b = _a, { color, className, gradient, lineStyle } = _b, restProps = __objRest(_b, ["color", "className", "gradient", "lineStyle"]);
    var _a2, _b2;
    const theme = useTheme2();
    const styles = useStyles2(getStyles);
    let cssColor;
    if (gradient) {
      const colors = (_b2 = (_a2 = fieldColorModeRegistry.get(gradient)).getColors) == null ? void 0 : _b2.call(_a2, theme);
      if (colors == null ? void 0 : colors.length) {
        cssColor = `linear-gradient(90deg, ${colors.join(", ")})`;
      } else {
        cssColor = theme.visualization.getColorByName("");
      }
    } else {
      cssColor = color;
    }
    let customStyle;
    if ((lineStyle == null ? void 0 : lineStyle.fill) === "dot" && !gradient) {
      customStyle = {
        backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 2px, transparent 0)`,
        backgroundSize: "4px 4px",
        backgroundRepeat: "space"
      };
    } else if ((lineStyle == null ? void 0 : lineStyle.fill) === "dash" && !gradient) {
      customStyle = {
        backgroundImage: `linear-gradient(to right, ${color} 100%, transparent 0%)`,
        backgroundSize: "6px 4px",
        backgroundRepeat: "space"
      };
    } else {
      customStyle = {
        background: cssColor,
        borderRadius: theme.shape.radius.pill
      };
    }
    return /* @__PURE__ */ React__default.createElement(
      "div",
      __spreadValues({
        "data-testid": "series-icon",
        ref,
        className: cx(className, styles.forcedColors, styles.container),
        style: customStyle
      }, restProps)
    );
  })
);
const getStyles = (theme) => ({
  container: css({
    marginRight: "8px",
    display: "inline-block",
    width: "14px",
    height: "4px"
  }),
  forcedColors: css({
    "@media (forced-colors: active)": {
      forcedColorAdjust: "none"
    }
  })
});
SeriesIcon.displayName = "SeriesIcon";

export { SeriesIcon };
//# sourceMappingURL=SeriesIcon.js.map
