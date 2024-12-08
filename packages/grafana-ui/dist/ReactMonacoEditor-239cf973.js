'use strict';

var Editor = require('@monaco-editor/react');
var monaco = require('monaco-editor');
var React = require('react');
require('@grafana/data');
var index = require('./index.js');
require('micro-memoize');
require('@emotion/react');
var tinycolor = require('tinycolor2');
require('@emotion/css');
require('classnames');
require('react-inlinesvg');
require('hoist-non-react-statics');
require('@floating-ui/react');
require('@grafana/e2e-selectors');
require('react-dom');
require('lodash');
require('slate');
require('ansicolor');
require('react-select');
require('react-select/async');
require('react-select/creatable');
require('react-custom-scrollbars-2');
require('i18next');
require('react-i18next');
require('react-transition-group');
require('rc-cascader');
require('react-use/lib/useMeasure');
require('react-select/async-creatable');
require('react-window');
require('react-dom/server');
require('@react-aria/focus');
require('react-colorful');
require('react-use');
require('date-fns');
require('@react-aria/dialog');
require('@react-aria/overlays');
require('react-calendar');
require('uuid');
require('rc-time-picker');
require('rc-time-picker/assets/index.css');
require('react-table');
require('react-loading-skeleton');
require('react-hook-form');
require('slate-plain-serializer');
require('slate-react');
require('is-hotkey');
require('prismjs');
require('immutable');
require('calculate-size');
require('react-highlight-words');
require('react-router-dom');
require('rxjs');
require('rxjs/operators');
require('@grafana/schema');
require('uplot');
require('uplot/dist/uPlot.min.css');
require('jquery');
require('react-use/lib/usePrevious');
require('react-use/lib/useClickAway');
require('@grafana/faro-web-sdk');
require('rc-drawer');
require('rc-drawer/assets/index.css');
require('rc-slider');
require('rc-slider/assets/index.css');
require('rc-tooltip');
require('react-dropzone');
require('ol/format/WKT');
require('ol/geom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Editor__default = /*#__PURE__*/_interopDefaultLegacy(Editor);
var monaco__namespace = /*#__PURE__*/_interopNamespace(monaco);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var tinycolor__default = /*#__PURE__*/_interopDefaultLegacy(tinycolor);

function getColors(theme) {
  if (theme === void 0) {
    return {};
  } else {
    const colors = {
      "editor.background": theme.components.input.background,
      "minimap.background": theme.colors.background.secondary
    };
    Object.keys(colors).forEach((resultKey) => {
      colors[resultKey] = normalizeColorForMonaco(colors[resultKey]);
    });
    return colors;
  }
}
function normalizeColorForMonaco(color) {
  return tinycolor__default["default"](color).toHexString();
}
function defineThemes(monaco, theme) {
  const colors = getColors(theme);
  monaco.editor.defineTheme("grafana-dark", {
    base: "vs-dark",
    inherit: true,
    colors,
    // fallback syntax highlighting for languages that microsoft doesn't handle (ex cloudwatch's metric math)
    rules: [
      { token: "predefined", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("purple")) },
      { token: "operator", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("orange")) },
      { token: "tag", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("green")) }
    ]
  });
  monaco.editor.defineTheme("grafana-light", {
    base: "vs",
    inherit: true,
    colors,
    // fallback syntax highlighting for languages that microsoft doesn't handle (ex cloudwatch's metric math)
    rules: [
      { token: "predefined", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("purple")) },
      { token: "operator", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("orange")) },
      { token: "tag", foreground: normalizeColorForMonaco(theme == null ? void 0 : theme.visualization.getColorByName("green")) }
    ]
  });
}

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
Editor.loader.config({ monaco: monaco__namespace });
const ReactMonacoEditor = (props) => {
  const { beforeMount } = props;
  const theme = index.useTheme2();
  const onMonacoBeforeMount = React.useCallback(
    (monaco2) => {
      defineThemes(monaco2, theme);
      beforeMount == null ? void 0 : beforeMount(monaco2);
    },
    [beforeMount, theme]
  );
  return /* @__PURE__ */ React__default["default"].createElement(Editor__default["default"], __spreadProps(__spreadValues({}, props), { theme: theme.isDark ? "grafana-dark" : "grafana-light", beforeMount: onMonacoBeforeMount }));
};

exports.ReactMonacoEditor = ReactMonacoEditor;
//# sourceMappingURL=ReactMonacoEditor-239cf973.js.map
