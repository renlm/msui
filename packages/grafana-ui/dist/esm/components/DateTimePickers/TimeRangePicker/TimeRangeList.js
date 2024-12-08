import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { t } from '../../../utils/i18n.js';
import { TimePickerTitle } from './TimePickerTitle.js';
import { TimeRangeOption } from './TimeRangeOption.js';
import { useListFocus } from './hooks.js';

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
const TimeRangeList = (props) => {
  const styles = useStyles2(getStyles);
  const { title, options, placeholderEmpty } = props;
  if (typeof placeholderEmpty !== "undefined" && options.length <= 0) {
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, placeholderEmpty);
  }
  if (!title) {
    return /* @__PURE__ */ React__default.createElement(Options, __spreadValues({}, props));
  }
  return /* @__PURE__ */ React__default.createElement("section", { "aria-label": title }, /* @__PURE__ */ React__default.createElement("fieldset", null, /* @__PURE__ */ React__default.createElement("div", { className: styles.title }, /* @__PURE__ */ React__default.createElement(TimePickerTitle, null, title)), /* @__PURE__ */ React__default.createElement(Options, __spreadValues({}, props))));
};
const Options = ({ options, value, onChange, title }) => {
  const styles = useStyles2(getOptionsStyles);
  const localRef = React__default.useRef(null);
  const [handleKeys] = useListFocus({ localRef, options });
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    "ul",
    {
      role: "presentation",
      onKeyDown: handleKeys,
      ref: localRef,
      "aria-roledescription": t("time-picker.time-range.aria-role", "Time range selection")
    },
    options.map((option, index) => /* @__PURE__ */ React__default.createElement(
      TimeRangeOption,
      {
        key: keyForOption(option, index),
        value: option,
        selected: isEqual(option, value),
        onSelect: onChange,
        name: title != null ? title : t("time-picker.time-range.default-title", "Time ranges")
      }
    ))
  ), /* @__PURE__ */ React__default.createElement("div", { className: styles.grow }));
};
function keyForOption(option, index) {
  return `${option.from}-${option.to}-${index}`;
}
function isEqual(x, y) {
  if (!y || !x) {
    return false;
  }
  return y.from === x.from && y.to === x.to;
}
const getStyles = () => ({
  title: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px 5px 9px"
  })
});
const getOptionsStyles = () => ({
  grow: css({
    flexGrow: 1,
    alignItems: "flex-start"
  })
});

export { TimeRangeList };
//# sourceMappingURL=TimeRangeList.js.map
