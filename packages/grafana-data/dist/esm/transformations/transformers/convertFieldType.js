import { map } from 'rxjs/operators';
import 'lodash';
import '../../datetime/moment_wrapper.js';
import '../../datetime/rangeutil.js';
import '../../datetime/timezones.js';
import '../../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import { dateTimeParse } from '../../datetime/parser.js';
import 'date-fns';
import { FieldType } from '../../types/dataFrame.js';
import { fieldMatchers } from '../matchers.js';
import { FieldMatcherID } from '../matchers/ids.js';
import { DataTransformerID } from './ids.js';

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
const convertFieldTypeTransformer = {
  id: DataTransformerID.convertFieldType,
  name: "Convert field type",
  description: "Convert a field to a specified field type.",
  defaultOptions: {
    fields: {},
    conversions: [{ targetField: void 0, destinationType: void 0, dateFormat: void 0, timezone: void 0 }]
  },
  operator: (options, ctx) => (source) => source.pipe(map((data) => convertFieldTypeTransformer.transformer(options, ctx)(data))),
  transformer: (options) => (data) => {
    var _a;
    if (!Array.isArray(data) || data.length === 0) {
      return data;
    }
    return (_a = convertFieldTypes(options, data)) != null ? _a : [];
  }
};
function convertFieldTypes(options, frames) {
  if (!options.conversions.length) {
    return frames;
  }
  const framesCopy = frames.map((frame) => __spreadValues({}, frame));
  for (const conversion of options.conversions) {
    if (!conversion.targetField) {
      continue;
    }
    const matches = fieldMatchers.get(FieldMatcherID.byName).get(conversion.targetField);
    for (const frame of framesCopy) {
      frame.fields = frame.fields.map((field) => {
        if (matches(field, frame, framesCopy)) {
          return convertFieldType(field, conversion);
        }
        return field;
      });
    }
  }
  return framesCopy;
}
function convertFieldType(field, opts) {
  switch (opts.destinationType) {
    case FieldType.time:
      return ensureTimeField(field, opts.dateFormat);
    case FieldType.number:
      return fieldToNumberField(field);
    case FieldType.string:
      return fieldToStringField(field, opts.dateFormat, { timeZone: opts.timezone }, opts.joinWith);
    case FieldType.boolean:
      return fieldToBooleanField(field);
    case FieldType.enum:
      return fieldToEnumField(field, opts.enumConfig);
    case FieldType.other:
      return fieldToComplexField(field);
    default:
      return field;
  }
}
const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3,})?(?:Z|[-+]\d{2}:?\d{2})$/;
function fieldToTimeField(field, dateFormat) {
  let opts = dateFormat ? { format: dateFormat } : void 0;
  const timeValues = field.values.slice();
  let firstDefined = timeValues.find((v) => v != null);
  let isISO8601 = typeof firstDefined === "string" && iso8601Regex.test(firstDefined);
  for (let t = 0; t < timeValues.length; t++) {
    if (timeValues[t]) {
      let parsed = isISO8601 ? Date.parse(timeValues[t]) : dateTimeParse(timeValues[t], opts).valueOf();
      timeValues[t] = Number.isFinite(parsed) ? parsed : null;
    } else {
      timeValues[t] = null;
    }
  }
  return __spreadProps(__spreadValues({}, field), {
    type: FieldType.time,
    values: timeValues
  });
}
function fieldToNumberField(field) {
  const numValues = field.values.slice();
  const valuesAsStrings = numValues.some((v) => typeof v === "string");
  for (let n = 0; n < numValues.length; n++) {
    let toBeConverted = numValues[n];
    if (valuesAsStrings && toBeConverted != null && typeof toBeConverted === "string") {
      toBeConverted = toBeConverted.replace(/,/g, "");
    }
    const number = +toBeConverted;
    numValues[n] = Number.isFinite(number) ? number : null;
  }
  return __spreadProps(__spreadValues({}, field), {
    type: FieldType.number,
    values: numValues
  });
}
function fieldToBooleanField(field) {
  const booleanValues = field.values.slice();
  for (let b = 0; b < booleanValues.length; b++) {
    booleanValues[b] = Boolean(!!booleanValues[b]);
  }
  return __spreadProps(__spreadValues({}, field), {
    type: FieldType.boolean,
    values: booleanValues
  });
}
function fieldToStringField(field, dateFormat, parseOptions, joinWith) {
  let values = field.values;
  switch (field.type) {
    case FieldType.time:
      values = values.map((v) => dateTimeParse(v, parseOptions).format(dateFormat));
      break;
    case FieldType.other:
      values = values.map((v) => {
        if ((joinWith == null ? void 0 : joinWith.length) && Array.isArray(v)) {
          return v.join(joinWith);
        }
        return JSON.stringify(v);
      });
      break;
    default:
      values = values.map((v) => `${v}`);
  }
  return __spreadProps(__spreadValues({}, field), {
    type: FieldType.string,
    values
  });
}
function fieldToComplexField(field) {
  const complexValues = field.values.slice();
  for (let s = 0; s < complexValues.length; s++) {
    try {
      complexValues[s] = JSON.parse(complexValues[s]);
    } catch (e) {
      complexValues[s] = null;
    }
  }
  return __spreadProps(__spreadValues({}, field), {
    type: FieldType.other,
    values: complexValues
  });
}
function ensureTimeField(field, dateFormat) {
  const firstValueTypeIsNumber = typeof field.values[0] === "number";
  if (field.type === FieldType.time && firstValueTypeIsNumber) {
    return field;
  }
  if (firstValueTypeIsNumber) {
    return __spreadProps(__spreadValues({}, field), {
      type: FieldType.time
      //assumes it should be time
    });
  }
  return fieldToTimeField(field, dateFormat);
}
function fieldToEnumField(field, config) {
  const enumConfig = __spreadValues({}, config);
  const enumValues = field.values.slice();
  const lookup = /* @__PURE__ */ new Map();
  if (enumConfig.text && enumConfig.text.length > 0) {
    for (let i = 0; i < enumConfig.text.length; i++) {
      lookup.set(enumConfig.text[i], i);
    }
  } else {
    return field;
  }
  for (let i = 0; i < enumValues.length; i++) {
    const value = enumValues[i];
    enumValues[i] = lookup.get(value);
  }
  return __spreadProps(__spreadValues({}, field), {
    config: __spreadProps(__spreadValues({}, field.config), {
      type: {
        enum: enumConfig
      }
    }),
    type: FieldType.enum,
    values: enumValues
  });
}

export { convertFieldType, convertFieldTypeTransformer, convertFieldTypes, ensureTimeField, fieldToStringField, fieldToTimeField };
//# sourceMappingURL=convertFieldType.js.map
