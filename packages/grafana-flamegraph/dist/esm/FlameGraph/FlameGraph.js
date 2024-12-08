import { cx, css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { Icon } from '@grafana/ui';
import { PIXELS_PER_LEVEL } from '../constants.js';
import FlameGraphCanvas from './FlameGraphCanvas.js';
import FlameGraphMetadata from './FlameGraphMetadata.js';

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
const FlameGraph = ({
  data,
  rangeMin,
  rangeMax,
  matchedLabels,
  setRangeMin,
  setRangeMax,
  onItemFocused,
  focusedItemData,
  textAlign,
  onSandwich,
  sandwichItem,
  onFocusPillClick,
  onSandwichPillClick,
  colorScheme,
  showFlameGraphOnly,
  getExtraContextMenuButtons,
  collapsing,
  selectedView,
  search,
  collapsedMap,
  setCollapsedMap
}) => {
  const styles = getStyles();
  const [levels, setLevels] = useState();
  const [levelsCallers, setLevelsCallers] = useState();
  const [totalProfileTicks, setTotalProfileTicks] = useState(0);
  const [totalProfileTicksRight, setTotalProfileTicksRight] = useState();
  const [totalViewTicks, setTotalViewTicks] = useState(0);
  useEffect(() => {
    var _a, _b, _c;
    if (data) {
      let levels2 = data.getLevels();
      let totalProfileTicks2 = levels2.length ? levels2[0][0].value : 0;
      let totalProfileTicksRight2 = levels2.length ? levels2[0][0].valueRight : void 0;
      let totalViewTicks2 = totalProfileTicks2;
      let levelsCallers2 = void 0;
      if (sandwichItem) {
        const [callers, callees] = data.getSandwichLevels(sandwichItem);
        levels2 = callees;
        levelsCallers2 = callers;
        totalViewTicks2 = (_c = (_b = (_a = callees[0]) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) != null ? _c : 0;
      }
      setLevels(levels2);
      setLevelsCallers(levelsCallers2);
      setTotalProfileTicks(totalProfileTicks2);
      setTotalProfileTicksRight(totalProfileTicksRight2);
      setTotalViewTicks(totalViewTicks2);
    }
  }, [data, sandwichItem]);
  if (!levels) {
    return null;
  }
  const commonCanvasProps = {
    data,
    rangeMin,
    rangeMax,
    matchedLabels,
    setRangeMin,
    setRangeMax,
    onItemFocused,
    focusedItemData,
    textAlign,
    onSandwich,
    colorScheme,
    totalProfileTicks,
    totalProfileTicksRight,
    totalViewTicks,
    showFlameGraphOnly,
    collapsedMap,
    setCollapsedMap,
    getExtraContextMenuButtons,
    collapsing,
    search,
    selectedView
  };
  const canvas = levelsCallers ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.sandwichCanvasWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.sandwichMarker }, "Callers", /* @__PURE__ */ React.createElement(Icon, { className: styles.sandwichMarkerIcon, name: "arrow-down" })), /* @__PURE__ */ React.createElement(
    FlameGraphCanvas,
    __spreadProps(__spreadValues({}, commonCanvasProps), {
      root: levelsCallers[levelsCallers.length - 1][0],
      depth: levelsCallers.length,
      direction: "parents",
      collapsing: false
    })
  )), /* @__PURE__ */ React.createElement("div", { className: styles.sandwichCanvasWrapper }, /* @__PURE__ */ React.createElement("div", { className: cx(styles.sandwichMarker, styles.sandwichMarkerCalees) }, /* @__PURE__ */ React.createElement(Icon, { className: styles.sandwichMarkerIcon, name: "arrow-up" }), "Callees"), /* @__PURE__ */ React.createElement(
    FlameGraphCanvas,
    __spreadProps(__spreadValues({}, commonCanvasProps), {
      root: levels[0][0],
      depth: levels.length,
      direction: "children",
      collapsing: false
    })
  ))) : /* @__PURE__ */ React.createElement(FlameGraphCanvas, __spreadProps(__spreadValues({}, commonCanvasProps), { root: levels[0][0], depth: levels.length, direction: "children" }));
  return /* @__PURE__ */ React.createElement("div", { className: styles.graph }, /* @__PURE__ */ React.createElement(
    FlameGraphMetadata,
    {
      data,
      focusedItem: focusedItemData,
      sandwichedLabel: sandwichItem,
      totalTicks: totalViewTicks,
      onFocusPillClick,
      onSandwichPillClick
    }
  ), canvas);
};
const getStyles = () => ({
  graph: css({
    label: "graph",
    overflow: "auto",
    flexGrow: 1,
    flexBasis: "50%"
  }),
  sandwichCanvasWrapper: css({
    label: "sandwichCanvasWrapper",
    display: "flex",
    marginBottom: `${PIXELS_PER_LEVEL / window.devicePixelRatio}px`
  }),
  sandwichMarker: css({
    label: "sandwichMarker",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }),
  sandwichMarkerCalees: css({
    label: "sandwichMarkerCalees",
    textAlign: "right"
  }),
  sandwichMarkerIcon: css({
    label: "sandwichMarkerIcon",
    verticalAlign: "baseline"
  })
});

export { FlameGraph as default };
//# sourceMappingURL=FlameGraph.js.map
