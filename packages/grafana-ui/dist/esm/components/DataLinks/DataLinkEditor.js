import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { isCompactUrl } from '../../utils/dataLinks.js';
import { Field } from '../Forms/Field.js';
import { Input } from '../Input/Input.js';
import { Switch } from '../Switch/Switch.js';
import { DataLinkInput } from './DataLinkInput.js';

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
const getStyles = (theme) => ({
  listItem: css({
    marginBottom: theme.spacing()
  }),
  infoText: css({
    paddingBottom: theme.spacing(2),
    marginLeft: "66px",
    color: theme.colors.text.secondary
  })
});
const DataLinkEditor = React__default.memo(({ index, value, onChange, suggestions, isLast }) => {
  const styles = useStyles2(getStyles);
  const onUrlChange = (url, callback) => {
    onChange(index, __spreadProps(__spreadValues({}, value), { url }), callback);
  };
  const onTitleChange = (event) => {
    onChange(index, __spreadProps(__spreadValues({}, value), { title: event.target.value }));
  };
  const onOpenInNewTabChanged = () => {
    onChange(index, __spreadProps(__spreadValues({}, value), { targetBlank: !value.targetBlank }));
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.listItem }, /* @__PURE__ */ React__default.createElement(Field, { label: "Title" }, /* @__PURE__ */ React__default.createElement(Input, { value: value.title, onChange: onTitleChange, placeholder: "Show details" })), /* @__PURE__ */ React__default.createElement(
    Field,
    {
      label: "URL",
      invalid: isCompactUrl(value.url),
      error: "Data link is an Explore URL in a deprecated format. Please visit the URL to be redirected, and edit this data link to use that URL."
    },
    /* @__PURE__ */ React__default.createElement(DataLinkInput, { value: value.url, onChange: onUrlChange, suggestions })
  ), /* @__PURE__ */ React__default.createElement(Field, { label: "Open in new tab" }, /* @__PURE__ */ React__default.createElement(Switch, { value: value.targetBlank || false, onChange: onOpenInNewTabChanged })), isLast && /* @__PURE__ */ React__default.createElement("div", { className: styles.infoText }, "With data links you can reference data variables like series name, labels and values. Type CMD+Space, CTRL+Space, or $ to open variable suggestions."));
});
DataLinkEditor.displayName = "DataLinkEditor";

export { DataLinkEditor };
//# sourceMappingURL=DataLinkEditor.js.map
