import { css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { EditorRow } from '@grafana/experimental';
import { config } from '@grafana/runtime';
import { Drawer } from '@grafana/ui';
import { promqlGrammar } from '../../promql.js';
import { promQueryModeller } from '../PromQueryModeller.js';
import { buildVisualQueryFromString } from '../parsing.js';
import { OperationExplainedBox } from '../shared/OperationExplainedBox.js';
import { OperationList } from '../shared/OperationList.js';
import { OperationListExplained } from '../shared/OperationListExplained.js';
import { OperationsEditorRow } from '../shared/OperationsEditorRow.js';
import { QueryBuilderHints } from '../shared/QueryBuilderHints.js';
import { RawQuery } from '../shared/RawQuery.js';
import { MetricsLabelsSection } from './MetricsLabelsSection.js';
import { NestedQueryList } from './NestedQueryList.js';
import { EXPLAIN_LABEL_FILTER_CONTENT } from './PromQueryBuilderExplained.js';
import { PromQail } from './promQail/PromQail.js';
import { QueryAssistantButton } from './promQail/QueryAssistantButton.js';
import { isLLMPluginEnabled } from './promQail/state/helpers.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

const PromQueryBuilder = React.memo((props) => {
  const { datasource, query, onChange, onRunQuery, data, showExplain } = props;
  const [highlightedOp, setHighlightedOp] = useState();
  const [showDrawer, setShowDrawer] = useState(false);
  const [llmAppEnabled, updateLlmAppEnabled] = useState(false);
  const { prometheusPromQAIL } = config.featureToggles;
  const lang = { grammar: promqlGrammar, name: "promql" };
  const initHints = datasource.getInitHints();
  useEffect(() => {
    async function checkLlms() {
      const check = await isLLMPluginEnabled();
      updateLlmAppEnabled(check);
    }
    if (prometheusPromQAIL) {
      checkLlms();
    }
  }, [prometheusPromQAIL]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, prometheusPromQAIL && showDrawer && /* @__PURE__ */ React.createElement(Drawer, { closeOnMaskClick: false, onClose: () => setShowDrawer(false) }, /* @__PURE__ */ React.createElement(
    PromQail,
    {
      query,
      closeDrawer: () => setShowDrawer(false),
      onChange,
      datasource
    }
  )), /* @__PURE__ */ React.createElement(EditorRow, null, /* @__PURE__ */ React.createElement(MetricsLabelsSection, { query, onChange, datasource })), initHints.length ? /* @__PURE__ */ React.createElement("div", { className: "query-row-break" }, /* @__PURE__ */ React.createElement("div", { className: "prom-query-field-info text-warning" }, initHints[0].label, " ", initHints[0].fix ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "text-warning" }, initHints[0].fix.label) : null)) : null, showExplain && /* @__PURE__ */ React.createElement(
    OperationExplainedBox,
    {
      stepNumber: 1,
      title: /* @__PURE__ */ React.createElement(RawQuery, { query: `${query.metric} ${promQueryModeller.renderLabels(query.labels)}`, lang })
    },
    EXPLAIN_LABEL_FILTER_CONTENT
  ), /* @__PURE__ */ React.createElement(OperationsEditorRow, null, /* @__PURE__ */ React.createElement(
    OperationList,
    {
      queryModeller: promQueryModeller,
      datasource,
      query,
      onChange,
      onRunQuery,
      highlightedOp
    }
  ), prometheusPromQAIL && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: css({
        padding: "0 0 0 6px"
      })
    },
    /* @__PURE__ */ React.createElement(QueryAssistantButton, { llmAppEnabled, metric: query.metric, setShowDrawer })
  ), /* @__PURE__ */ React.createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.hints }, /* @__PURE__ */ React.createElement(
    QueryBuilderHints,
    {
      datasource,
      query,
      onChange,
      data,
      queryModeller: promQueryModeller,
      buildVisualQueryFromString
    }
  ))), showExplain && /* @__PURE__ */ React.createElement(
    OperationListExplained,
    {
      lang,
      query,
      stepNumber: 2,
      queryModeller: promQueryModeller,
      onMouseEnter: (op) => setHighlightedOp(op),
      onMouseLeave: () => setHighlightedOp(void 0)
    }
  ), query.binaryQueries && query.binaryQueries.length > 0 && /* @__PURE__ */ React.createElement(
    NestedQueryList,
    {
      query,
      datasource,
      onChange,
      onRunQuery,
      showExplain
    }
  ));
});
PromQueryBuilder.displayName = "PromQueryBuilder";

export { PromQueryBuilder };
//# sourceMappingURL=PromQueryBuilder.js.map
