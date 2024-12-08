import { css } from '@emotion/css';
import { offset, flip, shift, useFloating, autoUpdate, useClick, useDismiss, useInteractions } from '@floating-ui/react';
import { FocusScope } from '@react-aria/focus';
import React__default, { useState } from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { Menu } from '../Menu/Menu.js';
import { MenuItem } from '../Menu/MenuItem.js';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.js';
import '../ToolbarButton/ToolbarButtonRow.js';

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
const ButtonSelectComponent = (props) => {
  const _a = props, { className, options, value, onChange, narrow, variant } = _a, restProps = __objRest(_a, ["className", "options", "value", "onChange", "narrow", "variant"]);
  const styles = useStyles2(getStyles);
  const [isOpen, setIsOpen] = useState(false);
  const middleware = [
    offset(0),
    flip({
      fallbackAxisSideDirection: "end",
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-end",
    onOpenChange: setIsOpen,
    middleware,
    whileElementsMounted: autoUpdate
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
  const onChangeInternal = (item) => {
    onChange(item);
    setIsOpen(false);
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React__default.createElement(
    ToolbarButton,
    __spreadValues(__spreadValues({
      className,
      isOpen,
      narrow,
      variant,
      ref: refs.setReference
    }, getReferenceProps()), restProps),
    (value == null ? void 0 : value.label) || ((value == null ? void 0 : value.value) != null ? String(value == null ? void 0 : value.value) : null)
  ), isOpen && /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({ className: styles.menuWrapper, ref: refs.setFloating }, getFloatingProps()), { style: floatingStyles }), /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, autoFocus: true, restoreFocus: true }, /* @__PURE__ */ React__default.createElement(Menu, { tabIndex: -1, onClose: () => setIsOpen(false) }, options.map((item) => {
    var _a2;
    return /* @__PURE__ */ React__default.createElement(
      MenuItem,
      {
        key: `${item.value}`,
        label: (_a2 = item.label) != null ? _a2 : String(item.value),
        onClick: () => onChangeInternal(item),
        active: item.value === (value == null ? void 0 : value.value),
        ariaChecked: item.value === (value == null ? void 0 : value.value),
        ariaLabel: item.ariaLabel || item.label,
        disabled: item.isDisabled,
        component: item.component,
        role: "menuitemradio"
      }
    );
  })))));
};
ButtonSelectComponent.displayName = "ButtonSelect";
const ButtonSelect = React__default.memo(ButtonSelectComponent);
const getStyles = (theme) => {
  return {
    wrapper: css({
      position: "relative",
      display: "inline-flex"
    }),
    menuWrapper: css({
      zIndex: theme.zIndex.dropdown
    })
  };
};

export { ButtonSelect };
//# sourceMappingURL=ButtonSelect.js.map
