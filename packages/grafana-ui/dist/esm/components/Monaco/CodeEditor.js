import { css } from '@emotion/css';
import React__default, { PureComponent } from 'react';
import { monacoLanguageRegistry } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { withTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { ReactMonacoEditorLazy } from './ReactMonacoEditorLazy.js';
import { registerSuggestions } from './suggestions.js';

var __defProp = Object.defineProperty;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnthemedCodeEditor extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "completionCancel");
    __publicField(this, "monaco");
    __publicField(this, "modelId");
    __publicField(this, "loadCustomLanguage", () => {
      const { language } = this.props;
      const customLanguage = monacoLanguageRegistry.getIfExists(language);
      if (customLanguage) {
        return customLanguage.init();
      }
      return Promise.resolve();
    });
    // This is replaced with a real function when the actual editor mounts
    __publicField(this, "getEditorValue", () => "");
    __publicField(this, "onBlur", () => {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur(this.getEditorValue());
      }
    });
    __publicField(this, "onFocus", () => {
      const { onFocus } = this.props;
      if (onFocus) {
        onFocus(this.getEditorValue());
      }
    });
    __publicField(this, "onSave", () => {
      const { onSave } = this.props;
      if (onSave) {
        onSave(this.getEditorValue());
      }
    });
    __publicField(this, "handleBeforeMount", (monaco) => {
      this.monaco = monaco;
      const { onBeforeEditorMount } = this.props;
      onBeforeEditorMount == null ? void 0 : onBeforeEditorMount(monaco);
    });
    __publicField(this, "handleOnMount", (editor, monaco) => {
      var _a, _b;
      const { getSuggestions, language, onChange, onEditorDidMount } = this.props;
      this.modelId = (_a = editor.getModel()) == null ? void 0 : _a.id;
      this.getEditorValue = () => editor.getValue();
      if (getSuggestions && this.modelId) {
        this.completionCancel = registerSuggestions(monaco, language, getSuggestions, this.modelId);
      }
      editor.onKeyDown((e) => {
        if (e.keyCode === monaco.KeyCode.KeyS && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          this.onSave();
        }
      });
      if (onChange) {
        (_b = editor.getModel()) == null ? void 0 : _b.onDidChangeContent(() => onChange(editor.getValue()));
      }
      if (onEditorDidMount) {
        onEditorDidMount(editor, monaco);
      }
    });
  }
  componentWillUnmount() {
    var _a, _b;
    if (this.completionCancel) {
      this.completionCancel.dispose();
    }
    (_b = (_a = this.props).onEditorWillUnmount) == null ? void 0 : _b.call(_a);
  }
  componentDidUpdate(oldProps) {
    const { getSuggestions, language } = this.props;
    const newLanguage = oldProps.language !== language;
    const newGetSuggestions = oldProps.getSuggestions !== getSuggestions;
    if (newGetSuggestions || newLanguage) {
      if (this.completionCancel) {
        this.completionCancel.dispose();
      }
      if (!this.monaco) {
        console.warn("Monaco instance not loaded yet");
        return;
      }
      if (getSuggestions && this.modelId) {
        this.completionCancel = registerSuggestions(this.monaco, language, getSuggestions, this.modelId);
      }
    }
    if (newLanguage) {
      this.loadCustomLanguage();
    }
  }
  render() {
    var _b, _c;
    const { theme, language, width, height, showMiniMap, showLineNumbers, readOnly, monacoOptions } = this.props;
    const _a = monacoOptions != null ? monacoOptions : {}, { alwaysConsumeMouseWheel } = _a, restMonacoOptions = __objRest(_a, ["alwaysConsumeMouseWheel"]);
    const value = (_b = this.props.value) != null ? _b : "";
    const longText = value.length > 100;
    const containerStyles = (_c = this.props.containerStyles) != null ? _c : getStyles(theme).container;
    const options = {
      wordWrap: "off",
      tabSize: 2,
      codeLens: false,
      contextmenu: false,
      minimap: {
        enabled: longText && showMiniMap,
        renderCharacters: false
      },
      readOnly,
      lineNumbersMinChars: 4,
      lineDecorationsWidth: 1 * theme.spacing.gridSize,
      overviewRulerBorder: false,
      automaticLayout: true,
      padding: {
        top: 0.5 * theme.spacing.gridSize,
        bottom: 0.5 * theme.spacing.gridSize
      },
      fixedOverflowWidgets: true,
      // Ensures suggestions menu is drawn on top
      scrollbar: {
        alwaysConsumeMouseWheel: alwaysConsumeMouseWheel != null ? alwaysConsumeMouseWheel : false
      }
    };
    if (!showLineNumbers) {
      options.glyphMargin = false;
      options.folding = false;
      options.lineNumbers = "off";
      options.lineNumbersMinChars = 0;
    }
    return /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: containerStyles,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        "data-testid": selectors.components.CodeEditor.container
      },
      /* @__PURE__ */ React__default.createElement(
        ReactMonacoEditorLazy,
        {
          width,
          height,
          language,
          value,
          options: __spreadValues(__spreadValues({}, options), restMonacoOptions != null ? restMonacoOptions : {}),
          beforeMount: this.handleBeforeMount,
          onMount: this.handleOnMount,
          keepCurrentModel: true
        }
      )
    );
  }
}
const CodeEditor = withTheme2(UnthemedCodeEditor);
const getStyles = (theme) => {
  return {
    container: css({
      borderRadius: theme.shape.radius.default,
      border: `1px solid ${theme.components.input.borderColor}`
    })
  };
};

export { CodeEditor };
//# sourceMappingURL=CodeEditor.js.map
