import { cx, css } from '@emotion/css';
import React__default from 'react';
import { components } from 'react-select';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { getFocusStyles } from '../../themes/mixins.js';
import { sharedInputStyle } from '../Forms/commonStyles.js';
import { getInputStyles } from '../Input/Input.js';

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
const SelectContainer = (props) => {
  const {
    isDisabled,
    isFocused,
    children,
    selectProps: { invalid = false }
  } = props;
  const styles = useStyles2(getSelectContainerStyles, isFocused, isDisabled, invalid);
  return /* @__PURE__ */ React__default.createElement(components.SelectContainer, __spreadProps(__spreadValues({}, props), { className: cx(styles.wrapper, props.className) }), children);
};
const getSelectContainerStyles = (theme, focused, disabled, invalid) => {
  const styles = getInputStyles({ theme, invalid });
  return {
    wrapper: cx(
      styles.wrapper,
      sharedInputStyle(theme, invalid),
      focused && css(getFocusStyles(theme)),
      disabled && styles.inputDisabled,
      css({
        position: "relative",
        boxSizing: "border-box",
        /* The display property is set by the styles prop in SelectBase because it's dependant on the width prop  */
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "space-between",
        minHeight: "32px",
        height: "auto",
        maxWidth: "100%",
        /* Input padding is applied to the InputControl so the menu is aligned correctly */
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer"
      })
    )
  };
};

export { SelectContainer };
//# sourceMappingURL=SelectContainer.js.map
