import { cx, css } from '@emotion/css';
import React__default, { useState, useEffect, useRef, useCallback } from 'react';
import { Trans } from '../../utils/i18n.js';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Icon } from '../Icon/Icon.js';
import { InlineToast } from '../InlineToast/InlineToast.js';

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
const SHOW_SUCCESS_DURATION = 2 * 1e3;
function ClipboardButton(_a) {
  var _b = _a, {
    onClipboardCopy,
    onClipboardError,
    children,
    getText,
    icon,
    variant
  } = _b, buttonProps = __objRest(_b, [
    "onClipboardCopy",
    "onClipboardError",
    "children",
    "getText",
    "icon",
    "variant"
  ]);
  const styles = useStyles2(getStyles);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (showCopySuccess) {
      timeoutId = setTimeout(() => {
        setShowCopySuccess(false);
      }, SHOW_SUCCESS_DURATION);
    }
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showCopySuccess]);
  const buttonRef = useRef(null);
  const copyTextCallback = useCallback(async () => {
    const textToCopy = getText();
    try {
      await copyText(textToCopy, buttonRef);
      setShowCopySuccess(true);
      onClipboardCopy == null ? void 0 : onClipboardCopy(textToCopy);
    } catch (e) {
      onClipboardError == null ? void 0 : onClipboardError(textToCopy, e);
    }
  }, [getText, onClipboardCopy, onClipboardError]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, showCopySuccess && /* @__PURE__ */ React__default.createElement(InlineToast, { placement: "top", referenceElement: buttonRef.current }, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "clipboard-button.inline-toast.success" }, "Copied")), /* @__PURE__ */ React__default.createElement(
    Button,
    __spreadProps(__spreadValues({
      onClick: copyTextCallback,
      icon,
      variant: showCopySuccess ? "success" : variant,
      "aria-label": showCopySuccess ? "Copied" : void 0
    }, buttonProps), {
      className: cx(styles.button, showCopySuccess && styles.successButton, buttonProps.className),
      ref: buttonRef
    }),
    children,
    showCopySuccess && /* @__PURE__ */ React__default.createElement("div", { className: styles.successOverlay }, /* @__PURE__ */ React__default.createElement(Icon, { name: "check" }))
  ));
}
const copyText = async (text, buttonRef) => {
  var _a;
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    (_a = buttonRef.current) == null ? void 0 : _a.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
};
const getStyles = (theme) => {
  return {
    button: css({
      position: "relative"
    }),
    successButton: css({
      "> *": css({
        visibility: "hidden"
      })
    }),
    successOverlay: css({
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      visibility: "visible"
      // re-visible the overlay
    })
  };
};

export { ClipboardButton };
//# sourceMappingURL=ClipboardButton.js.map
