import { omit } from 'lodash';
import { map } from 'rxjs/operators';
import '../../vector/FunctionalVector.js';
import { MutableDataFrame } from '../../dataframe/MutableDataFrame.js';
import '../../datetime/moment_wrapper.js';
import '../../datetime/rangeutil.js';
import '../../datetime/timezones.js';
import '../../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';
import { DataTransformerID } from './ids.js';
import '../matchers.js';
import './calculateField.js';
import './concat.js';
import './convertFieldType.js';
import './ensureColumns.js';
import './filter.js';
import './filterByName.js';
import './filterByRefId.js';
import './filterByValue.js';
import './formatString.js';
import './formatTime.js';
import './groupBy.js';
import './groupToNestedTable.js';
import './groupingToMatrix.js';
import './histogram.js';
import './joinByField.js';
import './labelsToFields.js';
import './limit.js';
import './noop.js';
import './order.js';
import './organize.js';
import './reduce.js';
import './rename.js';
import './renameByRegex.js';
import './seriesToRows.js';
import './sortBy.js';
import '../fieldReducer.js';
import 'rxjs';
import '../standardTransformersRegistry.js';
import '../matchers/nameMatcher.js';
import { TransformationApplicabilityLevels } from '../../types/transformations.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import '../../dataframe/StreamingDataFrame.js';

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
const mergeTransformer = {
  id: DataTransformerID.merge,
  name: "Merge series/tables",
  description: "Merges multiple series/tables into a single serie/table",
  defaultOptions: {},
  isApplicable: (data) => {
    return data.length > 1 ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    return `The merge transformation requires at least 2 data series to work. There is currently ${data.length} data series.`;
  },
  operator: (options) => (source) => source.pipe(
    map((dataFrames) => {
      if (!Array.isArray(dataFrames) || dataFrames.length <= 1) {
        return dataFrames;
      }
      const data = dataFrames.filter((frame) => frame.fields.length > 0);
      if (data.length === 0) {
        return [dataFrames[0]];
      }
      const fieldNames = /* @__PURE__ */ new Set();
      const fieldIndexByName = {};
      const fieldNamesForKey = [];
      const dataFrame = new MutableDataFrame();
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
          const field = frame.fields[fieldIndex];
          if (!fieldNames.has(field.name)) {
            dataFrame.addField(copyFieldStructure(field));
            fieldNames.add(field.name);
          }
          fieldIndexByName[field.name] = fieldIndexByName[field.name] || {};
          fieldIndexByName[field.name][frameIndex] = fieldIndex;
          if (data.length - 1 !== frameIndex) {
            continue;
          }
          if (fieldExistsInAllFrames(fieldIndexByName, field, data)) {
            fieldNamesForKey.push(field.name);
          }
        }
      }
      if (fieldNamesForKey.length === 0) {
        return dataFrames;
      }
      const valuesByKey = {};
      const valuesInOrder = [];
      const keyFactory = createKeyFactory(data, fieldIndexByName, fieldNamesForKey);
      const valueMapper = createValueMapper(data, fieldNames, fieldIndexByName);
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let valueIndex = 0; valueIndex < frame.length; valueIndex++) {
          const key = keyFactory(frameIndex, valueIndex);
          const value = valueMapper(frameIndex, valueIndex);
          if (!Array.isArray(valuesByKey[key])) {
            valuesByKey[key] = [value];
            valuesInOrder.push(createPointer(key, valuesByKey));
            continue;
          }
          let valueWasMerged = false;
          valuesByKey[key] = valuesByKey[key].map((existing) => {
            if (!isMergable(existing, value)) {
              return existing;
            }
            valueWasMerged = true;
            return __spreadValues(__spreadValues({}, existing), value);
          });
          if (!valueWasMerged) {
            valuesByKey[key].push(value);
            valuesInOrder.push(createPointer(key, valuesByKey));
          }
        }
      }
      for (const pointer of valuesInOrder) {
        const value = valuesByKey[pointer.key][pointer.index];
        if (value) {
          dataFrame.add(value);
        }
      }
      return [dataFrame];
    })
  )
};
const copyFieldStructure = (field) => {
  return __spreadProps(__spreadValues({}, omit(field, ["values", "state", "labels", "config"])), {
    values: [],
    config: __spreadValues({}, omit(field.config, "displayName"))
  });
};
const createKeyFactory = (data, fieldPointerByName, keyFieldNames) => {
  const factoryIndex = keyFieldNames.reduce((index, fieldName) => {
    return Object.keys(fieldPointerByName[fieldName]).reduce((index2, frameIndex) => {
      index2[frameIndex] = index2[frameIndex] || [];
      index2[frameIndex].push(fieldPointerByName[fieldName][frameIndex]);
      return index2;
    }, index);
  }, {});
  return (frameIndex, valueIndex) => {
    return factoryIndex[frameIndex].reduce((key, fieldIndex) => {
      return key + data[frameIndex].fields[fieldIndex].values[valueIndex];
    }, "");
  };
};
const createValueMapper = (data, fieldByName, fieldIndexByName) => {
  return (frameIndex, valueIndex) => {
    const value = {};
    const fieldNames = Array.from(fieldByName);
    for (const fieldName of fieldNames) {
      const fieldIndexByFrameIndex = fieldIndexByName[fieldName];
      if (!fieldIndexByFrameIndex) {
        continue;
      }
      const fieldIndex = fieldIndexByFrameIndex[frameIndex];
      if (typeof fieldIndex !== "number") {
        continue;
      }
      const frame = data[frameIndex];
      if (!frame || !frame.fields) {
        continue;
      }
      const field = frame.fields[fieldIndex];
      if (!field || !field.values) {
        continue;
      }
      value[fieldName] = field.values[valueIndex];
    }
    return value;
  };
};
const isMergable = (existing, value) => {
  let mergable = true;
  for (const prop in value) {
    if (typeof existing[prop] === "undefined") {
      continue;
    }
    if (existing[prop] === null) {
      continue;
    }
    if (existing[prop] !== value[prop]) {
      mergable = false;
      break;
    }
  }
  return mergable;
};
const fieldExistsInAllFrames = (fieldIndexByName, field, data) => {
  return Object.keys(fieldIndexByName[field.name]).length === data.length;
};
const createPointer = (key, valuesByKey) => {
  return {
    key,
    index: valuesByKey[key].length - 1
  };
};

export { mergeTransformer };
//# sourceMappingURL=merge.js.map
