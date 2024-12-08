import React, { useCallback } from 'react';
import { getMetadataString } from '../../language_provider.js';
import { truncateResult } from '../../language_utils.js';
import { promQueryModeller } from '../PromQueryModeller.js';
import { regexifyLabelValuesQueryString } from '../parsingUtils.js';
import { LabelFilters } from './LabelFilters.js';
import { MetricSelect } from './MetricSelect.js';

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
function MetricsLabelsSection({
  datasource,
  query,
  onChange,
  onBlur,
  variableEditor
}) {
  const onChangeLabels = (labels) => {
    onChange(__spreadProps(__spreadValues({}, query), { labels }));
  };
  const withTemplateVariableOptions = useCallback(
    async (optionsPromise) => {
      const variables = datasource.getVariables();
      const options = await optionsPromise;
      return [
        ...variables.map((value) => ({ label: value, value })),
        ...options.map((option) => ({
          label: option.value,
          value: option.value,
          title: option.description
        }))
      ];
    },
    [datasource]
  );
  const onGetLabelNames = async (forLabel) => {
    if (!query.metric) {
      await datasource.languageProvider.fetchLabels();
      return datasource.languageProvider.getLabelKeys().map((k) => ({ value: k }));
    }
    const labelsToConsider = query.labels.filter((x) => x !== forLabel);
    labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    const expr = promQueryModeller.renderLabels(labelsToConsider);
    let labelsIndex = await datasource.languageProvider.fetchLabelsWithMatch(expr);
    return Object.keys(labelsIndex).filter((labelName) => !labelsToConsider.find((filter) => filter.label === labelName)).map((k) => ({ value: k }));
  };
  const getLabelValuesAutocompleteSuggestions = (queryString, labelName) => {
    const forLabel = {
      label: labelName != null ? labelName : "__name__",
      op: "=~",
      value: regexifyLabelValuesQueryString(`.*${queryString}`)
    };
    const labelsToConsider = query.labels.filter((x) => x.label !== forLabel.label);
    labelsToConsider.push(forLabel);
    if (query.metric) {
      labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    }
    const interpolatedLabelsToConsider = labelsToConsider.map((labelObject) => __spreadProps(__spreadValues({}, labelObject), {
      label: datasource.interpolateString(labelObject.label),
      value: datasource.interpolateString(labelObject.value)
    }));
    const expr = promQueryModeller.renderLabels(interpolatedLabelsToConsider);
    let response;
    if (datasource.hasLabelsMatchAPISupport()) {
      response = getLabelValuesFromLabelValuesAPI(forLabel, expr);
    } else {
      response = getLabelValuesFromSeriesAPI(forLabel, expr);
    }
    return response.then((response2) => {
      truncateResult(response2);
      return response2;
    });
  };
  const getLabelValuesFromSeriesAPI = (forLabel, promQLExpression) => {
    if (!forLabel.label) {
      return Promise.resolve([]);
    }
    const result = datasource.languageProvider.fetchSeries(promQLExpression);
    const forLabelInterpolated = datasource.interpolateString(forLabel.label);
    return result.then((result2) => {
      const set = /* @__PURE__ */ new Set();
      result2.forEach((labelValue) => {
        const labelNameString = labelValue[forLabelInterpolated];
        set.add(labelNameString);
      });
      return Array.from(set).map((labelValues) => ({ label: labelValues, value: labelValues }));
    });
  };
  const getLabelValuesFromLabelValuesAPI = (forLabel, promQLExpression) => {
    if (!forLabel.label) {
      return Promise.resolve([]);
    }
    const requestId = `[${datasource.uid}][${query.metric}][${forLabel.label}][${forLabel.op}]`;
    return datasource.languageProvider.fetchSeriesValuesWithMatch(forLabel.label, promQLExpression, requestId).then((response) => response.map((v) => ({ value: v, label: v })));
  };
  const onGetLabelValues = async (forLabel) => {
    if (!forLabel.label) {
      return [];
    }
    if (!query.metric) {
      return (await datasource.languageProvider.getLabelValues(forLabel.label)).map((v) => ({ value: v }));
    }
    const labelsToConsider = query.labels.filter((x) => x !== forLabel);
    labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    const interpolatedLabelsToConsider = labelsToConsider.map((labelObject) => __spreadProps(__spreadValues({}, labelObject), {
      label: datasource.interpolateString(labelObject.label),
      value: datasource.interpolateString(labelObject.value)
    }));
    const expr = promQueryModeller.renderLabels(interpolatedLabelsToConsider);
    if (datasource.hasLabelsMatchAPISupport()) {
      return getLabelValuesFromLabelValuesAPI(forLabel, expr);
    } else {
      return getLabelValuesFromSeriesAPI(forLabel, expr);
    }
  };
  const onGetMetrics = useCallback(() => {
    return withTemplateVariableOptions(getMetrics(datasource, query));
  }, [datasource, query, withTemplateVariableOptions]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    MetricSelect,
    {
      query,
      onChange,
      onGetMetrics,
      datasource,
      labelsFilters: query.labels,
      metricLookupDisabled: datasource.lookupsDisabled,
      onBlur: onBlur ? onBlur : () => {
      },
      variableEditor
    }
  ), /* @__PURE__ */ React.createElement(
    LabelFilters,
    {
      debounceDuration: datasource.getDebounceTimeInMilliseconds(),
      getLabelValuesAutofillSuggestions: getLabelValuesAutocompleteSuggestions,
      labelsFilters: query.labels,
      onChange: onChangeLabels,
      onGetLabelNames: (forLabel) => withTemplateVariableOptions(onGetLabelNames(forLabel)),
      onGetLabelValues: (forLabel) => withTemplateVariableOptions(onGetLabelValues(forLabel)),
      variableEditor
    }
  ));
}
async function getMetrics(datasource, query) {
  var _a, _b;
  if (!datasource.languageProvider.metricsMetadata) {
    await datasource.languageProvider.loadMetricsMetadata();
  }
  if (!datasource.languageProvider.metricsMetadata) {
    datasource.languageProvider.metricsMetadata = {};
  }
  let metrics;
  if (query.labels.length > 0) {
    const expr = promQueryModeller.renderLabels(query.labels);
    metrics = (_a = (await datasource.languageProvider.getSeries(expr, true))["__name__"]) != null ? _a : [];
  } else {
    metrics = (_b = await datasource.languageProvider.getLabelValues("__name__")) != null ? _b : [];
  }
  return metrics.map((m) => ({
    value: m,
    description: getMetadataString(m, datasource.languageProvider.metricsMetadata)
  }));
}

export { MetricsLabelsSection };
//# sourceMappingURL=MetricsLabelsSection.js.map
