import React from 'react';
import { Stack } from '@grafana/ui';
import { NestedQuery } from './NestedQuery.js';

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
function NestedQueryList(props) {
  var _a;
  const { query, datasource, onChange, onRunQuery, showExplain } = props;
  const nestedQueries = (_a = query.binaryQueries) != null ? _a : [];
  const onNestedQueryUpdate = (index, update) => {
    const updatedList = [...nestedQueries];
    updatedList.splice(index, 1, update);
    onChange(__spreadProps(__spreadValues({}, query), { binaryQueries: updatedList }));
  };
  const onRemove = (index) => {
    const updatedList = [...nestedQueries.slice(0, index), ...nestedQueries.slice(index + 1)];
    onChange(__spreadProps(__spreadValues({}, query), { binaryQueries: updatedList }));
  };
  return /* @__PURE__ */ React.createElement(Stack, { direction: "column", gap: 1 }, nestedQueries.map((nestedQuery, index) => /* @__PURE__ */ React.createElement(
    NestedQuery,
    {
      key: index.toString(),
      nestedQuery,
      index,
      onChange: onNestedQueryUpdate,
      datasource,
      onRemove,
      onRunQuery,
      showExplain
    }
  )));
}

export { NestedQueryList };
//# sourceMappingURL=NestedQueryList.js.map
