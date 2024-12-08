import { isEmpty, isBoolean, isArray, join, toString } from 'lodash';
import { getFieldTypeFromValue } from '../dataframe/processDataFrame.js';
import { toUtc } from '../datetime/moment_wrapper.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import { dateTimeParse } from '../datetime/parser.js';
import 'date-fns';
import { FieldType } from '../types/dataFrame.js';
import { anyToNumber } from '../utils/anyToNumber.js';
import { getValueMappingResult } from '../utils/valueMappings.js';
import { isBooleanUnit, getValueFormat } from '../valueFormats/valueFormats.js';
import { getScaleCalculator } from './scale.js';

const timeFormats = {
  dateTimeAsIso: true,
  dateTimeAsIsoNoDateIfToday: true,
  dateTimeAsUS: true,
  dateTimeAsUSNoDateIfToday: true,
  dateTimeAsLocal: true,
  dateTimeAsLocalNoDateIfToday: true,
  dateTimeFromNow: true
};
function getDisplayProcessor(options) {
  var _a;
  if (!options || isEmpty(options) || !options.field) {
    return toStringProcessor;
  }
  const field = options.field;
  const config = (_a = field.config) != null ? _a : {};
  const { palette } = options.theme.visualization;
  let unit = config.unit;
  let hasDateUnit = unit && (timeFormats[unit] || unit.startsWith("time:"));
  let showMs = false;
  if (field.type === FieldType.time && !hasDateUnit) {
    unit = `dateTimeAsSystem`;
    hasDateUnit = true;
    if (field.values && field.values.length > 1) {
      let start = field.values[0];
      let end = field.values[field.values.length - 1];
      if (typeof start === "string") {
        start = dateTimeParse(start).unix();
        end = dateTimeParse(end).unix();
      } else {
        start /= 1e3;
        end /= 1e3;
      }
      showMs = Math.abs(end - start) < 60;
    }
  } else if (field.type === FieldType.boolean) {
    if (!isBooleanUnit(unit)) {
      unit = "bool";
    }
  } else if (!unit && field.type === FieldType.string) {
    unit = "string";
  }
  const hasCurrencyUnit = unit == null ? void 0 : unit.startsWith("currency");
  const hasBoolUnit = isBooleanUnit(unit);
  const isNumType = field.type === FieldType.number;
  const isLocaleFormat = unit === "locale";
  const canTrimTrailingDecimalZeros = !hasDateUnit && !hasCurrencyUnit && !hasBoolUnit && !isLocaleFormat && isNumType && config.decimals == null;
  const formatFunc = getValueFormat(unit || "none");
  const scaleFunc = getScaleCalculator(field, options.theme);
  return (value, adjacentDecimals) => {
    const { mappings } = config;
    const isStringUnit = unit === "string";
    if (hasDateUnit && typeof value === "string") {
      value = toUtc(value).valueOf();
    }
    let numeric = isStringUnit ? NaN : anyToNumber(value);
    let text;
    let prefix;
    let suffix;
    let color;
    let icon;
    let percent;
    if (mappings && mappings.length > 0) {
      const mappingResult = getValueMappingResult(mappings, value);
      if (mappingResult) {
        if (mappingResult.text != null) {
          text = mappingResult.text;
        }
        if (mappingResult.color != null) {
          color = options.theme.visualization.getColorByName(mappingResult.color);
        }
        if (mappingResult.icon != null) {
          icon = mappingResult.icon;
        }
      }
    } else if (field.type === FieldType.enum) {
      if (value == null) {
        return {
          text: "",
          numeric: NaN
        };
      }
      const enumIndex = +value;
      if (config && config.type && config.type.enum) {
        const { text: enumText, color: enumColor } = config.type.enum;
        text = enumText ? enumText[enumIndex] : `${value}`;
        color = enumColor ? enumColor[enumIndex] : void 0;
        if (color == null) {
          const namedColor = palette[enumIndex % palette.length];
          color = options.theme.visualization.getColorByName(namedColor);
        }
      }
    }
    if (!Number.isNaN(numeric)) {
      if (text == null && !isBoolean(value)) {
        let v;
        if (canTrimTrailingDecimalZeros && adjacentDecimals != null) {
          v = formatFunc(numeric, adjacentDecimals, null, options.timeZone, showMs);
          v.text = +v.text + "";
        } else {
          v = formatFunc(numeric, config.decimals, null, options.timeZone, showMs);
        }
        text = v.text;
        suffix = v.suffix;
        prefix = v.prefix;
      }
      if (color == null) {
        const scaleResult = scaleFunc(numeric);
        color = scaleResult.color;
        percent = scaleResult.percent;
      }
    }
    if (text == null && isArray(value)) {
      text = join(value, ", ");
    }
    if (text == null) {
      text = toString(value);
      if (!text) {
        if (config.noValue) {
          text = config.noValue;
        } else {
          text = "";
        }
      }
    }
    if (!color) {
      const scaleResult = scaleFunc(-Infinity);
      color = scaleResult.color;
      percent = scaleResult.percent;
    }
    const display = {
      text,
      numeric,
      prefix,
      suffix,
      color
    };
    if (icon != null) {
      display.icon = icon;
    }
    if (percent != null) {
      display.percent = percent;
    }
    return display;
  };
}
function toStringProcessor(value) {
  return { text: toString(value), numeric: anyToNumber(value) };
}
function getRawDisplayProcessor() {
  return (value) => ({
    text: getFieldTypeFromValue(value) === "other" ? `${JSON.stringify(value, getCircularReplacer())}` : `${value}`,
    numeric: null
  });
}
const getCircularReplacer = () => {
  const seen = /* @__PURE__ */ new WeakSet();
  return (_key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export { getDisplayProcessor, getRawDisplayProcessor };
//# sourceMappingURL=displayProcessor.js.map
