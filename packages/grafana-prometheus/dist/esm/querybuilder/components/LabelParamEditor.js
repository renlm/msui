import React, { useState } from 'react';
import { toOption } from '@grafana/data';
import { Select } from '@grafana/ui';
import { promQueryModeller } from '../PromQueryModeller.js';
import { getOperationParamId } from '../operationUtils.js';

function LabelParamEditor({
  onChange,
  index,
  operationId,
  value,
  query,
  datasource
}) {
  const [state, setState] = useState({});
  return /* @__PURE__ */ React.createElement(
    Select,
    {
      inputId: getOperationParamId(operationId, index),
      autoFocus: value === "" ? true : void 0,
      openMenuOnFocus: true,
      onOpenMenu: async () => {
        setState({ isLoading: true });
        const options = await loadGroupByLabels(query, datasource);
        setState({ options, isLoading: void 0 });
      },
      isLoading: state.isLoading,
      allowCustomValue: true,
      noOptionsMessage: "No labels found",
      loadingMessage: "Loading labels",
      options: state.options,
      value: toOption(value),
      onChange: (value2) => onChange(index, value2.value)
    }
  );
}
async function loadGroupByLabels(query, datasource) {
  let labels = query.labels;
  if (datasource.type === "prometheus") {
    labels = [{ label: "__name__", op: "=", value: query.metric }, ...query.labels];
  }
  const expr = promQueryModeller.renderLabels(labels);
  const result = await datasource.languageProvider.fetchLabelsWithMatch(expr);
  return Object.keys(result).map((x) => ({
    label: x,
    value: x
  }));
}

export { LabelParamEditor };
//# sourceMappingURL=LabelParamEditor.js.map
