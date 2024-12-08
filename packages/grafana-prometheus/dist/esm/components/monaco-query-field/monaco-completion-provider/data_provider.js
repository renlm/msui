var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT = "codeModeSuggestionsIncomplete";
function isSuggestionsIncompleteEvent(e) {
  return e.type === CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT && "detail" in e && typeof e.detail === "object" && e.detail !== null && "limit" in e.detail && "datasourceUid" in e.detail;
}
class DataProvider {
  constructor(params) {
    __publicField(this, "languageProvider");
    __publicField(this, "historyProvider");
    __publicField(this, "getSeriesLabels");
    __publicField(this, "getSeriesValues");
    __publicField(this, "getAllLabelNames");
    __publicField(this, "getLabelValues");
    __publicField(this, "metricNamesSuggestionLimit");
    /**
     * The text that's been typed so far within the current {@link Monaco.Range | Range}.
     *
     * @remarks
     * This is useful with fuzzy searching items to provide as Monaco autocomplete suggestions.
     */
    __publicField(this, "inputInRange");
    __publicField(this, "suggestionsIncomplete");
    this.languageProvider = params.languageProvider;
    this.historyProvider = params.historyProvider;
    this.inputInRange = "";
    this.metricNamesSuggestionLimit = this.languageProvider.datasource.metricNamesAutocompleteSuggestionLimit;
    this.suggestionsIncomplete = false;
    this.getSeriesLabels = this.languageProvider.getSeriesLabels.bind(this.languageProvider);
    this.getSeriesValues = this.languageProvider.getSeriesValues.bind(this.languageProvider);
    this.getAllLabelNames = this.languageProvider.getLabelKeys.bind(this.languageProvider);
    this.getLabelValues = this.languageProvider.getLabelValues.bind(this.languageProvider);
  }
  getHistory() {
    return this.historyProvider.map((h) => h.query.expr).filter(Boolean);
  }
  getAllMetricNames() {
    return this.languageProvider.metrics;
  }
  metricNamesToMetrics(metricNames) {
    const { metricsMetadata } = this.languageProvider;
    const result = metricNames.map((m) => {
      var _a, _b;
      const metaItem = metricsMetadata == null ? void 0 : metricsMetadata[m];
      return {
        name: m,
        help: (_a = metaItem == null ? void 0 : metaItem.help) != null ? _a : "",
        type: (_b = metaItem == null ? void 0 : metaItem.type) != null ? _b : ""
      };
    });
    return result;
  }
  enableAutocompleteSuggestionsUpdate() {
    this.suggestionsIncomplete = true;
    dispatchEvent(
      new CustomEvent(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, {
        detail: { limit: this.metricNamesSuggestionLimit, datasourceUid: this.languageProvider.datasource.uid }
      })
    );
  }
  setInputInRange(textInput) {
    this.inputInRange = textInput;
  }
  get monacoSettings() {
    return {
      /**
       * Enable autocomplete suggestions update on every input change.
       *
       * @remarks
       * If fuzzy search is used in `getCompletions` to trim down results to improve performance,
       * we need to instruct Monaco to update the completions on every input change, so that the
       * completions reflect the current input.
       */
      enableAutocompleteSuggestionsUpdate: this.enableAutocompleteSuggestionsUpdate.bind(this),
      inputInRange: this.inputInRange,
      setInputInRange: this.setInputInRange.bind(this),
      suggestionsIncomplete: this.suggestionsIncomplete
    };
  }
}

export { CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, DataProvider, isSuggestionsIncompleteEvent };
//# sourceMappingURL=data_provider.js.map
