import { useCallback } from 'react';
import { getFieldDisplayName } from '@grafana/data';

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
function useTableStateReducer({ onColumnResize, onSortByChange, data }) {
  return useCallback(
    (newState, action) => {
      switch (action.type) {
        case "columnDoneResizing":
          if (onColumnResize) {
            const info = newState.columnResizing.headerIdWidths[0];
            const columnIdString = info[0];
            const fieldIndex = parseInt(columnIdString, 10);
            const width = Math.round(newState.columnResizing.columnWidths[columnIdString]);
            const field = data.fields[fieldIndex];
            if (!field) {
              return newState;
            }
            const fieldDisplayName = getFieldDisplayName(field, data);
            onColumnResize(fieldDisplayName, width);
          }
        case "toggleSortBy":
          if (onSortByChange) {
            const sortByFields = [];
            for (const sortItem of newState.sortBy) {
              const field = data.fields[parseInt(sortItem.id, 10)];
              if (!field) {
                continue;
              }
              sortByFields.push({
                displayName: getFieldDisplayName(field, data),
                desc: sortItem.desc
              });
            }
            onSortByChange(sortByFields);
          }
        case "toggleRowExpanded": {
          if (action.id) {
            return __spreadProps(__spreadValues({}, newState), {
              lastExpandedOrCollapsedIndex: parseInt(action.id, 10)
            });
          }
        }
      }
      return newState;
    },
    [data, onColumnResize, onSortByChange]
  );
}
function getInitialState(initialSortBy, columns) {
  const state = {};
  if (initialSortBy) {
    state.sortBy = [];
    for (const sortBy of initialSortBy) {
      for (const col of columns) {
        if (col.Header === sortBy.displayName) {
          state.sortBy.push({ id: col.id, desc: sortBy.desc });
        }
      }
    }
  }
  return state;
}

export { getInitialState, useTableStateReducer };
//# sourceMappingURL=reducer.js.map
