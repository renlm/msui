import { capitalize } from 'lodash';
import pluralize from 'pluralize';
import { LabelParamEditor } from './components/LabelParamEditor.js';
import { PromVisualQueryOperationCategory } from './types.js';

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
function functionRendererLeft(model, def, innerExpr) {
  const params = renderParams(model, def);
  const str = model.id + "(";
  if (innerExpr) {
    params.push(innerExpr);
  }
  return str + params.join(", ") + ")";
}
function functionRendererRight(model, def, innerExpr) {
  const params = renderParams(model, def);
  const str = model.id + "(";
  if (innerExpr) {
    params.unshift(innerExpr);
  }
  return str + params.join(", ") + ")";
}
function rangeRendererWithParams(model, def, innerExpr, renderLeft) {
  var _a, _b;
  if (def.params.length < 2) {
    throw `Cannot render a function with params of length [${def.params.length}]`;
  }
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "5m";
  const params = renderParams(
    __spreadProps(__spreadValues({}, model), {
      params: model.params.slice(1)
    }),
    __spreadProps(__spreadValues({}, def), {
      params: def.params.slice(1),
      defaultParams: def.defaultParams.slice(1)
    }));
  const str = model.id + "(";
  if (innerExpr) {
    renderLeft ? params.push(`${innerExpr}[${rangeVector}]`) : params.unshift(`${innerExpr}[${rangeVector}]`);
  }
  return str + params.join(", ") + ")";
}
function rangeRendererRightWithParams(model, def, innerExpr) {
  return rangeRendererWithParams(model, def, innerExpr, false);
}
function rangeRendererLeftWithParams(model, def, innerExpr) {
  return rangeRendererWithParams(model, def, innerExpr, true);
}
function renderParams(model, def, innerExpr) {
  var _a;
  return ((_a = model.params) != null ? _a : []).map((value, index) => {
    const paramDef = def.params[index];
    if (paramDef.type === "string") {
      return '"' + value + '"';
    }
    return value;
  });
}
function defaultAddOperationHandler(def, query) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  return __spreadProps(__spreadValues({}, query), {
    operations: [...query.operations, newOperation]
  });
}
function getPromOperationDisplayName(funcName) {
  return capitalize(funcName.replace(/_/g, " "));
}
function getOperationParamId(operationId, paramIndex) {
  return `operations.${operationId}.param.${paramIndex}`;
}
function getRangeVectorParamDef(withRateInterval = false) {
  const options = [
    {
      label: "$__interval",
      value: "$__interval"
      // tooltip: 'Dynamic interval based on max data points, scrape and min interval',
    },
    { label: "1m", value: "1m" },
    { label: "5m", value: "5m" },
    { label: "10m", value: "10m" },
    { label: "1h", value: "1h" },
    { label: "24h", value: "24h" }
  ];
  if (withRateInterval) {
    options.unshift({
      label: "$__rate_interval",
      value: "$__rate_interval"
      // tooltip: 'Always above 4x scrape interval',
    });
  }
  const param = {
    name: "Range",
    type: "string",
    options
  };
  return param;
}
function createAggregationOperation(name, overrides = {}) {
  const operations = [
    __spreadValues({
      id: name,
      name: getPromOperationDisplayName(name),
      params: [
        {
          name: "By label",
          type: "string",
          restParam: true,
          optional: true
        }
      ],
      defaultParams: [],
      alternativesKey: "plain aggregations",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: functionRendererLeft,
      paramChangedHandler: getOnLabelAddedHandler(`__${name}_by`),
      explainHandler: getAggregationExplainer(name, ""),
      addOperationHandler: defaultAddOperationHandler
    }, overrides),
    __spreadValues({
      id: `__${name}_by`,
      name: `${getPromOperationDisplayName(name)} by`,
      params: [
        {
          name: "Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: [""],
      alternativesKey: "aggregations by",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: getAggregationByRenderer(name),
      paramChangedHandler: getLastLabelRemovedHandler(name),
      explainHandler: getAggregationExplainer(name, "by"),
      addOperationHandler: defaultAddOperationHandler,
      hideFromList: true
    }, overrides),
    __spreadValues({
      id: `__${name}_without`,
      name: `${getPromOperationDisplayName(name)} without`,
      params: [
        {
          name: "Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: [""],
      alternativesKey: "aggregations by",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: getAggregationWithoutRenderer(name),
      paramChangedHandler: getLastLabelRemovedHandler(name),
      explainHandler: getAggregationExplainer(name, "without"),
      addOperationHandler: defaultAddOperationHandler,
      hideFromList: true
    }, overrides)
  ];
  return operations;
}
function createAggregationOperationWithParam(name, paramsDef, overrides = {}) {
  const operations = createAggregationOperation(name, overrides);
  operations[0].params.unshift(...paramsDef.params);
  operations[1].params.unshift(...paramsDef.params);
  operations[2].params.unshift(...paramsDef.params);
  operations[0].defaultParams = paramsDef.defaultParams;
  operations[1].defaultParams = [...paramsDef.defaultParams, ""];
  operations[2].defaultParams = [...paramsDef.defaultParams, ""];
  operations[1].renderer = getAggregationByRendererWithParameter(name);
  operations[2].renderer = getAggregationByRendererWithParameter(name);
  return operations;
}
function getAggregationByRenderer(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    return `${aggregation} by(${model.params.join(", ")}) (${innerExpr})`;
  };
}
function getAggregationWithoutRenderer(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    return `${aggregation} without(${model.params.join(", ")}) (${innerExpr})`;
  };
}
function getAggregationExplainer(aggregationName, mode) {
  return function aggregationExplainer(model) {
    const labels = model.params.map((label) => `\`${label}\``).join(" and ");
    const labelWord = pluralize("label", model.params.length);
    switch (mode) {
      case "by":
        return `Calculates ${aggregationName} over dimensions while preserving ${labelWord} ${labels}.`;
      case "without":
        return `Calculates ${aggregationName} over the dimensions ${labels}. All other labels are preserved.`;
      default:
        return `Calculates ${aggregationName} over the dimensions.`;
    }
  };
}
function getAggregationByRendererWithParameter(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    const restParamIndex = def.params.findIndex((param) => param.restParam);
    const params = model.params.slice(0, restParamIndex);
    const restParams = model.params.slice(restParamIndex);
    return `${aggregation} by(${restParams.join(", ")}) (${params.map((param, idx) => def.params[idx].type === "string" ? `"${param}"` : param).join(", ")}, ${innerExpr})`;
  };
}
function getLastLabelRemovedHandler(changeToOperationId) {
  return function onParamChanged(index, op, def) {
    if (op.params.length < def.params.length) {
      return __spreadProps(__spreadValues({}, op), {
        id: changeToOperationId
      });
    }
    return op;
  };
}
function getOnLabelAddedHandler(changeToOperationId) {
  return function onParamChanged(index, op, def) {
    if (op.params.length === def.params.length) {
      return __spreadProps(__spreadValues({}, op), {
        id: changeToOperationId
      });
    }
    return op;
  };
}

export { createAggregationOperation, createAggregationOperationWithParam, defaultAddOperationHandler, functionRendererLeft, functionRendererRight, getAggregationExplainer, getLastLabelRemovedHandler, getOnLabelAddedHandler, getOperationParamId, getPromOperationDisplayName, getRangeVectorParamDef, rangeRendererLeftWithParams, rangeRendererRightWithParams };
//# sourceMappingURL=operationUtils.js.map
