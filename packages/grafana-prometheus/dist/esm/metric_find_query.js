import { map, uniq, chain } from 'lodash';
import { getDefaultTimeRange } from '@grafana/data';
import { getPrometheusTime } from './language_utils.js';
import { PrometheusLabelNamesRegex, PrometheusLabelNamesRegexWithMatch, PrometheusMetricNamesRegex, PrometheusQueryResultRegex } from './migrations/variableMigration.js';

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
class PrometheusMetricFindQuery {
  constructor(datasource, query) {
    this.datasource = datasource;
    this.query = query;
    __publicField(this, "range");
    this.datasource = datasource;
    this.query = query;
    this.range = getDefaultTimeRange();
  }
  process(timeRange) {
    this.range = timeRange;
    const labelNamesRegex = PrometheusLabelNamesRegex;
    const labelNamesRegexWithMatch = PrometheusLabelNamesRegexWithMatch;
    const labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
    const metricNamesRegex = PrometheusMetricNamesRegex;
    const queryResultRegex = PrometheusQueryResultRegex;
    const labelNamesQuery = this.query.match(labelNamesRegex);
    const labelNamesMatchQuery = this.query.match(labelNamesRegexWithMatch);
    if (labelNamesMatchQuery) {
      const selector = `{__name__=~".*${labelNamesMatchQuery[1]}.*"}`;
      return this.datasource.languageProvider.getSeriesLabels(selector, []).then(
        (results) => results.map((result) => ({
          text: result
        }))
      );
    }
    if (labelNamesQuery) {
      return this.datasource.getTagKeys({ filters: [], timeRange });
    }
    const labelValuesQuery = this.query.match(labelValuesRegex);
    if (labelValuesQuery) {
      const filter = labelValuesQuery[1];
      const label = labelValuesQuery[2];
      if (isFilterDefined(filter)) {
        return this.labelValuesQuery(label, filter);
      } else {
        return this.labelValuesQuery(label);
      }
    }
    const metricNamesQuery = this.query.match(metricNamesRegex);
    if (metricNamesQuery) {
      return this.metricNameQuery(metricNamesQuery[1]);
    }
    const queryResultQuery = this.query.match(queryResultRegex);
    if (queryResultQuery) {
      return this.queryResultQuery(queryResultQuery[1]);
    }
    const expressions = ["label_values()", "metrics()", "query_result()"];
    if (!expressions.includes(this.query)) {
      return this.metricNameAndLabelsQuery(this.query);
    }
    return Promise.resolve([]);
  }
  labelValuesQuery(label, metric) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = __spreadProps(__spreadValues({}, metric && { "match[]": metric }), { start: start.toString(), end: end.toString() });
    if (!metric || this.datasource.hasLabelsMatchAPISupport()) {
      const url = `/api/v1/label/${label}/values`;
      return this.datasource.metadataRequest(url, params).then((result) => {
        return map(result.data.data, (value) => {
          return { text: value };
        });
      });
    } else {
      const url = `/api/v1/series`;
      return this.datasource.metadataRequest(url, params).then((result) => {
        const _labels = map(result.data.data, (metric2) => {
          return metric2[label] || "";
        }).filter((label2) => {
          return label2 !== "";
        });
        return uniq(_labels).map((metric2) => {
          return {
            text: metric2,
            expandable: true
          };
        });
      });
    }
  }
  metricNameQuery(metricFilterPattern) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = {
      start: start.toString(),
      end: end.toString()
    };
    const url = `/api/v1/label/__name__/values`;
    return this.datasource.metadataRequest(url, params).then((result) => {
      return chain(result.data.data).filter((metricName) => {
        const r = new RegExp(metricFilterPattern);
        return r.test(metricName);
      }).map((matchedMetricName) => {
        return {
          text: matchedMetricName,
          expandable: true
        };
      }).value();
    });
  }
  queryResultQuery(query) {
    const url = "/api/v1/query";
    const params = {
      query,
      time: getPrometheusTime(this.range.to, true).toString()
    };
    return this.datasource.metadataRequest(url, params).then((result) => {
      switch (result.data.data.resultType) {
        case "scalar":
        case "string":
          return [
            {
              text: result.data.data.result[1] || "",
              expandable: false
            }
          ];
        case "vector":
          return map(result.data.data.result, (metricData) => {
            let text = metricData.metric.__name__ || "";
            delete metricData.metric.__name__;
            text += "{" + map(metricData.metric, (v, k) => {
              return k + '="' + v + '"';
            }).join(",") + "}";
            text += " " + metricData.value[1] + " " + metricData.value[0] * 1e3;
            return {
              text,
              expandable: true
            };
          });
        default:
          throw Error(`Unknown/Unhandled result type: [${result.data.data.resultType}]`);
      }
    });
  }
  metricNameAndLabelsQuery(query) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = {
      "match[]": query,
      start: start.toString(),
      end: end.toString()
    };
    const url = `/api/v1/series`;
    const self = this;
    return this.datasource.metadataRequest(url, params).then((result) => {
      return map(result.data.data, (metric) => {
        return {
          text: self.datasource.getOriginalMetricName(metric),
          expandable: true
        };
      });
    });
  }
}
function isFilterDefined(filter) {
  return filter && filter.split(" ").join("") !== "{}";
}

export { PrometheusMetricFindQuery };
//# sourceMappingURL=metric_find_query.js.map
