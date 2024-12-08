import uFuzzy from '@leeoniya/ufuzzy';
import { config } from '@grafana/runtime';
import { escapeLabelValueInExactSelector } from '../../../language_utils.js';
import { FUNCTIONS } from '../../../promql.js';
import { NeverCaseError } from './util.js';

const metricNamesSearchClient = new uFuzzy({ intraMode: 1 });
function getAllMetricNamesCompletions(dataProvider) {
  var _a, _b;
  let metricNames = dataProvider.getAllMetricNames();
  if (config.featureToggles.prometheusCodeModeMetricNamesSearch && metricNames.length > dataProvider.metricNamesSuggestionLimit) {
    const { monacoSettings } = dataProvider;
    monacoSettings.enableAutocompleteSuggestionsUpdate();
    if (monacoSettings.inputInRange) {
      metricNames = (_b = (_a = metricNamesSearchClient.filter(metricNames, monacoSettings.inputInRange)) == null ? void 0 : _a.slice(0, dataProvider.metricNamesSuggestionLimit).map((idx) => metricNames[idx])) != null ? _b : [];
    } else {
      metricNames = metricNames.slice(0, dataProvider.metricNamesSuggestionLimit);
    }
  }
  return dataProvider.metricNamesToMetrics(metricNames).map((metric) => ({
    type: "METRIC_NAME",
    label: metric.name,
    insertText: metric.name,
    detail: `${metric.name} : ${metric.type}`,
    documentation: metric.help
  }));
}
const FUNCTION_COMPLETIONS = FUNCTIONS.map((f) => {
  var _a;
  return {
    type: "FUNCTION",
    label: f.label,
    insertText: (_a = f.insertText) != null ? _a : "",
    // i don't know what to do when this is nullish. it should not be.
    detail: f.detail,
    documentation: f.documentation
  };
});
async function getAllFunctionsAndMetricNamesCompletions(dataProvider) {
  const metricNames = getAllMetricNamesCompletions(dataProvider);
  return [...FUNCTION_COMPLETIONS, ...metricNames];
}
const DURATION_COMPLETIONS = [
  "$__interval",
  "$__range",
  "$__rate_interval",
  "1m",
  "5m",
  "10m",
  "30m",
  "1h",
  "1d"
].map((text) => ({
  type: "DURATION",
  label: text,
  insertText: text
}));
function getAllHistoryCompletions(dataProvider) {
  const allHistory = dataProvider.getHistory();
  return allHistory.slice(0, 10).map((expr) => ({
    type: "HISTORY",
    label: expr,
    insertText: expr
  }));
}
function makeSelector(metricName, labels) {
  const allLabels = [...labels];
  if (metricName !== void 0) {
    allLabels.push({ name: "__name__", value: metricName, op: "=" });
  }
  const allLabelTexts = allLabels.map(
    (label) => `${label.name}${label.op}"${escapeLabelValueInExactSelector(label.value)}"`
  );
  return `{${allLabelTexts.join(",")}}`;
}
async function getLabelNames(metric, otherLabels, dataProvider) {
  if (metric === void 0 && otherLabels.length === 0) {
    return Promise.resolve(dataProvider.getAllLabelNames());
  } else {
    const selector = makeSelector(metric, otherLabels);
    return await dataProvider.getSeriesLabels(selector, otherLabels);
  }
}
async function getLabelNamesForCompletions(metric, suffix, triggerOnInsert, otherLabels, dataProvider) {
  const labelNames = await getLabelNames(metric, otherLabels, dataProvider);
  return labelNames.map((text) => ({
    type: "LABEL_NAME",
    label: text,
    insertText: `${text}${suffix}`,
    triggerOnInsert
  }));
}
async function getLabelNamesForSelectorCompletions(metric, otherLabels, dataProvider) {
  return getLabelNamesForCompletions(metric, "=", true, otherLabels, dataProvider);
}
async function getLabelNamesForByCompletions(metric, otherLabels, dataProvider) {
  return getLabelNamesForCompletions(metric, "", false, otherLabels, dataProvider);
}
async function getLabelValues(metric, labelName, otherLabels, dataProvider) {
  if (metric === void 0 && otherLabels.length === 0) {
    return dataProvider.getLabelValues(labelName);
  } else {
    const selector = makeSelector(metric, otherLabels);
    return await dataProvider.getSeriesValues(labelName, selector);
  }
}
async function getLabelValuesForMetricCompletions(metric, labelName, betweenQuotes, otherLabels, dataProvider) {
  const values = await getLabelValues(metric, labelName, otherLabels, dataProvider);
  return values.map((text) => ({
    type: "LABEL_VALUE",
    label: text,
    insertText: betweenQuotes ? text : `"${text}"`
    // FIXME: escaping strange characters?
  }));
}
function getCompletions(situation, dataProvider) {
  switch (situation.type) {
    case "IN_DURATION":
      return Promise.resolve(DURATION_COMPLETIONS);
    case "IN_FUNCTION":
      return getAllFunctionsAndMetricNamesCompletions(dataProvider);
    case "AT_ROOT": {
      return getAllFunctionsAndMetricNamesCompletions(dataProvider);
    }
    case "EMPTY": {
      const metricNames = getAllMetricNamesCompletions(dataProvider);
      const historyCompletions = getAllHistoryCompletions(dataProvider);
      return Promise.resolve([...historyCompletions, ...FUNCTION_COMPLETIONS, ...metricNames]);
    }
    case "IN_LABEL_SELECTOR_NO_LABEL_NAME":
      return getLabelNamesForSelectorCompletions(situation.metricName, situation.otherLabels, dataProvider);
    case "IN_GROUPING":
      return getLabelNamesForByCompletions(situation.metricName, situation.otherLabels, dataProvider);
    case "IN_LABEL_SELECTOR_WITH_LABEL_NAME":
      return getLabelValuesForMetricCompletions(
        situation.metricName,
        situation.labelName,
        situation.betweenQuotes,
        situation.otherLabels,
        dataProvider
      );
    default:
      throw new NeverCaseError(situation);
  }
}

export { getCompletions };
//# sourceMappingURL=completions.js.map
