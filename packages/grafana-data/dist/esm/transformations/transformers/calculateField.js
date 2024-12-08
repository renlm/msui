import { defaults } from 'lodash';
import { map } from 'rxjs/operators';
import { getTimeField } from '../../dataframe/processDataFrame.js';
import '../../vector/FunctionalVector.js';
import { FieldMatcherID } from '../matchers/ids.js';
import { DataTransformerID } from './ids.js';
import { getFieldMatcher } from '../matchers.js';
import './concat.js';
import './convertFieldType.js';
import { ensureColumnsTransformer } from './ensureColumns.js';
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
import { noopTransformer } from './noop.js';
import './order.js';
import './organize.js';
import './reduce.js';
import './rename.js';
import './renameByRegex.js';
import './seriesToRows.js';
import './sortBy.js';
import { ReducerID, fieldReducers, doStandardCalcs } from '../fieldReducer.js';
import 'rxjs';
import '../standardTransformersRegistry.js';
import '../matchers/nameMatcher.js';
import { FieldType } from '../../types/dataFrame.js';
import { NullValueMode } from '../../types/data.js';
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
import { BinaryOperationID, binaryOperators } from '../../utils/binaryOperators.js';
import { UnaryOperationID, unaryOperators } from '../../utils/unaryOperators.js';
import 'marked';
import 'marked-mangle';
import '../../text/sanitize.js';

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
const defaultReduceOptions = {
  reducer: ReducerID.sum
};
const defaultWindowOptions = {
  reducer: ReducerID.mean,
  windowAlignment: "trailing" /* Trailing */,
  windowSizeMode: "percentage" /* Percentage */,
  windowSize: 0.1
};
const defaultBinaryOptions = {
  left: "",
  operator: BinaryOperationID.Add,
  right: ""
};
const defaultUnaryOptions = {
  operator: UnaryOperationID.Abs,
  fieldName: ""
};
const calculateFieldTransformer = {
  id: DataTransformerID.calculateField,
  name: "Add field from calculation",
  description: "Use the row values to calculate a new field",
  defaultOptions: {
    mode: "reduceRow" /* ReduceRow */,
    reduce: {
      reducer: ReducerID.sum
    }
  },
  operator: (options, ctx) => (outerSource) => {
    const operator = options && options.timeSeries !== false ? ensureColumnsTransformer.operator(null, ctx) : noopTransformer.operator({}, ctx);
    if (options.alias != null) {
      options.alias = ctx.interpolate(options.alias);
    }
    return outerSource.pipe(
      operator,
      map((data) => {
        var _a, _b, _c;
        const mode = (_a = options.mode) != null ? _a : "reduceRow" /* ReduceRow */;
        let creator = void 0;
        switch (mode) {
          case "reduceRow" /* ReduceRow */:
            creator = getReduceRowCreator(defaults(options.reduce, defaultReduceOptions), data);
            break;
          case "cumulativeFunctions" /* CumulativeFunctions */:
            creator = getCumulativeCreator(defaults(options.cumulative, defaultReduceOptions), data);
            break;
          case "windowFunctions" /* WindowFunctions */:
            creator = getWindowCreator(defaults(options.window, defaultWindowOptions), data);
            break;
          case "unary" /* UnaryOperation */:
            creator = getUnaryCreator(defaults(options.unary, defaultUnaryOptions), data);
            break;
          case "binary" /* BinaryOperation */:
            const binaryOptions = __spreadProps(__spreadValues({}, options.binary), {
              left: ctx.interpolate((_b = options.binary) == null ? void 0 : _b.left),
              right: ctx.interpolate((_c = options.binary) == null ? void 0 : _c.right)
            });
            creator = getBinaryCreator(defaults(binaryOptions, defaultBinaryOptions), data);
            break;
          case "index" /* Index */:
            return data.map((frame) => {
              var _a2, _b2, _c2;
              const indexArr = [...Array(frame.length).keys()];
              if ((_a2 = options.index) == null ? void 0 : _a2.asPercentile) {
                for (let i = 0; i < indexArr.length; i++) {
                  indexArr[i] = indexArr[i] / indexArr.length;
                }
              }
              const f = {
                name: (_b2 = options.alias) != null ? _b2 : "Row",
                type: FieldType.number,
                values: indexArr,
                config: ((_c2 = options.index) == null ? void 0 : _c2.asPercentile) ? { unit: "percentunit" } : {}
              };
              return __spreadProps(__spreadValues({}, frame), {
                fields: options.replaceFields ? [f] : [...frame.fields, f]
              });
            });
        }
        if (!creator) {
          return data;
        }
        return data.map((frame) => {
          const values = creator(frame);
          if (!values) {
            return frame;
          }
          const field = {
            name: getNameFromOptions(options),
            type: FieldType.number,
            config: {},
            values
          };
          let fields = [];
          if (options.replaceFields) {
            const { timeField } = getTimeField(frame);
            if (timeField && options.timeSeries !== false) {
              fields = [timeField, field];
            } else {
              fields = [field];
            }
          } else {
            fields = [...frame.fields, field];
          }
          return __spreadProps(__spreadValues({}, frame), {
            fields
          });
        });
      })
    );
  }
};
function getWindowCreator(options, allFrames) {
  if (options.windowSize <= 0) {
    throw new Error("Add field from calculation transformation - Window size must be larger than 0");
  }
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.field) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: [options.field]
      }
    });
  }
  return (frame) => {
    const window = Math.ceil(
      options.windowSize * (options.windowSizeMode === "percentage" /* Percentage */ ? frame.length : 1)
    );
    let selectedField = null;
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        selectedField = field;
        break;
      }
    }
    if (!selectedField) {
      return;
    }
    if (![ReducerID.mean, ReducerID.stdDev, ReducerID.variance].includes(options.reducer)) {
      throw new Error(`Add field from calculation transformation - Unsupported reducer: ${options.reducer}`);
    }
    if (options.windowAlignment === "centered" /* Centered */) {
      return getCenteredWindowValues(frame, options.reducer, selectedField, window);
    } else {
      return getTrailingWindowValues(frame, options.reducer, selectedField, window);
    }
  };
}
function getTrailingWindowValues(frame, reducer, selectedField, window) {
  const vals = [];
  let sum = 0;
  let count = 0;
  for (let i = 0; i < frame.length; i++) {
    if (reducer === ReducerID.mean) {
      const currentValue = selectedField.values[i];
      if (currentValue !== null && currentValue !== void 0) {
        count++;
        sum += currentValue;
        if (i > window - 1) {
          sum -= selectedField.values[i - window];
          count--;
        }
      }
      vals.push(count === 0 ? 0 : sum / count);
    } else if (reducer === ReducerID.variance) {
      const start = Math.max(0, i - window + 1);
      const end = i + 1;
      vals.push(calculateVariance(selectedField.values.slice(start, end)));
    } else if (reducer === ReducerID.stdDev) {
      const start = Math.max(0, i - window + 1);
      const end = i + 1;
      vals.push(calculateStdDev(selectedField.values.slice(start, end)));
    }
  }
  return vals;
}
function getCenteredWindowValues(frame, reducer, selectedField, window) {
  const vals = [];
  let sum = 0;
  let count = 0;
  const leadingPartOfWindow = Math.ceil(window / 2) - 1;
  const trailingPartOfWindow = Math.floor(window / 2);
  for (let i = 0; i < frame.length; i++) {
    const first = i - trailingPartOfWindow;
    const last = i + leadingPartOfWindow;
    if (reducer === ReducerID.mean) {
      if (i === 0) {
        for (let x = 0; x < leadingPartOfWindow + 1 && x < selectedField.values.length; x++) {
          if (selectedField.values[x] != null) {
            sum += selectedField.values[x];
            count++;
          }
        }
      } else {
        if (last < selectedField.values.length) {
          if (selectedField.values[last] != null) {
            sum += selectedField.values[last];
            count++;
          }
        }
        if (first > 0) {
          if (selectedField.values[first - 1] != null) {
            sum -= selectedField.values[first - 1];
            count--;
          }
        }
      }
      vals.push(count === 0 ? 0 : sum / count);
    } else if (reducer === ReducerID.variance) {
      const windowVals = selectedField.values.slice(
        Math.max(0, first),
        Math.min(last + 1, selectedField.values.length)
      );
      vals.push(calculateVariance(windowVals));
    } else if (reducer === ReducerID.stdDev) {
      const windowVals = selectedField.values.slice(
        Math.max(0, first),
        Math.min(last + 1, selectedField.values.length)
      );
      vals.push(calculateStdDev(windowVals));
    }
  }
  return vals;
}
function calculateVariance(vals) {
  if (vals.length < 1) {
    return 0;
  }
  let squareSum = 0;
  let runningMean = 0;
  let nonNullCount = 0;
  for (let i = 0; i < vals.length; i++) {
    const currentValue = vals[i];
    if (currentValue != null) {
      nonNullCount++;
      let _oldMean = runningMean;
      runningMean += (currentValue - _oldMean) / nonNullCount;
      squareSum += (currentValue - _oldMean) * (currentValue - runningMean);
    }
  }
  if (nonNullCount === 0) {
    return 0;
  }
  const variance = squareSum / nonNullCount;
  return variance;
}
function calculateStdDev(vals) {
  return Math.sqrt(calculateVariance(vals));
}
function getCumulativeCreator(options, allFrames) {
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.field) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: [options.field]
      }
    });
  }
  if (![ReducerID.mean, ReducerID.sum].includes(options.reducer)) {
    throw new Error(`Add field from calculation transformation - Unsupported reducer: ${options.reducer}`);
  }
  return (frame) => {
    var _a;
    let selectedField = null;
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        selectedField = field;
        break;
      }
    }
    if (!selectedField) {
      return;
    }
    const vals = [];
    let total = 0;
    for (let i = 0; i < frame.length; i++) {
      total += (_a = selectedField.values[i]) != null ? _a : 0;
      if (options.reducer === ReducerID.sum) {
        vals.push(total);
      } else if (options.reducer === ReducerID.mean) {
        vals.push(total / (i + 1));
      }
    }
    return vals;
  };
}
function getReduceRowCreator(options, allFrames) {
  var _a;
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.include && options.include.length) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: options.include
      }
    });
  }
  const info = fieldReducers.get(options.reducer);
  if (!info) {
    throw new Error(`Unknown reducer: ${options.reducer}`);
  }
  const reducer = (_a = info.reduce) != null ? _a : doStandardCalcs;
  const ignoreNulls = options.nullValueMode === NullValueMode.Ignore;
  const nullAsZero = options.nullValueMode === NullValueMode.AsZero;
  return (frame) => {
    const columns = [];
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        columns.push(field.values);
      }
    }
    const size = columns.length;
    const row = {
      name: "temp",
      values: new Array(size),
      type: FieldType.number,
      config: {}
    };
    const vals = [];
    for (let i = 0; i < frame.length; i++) {
      for (let j = 0; j < size; j++) {
        row.values[j] = columns[j][i];
      }
      vals.push(reducer(row, ignoreNulls, nullAsZero)[options.reducer]);
    }
    return vals;
  };
}
function findFieldValuesWithNameOrConstant(frame, name, allFrames) {
  if (!name) {
    return void 0;
  }
  for (const f of frame.fields) {
    if (name === getFieldDisplayName(f, frame, allFrames)) {
      if (f.type === FieldType.boolean) {
        return f.values.map((v2) => v2 ? 1 : 0);
      }
      return f.values;
    }
  }
  const v = parseFloat(name);
  if (!isNaN(v)) {
    return new Array(frame.length).fill(v);
  }
  return void 0;
}
function getBinaryCreator(options, allFrames) {
  const operator = binaryOperators.getIfExists(options.operator);
  return (frame) => {
    const left = findFieldValuesWithNameOrConstant(frame, options.left, allFrames);
    const right = findFieldValuesWithNameOrConstant(frame, options.right, allFrames);
    if (!left || !right || !operator) {
      return void 0;
    }
    const arr = new Array(left.length);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = operator.operation(left[i], right[i]);
    }
    return arr;
  };
}
function getUnaryCreator(options, allFrames) {
  const operator = unaryOperators.getIfExists(options.operator);
  return (frame) => {
    let value = [];
    for (const f of frame.fields) {
      if (options.fieldName === getFieldDisplayName(f, frame, allFrames) && f.type === FieldType.number) {
        value = f.values;
      }
    }
    if (!value.length || !operator) {
      return void 0;
    }
    const arr = new Array(value.length);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = operator.operation(value[i]);
    }
    return arr;
  };
}
function getNameFromOptions(options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if ((_a = options.alias) == null ? void 0 : _a.length) {
    return options.alias;
  }
  switch (options.mode) {
    case "cumulativeFunctions" /* CumulativeFunctions */: {
      const { cumulative } = options;
      return `cumulative ${(_b = cumulative == null ? void 0 : cumulative.reducer) != null ? _b : ""}${(cumulative == null ? void 0 : cumulative.field) ? `(${cumulative.field})` : ""}`;
    }
    case "windowFunctions" /* WindowFunctions */: {
      const { window } = options;
      return `${(_c = window == null ? void 0 : window.windowAlignment) != null ? _c : ""} moving ${(_d = window == null ? void 0 : window.reducer) != null ? _d : ""}${(window == null ? void 0 : window.field) ? `(${window.field})` : ""}`;
    }
    case "unary" /* UnaryOperation */: {
      const { unary } = options;
      return `${(_e = unary == null ? void 0 : unary.operator) != null ? _e : ""}${(unary == null ? void 0 : unary.fieldName) ? `(${unary.fieldName})` : ""}`;
    }
    case "binary" /* BinaryOperation */: {
      const { binary } = options;
      const alias = `${(_f = binary == null ? void 0 : binary.left) != null ? _f : ""} ${(_g = binary == null ? void 0 : binary.operator) != null ? _g : ""} ${(_h = binary == null ? void 0 : binary.right) != null ? _h : ""}`;
      return alias.replace(/\$/g, "");
    }
    case "reduceRow" /* ReduceRow */:
      {
        const r = fieldReducers.getIfExists((_i = options.reduce) == null ? void 0 : _i.reducer);
        if (r) {
          return r.name;
        }
      }
      break;
    case "index" /* Index */:
      return "Row";
  }
  return "math";
}

export { calculateFieldTransformer, defaultWindowOptions, getNameFromOptions };
//# sourceMappingURL=calculateField.js.map
