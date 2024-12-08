import i18next from 'i18next';
import React__default from 'react';
import { Trans as Trans$1, initReactI18next } from 'react-i18next';

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
function initI18n() {
  if (typeof i18next.options.resources !== "object") {
    i18next.use(initReactI18next).init({
      resources: {},
      returnEmptyString: false,
      lng: "en-US"
      // this should be the locale of the phrases in our source JSX
    });
  }
}
const Trans = (props) => {
  initI18n();
  return /* @__PURE__ */ React__default.createElement(Trans$1, __spreadValues({}, props));
};
const tFunc = i18next.t;
const t = (id, defaultMessage, values) => {
  initI18n();
  return tFunc(id, defaultMessage, values);
};

export { Trans, t };
//# sourceMappingURL=i18n.js.map
