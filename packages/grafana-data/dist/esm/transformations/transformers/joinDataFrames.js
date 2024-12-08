import '../../vector/FunctionalVector.js';
import 'lodash';
import { TIME_SERIES_VALUE_FIELD_NAME, FieldType } from '../../types/dataFrame.js';
import { sortDataFrame, getTimeField } from '../../dataframe/processDataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import '../../dataframe/StreamingDataFrame.js';
import { fieldMatchers } from '../matchers.js';
import { FieldMatcherID } from '../matchers/ids.js';
import { JoinMode } from './joinByField.js';

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
function pickBestJoinField(data) {
  const { timeField } = getTimeField(data[0]);
  if (timeField) {
    return fieldMatchers.get(FieldMatcherID.firstTimeField).get({});
  }
  let common = [];
  for (const f of data[0].fields) {
    if (f.type === FieldType.number) {
      common.push(f.name);
    }
  }
  for (let i = 1; i < data.length; i++) {
    const names = [];
    for (const f of data[0].fields) {
      if (f.type === FieldType.number) {
        names.push(f.name);
      }
    }
    common = common.filter((v) => !names.includes(v));
  }
  return fieldMatchers.get(FieldMatcherID.byName).get(common[0]);
}
function getJoinMatcher(options) {
  var _a;
  return (_a = options.joinBy) != null ? _a : pickBestJoinField(options.frames);
}
function maybeSortFrame(frame, fieldIdx) {
  if (fieldIdx >= 0) {
    let sortByField = frame.fields[fieldIdx];
    if (sortByField.type !== FieldType.string && !isLikelyAscendingVector(sortByField.values)) {
      frame = sortDataFrame(frame, fieldIdx);
    }
  }
  return frame;
}
function joinDataFrames(options) {
  var _a, _b, _c, _d, _e;
  if (!((_a = options.frames) == null ? void 0 : _a.length)) {
    return;
  }
  const nullMode = (_b = options.nullMode) != null ? _b : (field) => {
    var _a2;
    let spanNulls = (_a2 = field.config.custom) == null ? void 0 : _a2.spanNulls;
    return spanNulls === true ? NULL_REMOVE : spanNulls === -1 ? NULL_RETAIN : NULL_EXPAND;
  };
  if (options.frames.length === 1) {
    let frame = options.frames[0];
    let frameCopy = frame;
    const joinFieldMatcher2 = getJoinMatcher(options);
    let joinIndex = frameCopy.fields.findIndex((f) => joinFieldMatcher2(f, frameCopy, options.frames));
    if (options.keepOriginIndices) {
      frameCopy = __spreadProps(__spreadValues({}, frame), {
        fields: frame.fields.map((f, fieldIndex) => {
          const copy = __spreadValues({}, f);
          const origin = {
            frameIndex: 0,
            fieldIndex
          };
          if (copy.state) {
            copy.state.origin = origin;
          } else {
            copy.state = { origin };
          }
          return copy;
        })
      });
      if (joinIndex > 0) {
        const joinField = frameCopy.fields[joinIndex];
        const fields = frameCopy.fields.filter((f, idx) => idx !== joinIndex);
        fields.unshift(joinField);
        frameCopy.fields = fields;
        joinIndex = 0;
      }
    }
    if (joinIndex >= 0) {
      frameCopy = maybeSortFrame(frameCopy, joinIndex);
    }
    if (options.keep) {
      let fields = frameCopy.fields.filter(
        (f, fieldIdx) => fieldIdx === joinIndex || options.keep(f, frameCopy, options.frames)
      );
      if (frame !== frameCopy) {
        frameCopy.fields = fields;
      } else {
        frameCopy = __spreadProps(__spreadValues({}, frame), {
          fields
        });
      }
    }
    return frameCopy;
  }
  const nullModes = [];
  const allData = [];
  const originalFields = [];
  const originalFieldsOrderByFrame = [];
  let fieldsOrder = 1;
  const joinFieldMatcher = getJoinMatcher(options);
  for (let frameIndex = 0; frameIndex < options.frames.length; frameIndex++) {
    const frame = options.frames[frameIndex];
    if (!frame || !((_c = frame.fields) == null ? void 0 : _c.length)) {
      continue;
    }
    const nullModesFrame = [NULL_REMOVE];
    let join2 = void 0;
    let fields = [];
    let frameFieldsOrder = [];
    for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
      const field = frame.fields[fieldIndex];
      field.state = field.state || {};
      if (!join2 && joinFieldMatcher(field, frame, options.frames)) {
        join2 = field;
      } else {
        if (options.keep && !options.keep(field, frame, options.frames)) {
          continue;
        }
        nullModesFrame.push(nullMode(field));
        let labels = (_d = field.labels) != null ? _d : {};
        let name = field.name;
        if (frame.name) {
          if (field.name === TIME_SERIES_VALUE_FIELD_NAME) {
            name = frame.name;
          } else if (labels.name == null) {
            labels = __spreadProps(__spreadValues({}, labels), { name: frame.name });
          }
        }
        fields.push(__spreadProps(__spreadValues({}, field), {
          name,
          labels
        }));
      }
      if (options.keepOriginIndices) {
        field.state.origin = {
          frameIndex,
          fieldIndex
        };
      }
    }
    if (!join2) {
      continue;
    }
    if (originalFields.length === 0) {
      originalFields.push(join2);
    }
    nullModes.push(nullModesFrame);
    const a = [join2.values];
    for (const field of fields) {
      a.push(field.values);
      originalFields.push(field);
      if (!options.keepDisplayNames) {
        (_e = field.state) == null ? true : delete _e.displayName;
      }
      frameFieldsOrder.push(fieldsOrder);
      fieldsOrder++;
    }
    originalFieldsOrderByFrame.push(frameFieldsOrder);
    allData.push(a);
  }
  let joined = [];
  if (options.mode === JoinMode.outerTabular) {
    joined = joinOuterTabular(allData, originalFieldsOrderByFrame, originalFields.length);
  } else if (options.mode === JoinMode.inner) {
    joined = joinInner(allData);
  } else {
    joined = join(allData, nullModes, options.mode);
  }
  return {
    // ...options.data[0], // keep name, meta?
    length: joined[0] ? joined[0].length : 0,
    fields: originalFields.map((f, index) => __spreadProps(__spreadValues({}, f), {
      values: joined[index]
    }))
  };
}
function joinOuterTabular(tables, originalFieldsOrderByFrame, numberOfFields, nullModes) {
  let duplicateHash = {};
  for (let tableIdx = 0; tableIdx < tables.length; tableIdx++) {
    let table = tables[tableIdx];
    let joinOnTableField = table[0];
    for (let otherTablesIdx = 0; otherTablesIdx < tables.length; otherTablesIdx++) {
      if (otherTablesIdx === tableIdx) {
        continue;
      }
      let otherTable = tables[otherTablesIdx];
      let otherTableJoinOnField = otherTable[0];
      for (let joinTableFieldValuesIdx = 0; joinTableFieldValuesIdx < joinOnTableField.length; joinTableFieldValuesIdx++) {
        const tableJoinOnValue = joinOnTableField[joinTableFieldValuesIdx];
        const allOtherFields = numberOfFields - 1;
        let joinedRow = [tableJoinOnValue].concat(new Array(allOtherFields));
        let tableFieldValIdx = 0;
        for (let fieldsIdx = 1; fieldsIdx < table.length; fieldsIdx++) {
          const joinRowIdx = originalFieldsOrderByFrame[tableIdx][tableFieldValIdx];
          joinedRow[joinRowIdx] = table[fieldsIdx][joinTableFieldValuesIdx];
          tableFieldValIdx++;
        }
        for (let otherTableValuesIdx = 0; otherTableValuesIdx < otherTableJoinOnField.length; otherTableValuesIdx++) {
          if (joinOnTableField[joinTableFieldValuesIdx] === otherTableJoinOnField[otherTableValuesIdx]) {
            let tableFieldValIdx2 = 0;
            for (let fieldsIdx = 1; fieldsIdx < otherTable.length; fieldsIdx++) {
              const joinRowIdx = originalFieldsOrderByFrame[otherTablesIdx][tableFieldValIdx2];
              joinedRow[joinRowIdx] = otherTable[fieldsIdx][otherTableValuesIdx];
              tableFieldValIdx2++;
            }
            break;
          }
        }
        duplicateHash[JSON.stringify(joinedRow)] = joinedRow;
      }
    }
  }
  let data = [];
  for (let field = 0; field < numberOfFields; field++) {
    data.push(new Array(0));
  }
  for (let key in duplicateHash) {
    const row = duplicateHash[key];
    for (let valIdx = 0; valIdx < row.length; valIdx++) {
      data[valIdx].push(row[valIdx]);
    }
  }
  return data;
}
function joinInner(tables) {
  const joinedTables = [];
  const joinTables = (currentTables, currentIndex, currentRow) => {
    if (currentIndex === currentTables.length) {
      joinedTables.push(currentRow);
      return;
    }
    const currentTable = currentTables[currentIndex];
    const [xValues, ...yValues] = currentTable;
    for (let i = 0; i < xValues.length; i++) {
      const value = xValues[i];
      if (currentIndex === 0 || currentRow.includes(value)) {
        const newRow = [...currentRow];
        if (currentIndex === 0) {
          newRow.push(value);
        }
        for (let j = 0; j < yValues.length; j++) {
          newRow.push(yValues[j][i]);
        }
        joinTables(currentTables, currentIndex + 1, newRow);
      }
    }
  };
  joinTables(tables, 0, []);
  if (joinedTables.length === 0) {
    return [];
  }
  return joinedTables[0].map((_, colIndex) => joinedTables.map((row) => row[colIndex]));
}
const NULL_REMOVE = 0;
const NULL_RETAIN = 1;
const NULL_EXPAND = 2;
function nullExpand(yVals, nullIdxs, alignedLen) {
  for (let i = 0, xi, lastNullIdx = -1; i < nullIdxs.length; i++) {
    let nullIdx = nullIdxs[i];
    if (nullIdx > lastNullIdx) {
      xi = nullIdx - 1;
      while (xi >= 0 && yVals[xi] == null) {
        yVals[xi--] = null;
      }
      xi = nullIdx + 1;
      while (xi < alignedLen && yVals[xi] == null) {
        yVals[lastNullIdx = xi++] = null;
      }
    }
  }
}
function join(tables, nullModes, mode = JoinMode.outer) {
  let xVals = /* @__PURE__ */ new Set();
  for (let ti = 0; ti < tables.length; ti++) {
    let t = tables[ti];
    let xs = t[0];
    let len = xs.length;
    for (let i = 0; i < len; i++) {
      xVals.add(xs[i]);
    }
  }
  let data = [Array.from(xVals).sort((a, b) => a - b)];
  let alignedLen = data[0].length;
  let xIdxs = /* @__PURE__ */ new Map();
  for (let i = 0; i < alignedLen; i++) {
    xIdxs.set(data[0][i], i);
  }
  for (let ti = 0; ti < tables.length; ti++) {
    let t = tables[ti];
    let xs = t[0];
    for (let si = 1; si < t.length; si++) {
      let ys = t[si];
      let yVals = Array(alignedLen).fill(void 0);
      let nullMode = nullModes ? nullModes[ti][si] : NULL_RETAIN;
      let nullIdxs = [];
      for (let i = 0; i < ys.length; i++) {
        let yVal = ys[i];
        let alignedIdx = xIdxs.get(xs[i]);
        if (yVal === null) {
          if (nullMode !== NULL_REMOVE) {
            yVals[alignedIdx] = yVal;
            if (nullMode === NULL_EXPAND) {
              nullIdxs.push(alignedIdx);
            }
          }
        } else {
          yVals[alignedIdx] = yVal;
        }
      }
      nullExpand(yVals, nullIdxs, alignedLen);
      data.push(yVals);
    }
  }
  return data;
}
function isLikelyAscendingVector(data, samples = 50) {
  const len = data.length;
  if (len <= 1) {
    return true;
  }
  let firstIdx = 0;
  let lastIdx = len - 1;
  while (firstIdx <= lastIdx && data[firstIdx] == null) {
    firstIdx++;
  }
  while (lastIdx >= firstIdx && data[lastIdx] == null) {
    lastIdx--;
  }
  if (lastIdx <= firstIdx) {
    return true;
  }
  const stride = Math.max(1, Math.floor((lastIdx - firstIdx + 1) / samples));
  for (let prevVal = data[firstIdx], i = firstIdx + stride; i <= lastIdx; i += stride) {
    const v = data[i];
    if (v != null) {
      if (v <= prevVal) {
        return false;
      }
      prevVal = v;
    }
  }
  return true;
}

export { NULL_EXPAND, NULL_REMOVE, NULL_RETAIN, isLikelyAscendingVector, join, joinDataFrames, maybeSortFrame, pickBestJoinField };
//# sourceMappingURL=joinDataFrames.js.map
