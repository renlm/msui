import { cx, css } from '@emotion/css';
import React__default, { useState, useCallback, useRef, useImperativeHandle } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { Stack } from '../Layout/Stack/Stack.js';
import { SubMenu } from './SubMenu.js';

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
const MenuItem = React__default.memo(
  React__default.forwardRef((props, ref) => {
    const {
      url,
      icon,
      label,
      description,
      ariaLabel,
      ariaChecked,
      target,
      onClick,
      className,
      active,
      disabled,
      destructive,
      childItems,
      role,
      tabIndex = -1,
      customSubMenuContainerStyles,
      shortcut,
      testId
    } = props;
    const styles = useStyles2(getStyles);
    const [isActive, setIsActive] = useState(active);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const onMouseEnter = useCallback(() => {
      if (disabled) {
        return;
      }
      setIsSubMenuOpen(true);
      setIsActive(true);
    }, [disabled]);
    const onMouseLeave = useCallback(() => {
      if (disabled) {
        return;
      }
      setIsSubMenuOpen(false);
      setIsActive(false);
    }, [disabled]);
    const hasSubMenu = childItems && childItems.length > 0;
    const ItemElement = hasSubMenu ? "div" : url === void 0 ? "button" : "a";
    const itemStyle = cx(
      {
        [styles.item]: true,
        [styles.active]: isActive,
        [styles.disabled]: disabled,
        [styles.destructive]: destructive && !disabled
      },
      className
    );
    const disabledProps = __spreadValues(__spreadValues({
      [ItemElement === "button" ? "disabled" : "aria-disabled"]: disabled
    }, ItemElement === "a" && disabled && { href: void 0, onClick: void 0 }), disabled && {
      tabIndex: -1,
      ["data-disabled"]: disabled
      // used to identify disabled items in Menu.tsx
    });
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);
    const handleKeys = (event) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          event.stopPropagation();
          if (hasSubMenu) {
            setIsSubMenuOpen(true);
            setIsActive(true);
          }
          break;
      }
    };
    const closeSubMenu = () => {
      var _a;
      setIsSubMenuOpen(false);
      setIsActive(false);
      (_a = localRef == null ? void 0 : localRef.current) == null ? void 0 : _a.focus();
    };
    const hasShortcut = Boolean(shortcut && shortcut.length > 0);
    return /* @__PURE__ */ React__default.createElement(
      ItemElement,
      __spreadValues({
        target,
        className: itemStyle,
        rel: target === "_blank" ? "noopener noreferrer" : void 0,
        href: url,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onKeyDown: handleKeys,
        role: !url ? role || "menuitem" : role,
        "data-role": "menuitem",
        ref: localRef,
        "data-testid": testId,
        "aria-label": ariaLabel,
        "aria-checked": ariaChecked,
        tabIndex
      }, disabledProps),
      /* @__PURE__ */ React__default.createElement(Stack, { direction: "row", justifyContent: "flex-start", alignItems: "center" }, icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, className: styles.icon, "aria-hidden": true }), /* @__PURE__ */ React__default.createElement("span", { className: styles.ellipsis }, label), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.rightWrapper, { [styles.withShortcut]: hasShortcut }) }, hasShortcut && /* @__PURE__ */ React__default.createElement("div", { className: styles.shortcut }, /* @__PURE__ */ React__default.createElement(Icon, { name: "keyboard", title: "keyboard shortcut" }), shortcut), hasSubMenu && /* @__PURE__ */ React__default.createElement(
        SubMenu,
        {
          items: childItems,
          isOpen: isSubMenuOpen,
          close: closeSubMenu,
          customStyle: customSubMenuContainerStyles
        }
      ))),
      description && /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: cx(styles.description, styles.ellipsis, {
            [styles.descriptionWithIcon]: icon !== void 0
          })
        },
        description
      ),
      props.component ? /* @__PURE__ */ React__default.createElement(props.component, null) : null
    );
  })
);
MenuItem.displayName = "MenuItem";
const getStyles = (theme) => {
  return {
    item: css({
      background: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
      color: theme.colors.text.primary,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      padding: theme.spacing(0.5, 2),
      minHeight: theme.spacing(4),
      margin: 0,
      border: "none",
      width: "100%",
      position: "relative",
      "&:hover, &:focus-visible": {
        background: theme.colors.action.hover,
        color: theme.colors.text.primary,
        textDecoration: "none"
      },
      "&:focus-visible": getFocusStyles(theme)
    }),
    active: css({
      background: theme.colors.action.hover
    }),
    destructive: css({
      color: theme.colors.error.text,
      svg: {
        color: theme.colors.error.text
      },
      "&:hover, &:focus, &:focus-visible": {
        background: theme.colors.error.main,
        color: theme.colors.error.contrastText,
        svg: {
          color: theme.colors.error.contrastText
        }
      }
    }),
    disabled: css({
      color: theme.colors.action.disabledText,
      label: "menu-item-disabled",
      "&:hover, &:focus, &:focus-visible": {
        cursor: "not-allowed",
        background: "none",
        color: theme.colors.action.disabledText
      }
    }),
    icon: css({
      opacity: 0.7,
      color: theme.colors.text.secondary
    }),
    rightWrapper: css({
      display: "flex",
      alignItems: "center",
      marginLeft: "auto"
    }),
    withShortcut: css({
      minWidth: theme.spacing(10.5)
    }),
    shortcut: css({
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
      marginLeft: theme.spacing(2),
      color: theme.colors.text.secondary,
      opacity: 0.7
    }),
    description: css(__spreadProps(__spreadValues({}, theme.typography.bodySmall), {
      color: theme.colors.text.secondary,
      textAlign: "start"
    })),
    descriptionWithIcon: css({
      marginLeft: theme.spacing(3)
    }),
    ellipsis: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    })
  };
};

export { MenuItem };
//# sourceMappingURL=MenuItem.js.map
