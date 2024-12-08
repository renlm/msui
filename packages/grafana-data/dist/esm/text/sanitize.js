import { sanitizeUrl as sanitizeUrl$1 } from '@braintree/sanitize-url';
import DOMPurify from 'dompurify';
import * as xss from 'xss';

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
const XSSWL = Object.keys(xss.whiteList).reduce((acc, element) => {
  var _a;
  acc[element] = (_a = xss.whiteList[element]) == null ? void 0 : _a.concat(["class", "style"]);
  return acc;
}, {});
const sanitizeTextPanelWhitelist = new xss.FilterXSS({
  whiteList: XSSWL,
  css: {
    whiteList: __spreadProps(__spreadValues({}, xss.getDefaultCSSWhiteList()), {
      "flex-direction": true,
      "flex-wrap": true,
      "flex-basis": true,
      "flex-grow": true,
      "flex-shrink": true,
      "flex-flow": true,
      gap: true,
      order: true,
      "justify-content": true,
      "justify-items": true,
      "justify-self": true,
      "align-items": true,
      "align-content": true,
      "align-self": true
    })
  }
});
function sanitize(unsanitizedString) {
  try {
    return DOMPurify.sanitize(unsanitizedString, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ["form", "input"]
    });
  } catch (error) {
    console.error("String could not be sanitized", unsanitizedString);
    return escapeHtml(unsanitizedString);
  }
}
function sanitizeTrustedTypesRSS(unsanitizedString) {
  return DOMPurify.sanitize(unsanitizedString, {
    RETURN_TRUSTED_TYPE: true,
    ADD_ATTR: ["xmlns:atom", "version", "property", "content"],
    ADD_TAGS: ["rss", "meta", "channel", "title", "link", "description", "atom:link", "item", "pubDate", "guid"],
    PARSER_MEDIA_TYPE: "application/xhtml+xml"
  });
}
function sanitizeTrustedTypes(unsanitizedString) {
  return DOMPurify.sanitize(unsanitizedString, { RETURN_TRUSTED_TYPE: true });
}
function sanitizeTextPanelContent(unsanitizedString) {
  try {
    return sanitizeTextPanelWhitelist.process(unsanitizedString);
  } catch (error) {
    console.error("String could not be sanitized", unsanitizedString);
    return "Text string could not be sanitized";
  }
}
function sanitizeSVGContent(unsanitizedString) {
  return DOMPurify.sanitize(unsanitizedString, { USE_PROFILES: { svg: true, svgFilters: true } });
}
function sanitizeUrl(url) {
  return sanitizeUrl$1(url);
}
function hasAnsiCodes(input) {
  return /\u001b\[\d{1,2}m/.test(input);
}
function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

export { escapeHtml, hasAnsiCodes, sanitize, sanitizeSVGContent, sanitizeTextPanelContent, sanitizeTrustedTypes, sanitizeTrustedTypesRSS, sanitizeUrl };
//# sourceMappingURL=sanitize.js.map
