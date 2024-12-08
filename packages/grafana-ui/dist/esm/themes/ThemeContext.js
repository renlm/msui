import hoistNonReactStatics from 'hoist-non-react-statics';
import memoize from 'micro-memoize';
import React__default, { useContext } from 'react';
import { ThemeContext } from '@grafana/data';
import { stylesFactory } from './stylesFactory.js';

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
let ThemeContextMock = null;
const memoizedStyleCreators = /* @__PURE__ */ new WeakMap();
const withTheme = (Component) => {
  const WithTheme = (props) => {
    const ContextComponent = ThemeContextMock || ThemeContext;
    return (
      // @ts-ignore
      /* @__PURE__ */ React__default.createElement(ContextComponent.Consumer, null, (theme) => /* @__PURE__ */ React__default.createElement(Component, __spreadProps(__spreadValues({}, props), { theme: theme.v1 })))
    );
  };
  WithTheme.displayName = `WithTheme(${Component.displayName})`;
  hoistNonReactStatics(WithTheme, Component);
  return WithTheme;
};
const withTheme2 = (Component) => {
  const WithTheme = (props) => {
    const ContextComponent = ThemeContextMock || ThemeContext;
    return (
      // @ts-ignore
      /* @__PURE__ */ React__default.createElement(ContextComponent.Consumer, null, (theme) => /* @__PURE__ */ React__default.createElement(Component, __spreadProps(__spreadValues({}, props), { theme })))
    );
  };
  WithTheme.displayName = `WithTheme(${Component.displayName})`;
  hoistNonReactStatics(WithTheme, Component);
  return WithTheme;
};
function useTheme() {
  return useContext(ThemeContextMock || ThemeContext).v1;
}
function useTheme2() {
  return useContext(ThemeContextMock || ThemeContext);
}
function useStyles(getStyles) {
  const theme = useTheme();
  let memoizedStyleCreator = memoizedStyleCreators.get(getStyles);
  if (!memoizedStyleCreator) {
    memoizedStyleCreator = stylesFactory(getStyles);
    memoizedStyleCreators.set(getStyles, memoizedStyleCreator);
  }
  return memoizedStyleCreator(theme);
}
function useStyles2(getStyles, ...additionalArguments) {
  const theme = useTheme2();
  let memoizedStyleCreator = memoizedStyleCreators.get(getStyles);
  if (!memoizedStyleCreator) {
    memoizedStyleCreator = memoize(getStyles, { maxSize: 10 });
    memoizedStyleCreators.set(getStyles, memoizedStyleCreator);
  }
  return memoizedStyleCreator(theme, ...additionalArguments);
}
const mockThemeContext = (theme) => {
  ThemeContextMock = React__default.createContext(theme);
  return () => {
    ThemeContextMock = null;
  };
};

export { memoizedStyleCreators, mockThemeContext, useStyles, useStyles2, useTheme, useTheme2, withTheme, withTheme2 };
//# sourceMappingURL=ThemeContext.js.map
