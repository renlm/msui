import { cx, css } from '@emotion/css';
import React, { useId, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useStyles2, Tooltip, Icon, Stack, Button } from '@grafana/ui';
import { getOperationParamId } from '../operationUtils.js';
import { OperationHeader } from './OperationHeader.js';
import { getOperationParamEditor } from './OperationParamEditor.js';

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
function OperationEditor({
  operation,
  index,
  onRemove,
  onChange,
  onRunQuery,
  queryModeller,
  query,
  datasource,
  flash,
  highlight,
  timeRange
}) {
  const styles = useStyles2(getStyles);
  const def = queryModeller.getOperationDef(operation.id);
  const shouldFlash = useFlash(flash);
  const id = useId();
  if (!def) {
    return /* @__PURE__ */ React.createElement("span", null, "Operation ", operation.id, " not found");
  }
  const onParamValueChanged = (paramIdx, value) => {
    const update = __spreadProps(__spreadValues({}, operation), { params: [...operation.params] });
    update.params[paramIdx] = value;
    callParamChangedThenOnChange(def, update, index, paramIdx, onChange);
  };
  const onAddRestParam = () => {
    const update = __spreadProps(__spreadValues({}, operation), { params: [...operation.params, ""] });
    callParamChangedThenOnChange(def, update, index, operation.params.length, onChange);
  };
  const onRemoveRestParam = (paramIdx) => {
    const update = __spreadProps(__spreadValues({}, operation), {
      params: [...operation.params.slice(0, paramIdx), ...operation.params.slice(paramIdx + 1)]
    });
    callParamChangedThenOnChange(def, update, index, paramIdx, onChange);
  };
  const operationElements = [];
  for (let paramIndex = 0; paramIndex < operation.params.length; paramIndex++) {
    const paramDef = def.params[Math.min(def.params.length - 1, paramIndex)];
    const Editor = getOperationParamEditor(paramDef);
    operationElements.push(
      /* @__PURE__ */ React.createElement("div", { className: styles.paramRow, key: `${paramIndex}-1` }, !paramDef.hideName && /* @__PURE__ */ React.createElement("div", { className: styles.paramName }, /* @__PURE__ */ React.createElement("label", { htmlFor: getOperationParamId(id, paramIndex) }, paramDef.name), paramDef.description && /* @__PURE__ */ React.createElement(Tooltip, { placement: "top", content: paramDef.description, theme: "info" }, /* @__PURE__ */ React.createElement(Icon, { name: "info-circle", size: "sm", className: styles.infoIcon }))), /* @__PURE__ */ React.createElement("div", { className: styles.paramValue }, /* @__PURE__ */ React.createElement(Stack, { gap: 0.5, direction: "row", alignItems: "center" }, /* @__PURE__ */ React.createElement(
        Editor,
        {
          index: paramIndex,
          paramDef,
          value: operation.params[paramIndex],
          operation,
          operationId: id,
          onChange: onParamValueChanged,
          onRunQuery,
          query,
          datasource,
          timeRange
        }
      ), paramDef.restParam && (operation.params.length > def.params.length || paramDef.optional) && /* @__PURE__ */ React.createElement(
        Button,
        {
          "data-testid": `operations.${index}.remove-rest-param`,
          size: "sm",
          fill: "text",
          icon: "times",
          variant: "secondary",
          title: `Remove ${paramDef.name}`,
          onClick: () => onRemoveRestParam(paramIndex)
        }
      ))))
    );
  }
  let restParam;
  if (def.params.length > 0) {
    const lastParamDef = def.params[def.params.length - 1];
    if (lastParamDef.restParam) {
      restParam = renderAddRestParamButton(lastParamDef, onAddRestParam, index, operation.params.length, styles);
    }
  }
  return /* @__PURE__ */ React.createElement(Draggable, { draggableId: `operation-${index}`, index }, (provided) => /* @__PURE__ */ React.createElement(
    "div",
    __spreadProps(__spreadValues({
      className: cx(styles.card, (shouldFlash || highlight) && styles.cardHighlight),
      ref: provided.innerRef
    }, provided.draggableProps), {
      "data-testid": `operations.${index}.wrapper`
    }),
    /* @__PURE__ */ React.createElement(
      OperationHeader,
      {
        operation,
        dragHandleProps: provided.dragHandleProps,
        def,
        index,
        onChange,
        onRemove,
        queryModeller
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: styles.body }, operationElements),
    restParam,
    index < query.operations.length - 1 && /* @__PURE__ */ React.createElement("div", { className: styles.arrow }, /* @__PURE__ */ React.createElement("div", { className: styles.arrowLine }), /* @__PURE__ */ React.createElement("div", { className: styles.arrowArrow }))
  ));
}
function useFlash(flash) {
  const [keepFlash, setKeepFlash] = useState(true);
  useEffect(() => {
    let t;
    if (flash) {
      t = setTimeout(() => {
        setKeepFlash(false);
      }, 1e3);
    } else {
      setKeepFlash(true);
    }
    return () => clearTimeout(t);
  }, [flash]);
  return keepFlash && flash;
}
function renderAddRestParamButton(paramDef, onAddRestParam, operationIndex, paramIndex, styles) {
  return /* @__PURE__ */ React.createElement("div", { className: styles.restParam, key: `${paramIndex}-2` }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      icon: "plus",
      title: `Add ${paramDef.name}`.trimEnd(),
      variant: "secondary",
      onClick: onAddRestParam,
      "data-testid": `operations.${operationIndex}.add-rest-param`
    },
    paramDef.name
  ));
}
function callParamChangedThenOnChange(def, operation, operationIndex, paramIndex, onChange) {
  if (def.paramChangedHandler) {
    onChange(operationIndex, def.paramChangedHandler(paramIndex, operation, def));
  } else {
    onChange(operationIndex, operation);
  }
}
const getStyles = (theme) => {
  return {
    cardWrapper: css({
      alignItems: "stretch"
    }),
    error: css({
      marginBottom: theme.spacing(1)
    }),
    card: css({
      background: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.medium}`,
      cursor: "grab",
      borderRadius: theme.shape.radius.default,
      marginBottom: theme.spacing(1),
      position: "relative",
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: "all 0.5s ease-in 0s"
      },
      height: "100%"
    }),
    cardError: css({
      boxShadow: `0px 0px 4px 0px ${theme.colors.warning.main}`,
      border: `1px solid ${theme.colors.warning.main}`
    }),
    cardHighlight: css({
      boxShadow: `0px 0px 4px 0px ${theme.colors.primary.border}`,
      border: `1px solid ${theme.colors.primary.border}`
    }),
    infoIcon: css({
      marginLeft: theme.spacing(0.5),
      color: theme.colors.text.secondary,
      ":hover": {
        color: theme.colors.text.primary
      }
    }),
    body: css({
      margin: theme.spacing(1, 1, 0.5, 1),
      display: "table"
    }),
    paramRow: css({
      label: "paramRow",
      display: "table-row",
      verticalAlign: "middle"
    }),
    paramName: css({
      display: "table-cell",
      padding: theme.spacing(0, 1, 0, 0),
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      verticalAlign: "middle",
      height: "32px"
    }),
    paramValue: css({
      label: "paramValue",
      display: "table-cell",
      verticalAlign: "middle"
    }),
    restParam: css({
      padding: theme.spacing(0, 1, 1, 1)
    }),
    arrow: css({
      position: "absolute",
      top: "0",
      right: "-18px",
      display: "flex"
    }),
    arrowLine: css({
      height: "2px",
      width: "8px",
      backgroundColor: theme.colors.border.strong,
      position: "relative",
      top: "14px"
    }),
    arrowArrow: css({
      width: 0,
      height: 0,
      borderTop: `5px solid transparent`,
      borderBottom: `5px solid transparent`,
      borderLeft: `7px solid ${theme.colors.border.strong}`,
      position: "relative",
      top: "10px"
    })
  };
};

export { OperationEditor };
//# sourceMappingURL=OperationEditor.js.map
