import { css } from '@emotion/css';
import { debounce } from 'lodash';
import React__default, { useRef, useCallback, useMemo } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Field } from '../Forms/Field.js';
import { InlineToast } from '../InlineToast/InlineToast.js';
import { EllipsisAnimated } from './EllipsisAnimated.js';

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
const SHOW_SUCCESS_DURATION = 2 * 1e3;
function AutoSaveField(props) {
  const _a = props, {
    invalid,
    loading,
    onFinishChange,
    saveErrorMessage = "Error saving this value",
    error,
    children,
    disabled
  } = _a, restProps = __objRest(_a, [
    "invalid",
    "loading",
    "onFinishChange",
    "saveErrorMessage",
    "error",
    "children",
    "disabled"
  ]);
  const [fieldState, setFieldState] = React__default.useState({
    isLoading: false,
    showSuccess: false,
    showError: invalid
  });
  const fieldRef = useRef(null);
  React__default.useEffect(() => {
    let timeoutId;
    if (fieldState.showSuccess) {
      const time = fieldState.showError ? 0 : SHOW_SUCCESS_DURATION;
      timeoutId = setTimeout(() => {
        setFieldState(__spreadProps(__spreadValues({}, fieldState), { showSuccess: false }));
      }, time);
    }
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fieldState]);
  const handleChange = useCallback(
    (nextValue) => {
      if (invalid) {
        return;
      }
      setFieldState(__spreadProps(__spreadValues({}, fieldState), { isLoading: true, showSuccess: false }));
      onFinishChange(nextValue).then(() => {
        setFieldState({
          isLoading: false,
          showSuccess: true,
          showError: false
        });
      }).catch(() => {
        setFieldState(__spreadProps(__spreadValues({}, fieldState), {
          isLoading: false,
          showError: true
        }));
      });
    },
    [invalid, fieldState, onFinishChange]
  );
  const lodashDebounce = useMemo(() => debounce(handleChange, 600, { leading: false }), [handleChange]);
  const isInvalid = invalid || fieldState.showError || void 0;
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    Field,
    __spreadProps(__spreadValues({}, restProps), {
      loading: loading || void 0,
      invalid: isInvalid,
      disabled,
      error: error || fieldState.showError && saveErrorMessage,
      ref: fieldRef,
      className: styles.widthFitContent
    }),
    React__default.cloneElement(
      children((newValue) => {
        lodashDebounce(newValue);
      })
    )
  ), fieldState.isLoading && /* @__PURE__ */ React__default.createElement(InlineToast, { referenceElement: fieldRef.current, placement: "right" }, "Saving ", /* @__PURE__ */ React__default.createElement(EllipsisAnimated, null)), fieldState.showSuccess && /* @__PURE__ */ React__default.createElement(InlineToast, { suffixIcon: "check", referenceElement: fieldRef.current, placement: "right" }, "Saved!"));
}
AutoSaveField.displayName = "AutoSaveField";
const getStyles = () => {
  return {
    widthFitContent: css({
      width: "fit-content"
    })
  };
};

export { AutoSaveField };
//# sourceMappingURL=AutoSaveField.js.map
