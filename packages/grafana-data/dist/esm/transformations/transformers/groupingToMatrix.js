import { map } from 'rxjs/operators';
import { getFieldDisplayName } from '../../field/fieldState.js';
import { FieldType } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import { SpecialValue, TransformationApplicabilityLevels } from '../../types/transformations.js';
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
var _a, _b, _c;
const DEFAULT_COLUMN_FIELD = "Time";
const DEFAULT_ROW_FIELD = "Time";
const DEFAULT_VALUE_FIELD = "Value";
const DEFAULT_EMPTY_VALUE = SpecialValue.Empty;
const supportDataplaneFallback = (_c = (_b = (_a = window == null ? void 0 : window.grafanaBootData) == null ? void 0 : _a.settings) == null ? void 0 : _b.featureToggles) == null ? void 0 : _c.dataplaneFrontendFallback;
const groupingToMatrixTransformer = {
  id: DataTransformerID.groupingToMatrix,
  name: "Grouping to Matrix",
  description: "Groups series by field and return a matrix visualisation",
  defaultOptions: {
    columnField: DEFAULT_COLUMN_FIELD,
    rowField: DEFAULT_ROW_FIELD,
    valueField: DEFAULT_VALUE_FIELD
  },
  /**
   * Grouping to matrix requires at least 3 fields to work.
   */
  isApplicable: (data) => {
    let numFields = 0;
    for (const frame of data) {
      numFields += frame.fields.length;
    }
    return numFields >= 3 ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    let numFields = 0;
    for (const frame of data) {
      numFields += frame.fields.length;
    }
    return `Grouping to matrix requiers at least 3 fields to work. Currently there are ${numFields} fields.`;
  },
  operator: (options) => (source) => source.pipe(
    map((data) => {
      var _a2;
      const columnFieldMatch = options.columnField || DEFAULT_COLUMN_FIELD;
      const rowFieldMatch = options.rowField || DEFAULT_ROW_FIELD;
      const valueFieldMatch = options.valueField || DEFAULT_VALUE_FIELD;
      const emptyValue = options.emptyValue || DEFAULT_EMPTY_VALUE;
      if (data.length !== 1) {
        return data;
      }
      const frame = data[0];
      const keyColumnField = findKeyField(frame, columnFieldMatch);
      const keyRowField = findKeyField(frame, rowFieldMatch);
      const valueField = findKeyField(frame, valueFieldMatch);
      const rowColumnField = `${rowFieldMatch}\\${columnFieldMatch}`;
      if (!keyColumnField || !keyRowField || !valueField) {
        return data;
      }
      const columnValues = uniqueValues(keyColumnField.values);
      const rowValues = uniqueValues(keyRowField.values);
      const matrixValues = {};
      for (let index = 0; index < valueField.values.length; index++) {
        const columnName = keyColumnField.values[index];
        const rowName = keyRowField.values[index];
        const value = valueField.values[index];
        if (!matrixValues[columnName]) {
          matrixValues[columnName] = {};
        }
        matrixValues[columnName][rowName] = value;
      }
      const fields = [
        {
          name: rowColumnField,
          values: rowValues,
          type: FieldType.string,
          config: {}
        }
      ];
      for (const columnName of columnValues) {
        let values = [];
        for (const rowName of rowValues) {
          const value = (_a2 = matrixValues[columnName][rowName]) != null ? _a2 : getSpecialValue(emptyValue);
          values.push(value);
        }
        if (supportDataplaneFallback && typeof columnName === "number") {
          valueField.config = __spreadProps(__spreadValues({}, valueField.config), { displayNameFromDS: void 0 });
        }
        fields.push({
          name: columnName.toString(),
          values,
          config: valueField.config,
          type: valueField.type
        });
      }
      return [
        {
          fields,
          length: rowValues.length
        }
      ];
    })
  )
};
function uniqueValues(values) {
  const unique = /* @__PURE__ */ new Set();
  for (let index = 0; index < values.length; index++) {
    unique.add(values[index]);
  }
  return Array.from(unique);
}
function findKeyField(frame, matchTitle) {
  for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
    const field = frame.fields[fieldIndex];
    let matches;
    if (supportDataplaneFallback) {
      const matcher = fieldMatchers.get(FieldMatcherID.byName).get(matchTitle);
      matches = matcher(field, frame, [frame]);
    } else {
      matches = matchTitle === getFieldDisplayName(field);
    }
    if (matches) {
      return field;
    }
  }
  return null;
}
function getSpecialValue(specialValue) {
  switch (specialValue) {
    case SpecialValue.False:
      return false;
    case SpecialValue.True:
      return true;
    case SpecialValue.Null:
      return null;
    case SpecialValue.Empty:
    default:
      return "";
  }
}

export { groupingToMatrixTransformer };
//# sourceMappingURL=groupingToMatrix.js.map
