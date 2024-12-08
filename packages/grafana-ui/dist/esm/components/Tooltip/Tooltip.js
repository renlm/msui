import { offset, flip, shift, arrow, useFloating, autoUpdate, useHover, useFocus, useDismiss, useInteractions, FloatingArrow } from '@floating-ui/react';
import React__default, { useRef, useState, useId, useCallback } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { getPlacement, buildTooltipTheme } from '../../utils/tooltipUtils.js';
import { Portal } from '../Portal/Portal.js';

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
const Tooltip = React__default.forwardRef(
  ({ children, theme, interactive, show, placement, content }, forwardedRef) => {
    const arrowRef = useRef(null);
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
      onOpenChange: setControlledVisible,
      middleware,
      whileElementsMounted: autoUpdate
    });
    const tooltipId = useId();
    const hover = useHover(context, {
      delay: {
        close: interactive ? 100 : 0
      },
      move: false
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, hover, focus]);
    const contentIsFunction = typeof content === "function";
    const styles = useStyles2(getStyles);
    const style = styles[theme != null ? theme : "info"];
    const handleRef = useCallback(
      (ref) => {
        refs.setReference(ref);
        if (typeof forwardedRef === "function") {
          forwardedRef(ref);
        } else if (forwardedRef) {
          forwardedRef.current = ref;
        }
      },
      [forwardedRef, refs]
    );
    const childHasMatchingAriaLabel = "aria-label" in children.props && children.props["aria-label"] === content;
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, React__default.cloneElement(children, __spreadValues({
      ref: handleRef,
      tabIndex: 0,
      // tooltip trigger should be keyboard focusable
      "aria-describedby": !childHasMatchingAriaLabel && isOpen ? tooltipId : void 0
    }, getReferenceProps())), isOpen && /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement("div", __spreadValues({ ref: refs.setFloating, style: floatingStyles }, getFloatingProps()), /* @__PURE__ */ React__default.createElement(FloatingArrow, { className: style.arrow, ref: arrowRef, context }), /* @__PURE__ */ React__default.createElement(
      "div",
      {
        "data-testid": selectors.components.Tooltip.container,
        id: tooltipId,
        role: "tooltip",
        className: style.container
      },
      typeof content === "string" && content,
      React__default.isValidElement(content) && React__default.cloneElement(content),
      contentIsFunction && content({})
    ))));
  }
);
Tooltip.displayName = "Tooltip";
const getStyles = (theme) => {
  const info = buildTooltipTheme(
    theme,
    theme.components.tooltip.background,
    theme.components.tooltip.background,
    theme.components.tooltip.text,
    { topBottom: 0.5, rightLeft: 1 }
  );
  const error = buildTooltipTheme(
    theme,
    theme.colors.error.main,
    theme.colors.error.main,
    theme.colors.error.contrastText,
    { topBottom: 0.5, rightLeft: 1 }
  );
  return {
    info,
    ["info-alt"]: info,
    error
  };
};

export { Tooltip, getStyles };
//# sourceMappingURL=Tooltip.js.map
