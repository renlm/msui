import { cx, css } from '@emotion/css';
import React__default, { useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { measureText } from '../../utils/measureText.js';
import { InlineLabel } from '../Forms/InlineLabel.js';
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
const FONT_SIZE = 14;
function SegmentInput(_a) {
  var _b = _a, {
    value: initialValue,
    onChange,
    Component,
    className,
    placeholder,
    inputPlaceholder,
    disabled,
    autofocus = false,
    onExpandedChange
  } = _b, rest = __objRest(_b, [
    "value",
    "onChange",
    "Component",
    "className",
    "placeholder",
    "inputPlaceholder",
    "disabled",
    "autofocus",
    "onExpandedChange"
  ]);
  const ref = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [inputWidth, setInputWidth] = useState(measureText((initialValue || "").toString(), FONT_SIZE).width);
  const [Label, , expanded, setExpanded] = useExpandableLabel(autofocus, onExpandedChange);
  const styles = useStyles2(getSegmentStyles);
  useClickAway(ref, () => {
    setExpanded(false);
    onChange(value);
  });
  if (!expanded) {
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
          initialValue || placeholder
        )
      }
    );
  }
  const inputWidthStyle = css({
    width: `${Math.max(inputWidth + 20, 32)}px`
  });
  return /* @__PURE__ */ React__default.createElement(
    "input",
    __spreadProps(__spreadValues({}, rest), {
      ref,
      autoFocus: true,
      className: cx(`gf-form gf-form-input`, inputWidthStyle),
      value,
      placeholder: inputPlaceholder,
      onChange: (item) => {
        const { width } = measureText(item.target.value, FONT_SIZE);
        setInputWidth(width);
        setValue(item.target.value);
      },
      onBlur: () => {
        setExpanded(false);
        onChange(value);
      },
      onKeyDown: (e) => {
        if ([13, 27].includes(e.keyCode)) {
          setExpanded(false);
          onChange(value);
        }
      }
    })
  );
}

export { SegmentInput };
//# sourceMappingURL=SegmentInput.js.map
