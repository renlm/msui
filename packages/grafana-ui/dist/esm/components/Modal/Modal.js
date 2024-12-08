import { cx } from '@emotion/css';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, OverlayContainer } from '@react-aria/overlays';
import React__default, { useRef } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { t } from '../../utils/i18n.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Stack } from '../Layout/Stack/Stack.js';
import { ModalHeader } from './ModalHeader.js';
import { getModalStyles } from './getModalStyles.js';

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
function Modal(props) {
  const {
    title,
    children,
    isOpen = false,
    closeOnEscape = true,
    closeOnBackdropClick = true,
    className,
    contentClassName,
    onDismiss,
    onClickBackdrop,
    trapFocus = true
  } = props;
  const styles = useStyles2(getModalStyles);
  const ref = useRef(null);
  const { overlayProps, underlayProps } = useOverlay(
    { isKeyboardDismissDisabled: !closeOnEscape, isOpen, onClose: onDismiss },
    ref
  );
  const { dialogProps, titleProps } = useDialog({}, ref);
  if (!isOpen) {
    return null;
  }
  const headerClass = cx(styles.modalHeader, typeof title !== "string" && styles.modalHeaderWithTabs);
  return /* @__PURE__ */ React__default.createElement(OverlayContainer, null, /* @__PURE__ */ React__default.createElement(
    "div",
    __spreadValues({
      role: "presentation",
      className: styles.modalBackdrop,
      onClick: onClickBackdrop || (closeOnBackdropClick ? onDismiss : void 0)
    }, underlayProps)
  ), /* @__PURE__ */ React__default.createElement(FocusScope, { contain: trapFocus, autoFocus: true, restoreFocus: true }, /* @__PURE__ */ React__default.createElement("div", __spreadValues(__spreadValues({ className: cx(styles.modal, className), ref }, overlayProps), dialogProps), /* @__PURE__ */ React__default.createElement(
    "div",
    { className: headerClass },
    typeof title === "string" && /* @__PURE__ */ React__default.createElement(DefaultModalHeader, __spreadProps(__spreadValues({}, props), { title, id: titleProps.id })),
    // FIXME: custom title components won't get an accessible title.
    // Do we really want to support them or shall we just limit this ModalTabsHeader?
    typeof title !== "string" && title,
    /* @__PURE__ */ React__default.createElement("div", { className: styles.modalHeaderClose }, /* @__PURE__ */ React__default.createElement(
      IconButton,
      {
        name: "times",
        size: "xl",
        onClick: onDismiss,
        "aria-label": t("grafana-ui.modal.close-tooltip", "Close")
      }
    ))
  ), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.modalContent, contentClassName) }, children))));
}
function ModalButtonRow({ leftItems, children }) {
  const styles = useStyles2(getModalStyles);
  if (leftItems) {
    return /* @__PURE__ */ React__default.createElement("div", { className: styles.modalButtonRow }, /* @__PURE__ */ React__default.createElement(Stack, { justifyContent: "space-between" }, /* @__PURE__ */ React__default.createElement(Stack, { justifyContent: "flex-start", gap: 2 }, leftItems), /* @__PURE__ */ React__default.createElement(Stack, { justifyContent: "flex-end", gap: 2 }, children)));
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.modalButtonRow }, /* @__PURE__ */ React__default.createElement(Stack, { justifyContent: "flex-end", gap: 2, wrap: "wrap" }, children));
}
Modal.ButtonRow = ModalButtonRow;
function DefaultModalHeader({ icon, iconTooltip, title, id }) {
  return /* @__PURE__ */ React__default.createElement(ModalHeader, { icon, iconTooltip, title, id });
}

export { Modal };
//# sourceMappingURL=Modal.js.map
