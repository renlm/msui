import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getChildId } from '../../utils/reactUtils.js';
import { FieldValidationMessage } from './FieldValidationMessage.js';
import { Label } from './Label.js';

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
const Field = React__default.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      label,
      description,
      horizontal,
      invalid,
      loading,
      disabled,
      required,
      error,
      children,
      className,
      validationMessageHorizontalOverflow,
      htmlFor
    } = _b, otherProps = __objRest(_b, [
      "label",
      "description",
      "horizontal",
      "invalid",
      "loading",
      "disabled",
      "required",
      "error",
      "children",
      "className",
      "validationMessageHorizontalOverflow",
      "htmlFor"
    ]);
    const styles = useStyles2(getFieldStyles);
    const inputId = htmlFor != null ? htmlFor : getChildId(children);
    const labelElement = typeof label === "string" ? /* @__PURE__ */ React__default.createElement(Label, { htmlFor: inputId, description }, `${label}${required ? " *" : ""}`) : label;
    const childProps = deleteUndefinedProps({ invalid, disabled, loading });
    return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: cx(styles.field, horizontal && styles.fieldHorizontal, className) }, otherProps), labelElement, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("div", { ref }, React__default.cloneElement(children, childProps)), invalid && error && !horizontal && /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: cx(styles.fieldValidationWrapper, {
          [styles.validationMessageHorizontalOverflow]: !!validationMessageHorizontalOverflow
        })
      },
      /* @__PURE__ */ React__default.createElement(FieldValidationMessage, null, error)
    )), invalid && error && horizontal && /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: cx(styles.fieldValidationWrapper, styles.fieldValidationWrapperHorizontal, {
          [styles.validationMessageHorizontalOverflow]: !!validationMessageHorizontalOverflow
        })
      },
      /* @__PURE__ */ React__default.createElement(FieldValidationMessage, null, error)
    ));
  }
);
Field.displayName = "Field";
function deleteUndefinedProps(obj) {
  for (const key in obj) {
    if (obj[key] === void 0) {
      delete obj[key];
    }
  }
  return obj;
}
const getFieldStyles = (theme) => ({
  field: css({
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2)
  }),
  fieldHorizontal: css({
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }),
  fieldValidationWrapper: css({
    marginTop: theme.spacing(0.5)
  }),
  fieldValidationWrapperHorizontal: css({
    flex: "1 1 100%"
  }),
  validationMessageHorizontalOverflow: css({
    width: 0,
    overflowX: "visible",
    "& > *": {
      whiteSpace: "nowrap"
    }
  })
});

export { Field, getFieldStyles };
//# sourceMappingURL=Field.js.map
