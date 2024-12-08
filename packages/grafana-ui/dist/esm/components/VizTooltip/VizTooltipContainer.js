import { cx, css } from '@emotion/css';
import React__default, { useRef, useState, useMemo, useLayoutEffect } from 'react';
import { useWindowSize } from 'react-use';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getTooltipContainerStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { calculateTooltipPosition } from './utils.js';

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
const VizTooltipContainer = (_a) => {
  var _b = _a, {
    position: { x: positionX, y: positionY },
    offset: { x: offsetX, y: offsetY },
    children,
    allowPointerEvents = false,
    className
  } = _b, otherProps = __objRest(_b, [
    "position",
    "offset",
    "children",
    "allowPointerEvents",
    "className"
  ]);
  const tooltipRef = useRef(null);
  const [tooltipMeasurement, setTooltipMeasurement] = useState({ width: 0, height: 0 });
  const { width, height } = useWindowSize();
  const [placement, setPlacement] = useState({
    x: positionX + offsetX,
    y: positionY + offsetY
  });
  const resizeObserver = useMemo(
    () => (
      // TS has hard time playing games with @types/resize-observer-browser, hence the ignore
      // @ts-ignore
      new ResizeObserver((entries) => {
        for (let entry of entries) {
          const tW = Math.floor(entry.contentRect.width + 2 * 8);
          const tH = Math.floor(entry.contentRect.height + 2 * 8);
          if (tooltipMeasurement.width !== tW || tooltipMeasurement.height !== tH) {
            setTooltipMeasurement({
              width: Math.min(tW, width),
              height: Math.min(tH, height)
            });
          }
        }
      })
    ),
    [tooltipMeasurement, width, height]
  );
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      resizeObserver.observe(tooltipRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver]);
  useLayoutEffect(() => {
    if (tooltipRef && tooltipRef.current) {
      const { x, y } = calculateTooltipPosition(
        positionX,
        positionY,
        tooltipMeasurement.width,
        tooltipMeasurement.height,
        offsetX,
        offsetY,
        width,
        height
      );
      setPlacement({ x, y });
    }
  }, [width, height, positionX, offsetX, positionY, offsetY, tooltipMeasurement]);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    __spreadProps(__spreadValues({
      ref: tooltipRef,
      style: {
        position: "fixed",
        left: 0,
        // disabling pointer-events is to prevent the tooltip from flickering when moving left to right
        // see e.g. https://github.com/grafana/grafana/pull/33609
        pointerEvents: allowPointerEvents ? "auto" : "none",
        top: 0,
        transform: `translate(${placement.x}px, ${placement.y}px)`,
        transition: "transform ease-out 0.1s"
      },
      "aria-live": "polite",
      "aria-atomic": "true"
    }, otherProps), {
      className: cx(styles.wrapper, className)
    }),
    children
  );
};
VizTooltipContainer.displayName = "VizTooltipContainer";
const getStyles = (theme) => ({
  wrapper: css(getTooltipContainerStyles(theme))
});

export { VizTooltipContainer };
//# sourceMappingURL=VizTooltipContainer.js.map
