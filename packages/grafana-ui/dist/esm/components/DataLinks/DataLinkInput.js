import { cx, css } from '@emotion/css';
import { offset, flip, shift, useFloating, autoUpdate } from '@floating-ui/react';
import Prism from 'prismjs';
import React__default, { memo, useRef, useState, useEffect } from 'react';
import usePrevious from 'react-use/lib/usePrevious';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { VariableOrigin, DataLinkBuiltInVars } from '@grafana/data';
import 'uuid';
import '../../slate-plugins/indentation.js';
import '../../slate-plugins/selection_shortcuts.js';
import { SlatePrism } from '../../slate-plugins/slate-prism/index.js';
import 'lodash';
import '../Typeahead/Typeahead.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import { makeValue, SCHEMA } from '../../utils/slate.js';
import 'ansicolor';
import '../../utils/logger.js';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';
import { getInputStyles } from '../Input/Input.js';
import { Portal } from '../Portal/Portal.js';
import { DataLinkSuggestions } from './DataLinkSuggestions.js';
import { SelectionReference } from './SelectionReference.js';

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
const modulo = (a, n) => a - n * Math.floor(a / n);
const datalinksSyntax = {
  builtInVariable: {
    pattern: /(\${\S+?})/
  }
};
const plugins = [
  SlatePrism(
    {
      onlyIn: (node) => "type" in node && node.type === "code_block",
      getSyntax: () => "links"
    },
    __spreadProps(__spreadValues({}, Prism.languages), { links: datalinksSyntax })
  )
];
const getStyles = (theme) => ({
  input: getInputStyles({ theme, invalid: false }).input,
  editor: css({
    ".token.builtInVariable": {
      color: theme.colors.success.text
    },
    ".token.variable": {
      color: theme.colors.primary.text
    }
  }),
  suggestionsWrapper: css({
    boxShadow: theme.shadows.z2
  }),
  // Wrapper with child selector needed.
  // When classnames are applied to the same element as the wrapper, it causes the suggestions to stop working
  wrapperOverrides: css({
    width: "100%",
    "> .slate-query-field__wrapper": {
      padding: 0,
      backgroundColor: "transparent",
      border: "none"
    }
  })
});
const DataLinkInput = memo(
  ({
    value,
    onChange,
    suggestions,
    placeholder = "http://your-grafana.com/d/000000010/annotations"
  }) => {
    const editorRef = useRef(null);
    const styles = useStyles2(getStyles);
    const [showingSuggestions, setShowingSuggestions] = useState(false);
    const [suggestionsIndex, setSuggestionsIndex] = useState(0);
    const [linkUrl, setLinkUrl] = useState(makeValue(value));
    const prevLinkUrl = usePrevious(linkUrl);
    const [scrollTop, setScrollTop] = useState(0);
    const middleware = [
      offset(({ rects }) => ({
        alignmentAxis: rects.reference.width
      })),
      flip({
        fallbackAxisSideDirection: "start",
        // see https://floating-ui.com/docs/flip#combining-with-shift
        crossAxis: false,
        boundary: document.body
      }),
      shift()
    ];
    const { refs, floatingStyles } = useFloating({
      open: showingSuggestions,
      placement: "bottom-start",
      onOpenChange: setShowingSuggestions,
      middleware,
      whileElementsMounted: autoUpdate,
      strategy: "fixed"
    });
    const stateRef = useRef({ showingSuggestions, suggestions, suggestionsIndex, linkUrl, onChange });
    stateRef.current = { showingSuggestions, suggestions, suggestionsIndex, linkUrl, onChange };
    const activeRef = useRef(null);
    useEffect(() => {
      setScrollTop(getElementPosition(activeRef.current, suggestionsIndex));
    }, [suggestionsIndex]);
    const onKeyDown = React__default.useCallback((event, next) => {
      if (!stateRef.current.showingSuggestions) {
        if (event.key === "=" || event.key === "$" || event.keyCode === 32 && event.ctrlKey) {
          const selectionRef = new SelectionReference();
          refs.setReference(selectionRef);
          return setShowingSuggestions(true);
        }
        return next();
      }
      switch (event.key) {
        case "Backspace":
        case "Escape":
          setShowingSuggestions(false);
          return setSuggestionsIndex(0);
        case "Enter":
          event.preventDefault();
          return onVariableSelect(stateRef.current.suggestions[stateRef.current.suggestionsIndex]);
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          return setSuggestionsIndex((index) => modulo(index + direction, stateRef.current.suggestions.length));
        default:
          return next();
      }
    }, []);
    useEffect(() => {
      if (prevLinkUrl && prevLinkUrl.selection.isFocused && !linkUrl.selection.isFocused) {
        stateRef.current.onChange(Plain.serialize(linkUrl));
      }
    }, [linkUrl, prevLinkUrl]);
    const onUrlChange = React__default.useCallback(({ value: value2 }) => {
      setLinkUrl(value2);
    }, []);
    const onVariableSelect = (item, editor = editorRef.current) => {
      const precedingChar = getCharactersAroundCaret();
      const precedingDollar = precedingChar === "$";
      if (item.origin !== VariableOrigin.Template || item.value === DataLinkBuiltInVars.includeVars) {
        editor.insertText(`${precedingDollar ? "" : "$"}{${item.value}}`);
      } else {
        editor.insertText(`${precedingDollar ? "" : "$"}{${item.value}:queryparam}`);
      }
      setLinkUrl(editor.value);
      setShowingSuggestions(false);
      setSuggestionsIndex(0);
      stateRef.current.onChange(Plain.serialize(editor.value));
    };
    const getCharactersAroundCaret = () => {
      const input = document.getElementById("data-link-input");
      let precedingChar = "", sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          range = sel.getRangeAt(0).cloneRange();
          range.collapse(true);
          range.setStart(input, 0);
          precedingChar = range.toString().slice(-1);
        }
      }
      return precedingChar;
    };
    return /* @__PURE__ */ React__default.createElement("div", { className: styles.wrapperOverrides }, /* @__PURE__ */ React__default.createElement("div", { className: "slate-query-field__wrapper" }, /* @__PURE__ */ React__default.createElement("div", { id: "data-link-input", className: "slate-query-field" }, showingSuggestions && /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement("div", { ref: refs.setFloating, style: floatingStyles }, /* @__PURE__ */ React__default.createElement(
      CustomScrollbar,
      {
        scrollTop,
        autoHeightMax: "300px",
        setScrollTop: ({ scrollTop: scrollTop2 }) => setScrollTop(scrollTop2)
      },
      /* @__PURE__ */ React__default.createElement(
        DataLinkSuggestions,
        {
          activeRef,
          suggestions: stateRef.current.suggestions,
          onSuggestionSelect: onVariableSelect,
          onClose: () => setShowingSuggestions(false),
          activeIndex: suggestionsIndex
        }
      )
    ))), /* @__PURE__ */ React__default.createElement(
      Editor,
      {
        schema: SCHEMA,
        ref: editorRef,
        placeholder,
        value: stateRef.current.linkUrl,
        onChange: onUrlChange,
        onKeyDown: (event, _editor, next) => onKeyDown(event, next),
        plugins,
        className: cx(
          styles.editor,
          styles.input,
          css({
            padding: "3px 8px"
          })
        )
      }
    ))));
  }
);
DataLinkInput.displayName = "DataLinkInput";
function getElementPosition(suggestionElement, activeIndex) {
  var _a;
  return ((_a = suggestionElement == null ? void 0 : suggestionElement.clientHeight) != null ? _a : 0) * activeIndex;
}

export { DataLinkInput };
//# sourceMappingURL=DataLinkInput.js.map
