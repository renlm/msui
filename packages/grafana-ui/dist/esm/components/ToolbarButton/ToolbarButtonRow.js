import { cx, css } from '@emotion/css';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import React__default, { forwardRef, useState, useRef, createRef, useLayoutEffect } from 'react';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getPortalContainer } from '../Portal/Portal.js';
import { ToolbarButton } from './ToolbarButton.js';

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
const ToolbarButtonRow = forwardRef(
  (_a, ref) => {
    var _b = _a, { alignment = "left", className, children } = _b, rest = __objRest(_b, ["alignment", "className", "children"]);
    const childrenWithoutNull = React__default.Children.toArray(children).filter((child) => child != null);
    const [childVisibility, setChildVisibility] = useState(Array(childrenWithoutNull.length).fill(false));
    const containerRef = useRef(null);
    const [showOverflowItems, setShowOverflowItems] = useState(false);
    const overflowRef = useRef(null);
    const overflowItemsRef = createRef();
    const { overlayProps } = useOverlay(
      {
        onClose: () => setShowOverflowItems(false),
        isDismissable: true,
        isOpen: showOverflowItems,
        shouldCloseOnInteractOutside: (element) => {
          var _a2;
          const portalContainer = getPortalContainer();
          return !((_a2 = overflowRef.current) == null ? void 0 : _a2.contains(element)) && !portalContainer.contains(element);
        }
      },
      overflowItemsRef
    );
    const { dialogProps } = useDialog({}, overflowItemsRef);
    const theme = useTheme2();
    const overflowButtonOrder = alignment === "left" ? childVisibility.indexOf(false) - 1 : childVisibility.length;
    const styles = getStyles(theme, overflowButtonOrder, alignment);
    useLayoutEffect(() => {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target instanceof HTMLElement && entry.target.parentNode) {
              const index = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target);
              setChildVisibility((prev) => {
                const newVisibility = [...prev];
                newVisibility[index] = entry.isIntersecting;
                return newVisibility;
              });
            }
          });
        },
        {
          threshold: 1,
          root: containerRef.current
        }
      );
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((item) => {
          if (item instanceof HTMLElement && item !== overflowRef.current) {
            intersectionObserver.observe(item);
          }
        });
      }
      return () => intersectionObserver.disconnect();
    }, [children]);
    return /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref: containerRef, className: cx(styles.container, className) }, rest), childrenWithoutNull.map((child, index) => /* @__PURE__ */ React__default.createElement(
      "div",
      {
        key: index,
        style: { order: index, visibility: childVisibility[index] ? "visible" : "hidden" },
        className: styles.childWrapper
      },
      child
    )), childVisibility.includes(false) && /* @__PURE__ */ React__default.createElement("div", { ref: overflowRef, className: styles.overflowButton }, /* @__PURE__ */ React__default.createElement(
      ToolbarButton,
      {
        variant: showOverflowItems ? "active" : "default",
        tooltip: "Show more items",
        onClick: () => setShowOverflowItems(!showOverflowItems),
        icon: "ellipsis-v",
        iconOnly: true,
        narrow: true
      }
    ), showOverflowItems && /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, autoFocus: true }, /* @__PURE__ */ React__default.createElement("div", __spreadValues(__spreadValues({ className: styles.overflowItems, ref: overflowItemsRef }, overlayProps), dialogProps), childrenWithoutNull.map((child, index) => !childVisibility[index] && child)))));
  }
);
ToolbarButtonRow.displayName = "ToolbarButtonRow";
const getStyles = (theme, overflowButtonOrder, alignment) => ({
  overflowButton: css({
    order: overflowButtonOrder
  }),
  overflowItems: css({
    alignItems: "center",
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.shape.radius.default,
    boxShadow: theme.shadows.z2,
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    maxWidth: "80vw",
    padding: theme.spacing(0.5, 1),
    position: "absolute",
    right: 0,
    top: "100%",
    width: "max-content",
    zIndex: theme.zIndex.dropdown
  }),
  container: css({
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1),
    justifyContent: alignment === "left" ? "flex-start" : "flex-end",
    minWidth: 0,
    position: "relative"
  }),
  childWrapper: css({
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1)
  })
});

export { ToolbarButtonRow };
//# sourceMappingURL=ToolbarButtonRow.js.map
