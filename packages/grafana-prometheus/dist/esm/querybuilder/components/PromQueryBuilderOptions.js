import React from 'react';
import { CoreApp } from '@grafana/data';
import { EditorRow, EditorField, EditorSwitch } from '@grafana/experimental';
import { AutoSizeInput, Select, RadioButtonGroup } from '@grafana/ui';
import { getQueryTypeOptions, getQueryTypeChangeHandler } from '../../components/PromExploreExtraField.js';
import { QueryOptionGroup } from '../shared/QueryOptionGroup.js';
import { FORMAT_OPTIONS, INTERVAL_FACTOR_OPTIONS } from './PromQueryEditorSelector.js';
import { PromQueryLegendEditor, getLegendModeLabel } from './PromQueryLegendEditor.js';
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
const PromQueryBuilderOptions = React.memo(
  ({ query, app, onChange, onRunQuery }) => {
    const onChangeFormat = (value) => {
      onChange(__spreadProps(__spreadValues({}, query), { format: value.value }));
      onRunQuery();
    };
    const onChangeStep = (evt) => {
      onChange(__spreadProps(__spreadValues({}, query), { interval: evt.currentTarget.value.trim() }));
      onRunQuery();
    };
    const queryTypeOptions = getQueryTypeOptions(
      app === CoreApp.Explore || app === CoreApp.Correlations || app === CoreApp.PanelEditor
    );
    const onQueryTypeChange = getQueryTypeChangeHandler(query, onChange);
    const onExemplarChange = (event) => {
      const isEnabled = event.currentTarget.checked;
      onChange(__spreadProps(__spreadValues({}, query), { exemplar: isEnabled }));
      onRunQuery();
    };
    const onIntervalFactorChange = (value) => {
      onChange(__spreadProps(__spreadValues({}, query), { intervalFactor: value.value }));
      onRunQuery();
    };
    const formatOption = FORMAT_OPTIONS.find((option) => option.value === query.format) || FORMAT_OPTIONS[0];
    const queryTypeValue = getQueryTypeValue(query);
    const queryTypeLabel = queryTypeOptions.find((x) => x.value === queryTypeValue).label;
    return /* @__PURE__ */ React.createElement(EditorRow, null, /* @__PURE__ */ React.createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.options }, /* @__PURE__ */ React.createElement(
      QueryOptionGroup,
      {
        title: "Options",
        collapsedInfo: getCollapsedInfo(query, formatOption.label, queryTypeLabel, app)
      },
      /* @__PURE__ */ React.createElement(
        PromQueryLegendEditor,
        {
          legendFormat: query.legendFormat,
          onChange: (legendFormat) => onChange(__spreadProps(__spreadValues({}, query), { legendFormat })),
          onRunQuery
        }
      ),
      /* @__PURE__ */ React.createElement(
        EditorField,
        {
          label: "Min step",
          tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "An additional lower limit for the step parameter of the Prometheus query and for the", " ", /* @__PURE__ */ React.createElement("code", null, "$__interval"), " and ", /* @__PURE__ */ React.createElement("code", null, "$__rate_interval"), " variables.")
        },
        /* @__PURE__ */ React.createElement(
          AutoSizeInput,
          {
            type: "text",
            "aria-label": "Set lower limit for the step parameter",
            placeholder: "auto",
            minWidth: 10,
            onCommitChange: onChangeStep,
            defaultValue: query.interval,
            id: selectors.components.DataSource.Prometheus.queryEditor.step
          }
        )
      ),
      /* @__PURE__ */ React.createElement(EditorField, { label: "Format" }, /* @__PURE__ */ React.createElement(
        Select,
        {
          "data-testid": selectors.components.DataSource.Prometheus.queryEditor.format,
          value: formatOption,
          allowCustomValue: true,
          onChange: onChangeFormat,
          options: FORMAT_OPTIONS
        }
      )),
      /* @__PURE__ */ React.createElement(EditorField, { label: "Type", "data-testid": selectors.components.DataSource.Prometheus.queryEditor.type }, /* @__PURE__ */ React.createElement(RadioButtonGroup, { options: queryTypeOptions, value: queryTypeValue, onChange: onQueryTypeChange })),
      shouldShowExemplarSwitch(query, app) && /* @__PURE__ */ React.createElement(EditorField, { label: "Exemplars" }, /* @__PURE__ */ React.createElement(
        EditorSwitch,
        {
          value: query.exemplar || false,
          onChange: onExemplarChange,
          id: selectors.components.DataSource.Prometheus.queryEditor.exemplars
        }
      )),
      query.intervalFactor && query.intervalFactor > 1 && /* @__PURE__ */ React.createElement(EditorField, { label: "Resolution" }, /* @__PURE__ */ React.createElement(
        Select,
        {
          "aria-label": "Select resolution",
          isSearchable: false,
          options: INTERVAL_FACTOR_OPTIONS,
          onChange: onIntervalFactorChange,
          value: INTERVAL_FACTOR_OPTIONS.find((option) => option.value === query.intervalFactor)
        }
      ))
    )));
  }
);
function shouldShowExemplarSwitch(query, app) {
  if (app === CoreApp.UnifiedAlerting || !query.range) {
    return false;
  }
  return true;
}
function getQueryTypeValue(query) {
  return query.range && query.instant ? "both" : query.instant ? "instant" : "range";
}
function getCollapsedInfo(query, formatOption, queryType, app) {
  var _a;
  const items = [];
  items.push(`Legend: ${getLegendModeLabel(query.legendFormat)}`);
  items.push(`Format: ${formatOption}`);
  items.push(`Step: ${(_a = query.interval) != null ? _a : "auto"}`);
  items.push(`Type: ${queryType}`);
  if (shouldShowExemplarSwitch(query, app)) {
    if (query.exemplar) {
      items.push(`Exemplars: true`);
    } else {
      items.push(`Exemplars: false`);
    }
  }
  return items;
}
PromQueryBuilderOptions.displayName = "PromQueryBuilderOptions";

export { PromQueryBuilderOptions };
//# sourceMappingURL=PromQueryBuilderOptions.js.map
