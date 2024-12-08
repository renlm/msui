import { css } from '@emotion/css';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMountedState, usePrevious } from 'react-use';
import { useStyles2, Stack, Cascader, Button } from '@grafana/ui';
import { OperationEditor } from './OperationEditor.js';

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
function OperationList({
  query,
  datasource,
  queryModeller,
  onChange,
  onRunQuery,
  highlightedOp,
  timeRange
}) {
  const styles = useStyles2(getStyles);
  const { operations } = query;
  const opsToHighlight = useOperationsHighlight(operations);
  const [cascaderOpen, setCascaderOpen] = useState(false);
  const onOperationChange = (index, update) => {
    const updatedList = [...operations];
    updatedList.splice(index, 1, update);
    onChange(__spreadProps(__spreadValues({}, query), { operations: updatedList }));
  };
  const onRemove = (index) => {
    const updatedList = [...operations.slice(0, index), ...operations.slice(index + 1)];
    onChange(__spreadProps(__spreadValues({}, query), { operations: updatedList }));
  };
  const addOptions = queryModeller.getCategories().map((category) => {
    return {
      value: category,
      label: category,
      items: queryModeller.getOperationsForCategory(category).map((operation) => ({
        value: operation.id,
        label: operation.name,
        isLeaf: true
      }))
    };
  });
  const onAddOperation = (value) => {
    const operationDef = queryModeller.getOperationDef(value);
    if (!operationDef) {
      return;
    }
    onChange(operationDef.addOperationHandler(operationDef, query, queryModeller));
    setCascaderOpen(false);
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedList = [...operations];
    const element = updatedList[result.source.index];
    updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, element);
    onChange(__spreadProps(__spreadValues({}, query), { operations: updatedList }));
  };
  const onCascaderBlur = () => {
    setCascaderOpen(false);
  };
  return /* @__PURE__ */ React.createElement(Stack, { gap: 1, direction: "column" }, /* @__PURE__ */ React.createElement(Stack, { gap: 1 }, operations.length > 0 && /* @__PURE__ */ React.createElement(DragDropContext, { onDragEnd }, /* @__PURE__ */ React.createElement(Droppable, { droppableId: "sortable-field-mappings", direction: "horizontal" }, (provided) => /* @__PURE__ */ React.createElement("div", __spreadValues({ className: styles.operationList, ref: provided.innerRef }, provided.droppableProps), operations.map((op, index) => {
    return /* @__PURE__ */ React.createElement(
      OperationEditor,
      {
        key: op.id + JSON.stringify(op.params) + index,
        queryModeller,
        index,
        operation: op,
        query,
        datasource,
        onChange: onOperationChange,
        onRemove,
        onRunQuery,
        flash: opsToHighlight[index],
        highlight: highlightedOp === op,
        timeRange
      }
    );
  }), provided.placeholder))), /* @__PURE__ */ React.createElement("div", { className: styles.addButton }, cascaderOpen ? /* @__PURE__ */ React.createElement(
    Cascader,
    {
      options: addOptions,
      onSelect: onAddOperation,
      onBlur: onCascaderBlur,
      autoFocus: true,
      alwaysOpen: true,
      hideActiveLevelLabel: true,
      placeholder: "Search"
    }
  ) : /* @__PURE__ */ React.createElement(Button, { icon: "plus", variant: "secondary", onClick: () => setCascaderOpen(true), title: "Add operation" }, "Operations"))));
}
function useOperationsHighlight(operations) {
  const isMounted = useMountedState();
  const prevOperations = usePrevious(operations);
  if (!isMounted()) {
    return operations.map(() => false);
  }
  if (!prevOperations) {
    return operations.map(() => true);
  }
  let newOps = [];
  if (prevOperations.length - 1 === operations.length && operations.every((op) => prevOperations.includes(op))) {
    return operations.map(() => false);
  }
  if (prevOperations.length + 1 === operations.length && prevOperations.every((op) => operations.includes(op))) {
    const newOp = operations.find((op) => !prevOperations.includes(op));
    newOps = operations.map((op) => {
      return op === newOp;
    });
  } else {
    newOps = operations.map((op, index) => {
      var _a;
      return !isSameOp(op.id, (_a = prevOperations[index]) == null ? void 0 : _a.id);
    });
  }
  return newOps;
}
function isSameOp(op1, op2) {
  return op1 === op2 || `__${op1}_by` === op2 || op1 === `__${op2}_by`;
}
const getStyles = (theme) => {
  return {
    heading: css({
      label: "heading",
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: 0
    }),
    operationList: css({
      label: "operationList",
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(2)
    }),
    addButton: css({
      label: "addButton",
      width: 126,
      paddingBottom: theme.spacing(1)
    })
  };
};

export { OperationList };
//# sourceMappingURL=OperationList.js.map
