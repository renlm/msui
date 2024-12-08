import React, { useState, useEffect, useCallback } from 'react';
import { InlineFieldRow, InlineField, Select, Input, TextArea } from '@grafana/ui';
import { migrateVariableQueryToEditor, migrateVariableEditorBackToVariableSupport } from '../migrations/variableMigration.js';
import { promQueryModeller } from '../querybuilder/PromQueryModeller.js';
import { MetricsLabelsSection } from '../querybuilder/components/MetricsLabelsSection.js';
import { PromVariableQueryType } from '../types.js';
import { selectors } from '../grafana-e2e-selectors/src/selectors/index.js';

var __defProp = Object.defineProperty;
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
const variableOptions = [
  { label: "Label names", value: PromVariableQueryType.LabelNames },
  { label: "Label values", value: PromVariableQueryType.LabelValues },
  { label: "Metrics", value: PromVariableQueryType.MetricNames },
  { label: "Query result", value: PromVariableQueryType.VarQueryResult },
  { label: "Series query", value: PromVariableQueryType.SeriesQuery },
  { label: "Classic query", value: PromVariableQueryType.ClassicQuery }
];
const refId = "PrometheusVariableQueryEditor-VariableQuery";
const PromVariableQueryEditor = ({ onChange, query, datasource, range }) => {
  const [qryType, setQryType] = useState(void 0);
  const [label, setLabel] = useState("");
  const [labelNamesMatch, setLabelNamesMatch] = useState("");
  const [metric, setMetric] = useState("");
  const [varQuery, setVarQuery] = useState("");
  const [seriesQuery, setSeriesQuery] = useState("");
  const [classicQuery, setClassicQuery] = useState("");
  const [labelOptions, setLabelOptions] = useState([]);
  const [labelFilters, setLabelFilters] = useState([]);
  useEffect(() => {
    datasource.languageProvider.start(range);
  }, []);
  useEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!query) {
      return;
    }
    if (query.qryType === PromVariableQueryType.ClassicQuery) {
      setQryType(query.qryType);
      setClassicQuery((_a = query.query) != null ? _a : "");
    } else {
      const variableQuery = variableMigration(query);
      setLabelNamesMatch((_b = variableQuery.match) != null ? _b : "");
      setQryType(variableQuery.qryType);
      setLabel((_c = variableQuery.label) != null ? _c : "");
      setMetric((_d = variableQuery.metric) != null ? _d : "");
      setLabelFilters((_e = variableQuery.labelFilters) != null ? _e : []);
      setVarQuery((_f = variableQuery.varQuery) != null ? _f : "");
      setSeriesQuery((_g = variableQuery.seriesQuery) != null ? _g : "");
      setClassicQuery((_h = variableQuery.classicQuery) != null ? _h : "");
    }
  }, [query]);
  useEffect(() => {
    if (qryType !== PromVariableQueryType.LabelValues) {
      return;
    }
    const variables = datasource.getVariables().map((variable) => ({ label: variable, value: variable }));
    if (!metric) {
      datasource.getTagKeys({ filters: [] }).then((labelNames) => {
        const names = labelNames.map(({ text }) => ({ label: text, value: text }));
        setLabelOptions([...variables, ...names]);
      });
    } else {
      const labelToConsider = [{ label: "__name__", op: "=", value: metric }];
      const expr = promQueryModeller.renderLabels(labelToConsider);
      datasource.languageProvider.fetchLabelsWithMatch(expr).then((labelsIndex) => {
        const labelNames = Object.keys(labelsIndex);
        const names = labelNames.map((value) => ({ label: value, value }));
        setLabelOptions([...variables, ...names]);
      });
    }
  }, [datasource, qryType, metric]);
  const onChangeWithVariableString = (updateVar, updLabelFilters) => {
    const queryVar = {
      qryType,
      label,
      metric,
      match: labelNamesMatch,
      varQuery,
      seriesQuery,
      classicQuery,
      refId: "PrometheusVariableQueryEditor-VariableQuery"
    };
    let updateLabelFilters = updLabelFilters ? { labelFilters: updLabelFilters } : { labelFilters };
    const updatedVar = __spreadValues(__spreadValues(__spreadValues({}, queryVar), updateVar), updateLabelFilters);
    const queryString = migrateVariableEditorBackToVariableSupport(updatedVar);
    onChange({
      query: queryString,
      qryType: updatedVar.qryType,
      refId
    });
  };
  const onQueryTypeChange = (newType) => {
    var _a;
    setQryType(newType.value);
    if (newType.value !== PromVariableQueryType.SeriesQuery) {
      onChangeWithVariableString({ qryType: (_a = newType.value) != null ? _a : 0 });
    }
  };
  const onLabelChange = (newLabel) => {
    const newLabelvalue = newLabel && newLabel.value ? newLabel.value : "";
    setLabel(newLabelvalue);
    if (qryType === PromVariableQueryType.LabelValues && newLabelvalue) {
      onChangeWithVariableString({ label: newLabelvalue });
    }
  };
  const metricsLabelsChange = (update) => {
    var _a;
    setMetric(update.metric);
    setLabelFilters(update.labels);
    const updMetric = update.metric;
    const updLabelFilters = (_a = update.labels) != null ? _a : [];
    if (qryType === PromVariableQueryType.LabelValues && label && (updMetric || updLabelFilters)) {
      onChangeWithVariableString({ qryType, metric: updMetric }, updLabelFilters);
    }
  };
  const onLabelNamesMatchChange = (regex) => {
    if (qryType === PromVariableQueryType.LabelNames) {
      onChangeWithVariableString({ qryType, match: regex });
    }
  };
  const onMetricChange = (value) => {
    if (qryType === PromVariableQueryType.MetricNames && value) {
      onChangeWithVariableString({ metric: value });
    }
  };
  const onVarQueryChange = (e) => {
    setVarQuery(e.currentTarget.value);
  };
  const onSeriesQueryChange = (e) => {
    setSeriesQuery(e.currentTarget.value);
  };
  const onClassicQueryChange = (e) => {
    setClassicQuery(e.currentTarget.value);
  };
  const promVisualQuery = useCallback(() => {
    return { metric, labels: labelFilters, operations: [] };
  }, [metric, labelFilters]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Query type",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React.createElement("div", null, "The Prometheus data source plugin provides the following query types for template variables.")
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        placeholder: "Select query type",
        "aria-label": "Query type",
        onChange: onQueryTypeChange,
        value: qryType,
        options: variableOptions,
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.queryType
      }
    )
  )), qryType === PromVariableQueryType.LabelValues && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Label",
      labelWidth: 20,
      required: true,
      "aria-labelledby": "label-select",
      tooltip: /* @__PURE__ */ React.createElement("div", null, "Returns a list of label values for the label name in all metrics unless the metric is specified.")
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        "aria-label": "label-select",
        onChange: onLabelChange,
        value: label,
        options: labelOptions,
        width: 25,
        allowCustomValue: true,
        isClearable: true,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.labelValues.labelSelect
      }
    )
  )), /* @__PURE__ */ React.createElement(
    MetricsLabelsSection,
    {
      query: promVisualQuery(),
      datasource,
      onChange: metricsLabelsChange,
      variableEditor: true
    }
  )), qryType === PromVariableQueryType.LabelNames && /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Metric regex",
      labelWidth: 20,
      "aria-labelledby": "Metric regex",
      tooltip: /* @__PURE__ */ React.createElement("div", null, "Returns a list of label names, optionally filtering by specified metric regex.")
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        "aria-label": "Metric regex",
        placeholder: "Metric regex",
        value: labelNamesMatch,
        onBlur: (event) => {
          setLabelNamesMatch(event.currentTarget.value);
          onLabelNamesMatchChange(event.currentTarget.value);
        },
        onChange: (e) => {
          setLabelNamesMatch(e.currentTarget.value);
        },
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.labelnames.metricRegex
      }
    )
  )), qryType === PromVariableQueryType.MetricNames && /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Metric regex",
      labelWidth: 20,
      "aria-labelledby": "Metric selector",
      tooltip: /* @__PURE__ */ React.createElement("div", null, "Returns a list of metrics matching the specified metric regex.")
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        "aria-label": "Metric selector",
        placeholder: "Metric regex",
        value: metric,
        onChange: (e) => {
          setMetric(e.currentTarget.value);
        },
        onBlur: (e) => {
          setMetric(e.currentTarget.value);
          onMetricChange(e.currentTarget.value);
        },
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.metricNames.metricRegex
      }
    )
  )), qryType === PromVariableQueryType.VarQueryResult && /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React.createElement("div", null, "Returns a list of Prometheus query results for the query. This can include Prometheus functions, i.e. sum(go_goroutines).")
    },
    /* @__PURE__ */ React.createElement(
      TextArea,
      {
        type: "text",
        "aria-label": "Prometheus Query",
        placeholder: "Prometheus Query",
        value: varQuery,
        onChange: onVarQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.VarQueryResult && varQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        cols: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.varQueryResult
      }
    )
  )), qryType === PromVariableQueryType.SeriesQuery && /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Series Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React.createElement("div", null, 'Enter a metric with labels, only a metric or only labels, i.e. go_goroutines{instance="localhost:9090"}, go_goroutines, or {instance="localhost:9090"}. Returns a list of time series associated with the entered data.')
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        "aria-label": "Series Query",
        placeholder: "Series Query",
        value: seriesQuery,
        onChange: onSeriesQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.SeriesQuery && seriesQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        width: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.seriesQuery
      }
    )
  )), qryType === PromVariableQueryType.ClassicQuery && /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Classic Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React.createElement("div", null, "The original implemetation of the Prometheus variable query editor. Enter a string with the correct query type and parameters as described in these docs. For example, label_values(label, metric).")
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        "aria-label": "Classic Query",
        placeholder: "Classic Query",
        value: classicQuery,
        onChange: onClassicQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.ClassicQuery && classicQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        width: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.classicQuery
      }
    )
  )));
};
function variableMigration(query) {
  if (typeof query === "string") {
    return migrateVariableQueryToEditor(query);
  } else if (query.query) {
    return migrateVariableQueryToEditor(query.query);
  } else {
    return query;
  }
}

export { PromVariableQueryEditor, variableMigration, variableOptions };
//# sourceMappingURL=VariableQueryEditor.js.map
