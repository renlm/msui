import { map } from 'rxjs/operators';
import { guessFieldTypeForField } from '../../dataframe/processDataFrame.js';
import { getFieldDisplayName } from '../../field/fieldState.js';
import { FieldType } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import { TransformationApplicabilityLevels } from '../../types/transformations.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import 'lodash';
import '../../types/legacyEvents.js';
import { reduceField, ReducerID } from '../fieldReducer.js';
import { DataTransformerID } from './ids.js';
import { findMaxFields } from './utils.js';

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
const MINIMUM_FIELDS_REQUIRED = 2;
const groupByTransformer = {
  id: DataTransformerID.groupBy,
  name: "Group by",
  description: "Group the data by a field values then process calculations for each group.",
  defaultOptions: {
    fields: {}
  },
  isApplicable: (data) => {
    const maxFields = findMaxFields(data);
    return maxFields >= MINIMUM_FIELDS_REQUIRED ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    const maxFields = findMaxFields(data);
    return `The Group by transformation requires a series with at least ${MINIMUM_FIELDS_REQUIRED} fields to work. The maximum number of fields found on a series is ${maxFields}`;
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    map((data) => {
      var _a;
      const hasValidConfig = Object.keys(options.fields).find(
        (name) => options.fields[name].operation === "groupby" /* groupBy */
      );
      if (!hasValidConfig) {
        return data;
      }
      const processed = [];
      for (const frame of data) {
        const groupByFields = frame.fields.filter((field) => shouldGroupOnField(field, options));
        if (groupByFields.length === 0) {
          continue;
        }
        const valuesByGroupKey = groupValuesByKey(frame, groupByFields);
        const fields = createGroupedFields(groupByFields, valuesByGroupKey);
        for (const field of frame.fields) {
          if (!shouldCalculateField(field, options)) {
            continue;
          }
          const fieldName = getFieldDisplayName(field);
          const aggregations = options.fields[fieldName].aggregations;
          const valuesByAggregation = {};
          valuesByGroupKey.forEach((value) => {
            const fieldWithValuesForGroup = value[fieldName];
            const results = reduceField({
              field: fieldWithValuesForGroup,
              reducers: aggregations
            });
            for (const aggregation of aggregations) {
              if (!Array.isArray(valuesByAggregation[aggregation])) {
                valuesByAggregation[aggregation] = [];
              }
              valuesByAggregation[aggregation].push(results[aggregation]);
            }
          });
          for (const aggregation of aggregations) {
            const aggregationField = {
              name: `${fieldName} (${aggregation})`,
              values: (_a = valuesByAggregation[aggregation]) != null ? _a : [],
              type: FieldType.other,
              config: {}
            };
            aggregationField.type = detectFieldType(aggregation, field, aggregationField);
            fields.push(aggregationField);
          }
        }
        processed.push({
          fields,
          length: valuesByGroupKey.size
        });
      }
      return processed;
    })
  )
};
const shouldGroupOnField = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "groupby" /* groupBy */;
};
const shouldCalculateField = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "aggregate" /* aggregate */ && Array.isArray(options == null ? void 0 : options.fields[fieldName].aggregations) && (options == null ? void 0 : options.fields[fieldName].aggregations.length) > 0;
};
function detectFieldType(aggregation, sourceField, targetField) {
  var _a;
  switch (aggregation) {
    case ReducerID.allIsNull:
      return FieldType.boolean;
    case ReducerID.last:
    case ReducerID.lastNotNull:
    case ReducerID.first:
    case ReducerID.firstNotNull:
      return sourceField.type;
    default:
      return (_a = guessFieldTypeForField(targetField)) != null ? _a : FieldType.string;
  }
}
function groupValuesByKey(frame, groupByFields) {
  var _a;
  const valuesByGroupKey = /* @__PURE__ */ new Map();
  for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {
    const groupKey = String(groupByFields.map((field) => field.values[rowIndex]));
    const valuesByField = (_a = valuesByGroupKey.get(groupKey)) != null ? _a : {};
    if (!valuesByGroupKey.has(groupKey)) {
      valuesByGroupKey.set(groupKey, valuesByField);
    }
    for (let field of frame.fields) {
      const fieldName = getFieldDisplayName(field);
      if (!valuesByField[fieldName]) {
        valuesByField[fieldName] = {
          name: fieldName,
          type: field.type,
          config: __spreadValues({}, field.config),
          values: []
        };
      }
      valuesByField[fieldName].values.push(field.values[rowIndex]);
    }
  }
  return valuesByGroupKey;
}
function createGroupedFields(groupByFields, valuesByGroupKey) {
  const fields = [];
  for (const field of groupByFields) {
    const values = [];
    const fieldName = getFieldDisplayName(field);
    valuesByGroupKey.forEach((value) => {
      values.push(value[fieldName].values[0]);
    });
    fields.push({
      name: field.name,
      type: field.type,
      config: __spreadValues({}, field.config),
      values
    });
  }
  return fields;
}

export { createGroupedFields, groupByTransformer, groupValuesByKey };
//# sourceMappingURL=groupBy.js.map
