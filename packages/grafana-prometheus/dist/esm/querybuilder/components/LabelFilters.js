import { cx, css } from '@emotion/css';
import { isEqual } from 'lodash';
import React, { useState, useEffect } from 'react';
import { EditorFieldGroup, EditorField, EditorList } from '@grafana/experimental';
import { InlineFieldRow, InlineLabel } from '@grafana/ui';
import { LabelFilterItem } from './LabelFilterItem.js';

const MISSING_LABEL_FILTER_ERROR_MESSAGE = "Select at least 1 label filter (label and value)";
function LabelFilters({
  labelsFilters,
  onChange,
  onGetLabelNames,
  onGetLabelValues,
  labelFilterRequired,
  getLabelValuesAutofillSuggestions,
  debounceDuration,
  variableEditor
}) {
  const defaultOp = "=";
  const [items, setItems] = useState([{ op: defaultOp }]);
  useEffect(() => {
    if (labelsFilters.length > 0) {
      setItems(labelsFilters);
    } else {
      setItems([{ op: defaultOp }]);
    }
  }, [labelsFilters]);
  const onLabelsChange = (newItems) => {
    setItems(newItems);
    const newLabels = newItems.filter((x) => x.label != null && x.value != null);
    if (!isEqual(newLabels, labelsFilters)) {
      onChange(newLabels);
    }
  };
  const hasLabelFilter = items.some((item) => item.label && item.value);
  const editorList = () => {
    return /* @__PURE__ */ React.createElement(
      EditorList,
      {
        items,
        onChange: onLabelsChange,
        renderItem: (item, onChangeItem, onDelete) => /* @__PURE__ */ React.createElement(
          LabelFilterItem,
          {
            debounceDuration,
            item,
            defaultOp,
            onChange: onChangeItem,
            onDelete,
            onGetLabelNames,
            onGetLabelValues,
            invalidLabel: labelFilterRequired && !item.label,
            invalidValue: labelFilterRequired && !item.value,
            getLabelValuesAutofillSuggestions
          }
        )
      }
    );
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, variableEditor ? /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cx(
        css({
          display: "flex"
        })
      )
    },
    /* @__PURE__ */ React.createElement(
      InlineLabel,
      {
        width: 20,
        tooltip: /* @__PURE__ */ React.createElement("div", null, "Optional: used to filter the metric select for this query type.")
      },
      "Label filters"
    ),
    editorList()
  )) : /* @__PURE__ */ React.createElement(EditorFieldGroup, null, /* @__PURE__ */ React.createElement(
    EditorField,
    {
      label: "Label filters",
      error: MISSING_LABEL_FILTER_ERROR_MESSAGE,
      invalid: labelFilterRequired && !hasLabelFilter
    },
    editorList()
  )));
}

export { LabelFilters, MISSING_LABEL_FILTER_ERROR_MESSAGE };
//# sourceMappingURL=LabelFilters.js.map
