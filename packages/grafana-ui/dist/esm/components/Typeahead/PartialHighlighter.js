import React__default, { createElement } from 'react';

function getStartIndices(parts, length) {
  const indices = [];
  parts.forEach((part) => {
    indices.push(part.start, part.end + 1);
  });
  if (indices[0] !== 0) {
    indices.unshift(0);
  }
  if (indices[indices.length - 1] !== length) {
    indices.push(length);
  }
  return indices;
}
const PartialHighlighter = (props) => {
  let { highlightParts, text, highlightClassName } = props;
  if (!(highlightParts == null ? void 0 : highlightParts.length)) {
    return null;
  }
  let children = [];
  let indices = getStartIndices(highlightParts, text.length);
  let highlighted = highlightParts[0].start === 0;
  for (let i = 1; i < indices.length; i++) {
    let start = indices[i - 1];
    let end = indices[i];
    children.push(
      createElement(
        highlighted ? "mark" : "span",
        {
          key: i - 1,
          className: highlighted ? highlightClassName : void 0
        },
        text.substring(start, end)
      )
    );
    highlighted = !highlighted;
  }
  return /* @__PURE__ */ React__default.createElement("div", null, children);
};

export { PartialHighlighter };
//# sourceMappingURL=PartialHighlighter.js.map
