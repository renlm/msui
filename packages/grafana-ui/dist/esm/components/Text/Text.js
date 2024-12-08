import { css } from '@emotion/css';
import React__default, { createElement } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { TruncatedText } from './TruncatedText.js';
import { customVariant, customColor, customWeight } from './utils.js';

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
const Text = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, { element = "span", variant, weight, color, truncate, italic, textAlignment, children, tabular } = _b, restProps = __objRest(_b, ["element", "variant", "weight", "color", "truncate", "italic", "textAlignment", "children", "tabular"]);
    const styles = useStyles2(getTextStyles, element, variant, color, weight, truncate, italic, textAlignment, tabular);
    const childElement = (ref2) => {
      return createElement(
        element,
        __spreadProps(__spreadValues({}, restProps), {
          style: void 0,
          // Remove the style prop to avoid overriding the styles
          className: styles,
          // When overflowing, the internalRef is passed to the tooltip, which forwards it to the child element
          ref: ref2
        }),
        children
      );
    };
    if (!truncate || element === "span") {
      return childElement(void 0);
    }
    return /* @__PURE__ */ React__default.createElement(
      TruncatedText,
      {
        childElement,
        children,
        ref
      }
    );
  }
);
Text.displayName = "Text";
const getTextStyles = (theme, element, variant, color, weight, truncate, italic, textAlignment, tabular) => {
  return css([
    __spreadValues({
      margin: 0,
      padding: 0
    }, customVariant(theme, element, variant)),
    variant && __spreadValues({}, theme.typography[variant]),
    color && {
      color: customColor(color, theme)
    },
    weight && {
      fontWeight: customWeight(weight, theme)
    },
    truncate && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    italic && {
      fontStyle: "italic"
    },
    textAlignment && {
      textAlign: textAlignment
    },
    tabular && {
      fontFeatureSettings: '"tnum"'
    }
  ]);
};

export { Text };
//# sourceMappingURL=Text.js.map
