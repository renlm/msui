import { cx, css } from '@emotion/css';
import { offset, flip, shift, arrow, useFloating, autoUpdate, useClick, useDismiss, useInteractions, FloatingFocusManager, FloatingArrow } from '@floating-ui/react';
import React__default, { useRef, useState } from 'react';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
import { getPlacement, buildTooltipTheme } from '../../utils/tooltipUtils.js';
import { IconButton } from '../IconButton/IconButton.js';

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
const Toggletip = React__default.memo(
  ({
    children,
    theme = "info",
    placement = "auto",
    content,
    title,
    closeButton = true,
    onClose,
    footer,
    fitContent = false,
    onOpen,
    show
  }) => {
    const arrowRef = useRef(null);
    const grafanaTheme = useTheme2();
    const styles = useStyles2(getStyles);
    const style = styles[theme];
    const [controlledVisible, setControlledVisible] = useState(show);
    const isOpen = show != null ? show : controlledVisible;
    const middleware = [
      offset(8),
      flip({
        fallbackAxisSideDirection: "end",
        // see https://floating-ui.com/docs/flip#combining-with-shift
        crossAxis: false,
        boundary: document.body
      }),
      shift(),
      arrow({
        element: arrowRef
      })
    ];
    const { context, refs, floatingStyles } = useFloating({
      open: isOpen,
      placement: getPlacement(placement),
      onOpenChange: (open) => {
        if (show === void 0) {
          setControlledVisible(open);
        }
        if (!open) {
          onClose == null ? void 0 : onClose();
        } else {
          onOpen == null ? void 0 : onOpen();
        }
      },
      middleware,
      whileElementsMounted: autoUpdate,
      strategy: "fixed"
    });
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, React__default.cloneElement(children, __spreadValues({
      ref: refs.setReference,
      tabIndex: 0,
      "aria-expanded": isOpen
    }, getReferenceProps())), isOpen && /* @__PURE__ */ React__default.createElement(FloatingFocusManager, { context, modal: false, closeOnFocusOut: false }, /* @__PURE__ */ React__default.createElement(
      "div",
      __spreadValues({
        "data-testid": "toggletip-content",
        className: cx(style.container, {
          [styles.fitContent]: fitContent
        }),
        ref: refs.setFloating,
        style: floatingStyles
      }, getFloatingProps()),
      /* @__PURE__ */ React__default.createElement(
        FloatingArrow,
        {
          strokeWidth: 0.3,
          stroke: grafanaTheme.colors.border.weak,
          className: style.arrow,
          ref: arrowRef,
          context
        }
      ),
      Boolean(title) && /* @__PURE__ */ React__default.createElement("div", { className: style.header }, title),
      closeButton && /* @__PURE__ */ React__default.createElement("div", { className: style.headerClose }, /* @__PURE__ */ React__default.createElement(
        IconButton,
        {
          "aria-label": "Close",
          name: "times",
          "data-testid": "toggletip-header-close",
          onClick: () => {
            setControlledVisible(false);
            onClose == null ? void 0 : onClose();
          }
        }
      )),
      /* @__PURE__ */ React__default.createElement("div", { className: style.body }, (typeof content === "string" || React__default.isValidElement(content)) && content, typeof content === "function" && content({})),
      Boolean(footer) && /* @__PURE__ */ React__default.createElement("div", { className: style.footer }, footer)
    )));
  }
);
Toggletip.displayName = "Toggletip";
const getStyles = (theme) => {
  const info = buildTooltipTheme(
    theme,
    theme.colors.background.primary,
    theme.colors.border.weak,
    theme.components.tooltip.text,
    { topBottom: 2, rightLeft: 2 }
  );
  const error = buildTooltipTheme(
    theme,
    theme.colors.error.main,
    theme.colors.error.main,
    theme.colors.error.contrastText,
    { topBottom: 2, rightLeft: 2 }
  );
  return {
    info,
    error,
    fitContent: css({
      maxWidth: "fit-content"
    })
  };
};

export { Toggletip, getStyles };
//# sourceMappingURL=Toggletip.js.map
