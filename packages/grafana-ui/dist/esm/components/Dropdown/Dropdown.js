import { css } from '@emotion/css';
import { offset, flip, shift, useFloating, autoUpdate, useClick, useDismiss, useInteractions, FloatingFocusManager } from '@floating-ui/react';
import React__default, { useState, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../../utils/dom.js';
import { renderOrCallToRender } from '../../utils/reactUtils.js';
import '../../utils/colors.js';
import 'slate';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { getPlacement } from '../../utils/tooltipUtils.js';
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
const Dropdown = React__default.memo(({ children, overlay, placement, offset: offset$1, onVisibleChange }) => {
  var _a, _b;
  const [show, setShow] = useState(false);
  const transitionRef = useRef(null);
  const handleOpenChange = useCallback(
    (newState) => {
      setShow(newState);
      onVisibleChange == null ? void 0 : onVisibleChange(newState);
    },
    [onVisibleChange]
  );
  const middleware = [
    offset({
      mainAxis: (_a = offset$1 == null ? void 0 : offset$1[0]) != null ? _a : 8,
      crossAxis: (_b = offset$1 == null ? void 0 : offset$1[1]) != null ? _b : 0
    }),
    flip({
      fallbackAxisSideDirection: "end",
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open: show,
    placement: getPlacement(placement),
    onOpenChange: handleOpenChange,
    middleware,
    whileElementsMounted: autoUpdate
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
  const animationDuration = 150;
  const animationStyles = useStyles2(getStyles, animationDuration);
  const onOverlayClicked = () => {
    handleOpenChange(false);
  };
  const handleKeys = (event) => {
    if (event.key === "Tab") {
      handleOpenChange(false);
    }
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, React__default.cloneElement(children, __spreadValues({
    ref: refs.setReference
  }, getReferenceProps())), show && /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement(FloatingFocusManager, { context }, /* @__PURE__ */ React__default.createElement("div", { ref: refs.setFloating, style: floatingStyles, onClick: onOverlayClicked, onKeyDown: handleKeys }, /* @__PURE__ */ React__default.createElement(
    CSSTransition,
    {
      nodeRef: transitionRef,
      appear: true,
      in: true,
      timeout: { appear: animationDuration, exit: 0, enter: 0 },
      classNames: animationStyles
    },
    /* @__PURE__ */ React__default.createElement("div", { ref: transitionRef }, renderOrCallToRender(overlay, __spreadValues({}, getFloatingProps())))
  )))));
});
Dropdown.displayName = "Dropdown";
const getStyles = (theme, duration) => {
  return {
    appear: css({
      opacity: "0",
      position: "relative",
      transformOrigin: "top",
      [theme.transitions.handleMotion("no-preference")]: {
        transform: "scaleY(0.5)"
      }
    }),
    appearActive: css({
      opacity: "1",
      [theme.transitions.handleMotion("no-preference")]: {
        transform: "scaleY(1)",
        transition: `transform ${duration}ms cubic-bezier(0.2, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.2, 0, 0.2, 1)`
      }
    })
  };
};

export { Dropdown };
//# sourceMappingURL=Dropdown.js.map
