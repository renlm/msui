import { css } from '@emotion/css';
import React from 'react';
import { toOption } from '@grafana/data';
import { FlexItem, EditorRows } from '@grafana/experimental';
import { useStyles2, Select, AutoSizeInput, IconButton } from '@grafana/ui';
import { binaryScalarDefs } from '../binaryScalarOperations.js';
import { PromQueryBuilder } from './PromQueryBuilder.js';

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
const NestedQuery = React.memo((props) => {
  const { nestedQuery, index, datasource, onChange, onRemove, onRunQuery, showExplain } = props;
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement("div", { className: styles.card }, /* @__PURE__ */ React.createElement("div", { className: styles.header }, /* @__PURE__ */ React.createElement("div", { className: styles.name }, "Operator"), /* @__PURE__ */ React.createElement(
    Select,
    {
      width: "auto",
      options: operators,
      value: toOption(nestedQuery.operator),
      onChange: (value) => {
        onChange(index, __spreadProps(__spreadValues({}, nestedQuery), {
          operator: value.value
        }));
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: styles.name }, "Vector matches"), /* @__PURE__ */ React.createElement("div", { className: styles.vectorMatchWrapper }, /* @__PURE__ */ React.createElement(
    Select,
    {
      width: "auto",
      value: nestedQuery.vectorMatchesType || "on",
      allowCustomValue: true,
      options: [
        { value: "on", label: "on" },
        { value: "ignoring", label: "ignoring" }
      ],
      onChange: (val) => {
        onChange(index, __spreadProps(__spreadValues({}, nestedQuery), {
          vectorMatchesType: val.value
        }));
      }
    }
  ), /* @__PURE__ */ React.createElement(
    AutoSizeInput,
    {
      className: styles.vectorMatchInput,
      minWidth: 20,
      defaultValue: nestedQuery.vectorMatches,
      onCommitChange: (evt) => {
        onChange(index, __spreadProps(__spreadValues({}, nestedQuery), {
          vectorMatches: evt.currentTarget.value,
          vectorMatchesType: nestedQuery.vectorMatchesType || "on"
        }));
      }
    }
  )), /* @__PURE__ */ React.createElement(FlexItem, { grow: 1 }), /* @__PURE__ */ React.createElement(IconButton, { name: "times", size: "sm", onClick: () => onRemove(index), tooltip: "Remove match" })), /* @__PURE__ */ React.createElement("div", { className: styles.body }, /* @__PURE__ */ React.createElement(EditorRows, null, /* @__PURE__ */ React.createElement(
    PromQueryBuilder,
    {
      showExplain,
      query: nestedQuery.query,
      datasource,
      onRunQuery,
      onChange: (update) => {
        onChange(index, __spreadProps(__spreadValues({}, nestedQuery), { query: update }));
      }
    }
  ))));
});
const operators = binaryScalarDefs.map((def) => ({ label: def.sign, value: def.sign }));
NestedQuery.displayName = "NestedQuery";
const getStyles = (theme) => {
  return {
    card: css({
      label: "card",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(0.5)
    }),
    header: css({
      label: "header",
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      gap: theme.spacing(1),
      display: "flex",
      alignItems: "center"
    }),
    name: css({
      label: "name",
      whiteSpace: "nowrap"
    }),
    body: css({
      label: "body",
      paddingLeft: theme.spacing(2)
    }),
    vectorMatchInput: css({
      label: "vectorMatchInput",
      marginLeft: -1
    }),
    vectorMatchWrapper: css({
      label: "vectorMatchWrapper",
      display: "flex"
    })
  };
};

export { NestedQuery };
//# sourceMappingURL=NestedQuery.js.map
