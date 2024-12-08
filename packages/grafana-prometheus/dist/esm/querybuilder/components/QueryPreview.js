import React from 'react';
import { EditorRow, EditorFieldGroup } from '@grafana/experimental';
import { promqlGrammar } from '../../promql.js';
import { RawQuery } from '../shared/RawQuery.js';

function QueryPreview({ query }) {
  if (!query) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(EditorRow, null, /* @__PURE__ */ React.createElement(EditorFieldGroup, null, /* @__PURE__ */ React.createElement(RawQuery, { query, lang: { grammar: promqlGrammar, name: "promql" } })));
}

export { QueryPreview };
//# sourceMappingURL=QueryPreview.js.map
