import { css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { useAsyncDependency } from '../../utils/useAsyncDependency.js';
import { ErrorWithStack } from '../ErrorBoundary/ErrorWithStack.js';
import { LoadingPlaceholder } from '../LoadingPlaceholder/LoadingPlaceholder.js';

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
const ReactMonacoEditorLazy = (props) => {
  var _a, _b;
  const styles = useStyles2(getStyles);
  const { loading, error, dependency } = useAsyncDependency(
    import(
      /* webpackChunkName: "react-monaco-editor" */
      './ReactMonacoEditor.js'
    )
  );
  if (loading) {
    return /* @__PURE__ */ React__default.createElement(LoadingPlaceholder, { text: "Loading editor", className: styles.container });
  }
  if (error) {
    return /* @__PURE__ */ React__default.createElement(
      ErrorWithStack,
      {
        title: "React Monaco Editor failed to load",
        error,
        errorInfo: { componentStack: (_a = error == null ? void 0 : error.stack) != null ? _a : "" }
      }
    );
  }
  const ReactMonacoEditor = dependency.ReactMonacoEditor;
  return /* @__PURE__ */ React__default.createElement(
    ReactMonacoEditor,
    __spreadProps(__spreadValues({}, props), {
      loading: (_b = props.loading) != null ? _b : null,
      wrapperProps: {
        "data-testid": selectors.components.ReactMonacoEditor.editorLazy
      }
    })
  );
};
const getStyles = (theme) => {
  return {
    container: css({
      marginBottom: "unset",
      marginLeft: theme.spacing(1)
    })
  };
};

export { ReactMonacoEditorLazy };
//# sourceMappingURL=ReactMonacoEditorLazy.js.map
