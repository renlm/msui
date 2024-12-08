import { isString } from 'lodash';
import React__default from 'react';
import { ClipboardButton } from '../ClipboardButton/ClipboardButton.js';
import { Drawer } from '../Drawer/Drawer.js';
import { CodeEditor } from '../Monaco/CodeEditor.js';

function TableCellInspector({ value, onDismiss, mode }) {
  let displayValue = value;
  if (isString(value)) {
    const trimmedValue = value.trim();
    if (trimmedValue[0] === "{" || trimmedValue[0] === "[" || mode === "code") {
      try {
        value = JSON.parse(value);
        mode = "code";
      } catch (e) {
        mode = "text";
      }
    } else {
      mode = "text";
    }
  } else {
    displayValue = JSON.stringify(value, null, " ");
  }
  let text = displayValue;
  if (mode === "code") {
    text = JSON.stringify(value, null, " ");
  }
  return /* @__PURE__ */ React__default.createElement(Drawer, { onClose: onDismiss, title: "Inspect value" }, mode === "code" ? /* @__PURE__ */ React__default.createElement(
    CodeEditor,
    {
      width: "100%",
      height: 500,
      language: "json",
      showLineNumbers: true,
      showMiniMap: (text && text.length) > 100,
      value: text,
      readOnly: true
    }
  ) : /* @__PURE__ */ React__default.createElement("pre", null, text), /* @__PURE__ */ React__default.createElement(ClipboardButton, { icon: "copy", getText: () => text }, "Copy to Clipboard"));
}

export { TableCellInspector };
//# sourceMappingURL=TableCellInspector.js.map
