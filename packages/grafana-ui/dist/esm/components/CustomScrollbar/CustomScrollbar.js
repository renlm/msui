import { cx, css } from '@emotion/css';
import React__default, { useRef, useEffect, useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { ScrollIndicators } from './ScrollIndicators.js';

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
const CustomScrollbar = ({
  autoHide = false,
  autoHideTimeout = 200,
  setScrollTop,
  className,
  testId,
  autoHeightMin = "0",
  autoHeightMax = "100%",
  hideTracksWhenNotNeeded = false,
  hideHorizontalTrack,
  hideVerticalTrack,
  scrollRefCallback,
  showScrollIndicators = false,
  updateAfterMountMs,
  scrollTop,
  onScroll,
  children,
  divId
}) => {
  const ref = useRef(null);
  const styles = useStyles2(getStyles);
  useEffect(() => {
    if (ref.current && scrollRefCallback) {
      scrollRefCallback(ref.current.view);
    }
  }, [ref, scrollRefCallback]);
  useScrollTop(ref.current, scrollTop);
  useEffect(() => {
    if (!updateAfterMountMs) {
      return;
    }
    setTimeout(() => {
      const scrollbar = ref.current;
      if (scrollbar == null ? void 0 : scrollbar.update) {
        scrollbar.update();
      }
    }, updateAfterMountMs);
  }, [updateAfterMountMs]);
  function renderTrack(className2, hideTrack, passedProps) {
    if (passedProps.style && hideTrack) {
      passedProps.style.display = "none";
    }
    return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, passedProps), { className: className2 }));
  }
  const renderTrackHorizontal = useCallback(
    (passedProps) => {
      return renderTrack("track-horizontal", hideHorizontalTrack, passedProps);
    },
    [hideHorizontalTrack]
  );
  const renderTrackVertical = useCallback(
    (passedProps) => {
      return renderTrack("track-vertical", hideVerticalTrack, passedProps);
    },
    [hideVerticalTrack]
  );
  const renderThumbHorizontal = useCallback((passedProps) => {
    return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, passedProps), { className: "thumb-horizontal" }));
  }, []);
  const renderThumbVertical = useCallback((passedProps) => {
    return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, passedProps), { className: "thumb-vertical" }));
  }, []);
  const renderView = useCallback(
    (passedProps) => {
      if (passedProps.style && passedProps.style["WebkitOverflowScrolling"] === "touch") {
        passedProps.style["WebkitOverflowScrolling"] = "auto";
      }
      return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, passedProps), { className: "scrollbar-view", id: divId }));
    },
    [divId]
  );
  const onScrollStop = useCallback(() => {
    ref.current && setScrollTop && setScrollTop(ref.current.getValues());
  }, [setScrollTop]);
  return /* @__PURE__ */ React__default.createElement(
    Scrollbars,
    {
      "data-testid": testId,
      ref,
      className: cx(styles.customScrollbar, className, {
        [styles.scrollbarWithScrollIndicators]: showScrollIndicators
      }),
      onScrollStop,
      autoHeight: true,
      autoHide,
      autoHideTimeout,
      hideTracksWhenNotNeeded,
      autoHeightMax,
      autoHeightMin,
      renderTrackHorizontal,
      renderTrackVertical,
      renderThumbHorizontal,
      renderThumbVertical,
      renderView,
      onScroll
    },
    showScrollIndicators ? /* @__PURE__ */ React__default.createElement(ScrollIndicators, null, children) : children
  );
};
const getStyles = (theme) => {
  return {
    customScrollbar: css({
      // Fix for Firefox. For some reason sometimes .view container gets a height of its content, but in order to
      // make scroll working it should fit outer container size (scroll appears only when inner container size is
      // greater than outer one).
      display: "flex",
      flexGrow: 1,
      ".scrollbar-view": {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column"
      },
      ".track-vertical": {
        borderRadius: theme.shape.borderRadius(2),
        width: `${theme.spacing(1)} !important`,
        right: 0,
        bottom: theme.spacing(0.25),
        top: theme.spacing(0.25)
      },
      ".track-horizontal": {
        borderRadius: theme.shape.borderRadius(2),
        height: `${theme.spacing(1)} !important`,
        right: theme.spacing(0.25),
        bottom: theme.spacing(0.25),
        left: theme.spacing(0.25)
      },
      ".thumb-vertical": {
        background: theme.colors.action.focus,
        borderRadius: theme.shape.borderRadius(2),
        opacity: 0
      },
      ".thumb-horizontal": {
        background: theme.colors.action.focus,
        borderRadius: theme.shape.borderRadius(2),
        opacity: 0
      },
      "&:hover": {
        ".thumb-vertical, .thumb-horizontal": {
          opacity: 1,
          transition: "opacity 0.3s ease-in-out"
        }
      }
    }),
    // override the scroll container position so that the scroll indicators
    // are positioned at the top and bottom correctly.
    // react-custom-scrollbars doesn't provide any way for us to hook in nicely,
    // so we have to override with !important. feelsbad.
    scrollbarWithScrollIndicators: css({
      ".scrollbar-view": {
        // Need type assertion here due to the use of !important
        // see https://github.com/frenic/csstype/issues/114#issuecomment-697201978
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        position: "static !important"
      }
    })
  };
};
function useScrollTop(scrollBar, scrollTop) {
  useEffect(() => {
    if (scrollBar && scrollTop != null) {
      scrollBar.scrollTop(scrollTop);
    }
  }, [scrollTop, scrollBar]);
}

export { CustomScrollbar, CustomScrollbar as default };
//# sourceMappingURL=CustomScrollbar.js.map
