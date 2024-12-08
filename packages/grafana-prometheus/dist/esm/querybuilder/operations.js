import { binaryScalarOperations } from './binaryScalarOperations.js';
import { LabelParamEditor } from './components/LabelParamEditor.js';
import { functionRendererLeft, defaultAddOperationHandler, functionRendererRight, getRangeVectorParamDef, rangeRendererRightWithParams, rangeRendererLeftWithParams, getPromOperationDisplayName } from './operationUtils.js';
import { PromOperationId, PromVisualQueryOperationCategory } from './types.js';

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
function getOperationDefinitions() {
  const list = [
    {
      id: PromOperationId.HistogramQuantile,
      name: "Histogram quantile",
      params: [{ name: "Quantile", type: "number", options: [0.99, 0.95, 0.9, 0.75, 0.5, 0.25] }],
      defaultParams: [0.9],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createFunction({ id: PromOperationId.HistogramAvg }),
    createFunction({ id: PromOperationId.HistogramCount }),
    createFunction({ id: PromOperationId.HistogramSum }),
    {
      id: PromOperationId.HistogramFraction,
      name: "Histogram fraction",
      params: [
        { name: "Lower scalar", type: "number" },
        { name: "Upper scalar", type: "number" }
      ],
      defaultParams: [0, 0.2],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createFunction({ id: PromOperationId.HistogramStddev }),
    createFunction({ id: PromOperationId.HistogramStdvar }),
    {
      id: PromOperationId.LabelReplace,
      name: "Label replace",
      params: [
        { name: "Destination label", type: "string" },
        { name: "Replacement", type: "string" },
        { name: "Source label", type: "string" },
        { name: "Regex", type: "string" }
      ],
      category: PromVisualQueryOperationCategory.Functions,
      defaultParams: ["", "$1", "", "(.*)"],
      renderer: functionRendererRight,
      addOperationHandler: defaultAddOperationHandler
    },
    {
      id: PromOperationId.Ln,
      name: "Ln",
      params: [],
      defaultParams: [],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createRangeFunction(PromOperationId.Changes),
    createRangeFunction(PromOperationId.Rate, true),
    createRangeFunction(PromOperationId.Irate),
    createRangeFunction(PromOperationId.Increase, true),
    createRangeFunction(PromOperationId.Idelta),
    createRangeFunction(PromOperationId.Delta),
    createFunction({
      id: PromOperationId.HoltWinters,
      params: [
        getRangeVectorParamDef(),
        { name: "Smoothing Factor", type: "number" },
        { name: "Trend Factor", type: "number" }
      ],
      defaultParams: ["$__interval", 0.5, 0.5],
      alternativesKey: "range function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererRightWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    createFunction({
      id: PromOperationId.PredictLinear,
      params: [getRangeVectorParamDef(), { name: "Seconds from now", type: "number" }],
      defaultParams: ["$__interval", 60],
      alternativesKey: "range function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererRightWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    createFunction({
      id: PromOperationId.QuantileOverTime,
      params: [getRangeVectorParamDef(), { name: "Quantile", type: "number" }],
      defaultParams: ["$__interval", 0.5],
      alternativesKey: "overtime function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererLeftWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    ...binaryScalarOperations,
    {
      id: PromOperationId.NestedQuery,
      name: "Binary operation with query",
      params: [],
      defaultParams: [],
      category: PromVisualQueryOperationCategory.BinaryOps,
      renderer: (model, def, innerExpr) => innerExpr,
      addOperationHandler: addNestedQueryHandler
    },
    createFunction({ id: PromOperationId.Abs }),
    createFunction({ id: PromOperationId.Absent }),
    createFunction({
      id: PromOperationId.Acos,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Acosh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Asin,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Asinh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Atan,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Atanh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({ id: PromOperationId.Ceil }),
    createFunction({
      id: PromOperationId.Clamp,
      name: "Clamp",
      params: [
        { name: "Minimum Scalar", type: "number" },
        { name: "Maximum Scalar", type: "number" }
      ],
      defaultParams: [1, 1]
    }),
    createFunction({
      id: PromOperationId.ClampMax,
      params: [{ name: "Maximum Scalar", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({
      id: PromOperationId.ClampMin,
      params: [{ name: "Minimum Scalar", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({
      id: PromOperationId.Cos,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Cosh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.DayOfMonth,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DayOfWeek,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DayOfYear,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DaysInMonth,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({ id: PromOperationId.Deg }),
    createRangeFunction(PromOperationId.Deriv),
    //
    createFunction({ id: PromOperationId.Exp }),
    createFunction({ id: PromOperationId.Floor }),
    createFunction({ id: PromOperationId.Group }),
    createFunction({ id: PromOperationId.Hour }),
    createFunction({
      id: PromOperationId.LabelJoin,
      params: [
        {
          name: "Destination Label",
          type: "string",
          editor: LabelParamEditor
        },
        {
          name: "Separator",
          type: "string"
        },
        {
          name: "Source Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: ["", ",", ""],
      renderer: labelJoinRenderer,
      explainHandler: labelJoinExplainHandler,
      addOperationHandler: labelJoinAddOperationHandler
    }),
    createFunction({ id: PromOperationId.Log10 }),
    createFunction({ id: PromOperationId.Log2 }),
    createFunction({ id: PromOperationId.Minute }),
    createFunction({ id: PromOperationId.Month }),
    createFunction({
      id: PromOperationId.Pi,
      renderer: (model) => `${model.id}()`
    }),
    createFunction({
      id: PromOperationId.Quantile,
      params: [{ name: "Value", type: "number" }],
      defaultParams: [1],
      renderer: functionRendererLeft
    }),
    createFunction({ id: PromOperationId.Rad }),
    createRangeFunction(PromOperationId.Resets),
    createFunction({
      id: PromOperationId.Round,
      category: PromVisualQueryOperationCategory.Functions,
      params: [{ name: "To Nearest", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({ id: PromOperationId.Scalar }),
    createFunction({ id: PromOperationId.Sgn }),
    createFunction({ id: PromOperationId.Sin, category: PromVisualQueryOperationCategory.Trigonometric }),
    createFunction({
      id: PromOperationId.Sinh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({ id: PromOperationId.Sort }),
    createFunction({ id: PromOperationId.SortDesc }),
    createFunction({ id: PromOperationId.Sqrt }),
    createFunction({ id: PromOperationId.Stddev }),
    createFunction({
      id: PromOperationId.Tan,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Tanh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Time,
      renderer: (model) => `${model.id}()`
    }),
    createFunction({ id: PromOperationId.Timestamp }),
    createFunction({
      id: PromOperationId.Vector,
      params: [{ name: "Value", type: "number" }],
      defaultParams: [1],
      renderer: (model) => `${model.id}(${model.params[0]})`
    }),
    createFunction({ id: PromOperationId.Year })
  ];
  return list;
}
function createFunction(definition) {
  var _a, _b, _c, _d, _e, _f;
  return __spreadProps(__spreadValues({}, definition), {
    id: definition.id,
    name: (_a = definition.name) != null ? _a : getPromOperationDisplayName(definition.id),
    params: (_b = definition.params) != null ? _b : [],
    defaultParams: (_c = definition.defaultParams) != null ? _c : [],
    category: (_d = definition.category) != null ? _d : PromVisualQueryOperationCategory.Functions,
    renderer: (_e = definition.renderer) != null ? _e : definition.params ? functionRendererRight : functionRendererLeft,
    addOperationHandler: (_f = definition.addOperationHandler) != null ? _f : defaultAddOperationHandler
  });
}
function createRangeFunction(name, withRateInterval = false) {
  return {
    id: name,
    name: getPromOperationDisplayName(name),
    params: [getRangeVectorParamDef(withRateInterval)],
    defaultParams: [withRateInterval ? "$__rate_interval" : "$__interval"],
    alternativesKey: "range function",
    category: PromVisualQueryOperationCategory.RangeFunctions,
    renderer: operationWithRangeVectorRenderer,
    addOperationHandler: addOperationWithRangeVector,
    changeTypeHandler: operationTypeChangedHandlerForRangeFunction
  };
}
function operationTypeChangedHandlerForRangeFunction(operation, newDef) {
  if (operation.params[0] === "$__rate_interval" && newDef.defaultParams[0] !== "$__rate_interval") {
    operation.params = newDef.defaultParams;
  } else if (operation.params[0] === "$__interval" && newDef.defaultParams[0] !== "$__interval") {
    operation.params = newDef.defaultParams;
  }
  return operation;
}
function operationWithRangeVectorRenderer(model, def, innerExpr) {
  var _a, _b;
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "5m";
  return `${def.id}(${innerExpr}[${rangeVector}])`;
}
function addOperationWithRangeVector(def, query, modeller) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  if (query.operations.length > 0) {
    const firstOp = modeller.getOperationDef(query.operations[0].id);
    if (firstOp.addOperationHandler === addOperationWithRangeVector) {
      return __spreadProps(__spreadValues({}, query), {
        operations: [newOperation, ...query.operations.slice(1)]
      });
    }
  }
  return __spreadProps(__spreadValues({}, query), {
    operations: [newOperation, ...query.operations]
  });
}
function addNestedQueryHandler(def, query) {
  var _a;
  return __spreadProps(__spreadValues({}, query), {
    binaryQueries: [
      ...(_a = query.binaryQueries) != null ? _a : [],
      {
        operator: "/",
        query
      }
    ]
  });
}
function labelJoinRenderer(model, def, innerExpr) {
  var _a, _b;
  const paramZero = (_a = model.params[0]) != null ? _a : "";
  const paramOne = (_b = model.params[1]) != null ? _b : "";
  const separator = `"${paramOne}"`;
  return `${model.id}(${innerExpr}, "${paramZero}", ${separator}, "${model.params.slice(2).join(separator)}")`;
}
function labelJoinExplainHandler(op, def) {
  var _a;
  let explainMessage = (_a = def == null ? void 0 : def.documentation) != null ? _a : "no docs";
  if (typeof op.params[1] !== "string") {
    explainMessage += " \u{1F6A8}\u{1F6A8}\u{1F6A8} The `separator` must be a string.";
  }
  return explainMessage;
}
function labelJoinAddOperationHandler(def, query) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  return __spreadProps(__spreadValues({}, query), {
    operations: [...query.operations, newOperation]
  });
}

export { addOperationWithRangeVector, createFunction, createRangeFunction, getOperationDefinitions, operationWithRangeVectorRenderer };
//# sourceMappingURL=operations.js.map
