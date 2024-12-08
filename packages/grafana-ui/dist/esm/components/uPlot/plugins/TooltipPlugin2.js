import { cx, css } from '@emotion/css';
import React__default, { useRef, useReducer, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { DashboardCursorSync } from '@grafana/schema';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { getPortalContainer } from '../../Portal/Portal.js';
import { CloseButton } from './CloseButton.js';

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
const TOOLTIP_OFFSET = 10;
function mergeState(prevState, nextState) {
  return __spreadProps(__spreadValues(__spreadValues({}, prevState), nextState), {
    style: __spreadValues(__spreadValues({}, prevState.style), nextState.style)
  });
}
function initState() {
  return {
    style: { transform: "", pointerEvents: "none" },
    isHovering: false,
    isPinned: false,
    contents: null,
    plot: null,
    dismiss: () => {
    }
  };
}
const MIN_ZOOM_DIST = 5;
const maybeZoomAction = (e) => e != null && !e.ctrlKey && !e.metaKey;
const TooltipPlugin2 = ({
  config,
  hoverMode,
  render,
  clientZoom = false,
  queryZoom,
  onSelectRange,
  maxWidth,
  syncMode = DashboardCursorSync.Off,
  syncScope = "global"
  // eventsScope
}) => {
  const domRef = useRef(null);
  const portalRoot = useRef(null);
  if (portalRoot.current == null) {
    portalRoot.current = getPortalContainer();
  }
  const [{ plot, isHovering, isPinned, contents, style, dismiss }, setState] = useReducer(mergeState, null, initState);
  const sizeRef = useRef();
  const styles = useStyles2(getStyles, maxWidth);
  const renderRef = useRef(render);
  renderRef.current = render;
  useLayoutEffect(() => {
    sizeRef.current = {
      width: 0,
      height: 0,
      observer: new ResizeObserver((entries) => {
        var _a;
        let size = sizeRef.current;
        for (const entry of entries) {
          if (((_a = entry.borderBoxSize) == null ? void 0 : _a.length) > 0) {
            size.width = entry.borderBoxSize[0].inlineSize;
            size.height = entry.borderBoxSize[0].blockSize;
          } else {
            size.width = entry.contentRect.width;
            size.height = entry.contentRect.height;
          }
        }
      })
    };
    let yZoomed = false;
    let yDrag = false;
    let _plot = plot;
    let _isHovering = isHovering;
    let _someSeriesIdx = false;
    let _isPinned = isPinned;
    let _style = style;
    let plotVisible = false;
    const syncTooltip = syncMode === DashboardCursorSync.Tooltip;
    if (syncMode !== DashboardCursorSync.Off && config.scales[0].props.isTime) {
      config.setCursor({
        sync: {
          key: syncScope,
          scales: ["x", null]
        }
      });
    }
    const updateHovering = () => {
      if (viaSync) {
        _isHovering = plotVisible && _someSeriesIdx && syncTooltip;
      } else {
        _isHovering = closestSeriesIdx != null || hoverMode === 1 /* xAll */ && _someSeriesIdx;
      }
    };
    let offsetX = 0;
    let offsetY = 0;
    let selectedRange = null;
    let seriesIdxs = plot == null ? void 0 : plot.cursor.idxs.slice();
    let closestSeriesIdx = null;
    let viaSync = false;
    let pendingRender = false;
    let pendingPinned = false;
    const scheduleRender = (setPinned = false) => {
      if (!pendingRender) {
        if (!_isHovering) {
          setTimeout(_render, 100);
        } else {
          queueMicrotask(_render);
        }
        pendingRender = true;
      }
      if (setPinned) {
        pendingPinned = true;
      }
    };
    const downEventOutside = (e) => {
      if (!domRef.current.contains(e.target)) {
        dismiss2();
      }
    };
    const _render = () => {
      pendingRender = false;
      if (pendingPinned) {
        _style = { pointerEvents: _isPinned ? "all" : "none" };
        _plot.cursor._lock = _isPinned;
        if (_isPinned) {
          document.addEventListener("mousedown", downEventOutside, true);
          document.addEventListener("keydown", downEventOutside, true);
        } else {
          document.removeEventListener("mousedown", downEventOutside, true);
          document.removeEventListener("keydown", downEventOutside, true);
        }
        pendingPinned = false;
      }
      let state = {
        style: _style,
        isPinned: _isPinned,
        isHovering: _isHovering,
        contents: _isHovering || selectedRange != null ? renderRef.current(_plot, seriesIdxs, closestSeriesIdx, _isPinned, dismiss2, selectedRange, viaSync) : null,
        dismiss: dismiss2
      };
      setState(state);
      selectedRange = null;
    };
    const dismiss2 = () => {
      let prevIsPinned = _isPinned;
      _isPinned = false;
      _isHovering = false;
      _plot.setCursor({ left: -10, top: -10 });
      scheduleRender(prevIsPinned);
    };
    config.addHook("init", (u) => {
      setState({ plot: _plot = u });
      if (clientZoom) {
        u.over.addEventListener(
          "mousedown",
          (e) => {
            if (!maybeZoomAction(e)) {
              return;
            }
            if (e.button === 0 && e.shiftKey) {
              yDrag = true;
              u.cursor.drag.x = false;
              u.cursor.drag.y = true;
              let onUp = (e2) => {
                u.cursor.drag.x = true;
                u.cursor.drag.y = false;
                document.removeEventListener("mouseup", onUp, true);
              };
              document.addEventListener("mouseup", onUp, true);
            }
          },
          true
        );
      }
      u.over.addEventListener("click", (e) => {
        if (e.target === u.over) {
          if (e.ctrlKey || e.metaKey) {
            let xVal;
            const isXAxisHorizontal = u.scales.x.ori === 0;
            if (isXAxisHorizontal) {
              xVal = u.posToVal(u.cursor.left, "x");
            } else {
              xVal = u.posToVal(u.select.top + u.select.height, "x");
            }
            selectedRange = {
              from: xVal,
              to: xVal
            };
            scheduleRender(false);
          } else if (_isHovering && closestSeriesIdx != null && !_isPinned) {
            setTimeout(() => {
              _isPinned = true;
              scheduleRender(true);
            }, 0);
          }
        }
      });
    });
    config.addHook("setSelect", (u) => {
      const isXAxisHorizontal = u.scales.x.ori === 0;
      if (!viaSync && (clientZoom || queryZoom != null)) {
        if (maybeZoomAction(u.cursor.event)) {
          if (onSelectRange != null) {
            let selections = [];
            const yDrag2 = Boolean(u.cursor.drag.y);
            const xDrag = Boolean(u.cursor.drag.x);
            let xSel = null;
            let ySels = [];
            if (xDrag) {
              xSel = {
                from: isXAxisHorizontal ? u.posToVal(u.select.left, "x") : u.posToVal(u.select.top + u.select.height, "x"),
                to: isXAxisHorizontal ? u.posToVal(u.select.left + u.select.width, "x") : u.posToVal(u.select.top, "x")
              };
            }
            if (yDrag2) {
              config.scales.forEach((scale) => {
                const key = scale.props.scaleKey;
                if (key !== "x") {
                  let ySel = {
                    from: isXAxisHorizontal ? u.posToVal(u.select.top + u.select.height, key) : u.posToVal(u.select.left + u.select.width, key),
                    to: isXAxisHorizontal ? u.posToVal(u.select.top, key) : u.posToVal(u.select.left, key)
                  };
                  ySels.push(ySel);
                }
              });
            }
            if (xDrag) {
              if (yDrag2) {
                selections = ySels.map((ySel) => ({ x: xSel, y: ySel }));
              } else {
                selections = [{ x: xSel }];
              }
            } else {
              if (yDrag2) {
                selections = ySels.map((ySel) => ({ y: ySel }));
              }
            }
            onSelectRange(selections);
          } else if (clientZoom && yDrag) {
            if (u.select.height >= MIN_ZOOM_DIST) {
              for (let key in u.scales) {
                if (key !== "x") {
                  const maxY = isXAxisHorizontal ? u.posToVal(u.select.top, key) : u.posToVal(u.select.left + u.select.width, key);
                  const minY = isXAxisHorizontal ? u.posToVal(u.select.top + u.select.height, key) : u.posToVal(u.select.left, key);
                  u.setScale(key, { min: minY, max: maxY });
                }
              }
              yZoomed = true;
            }
            yDrag = false;
          } else if (queryZoom != null) {
            if (u.select.width >= MIN_ZOOM_DIST) {
              const minX = isXAxisHorizontal ? u.posToVal(u.select.left, "x") : u.posToVal(u.select.top + u.select.height, "x");
              const maxX = isXAxisHorizontal ? u.posToVal(u.select.left + u.select.width, "x") : u.posToVal(u.select.top, "x");
              queryZoom({ from: minX, to: maxX });
              yZoomed = false;
            }
          }
        } else {
          selectedRange = {
            from: isXAxisHorizontal ? u.posToVal(u.select.left, "x") : u.posToVal(u.select.top + u.select.height, "x"),
            to: isXAxisHorizontal ? u.posToVal(u.select.left + u.select.width, "x") : u.posToVal(u.select.top, "x")
          };
          scheduleRender(true);
        }
      }
      u.setSelect({ left: 0, width: 0, top: 0, height: 0 }, false);
    });
    if (clientZoom || queryZoom != null) {
      config.setCursor({
        bind: {
          dblclick: (u) => () => {
            if (!maybeZoomAction(u.cursor.event)) {
              return null;
            }
            if (clientZoom && yZoomed) {
              for (let key in u.scales) {
                if (key !== "x") {
                  u.setScale(key, { min: null, max: null });
                }
              }
              yZoomed = false;
            } else if (queryZoom != null) {
              let xScale = u.scales.x;
              const frTs = xScale.min;
              const toTs = xScale.max;
              const pad = (toTs - frTs) / 2;
              queryZoom({ from: frTs - pad, to: toTs + pad });
            }
            return null;
          }
        }
      });
    }
    config.addHook("setData", (u) => {
      yZoomed = false;
      yDrag = false;
      dismiss2();
    });
    config.addHook("setSeries", (u, seriesIdx) => {
      closestSeriesIdx = seriesIdx;
      viaSync = u.cursor.event == null;
      updateHovering();
      scheduleRender();
    });
    config.addHook("setLegend", (u) => {
      seriesIdxs = _plot == null ? void 0 : _plot.cursor.idxs.slice();
      _someSeriesIdx = seriesIdxs.some((v, i) => i > 0 && v != null);
      viaSync = u.cursor.event == null;
      let prevIsHovering = _isHovering;
      updateHovering();
      if (_isHovering || _isHovering !== prevIsHovering) {
        scheduleRender();
      }
    });
    const scrollbarWidth = 16;
    let winWid = 0;
    let winHgt = 0;
    const updateWinSize = () => {
      _isHovering && !_isPinned && dismiss2();
      winWid = window.innerWidth - scrollbarWidth;
      winHgt = window.innerHeight - scrollbarWidth;
    };
    const updatePlotVisible = () => {
      plotVisible = _plot.rect.bottom <= winHgt && _plot.rect.top >= 0 && _plot.rect.left >= 0 && _plot.rect.right <= winWid;
    };
    updateWinSize();
    config.addHook("ready", updatePlotVisible);
    config.addHook("setCursor", (u) => {
      viaSync = u.cursor.event == null;
      if (!_isHovering) {
        return;
      }
      let { left = -10, top = -10 } = u.cursor;
      if (left >= 0 || top >= 0) {
        let clientX = u.rect.left + left;
        let clientY = u.rect.top + top;
        let transform = "";
        let { width, height } = sizeRef.current;
        width += TOOLTIP_OFFSET;
        height += TOOLTIP_OFFSET;
        if (offsetY !== 0) {
          if (clientY + height < winHgt || clientY - height < 0) {
            offsetY = 0;
          } else if (offsetY !== -height) {
            offsetY = -height;
          }
        } else {
          if (clientY + height > winHgt && clientY - height >= 0) {
            offsetY = -height;
          }
        }
        if (offsetX !== 0) {
          if (clientX + width < winWid || clientX - width < 0) {
            offsetX = 0;
          } else if (offsetX !== -width) {
            offsetX = -width;
          }
        } else {
          if (clientX + width > winWid && clientX - width >= 0) {
            offsetX = -width;
          }
        }
        const shiftX = clientX + (offsetX === 0 ? TOOLTIP_OFFSET : -TOOLTIP_OFFSET);
        const shiftY = clientY + (offsetY === 0 ? TOOLTIP_OFFSET : -TOOLTIP_OFFSET);
        const reflectX = offsetX === 0 ? "" : "translateX(-100%)";
        const reflectY = offsetY === 0 ? "" : "translateY(-100%)";
        transform = `translateX(${shiftX}px) ${reflectX} translateY(${shiftY}px) ${reflectY}`;
        if (domRef.current != null) {
          domRef.current.style.transform = transform;
        } else {
          _style.transform = transform;
          scheduleRender();
        }
      }
    });
    const onscroll = (e) => {
      updatePlotVisible();
      _isHovering && !_isPinned && e.target instanceof HTMLElement && e.target.contains(_plot.root) && dismiss2();
    };
    window.addEventListener("resize", updateWinSize);
    window.addEventListener("scroll", onscroll, true);
    return () => {
      window.removeEventListener("resize", updateWinSize);
      window.removeEventListener("scroll", onscroll, true);
      document.removeEventListener("mousedown", downEventOutside, true);
      document.removeEventListener("keydown", downEventOutside, true);
    };
  }, [config]);
  useLayoutEffect(() => {
    const size = sizeRef.current;
    if (domRef.current != null) {
      size.observer.observe(domRef.current);
      const { width, height } = domRef.current.getBoundingClientRect();
      size.width = width;
      size.height = height;
      let event = plot.cursor.event;
      if (event != null) {
        const isMobile = event.type !== "mousemove";
        if (isMobile) {
          event = new MouseEvent("mousemove", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: event.clientX,
            clientY: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY
          });
        }
        const isStaleEvent = isMobile ? false : performance.now() - event.timeStamp > 16;
        !isStaleEvent && plot.over.dispatchEvent(event);
      } else {
        plot.setCursor(
          {
            left: plot.cursor.left,
            top: plot.cursor.top
          },
          true
        );
      }
    } else {
      size.width = 0;
      size.height = 0;
    }
  }, [isHovering]);
  if (plot && isHovering) {
    return createPortal(
      /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: cx(styles.tooltipWrapper, isPinned && styles.pinned),
          style,
          "aria-live": "polite",
          "aria-atomic": "true",
          ref: domRef
        },
        isPinned && /* @__PURE__ */ React__default.createElement(CloseButton, { onClick: dismiss }),
        contents
      ),
      portalRoot.current
    );
  }
  return null;
};
const getStyles = (theme, maxWidth) => ({
  tooltipWrapper: css({
    top: 0,
    left: 0,
    zIndex: theme.zIndex.portal,
    whiteSpace: "pre",
    borderRadius: theme.shape.radius.default,
    position: "fixed",
    background: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.weak}`,
    boxShadow: theme.shadows.z2,
    userSelect: "text",
    maxWidth: maxWidth != null ? maxWidth : "none"
  }),
  pinned: css({
    boxShadow: theme.shadows.z3
  })
});

export { TOOLTIP_OFFSET, TooltipPlugin2 };
//# sourceMappingURL=TooltipPlugin2.js.map
