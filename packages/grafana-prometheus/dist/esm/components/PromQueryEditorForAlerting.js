import React from 'react';
import { PromQueryField } from './PromQueryField.js';

function PromQueryEditorForAlerting(props) {
  const { datasource, query, range, data, onChange, onRunQuery } = props;
  return /* @__PURE__ */ React.createElement(
    PromQueryField,
    {
      datasource,
      query,
      onRunQuery,
      onChange,
      history: [],
      range,
      data,
      "data-testid": alertingTestIds.editor
    }
  );
}
const alertingTestIds = {
  editor: "prom-editor-cloud-alerting"
};

export { PromQueryEditorForAlerting, alertingTestIds };
//# sourceMappingURL=PromQueryEditorForAlerting.js.map
