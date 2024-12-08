import { CoreApp } from '@grafana/data';
import store from '../gcopypaste/app/core/store.js';
import { LegendFormatMode } from '../types.js';
import { QueryEditorMode } from './shared/types.js';

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
const queryEditorModeDefaultLocalStorageKey = "PrometheusQueryEditorModeDefault";
function changeEditorMode(query, editorMode, onChange) {
  if (query.expr === "") {
    store.set(queryEditorModeDefaultLocalStorageKey, editorMode);
  }
  onChange(__spreadProps(__spreadValues({}, query), { editorMode }));
}
function getDefaultEditorMode(expr, defaultEditor = QueryEditorMode.Builder) {
  if (expr != null && expr !== "") {
    return QueryEditorMode.Code;
  }
  const value = store.get(queryEditorModeDefaultLocalStorageKey);
  switch (value) {
    case QueryEditorMode.Builder:
    case QueryEditorMode.Code:
      return value;
    default:
      return defaultEditor;
  }
}
function getQueryWithDefaults(query, app, defaultEditor) {
  let result = query;
  if (!query.editorMode) {
    result = __spreadProps(__spreadValues({}, query), { editorMode: getDefaultEditorMode(query.expr, defaultEditor) });
  }
  if (!query.expr) {
    result = __spreadProps(__spreadValues({}, result), { expr: "", legendFormat: LegendFormatMode.Auto });
  }
  if (query.range == null && query.instant == null) {
    result = __spreadProps(__spreadValues({}, result), { range: true });
    if (app === CoreApp.Explore) {
      result.instant = true;
    }
  }
  const isBothInstantAndRange = query.instant && query.range;
  if (app === CoreApp.UnifiedAlerting && isBothInstantAndRange) {
    result = __spreadProps(__spreadValues({}, result), { instant: false, range: true });
  }
  return result;
}

export { changeEditorMode, getQueryWithDefaults };
//# sourceMappingURL=state.js.map
