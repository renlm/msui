import React__default, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { useMountedState } from 'react-use';
import { Marker } from './Marker.js';
import { XYCanvas } from './XYCanvas.js';

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
function EventsCanvas({ id, events, renderEventMarker, mapEventToXYCoords, config }) {
  const plotInstance = useRef();
  const [renderToken, setRenderToken] = useState(0);
  const isMounted = useMountedState();
  useLayoutEffect(() => {
    config.addHook("init", (u) => {
      plotInstance.current = u;
    });
    config.addHook("draw", () => {
      if (!isMounted()) {
        return;
      }
      setRenderToken((s) => s + 1);
    });
  }, [config, setRenderToken]);
  const eventMarkers = useMemo(() => {
    const markers = [];
    if (!plotInstance.current || events.length === 0) {
      return markers;
    }
    for (let i = 0; i < events.length; i++) {
      const frame = events[i];
      for (let j = 0; j < frame.length; j++) {
        const coords = mapEventToXYCoords(frame, { fieldIndex: j, frameIndex: i });
        if (!coords) {
          continue;
        }
        markers.push(
          /* @__PURE__ */ React__default.createElement(Marker, __spreadProps(__spreadValues({}, coords), { key: `${id}-marker-${i}-${j}` }), renderEventMarker(frame, { fieldIndex: j, frameIndex: i }))
        );
      }
    }
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, markers);
  }, [events, renderEventMarker, renderToken]);
  if (!plotInstance.current) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(
    XYCanvas,
    {
      left: plotInstance.current.bbox.left / window.devicePixelRatio,
      top: plotInstance.current.bbox.top / window.devicePixelRatio
    },
    eventMarkers
  );
}

export { EventsCanvas };
//# sourceMappingURL=EventsCanvas.js.map
