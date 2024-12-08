import { invert } from 'lodash';
import { Token } from 'prismjs';
import { AbstractLabelOperator, incrRoundDn, dateMath } from '@grafana/data';
import { addLabelToQuery } from './add_label_to_query.js';
import { SUGGESTIONS_LIMIT } from './language_provider.js';
import { PROMETHEUS_QUERY_BUILDER_MAX_RESULTS } from './querybuilder/components/MetricSelect.js';
import { PrometheusCacheLevel } from './types.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const processHistogramMetrics = (metrics) => {
  const resultSet = /* @__PURE__ */ new Set();
  const regexp = new RegExp("_bucket($|:)");
  for (let index = 0; index < metrics.length; index++) {
    const metric = metrics[index];
    const isHistogramValue = regexp.test(metric);
    if (isHistogramValue) {
      resultSet.add(metric);
    }
  }
  return [...resultSet];
};
function processLabels(labels, withName = false) {
  const valueSet = {};
  labels.forEach((label) => {
    const _a = label, { __name__ } = _a, rest = __objRest(_a, ["__name__"]);
    if (withName) {
      valueSet["__name__"] = valueSet["__name__"] || /* @__PURE__ */ new Set();
      if (!valueSet["__name__"].has(__name__)) {
        valueSet["__name__"].add(__name__);
      }
    }
    Object.keys(rest).forEach((key) => {
      if (!valueSet[key]) {
        valueSet[key] = /* @__PURE__ */ new Set();
      }
      if (!valueSet[key].has(rest[key])) {
        valueSet[key].add(rest[key]);
      }
    });
  });
  const valueArray = {};
  limitSuggestions(Object.keys(valueSet)).forEach((key) => {
    valueArray[key] = limitSuggestions(Array.from(valueSet[key]));
  });
  return { values: valueArray, keys: Object.keys(valueArray) };
}
const labelRegexp = /\b(\w+)(!?=~?)("[^"\n]*?")(,)?(\s*)?/g;
function expandRecordingRules(query, mapping) {
  const getRuleRegex = (ruleName) => new RegExp(`(\\s|\\(|^)(${ruleName})(\\s|$|\\(|\\[|\\{)`, "ig");
  const tmpSplitParts = Object.keys(mapping).reduce(
    (prev, curr) => {
      let parts = [];
      let tmpParts = [];
      let removeIdx = [];
      prev.filter(Boolean).forEach((p, i) => {
        const doesMatch = p.match(getRuleRegex(curr));
        if (doesMatch) {
          parts = p.split(curr);
          if (parts.length === 2) {
            removeIdx.push(i);
            tmpParts.push(...[parts[0], curr, parts[1]].filter(Boolean));
          } else if (parts.length > 2) {
            removeIdx.push(i);
            parts = parts.map((p2) => p2 === "" ? curr : p2);
            tmpParts.push(...parts);
          }
        }
      });
      removeIdx.forEach((ri) => prev[ri] = "");
      prev = prev.filter(Boolean);
      prev.push(...tmpParts);
      return prev;
    },
    [query]
  );
  let labelFound = false;
  const trulyExpandedQuery = tmpSplitParts.map((tsp, i) => {
    if (labelFound) {
      labelFound = false;
      return "";
    }
    if (mapping[tsp]) {
      const recordingRule = mapping[tsp];
      if (i + 1 !== tmpSplitParts.length && tmpSplitParts[i + 1].match(labelRegexp)) {
        labelFound = true;
        const labels = tmpSplitParts[i + 1];
        const invalidLabelsRegex = /(\)\{|\}\{|\]\{)/;
        return addLabelsToExpression(recordingRule + labels, invalidLabelsRegex);
      } else {
        return recordingRule;
      }
    }
    return tsp;
  });
  return trulyExpandedQuery.filter(Boolean).join("");
}
function addLabelsToExpression(expr, invalidLabelsRegexp) {
  var _a;
  const match = expr.match(invalidLabelsRegexp);
  if (!match) {
    return expr;
  }
  const indexOfRegexMatch = (_a = match.index) != null ? _a : 0;
  const exprBeforeRegexMatch = expr.slice(0, indexOfRegexMatch + 1);
  const exprAfterRegexMatch = expr.slice(indexOfRegexMatch + 1);
  const arrayOfLabelObjects = [];
  exprAfterRegexMatch.replace(labelRegexp, (label, key, operator, value, comma, space) => {
    arrayOfLabelObjects.push({ key, operator, value, comma, space });
    return "";
  });
  let result = exprBeforeRegexMatch;
  arrayOfLabelObjects.filter(Boolean).forEach((obj) => {
    const value = obj.value.slice(1, -1);
    result = addLabelToQuery(result, obj.key, value, obj.operator);
  });
  let existingLabel = arrayOfLabelObjects.reduce((prev, curr) => {
    var _a2, _b;
    prev += `${curr.key}${curr.operator}${curr.value}${(_a2 = curr.comma) != null ? _a2 : ""}${(_b = curr.space) != null ? _b : ""}`;
    return prev;
  }, "");
  existingLabel = "{" + existingLabel + "}";
  const potentialLeftOver = exprAfterRegexMatch.replace(existingLabel, "");
  return result + potentialLeftOver;
}
function fixSummariesMetadata(metadata) {
  if (!metadata) {
    return metadata;
  }
  const baseMetadata = {};
  const summaryMetadata = {};
  for (const metric in metadata) {
    const item = metadata[metric][0];
    baseMetadata[metric] = item;
    if (item.type === "histogram") {
      summaryMetadata[`${metric}_bucket`] = {
        type: "counter",
        help: `Cumulative counters for the observation buckets (${item.help})`
      };
      summaryMetadata[`${metric}_count`] = {
        type: "counter",
        help: `Count of events that have been observed for the histogram metric (${item.help})`
      };
      summaryMetadata[`${metric}_sum`] = {
        type: "counter",
        help: `Total sum of all observed values for the histogram metric (${item.help})`
      };
    }
    if (item.type === "summary") {
      summaryMetadata[`${metric}_count`] = {
        type: "counter",
        help: `Count of events that have been observed for the base metric (${item.help})`
      };
      summaryMetadata[`${metric}_sum`] = {
        type: "counter",
        help: `Total sum of all observed values for the base metric (${item.help})`
      };
    }
  }
  const syntheticMetadata = {};
  syntheticMetadata["ALERTS"] = {
    type: "counter",
    help: "Time series showing pending and firing alerts. The sample value is set to 1 as long as the alert is in the indicated active (pending or firing) state."
  };
  return __spreadValues(__spreadValues(__spreadValues({}, baseMetadata), summaryMetadata), syntheticMetadata);
}
function roundMsToMin(milliseconds) {
  return roundSecToMin(milliseconds / 1e3);
}
function roundSecToMin(seconds) {
  return Math.floor(seconds / 60);
}
function roundSecToNextMin(seconds, secondsToRound = 1) {
  return Math.ceil(seconds / 60) - Math.ceil(seconds / 60) % secondsToRound;
}
function limitSuggestions(items) {
  return items.slice(0, SUGGESTIONS_LIMIT);
}
const RE2_METACHARACTERS = /[*+?()|\\.\[\]{}^$]/g;
function escapePrometheusRegexp(value) {
  return value.replace(RE2_METACHARACTERS, "\\$&");
}
function escapeLabelValueInExactSelector(labelValue) {
  return labelValue.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/"/g, '\\"');
}
function escapeLabelValueInRegexSelector(labelValue) {
  return escapeLabelValueInExactSelector(escapePrometheusRegexp(labelValue));
}
const FromPromLikeMap = {
  "=": AbstractLabelOperator.Equal,
  "!=": AbstractLabelOperator.NotEqual,
  "=~": AbstractLabelOperator.EqualRegEx,
  "!~": AbstractLabelOperator.NotEqualRegEx
};
const ToPromLikeMap = invert(FromPromLikeMap);
function toPromLikeExpr(labelBasedQuery) {
  const expr = labelBasedQuery.labelMatchers.map((selector) => {
    const operator = ToPromLikeMap[selector.operator];
    if (operator) {
      return `${selector.name}${operator}"${selector.value}"`;
    } else {
      return "";
    }
  }).filter((e) => e !== "").join(", ");
  return expr ? `{${expr}}` : "";
}
function toPromLikeQuery(labelBasedQuery) {
  return {
    refId: labelBasedQuery.refId,
    expr: toPromLikeExpr(labelBasedQuery),
    range: true
  };
}
function getMaybeTokenStringContent(token) {
  if (typeof token.content === "string") {
    return token.content;
  }
  return "";
}
function extractLabelMatchers(tokens) {
  const labelMatchers = [];
  for (const token of tokens) {
    if (!(token instanceof Token)) {
      continue;
    }
    if (token.type === "context-labels") {
      let labelKey = "";
      let labelValue = "";
      let labelOperator = "";
      const contentTokens = Array.isArray(token.content) ? token.content : [token.content];
      for (let currentToken of contentTokens) {
        if (typeof currentToken === "string") {
          let currentStr;
          currentStr = currentToken;
          if (currentStr === "=" || currentStr === "!=" || currentStr === "=~" || currentStr === "!~") {
            labelOperator = currentStr;
          }
        } else if (currentToken instanceof Token) {
          switch (currentToken.type) {
            case "label-key":
              labelKey = getMaybeTokenStringContent(currentToken);
              break;
            case "label-value":
              labelValue = getMaybeTokenStringContent(currentToken);
              labelValue = labelValue.substring(1, labelValue.length - 1);
              const labelComparator = FromPromLikeMap[labelOperator];
              if (labelComparator) {
                labelMatchers.push({ name: labelKey, operator: labelComparator, value: labelValue });
              }
              break;
          }
        }
      }
    }
  }
  return labelMatchers;
}
function getRangeSnapInterval(cacheLevel, range) {
  if (cacheLevel === PrometheusCacheLevel.None) {
    return {
      start: getPrometheusTime(range.from, false).toString(),
      end: getPrometheusTime(range.to, true).toString()
    };
  }
  const startTime = getPrometheusTime(range.from, false);
  const startTimeQuantizedSeconds = incrRoundDn(startTime, getClientCacheDurationInMinutes(cacheLevel) * 60);
  const endTime = getPrometheusTime(range.to, true);
  const endTimeQuantizedSeconds = roundSecToNextMin(endTime, getClientCacheDurationInMinutes(cacheLevel)) * 60;
  if (startTimeQuantizedSeconds === endTimeQuantizedSeconds) {
    const endTimePlusOneStep = endTimeQuantizedSeconds + getClientCacheDurationInMinutes(cacheLevel) * 60;
    return { start: startTimeQuantizedSeconds.toString(), end: endTimePlusOneStep.toString() };
  }
  const start = startTimeQuantizedSeconds.toString();
  const end = endTimeQuantizedSeconds.toString();
  return { start, end };
}
function getClientCacheDurationInMinutes(cacheLevel) {
  switch (cacheLevel) {
    case PrometheusCacheLevel.Medium:
      return 10;
    case PrometheusCacheLevel.High:
      return 60;
    default:
      return 1;
  }
}
function getPrometheusTime(date, roundUp) {
  if (typeof date === "string") {
    date = dateMath.parse(date, roundUp);
  }
  return Math.ceil(date.valueOf() / 1e3);
}
function truncateResult(array, limit) {
  if (limit === void 0) {
    limit = PROMETHEUS_QUERY_BUILDER_MAX_RESULTS;
  }
  array.length = Math.min(array.length, limit);
  return array;
}

export { escapeLabelValueInExactSelector, escapeLabelValueInRegexSelector, expandRecordingRules, extractLabelMatchers, fixSummariesMetadata, getClientCacheDurationInMinutes, getPrometheusTime, getRangeSnapInterval, labelRegexp, limitSuggestions, processHistogramMetrics, processLabels, roundMsToMin, roundSecToMin, roundSecToNextMin, toPromLikeExpr, toPromLikeQuery, truncateResult };
//# sourceMappingURL=language_utils.js.map
