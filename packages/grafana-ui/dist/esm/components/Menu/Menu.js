import { cx, css } from '@emotion/css';
import React__default, { useRef, useImperativeHandle } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Box } from '../Layout/Box/Box.js';
import { MenuDivider } from './MenuDivider.js';
import { MenuGroup } from './MenuGroup.js';
import { MenuItem } from './MenuItem.js';
import { useMenuFocus } from './hooks.js';

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
const MenuComp = React__default.forwardRef(
  (_a, forwardedRef) => {
    var _b = _a, { header, children, ariaLabel, onOpen, onClose, onKeyDown } = _b, otherProps = __objRest(_b, ["header", "children", "ariaLabel", "onOpen", "onClose", "onKeyDown"]);
    const styles = useStyles2(getStyles);
    const localRef = useRef(null);
    useImperativeHandle(forwardedRef, () => localRef.current);
    const [handleKeys] = useMenuFocus({ isMenuOpen: true, localRef, onOpen, onClose, onKeyDown });
    return /* @__PURE__ */ React__default.createElement(
      Box,
      __spreadProps(__spreadValues({}, otherProps), {
        "aria-label": ariaLabel,
        backgroundColor: "primary",
        borderRadius: "default",
        boxShadow: "z3",
        display: "inline-block",
        onKeyDown: handleKeys,
        paddingX: 0,
        paddingY: 0.5,
        ref: localRef,
        role: "menu",
        tabIndex: -1
      }),
      header && /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: cx(
            styles.header,
            Boolean(children) && React__default.Children.toArray(children).length > 0 && styles.headerBorder
          )
        },
        header
      ),
      children
    );
  }
);
MenuComp.displayName = "Menu";
const Menu = Object.assign(MenuComp, {
  Item: MenuItem,
  Divider: MenuDivider,
  Group: MenuGroup
});
const getStyles = (theme) => {
  return {
    header: css({
      padding: theme.spacing(0.5, 1, 1, 1)
    }),
    headerBorder: css({
      borderBottom: `1px solid ${theme.colors.border.weak}`
    })
  };
};

export { Menu };
//# sourceMappingURL=Menu.js.map
