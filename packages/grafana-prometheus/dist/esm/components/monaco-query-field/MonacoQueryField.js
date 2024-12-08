import { css } from '@emotion/css';
import { parser } from '@prometheus-io/lezer-promql';
import { debounce } from 'lodash';
import { promLanguageDefinition } from 'monaco-promql';
import React, { useRef, useEffect } from 'react';
import { useLatest } from 'react-use';
import { v4 } from 'uuid';
import { useTheme2, ReactMonacoEditor } from '@grafana/ui';
import { getOverrideServices } from './getOverrideServices.js';
import { getSuggestOptions, getCompletionProvider } from './monaco-completion-provider/index.js';
import { DataProvider } from './monaco-completion-provider/data_provider.js';
import { validateQuery, placeHolderScopedVars } from './monaco-completion-provider/validation.js';
import { language, languageConfiguration } from './promql.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const options = {
  codeLens: false,
  contextmenu: false,
  // we need `fixedOverflowWidgets` because otherwise in grafana-dashboards
  // the popup is clipped by the panel-visualizations.
  fixedOverflowWidgets: true,
  folding: false,
  fontSize: 14,
  lineDecorationsWidth: 8,
  // used as "padding-left"
  lineNumbers: "off",
  minimap: { enabled: false },
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  padding: {
    // these numbers were picked so that visually this matches the previous version
    // of the query-editor the best
    top: 4,
    bottom: 5
  },
  renderLineHighlight: "none",
  scrollbar: {
    vertical: "hidden",
    verticalScrollbarSize: 8,
    // used as "padding-right"
    horizontal: "hidden",
    horizontalScrollbarSize: 0,
    alwaysConsumeMouseWheel: false
  },
  scrollBeyondLastLine: false,
  suggest: getSuggestOptions(),
  suggestFontSize: 12,
  wordWrap: "on"
};
const EDITOR_HEIGHT_OFFSET = 2;
const PROMQL_LANG_ID = promLanguageDefinition.id;
let PROMQL_SETUP_STARTED = false;
function ensurePromQL(monaco) {
  if (PROMQL_SETUP_STARTED === false) {
    PROMQL_SETUP_STARTED = true;
    const { aliases, extensions, mimetypes } = promLanguageDefinition;
    monaco.languages.register({ id: PROMQL_LANG_ID, aliases, extensions, mimetypes });
    monaco.languages.setMonarchTokensProvider(PROMQL_LANG_ID, language);
    monaco.languages.setLanguageConfiguration(PROMQL_LANG_ID, languageConfiguration);
  }
}
const getStyles = (theme, placeholder) => {
  return {
    container: css({
      borderRadius: theme.shape.radius.default,
      border: `1px solid ${theme.components.input.borderColor}`,
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      height: "100%"
    }),
    placeholder: css({
      "::after": {
        content: `'${placeholder}'`,
        fontFamily: theme.typography.fontFamilyMonospace,
        opacity: 0.6
      }
    })
  };
};
const MonacoQueryField = (props) => {
  const id = v4();
  const overrideServicesRef = useRef(getOverrideServices());
  const containerRef = useRef(null);
  const { languageProvider, history, onBlur, onRunQuery, initialValue, placeholder, onChange, datasource } = props;
  const lpRef = useLatest(languageProvider);
  const historyRef = useLatest(history);
  const onRunQueryRef = useLatest(onRunQuery);
  const onBlurRef = useLatest(onBlur);
  const onChangeRef = useLatest(onChange);
  const autocompleteDisposeFun = useRef(null);
  const theme = useTheme2();
  const styles = getStyles(theme, placeholder);
  useEffect(() => {
    return () => {
      var _a;
      (_a = autocompleteDisposeFun.current) == null ? void 0 : _a.call(autocompleteDisposeFun);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-testid": selectors.components.QueryField.container,
      className: styles.container,
      ref: containerRef
    },
    /* @__PURE__ */ React.createElement(
      ReactMonacoEditor,
      {
        overrideServices: overrideServicesRef.current,
        options,
        language: "promql",
        value: initialValue,
        beforeMount: (monaco) => {
          ensurePromQL(monaco);
        },
        onMount: (editor, monaco) => {
          var _a;
          const isEditorFocused = editor.createContextKey("isEditorFocused" + id, false);
          editor.onDidBlurEditorWidget(() => {
            isEditorFocused.set(false);
            onBlurRef.current(editor.getValue());
          });
          editor.onDidFocusEditorText(() => {
            isEditorFocused.set(true);
          });
          const dataProvider = new DataProvider({
            historyProvider: historyRef.current,
            languageProvider: lpRef.current
          });
          const completionProvider = getCompletionProvider(monaco, dataProvider);
          const filteringCompletionProvider = __spreadProps(__spreadValues({}, completionProvider), {
            provideCompletionItems: (model, position, context, token) => {
              var _a2;
              if (((_a2 = editor.getModel()) == null ? void 0 : _a2.id) !== model.id) {
                return { suggestions: [] };
              }
              return completionProvider.provideCompletionItems(model, position, context, token);
            }
          });
          const { dispose } = monaco.languages.registerCompletionItemProvider(
            PROMQL_LANG_ID,
            filteringCompletionProvider
          );
          autocompleteDisposeFun.current = dispose;
          const updateElementHeight = () => {
            const containerDiv = containerRef.current;
            if (containerDiv !== null) {
              const pixelHeight = editor.getContentHeight();
              containerDiv.style.height = `${pixelHeight + EDITOR_HEIGHT_OFFSET}px`;
              containerDiv.style.width = "100%";
              const pixelWidth = containerDiv.clientWidth;
              editor.layout({ width: pixelWidth, height: pixelHeight });
            }
          };
          editor.onDidContentSizeChange(updateElementHeight);
          updateElementHeight();
          const updateCurrentEditorValue = debounce(() => {
            const editorValue = editor.getValue();
            onChangeRef.current(editorValue);
          }, lpRef.current.datasource.getDebounceTimeInMilliseconds());
          (_a = editor.getModel()) == null ? void 0 : _a.onDidChangeContent(() => {
            updateCurrentEditorValue();
          });
          editor.addCommand(
            monaco.KeyMod.Shift | monaco.KeyCode.Enter,
            () => {
              onRunQueryRef.current(editor.getValue());
            },
            "isEditorFocused" + id
          );
          monaco.editor.addKeybindingRule({
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
            command: null
          });
          editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, function() {
            global.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          });
          if (placeholder) {
            const placeholderDecorators = [
              {
                range: new monaco.Range(1, 1, 1, 1),
                options: {
                  className: styles.placeholder,
                  isWholeLine: true
                }
              }
            ];
            let decorators = [];
            const checkDecorators = () => {
              const model = editor.getModel();
              if (!model) {
                return;
              }
              const newDecorators = model.getValueLength() === 0 ? placeholderDecorators : [];
              decorators = model.deltaDecorations(decorators, newDecorators);
            };
            checkDecorators();
            editor.onDidChangeModelContent(checkDecorators);
            editor.onDidChangeModelContent((e) => {
              const model = editor.getModel();
              if (!model) {
                return;
              }
              const query = model.getValue();
              const errors = validateQuery(
                query,
                datasource.interpolateString(query, placeHolderScopedVars),
                model.getLinesContent(),
                parser
              ) || [];
              const markers = errors.map((_a2) => {
                var _b = _a2, { error } = _b, boundary = __objRest(_b, ["error"]);
                return __spreadValues({
                  message: `${error ? `Error parsing "${error}"` : "Parse error"}. The query appears to be incorrect and could fail to be executed.`,
                  severity: monaco.MarkerSeverity.Error
                }, boundary);
              });
              monaco.editor.setModelMarkers(model, "owner", markers);
            });
          }
        }
      }
    )
  );
};

export { MonacoQueryField as default };
//# sourceMappingURL=MonacoQueryField.js.map
