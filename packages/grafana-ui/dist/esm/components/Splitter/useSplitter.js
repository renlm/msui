import { css } from '@emotion/css';
import { clamp, throttle } from 'lodash';
import { useRef, useCallback, useId, useLayoutEffect } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getDragStyles } from '../DragHandle/DragHandle.js';

const PIXELS_PER_MS = 0.3;
const VERTICAL_KEYS = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown"]);
const HORIZONTAL_KEYS = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowRight"]);
const propsForDirection = {
  row: {
    dim: "width",
    axis: "clientX",
    min: "minWidth",
    max: "maxWidth"
  },
  column: {
    dim: "height",
    axis: "clientY",
    min: "minHeight",
    max: "maxHeight"
  }
};
function useSplitter(options) {
  const { direction, initialSize = 0.5, dragPosition = "middle", onResizing, onSizeChanged } = options;
  const handleSize = 16;
  const splitterRef = useRef(null);
  const firstPaneRef = useRef(null);
  const secondPaneRef = useRef(null);
  const containerRef = useRef(null);
  const containerSize = useRef(null);
  const primarySizeRef = useRef("1fr");
  const firstPaneMeasurements = useRef(void 0);
  const savedPos = useRef(void 0);
  const measurementProp = propsForDirection[direction].dim;
  const clientAxis = propsForDirection[direction].axis;
  const minDimProp = propsForDirection[direction].min;
  const maxDimProp = propsForDirection[direction].max;
  useResizeObserver(
    containerRef.current,
    (entries) => {
      for (const entry of entries) {
        if (!entry.target.isSameNode(containerRef.current)) {
          return;
        }
        if (!firstPaneRef.current) {
          return;
        }
        const curSize = firstPaneRef.current.getBoundingClientRect()[measurementProp];
        const newDims = measureElement(firstPaneRef.current);
        splitterRef.current.ariaValueNow = ariaValue(curSize, newDims[minDimProp], newDims[maxDimProp]);
      }
    },
    500,
    [maxDimProp, minDimProp, direction, measurementProp]
  );
  const dragStart = useRef(null);
  const onPointerDown = useCallback(
    (e) => {
      if (!firstPaneRef.current) {
        return;
      }
      primarySizeRef.current = firstPaneRef.current.getBoundingClientRect()[measurementProp];
      containerSize.current = containerRef.current.getBoundingClientRect()[measurementProp];
      dragStart.current = e[clientAxis];
      splitterRef.current.setPointerCapture(e.pointerId);
      firstPaneMeasurements.current = measureElement(firstPaneRef.current);
      savedPos.current = void 0;
    },
    [measurementProp, clientAxis]
  );
  const onPointerMove = useCallback(
    (e) => {
      if (dragStart.current !== null && primarySizeRef.current !== "1fr") {
        const diff = e[clientAxis] - dragStart.current;
        const dims = firstPaneMeasurements.current;
        const newSize = clamp(primarySizeRef.current + diff, dims[minDimProp], dims[maxDimProp]);
        const newFlex = newSize / (containerSize.current - handleSize);
        firstPaneRef.current.style.flexGrow = `${newFlex}`;
        secondPaneRef.current.style.flexGrow = `${1 - newFlex}`;
        splitterRef.current.ariaValueNow = ariaValue(newSize, dims[minDimProp], dims[maxDimProp]);
        onResizing == null ? void 0 : onResizing(newFlex, newSize);
      }
    },
    [handleSize, clientAxis, minDimProp, maxDimProp, onResizing]
  );
  const onPointerUp = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      splitterRef.current.releasePointerCapture(e.pointerId);
      dragStart.current = null;
      if (typeof primarySizeRef.current === "number") {
        onSizeChanged == null ? void 0 : onSizeChanged(parseFloat(firstPaneRef.current.style.flexGrow), primarySizeRef.current);
      }
    },
    [onSizeChanged]
  );
  const pressedKeys = useRef(/* @__PURE__ */ new Set());
  const keysLastHandledAt = useRef(null);
  const handlePressedKeys = useCallback(
    (time) => {
      var _a;
      const nothingPressed = pressedKeys.current.size === 0;
      if (nothingPressed) {
        keysLastHandledAt.current = null;
        return;
      } else if (primarySizeRef.current === "1fr") {
        return;
      }
      const dt = time - ((_a = keysLastHandledAt.current) != null ? _a : time);
      const dx = dt * PIXELS_PER_MS;
      let sizeChange = 0;
      if (direction === "row") {
        if (pressedKeys.current.has("ArrowLeft")) {
          sizeChange -= dx;
        }
        if (pressedKeys.current.has("ArrowRight")) {
          sizeChange += dx;
        }
      } else {
        if (pressedKeys.current.has("ArrowUp")) {
          sizeChange -= dx;
        }
        if (pressedKeys.current.has("ArrowDown")) {
          sizeChange += dx;
        }
      }
      const firstPaneDims = firstPaneMeasurements.current;
      const curSize = firstPaneRef.current.getBoundingClientRect()[measurementProp];
      const newSize = clamp(curSize + sizeChange, firstPaneDims[minDimProp], firstPaneDims[maxDimProp]);
      const newFlex = newSize / (containerSize.current - handleSize);
      firstPaneRef.current.style.flexGrow = `${newFlex}`;
      secondPaneRef.current.style.flexGrow = `${1 - newFlex}`;
      splitterRef.current.ariaValueNow = ariaValue(newSize, firstPaneDims[minDimProp], firstPaneDims[maxDimProp]);
      onResizing == null ? void 0 : onResizing(newFlex, newSize);
      keysLastHandledAt.current = time;
      window.requestAnimationFrame(handlePressedKeys);
    },
    [direction, handleSize, minDimProp, maxDimProp, measurementProp, onResizing]
  );
  const onKeyDown = useCallback(
    (e) => {
      if (!firstPaneRef.current || !secondPaneRef.current || !splitterRef.current || !containerRef.current) {
        return;
      }
      if (e.key === "Enter") {
        if (savedPos.current === void 0) {
          savedPos.current = firstPaneRef.current.style.flexGrow;
          firstPaneRef.current.style.flexGrow = "0";
          secondPaneRef.current.style.flexGrow = "1";
        } else {
          firstPaneRef.current.style.flexGrow = savedPos.current;
          secondPaneRef.current.style.flexGrow = `${1 - parseFloat(savedPos.current)}`;
          savedPos.current = void 0;
        }
        return;
      } else if (e.key === "Home") {
        firstPaneMeasurements.current = measureElement(firstPaneRef.current);
        containerSize.current = containerRef.current.getBoundingClientRect()[measurementProp];
        const newFlex = firstPaneMeasurements.current[minDimProp] / (containerSize.current - handleSize);
        firstPaneRef.current.style.flexGrow = `${newFlex}`;
        secondPaneRef.current.style.flexGrow = `${1 - newFlex}`;
        splitterRef.current.ariaValueNow = "0";
        return;
      } else if (e.key === "End") {
        firstPaneMeasurements.current = measureElement(firstPaneRef.current);
        containerSize.current = containerRef.current.getBoundingClientRect()[measurementProp];
        const newFlex = firstPaneMeasurements.current[maxDimProp] / (containerSize.current - handleSize);
        firstPaneRef.current.style.flexGrow = `${newFlex}`;
        secondPaneRef.current.style.flexGrow = `${1 - newFlex}`;
        splitterRef.current.ariaValueNow = "100";
        return;
      }
      if (!(direction === "column" && VERTICAL_KEYS.has(e.key) || direction === "row" && HORIZONTAL_KEYS.has(e.key)) || pressedKeys.current.has(e.key)) {
        return;
      }
      savedPos.current = void 0;
      e.preventDefault();
      e.stopPropagation();
      primarySizeRef.current = firstPaneRef.current.getBoundingClientRect()[measurementProp];
      containerSize.current = containerRef.current.getBoundingClientRect()[measurementProp];
      firstPaneMeasurements.current = measureElement(firstPaneRef.current);
      const newKey = !pressedKeys.current.has(e.key);
      if (newKey) {
        const initiateAnimationLoop = pressedKeys.current.size === 0;
        pressedKeys.current.add(e.key);
        if (initiateAnimationLoop) {
          window.requestAnimationFrame(handlePressedKeys);
        }
      }
    },
    [direction, handlePressedKeys, handleSize, maxDimProp, measurementProp, minDimProp]
  );
  const onKeyUp = useCallback(
    (e) => {
      if (direction === "row" && !HORIZONTAL_KEYS.has(e.key) || direction === "column" && !VERTICAL_KEYS.has(e.key)) {
        return;
      }
      pressedKeys.current.delete(e.key);
      if (typeof primarySizeRef.current === "number") {
        onSizeChanged == null ? void 0 : onSizeChanged(parseFloat(firstPaneRef.current.style.flexGrow), primarySizeRef.current);
      }
    },
    [direction, onSizeChanged]
  );
  const onDoubleClick = useCallback(() => {
    if (!firstPaneRef.current || !secondPaneRef.current) {
      return;
    }
    firstPaneRef.current.style.flexGrow = "0.5";
    secondPaneRef.current.style.flexGrow = "0.5";
    const dim = measureElement(firstPaneRef.current);
    firstPaneMeasurements.current = dim;
    primarySizeRef.current = firstPaneRef.current.getBoundingClientRect()[measurementProp];
    splitterRef.current.ariaValueNow = `${ariaValue(primarySizeRef.current, dim[minDimProp], dim[maxDimProp])}`;
  }, [maxDimProp, measurementProp, minDimProp]);
  const onBlur = useCallback(() => {
    if (pressedKeys.current.size > 0) {
      pressedKeys.current.clear();
      dragStart.current = null;
      if (typeof primarySizeRef.current === "number") {
        onSizeChanged == null ? void 0 : onSizeChanged(parseFloat(firstPaneRef.current.style.flexGrow), primarySizeRef.current);
      }
    }
  }, [onSizeChanged]);
  const styles = useStyles2(getStyles, direction);
  const dragStyles = useStyles2(getDragStyles, dragPosition);
  const dragHandleStyle = direction === "column" ? dragStyles.dragHandleHorizontal : dragStyles.dragHandleVertical;
  const id = useId();
  return {
    containerProps: {
      ref: containerRef,
      className: styles.container
    },
    primaryProps: {
      ref: firstPaneRef,
      className: styles.panel,
      style: {
        [minDimProp]: "min-content",
        flexGrow: clamp(initialSize != null ? initialSize : 0.5, 0, 1)
      }
    },
    secondaryProps: {
      ref: secondPaneRef,
      className: styles.panel,
      style: {
        flexGrow: clamp(1 - initialSize, 0, 1),
        [minDimProp]: "min-content"
      }
    },
    splitterProps: {
      onPointerUp,
      onPointerDown,
      onPointerMove,
      onKeyDown,
      onKeyUp,
      onDoubleClick,
      onBlur,
      ref: splitterRef,
      style: { [measurementProp]: `${handleSize}px` },
      role: "separator",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": initialSize * 100,
      "aria-controls": `start-panel-${id}`,
      "aria-label": "Pane resize widget",
      tabIndex: 0,
      className: dragHandleStyle
    }
  };
}
function ariaValue(value, min, max) {
  return `${clamp((value - min) / (max - min) * 100, 0, 100)}`;
}
function measureElement(ref) {
  const savedBodyOverflow = document.body.style.overflow;
  const savedWidth = ref.style.width;
  const savedHeight = ref.style.height;
  const savedFlex = ref.style.flexGrow;
  document.body.style.overflow = "hidden";
  ref.style.flexGrow = "0";
  const { width: minWidth, height: minHeight } = ref.getBoundingClientRect();
  ref.style.flexGrow = "100";
  const { width: maxWidth, height: maxHeight } = ref.getBoundingClientRect();
  document.body.style.overflow = savedBodyOverflow;
  ref.style.width = savedWidth;
  ref.style.height = savedHeight;
  ref.style.flexGrow = savedFlex;
  return { minWidth, maxWidth, minHeight, maxHeight };
}
function useResizeObserver(target, cb, throttleWait = 0, deps) {
  const throttledCallback = throttle(cb, throttleWait);
  useLayoutEffect(() => {
    if (!target) {
      return;
    }
    const resizeObserver = new ResizeObserver(throttledCallback);
    resizeObserver.observe(target, { box: "device-pixel-content-box" });
    return () => resizeObserver.disconnect();
  }, deps);
}
function getStyles(theme, direction) {
  return {
    container: css({
      display: "flex",
      flexDirection: direction === "row" ? "row" : "column",
      width: "100%",
      flexGrow: 1,
      overflow: "hidden"
    }),
    panel: css({ display: "flex", position: "relative", flexBasis: 0 })
  };
}

export { useSplitter };
//# sourceMappingURL=useSplitter.js.map
