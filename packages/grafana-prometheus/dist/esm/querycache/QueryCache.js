import { isValidDuration, parseDuration, durationToMilliseconds, dateTime, incrRoundDn } from '@grafana/data';
import { faro } from '@grafana/faro-web-sdk';
import { config, reportInteraction } from '@grafana/runtime';
import { amendTable, trimTable } from '../gcopypaste/app/features/live/data/amendTimeSeries.js';

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
const defaultPrometheusQueryOverlapWindow = "10m";
const getFieldIdent = (field) => {
  var _a;
  return `${field.type}|${field.name}|${JSON.stringify((_a = field.labels) != null ? _a : "")}`;
};
class QueryCache {
  constructor(options) {
    __publicField(this, "overlapWindowMs");
    __publicField(this, "getTargetSignature");
    __publicField(this, "getProfileData");
    __publicField(this, "perfObeserver");
    __publicField(this, "shouldProfile");
    // send profile events every 10 minutes
    __publicField(this, "sendEventsInterval", 6e4 * 10);
    __publicField(this, "pendingRequestIdsToTargSigs", /* @__PURE__ */ new Map());
    __publicField(this, "pendingAccumulatedEvents", /* @__PURE__ */ new Map());
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    __publicField(this, "sendPendingTrackingEvents", () => {
      const entries = this.pendingAccumulatedEvents.entries();
      for (let [key, value] of entries) {
        if (!value.sent) {
          const event = {
            datasource: value.datasource.toString(),
            requestCount: value.requestCount.toString(),
            savedBytesTotal: value.savedBytesTotal.toString(),
            initialRequestSize: value.initialRequestSize.toString(),
            lastRequestSize: value.lastRequestSize.toString(),
            panelId: value.panelId.toString(),
            dashId: value.dashId.toString(),
            expr: value.expr.toString(),
            refreshIntervalMs: value.refreshIntervalMs.toString(),
            from: value.from.toString(),
            queryRangeSeconds: value.queryRangeSeconds.toString()
          };
          if (config.featureToggles.prometheusIncrementalQueryInstrumentation) {
            reportInteraction("grafana_incremental_queries_profile", event);
          } else if (faro.api.pushEvent) {
            faro.api.pushEvent("incremental query response size", event, "no-interaction", {
              skipDedupe: true
            });
          }
          this.pendingAccumulatedEvents.set(key, __spreadProps(__spreadValues({}, value), {
            sent: true,
            requestCount: 0,
            savedBytesTotal: 0,
            initialRequestSize: 0,
            lastRequestSize: 0
          }));
        }
      }
    });
    var _a;
    const unverifiedOverlap = options.overlapString;
    if (isValidDuration(unverifiedOverlap)) {
      const duration = parseDuration(unverifiedOverlap);
      this.overlapWindowMs = durationToMilliseconds(duration);
    } else {
      const duration = parseDuration(defaultPrometheusQueryOverlapWindow);
      this.overlapWindowMs = durationToMilliseconds(duration);
    }
    if ((config.grafanaJavascriptAgent.enabled || ((_a = config.featureToggles) == null ? void 0 : _a.prometheusIncrementalQueryInstrumentation)) && options.profileFunction !== void 0) {
      this.profile();
      this.shouldProfile = true;
    } else {
      this.shouldProfile = false;
    }
    this.getProfileData = options.profileFunction;
    this.getTargetSignature = options.getTargetSignature;
  }
  profile() {
    if (typeof PerformanceObserver === "function") {
      this.perfObeserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          const entryTypeCast = entry;
          const isSupported = typeof (entryTypeCast == null ? void 0 : entryTypeCast.transferSize) === "number";
          if ((entryTypeCast == null ? void 0 : entryTypeCast.initiatorType) === "fetch" && isSupported) {
            let fetchUrl = entryTypeCast.name;
            if (fetchUrl.includes("/api/ds/query")) {
              let match = fetchUrl.match(/requestId=([a-z\d]+)/i);
              if (match) {
                let requestId = match[1];
                const requestTransferSize = Math.round(entryTypeCast.transferSize);
                const currentRequest = this.pendingRequestIdsToTargSigs.get(requestId);
                if (currentRequest) {
                  const entries = this.pendingRequestIdsToTargSigs.entries();
                  for (let [, value] of entries) {
                    if (value.identity === currentRequest.identity && value.bytes !== null) {
                      const previous = this.pendingAccumulatedEvents.get(value.identity);
                      const savedBytes = value.bytes - requestTransferSize;
                      this.pendingAccumulatedEvents.set(value.identity, {
                        datasource: (_a = value.datasource) != null ? _a : "N/A",
                        requestCount: ((_b = previous == null ? void 0 : previous.requestCount) != null ? _b : 0) + 1,
                        savedBytesTotal: ((_c = previous == null ? void 0 : previous.savedBytesTotal) != null ? _c : 0) + savedBytes,
                        initialRequestSize: value.bytes,
                        lastRequestSize: requestTransferSize,
                        panelId: (_e = (_d = currentRequest.panelId) == null ? void 0 : _d.toString()) != null ? _e : "",
                        dashId: (_f = currentRequest.dashboardUID) != null ? _f : "",
                        expr: (_g = currentRequest.expr) != null ? _g : "",
                        refreshIntervalMs: (_h = currentRequest.refreshIntervalMs) != null ? _h : 0,
                        sent: false,
                        from: (_i = currentRequest.from) != null ? _i : "",
                        queryRangeSeconds: (_j = currentRequest.queryRangeSeconds) != null ? _j : 0
                      });
                      this.pendingRequestIdsToTargSigs.delete(requestId);
                      return;
                    }
                  }
                  this.pendingRequestIdsToTargSigs.set(requestId, __spreadProps(__spreadValues({}, currentRequest), { bytes: requestTransferSize }));
                }
              }
            }
          }
        });
      });
      this.perfObeserver.observe({ type: "resource", buffered: false });
      setInterval(this.sendPendingTrackingEvents, this.sendEventsInterval);
      window.addEventListener("beforeunload", this.sendPendingTrackingEvents);
    }
  }
  // can be used to change full range request to partial, split into multiple requests
  requestInfo(request) {
    var _a, _b, _c;
    const newFrom = request.range.from.valueOf();
    const newTo = request.range.to.valueOf();
    const shouldCache = ((_b = (_a = request.rangeRaw) == null ? void 0 : _a.to) == null ? void 0 : _b.toString()) === "now";
    let doPartialQuery = shouldCache;
    let prevTo = void 0;
    const refreshIntervalMs = request.intervalMs;
    const reqTargSigs = /* @__PURE__ */ new Map();
    request.targets.forEach((targ) => {
      var _a2, _b2, _c2, _d;
      let targIdent = `${request.dashboardUID}|${request.panelId}|${targ.refId}`;
      let targSig = this.getTargetSignature(request, targ);
      if (this.shouldProfile && this.getProfileData) {
        this.pendingRequestIdsToTargSigs.set(request.requestId, __spreadProps(__spreadValues({}, this.getProfileData(request, targ)), {
          identity: targIdent + "|" + targSig,
          bytes: null,
          panelId: request.panelId,
          dashboardUID: (_a2 = request.dashboardUID) != null ? _a2 : "",
          from: (_c2 = (_b2 = request.rangeRaw) == null ? void 0 : _b2.from.toString()) != null ? _c2 : "",
          queryRangeSeconds: (_d = request.range.to.diff(request.range.from, "seconds")) != null ? _d : "",
          refreshIntervalMs: refreshIntervalMs != null ? refreshIntervalMs : 0
        }));
      }
      reqTargSigs.set(targIdent, targSig);
    });
    for (const [targIdent, targSig] of reqTargSigs) {
      let cached = this.cache.get(targIdent);
      let cachedSig = cached == null ? void 0 : cached.sig;
      if (cachedSig !== targSig) {
        doPartialQuery = false;
      } else {
        prevTo = (_c = cached == null ? void 0 : cached.prevTo) != null ? _c : Infinity;
        doPartialQuery = newTo > prevTo && newFrom <= prevTo;
      }
      if (!doPartialQuery) {
        break;
      }
    }
    if (doPartialQuery && prevTo) {
      let newFromPartial = Math.max(prevTo - this.overlapWindowMs, newFrom);
      const newToDate = dateTime(newTo);
      const newFromPartialDate = dateTime(incrRoundDn(newFromPartial, request.intervalMs));
      request = __spreadProps(__spreadValues({}, request), {
        range: __spreadProps(__spreadValues({}, request.range), {
          from: newFromPartialDate,
          to: newToDate
        })
      });
    } else {
      reqTargSigs.forEach((targSig, targIdent) => {
        this.cache.delete(targIdent);
      });
    }
    return {
      requests: [request],
      targSigs: reqTargSigs,
      shouldCache
    };
  }
  // should amend existing cache with new frames and return full response
  procFrames(request, requestInfo, respFrames) {
    if (requestInfo == null ? void 0 : requestInfo.shouldCache) {
      const newFrom = request.range.from.valueOf();
      const newTo = request.range.to.valueOf();
      const respByTarget = /* @__PURE__ */ new Map();
      respFrames.forEach((frame) => {
        let targIdent = `${request.dashboardUID}|${request.panelId}|${frame.refId}`;
        let frames = respByTarget.get(targIdent);
        if (!frames) {
          frames = [];
          respByTarget.set(targIdent, frames);
        }
        frames.push(frame);
      });
      let outFrames = [];
      respByTarget.forEach((respFrames2, targIdent) => {
        var _a, _b;
        let cachedFrames = (_b = targIdent ? (_a = this.cache.get(targIdent)) == null ? void 0 : _a.frames : null) != null ? _b : [];
        respFrames2.forEach((respFrame) => {
          if (respFrame.length === 0 || respFrame.fields.length === 0) {
            return;
          }
          let respFrameIdent = getFieldIdent(respFrame.fields[1]);
          let cachedFrame = cachedFrames.find((cached) => getFieldIdent(cached.fields[1]) === respFrameIdent);
          if (!cachedFrame) {
            cachedFrames.push(respFrame);
          } else {
            let prevTable = cachedFrame.fields.map((field) => field.values);
            let nextTable = respFrame.fields.map((field) => field.values);
            let amendedTable = amendTable(prevTable, nextTable);
            if (amendedTable) {
              for (let i = 0; i < amendedTable.length; i++) {
                cachedFrame.fields[i].values = amendedTable[i];
              }
              cachedFrame.length = cachedFrame.fields[0].values.length;
            }
          }
        });
        let nonEmptyCachedFrames = [];
        cachedFrames.forEach((frame) => {
          let table = frame.fields.map((field) => field.values);
          let trimmed = trimTable(table, newFrom, newTo);
          if (trimmed[0].length > 0) {
            for (let i = 0; i < trimmed.length; i++) {
              frame.fields[i].values = trimmed[i];
            }
            nonEmptyCachedFrames.push(frame);
          }
        });
        this.cache.set(targIdent, {
          sig: requestInfo.targSigs.get(targIdent),
          frames: nonEmptyCachedFrames,
          prevTo: newTo
        });
        outFrames.push(...nonEmptyCachedFrames);
      });
      respFrames = outFrames.map((frame) => __spreadProps(__spreadValues({}, frame), {
        fields: frame.fields.map((field) => __spreadProps(__spreadValues({}, field), {
          config: __spreadValues({}, field.config),
          values: field.values.slice()
        }))
      }));
    }
    return respFrames;
  }
}

export { QueryCache, defaultPrometheusQueryOverlapWindow, getFieldIdent };
//# sourceMappingURL=QueryCache.js.map
