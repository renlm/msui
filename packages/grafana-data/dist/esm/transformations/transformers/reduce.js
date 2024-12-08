import { map } from 'rxjs/operators';
import { guessFieldTypeForField } from '../../dataframe/processDataFrame.js';
import 'lodash';
import '../../vector/FunctionalVector.js';
import { DataTransformerID } from './ids.js';
import { getFieldMatcher } from '../matchers.js';
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
import './merge.js';
import './noop.js';
import './order.js';
import './organize.js';
import './rename.js';
import './renameByRegex.js';
import './seriesToRows.js';
import './sortBy.js';
import { ReducerID, fieldReducers, reduceField } from '../fieldReducer.js';
import 'rxjs';
import '../standardTransformersRegistry.js';
import '../matchers/nameMatcher.js';
import { FieldType } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import '../../dataframe/StreamingDataFrame.js';
import '../../datetime/rangeutil.js';
import '../../datetime/timezones.js';
import '../../datetime/formats.js';
import 'moment-timezone';
import 'date-fns';
import '../../field/fieldColor.js';
import { getFieldDisplayName } from '../../field/fieldState.js';
import '../../field/standardFieldConfigEditorRegistry.js';
import 'react';
import 'react-use/lib/usePrevious';
import 'tinycolor2';
import 'papaparse';
import '../../utils/binaryOperators.js';
import '../../utils/unaryOperators.js';
import 'marked';
import 'marked-mangle';
import '../../text/sanitize.js';
import { alwaysFieldMatcher, notTimeFieldMatcher } from '../matchers/predicates.js';

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
const reduceTransformer = {
  id: DataTransformerID.reduce,
  name: "Reduce",
  description: "Reduce all rows or data points to a single value using a function like max, min, mean or last.",
  defaultOptions: {
    reducers: [ReducerID.max]
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    map((data) => {
      var _a;
      if (!((_a = options == null ? void 0 : options.reducers) == null ? void 0 : _a.length)) {
        return data;
      }
      const matcher = options.fields ? getFieldMatcher(options.fields) : options.includeTimeField && options.mode === "reduceFields" /* ReduceFields */ ? alwaysFieldMatcher : notTimeFieldMatcher;
      if (options.mode === "reduceFields" /* ReduceFields */) {
        return reduceFields(data, matcher, options.reducers);
      }
      const res = reduceSeriesToRows(data, matcher, options.reducers, options.labelsToFields);
      return res ? [res] : [];
    })
  )
};
function reduceSeriesToRows(data, matcher, reducerId, labelsToFields) {
  const calculators = fieldReducers.list(reducerId);
  const reducers = calculators.map((c) => c.id);
  const processed = [];
  const distinctLabels = labelsToFields ? getDistinctLabelKeys(data) : [];
  for (const series of data) {
    const source = series.fields.filter((f) => matcher(f, series, data));
    const size = source.length;
    const fields = [];
    const names = new Array(size);
    fields.push({
      name: "Field",
      type: FieldType.string,
      values: names,
      config: {}
    });
    const labels = {};
    if (labelsToFields) {
      for (const key of distinctLabels) {
        labels[key] = new Array(size);
        fields.push({
          name: key,
          type: FieldType.string,
          values: labels[key],
          config: {}
        });
      }
    }
    const calcs = {};
    for (const info of calculators) {
      calcs[info.id] = new Array(size);
      fields.push({
        name: info.name,
        type: FieldType.other,
        // UNKNOWN until after we call the functions
        values: calcs[info.id],
        config: {}
      });
    }
    for (let i = 0; i < source.length; i++) {
      const field = source[i];
      const results = reduceField({
        field,
        reducers
      });
      if (labelsToFields) {
        names[i] = field.name;
        if (field.labels) {
          for (const key in field.labels) {
            labels[key][i] = field.labels[key];
          }
        }
      } else {
        names[i] = getFieldDisplayName(field, series, data);
      }
      for (const info of calculators) {
        const v = results[info.id];
        calcs[info.id][i] = v;
      }
    }
    for (const f of fields) {
      if (f.type === FieldType.other) {
        const t = guessFieldTypeForField(f);
        if (t) {
          f.type = t;
        }
      }
    }
    processed.push(__spreadProps(__spreadValues({}, series), {
      // Same properties, different fields
      fields,
      length: size
    }));
  }
  return mergeResults(processed);
}
function getDistinctLabelKeys(frames) {
  const keys = /* @__PURE__ */ new Set();
  for (const frame of frames) {
    for (const field of frame.fields) {
      if (field.labels) {
        for (const k of Object.keys(field.labels)) {
          keys.add(k);
        }
      }
    }
  }
  return [...keys];
}
function mergeResults(data) {
  if (!(data == null ? void 0 : data.length)) {
    return void 0;
  }
  const baseFrame = data[0];
  for (let seriesIndex = 1; seriesIndex < data.length; seriesIndex++) {
    const series = data[seriesIndex];
    for (let baseIndex = 0; baseIndex < baseFrame.fields.length; baseIndex++) {
      const baseField = baseFrame.fields[baseIndex];
      for (let fieldIndex = 0; fieldIndex < series.fields.length; fieldIndex++) {
        const field = series.fields[fieldIndex];
        const isFirstField = baseIndex === 0 && fieldIndex === 0;
        const isSameField = baseField.type === field.type && baseField.name === field.name;
        if (isFirstField || isSameField) {
          const baseValues = baseField.values;
          const values = field.values;
          baseField.values = baseValues.concat(values);
        }
      }
    }
  }
  baseFrame.name = void 0;
  baseFrame.length = baseFrame.fields[0].values.length;
  return baseFrame;
}
function reduceFields(data, matcher, reducerId) {
  const calculators = fieldReducers.list(reducerId);
  const reducers = calculators.map((c) => c.id);
  const processed = [];
  for (const series of data) {
    const fields = [];
    for (const field of series.fields) {
      if (matcher(field, series, data)) {
        const results = reduceField({
          field,
          reducers
        });
        for (const reducer of reducers) {
          const value = results[reducer];
          const copy = __spreadProps(__spreadValues({}, field), {
            type: getFieldType(reducer, field),
            values: [value]
          });
          copy.state = void 0;
          if (reducers.length > 1) {
            if (!copy.labels) {
              copy.labels = {};
            }
            copy.labels["reducer"] = fieldReducers.get(reducer).name;
          }
          fields.push(copy);
        }
      }
    }
    if (fields.length) {
      processed.push(__spreadProps(__spreadValues({}, series), {
        fields,
        length: 1
        // always one row
      }));
    }
  }
  return processed;
}
function getFieldType(reducer, field) {
  switch (reducer) {
    case ReducerID.allValues:
    case ReducerID.uniqueValues:
      return FieldType.other;
    case ReducerID.first:
    case ReducerID.firstNotNull:
    case ReducerID.last:
    case ReducerID.lastNotNull:
      return field.type;
    default:
      return FieldType.number;
  }
}

export { reduceFields, reduceTransformer };
//# sourceMappingURL=reduce.js.map
