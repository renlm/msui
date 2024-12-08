import React from 'react';
import { Stack } from '@grafana/ui';
import { promqlGrammar } from '../../promql.js';
import { promQueryModeller } from '../PromQueryModeller.js';
import { buildVisualQueryFromString } from '../parsing.js';
import { OperationExplainedBox } from '../shared/OperationExplainedBox.js';
import { OperationListExplained } from '../shared/OperationListExplained.js';
import { RawQuery } from '../shared/RawQuery.js';

const EXPLAIN_LABEL_FILTER_CONTENT = "Fetch all series matching metric name and label filters.";
const PromQueryBuilderExplained = React.memo(({ query }) => {
  const visQuery = buildVisualQueryFromString(query || "").query;
  const lang = { grammar: promqlGrammar, name: "promql" };
  return /* @__PURE__ */ React.createElement(Stack, { gap: 0.5, direction: "column" }, /* @__PURE__ */ React.createElement(
    OperationExplainedBox,
    {
      stepNumber: 1,
      title: /* @__PURE__ */ React.createElement(RawQuery, { query: `${visQuery.metric} ${promQueryModeller.renderLabels(visQuery.labels)}`, lang })
    },
    EXPLAIN_LABEL_FILTER_CONTENT
  ), /* @__PURE__ */ React.createElement(
    OperationListExplained,
    {
      stepNumber: 2,
      queryModeller: promQueryModeller,
      query: visQuery,
      lang
    }
  ));
});
PromQueryBuilderExplained.displayName = "PromQueryBuilderExplained";

export { EXPLAIN_LABEL_FILTER_CONTENT, PromQueryBuilderExplained };
//# sourceMappingURL=PromQueryBuilderExplained.js.map
