import { parser, VectorSelector } from '@prometheus-io/lezer-promql';
import { PromQueryModeller } from './querybuilder/PromQueryModeller.js';
import { buildVisualQueryFromString } from './querybuilder/parsing.js';

function addLabelToQuery(query, key, value, operator = "=") {
  if (!key || !value) {
    throw new Error("Need label to add to query.");
  }
  const vectorSelectorPositions = getVectorSelectorPositions(query);
  if (!vectorSelectorPositions.length) {
    return query;
  }
  const filter = toLabelFilter(key, value, operator);
  return addFilter(query, vectorSelectorPositions, filter);
}
function getVectorSelectorPositions(query) {
  const tree = parser.parse(query);
  const positions = [];
  tree.iterate({
    enter: ({ to, from, type }) => {
      if (type.id === VectorSelector) {
        const visQuery = buildVisualQueryFromString(query.substring(from, to));
        positions.push({ query: visQuery.query, from, to });
        return false;
      }
    }
  });
  return positions;
}
function toLabelFilter(key, value, operator) {
  const transformedValue = value === Infinity ? "+Inf" : value.toString();
  return { label: key, op: operator, value: transformedValue };
}
function addFilter(query, vectorSelectorPositions, filter) {
  const modeller = new PromQueryModeller();
  let newQuery = "";
  let prev = 0;
  for (let i = 0; i < vectorSelectorPositions.length; i++) {
    const match = vectorSelectorPositions[i];
    const isLast = i === vectorSelectorPositions.length - 1;
    const start = query.substring(prev, match.from);
    const end = isLast ? query.substring(match.to) : "";
    if (!labelExists(match.query.labels, filter)) {
      match.query.labels.push(filter);
    }
    const newLabels = modeller.renderQuery(match.query);
    newQuery += start + newLabels + end;
    prev = match.to;
  }
  return newQuery;
}
function labelExists(labels, filter) {
  return labels.find((label) => label.label === filter.label && label.value === filter.value);
}

export { addLabelToQuery };
//# sourceMappingURL=add_label_to_query.js.map
