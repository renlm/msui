import React, { memo } from 'react';
import { CoreApp } from '@grafana/data';
import { PromQueryEditorSelector } from '../querybuilder/components/PromQueryEditorSelector.js';
import { PromQueryEditorForAlerting } from './PromQueryEditorForAlerting.js';

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
function PromQueryEditorByAppBase(props) {
  const { app } = props;
  switch (app) {
    case CoreApp.CloudAlerting:
      return /* @__PURE__ */ React.createElement(PromQueryEditorForAlerting, __spreadValues({}, props));
    default:
      return /* @__PURE__ */ React.createElement(PromQueryEditorSelector, __spreadValues({}, props));
  }
}
const PromQueryEditorByApp = memo(PromQueryEditorByAppBase);

export { PromQueryEditorByApp };
//# sourceMappingURL=PromQueryEditorByApp.js.map
