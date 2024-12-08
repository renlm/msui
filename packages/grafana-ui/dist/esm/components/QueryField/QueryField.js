import { cx, css } from '@emotion/css';
import classNames from 'classnames';
import { debounce } from 'lodash';
import React__default, { PureComponent } from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { selectors } from '@grafana/e2e-selectors';
import 'uuid';
import { ClearPlugin } from '../../slate-plugins/clear.js';
import { ClipboardPlugin } from '../../slate-plugins/clipboard.js';
import { IndentationPlugin } from '../../slate-plugins/indentation.js';
import { NewlinePlugin } from '../../slate-plugins/newline.js';
import { RunnerPlugin } from '../../slate-plugins/runner.js';
import { SelectionShortcutsPlugin } from '../../slate-plugins/selection_shortcuts.js';
import 'prismjs';
import 'slate';
import '../../slate-plugins/slate-prism/options.js';
import { SuggestionsPlugin } from '../../slate-plugins/suggestions.js';
import '@grafana/data';
import { withTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { makeValue, SCHEMA } from '../../utils/slate.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnThemedQueryField extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "plugins");
    __publicField(this, "runOnChangeDebounced");
    __publicField(this, "lastExecutedValue", null);
    __publicField(this, "mounted", false);
    __publicField(this, "editor", null);
    /**
     * Update local state, propagate change upstream and optionally run the query afterwards.
     */
    __publicField(this, "onChange", (value, runQuery) => {
      const documentChanged = value.document !== this.state.value.document;
      const prevValue = this.state.value;
      if (this.props.onRichValueChange) {
        this.props.onRichValueChange(value);
      }
      this.setState({ value }, () => {
        if (documentChanged) {
          const textChanged = Plain.serialize(prevValue) !== Plain.serialize(value);
          if (textChanged && runQuery) {
            this.runOnChangeAndRunQuery();
          }
          if (textChanged && !runQuery) {
            this.runOnChangeDebounced();
          }
        }
      });
    });
    __publicField(this, "runOnChange", () => {
      const { onChange } = this.props;
      const value = Plain.serialize(this.state.value);
      if (onChange) {
        onChange(this.cleanText(value));
      }
    });
    __publicField(this, "runOnRunQuery", () => {
      const { onRunQuery } = this.props;
      if (onRunQuery) {
        onRunQuery();
        this.lastExecutedValue = this.state.value;
      }
    });
    __publicField(this, "runOnChangeAndRunQuery", () => {
      this.runOnChange();
      this.runOnRunQuery();
    });
    /**
     * We need to handle blur events here mainly because of dashboard panels which expect to have query executed on blur.
     */
    __publicField(this, "handleBlur", (_, editor, next) => {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur();
      } else {
        const previousValue = this.lastExecutedValue ? Plain.serialize(this.lastExecutedValue) : "";
        const currentValue = Plain.serialize(editor.value);
        if (previousValue !== currentValue) {
          this.runOnChangeAndRunQuery();
        }
      }
      return next();
    });
    this.runOnChangeDebounced = debounce(this.runOnChange, 500);
    const { onTypeahead, cleanText, portalOrigin, onWillApplySuggestion } = props;
    this.plugins = [
      // SuggestionsPlugin and RunnerPlugin need to be before NewlinePlugin
      // because they override Enter behavior
      SuggestionsPlugin({ onTypeahead, cleanText, portalOrigin, onWillApplySuggestion }),
      RunnerPlugin({ handler: this.runOnChangeAndRunQuery }),
      NewlinePlugin(),
      ClearPlugin(),
      SelectionShortcutsPlugin(),
      IndentationPlugin(),
      ClipboardPlugin(),
      ...props.additionalPlugins || []
    ].filter((p) => p);
    this.state = {
      suggestions: [],
      typeaheadContext: null,
      typeaheadPrefix: "",
      typeaheadText: "",
      value: makeValue(props.query || "", props.syntax)
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidUpdate(prevProps, prevState) {
    const { query, syntax, syntaxLoaded } = this.props;
    if (!prevProps.syntaxLoaded && syntaxLoaded && this.editor) {
      const editor = this.editor.insertText(" ").deleteBackward(1);
      this.onChange(editor.value, true);
    }
    const { value } = this.state;
    if (query !== prevProps.query) {
      if (query !== Plain.serialize(value)) {
        this.setState({ value: makeValue(query || "", syntax) });
      }
    }
  }
  cleanText(text) {
    const newText = text.replace(/[\r]/g, "");
    return newText;
  }
  render() {
    const { disabled, theme } = this.props;
    const wrapperClassName = classNames("slate-query-field__wrapper", {
      "slate-query-field__wrapper--disabled": disabled
    });
    const styles = getStyles(theme);
    return /* @__PURE__ */ React__default.createElement("div", { className: cx(wrapperClassName, styles.wrapper) }, /* @__PURE__ */ React__default.createElement("div", { className: "slate-query-field", "data-testid": selectors.components.QueryField.container }, /* @__PURE__ */ React__default.createElement(
      Editor,
      {
        ref: (editor) => this.editor = editor,
        schema: SCHEMA,
        autoCorrect: false,
        readOnly: this.props.disabled,
        onBlur: this.handleBlur,
        onClick: this.props.onClick,
        onChange: (change) => {
          this.onChange(change.value, false);
        },
        placeholder: this.props.placeholder,
        plugins: this.plugins,
        spellCheck: false,
        value: this.state.value
      }
    )));
  }
}
const QueryField = withTheme2(UnThemedQueryField);
QueryField.defaultProps = {
  onBlur: () => {
  }
};
const getStyles = (theme) => {
  const focusStyles = getFocusStyles(theme);
  return {
    wrapper: css({
      "&:focus-within": focusStyles
    })
  };
};

export { QueryField, UnThemedQueryField };
//# sourceMappingURL=QueryField.js.map
