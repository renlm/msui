import { of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomVariableSupport, rangeUtil } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { PromVariableQueryEditor } from './components/VariableQueryEditor.js';
import { PrometheusMetricFindQuery } from './metric_find_query.js';

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
class PrometheusVariableSupport extends CustomVariableSupport {
  constructor(datasource, templateSrv = getTemplateSrv()) {
    super();
    this.datasource = datasource;
    this.templateSrv = templateSrv;
    __publicField(this, "editor", PromVariableQueryEditor);
  }
  query(request) {
    let query;
    if (typeof request.targets[0] === "string") {
      query = request.targets[0];
    } else {
      query = request.targets[0].query;
    }
    if (!query) {
      return of({ data: [] });
    }
    const scopedVars = __spreadValues(__spreadProps(__spreadValues({}, request.scopedVars), {
      __interval: { text: this.datasource.interval, value: this.datasource.interval },
      __interval_ms: {
        text: rangeUtil.intervalToMs(this.datasource.interval),
        value: rangeUtil.intervalToMs(this.datasource.interval)
      }
    }), this.datasource.getRangeScopedVars(request.range));
    const interpolated = this.templateSrv.replace(query, scopedVars, this.datasource.interpolateQueryExpr);
    const metricFindQuery = new PrometheusMetricFindQuery(this.datasource, interpolated);
    const metricFindStream = from(metricFindQuery.process(request.range));
    return metricFindStream.pipe(map((results) => ({ data: results })));
  }
}

export { PrometheusVariableSupport };
//# sourceMappingURL=variables.js.map
