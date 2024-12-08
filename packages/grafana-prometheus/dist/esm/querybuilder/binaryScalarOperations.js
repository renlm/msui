import { defaultAddOperationHandler } from './operationUtils.js';
import { PromOperationId, PromVisualQueryOperationCategory } from './types.js';

const binaryScalarDefs = [
  {
    id: PromOperationId.Addition,
    name: "Add scalar",
    sign: "+"
  },
  {
    id: PromOperationId.Subtraction,
    name: "Subtract scalar",
    sign: "-"
  },
  {
    id: PromOperationId.MultiplyBy,
    name: "Multiply by scalar",
    sign: "*"
  },
  {
    id: PromOperationId.DivideBy,
    name: "Divide by scalar",
    sign: "/"
  },
  {
    id: PromOperationId.Modulo,
    name: "Modulo by scalar",
    sign: "%"
  },
  {
    id: PromOperationId.Exponent,
    name: "Exponent",
    sign: "^"
  },
  {
    id: PromOperationId.EqualTo,
    name: "Equal to",
    sign: "==",
    comparison: true
  },
  {
    id: PromOperationId.NotEqualTo,
    name: "Not equal to",
    sign: "!=",
    comparison: true
  },
  {
    id: PromOperationId.GreaterThan,
    name: "Greater than",
    sign: ">",
    comparison: true
  },
  {
    id: PromOperationId.LessThan,
    name: "Less than",
    sign: "<",
    comparison: true
  },
  {
    id: PromOperationId.GreaterOrEqual,
    name: "Greater or equal to",
    sign: ">=",
    comparison: true
  },
  {
    id: PromOperationId.LessOrEqual,
    name: "Less or equal to",
    sign: "<=",
    comparison: true
  }
];
const binaryScalarOperatorToOperatorName = binaryScalarDefs.reduce((acc, def) => {
  acc[def.sign] = {
    id: def.id,
    comparison: def.comparison
  };
  return acc;
}, {});
const binaryScalarOperations = binaryScalarDefs.map((opDef) => {
  const params = [{ name: "Value", type: "number" }];
  let defaultParams = [2];
  if (opDef.comparison) {
    params.push({
      name: "Bool",
      type: "boolean",
      description: "If checked comparison will return 0 or 1 for the value rather than filtering."
    });
    defaultParams = [2, false];
  }
  return {
    id: opDef.id,
    name: opDef.name,
    params,
    defaultParams,
    alternativesKey: "binary scalar operations",
    category: PromVisualQueryOperationCategory.BinaryOps,
    renderer: getSimpleBinaryRenderer(opDef.sign),
    addOperationHandler: defaultAddOperationHandler
  };
});
function getSimpleBinaryRenderer(operator) {
  return function binaryRenderer(model, def, innerExpr) {
    let param = model.params[0];
    let bool = "";
    if (model.params.length === 2) {
      bool = model.params[1] ? " bool" : "";
    }
    return `${innerExpr} ${operator}${bool} ${param}`;
  };
}

export { binaryScalarDefs, binaryScalarOperations, binaryScalarOperatorToOperatorName };
//# sourceMappingURL=binaryScalarOperations.js.map
