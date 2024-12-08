import React from 'react';
import { Context } from './PluginContext.js';

var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
function PluginContextProvider(props) {
  const _a = props, { children } = _a, rest = __objRest(_a, ["children"]);
  return /* @__PURE__ */ React.createElement(Context.Provider, { value: rest }, children);
}

export { PluginContextProvider };
//# sourceMappingURL=PluginContextProvider.js.map
