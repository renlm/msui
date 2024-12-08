import { of, lastValueFrom, merge } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { makeClassES5Compatible, DataSourceApi, getDataSourceRef, parseLiveChannelAddress, dataFrameToJSON, StreamingFrameAction } from '@grafana/data';
import { config } from '../config.js';
import { getBackendSrv } from '../services/backendSrv.js';
import { getDataSourceSrv } from '../services/dataSourceSrv.js';
import { getGrafanaLiveSrv } from '../services/live.js';
import '../services/LocationService.js';
import '../services/appEvents.js';
import 'react';
import { publicDashboardQueryHandler } from './publicDashboardQueryHandler.js';
import { toDataQueryResponse } from './queryResponse.js';

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
const ExpressionDatasourceRef = Object.freeze({
  type: "__expr__",
  uid: "__expr__",
  name: "Expression"
});
function isExpressionReference(ref) {
  if (!ref) {
    return false;
  }
  const v = typeof ref === "string" ? ref : ref.type;
  return v === ExpressionDatasourceRef.type || v === ExpressionDatasourceRef.name || v === "-100";
}
class HealthCheckError extends Error {
  constructor(message, details) {
    super(message);
    __publicField(this, "details");
    this.details = details;
    this.name = "HealthCheckError";
  }
}
var HealthStatus = /* @__PURE__ */ ((HealthStatus2) => {
  HealthStatus2["Unknown"] = "UNKNOWN";
  HealthStatus2["OK"] = "OK";
  HealthStatus2["Error"] = "ERROR";
  return HealthStatus2;
})(HealthStatus || {});
class DataSourceWithBackend extends DataSourceApi {
  constructor(instanceSettings) {
    super(instanceSettings);
    /**
     * Optionally override the streaming behavior
     */
    __publicField(this, "streamOptionsProvider", standardStreamOptionsProvider);
  }
  /**
   * Ideally final -- any other implementation may not work as expected
   */
  query(request) {
    if (config.publicDashboardAccessToken) {
      return publicDashboardQueryHandler(request);
    }
    const { intervalMs, maxDataPoints, queryCachingTTL, range, requestId, hideFromInspector = false } = request;
    let targets = request.targets;
    let hasExpr = false;
    const pluginIDs = /* @__PURE__ */ new Set();
    const dsUIDs = /* @__PURE__ */ new Set();
    const queries = targets.map((q) => {
      var _a, _b, _c;
      let datasource = this.getRef();
      let datasourceId = this.id;
      let shouldApplyTemplateVariables = true;
      if (isExpressionReference(q.datasource)) {
        hasExpr = true;
        return __spreadProps(__spreadValues({}, q), {
          datasource: ExpressionDatasourceRef
        });
      }
      if (q.datasource) {
        const ds = getDataSourceSrv().getInstanceSettings(q.datasource, request.scopedVars);
        if (!ds) {
          throw new Error(`Unknown Datasource: ${JSON.stringify(q.datasource)}`);
        }
        const dsRef = (_a = ds.rawRef) != null ? _a : getDataSourceRef(ds);
        const dsId = ds.id;
        if (dsRef.uid !== datasource.uid || datasourceId !== dsId) {
          datasource = dsRef;
          datasourceId = dsId;
          shouldApplyTemplateVariables = false;
        }
      }
      if ((_b = datasource.type) == null ? void 0 : _b.length) {
        pluginIDs.add(datasource.type);
      }
      if ((_c = datasource.uid) == null ? void 0 : _c.length) {
        dsUIDs.add(datasource.uid);
      }
      return __spreadProps(__spreadValues({}, shouldApplyTemplateVariables ? this.applyTemplateVariables(q, request.scopedVars, request.filters) : q), {
        datasource,
        datasourceId,
        // deprecated!
        intervalMs,
        maxDataPoints,
        queryCachingTTL
      });
    });
    if (!queries.length) {
      return of({ data: [] });
    }
    const body = {
      queries,
      from: range == null ? void 0 : range.from.valueOf().toString(),
      to: range == null ? void 0 : range.to.valueOf().toString()
    };
    if (config.featureToggles.queryOverLive) {
      return getGrafanaLiveSrv().getQueryData({
        request,
        body
      });
    }
    const headers = {};
    headers["X-Plugin-Id" /* PluginID */] = Array.from(pluginIDs).join(", ");
    headers["X-Datasource-Uid" /* DatasourceUID */] = Array.from(dsUIDs).join(", ");
    let url = "/api/ds/query?ds_type=" + this.type;
    if (config.featureToggles.queryServiceFromUI) {
      if (!(config.featureToggles.queryService || config.featureToggles.grafanaAPIServerWithExperimentalAPIs)) {
        console.warn("feature toggle queryServiceFromUI also requires the queryService to be running");
      } else {
        if (!hasExpr && dsUIDs.size === 1) ;
        url = `/apis/query.grafana.app/v0alpha1/namespaces/${config.namespace}/query?ds_type=' + this.type`;
      }
    }
    if (hasExpr) {
      headers["X-Grafana-From-Expr" /* FromExpression */] = "true";
      url += "&expression=true";
    }
    if (requestId) {
      url += `&requestId=${requestId}`;
    }
    if (request.dashboardUID) {
      headers["X-Dashboard-Uid" /* DashboardUID */] = request.dashboardUID;
    }
    if (request.panelId) {
      headers["X-Panel-Id" /* PanelID */] = `${request.panelId}`;
    }
    if (request.panelPluginId) {
      headers["X-Panel-Plugin-Id" /* PanelPluginId */] = `${request.panelPluginId}`;
    }
    if (request.queryGroupId) {
      headers["X-Query-Group-Id" /* QueryGroupID */] = `${request.queryGroupId}`;
    }
    if (request.skipQueryCache) {
      headers["X-Cache-Skip" /* SkipQueryCache */] = "true";
    }
    return getBackendSrv().fetch({
      url,
      method: "POST",
      data: body,
      requestId,
      hideFromInspector,
      headers
    }).pipe(
      switchMap((raw) => {
        var _a;
        const rsp = toDataQueryResponse(raw, queries);
        if (((_a = rsp.data) == null ? void 0 : _a.length) && rsp.data.find((f) => {
          var _a2;
          return (_a2 = f.meta) == null ? void 0 : _a2.channel;
        })) {
          return toStreamingDataResponse(rsp, request, this.streamOptionsProvider);
        }
        return of(rsp);
      }),
      catchError((err) => {
        return of(toDataQueryResponse(err));
      })
    );
  }
  /** Get request headers with plugin ID+UID set */
  getRequestHeaders() {
    const headers = {};
    headers["X-Plugin-Id" /* PluginID */] = this.type;
    headers["X-Datasource-Uid" /* DatasourceUID */] = this.uid;
    return headers;
  }
  /**
   * Apply template variables for explore
   */
  interpolateVariablesInQueries(queries, scopedVars, filters) {
    return queries.map((q) => this.applyTemplateVariables(q, scopedVars, filters));
  }
  /**
   * Override to apply template variables and adhoc filters.  The result is usually also `TQuery`, but sometimes this can
   * be used to modify the query structure before sending to the backend.
   *
   * NOTE: if you do modify the structure or use template variables, alerting queries may not work
   * as expected
   *
   * @virtual
   */
  applyTemplateVariables(query, scopedVars, filters) {
    return query;
  }
  /**
   * Make a GET request to the datasource resource path
   */
  async getResource(path, params, options) {
    const headers = this.getRequestHeaders();
    const result = await lastValueFrom(
      getBackendSrv().fetch(__spreadProps(__spreadValues({}, options), {
        method: "GET",
        headers: (options == null ? void 0 : options.headers) ? __spreadValues(__spreadValues({}, options.headers), headers) : headers,
        params: params != null ? params : options == null ? void 0 : options.params,
        url: `/api/datasources/uid/${this.uid}/resources/${path}`
      }))
    );
    return result.data;
  }
  /**
   * Send a POST request to the datasource resource path
   */
  async postResource(path, data, options) {
    const headers = this.getRequestHeaders();
    const result = await lastValueFrom(
      getBackendSrv().fetch(__spreadProps(__spreadValues({}, options), {
        method: "POST",
        headers: (options == null ? void 0 : options.headers) ? __spreadValues(__spreadValues({}, options.headers), headers) : headers,
        data: data != null ? data : __spreadValues({}, data),
        url: `/api/datasources/uid/${this.uid}/resources/${path}`
      }))
    );
    return result.data;
  }
  /**
   * Run the datasource healthcheck
   */
  async callHealthCheck() {
    return lastValueFrom(
      getBackendSrv().fetch({
        method: "GET",
        url: `/api/datasources/uid/${this.uid}/health`,
        showErrorAlert: false,
        headers: this.getRequestHeaders()
      })
    ).then((v) => v.data).catch((err) => err.data);
  }
  /**
   * Checks the plugin health
   * see public/app/features/datasources/state/actions.ts for what needs to be returned here
   */
  async testDatasource() {
    return this.callHealthCheck().then((res) => {
      if (res.status === "OK" /* OK */) {
        return {
          status: "success",
          message: res.message
        };
      }
      return Promise.reject({
        status: "error",
        message: res.message,
        error: new HealthCheckError(res.message, res.details)
      });
    });
  }
}
function toStreamingDataResponse(rsp, req, getter) {
  var _a;
  const live = getGrafanaLiveSrv();
  if (!live) {
    return of(rsp);
  }
  const staticdata = [];
  const streams = [];
  for (const f of rsp.data) {
    const addr = parseLiveChannelAddress((_a = f.meta) == null ? void 0 : _a.channel);
    if (addr) {
      const frame = f;
      streams.push(
        live.getDataStream({
          addr,
          buffer: getter(req, frame),
          frame: dataFrameToJSON(f)
        })
      );
    } else {
      staticdata.push(f);
    }
  }
  if (staticdata.length) {
    streams.push(of(__spreadProps(__spreadValues({}, rsp), { data: staticdata })));
  }
  if (streams.length === 1) {
    return streams[0];
  }
  return merge(...streams);
}
const standardStreamOptionsProvider = (request, frame) => {
  var _a, _b;
  const opts = {
    maxLength: (_a = request.maxDataPoints) != null ? _a : 500,
    action: StreamingFrameAction.Append
  };
  if (((_b = request.rangeRaw) == null ? void 0 : _b.to) === "now") {
    opts.maxDelta = request.range.to.valueOf() - request.range.from.valueOf();
  }
  return opts;
};
DataSourceWithBackend = makeClassES5Compatible(DataSourceWithBackend);

export { DataSourceWithBackend, ExpressionDatasourceRef, HealthCheckError, HealthStatus, isExpressionReference, standardStreamOptionsProvider, toStreamingDataResponse };
//# sourceMappingURL=DataSourceWithBackend.js.map
