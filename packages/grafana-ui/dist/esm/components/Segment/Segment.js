import { cx } from '@emotion/css';
import { isObject } from 'lodash';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
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
function Segment(_a) {
  var _b = _a, {
    options,
    value,
    onChange,
    Component,
    className,
    allowCustomValue,
    allowEmptyValue,
    placeholder,
    disabled,
    inputMinWidth,
    inputPlaceholder,
    onExpandedChange,
    autofocus = false
  } = _b, rest = __objRest(_b, [
    "options",
    "value",
    "onChange",
    "Component",
    "className",
    "allowCustomValue",
    "allowEmptyValue",
    "placeholder",
    "disabled",
    "inputMinWidth",
    "inputPlaceholder",
    "onExpandedChange",
    "autofocus"
  ]);
  const [Label, labelWidth, expanded, setExpanded] = useExpandableLabel(autofocus, onExpandedChange);
  const width = inputMinWidth ? Math.max(inputMinWidth, labelWidth) : labelWidth;
  const styles = useStyles2(getSegmentStyles);
  if (!expanded) {
    const label = isObject(value) ? value.label : value;
    const labelAsString = label != null ? String(label) : void 0;
    return /* @__PURE__ */ React__default.createElement(
      Label,
      {
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
      options,
      width,
      onClickOutside: () => setExpanded(false),
      allowCustomValue,
      allowEmptyValue,
      onChange: (item) => {
        setExpanded(false);
        onChange(item);
      }
    })
  );
}

export { Segment };
//# sourceMappingURL=Segment.js.map
