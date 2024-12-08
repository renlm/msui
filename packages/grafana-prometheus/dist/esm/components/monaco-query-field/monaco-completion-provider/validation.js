const ErrorId = 0;
function validateQuery(query, interpolatedQuery, queryLines, parser) {
  if (!query) {
    return false;
  }
  const interpolatedErrors = parseQuery(interpolatedQuery, parser);
  if (!interpolatedErrors.length) {
    return false;
  }
  let parseErrors = interpolatedErrors;
  if (query !== interpolatedQuery) {
    const queryErrors = parseQuery(query, parser);
    parseErrors = interpolatedErrors.flatMap(
      (interpolatedError) => queryErrors.filter((queryError) => interpolatedError.text === queryError.text) || interpolatedError
    );
  }
  return parseErrors.map((parseError) => findErrorBoundary(query, queryLines, parseError)).filter(isErrorBoundary);
}
function parseQuery(query, parser) {
  const parseErrors = [];
  const tree = parser.parse(query);
  tree.iterate({
    enter: (nodeRef) => {
      if (nodeRef.type.id === ErrorId) {
        const node = nodeRef.node;
        parseErrors.push({
          node,
          text: query.substring(node.from, node.to)
        });
      }
    }
  });
  return parseErrors;
}
function findErrorBoundary(query, queryLines, parseError) {
  if (queryLines.length === 1) {
    const isEmptyString = parseError.node.from === parseError.node.to;
    const errorNode = isEmptyString && parseError.node.parent ? parseError.node.parent : parseError.node;
    const error = isEmptyString ? query.substring(errorNode.from, errorNode.to) : parseError.text;
    return {
      startLineNumber: 1,
      startColumn: errorNode.from + 1,
      endLineNumber: 1,
      endColumn: errorNode.to + 1,
      error
    };
  }
  let startPos = 0, endPos = 0;
  for (let line = 0; line < queryLines.length; line++) {
    endPos = startPos + queryLines[line].length;
    if (parseError.node.from > endPos) {
      startPos += queryLines[line].length + 1;
      continue;
    }
    return {
      startLineNumber: line + 1,
      startColumn: parseError.node.from - startPos + 1,
      endLineNumber: line + 1,
      endColumn: parseError.node.to - startPos + 1,
      error: parseError.text
    };
  }
  return null;
}
function isErrorBoundary(boundary) {
  return boundary !== null;
}
const placeHolderScopedVars = {
  __interval: { text: "1s", value: "1s" },
  __rate_interval: { text: "1s", value: "1s" },
  __auto: { text: "1s", value: "1s" },
  __interval_ms: { text: "1000", value: 1e3 },
  __range_ms: { text: "1000", value: 1e3 },
  __range_s: { text: "1", value: 1 },
  __range: { text: "1s", value: "1s" }
};

export { ErrorId, placeHolderScopedVars, validateQuery };
//# sourceMappingURL=validation.js.map
