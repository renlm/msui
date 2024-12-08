import { isNumber } from 'lodash';
import { reduceField, ReducerID } from '../transformations/fieldReducer.js';
import { FieldType } from '../types/dataFrame.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import { getFieldColorModeForField } from './fieldColor.js';
import { getActiveThresholdForValue } from './thresholds.js';

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
function getScaleCalculator(field, theme) {
  var _a, _b;
  if (field.type === FieldType.boolean) {
    return getBooleanScaleCalculator(field, theme);
  }
  const mode = getFieldColorModeForField(field);
  const getColor = mode.getCalculator(field, theme);
  const info = (_b = (_a = field.state) == null ? void 0 : _a.range) != null ? _b : getMinMaxAndDelta(field);
  return (value) => {
    let percent = 0;
    if (value !== -Infinity) {
      percent = (value - info.min) / info.delta;
      if (Number.isNaN(percent)) {
        percent = 0;
      }
    }
    const threshold = getActiveThresholdForValue(field, value, percent);
    return {
      percent,
      threshold,
      color: getColor(value, percent, threshold)
    };
  };
}
function getBooleanScaleCalculator(field, theme) {
  const trueValue = {
    color: theme.visualization.getColorByName("green"),
    percent: 1,
    threshold: void 0
  };
  const falseValue = {
    color: theme.visualization.getColorByName("red"),
    percent: 0,
    threshold: void 0
  };
  const mode = getFieldColorModeForField(field);
  if (mode.isContinuous && mode.getColors) {
    const colors = mode.getColors(theme);
    trueValue.color = colors[colors.length - 1];
    falseValue.color = colors[0];
  }
  return (value) => {
    return Boolean(value) ? trueValue : falseValue;
  };
}
function getMinMaxAndDelta(field) {
  if (field.type !== FieldType.number) {
    return { min: 0, max: 100, delta: 100 };
  }
  let min = field.config.min;
  let max = field.config.max;
  if (!isNumber(min) || !isNumber(max)) {
    if (field.values && field.values.length) {
      const stats = reduceField({ field, reducers: [ReducerID.min, ReducerID.max] });
      if (!isNumber(min)) {
        min = stats[ReducerID.min];
      }
      if (!isNumber(max)) {
        max = stats[ReducerID.max];
      }
    } else {
      min = 0;
      max = 100;
    }
  }
  return {
    min,
    max,
    delta: max - min
  };
}
function getFieldConfigWithMinMax(field, local) {
  var _a;
  const { config } = field;
  let { min, max } = config;
  if (isNumber(min) && isNumber(max)) {
    return config;
  }
  if (local || !((_a = field.state) == null ? void 0 : _a.range)) {
    return __spreadValues(__spreadValues({}, config), getMinMaxAndDelta(field));
  }
  return __spreadValues(__spreadValues({}, config), field.state.range);
}

export { getFieldConfigWithMinMax, getMinMaxAndDelta, getScaleCalculator };
//# sourceMappingURL=scale.js.map
