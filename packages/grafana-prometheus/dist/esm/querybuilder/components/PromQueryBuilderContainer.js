import { createSlice } from '@reduxjs/toolkit';
import React, { useReducer, useEffect } from 'react';
import { config } from '@grafana/runtime';
import { promQueryModeller } from '../PromQueryModeller.js';
import { buildVisualQueryFromString } from '../parsing.js';
import { PromQueryBuilder } from './PromQueryBuilder.js';
import { QueryPreview } from './QueryPreview.js';
import { getSettings } from './metrics-modal/state/state.js';

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
const prometheusMetricEncyclopedia = config.featureToggles.prometheusMetricEncyclopedia;
function PromQueryBuilderContainer(props) {
  const { query, onChange, onRunQuery, datasource, data, showExplain } = props;
  const [state, dispatch] = useReducer(stateSlice.reducer, { expr: query.expr });
  useEffect(() => {
    var _a, _b, _c, _d;
    dispatch(exprChanged(query.expr));
    if (prometheusMetricEncyclopedia) {
      dispatch(
        setMetricsModalSettings({
          useBackend: (_a = query.useBackend) != null ? _a : false,
          disableTextWrap: (_b = query.disableTextWrap) != null ? _b : false,
          fullMetaSearch: (_c = query.fullMetaSearch) != null ? _c : false,
          includeNullMetadata: (_d = query.includeNullMetadata) != null ? _d : true
        })
      );
    }
  }, [query]);
  useEffect(() => {
    datasource.languageProvider.start(data == null ? void 0 : data.timeRange);
  }, [data == null ? void 0 : data.timeRange, datasource.languageProvider]);
  const onVisQueryChange = (visQuery) => {
    const expr = promQueryModeller.renderQuery(visQuery);
    dispatch(visualQueryChange({ visQuery, expr }));
    if (prometheusMetricEncyclopedia) {
      const metricsModalSettings = getSettings(visQuery);
      onChange(__spreadValues(__spreadProps(__spreadValues({}, props.query), { expr }), metricsModalSettings));
    } else {
      onChange(__spreadProps(__spreadValues({}, props.query), { expr }));
    }
  };
  if (!state.visQuery) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    PromQueryBuilder,
    {
      query: state.visQuery,
      datasource,
      onChange: onVisQueryChange,
      onRunQuery,
      data,
      showExplain
    }
  ), /* @__PURE__ */ React.createElement(QueryPreview, { query: query.expr }));
}
const initialState = {
  expr: ""
};
const stateSlice = createSlice({
  name: "prom-builder-container",
  initialState,
  reducers: {
    visualQueryChange: (state, action) => {
      state.expr = action.payload.expr;
      state.visQuery = action.payload.visQuery;
    },
    exprChanged: (state, action) => {
      var _a;
      if (!state.visQuery || state.expr !== action.payload) {
        state.expr = action.payload;
        const parseResult = buildVisualQueryFromString((_a = action.payload) != null ? _a : "");
        state.visQuery = parseResult.query;
      }
    },
    setMetricsModalSettings: (state, action) => {
      if (state.visQuery && prometheusMetricEncyclopedia) {
        state.visQuery.useBackend = action.payload.useBackend;
        state.visQuery.disableTextWrap = action.payload.disableTextWrap;
        state.visQuery.fullMetaSearch = action.payload.fullMetaSearch;
        state.visQuery.includeNullMetadata = action.payload.includeNullMetadata;
      }
    }
  }
});
const { visualQueryChange, exprChanged, setMetricsModalSettings } = stateSlice.actions;

export { PromQueryBuilderContainer };
//# sourceMappingURL=PromQueryBuilderContainer.js.map
