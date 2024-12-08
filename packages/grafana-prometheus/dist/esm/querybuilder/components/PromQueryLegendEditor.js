import React, { useRef } from 'react';
import { EditorField } from '@grafana/experimental';
import { AutoSizeInput, Select } from '@grafana/ui';
import { LegendFormatMode } from '../../types.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

const legendModeOptions = [
  {
    label: "Auto",
    value: LegendFormatMode.Auto,
    description: "Only includes unique labels"
  },
  { label: "Verbose", value: LegendFormatMode.Verbose, description: "All label names and values" },
  { label: "Custom", value: LegendFormatMode.Custom, description: "Provide a naming template" }
];
const PromQueryLegendEditor = React.memo(
  ({ legendFormat, onChange, onRunQuery }) => {
    const mode = getLegendMode(legendFormat);
    const inputRef = useRef(null);
    const onLegendFormatChanged = (evt) => {
      let newFormat = evt.currentTarget.value;
      if (newFormat.length === 0) {
        newFormat = LegendFormatMode.Auto;
      }
      if (newFormat !== legendFormat) {
        onChange(newFormat);
        onRunQuery();
      }
    };
    const onLegendModeChanged = (value) => {
      switch (value.value) {
        case LegendFormatMode.Auto:
          onChange(LegendFormatMode.Auto);
          break;
        case LegendFormatMode.Custom:
          onChange("{{label_name}}");
          setTimeout(() => {
            var _a, _b;
            (_a = inputRef.current) == null ? void 0 : _a.focus();
            (_b = inputRef.current) == null ? void 0 : _b.setSelectionRange(2, 12, "forward");
          }, 10);
          break;
        case LegendFormatMode.Verbose:
          onChange("");
          break;
      }
      onRunQuery();
    };
    return /* @__PURE__ */ React.createElement(
      EditorField,
      {
        label: "Legend",
        tooltip: "Series name override or template. Ex. {{hostname}} will be replaced with label value for hostname.",
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.legend
      },
      /* @__PURE__ */ React.createElement(React.Fragment, null, mode === LegendFormatMode.Custom && /* @__PURE__ */ React.createElement(
        AutoSizeInput,
        {
          id: "legendFormat",
          minWidth: 22,
          placeholder: "auto",
          defaultValue: legendFormat,
          onCommitChange: onLegendFormatChanged,
          ref: inputRef
        }
      ), mode !== LegendFormatMode.Custom && /* @__PURE__ */ React.createElement(
        Select,
        {
          inputId: "legend.mode",
          isSearchable: false,
          placeholder: "Select legend mode",
          options: legendModeOptions,
          width: 22,
          onChange: onLegendModeChanged,
          value: legendModeOptions.find((x) => x.value === mode)
        }
      ))
    );
  }
);
PromQueryLegendEditor.displayName = "PromQueryLegendEditor";
function getLegendMode(legendFormat) {
  if (legendFormat === LegendFormatMode.Auto) {
    return LegendFormatMode.Auto;
  }
  if (legendFormat == null || legendFormat === "") {
    return LegendFormatMode.Verbose;
  }
  return LegendFormatMode.Custom;
}
function getLegendModeLabel(legendFormat) {
  var _a;
  const mode = getLegendMode(legendFormat);
  if (mode !== LegendFormatMode.Custom) {
    return (_a = legendModeOptions.find((x) => x.value === mode)) == null ? void 0 : _a.label;
  }
  return legendFormat;
}

export { PromQueryLegendEditor, getLegendModeLabel };
//# sourceMappingURL=PromQueryLegendEditor.js.map
