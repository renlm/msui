import { map } from 'rxjs/operators';
import { FieldType } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import { TransformationApplicabilityLevels } from '../../types/transformations.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import 'lodash';
import '../../types/legacyEvents.js';
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
const splitToCapitalWords = (input) => {
  const arr = input.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr;
};
const getFormatStringFunction = (options) => {
  return (field) => field.values.map((value) => {
    switch (options.outputFormat) {
      case "Upper Case" /* UpperCase */:
        return value.toUpperCase();
      case "Lower Case" /* LowerCase */:
        return value.toLowerCase();
      case "Sentence Case" /* SentenceCase */:
        return value.charAt(0).toUpperCase() + value.slice(1);
      case "Title Case" /* TitleCase */:
        return splitToCapitalWords(value).join(" ");
      case "Pascal Case" /* PascalCase */:
        return splitToCapitalWords(value).join("");
      case "Camel Case" /* CamelCase */:
        value = splitToCapitalWords(value).join("");
        return value.charAt(0).toLowerCase() + value.slice(1);
      case "Snake Case" /* SnakeCase */:
        return value.toLowerCase().split(" ").join("_");
      case "Kebab Case" /* KebabCase */:
        return value.toLowerCase().split(" ").join("-");
      case "Trim" /* Trim */:
        return value.trim();
      case "Substring" /* Substring */:
        return value.substring(options.substringStart, options.substringEnd);
    }
  });
};
const formatStringTransformer = {
  id: DataTransformerID.formatString,
  name: "Format string",
  description: "Manipulate string fields formatting",
  defaultOptions: { stringField: "", outputFormat: "Upper Case" /* UpperCase */ },
  isApplicable: (data) => {
    for (const frame of data) {
      for (const field of frame.fields) {
        if (field.type === "string") {
          return TransformationApplicabilityLevels.Applicable;
        }
      }
    }
    return TransformationApplicabilityLevels.NotApplicable;
  },
  operator: (options) => (source) => source.pipe(
    map((data) => {
      if (data.length === 0) {
        return data;
      }
      const fieldMatches = fieldMatchers.get(FieldMatcherID.byName).get(options.stringField);
      const formatStringFunction = getFormatStringFunction(options);
      const formatter = createStringFormatter(fieldMatches, formatStringFunction);
      return data.map((frame) => __spreadProps(__spreadValues({}, frame), {
        fields: formatter(frame, data)
      }));
    })
  )
};
const createStringFormatter = (fieldMatches, formatStringFunction) => (frame, allFrames) => {
  return frame.fields.map((field) => {
    if (fieldMatches(field, frame, allFrames)) {
      const newVals = formatStringFunction(field);
      return __spreadProps(__spreadValues({}, field), {
        type: FieldType.string,
        values: newVals
      });
    }
    return field;
  });
};

export { createStringFormatter, formatStringTransformer, getFormatStringFunction };
//# sourceMappingURL=formatString.js.map
