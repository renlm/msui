import { parser, LabelMatchers, VectorSelector, PromQL, FunctionCallBody, StringLiteral, LabelMatcher, BinaryExpr, MatrixSelector, GroupingLabels, AggregateModifier, AggregateExpr, Identifier, LabelName, MatchOp, EqlSingle, EqlRegex, Neq, NeqRegex } from '@prometheus-io/lezer-promql';
import { NeverCaseError } from './util.js';

function move(node, direction) {
  switch (direction) {
    case "parent":
      return node.parent;
    case "firstChild":
      return node.firstChild;
    case "lastChild":
      return node.lastChild;
    case "nextSibling":
      return node.nextSibling;
    default:
      throw new NeverCaseError(direction);
  }
}
function walk(node, path) {
  let current = node;
  for (const [direction, expectedType] of path) {
    current = move(current, direction);
    if (current === null) {
      return null;
    }
    if (current.type.id !== expectedType) {
      return null;
    }
  }
  return current;
}
function getNodeText(node, text) {
  return text.slice(node.from, node.to);
}
function parsePromQLStringLiteral(text) {
  const inside = text.slice(1, text.length - 1);
  if (text.startsWith('"') && text.endsWith('"')) {
    return inside.replace(/\\"/, '"');
  }
  if (text.startsWith("'") && text.endsWith("'")) {
    return inside.replace(/\\'/, "'");
  }
  if (text.startsWith("`") && text.endsWith("`")) {
    return inside;
  }
  throw new Error("FIXME: invalid string literal");
}
function isPathMatch(resolverPath, cursorPath) {
  return resolverPath.every((item, index) => item === cursorPath[index]);
}
const ERROR_NODE_NAME = 0;
const RESOLVERS = [
  {
    path: [LabelMatchers, VectorSelector],
    fun: resolveLabelKeysWithEquals
  },
  {
    path: [PromQL],
    fun: resolveTopLevel
  },
  {
    path: [FunctionCallBody],
    fun: resolveInFunction
  },
  {
    path: [StringLiteral, LabelMatcher],
    fun: resolveLabelMatcher
  },
  {
    path: [ERROR_NODE_NAME, BinaryExpr, PromQL],
    fun: resolveTopLevel
  },
  {
    path: [ERROR_NODE_NAME, LabelMatcher],
    fun: resolveLabelMatcher
  },
  {
    path: [ERROR_NODE_NAME, MatrixSelector],
    fun: resolveDurations
  },
  {
    path: [GroupingLabels],
    fun: resolveLabelsForGrouping
  }
];
const LABEL_OP_MAP = /* @__PURE__ */ new Map([
  [EqlSingle, "="],
  [EqlRegex, "=~"],
  [Neq, "!="],
  [NeqRegex, "!~"]
]);
function getLabelOp(opNode) {
  var _a;
  const opChild = opNode.firstChild;
  if (opChild === null) {
    return null;
  }
  return (_a = LABEL_OP_MAP.get(opChild.type.id)) != null ? _a : null;
}
function getLabel(labelMatcherNode, text) {
  if (labelMatcherNode.type.id !== LabelMatcher) {
    return null;
  }
  const nameNode = walk(labelMatcherNode, [["firstChild", LabelName]]);
  if (nameNode === null) {
    return null;
  }
  const opNode = walk(nameNode, [["nextSibling", MatchOp]]);
  if (opNode === null) {
    return null;
  }
  const op = getLabelOp(opNode);
  if (op === null) {
    return null;
  }
  const valueNode = walk(labelMatcherNode, [["lastChild", StringLiteral]]);
  if (valueNode === null) {
    return null;
  }
  const name = getNodeText(nameNode, text);
  const value = parsePromQLStringLiteral(getNodeText(valueNode, text));
  return { name, value, op };
}
function getLabels(labelMatchersNode, text) {
  if (labelMatchersNode.type.id !== LabelMatchers) {
    return [];
  }
  const labelNodes = labelMatchersNode.getChildren(LabelMatcher);
  return labelNodes.map((ln) => getLabel(ln, text)).filter(notEmpty);
}
function getNodeChildren(node) {
  let child = node.firstChild;
  const children = [];
  while (child !== null) {
    children.push(child);
    child = child.nextSibling;
  }
  return children;
}
function getNodeInSubtree(node, typeId) {
  if (node.type.id === typeId) {
    return node;
  }
  const children = getNodeChildren(node);
  for (const child of children) {
    const n = getNodeInSubtree(child, typeId);
    if (n !== null) {
      return n;
    }
  }
  return null;
}
function resolveLabelsForGrouping(node, text, pos) {
  const aggrExpNode = walk(node, [
    ["parent", AggregateModifier],
    ["parent", AggregateExpr]
  ]);
  if (aggrExpNode === null) {
    return null;
  }
  const bodyNode = aggrExpNode.getChild(FunctionCallBody);
  if (bodyNode === null) {
    return null;
  }
  const metricIdNode = getNodeInSubtree(bodyNode, Identifier);
  if (metricIdNode === null) {
    return null;
  }
  const metricName = getNodeText(metricIdNode, text);
  return {
    type: "IN_GROUPING",
    metricName,
    otherLabels: []
  };
}
function resolveLabelMatcher(node, text, pos) {
  const inStringNode = !node.type.isError;
  const parent = walk(node, [["parent", LabelMatcher]]);
  if (parent === null) {
    return null;
  }
  const labelNameNode = walk(parent, [["firstChild", LabelName]]);
  if (labelNameNode === null) {
    return null;
  }
  const labelName = getNodeText(labelNameNode, text);
  const labelMatchersNode = walk(parent, [["parent", LabelMatchers]]);
  if (labelMatchersNode === null) {
    return null;
  }
  const allLabels = getLabels(labelMatchersNode, text);
  const otherLabels = allLabels.filter((label) => label.name !== labelName);
  const metricNameNode = walk(labelMatchersNode, [
    ["parent", VectorSelector],
    ["firstChild", Identifier]
  ]);
  if (metricNameNode === null) {
    return {
      type: "IN_LABEL_SELECTOR_WITH_LABEL_NAME",
      labelName,
      betweenQuotes: inStringNode,
      otherLabels
    };
  }
  const metricName = getNodeText(metricNameNode, text);
  return {
    type: "IN_LABEL_SELECTOR_WITH_LABEL_NAME",
    metricName,
    labelName,
    betweenQuotes: inStringNode,
    otherLabels
  };
}
function resolveTopLevel(node, text, pos) {
  return {
    type: "AT_ROOT"
  };
}
function resolveInFunction(node, text, pos) {
  return {
    type: "IN_FUNCTION"
  };
}
function resolveDurations(node, text, pos) {
  return {
    type: "IN_DURATION"
  };
}
function resolveLabelKeysWithEquals(node, text, pos) {
  const child = walk(node, [["firstChild", LabelMatcher]]);
  if (child !== null) {
    const textToCheck = text.slice(child.to, pos);
    if (!textToCheck.includes(",")) {
      return null;
    }
  }
  const metricNameNode = walk(node, [
    ["parent", VectorSelector],
    ["firstChild", Identifier]
  ]);
  const otherLabels = getLabels(node, text);
  if (metricNameNode === null) {
    return {
      type: "IN_LABEL_SELECTOR_NO_LABEL_NAME",
      otherLabels
    };
  }
  const metricName = getNodeText(metricNameNode, text);
  return {
    type: "IN_LABEL_SELECTOR_NO_LABEL_NAME",
    metricName,
    otherLabels
  };
}
function getErrorNode(tree, pos) {
  const cur = tree.cursorAt(pos);
  while (true) {
    if (cur.from === pos && cur.to === pos) {
      const { node } = cur;
      if (node.type.isError) {
        return node;
      }
    }
    if (!cur.next()) {
      break;
    }
  }
  return null;
}
function getSituation(text, pos) {
  if (text === "") {
    return {
      type: "EMPTY"
    };
  }
  const tree = parser.parse(text);
  const maybeErrorNode = getErrorNode(tree, pos);
  const cur = maybeErrorNode != null ? maybeErrorNode.cursor() : tree.cursorAt(pos);
  const currentNode = cur.node;
  const ids = [cur.type.id];
  while (cur.parent()) {
    ids.push(cur.type.id);
  }
  for (let resolver of RESOLVERS) {
    if (isPathMatch(resolver.path, ids)) {
      return resolver.fun(currentNode, text, pos);
    }
  }
  return null;
}
function notEmpty(value) {
  return value !== null && value !== void 0;
}

export { getSituation };
//# sourceMappingURL=situation.js.map
