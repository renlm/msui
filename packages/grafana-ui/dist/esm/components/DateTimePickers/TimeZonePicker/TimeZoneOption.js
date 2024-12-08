import { cx, css } from '@emotion/css';
import { isString } from 'lodash';
import React__default from 'react';
import { getTimeZoneInfo } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { Icon } from '../../Icon/Icon.js';
import { TimeZoneDescription } from './TimeZoneDescription.js';
import { TimeZoneOffset } from './TimeZoneOffset.js';
import { TimeZoneTitle } from './TimeZoneTitle.js';

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
const offsetClassName = "tz-utc-offset";
const WideTimeZoneOption = (props) => {
  const { children, innerProps, innerRef, data, isSelected, isFocused } = props;
  const styles = useStyles2(getStyles);
  const timestamp = Date.now();
  const containerStyles = cx(styles.container, isFocused && styles.containerFocused);
  if (!isString(data.value)) {
    return null;
  }
  const timeZoneInfo = getTimeZoneInfo(data.value, timestamp);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: containerStyles }, innerProps), { ref: innerRef, "data-testid": selectors.components.Select.option }), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.leftColumn, styles.row) }, /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.leftColumn, styles.wideRow) }, /* @__PURE__ */ React__default.createElement(TimeZoneTitle, { title: children }), /* @__PURE__ */ React__default.createElement("div", { className: styles.spacer }), /* @__PURE__ */ React__default.createElement(TimeZoneDescription, { info: timeZoneInfo })), /* @__PURE__ */ React__default.createElement("div", { className: styles.rightColumn }, /* @__PURE__ */ React__default.createElement(
    TimeZoneOffset,
    {
      timeZone: (timeZoneInfo == null ? void 0 : timeZoneInfo.ianaName) || data.value,
      timestamp,
      className: offsetClassName
    }
  ), isSelected && /* @__PURE__ */ React__default.createElement("span", null, /* @__PURE__ */ React__default.createElement(Icon, { name: "check" })))));
};
const CompactTimeZoneOption = (props) => {
  const { children, innerProps, innerRef, data, isSelected, isFocused } = props;
  const styles = useStyles2(getStyles);
  const timestamp = Date.now();
  const containerStyles = cx(styles.container, isFocused && styles.containerFocused);
  if (!isString(data.value)) {
    return null;
  }
  const timeZoneInfo = getTimeZoneInfo(data.value, timestamp);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: containerStyles }, innerProps), { ref: innerRef, "data-testid": selectors.components.Select.option }), /* @__PURE__ */ React__default.createElement("div", { className: styles.body }, /* @__PURE__ */ React__default.createElement("div", { className: styles.row }, /* @__PURE__ */ React__default.createElement("div", { className: styles.leftColumn }, /* @__PURE__ */ React__default.createElement(TimeZoneTitle, { title: children })), /* @__PURE__ */ React__default.createElement("div", { className: styles.rightColumn }, isSelected && /* @__PURE__ */ React__default.createElement("span", null, /* @__PURE__ */ React__default.createElement(Icon, { name: "check" })))), /* @__PURE__ */ React__default.createElement("div", { className: styles.row }, /* @__PURE__ */ React__default.createElement("div", { className: styles.leftColumn }, /* @__PURE__ */ React__default.createElement(TimeZoneDescription, { info: timeZoneInfo })), /* @__PURE__ */ React__default.createElement("div", { className: styles.rightColumn }, /* @__PURE__ */ React__default.createElement(
    TimeZoneOffset,
    {
      timestamp,
      timeZone: (timeZoneInfo == null ? void 0 : timeZoneInfo.ianaName) || data.value,
      className: offsetClassName
    }
  )))));
};
const getStyles = (theme) => ({
  container: css({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
    whiteSpace: "nowrap",
    cursor: "pointer",
    padding: "6px 8px 4px",
    "&:hover": {
      background: theme.colors.action.hover
    }
  }),
  containerFocused: css({
    background: theme.colors.action.hover
  }),
  body: css({
    display: "flex",
    fontWeight: theme.typography.fontWeightMedium,
    flexDirection: "column",
    flexGrow: 1
  }),
  row: css({
    display: "flex",
    flexDirection: "row"
  }),
  leftColumn: css({
    flexGrow: 1,
    textOverflow: "ellipsis"
  }),
  rightColumn: css({
    justifyContent: "flex-end",
    alignItems: "center"
  }),
  wideRow: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }),
  spacer: css({
    marginLeft: "6px"
  })
});

export { CompactTimeZoneOption, WideTimeZoneOption };
//# sourceMappingURL=TimeZoneOption.js.map
