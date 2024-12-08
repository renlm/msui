import { debounce, sortBy } from 'lodash';
import React__default from 'react';
import { Typeahead } from '../components/Typeahead/Typeahead.js';
import '../utils/dom.js';
import '../utils/colors.js';
import { makeFragment } from '../utils/slate.js';
import { SearchFunctionType, SearchFunctionMap } from '../utils/searchFunctions.js';
import 'ansicolor';
import '../utils/logger.js';
import TOKEN_MARK from './slate-prism/TOKEN_MARK.js';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const TYPEAHEAD_DEBOUNCE = 250;
function SuggestionsPlugin({
  onTypeahead,
  cleanText,
  onWillApplySuggestion,
  portalOrigin
}) {
  let typeaheadRef;
  let state = {
    groupedItems: [],
    typeaheadPrefix: "",
    typeaheadContext: "",
    typeaheadText: ""
  };
  const handleTypeaheadDebounced = debounce(handleTypeahead, TYPEAHEAD_DEBOUNCE);
  const setState = (update) => {
    state = __spreadValues(__spreadValues({}, state), update);
  };
  return {
    onBlur: (event, editor, next) => {
      state = __spreadProps(__spreadValues({}, state), {
        groupedItems: []
      });
      return next();
    },
    onClick: (event, editor, next) => {
      state = __spreadProps(__spreadValues({}, state), {
        groupedItems: []
      });
      return next();
    },
    onKeyDown: (event, editor, next) => {
      const currentSuggestions = state.groupedItems;
      const hasSuggestions = currentSuggestions.length;
      switch (event.key) {
        case "Escape": {
          if (hasSuggestions) {
            event.preventDefault();
            state = __spreadProps(__spreadValues({}, state), {
              groupedItems: []
            });
            return editor.insertText("");
          }
          break;
        }
        case "ArrowDown":
        case "ArrowUp":
          if (hasSuggestions) {
            event.preventDefault();
            typeaheadRef.moveMenuIndex(event.key === "ArrowDown" ? 1 : -1);
            return;
          }
          break;
        case "Enter": {
          if (!(event.shiftKey || event.ctrlKey) && hasSuggestions) {
            event.preventDefault();
            return typeaheadRef.insertSuggestion();
          }
          break;
        }
        case "Tab": {
          if (hasSuggestions) {
            event.preventDefault();
            return typeaheadRef.insertSuggestion();
          }
          break;
        }
        default: {
          if (event.key.length === 1) {
            handleTypeaheadDebounced(editor, setState, onTypeahead, cleanText);
          }
          break;
        }
      }
      return next();
    },
    commands: {
      selectSuggestion: (editor, suggestion) => {
        const suggestions = state.groupedItems;
        if (!suggestions || !suggestions.length) {
          return editor;
        }
        const ed = editor.applyTypeahead(suggestion);
        handleTypeaheadDebounced(editor, setState, onTypeahead, cleanText);
        return ed;
      },
      applyTypeahead: (editor, suggestion) => {
        let suggestionText = suggestion.insertText || suggestion.label;
        const preserveSuffix = suggestion.kind === "function";
        const move = suggestion.move || 0;
        const moveForward = move > 0 ? move : 0;
        const moveBackward = move < 0 ? -move : 0;
        const { typeaheadPrefix, typeaheadText, typeaheadContext } = state;
        if (onWillApplySuggestion) {
          suggestionText = onWillApplySuggestion(suggestionText, {
            groupedItems: state.groupedItems,
            typeaheadContext,
            typeaheadPrefix,
            typeaheadText
          });
        }
        const { forward, backward } = getNumCharsToDelete(
          suggestionText,
          typeaheadPrefix,
          typeaheadText,
          preserveSuffix,
          suggestion.deleteBackwards,
          cleanText
        );
        if (suggestionText.match(/\n/)) {
          const fragment = makeFragment(suggestionText);
          editor.deleteBackward(backward).deleteForward(forward).insertFragment(fragment).focus();
          return editor;
        }
        state = __spreadProps(__spreadValues({}, state), {
          groupedItems: []
        });
        editor.snapshotSelection().deleteBackward(backward).deleteForward(forward).insertText(suggestionText).moveForward(moveForward).moveBackward(moveBackward).focus();
        return editor;
      }
    },
    renderEditor(props, editor, next) {
      if (editor.value.selection.isExpanded) {
        return next();
      }
      const children = next();
      return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children, /* @__PURE__ */ React__default.createElement(
        Typeahead,
        {
          menuRef: (menu) => typeaheadRef = menu,
          origin: portalOrigin,
          prefix: state.typeaheadPrefix,
          isOpen: !!state.groupedItems.length,
          groupedItems: state.groupedItems,
          onSelectSuggestion: editor.selectSuggestion
        }
      ));
    }
  };
}
const handleTypeahead = async (editor, onStateChange, onTypeahead, cleanText) => {
  if (!onTypeahead) {
    return;
  }
  const { value } = editor;
  const { selection } = value;
  const parentBlock = value.document.getClosestBlock(value.focusBlock.key);
  const selectionStartOffset = value.selection.start.offset - 1;
  const decorations = parentBlock && parentBlock.getDecorations(editor);
  const filteredDecorations = decorations ? decorations.filter(
    (decoration) => decoration.start.offset <= selectionStartOffset && decoration.end.offset > selectionStartOffset && decoration.type === TOKEN_MARK
  ).toArray() : [];
  const labelKeyDec = decorations && decorations.filter(
    (decoration) => decoration.end.offset <= selectionStartOffset && decoration.type === TOKEN_MARK && decoration.data.get("className").includes("label-key")
  ).last();
  const labelKey = labelKeyDec && value.focusText.text.slice(labelKeyDec.start.offset, labelKeyDec.end.offset);
  const wrapperClasses = filteredDecorations.map((decoration) => decoration.data.get("className")).join(" ").split(" ").filter((className) => className.length);
  let text = value.focusText.text;
  let prefix = text.slice(0, selection.focus.offset);
  if (filteredDecorations.length) {
    text = value.focusText.text.slice(filteredDecorations[0].start.offset, filteredDecorations[0].end.offset);
    prefix = value.focusText.text.slice(filteredDecorations[0].start.offset, selection.focus.offset);
  }
  const labelValueMatch = prefix.match(/(?:!?=~?"?|")(.*)/);
  if (labelValueMatch) {
    prefix = labelValueMatch[1];
  } else if (cleanText) {
    prefix = cleanText(prefix);
  }
  const { suggestions, context } = await onTypeahead({
    prefix,
    text,
    value,
    wrapperClasses,
    labelKey: labelKey || void 0,
    editor
  });
  const filteredSuggestions = suggestions.map((group) => {
    if (!group.items) {
      return group;
    }
    const searchFunctionType = group.searchFunctionType || (group.prefixMatch ? SearchFunctionType.Prefix : SearchFunctionType.Word);
    const searchFunction = SearchFunctionMap[searchFunctionType];
    let newGroup = __spreadValues({}, group);
    if (prefix) {
      if (!group.skipFilter) {
        newGroup.items = newGroup.items.filter((c) => (c.filterText || c.label).length >= prefix.length);
        newGroup.items = searchFunction(newGroup.items, prefix);
      }
      newGroup.items = newGroup.items.filter(
        (c) => {
          var _a;
          return !(c.insertText === prefix || ((_a = c.filterText) != null ? _a : c.label) === prefix);
        }
      );
    }
    if (!group.skipSort) {
      newGroup.items = sortBy(newGroup.items, (item) => {
        if (item.sortText === void 0) {
          return item.sortValue !== void 0 ? item.sortValue : item.label;
        } else {
          return item.sortText || item.label;
        }
      });
    }
    return newGroup;
  }).filter((gr) => gr.items && gr.items.length);
  onStateChange({
    groupedItems: filteredSuggestions,
    typeaheadPrefix: prefix,
    typeaheadContext: context,
    typeaheadText: text
  });
  editor.blur().focus();
};
function getNumCharsToDelete(suggestionText, typeaheadPrefix, typeaheadText, preserveSuffix, deleteBackwards, cleanText) {
  const backward = deleteBackwards || typeaheadPrefix.length;
  const text = cleanText ? cleanText(typeaheadText) : typeaheadText;
  const offset = typeaheadText.indexOf(typeaheadPrefix);
  const suffixLength = offset > -1 ? text.length - offset - typeaheadPrefix.length : text.length - typeaheadPrefix.length;
  const midWord = Boolean(typeaheadPrefix && suffixLength > 0 || suggestionText === typeaheadText);
  const forward = midWord && !preserveSuffix ? suffixLength + offset : 0;
  return {
    forward,
    backward
  };
}

export { SuggestionsPlugin, TYPEAHEAD_DEBOUNCE, getNumCharsToDelete };
//# sourceMappingURL=suggestions.js.map
