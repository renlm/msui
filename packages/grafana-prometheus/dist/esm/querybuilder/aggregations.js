import { createAggregationOperation, createAggregationOperationWithParam, getPromOperationDisplayName, getRangeVectorParamDef } from './operationUtils.js';
import { addOperationWithRangeVector } from './operations.js';
import { PromOperationId, PromVisualQueryOperationCategory } from './types.js';

function getAggregationOperations() {
  return [
    ...createAggregationOperation(PromOperationId.Sum),
    ...createAggregationOperation(PromOperationId.Avg),
    ...createAggregationOperation(PromOperationId.Min),
    ...createAggregationOperation(PromOperationId.Max),
    ...createAggregationOperation(PromOperationId.Count),
    ...createAggregationOperationWithParam(PromOperationId.TopK, {
      params: [{ name: "K-value", type: "number" }],
      defaultParams: [5]
    }),
    ...createAggregationOperationWithParam(PromOperationId.BottomK, {
      params: [{ name: "K-value", type: "number" }],
      defaultParams: [5]
    }),
    ...createAggregationOperationWithParam(PromOperationId.CountValues, {
      params: [{ name: "Identifier", type: "string" }],
      defaultParams: ["count"]
    }),
    createAggregationOverTime(PromOperationId.SumOverTime),
    createAggregationOverTime(PromOperationId.AvgOverTime),
    createAggregationOverTime(PromOperationId.MinOverTime),
    createAggregationOverTime(PromOperationId.MaxOverTime),
    createAggregationOverTime(PromOperationId.CountOverTime),
    createAggregationOverTime(PromOperationId.LastOverTime),
    createAggregationOverTime(PromOperationId.PresentOverTime),
    createAggregationOverTime(PromOperationId.AbsentOverTime),
    createAggregationOverTime(PromOperationId.StddevOverTime)
  ];
}
function createAggregationOverTime(name) {
  return {
    id: name,
    name: getPromOperationDisplayName(name),
    params: [getRangeVectorParamDef()],
    defaultParams: ["$__interval"],
    alternativesKey: "overtime function",
    category: PromVisualQueryOperationCategory.RangeFunctions,
    renderer: operationWithRangeVectorRenderer,
    addOperationHandler: addOperationWithRangeVector
  };
}
function operationWithRangeVectorRenderer(model, def, innerExpr) {
  var _a, _b;
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "$__interval";
  return `${def.id}(${innerExpr}[${rangeVector}])`;
}

export { getAggregationOperations };
//# sourceMappingURL=aggregations.js.map
