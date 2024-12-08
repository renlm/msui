import { defaults } from 'lodash';
import { throwError, lastValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import semver from 'semver/preload';
import { getDefaultTimeRange, rangeUtil, dateTime, scopeFilterOperatorMap, CoreApp, renderLegendFormat } from '@grafana/data';
import { DataSourceWithBackend, getTemplateSrv, getBackendSrv, isFetchError, config, toDataQueryResponse } from '@grafana/runtime';
import { addLabelToQuery } from './add_label_to_query.js';
import { AnnotationQueryEditor } from './components/AnnotationQueryEditor.js';
import PromQlLanguageProvider, { SUGGESTIONS_LIMIT } from './language_provider.js';
import { getPrometheusTime, expandRecordingRules, getRangeSnapInterval, getClientCacheDurationInMinutes } from './language_utils.js';
import { PrometheusMetricFindQuery } from './metric_find_query.js';
import { getQueryHints, getInitHints } from './query_hints.js';
import { promQueryModeller } from './querybuilder/PromQueryModeller.js';
import { QueryCache, defaultPrometheusQueryOverlapWindow } from './querycache/QueryCache.js';
import { transformV2, getOriginalMetricName } from './result_transformer.js';
import { trackQuery } from './tracking.js';
import { PrometheusCacheLevel, PromApplication } from './types.js';
import { PrometheusVariableSupport } from './variables.js';

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
const ANNOTATION_QUERY_STEP_DEFAULT = "60s";
const GET_AND_POST_METADATA_ENDPOINTS = ["api/v1/query", "api/v1/query_range", "api/v1/series", "api/v1/labels"];
const InstantQueryRefIdIndex = "-Instant";
class PrometheusDatasource extends DataSourceWithBackend {
  constructor(instanceSettings, templateSrv = getTemplateSrv(), languageProvider) {
    var _a, _b, _c, _d, _e, _f;
    super(instanceSettings);
    this.templateSrv = templateSrv;
    __publicField(this, "type");
    __publicField(this, "ruleMappings");
    __publicField(this, "hasIncrementalQuery");
    __publicField(this, "url");
    __publicField(this, "id");
    __publicField(this, "access");
    __publicField(this, "basicAuth");
    __publicField(this, "withCredentials");
    __publicField(this, "interval");
    __publicField(this, "httpMethod");
    __publicField(this, "languageProvider");
    __publicField(this, "exemplarTraceIdDestinations");
    __publicField(this, "lookupsDisabled");
    __publicField(this, "customQueryParameters");
    __publicField(this, "datasourceConfigurationPrometheusFlavor");
    __publicField(this, "datasourceConfigurationPrometheusVersion");
    __publicField(this, "disableRecordingRules");
    __publicField(this, "defaultEditor");
    __publicField(this, "exemplarsAvailable");
    __publicField(this, "cacheLevel");
    __publicField(this, "cache");
    __publicField(this, "metricNamesAutocompleteSuggestionLimit");
    __publicField(this, "init", async () => {
      if (!this.disableRecordingRules) {
        this.loadRules();
      }
      this.exemplarsAvailable = await this.areExemplarsAvailable();
    });
    __publicField(this, "processAnnotationResponse", (options, data) => {
      var _a;
      const frames = toDataQueryResponse({ data }).data;
      if (!frames || !frames.length) {
        return [];
      }
      const annotation = options.annotation;
      const { tagKeys = "", titleFormat = "", textFormat = "" } = annotation;
      const step = rangeUtil.intervalToSeconds(annotation.step || ANNOTATION_QUERY_STEP_DEFAULT) * 1e3;
      const tagKeysArray = tagKeys.split(",");
      const eventList = [];
      for (const frame of frames) {
        if (frame.fields.length === 0) {
          continue;
        }
        const timeField = frame.fields[0];
        const valueField = frame.fields[1];
        const labels = (valueField == null ? void 0 : valueField.labels) || {};
        const tags = Object.keys(labels).filter((label) => tagKeysArray.includes(label)).map((label) => labels[label]);
        const timeValueTuple = [];
        let idx = 0;
        valueField.values.forEach((value) => {
          let timeStampValue;
          let valueValue;
          const time = timeField.values[idx];
          if (options.annotation.useValueForTime) {
            timeStampValue = Math.floor(parseFloat(value));
            valueValue = 1;
          } else {
            timeStampValue = Math.floor(parseFloat(time));
            valueValue = parseFloat(value);
          }
          idx++;
          timeValueTuple.push([timeStampValue, valueValue]);
        });
        const activeValues = timeValueTuple.filter((value) => value[1] > 0);
        const activeValuesTimestamps = activeValues.map((value) => value[0]);
        let latestEvent = null;
        for (const timestamp of activeValuesTimestamps) {
          if (latestEvent && ((_a = latestEvent.timeEnd) != null ? _a : 0) + step >= timestamp) {
            latestEvent.timeEnd = timestamp;
            continue;
          }
          if (latestEvent) {
            eventList.push(latestEvent);
          }
          latestEvent = {
            time: timestamp,
            timeEnd: timestamp,
            annotation,
            title: renderLegendFormat(titleFormat, labels),
            tags,
            text: renderLegendFormat(textFormat, labels)
          };
        }
        if (latestEvent) {
          latestEvent.timeEnd = activeValuesTimestamps[activeValuesTimestamps.length - 1];
          eventList.push(latestEvent);
        }
      }
      return eventList;
    });
    this.type = "prometheus";
    this.id = instanceSettings.id;
    this.url = instanceSettings.url;
    this.access = instanceSettings.access;
    this.basicAuth = instanceSettings.basicAuth;
    this.withCredentials = Boolean(instanceSettings.withCredentials);
    this.interval = instanceSettings.jsonData.timeInterval || "15s";
    this.httpMethod = instanceSettings.jsonData.httpMethod || "GET";
    this.exemplarTraceIdDestinations = instanceSettings.jsonData.exemplarTraceIdDestinations;
    this.hasIncrementalQuery = (_a = instanceSettings.jsonData.incrementalQuerying) != null ? _a : false;
    this.ruleMappings = {};
    this.languageProvider = languageProvider != null ? languageProvider : new PromQlLanguageProvider(this);
    this.lookupsDisabled = (_b = instanceSettings.jsonData.disableMetricsLookup) != null ? _b : false;
    this.customQueryParameters = new URLSearchParams(instanceSettings.jsonData.customQueryParameters);
    this.datasourceConfigurationPrometheusFlavor = instanceSettings.jsonData.prometheusType;
    this.datasourceConfigurationPrometheusVersion = instanceSettings.jsonData.prometheusVersion;
    this.defaultEditor = instanceSettings.jsonData.defaultEditor;
    this.disableRecordingRules = (_c = instanceSettings.jsonData.disableRecordingRules) != null ? _c : false;
    this.variables = new PrometheusVariableSupport(this, this.templateSrv);
    this.exemplarsAvailable = true;
    this.cacheLevel = (_d = instanceSettings.jsonData.cacheLevel) != null ? _d : PrometheusCacheLevel.Low;
    this.metricNamesAutocompleteSuggestionLimit = (_e = instanceSettings.jsonData.codeModeMetricNamesSuggestionLimit) != null ? _e : SUGGESTIONS_LIMIT;
    this.cache = new QueryCache({
      getTargetSignature: this.getPrometheusTargetSignature.bind(this),
      overlapString: (_f = instanceSettings.jsonData.incrementalQueryOverlapWindow) != null ? _f : defaultPrometheusQueryOverlapWindow,
      profileFunction: this.getPrometheusProfileData.bind(this)
    });
    this.annotations = {
      QueryEditor: AnnotationQueryEditor
    };
  }
  getQueryDisplayText(query) {
    return query.expr;
  }
  getPrometheusProfileData(request, targ) {
    var _a;
    return {
      interval: (_a = targ.interval) != null ? _a : request.interval,
      expr: this.interpolateString(targ.expr),
      datasource: "Prometheus"
    };
  }
  /**
   * Get target signature for query caching
   * @param request
   * @param query
   */
  getPrometheusTargetSignature(request, query) {
    var _a, _b;
    const targExpr = this.interpolateString(query.expr);
    return `${targExpr}|${(_a = query.interval) != null ? _a : request.interval}|${JSON.stringify((_b = request.rangeRaw) != null ? _b : "")}|${query.exemplar}`;
  }
  hasLabelsMatchAPISupport() {
    return (
      // https://github.com/prometheus/prometheus/releases/tag/v2.24.0
      this._isDatasourceVersionGreaterOrEqualTo("2.24.0", PromApplication.Prometheus) || // All versions of Mimir support matchers for labels API
      this._isDatasourceVersionGreaterOrEqualTo("2.0.0", PromApplication.Mimir) || // https://github.com/cortexproject/cortex/discussions/4542
      this._isDatasourceVersionGreaterOrEqualTo("1.11.0", PromApplication.Cortex) || // https://github.com/thanos-io/thanos/pull/3566
      //https://github.com/thanos-io/thanos/releases/tag/v0.18.0
      this._isDatasourceVersionGreaterOrEqualTo("0.18.0", PromApplication.Thanos)
    );
  }
  _isDatasourceVersionGreaterOrEqualTo(targetVersion, targetFlavor) {
    if (!this.datasourceConfigurationPrometheusVersion || !this.datasourceConfigurationPrometheusFlavor) {
      return true;
    }
    if (targetFlavor !== this.datasourceConfigurationPrometheusFlavor) {
      return false;
    }
    return semver.gte(this.datasourceConfigurationPrometheusVersion, targetVersion);
  }
  _addTracingHeaders(httpOptions, options) {
    httpOptions.headers = {};
    if (this.access === "proxy") {
      httpOptions.headers["X-Dashboard-UID"] = options.dashboardUID;
      httpOptions.headers["X-Panel-Id"] = options.panelId;
    }
  }
  directAccessError() {
    return throwError(
      () => new Error(
        "Browser access mode in the Prometheus datasource is no longer available. Switch to server access mode."
      )
    );
  }
  /**
   * Any request done from this data source should go through here as it contains some common processing for the
   * request. Any processing done here needs to be also copied on the backend as this goes through data source proxy
   * but not through the same code as alerting.
   */
  _request(url, data, overrides = {}) {
    if (this.access === "direct") {
      return this.directAccessError();
    }
    data = data || {};
    for (const [key, value] of this.customQueryParameters) {
      if (data[key] == null) {
        data[key] = value;
      }
    }
    let queryUrl = this.url + url;
    if (url.startsWith(`/api/datasources/uid/${this.uid}`)) {
      queryUrl = url;
    }
    const options = defaults(overrides, {
      url: queryUrl,
      method: this.httpMethod,
      headers: {}
    });
    if (options.method === "GET") {
      if (data && Object.keys(data).length) {
        options.url = options.url + (options.url.search(/\?/) >= 0 ? "&" : "?") + Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
      }
    } else {
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      options.data = data;
    }
    if (this.basicAuth || this.withCredentials) {
      options.withCredentials = true;
    }
    if (this.basicAuth) {
      options.headers.Authorization = this.basicAuth;
    }
    return getBackendSrv().fetch(options);
  }
  async importFromAbstractQueries(abstractQueries) {
    return abstractQueries.map((abstractQuery) => this.languageProvider.importFromAbstractQuery(abstractQuery));
  }
  async exportToAbstractQueries(queries) {
    return queries.map((query) => this.languageProvider.exportToAbstractQuery(query));
  }
  // Use this for tab completion features, wont publish response to other components
  async metadataRequest(url, params = {}, options) {
    if (GET_AND_POST_METADATA_ENDPOINTS.some((endpoint) => url.includes(endpoint))) {
      try {
        return await lastValueFrom(
          this._request(`/api/datasources/uid/${this.uid}/resources${url}`, params, __spreadValues({
            method: this.httpMethod,
            hideFromInspector: true,
            showErrorAlert: false
          }, options))
        );
      } catch (err) {
        if (this.httpMethod === "POST" && isFetchError(err) && (err.status === 405 || err.status === 400)) {
          console.warn(`Couldn't use configured POST HTTP method for this request. Trying to use GET method instead.`);
        } else {
          throw err;
        }
      }
    }
    return await lastValueFrom(
      this._request(`/api/datasources/uid/${this.uid}/resources${url}`, params, __spreadValues({
        method: "GET",
        hideFromInspector: true
      }, options))
    );
  }
  interpolateQueryExpr(value = [], variable) {
    if (!variable.multi && !variable.includeAll) {
      return prometheusRegularEscape(value);
    }
    if (typeof value === "string") {
      return prometheusSpecialRegexEscape(value);
    }
    const escapedValues = value.map((val) => prometheusSpecialRegexEscape(val));
    if (escapedValues.length === 1) {
      return escapedValues[0];
    }
    return "(" + escapedValues.join("|") + ")";
  }
  targetContainsTemplate(target) {
    return this.templateSrv.containsTemplate(target.expr);
  }
  shouldRunExemplarQuery(target, request) {
    if (target.exemplar) {
      const metricName = this.languageProvider.histogramMetrics.find((m) => target.expr.includes(m));
      const currentTargetIdx = request.targets.findIndex((t) => t.refId === target.refId);
      const targets = request.targets.slice(0, currentTargetIdx).filter((t) => !t.hide);
      if (!metricName || metricName && !targets.some((t) => t.expr.includes(metricName))) {
        return true;
      }
      return false;
    }
    return false;
  }
  processTargetV2(target, request) {
    var _a;
    const processedTargets = [];
    const processedTarget = __spreadProps(__spreadValues({}, target), {
      exemplar: this.shouldRunExemplarQuery(target, request),
      requestId: request.panelId + target.refId,
      // We need to pass utcOffsetSec to backend to calculate aligned range
      utcOffsetSec: request.range.to.utcOffset() * 60
    });
    if (config.featureToggles.promQLScope) {
      processedTarget.scopes = ((_a = request.scopes) != null ? _a : []).map((scope) => __spreadValues({
        name: scope.metadata.name
      }, scope.spec));
    }
    if (config.featureToggles.groupByVariable) {
      processedTarget.groupByKeys = request.groupByKeys;
    }
    if (target.instant && target.range) {
      processedTargets.push(
        __spreadProps(__spreadValues({}, processedTarget), {
          refId: processedTarget.refId,
          instant: false
        }),
        __spreadProps(__spreadValues({}, processedTarget), {
          refId: processedTarget.refId + InstantQueryRefIdIndex,
          range: false
        })
      );
    } else {
      processedTargets.push(processedTarget);
    }
    return processedTargets;
  }
  query(request) {
    if (this.access === "direct") {
      return this.directAccessError();
    }
    let fullOrPartialRequest;
    let requestInfo = void 0;
    const hasInstantQuery = request.targets.some((target) => target.instant);
    if (this.hasIncrementalQuery && !hasInstantQuery) {
      requestInfo = this.cache.requestInfo(request);
      fullOrPartialRequest = requestInfo.requests[0];
    } else {
      fullOrPartialRequest = request;
    }
    const targets = fullOrPartialRequest.targets.map((target) => this.processTargetV2(target, fullOrPartialRequest));
    const startTime = /* @__PURE__ */ new Date();
    return super.query(__spreadProps(__spreadValues({}, fullOrPartialRequest), { targets: targets.flat() })).pipe(
      map((response) => {
        const amendedResponse = __spreadProps(__spreadValues({}, response), {
          data: this.cache.procFrames(request, requestInfo, response.data)
        });
        return transformV2(amendedResponse, request, {
          exemplarTraceIdDestinations: this.exemplarTraceIdDestinations
        });
      }),
      tap((response) => {
        trackQuery(response, request, startTime);
      })
    );
  }
  metricFindQuery(query, options) {
    var _a, _b;
    if (!query) {
      return Promise.resolve([]);
    }
    const scopedVars = __spreadValues({
      __interval: { text: this.interval, value: this.interval },
      __interval_ms: { text: rangeUtil.intervalToMs(this.interval), value: rangeUtil.intervalToMs(this.interval) }
    }, this.getRangeScopedVars((_a = options == null ? void 0 : options.range) != null ? _a : getDefaultTimeRange()));
    const interpolated = this.templateSrv.replace(query, scopedVars, this.interpolateQueryExpr);
    const metricFindQuery = new PrometheusMetricFindQuery(this, interpolated);
    return metricFindQuery.process((_b = options == null ? void 0 : options.range) != null ? _b : getDefaultTimeRange());
  }
  getRangeScopedVars(range) {
    const msRange = range.to.diff(range.from);
    const sRange = Math.round(msRange / 1e3);
    return {
      __range_ms: { text: msRange, value: msRange },
      __range_s: { text: sRange, value: sRange },
      __range: { text: sRange + "s", value: sRange + "s" }
    };
  }
  async annotationQuery(options) {
    if (this.access === "direct") {
      const error = new Error(
        "Browser access mode in the Prometheus datasource is no longer available. Switch to server access mode."
      );
      return Promise.reject(error);
    }
    const annotation = options.annotation;
    const { expr = "" } = annotation;
    if (!expr) {
      return Promise.resolve([]);
    }
    const step = options.annotation.step || ANNOTATION_QUERY_STEP_DEFAULT;
    const queryModel = {
      expr,
      range: true,
      instant: false,
      exemplar: false,
      interval: step,
      refId: "X",
      datasource: this.getRef()
    };
    return await lastValueFrom(
      getBackendSrv().fetch({
        url: "/api/ds/query",
        method: "POST",
        headers: this.getRequestHeaders(),
        data: {
          from: (getPrometheusTime(options.range.from, false) * 1e3).toString(),
          to: (getPrometheusTime(options.range.to, true) * 1e3).toString(),
          queries: [this.applyTemplateVariables(queryModel, {})]
        },
        requestId: `prom-query-${annotation.name}`
      }).pipe(
        map((rsp) => {
          return this.processAnnotationResponse(options, rsp.data);
        })
      )
    );
  }
  // By implementing getTagKeys and getTagValues we add ad-hoc filters functionality
  // this is used to get label keys, a.k.a label names
  // it is used in metric_find_query.ts
  // and in Tempo here grafana/public/app/plugins/datasource/tempo/QueryEditor/ServiceGraphSection.tsx
  async getTagKeys(options) {
    if (!options || options.filters.length === 0) {
      await this.languageProvider.fetchLabels(options.timeRange, options.queries);
      return this.languageProvider.getLabelKeys().map((k) => ({ value: k, text: k }));
    }
    const labelFilters = options.filters.map((f) => ({
      label: f.key,
      value: f.value,
      op: f.operator
    }));
    const expr = promQueryModeller.renderLabels(labelFilters);
    let labelsIndex = await this.languageProvider.fetchLabelsWithMatch(expr);
    return Object.keys(labelsIndex).filter((labelName) => !options.filters.find((filter) => filter.key === labelName)).map((k) => ({ value: k, text: k }));
  }
  // By implementing getTagKeys and getTagValues we add ad-hoc filters functionality
  async getTagValues(options) {
    var _a, _b, _c, _d;
    const labelFilters = options.filters.map((f) => ({
      label: f.key,
      value: f.value,
      op: f.operator
    }));
    const expr = promQueryModeller.renderLabels(labelFilters);
    if (this.hasLabelsMatchAPISupport()) {
      const requestId = `[${this.uid}][${options.key}]`;
      return (await this.languageProvider.fetchSeriesValuesWithMatch(options.key, expr, requestId, options.timeRange)).map((v) => ({
        value: v,
        text: v
      }));
    }
    const params = this.getTimeRangeParams((_a = options.timeRange) != null ? _a : getDefaultTimeRange());
    const result = await this.metadataRequest(`/api/v1/label/${options.key}/values`, params);
    return (_d = (_c = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.data) == null ? void 0 : _c.map((value) => ({ text: value }))) != null ? _d : [];
  }
  interpolateVariablesInQueries(queries, scopedVars, filters) {
    let expandedQueries = queries;
    if (queries && queries.length) {
      expandedQueries = queries.map((query) => {
        const interpolatedQuery = this.templateSrv.replace(query.expr, scopedVars, this.interpolateQueryExpr);
        const replacedInterpolatedQuery = config.featureToggles.promQLScope ? interpolatedQuery : this.templateSrv.replace(
          this.enhanceExprWithAdHocFilters(filters, interpolatedQuery),
          scopedVars,
          this.interpolateQueryExpr
        );
        const expandedQuery = __spreadProps(__spreadValues(__spreadValues({}, query), config.featureToggles.promQLScope ? { adhocFilters: this.generateScopeFilters(filters) } : {}), {
          datasource: this.getRef(),
          expr: replacedInterpolatedQuery,
          interval: this.templateSrv.replace(query.interval, scopedVars)
        });
        return expandedQuery;
      });
    }
    return expandedQueries;
  }
  getQueryHints(query, result) {
    var _a;
    return getQueryHints((_a = query.expr) != null ? _a : "", result, this);
  }
  getInitHints() {
    return getInitHints(this);
  }
  async loadRules() {
    var _a, _b;
    try {
      const res = await this.metadataRequest("/api/v1/rules", {}, { showErrorAlert: false });
      const groups = (_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.groups;
      if (groups) {
        this.ruleMappings = extractRuleMappingFromGroups(groups);
      }
    } catch (e) {
      console.log("Rules API is experimental. Ignore next error.");
      console.error(e);
    }
  }
  async areExemplarsAvailable() {
    try {
      const res = await this.metadataRequest(
        "/api/v1/query_exemplars",
        {
          query: "test",
          start: dateTime().subtract(30, "minutes").valueOf().toString(),
          end: dateTime().valueOf().toString()
        },
        {
          // Avoid alerting the user if this test fails
          showErrorAlert: false
        }
      );
      if (res.data.status === "success") {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  modifyQuery(query, action) {
    var _a, _b, _c;
    let expression = (_a = query.expr) != null ? _a : "";
    switch (action.type) {
      case "ADD_FILTER": {
        const { key, value } = (_b = action.options) != null ? _b : {};
        if (key && value) {
          expression = addLabelToQuery(expression, key, value);
        }
        break;
      }
      case "ADD_FILTER_OUT": {
        const { key, value } = (_c = action.options) != null ? _c : {};
        if (key && value) {
          expression = addLabelToQuery(expression, key, value, "!=");
        }
        break;
      }
      case "ADD_HISTOGRAM_QUANTILE": {
        expression = `histogram_quantile(0.95, sum(rate(${expression}[$__rate_interval])) by (le))`;
        break;
      }
      case "ADD_HISTOGRAM_AVG": {
        expression = `histogram_avg(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_FRACTION": {
        expression = `histogram_fraction(0,0.2,rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_COUNT": {
        expression = `histogram_count(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_SUM": {
        expression = `histogram_sum(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_STDDEV": {
        expression = `histogram_stddev(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_STDVAR": {
        expression = `histogram_stdvar(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_RATE": {
        expression = `rate(${expression}[$__rate_interval])`;
        break;
      }
      case "ADD_SUM": {
        expression = `sum(${expression.trim()}) by ($1)`;
        break;
      }
      case "EXPAND_RULES": {
        if (action.options) {
          expression = expandRecordingRules(expression, action.options);
        }
        break;
      }
    }
    return __spreadProps(__spreadValues({}, query), { expr: expression });
  }
  /**
   * Returns the adjusted "snapped" interval parameters
   */
  getAdjustedInterval(timeRange) {
    return getRangeSnapInterval(this.cacheLevel, timeRange);
  }
  /**
   * This will return a time range that always includes the users current time range,
   * and then a little extra padding to round up/down to the nearest nth minute,
   * defined by the result of the getCacheDurationInMinutes.
   *
   * For longer cache durations, and shorter query durations,
   * the window we're calculating might be much bigger then the user's current window,
   * resulting in us returning labels/values that might not be applicable for the given window,
   * this is a necessary trade-off if we want to cache larger durations
   */
  getTimeRangeParams(timeRange) {
    return {
      start: getPrometheusTime(timeRange.from, false).toString(),
      end: getPrometheusTime(timeRange.to, true).toString()
    };
  }
  getOriginalMetricName(labelData) {
    return getOriginalMetricName(labelData);
  }
  /**
   * This converts the adhocVariableFilter array and converts it to scopeFilter array
   * @param filters
   */
  generateScopeFilters(filters) {
    if (!filters) {
      return [];
    }
    return filters.map((f) => __spreadProps(__spreadValues({}, f), {
      value: this.templateSrv.replace(f.value, {}, this.interpolateQueryExpr),
      operator: scopeFilterOperatorMap[f.operator]
    }));
  }
  enhanceExprWithAdHocFilters(filters, expr) {
    if (!filters || filters.length === 0) {
      return expr;
    }
    const finalQuery = filters.reduce((acc, filter) => {
      const { key, operator } = filter;
      let { value } = filter;
      if (operator === "=~" || operator === "!~") {
        value = prometheusRegularEscape(value);
      }
      return addLabelToQuery(acc, key, value, operator);
    }, expr);
    return finalQuery;
  }
  // Used when running queries through backend
  filterQuery(query) {
    if (query.hide || !query.expr) {
      return false;
    }
    return true;
  }
  // Used when running queries through backend
  applyTemplateVariables(target, scopedVars, filters) {
    const variables = __spreadValues({}, scopedVars);
    variables.__interval = {
      value: "$__interval"
    };
    variables.__interval_ms = {
      value: "$__interval_ms"
    };
    const expr = this.templateSrv.replace(target.expr, variables, this.interpolateQueryExpr);
    const exprWithAdhoc = config.featureToggles.promQLScope ? expr : this.templateSrv.replace(this.enhanceExprWithAdHocFilters(filters, expr), variables, this.interpolateQueryExpr);
    return __spreadProps(__spreadValues(__spreadValues({}, target), config.featureToggles.promQLScope ? { adhocFilters: this.generateScopeFilters(filters) } : {}), {
      expr: exprWithAdhoc,
      interval: this.templateSrv.replace(target.interval, variables),
      legendFormat: this.templateSrv.replace(target.legendFormat, variables)
    });
  }
  getVariables() {
    return this.templateSrv.getVariables().map((v) => `$${v.name}`);
  }
  interpolateString(string, scopedVars) {
    return this.templateSrv.replace(string, scopedVars, this.interpolateQueryExpr);
  }
  getDebounceTimeInMilliseconds() {
    switch (this.cacheLevel) {
      case PrometheusCacheLevel.Medium:
        return 600;
      case PrometheusCacheLevel.High:
        return 1200;
      default:
        return 350;
    }
  }
  getDaysToCacheMetadata() {
    switch (this.cacheLevel) {
      case PrometheusCacheLevel.Medium:
        return 7;
      case PrometheusCacheLevel.High:
        return 30;
      default:
        return 1;
    }
  }
  getCacheDurationInMinutes() {
    return getClientCacheDurationInMinutes(this.cacheLevel);
  }
  getDefaultQuery(app) {
    const defaults2 = {
      refId: "A",
      expr: "",
      range: true,
      instant: false
    };
    if (app === CoreApp.UnifiedAlerting) {
      return __spreadProps(__spreadValues({}, defaults2), {
        instant: true,
        range: false
      });
    }
    if (app === CoreApp.Explore) {
      return __spreadProps(__spreadValues({}, defaults2), {
        instant: true,
        range: true
      });
    }
    return defaults2;
  }
}
function extractRuleMappingFromGroups(groups) {
  return groups.reduce(
    (mapping, group) => group.rules.filter((rule) => rule.type === "recording").reduce(
      (acc, rule) => __spreadProps(__spreadValues({}, acc), {
        [rule.name]: rule.query
      }),
      mapping
    ),
    {}
  );
}
function prometheusRegularEscape(value) {
  return typeof value === "string" ? value.replace(/\\/g, "\\\\").replace(/'/g, "\\\\'") : value;
}
function prometheusSpecialRegexEscape(value) {
  return typeof value === "string" ? value.replace(/\\/g, "\\\\\\\\").replace(/[$^*{}\[\]\'+?.()|]/g, "\\\\$&") : value;
}

export { InstantQueryRefIdIndex, PrometheusDatasource, extractRuleMappingFromGroups, prometheusRegularEscape, prometheusSpecialRegexEscape };
//# sourceMappingURL=datasource.js.map
