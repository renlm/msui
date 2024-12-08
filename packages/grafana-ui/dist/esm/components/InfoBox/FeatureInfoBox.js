import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { FeatureBadge } from '../FeatureBadge/FeatureBadge.js';
import { InfoBox } from './InfoBox.js';

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
const FeatureInfoBox = React__default.memo(
  React__default.forwardRef((_a, ref) => {
    var _b = _a, { title, featureState } = _b, otherProps = __objRest(_b, ["title", "featureState"]);
    const styles = useStyles2(getFeatureInfoBoxStyles);
    const titleEl = featureState ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: styles.badge }, /* @__PURE__ */ React__default.createElement(FeatureBadge, { featureState })), /* @__PURE__ */ React__default.createElement("h3", null, title)) : /* @__PURE__ */ React__default.createElement("h3", null, title);
    return /* @__PURE__ */ React__default.createElement(InfoBox, __spreadValues({ branded: true, title: titleEl, urlTitle: "Read documentation", ref }, otherProps));
  })
);
FeatureInfoBox.displayName = "FeatureInfoBox";
const getFeatureInfoBoxStyles = (theme) => {
  return {
    badge: css({
      marginBottom: theme.spacing(1)
    })
  };
};

export { FeatureInfoBox };
//# sourceMappingURL=FeatureInfoBox.js.map
