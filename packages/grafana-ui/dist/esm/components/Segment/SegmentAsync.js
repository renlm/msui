import { cx } from '@emotion/css';
import { isObject } from 'lodash';
import React__default from 'react';
import { useAsyncFn } from 'react-use';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { t } from '../../utils/i18n.js';
import { InlineLabel } from '../Forms/InlineLabel.js';
import { SegmentSelect } from './SegmentSelect.js';
import { getSegmentStyles } from './styles.js';
import { useExpandableLabel } from './useExpandableLabel.js';

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
function SegmentAsync(_a) {
  var _b = _a, {
    value,
    onChange,
    loadOptions,
    reloadOptionsOnChange = false,
    Component,
    className,
    allowCustomValue,
    allowEmptyValue,
    disabled,
    placeholder,
    inputMinWidth,
    inputPlaceholder,
    autofocus = false,
    onExpandedChange,
    noOptionMessageHandler = mapStateToNoOptionsMessage
  } = _b, rest = __objRest(_b, [
    "value",
    "onChange",
    "loadOptions",
    "reloadOptionsOnChange",
    "Component",
    "className",
    "allowCustomValue",
    "allowEmptyValue",
    "disabled",
    "placeholder",
    "inputMinWidth",
    "inputPlaceholder",
    "autofocus",
    "onExpandedChange",
    "noOptionMessageHandler"
  ]);
  var _a2;
  const [state, fetchOptions] = useAsyncFn(loadOptions, [loadOptions]);
  const [Label, labelWidth, expanded, setExpanded] = useExpandableLabel(autofocus, onExpandedChange);
  const width = inputMinWidth ? Math.max(inputMinWidth, labelWidth) : labelWidth;
  const styles = useStyles2(getSegmentStyles);
  if (!expanded) {
    const label = isObject(value) ? value.label : value;
    const labelAsString = label != null ? String(label) : void 0;
    return /* @__PURE__ */ React__default.createElement(
      Label,
      {
        onClick: reloadOptionsOnChange ? void 0 : fetchOptions,
        disabled,
        Component: Component || /* @__PURE__ */ React__default.createElement(
          InlineLabel,
          {
            className: cx(
              styles.segment,
              {
                [styles.queryPlaceholder]: placeholder !== void 0 && !value,
                [styles.disabled]: disabled
              },
              className
            )
          },
          labelAsString || placeholder
        )
      }
    );
  }
  return /* @__PURE__ */ React__default.createElement(
    SegmentSelect,
    __spreadProps(__spreadValues({}, rest), {
      value: value && !isObject(value) ? { value } : value,
      placeholder: inputPlaceholder,
      options: (_a2 = state.value) != null ? _a2 : [],
      loadOptions: reloadOptionsOnChange ? fetchOptions : void 0,
      width,
      noOptionsMessage: noOptionMessageHandler(state),
      allowCustomValue,
      allowEmptyValue,
      onClickOutside: () => {
        setExpanded(false);
      },
      onChange: (item) => {
        setExpanded(false);
        onChange(item);
      }
    })
  );
}
function mapStateToNoOptionsMessage(state) {
  if (state.loading) {
    return t("grafana-ui.segment-async.loading", "Loading options...");
  }
  if (state.error) {
    return t("grafana-ui.segment-async.error", "Failed to load options");
  }
  return t("grafana-ui.segment-async.no-options", "No options found");
}

export { SegmentAsync };
//# sourceMappingURL=SegmentAsync.js.map
