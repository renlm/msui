import { cx } from '@emotion/css';
import 'lodash';
import React from 'react';
import 'react-window';
import { toIconName } from '@grafana/data';
import { useTheme2, getSelectStyles, Icon } from '@grafana/ui';
import { selectors } from '../../../../../../grafana-e2e-selectors/src/selectors/index.js';

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
const SelectMenuOptions = ({
  children,
  data,
  innerProps,
  innerRef,
  isFocused,
  isSelected,
  renderOptionLabel
}) => {
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  const icon = data.icon ? toIconName(data.icon) : void 0;
  const _a = innerProps, rest = __objRest(_a, ["onMouseMove", "onMouseOver"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadProps(__spreadValues({
      ref: innerRef,
      className: cx(
        styles.option,
        isFocused && styles.optionFocused,
        isSelected && styles.optionSelected,
        data.isDisabled && styles.optionDisabled
      )
    }, rest), {
      "data-testid": selectors.components.Select.option,
      title: data.title
    }),
    icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, className: styles.optionIcon }),
    data.imgUrl && /* @__PURE__ */ React.createElement("img", { className: styles.optionImage, src: data.imgUrl, alt: data.label || String(data.value) }),
    /* @__PURE__ */ React.createElement("div", { className: styles.optionBody }, /* @__PURE__ */ React.createElement("span", null, renderOptionLabel ? renderOptionLabel(data) : children), data.description && /* @__PURE__ */ React.createElement("div", { className: styles.optionDescription }, data.description), data.component && /* @__PURE__ */ React.createElement(data.component, null))
  );
};
SelectMenuOptions.displayName = "SelectMenuOptions";

export { SelectMenuOptions };
//# sourceMappingURL=SelectBase.js.map
