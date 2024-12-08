import { css } from '@emotion/css';
import React__default, { useMemo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers, fieldReducers, ReducerID } from '@grafana/data';
import { ComparisonOperation } from '@grafana/schema';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Input } from '../Input/Input.js';
import { Select } from '../Select/Select.js';

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
const comparisonOperationOptions = [
  { label: "==", value: ComparisonOperation.EQ },
  { label: "!=", value: ComparisonOperation.NEQ },
  { label: ">", value: ComparisonOperation.GT },
  { label: ">=", value: ComparisonOperation.GTE },
  { label: "<", value: ComparisonOperation.LT },
  { label: "<=", value: ComparisonOperation.LTE }
];
function isBooleanReducer(r) {
  return r === ReducerID.allIsNull || r === ReducerID.allIsZero;
}
const FieldValueMatcherEditor = ({ options, onChange }) => {
  const styles = useStyles2(getStyles);
  const reducer = useMemo(() => fieldReducers.selectOptions([options == null ? void 0 : options.reducer]), [options == null ? void 0 : options.reducer]);
  const onSetReducer = useCallback(
    (selection) => {
      return onChange(__spreadProps(__spreadValues({}, options), { reducer: selection.value }));
    },
    [options, onChange]
  );
  const onChangeOp = useCallback(
    (v) => {
      return onChange(__spreadProps(__spreadValues({}, options), { op: v.value }));
    },
    [options, onChange]
  );
  const onChangeValue = useCallback(
    (e) => {
      const value = e.currentTarget.valueAsNumber;
      return onChange(__spreadProps(__spreadValues({}, options), { value }));
    },
    [options, onChange]
  );
  const opts = options != null ? options : {};
  const isBool = isBooleanReducer(options.reducer);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.spot }, /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: reducer.current,
      options: reducer.options,
      onChange: onSetReducer,
      placeholder: "Select field reducer"
    }
  ), opts.reducer && !isBool && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: comparisonOperationOptions.find((v) => v.value === opts.op),
      options: comparisonOperationOptions,
      onChange: onChangeOp,
      "aria-label": "Comparison operator",
      width: 19
    }
  ), /* @__PURE__ */ React__default.createElement(Input, { type: "number", value: opts.value, onChange: onChangeValue })));
};
const getStyles = (theme) => {
  return {
    spot: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "flex-end",
      gap: "4px"
    })
  };
};
const fieldValueMatcherItem = {
  id: FieldMatcherID.byValue,
  component: FieldValueMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byValue),
  name: "Fields with values",
  description: "Set properties for fields with reducer condition",
  optionsToLabel: (options) => `${options == null ? void 0 : options.reducer} ${options == null ? void 0 : options.op} ${options == null ? void 0 : options.value}`
};

export { FieldValueMatcherEditor, comparisonOperationOptions, fieldValueMatcherItem };
//# sourceMappingURL=FieldValueMatcher.js.map
