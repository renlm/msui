const ErrorId = 0;
function getLeftMostChild(cur) {
  return cur.firstChild ? getLeftMostChild(cur.firstChild) : cur;
}
function makeError(expr, node) {
  var _a;
  return {
    text: getString(expr, node),
    // TODO: this are positions in the string with the replaced variables. Means it cannot be used to show exact
    //  placement of the error for the user. We need some translation table to positions before the variable
    //  replace.
    from: node.from,
    to: node.to,
    parentType: (_a = node.parent) == null ? void 0 : _a.name
  };
}
const variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^\}]+))?(?::([^\}]+))?}/g;
function replaceVariables(expr) {
  return expr.replace(variableRegex, (match, var1, var2, fmt2, var3, fieldPath, fmt3) => {
    const fmt = fmt2 || fmt3;
    let variable = var1;
    let varType = "0";
    if (var2) {
      variable = var2;
      varType = "1";
    }
    if (var3) {
      variable = var3;
      varType = "2";
    }
    return `__V_${varType}__` + variable + "__V__" + (fmt ? "__F__" + fmt + "__F__" : "");
  });
}
const varTypeFunc = [
  (v, f) => `$${v}`,
  (v, f) => `[[${v}${f ? `:${f}` : ""}]]`,
  (v, f) => `\${${v}${f ? `:${f}` : ""}}`
];
function returnVariables(expr) {
  return expr.replace(/__V_(\d)__(.+?)__V__(?:__F__(\w+)__F__)?/g, (match, type, v, f) => {
    return varTypeFunc[parseInt(type, 10)](v, f);
  });
}
function getString(expr, node) {
  if (!node) {
    return "";
  }
  return returnVariables(expr.substring(node.from, node.to));
}
function makeBinOp(opDef, expr, numberNode, hasBool) {
  const params = [parseFloat(getString(expr, numberNode))];
  if (opDef.comparison) {
    params.push(hasBool);
  }
  return {
    id: opDef.id,
    params
  };
}
function getAllByType(expr, cur, type) {
  if (cur.type.id === type) {
    return [getString(expr, cur)];
  }
  const values = [];
  let pos = 0;
  let child = cur.childAfter(pos);
  while (child) {
    values.push(...getAllByType(expr, child, type));
    pos = child.to;
    child = cur.childAfter(pos);
  }
  return values;
}
const regexifyLabelValuesQueryString = (query) => {
  const queryArray = query.split(" ");
  return queryArray.map((query2) => `${query2}.*`).join("");
};

export { ErrorId, getAllByType, getLeftMostChild, getString, makeBinOp, makeError, regexifyLabelValuesQueryString, replaceVariables, returnVariables };
//# sourceMappingURL=parsingUtils.js.map
