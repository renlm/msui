import { isBooleanUnit, guessDecimals, roundDecimals, systemDateFormats, dateTimeFormat } from '@grafana/data';
import { AxisPlacement, ScaleDistribution } from '@grafana/schema';
import { measureText } from '../../../utils/measureText.js';
import { PlotConfigBuilder } from '../types.js';
import { optMinMax } from './UPlotScaleBuilder.js';

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
const UPLOT_AXIS_FONT_SIZE = 12;
const labelPad = 8;
class UPlotAxisBuilder extends PlotConfigBuilder {
  merge(props) {
    this.props.size = optMinMax("max", this.props.size, props.size);
    if (!this.props.label) {
      this.props.label = props.label;
    }
    if (this.props.placement === AxisPlacement.Auto) {
      this.props.placement = props.placement;
    }
  }
  /* Minimum grid & tick spacing in CSS pixels */
  calculateSpace(self, axisIdx, scaleMin, scaleMax, plotDim) {
    const axis = self.axes[axisIdx];
    const scale = self.scales[axis.scale];
    if (axis.side !== 2 || !scale) {
      return 30;
    }
    const defaultSpacing = 40;
    if (scale.time) {
      const maxTicks = plotDim / defaultSpacing;
      const increment = (scaleMax - scaleMin) / maxTicks;
      const sample = formatTime(self, [scaleMin], axisIdx, defaultSpacing, increment);
      const width = measureText(sample[0], UPLOT_AXIS_FONT_SIZE).width + 18;
      return width;
    }
    return defaultSpacing;
  }
  /** height of x axis or width of y axis in CSS pixels alloted for values, gap & ticks, but excluding axis label */
  calculateAxisSize(self, values, axisIdx) {
    const axis = self.axes[axisIdx];
    let axisSize = axis.ticks.size;
    if (axis.side === 2) {
      axisSize += axis.gap + UPLOT_AXIS_FONT_SIZE;
    } else if (values == null ? void 0 : values.length) {
      let maxTextWidth = values.reduce(
        (acc, value) => Math.max(acc, measureText(value, UPLOT_AXIS_FONT_SIZE).width),
        0
      );
      const textWidthWithLimit = Math.min(self.width * 0.4, maxTextWidth);
      axisSize += axis.gap + axis.labelGap + textWidthWithLimit;
    }
    return Math.ceil(axisSize);
  }
  getConfig() {
    let {
      scaleKey,
      label,
      show = true,
      placement = AxisPlacement.Auto,
      grid = { show: true },
      ticks,
      space,
      filter,
      gap = 5,
      formatValue,
      splits,
      values,
      incrs,
      isTime,
      timeZone,
      theme,
      tickLabelRotation,
      size,
      color,
      border,
      decimals,
      distr = ScaleDistribution.Linear
    } = this.props;
    const font = `${UPLOT_AXIS_FONT_SIZE}px ${theme.typography.fontFamily}`;
    const gridColor = theme.isDark ? "rgba(240, 250, 255, 0.09)" : "rgba(0, 10, 23, 0.09)";
    if (isBooleanUnit(scaleKey)) {
      splits = [0, 1];
    }
    if (decimals === 0 && distr === ScaleDistribution.Linear) {
      filter = (u, splits2) => splits2.map((v) => Number.isInteger(v) ? v : null);
    }
    let config = {
      scale: scaleKey,
      show,
      stroke: color != null ? color : theme.colors.text.primary,
      side: getUPlotSideFromAxis(placement),
      font,
      size: size != null ? size : (self, values2, axisIdx) => {
        return this.calculateAxisSize(self, values2, axisIdx);
      },
      rotate: tickLabelRotation,
      gap,
      labelGap: 0,
      grid: {
        show: grid.show,
        stroke: gridColor,
        width: 1 / devicePixelRatio
      },
      ticks: Object.assign(
        {
          show: true,
          stroke: (border == null ? void 0 : border.show) ? color != null ? color : theme.colors.text.primary : gridColor,
          width: 1 / devicePixelRatio,
          size: 4
        },
        ticks
      ),
      splits,
      values,
      space: space != null ? space : (self, axisIdx, scaleMin, scaleMax, plotDim) => {
        return this.calculateSpace(self, axisIdx, scaleMin, scaleMax, plotDim);
      },
      filter,
      incrs
    };
    if (border == null ? void 0 : border.show) {
      config.border = __spreadValues({
        stroke: color != null ? color : theme.colors.text.primary,
        width: 1 / devicePixelRatio
      }, border);
    }
    if (label != null && label.length > 0) {
      config.label = label;
      config.labelSize = UPLOT_AXIS_FONT_SIZE + labelPad;
      config.labelFont = font;
      config.labelGap = labelPad;
    }
    if (values) {
      config.values = values;
    } else if (isTime) {
      config.values = formatTime;
    } else if (formatValue) {
      config.values = (u, splits2, axisIdx, tickSpace, tickIncr) => {
        let decimals2 = guessDecimals(roundDecimals(tickIncr, 6));
        return splits2.map((v) => formatValue(v, decimals2 > 0 ? decimals2 : void 0));
      };
    }
    config.timeZone = timeZone;
    return config;
  }
}
const timeUnitSize = {
  second: 1e3,
  minute: 60 * 1e3,
  hour: 60 * 60 * 1e3,
  day: 24 * 60 * 60 * 1e3,
  month: 28 * 24 * 60 * 60 * 1e3,
  year: 365 * 24 * 60 * 60 * 1e3
};
function formatTime(self, splits, axisIdx, foundSpace, foundIncr) {
  var _a, _b;
  const axis = self.axes[axisIdx];
  const timeZone = "timeZone" in axis && typeof axis.timeZone === "string" ? axis.timeZone : void 0;
  const scale = self.scales.x;
  const range = ((_a = scale == null ? void 0 : scale.max) != null ? _a : 0) - ((_b = scale == null ? void 0 : scale.min) != null ? _b : 0);
  const yearRoundedToDay = Math.round(timeUnitSize.year / timeUnitSize.day) * timeUnitSize.day;
  const incrementRoundedToDay = Math.round(foundIncr / timeUnitSize.day) * timeUnitSize.day;
  let format = systemDateFormats.interval.year;
  if (foundIncr < timeUnitSize.second) {
    format = systemDateFormats.interval.millisecond;
  } else if (foundIncr <= timeUnitSize.minute) {
    format = systemDateFormats.interval.second;
  } else if (range <= timeUnitSize.day) {
    format = systemDateFormats.interval.minute;
  } else if (foundIncr <= timeUnitSize.day) {
    format = systemDateFormats.interval.hour;
  } else if (range < timeUnitSize.year) {
    format = systemDateFormats.interval.day;
  } else if (incrementRoundedToDay === yearRoundedToDay) {
    format = systemDateFormats.interval.year;
  } else if (foundIncr <= timeUnitSize.year) {
    format = systemDateFormats.interval.month;
  }
  return splits.map((v) => v == null ? "" : dateTimeFormat(v, { format, timeZone }));
}
function getUPlotSideFromAxis(axis) {
  switch (axis) {
    case AxisPlacement.Top:
      return 0;
    case AxisPlacement.Right:
      return 1;
    case AxisPlacement.Bottom:
      return 2;
    case AxisPlacement.Left:
  }
  return 3;
}

export { UPLOT_AXIS_FONT_SIZE, UPlotAxisBuilder, formatTime, getUPlotSideFromAxis, timeUnitSize };
//# sourceMappingURL=UPlotAxisBuilder.js.map
