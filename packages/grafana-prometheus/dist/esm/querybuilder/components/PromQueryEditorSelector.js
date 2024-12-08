import { map, isEqual } from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import { CoreApp, LoadingState } from '@grafana/data';
import { EditorHeader, FlexItem, EditorRows } from '@grafana/experimental';
import { reportInteraction } from '@grafana/runtime';
import { ConfirmModal, Button, Space } from '@grafana/ui';
import { QueryPatternsModal } from '../QueryPatternsModal.js';
import { useFlag, promQueryEditorExplainKey } from '../hooks/useFlag.js';
import { buildVisualQueryFromString } from '../parsing.js';
import { QueryEditorModeToggle } from '../shared/QueryEditorModeToggle.js';
import { QueryHeaderSwitch } from '../shared/QueryHeaderSwitch.js';
import { QueryEditorMode } from '../shared/types.js';
import { getQueryWithDefaults, changeEditorMode } from '../state.js';
import { PromQueryBuilderContainer } from './PromQueryBuilderContainer.js';
import { PromQueryBuilderOptions } from './PromQueryBuilderOptions.js';
import { PromQueryCodeEditor } from './PromQueryCodeEditor.js';
import { PromQueryCodeEditorAutocompleteInfo } from './PromQueryCodeEditorAutocompleteInfo.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

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
const FORMAT_OPTIONS = [
  { label: "Time series", value: "time_series" },
  { label: "Table", value: "table" },
  { label: "Heatmap", value: "heatmap" }
];
const INTERVAL_FACTOR_OPTIONS = map([1, 2, 3, 4, 5, 10], (value) => ({
  value,
  label: "1/" + value
}));
const PromQueryEditorSelector = React.memo((props) => {
  const {
    onChange,
    onRunQuery,
    data,
    app,
    onAddQuery,
    datasource: { defaultEditor },
    queries
  } = props;
  const [parseModalOpen, setParseModalOpen] = useState(false);
  const [queryPatternsModalOpen, setQueryPatternsModalOpen] = useState(false);
  const [dataIsStale, setDataIsStale] = useState(false);
  const { flag: explain, setFlag: setExplain } = useFlag(promQueryEditorExplainKey);
  const query = getQueryWithDefaults(props.query, app, defaultEditor);
  const editorMode = query.editorMode;
  const onEditorModeChange = useCallback(
    (newMetricEditorMode) => {
      var _a;
      reportInteraction("user_grafana_prometheus_editor_mode_clicked", {
        newEditor: newMetricEditorMode,
        previousEditor: (_a = query.editorMode) != null ? _a : "",
        newQuery: !query.expr,
        app: app != null ? app : ""
      });
      if (newMetricEditorMode === QueryEditorMode.Builder) {
        const result = buildVisualQueryFromString(query.expr || "");
        if (result.errors.length) {
          setParseModalOpen(true);
          return;
        }
      }
      changeEditorMode(query, newMetricEditorMode, onChange);
    },
    [onChange, query, app]
  );
  useEffect(() => {
    setDataIsStale(false);
  }, [data]);
  const onChangeInternal = (query2) => {
    if (!isEqual(query2, props.query)) {
      setDataIsStale(true);
    }
    onChange(query2);
  };
  const onShowExplainChange = (e) => {
    setExplain(e.currentTarget.checked);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    ConfirmModal,
    {
      isOpen: parseModalOpen,
      title: "Parsing error: Switch to the builder mode?",
      body: "There is a syntax error, or the query structure cannot be visualized when switching to the builder mode. Parts of the query may be lost. ",
      confirmText: "Continue",
      onConfirm: () => {
        changeEditorMode(query, QueryEditorMode.Builder, onChange);
        setParseModalOpen(false);
      },
      onDismiss: () => setParseModalOpen(false)
    }
  ), /* @__PURE__ */ React.createElement(
    QueryPatternsModal,
    {
      isOpen: queryPatternsModalOpen,
      onClose: () => setQueryPatternsModalOpen(false),
      query,
      queries,
      app,
      onChange,
      onAddQuery
    }
  ), /* @__PURE__ */ React.createElement(EditorHeader, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      "data-testid": selectors.components.QueryBuilder.queryPatterns,
      variant: "secondary",
      size: "sm",
      onClick: () => setQueryPatternsModalOpen((prevValue) => !prevValue)
    },
    "Kick start your query"
  ), /* @__PURE__ */ React.createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.explain }, /* @__PURE__ */ React.createElement(QueryHeaderSwitch, { label: "Explain", value: explain, onChange: onShowExplainChange })), /* @__PURE__ */ React.createElement(FlexItem, { grow: 1 }), app !== CoreApp.Explore && app !== CoreApp.Correlations && /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: dataIsStale ? "primary" : "secondary",
      size: "sm",
      onClick: onRunQuery,
      icon: (data == null ? void 0 : data.state) === LoadingState.Loading ? "spinner" : void 0,
      disabled: (data == null ? void 0 : data.state) === LoadingState.Loading
    },
    "Run queries"
  ), /* @__PURE__ */ React.createElement(PromQueryCodeEditorAutocompleteInfo, { datasourceUid: props.datasource.uid, editorMode }), /* @__PURE__ */ React.createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.editorToggle }, /* @__PURE__ */ React.createElement(QueryEditorModeToggle, { mode: editorMode, onChange: onEditorModeChange }))), /* @__PURE__ */ React.createElement(Space, { v: 0.5 }), /* @__PURE__ */ React.createElement(EditorRows, null, editorMode === QueryEditorMode.Code && /* @__PURE__ */ React.createElement(PromQueryCodeEditor, __spreadProps(__spreadValues({}, props), { query, showExplain: explain, onChange: onChangeInternal })), editorMode === QueryEditorMode.Builder && /* @__PURE__ */ React.createElement(
    PromQueryBuilderContainer,
    {
      query,
      datasource: props.datasource,
      onChange: onChangeInternal,
      onRunQuery: props.onRunQuery,
      data,
      showExplain: explain
    }
  ), /* @__PURE__ */ React.createElement(PromQueryBuilderOptions, { query, app: props.app, onChange, onRunQuery })));
});
PromQueryEditorSelector.displayName = "PromQueryEditorSelector";

export { FORMAT_OPTIONS, INTERVAL_FACTOR_OPTIONS, PromQueryEditorSelector };
//# sourceMappingURL=PromQueryEditorSelector.js.map
