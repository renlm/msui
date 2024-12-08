import React__default from 'react';
import { getFieldDisplayName, getFieldSeriesColor } from '@grafana/data';
import { AxisPlacement } from '@grafana/schema';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { VizLayout } from '../VizLayout/VizLayout.js';
import { VizLegend } from '../VizLegend/VizLegend.js';
import { getDisplayValuesForCalcs } from './utils.js';

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
function hasVisibleLegendSeries(config, data) {
  return config.getSeries().some((s) => {
    var _a, _b, _c;
    const fieldIndex = s.props.dataFrameFieldIndex;
    if (!fieldIndex) {
      return false;
    }
    const field = (_a = data[fieldIndex.frameIndex]) == null ? void 0 : _a.fields[fieldIndex.fieldIndex];
    if (!field || ((_c = (_b = field.config.custom) == null ? void 0 : _b.hideFrom) == null ? void 0 : _c.legend)) {
      return false;
    }
    return true;
  });
}
const PlotLegend = React__default.memo(
  (_a) => {
    var _b = _a, { data, config, placement, calcs, displayMode } = _b, vizLayoutLegendProps = __objRest(_b, ["data", "config", "placement", "calcs", "displayMode"]);
    const theme = useTheme2();
    const legendItems = config.getSeries().map((s) => {
      var _a2, _b2, _c, _d;
      const seriesConfig = s.props;
      const fieldIndex = seriesConfig.dataFrameFieldIndex;
      const axisPlacement = config.getAxisPlacement(s.props.scaleKey);
      if (!fieldIndex) {
        return void 0;
      }
      const field = (_a2 = data[fieldIndex.frameIndex]) == null ? void 0 : _a2.fields[fieldIndex.fieldIndex];
      if (!field || ((_c = (_b2 = field.config.custom) == null ? void 0 : _b2.hideFrom) == null ? void 0 : _c.legend)) {
        return void 0;
      }
      const label = getFieldDisplayName(field, data[fieldIndex.frameIndex], data);
      const scaleColor = getFieldSeriesColor(field, theme);
      const seriesColor = scaleColor.color;
      return {
        disabled: !((_d = seriesConfig.show) != null ? _d : true),
        fieldIndex,
        color: seriesColor,
        label,
        yAxis: axisPlacement === AxisPlacement.Left || axisPlacement === AxisPlacement.Bottom ? 1 : 2,
        getDisplayValues: () => getDisplayValuesForCalcs(calcs, field, theme),
        getItemKey: () => `${label}-${fieldIndex.frameIndex}-${fieldIndex.fieldIndex}`,
        lineStyle: seriesConfig.lineStyle
      };
    }).filter((i) => i !== void 0);
    return /* @__PURE__ */ React__default.createElement(VizLayout.Legend, __spreadValues({ placement }, vizLayoutLegendProps), /* @__PURE__ */ React__default.createElement(
      VizLegend,
      {
        placement,
        items: legendItems,
        displayMode,
        sortBy: vizLayoutLegendProps.sortBy,
        sortDesc: vizLayoutLegendProps.sortDesc,
        isSortable: true
      }
    ));
  }
);
PlotLegend.displayName = "PlotLegend";

export { PlotLegend, hasVisibleLegendSeries };
//# sourceMappingURL=PlotLegend.js.map
