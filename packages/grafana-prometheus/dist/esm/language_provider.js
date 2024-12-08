import { once } from 'lodash';
import Prism from 'prismjs';
import { LanguageProvider, getDefaultTimeRange, AbstractLabelOperator } from '@grafana/data';
import { fixSummariesMetadata, toPromLikeQuery, extractLabelMatchers, processHistogramMetrics, processLabels } from './language_utils.js';
import { promqlGrammar } from './promql.js';
import { buildVisualQueryFromString } from './querybuilder/parsing.js';
import { PrometheusCacheLevel } from './types.js';

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const DEFAULT_KEYS = ["job", "instance"];
const EMPTY_SELECTOR = "{}";
const SUGGESTIONS_LIMIT = 1e4;
const buildCacheHeaders = (durationInSeconds) => {
  return {
    headers: {
      "X-Grafana-Cache": `private, max-age=${durationInSeconds}`
    }
  };
};
function getMetadataString(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  const { type, help } = metadata[metric];
  return `${type.toUpperCase()}: ${help}`;
}
function getMetadataHelp(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  return metadata[metric].help;
}
function getMetadataType(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  return metadata[metric].type;
}
const PREFIX_DELIMITER_REGEX = /(="|!="|=~"|!~"|\{|\[|\(|\+|-|\/|\*|%|\^|\band\b|\bor\b|\bunless\b|==|>=|!=|<=|>|<|=|~|,)/;
const secondsInDay = 86400;
class PromQlLanguageProvider extends LanguageProvider {
  constructor(datasource, initialValues) {
    super();
    __publicField(this, "histogramMetrics");
    __publicField(this, "timeRange");
    __publicField(this, "metrics");
    __publicField(this, "metricsMetadata");
    __publicField(this, "datasource");
    __publicField(this, "labelKeys", []);
    __publicField(this, "request", async (url, defaultValue, params = {}, options) => {
      try {
        const res = await this.datasource.metadataRequest(url, params, options);
        return res.data.data;
      } catch (error) {
        if (!isCancelledError(error)) {
          console.error(error);
        }
      }
      return defaultValue;
    });
    __publicField(this, "start", async (timeRange) => {
      this.timeRange = timeRange != null ? timeRange : getDefaultTimeRange();
      if (this.datasource.lookupsDisabled) {
        return [];
      }
      this.metrics = await this.fetchLabelValues("__name__") || [];
      this.histogramMetrics = processHistogramMetrics(this.metrics).sort();
      return Promise.all([this.loadMetricsMetadata(), this.fetchLabels()]);
    });
    /**
     * @param key
     */
    __publicField(this, "fetchLabelValues", async (key) => {
      const params = this.datasource.getAdjustedInterval(this.timeRange);
      const interpolatedName = this.datasource.interpolateString(key);
      const url = `/api/v1/label/${interpolatedName}/values`;
      const value = await this.request(url, [], params, this.getDefaultCacheHeaders());
      return value != null ? value : [];
    });
    /**
     * Fetches all label keys
     */
    __publicField(this, "fetchLabels", async (timeRange, queries) => {
      if (timeRange) {
        this.timeRange = timeRange;
      }
      let url = "/api/v1/labels";
      const timeParams = this.datasource.getAdjustedInterval(this.timeRange);
      this.labelFetchTs = Date.now().valueOf();
      const searchParams = new URLSearchParams(__spreadValues({}, timeParams));
      queries == null ? void 0 : queries.forEach((q) => {
        const visualQuery = buildVisualQueryFromString(q.expr);
        if (visualQuery.query.metric !== "") {
          searchParams.append("match[]", visualQuery.query.metric);
          if (visualQuery.query.binaryQueries) {
            visualQuery.query.binaryQueries.forEach((bq) => {
              searchParams.append("match[]", bq.query.metric);
            });
          }
        }
      });
      if (this.datasource.httpMethod === "GET") {
        url += `?${searchParams.toString()}`;
      }
      const res = await this.request(url, [], searchParams, this.getDefaultCacheHeaders());
      if (Array.isArray(res)) {
        this.labelKeys = res.slice().sort();
      }
      return [];
    });
    /**
     * Gets series values
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability
     * @param labelName
     * @param selector
     */
    __publicField(this, "getSeriesValues", async (labelName, selector) => {
      var _a;
      if (!this.datasource.hasLabelsMatchAPISupport()) {
        const data = await this.getSeries(selector);
        return (_a = data[labelName]) != null ? _a : [];
      }
      return await this.fetchSeriesValuesWithMatch(labelName, selector);
    });
    /**
     * Fetches all values for a label, with optional match[]
     * @param name
     * @param match
     * @param timeRange
     * @param requestId
     */
    __publicField(this, "fetchSeriesValuesWithMatch", async (name, match, requestId, timeRange = this.timeRange) => {
      const interpolatedName = name ? this.datasource.interpolateString(name) : null;
      const interpolatedMatch = match ? this.datasource.interpolateString(match) : null;
      const range = this.datasource.getAdjustedInterval(timeRange);
      const urlParams = __spreadValues(__spreadValues({}, range), interpolatedMatch && { "match[]": interpolatedMatch });
      let requestOptions = __spreadValues(__spreadValues({}, this.getDefaultCacheHeaders()), requestId && { requestId });
      if (!Object.keys(requestOptions).length) {
        requestOptions = void 0;
      }
      const value = await this.request(`/api/v1/label/${interpolatedName}/values`, [], urlParams, requestOptions);
      return value != null ? value : [];
    });
    /**
     * Gets series labels
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability. The old API call got the labels and the values in a single query,
     * but with the new query we need two calls, one to get the labels, and another to get the values.
     *
     * @param selector
     * @param otherLabels
     */
    __publicField(this, "getSeriesLabels", async (selector, otherLabels) => {
      let possibleLabelNames, data;
      if (!this.datasource.hasLabelsMatchAPISupport()) {
        data = await this.getSeries(selector);
        possibleLabelNames = Object.keys(data);
      } else {
        otherLabels.push({ name: "__name__", value: "", op: "!=" });
        data = await this.fetchSeriesLabelsMatch(selector);
        possibleLabelNames = Object.keys(data);
      }
      const usedLabelNames = new Set(otherLabels.map((l) => l.name));
      return possibleLabelNames.filter((l) => !usedLabelNames.has(l));
    });
    /**
     * Fetch labels using the best endpoint that datasource supports.
     * This is cached by its args but also by the global timeRange currently selected as they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField(this, "fetchLabelsWithMatch", async (name, withName) => {
      if (this.datasource.hasLabelsMatchAPISupport()) {
        return this.fetchSeriesLabelsMatch(name, withName);
      } else {
        return this.fetchSeriesLabels(name, withName);
      }
    });
    /**
     * Fetch labels for a series using /series endpoint. This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField(this, "fetchSeriesLabels", async (name, withName) => {
      const interpolatedName = this.datasource.interpolateString(name);
      const range = this.datasource.getAdjustedInterval(this.timeRange);
      const urlParams = __spreadProps(__spreadValues({}, range), {
        "match[]": interpolatedName
      });
      const url = `/api/v1/series`;
      const data = await this.request(url, [], urlParams, this.getDefaultCacheHeaders());
      const { values } = processLabels(data, withName);
      return values;
    });
    /**
     * Fetch labels for a series using /labels endpoint.  This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField(this, "fetchSeriesLabelsMatch", async (name, withName) => {
      const interpolatedName = this.datasource.interpolateString(name);
      const range = this.datasource.getAdjustedInterval(this.timeRange);
      const urlParams = __spreadProps(__spreadValues({}, range), {
        "match[]": interpolatedName
      });
      const url = `/api/v1/labels`;
      const data = await this.request(url, [], urlParams, this.getDefaultCacheHeaders());
      return data.reduce((ac, a) => __spreadProps(__spreadValues({}, ac), { [a]: "" }), {});
    });
    /**
     * Fetch series for a selector. Use this for raw results. Use fetchSeriesLabels() to get labels.
     * @param match
     */
    __publicField(this, "fetchSeries", async (match) => {
      const url = "/api/v1/series";
      const range = this.datasource.getTimeRangeParams(this.timeRange);
      const params = __spreadProps(__spreadValues({}, range), { "match[]": match });
      return await this.request(url, {}, params, this.getDefaultCacheHeaders());
    });
    /**
     * Fetch this only one as we assume this won't change over time. This is cached differently from fetchSeriesLabels
     * because we can cache more aggressively here and also we do not want to invalidate this cache the same way as in
     * fetchSeriesLabels.
     */
    __publicField(this, "fetchDefaultSeries", once(async () => {
      const values = await Promise.all(DEFAULT_KEYS.map((key) => this.fetchLabelValues(key)));
      return DEFAULT_KEYS.reduce((acc, key, i) => __spreadProps(__spreadValues({}, acc), { [key]: values[i] }), {});
    }));
    this.datasource = datasource;
    this.histogramMetrics = [];
    this.timeRange = getDefaultTimeRange();
    this.metrics = [];
    Object.assign(this, initialValues);
  }
  getDefaultCacheHeaders() {
    if (this.datasource.cacheLevel !== PrometheusCacheLevel.None) {
      return buildCacheHeaders(this.datasource.getCacheDurationInMinutes() * 60);
    }
    return;
  }
  // Strip syntax chars so that typeahead suggestions can work on clean inputs
  cleanText(s) {
    const parts = s.split(PREFIX_DELIMITER_REGEX);
    const last = parts.pop();
    return last.trimLeft().replace(/"$/, "").replace(/^"/, "");
  }
  get syntax() {
    return promqlGrammar;
  }
  async loadMetricsMetadata() {
    const headers = buildCacheHeaders(this.datasource.getDaysToCacheMetadata() * secondsInDay);
    this.metricsMetadata = fixSummariesMetadata(
      await this.request(
        "/api/v1/metadata",
        {},
        {},
        __spreadValues({
          showErrorAlert: false
        }, headers)
      )
    );
  }
  getLabelKeys() {
    return this.labelKeys;
  }
  importFromAbstractQuery(labelBasedQuery) {
    return toPromLikeQuery(labelBasedQuery);
  }
  exportToAbstractQuery(query) {
    const promQuery = query.expr;
    if (!promQuery || promQuery.length === 0) {
      return { refId: query.refId, labelMatchers: [] };
    }
    const tokens = Prism.tokenize(promQuery, promqlGrammar);
    const labelMatchers = extractLabelMatchers(tokens);
    const nameLabelValue = getNameLabelValue(promQuery, tokens);
    if (nameLabelValue && nameLabelValue.length > 0) {
      labelMatchers.push({
        name: "__name__",
        operator: AbstractLabelOperator.Equal,
        value: nameLabelValue
      });
    }
    return {
      refId: query.refId,
      labelMatchers
    };
  }
  async getSeries(selector, withName) {
    if (this.datasource.lookupsDisabled) {
      return {};
    }
    try {
      if (selector === EMPTY_SELECTOR) {
        return await this.fetchDefaultSeries();
      } else {
        return await this.fetchSeriesLabels(selector, withName);
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  async getLabelValues(key) {
    return await this.fetchLabelValues(key);
  }
}
function getNameLabelValue(promQuery, tokens) {
  let nameLabelValue = "";
  for (const token of tokens) {
    if (typeof token === "string") {
      nameLabelValue = token;
      break;
    }
  }
  return nameLabelValue;
}
function isCancelledError(error) {
  return typeof error === "object" && error !== null && "cancelled" in error && error.cancelled === true;
}

export { SUGGESTIONS_LIMIT, PromQlLanguageProvider as default, getMetadataHelp, getMetadataString, getMetadataType };
//# sourceMappingURL=language_provider.js.map
