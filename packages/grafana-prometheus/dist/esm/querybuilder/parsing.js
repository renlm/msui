import { parser, ParenExpr, BinaryExpr, AggregateExpr, FunctionCall, LabelMatcher, Identifier, VectorSelector, LabelName, MatchOp, StringLiteral, FunctionIdentifier, FunctionCallBody, AggregateOp, AggregateModifier, Without, NumberLiteral, BoolModifier, MatchingModifierClause, GroupingLabels, On } from '@prometheus-io/lezer-promql';
import { binaryScalarOperatorToOperatorName } from './binaryScalarOperations.js';
import { replaceVariables, makeError, ErrorId, getString, getAllByType, makeBinOp, getLeftMostChild } from './parsingUtils.js';

function buildVisualQueryFromString(expr) {
  const replacedExpr = replaceVariables(expr);
  const tree = parser.parse(replacedExpr);
  const node = tree.topNode;
  const visQuery = {
    metric: "",
    labels: [],
    operations: []
  };
  const context = {
    query: visQuery,
    errors: []
  };
  try {
    handleExpression(replacedExpr, node, context);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      context.errors.push({
        text: err.message
      });
    }
  }
  if (isEmptyQuery(context.query)) {
    context.errors = [];
  }
  if (isValidPromQLMinusGrafanaGlobalVariables(expr)) {
    context.errors = [];
  }
  return context;
}
function isValidPromQLMinusGrafanaGlobalVariables(expr) {
  const context = {
    query: {
      metric: "",
      labels: [],
      operations: []
    },
    errors: []
  };
  expr = expr.replace(/\$__interval/g, "1s");
  expr = expr.replace(/\$__interval_ms/g, "1000");
  expr = expr.replace(/\$__rate_interval/g, "1s");
  expr = expr.replace(/\$__range_ms/g, "1000");
  expr = expr.replace(/\$__range_s/g, "1");
  expr = expr.replace(/\$__range/g, "1s");
  const tree = parser.parse(expr);
  const node = tree.topNode;
  try {
    handleExpression(expr, node, context);
  } catch (err) {
    return false;
  }
  return context.errors.length === 0;
}
function handleExpression(expr, node, context) {
  const visQuery = context.query;
  switch (node.type.id) {
    case Identifier: {
      visQuery.metric = getString(expr, node);
      break;
    }
    case LabelMatcher: {
      visQuery.labels.push(getLabel(expr, node));
      const err = node.getChild(ErrorId);
      if (err) {
        context.errors.push(makeError(expr, err));
      }
      break;
    }
    case FunctionCall: {
      handleFunction(expr, node, context);
      break;
    }
    case AggregateExpr: {
      handleAggregation(expr, node, context);
      break;
    }
    case BinaryExpr: {
      handleBinary(expr, node, context);
      break;
    }
    case ErrorId: {
      if (isIntervalVariableError(node)) {
        break;
      }
      context.errors.push(makeError(expr, node));
      break;
    }
    default: {
      if (node.type.id === ParenExpr) {
        context.errors.push(makeError(expr, node));
      }
      let child = node.firstChild;
      while (child) {
        handleExpression(expr, child, context);
        child = child.nextSibling;
      }
    }
  }
}
function isIntervalVariableError(node) {
  var _a, _b;
  return ((_b = (_a = node.prevSibling) == null ? void 0 : _a.firstChild) == null ? void 0 : _b.type.id) === VectorSelector;
}
function getLabel(expr, node) {
  const label = getString(expr, node.getChild(LabelName));
  const op = getString(expr, node.getChild(MatchOp));
  const value = getString(expr, node.getChild(StringLiteral)).replace(/"/g, "");
  return {
    label,
    op,
    value
  };
}
const rangeFunctions = ["changes", "rate", "irate", "increase", "delta"];
function handleFunction(expr, node, context) {
  const visQuery = context.query;
  const nameNode = node.getChild(FunctionIdentifier);
  const funcName = getString(expr, nameNode);
  const body = node.getChild(FunctionCallBody);
  const params = [];
  let interval = "";
  if (rangeFunctions.includes(funcName) || funcName.endsWith("_over_time")) {
    let match = getString(expr, node).match(/\[(.+)\]/);
    if (match == null ? void 0 : match[1]) {
      interval = match[1];
      params.push(match[1]);
    }
  }
  const op = { id: funcName, params };
  visQuery.operations.unshift(op);
  if (body) {
    if (getString(expr, body) === "([" + interval + "])") {
      return;
    }
    updateFunctionArgs(expr, body, context, op);
  }
}
function handleAggregation(expr, node, context) {
  const visQuery = context.query;
  const nameNode = node.getChild(AggregateOp);
  let funcName = getString(expr, nameNode);
  const modifier = node.getChild(AggregateModifier);
  const labels = [];
  if (modifier) {
    const byModifier = modifier.getChild(`By`);
    if (byModifier && funcName) {
      funcName = `__${funcName}_by`;
    }
    const withoutModifier = modifier.getChild(Without);
    if (withoutModifier) {
      funcName = `__${funcName}_without`;
    }
    labels.push(...getAllByType(expr, modifier, LabelName));
  }
  const body = node.getChild(FunctionCallBody);
  const op = { id: funcName, params: [] };
  visQuery.operations.unshift(op);
  updateFunctionArgs(expr, body, context, op);
  op.params.push(...labels);
}
function updateFunctionArgs(expr, node, context, op) {
  if (!node) {
    return;
  }
  switch (node.type.id) {
    case FunctionCallBody: {
      let child = node.firstChild;
      while (child) {
        let binaryExpressionWithinFunctionArgs;
        if (child.type.id === BinaryExpr) {
          binaryExpressionWithinFunctionArgs = child;
        } else {
          binaryExpressionWithinFunctionArgs = child.getChild(BinaryExpr);
        }
        if (binaryExpressionWithinFunctionArgs) {
          context.errors.push({
            text: "Query parsing is ambiguous.",
            from: binaryExpressionWithinFunctionArgs.from,
            to: binaryExpressionWithinFunctionArgs.to
          });
        }
        updateFunctionArgs(expr, child, context, op);
        child = child.nextSibling;
      }
      break;
    }
    case NumberLiteral: {
      op.params.push(parseFloat(getString(expr, node)));
      break;
    }
    case StringLiteral: {
      op.params.push(getString(expr, node).replace(/"/g, ""));
      break;
    }
    default: {
      handleExpression(expr, node, context);
    }
  }
}
function handleBinary(expr, node, context) {
  var _a;
  const visQuery = context.query;
  const left = node.firstChild;
  const op = getString(expr, left.nextSibling);
  const binModifier = getBinaryModifier(expr, (_a = node.getChild(BoolModifier)) != null ? _a : node.getChild(MatchingModifierClause));
  const right = node.lastChild;
  const opDef = binaryScalarOperatorToOperatorName[op];
  const leftNumber = left.type.id === NumberLiteral;
  const rightNumber = right.type.id === NumberLiteral;
  const rightBinary = right.type.id === BinaryExpr;
  if (leftNumber) ; else {
    handleExpression(expr, left, context);
  }
  if (rightNumber) {
    visQuery.operations.push(makeBinOp(opDef, expr, right, !!(binModifier == null ? void 0 : binModifier.isBool)));
  } else if (rightBinary) {
    const leftMostChild = getLeftMostChild(right);
    if ((leftMostChild == null ? void 0 : leftMostChild.type.id) === NumberLiteral) {
      visQuery.operations.push(makeBinOp(opDef, expr, leftMostChild, !!(binModifier == null ? void 0 : binModifier.isBool)));
    }
    handleExpression(expr, right, context);
  } else {
    visQuery.binaryQueries = visQuery.binaryQueries || [];
    const binQuery = {
      operator: op,
      query: {
        metric: "",
        labels: [],
        operations: []
      }
    };
    if (binModifier == null ? void 0 : binModifier.isMatcher) {
      binQuery.vectorMatchesType = binModifier.matchType;
      binQuery.vectorMatches = binModifier.matches;
    }
    visQuery.binaryQueries.push(binQuery);
    handleExpression(expr, right, {
      query: binQuery.query,
      errors: context.errors
    });
  }
}
function getBinaryModifier(expr, node) {
  if (!node) {
    return void 0;
  }
  if (node.getChild("Bool")) {
    return { isBool: true, isMatcher: false };
  } else {
    let labels = "";
    const groupingLabels = node.getChild(GroupingLabels);
    if (groupingLabels) {
      labels = getAllByType(expr, groupingLabels, LabelName).join(", ");
    }
    return {
      isMatcher: true,
      isBool: false,
      matches: labels,
      matchType: node.getChild(On) ? "on" : "ignoring"
    };
  }
}
function isEmptyQuery(query) {
  if (query.labels.length === 0 && query.operations.length === 0 && !query.metric) {
    return true;
  }
  return false;
}

export { buildVisualQueryFromString, handleExpression };
//# sourceMappingURL=parsing.js.map
