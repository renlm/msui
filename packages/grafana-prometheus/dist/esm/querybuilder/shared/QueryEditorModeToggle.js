import React from 'react';
import { RadioButtonGroup } from '@grafana/ui';
import { QueryEditorMode } from './types.js';

const editorModes = [
  { label: "Builder", value: QueryEditorMode.Builder },
  { label: "Code", value: QueryEditorMode.Code }
];
function QueryEditorModeToggle({ mode, onChange }) {
  return /* @__PURE__ */ React.createElement("div", { "data-testid": "QueryEditorModeToggle" }, /* @__PURE__ */ React.createElement(RadioButtonGroup, { options: editorModes, size: "sm", value: mode, onChange }));
}

export { QueryEditorModeToggle };
//# sourceMappingURL=QueryEditorModeToggle.js.map
