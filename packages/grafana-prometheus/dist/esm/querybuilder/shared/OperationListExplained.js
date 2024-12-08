import React from 'react';
import { OperationExplainedBox } from './OperationExplainedBox.js';
import { RawQuery } from './RawQuery.js';

function OperationListExplained({
  query,
  queryModeller,
  stepNumber,
  lang,
  onMouseEnter,
  onMouseLeave
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, query.operations.map((op, index) => {
    var _a;
    const def = queryModeller.getOperationDef(op.id);
    if (!def) {
      return `Operation ${op.id} not found`;
    }
    const title = def.renderer(op, def, "<expr>");
    const body = def.explainHandler ? def.explainHandler(op, def) : (_a = def.documentation) != null ? _a : "no docs";
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: index,
        onMouseEnter: () => onMouseEnter == null ? void 0 : onMouseEnter(op, index),
        onMouseLeave: () => onMouseLeave == null ? void 0 : onMouseLeave(op, index)
      },
      /* @__PURE__ */ React.createElement(
        OperationExplainedBox,
        {
          stepNumber: index + stepNumber,
          title: /* @__PURE__ */ React.createElement(RawQuery, { query: title, lang }),
          markdown: body
        }
      )
    );
  }));
}

export { OperationListExplained };
//# sourceMappingURL=OperationListExplained.js.map
