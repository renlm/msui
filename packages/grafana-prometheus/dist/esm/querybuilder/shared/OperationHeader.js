import { css } from '@emotion/css';
import React, { useState } from 'react';
import { FlexItem } from '@grafana/experimental';
import { useStyles2, Button, Select } from '@grafana/ui';
import { OperationInfoButton } from './OperationInfoButton.js';

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
const OperationHeader = React.memo(
  ({ operation, def, index, onChange, onRemove, queryModeller, dragHandleProps }) => {
    var _a;
    const styles = useStyles2(getStyles);
    const [state, setState] = useState({});
    const onToggleSwitcher = () => {
      if (state.isOpen) {
        setState(__spreadProps(__spreadValues({}, state), { isOpen: false }));
      } else {
        const alternatives = queryModeller.getAlternativeOperations(def.alternativesKey).map((alt) => ({ label: alt.name, value: alt }));
        setState({ isOpen: true, alternatives });
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: styles.header }, !state.isOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", __spreadValues({}, dragHandleProps), (_a = def.name) != null ? _a : def.id), /* @__PURE__ */ React.createElement(FlexItem, { grow: 1 }), /* @__PURE__ */ React.createElement("div", { className: `${styles.operationHeaderButtons} operation-header-show-on-hover` }, /* @__PURE__ */ React.createElement(
      Button,
      {
        icon: "angle-down",
        size: "sm",
        onClick: onToggleSwitcher,
        fill: "text",
        variant: "secondary",
        title: "Click to view alternative operations"
      }
    ), /* @__PURE__ */ React.createElement(OperationInfoButton, { def, operation }), /* @__PURE__ */ React.createElement(
      Button,
      {
        icon: "times",
        size: "sm",
        onClick: () => onRemove(index),
        fill: "text",
        variant: "secondary",
        title: "Remove operation"
      }
    ))), state.isOpen && /* @__PURE__ */ React.createElement("div", { className: styles.selectWrapper }, /* @__PURE__ */ React.createElement(
      Select,
      {
        autoFocus: true,
        openMenuOnFocus: true,
        placeholder: "Replace with",
        options: state.alternatives,
        isOpen: true,
        onCloseMenu: onToggleSwitcher,
        onChange: (value) => {
          if (value.value) {
            const newDef = queryModeller.getOperationDef(value.value.id);
            const newParams = [...newDef.defaultParams];
            for (let i = 0; i < Math.min(operation.params.length, newParams.length); i++) {
              if (newDef.params[i].type === def.params[i].type) {
                newParams[i] = operation.params[i];
              }
            }
            const changedOp = __spreadProps(__spreadValues({}, operation), { params: newParams, id: value.value.id });
            onChange(index, def.changeTypeHandler ? def.changeTypeHandler(changedOp, newDef) : changedOp);
          }
        }
      }
    )));
  }
);
OperationHeader.displayName = "OperationHeader";
const getStyles = (theme) => {
  return {
    header: css({
      borderBottom: `1px solid ${theme.colors.border.medium}`,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      display: "flex",
      alignItems: "center"
    }),
    operationHeaderButtons: css({
      opacity: 1
    }),
    selectWrapper: css({
      paddingRight: theme.spacing(2)
    })
  };
};

export { OperationHeader };
//# sourceMappingURL=OperationHeader.js.map
