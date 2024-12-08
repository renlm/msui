import { FieldType } from '../types/dataFrame.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import 'lodash';
import '../types/legacyEvents.js';
import { guessFieldTypeFromNameAndValue } from './processDataFrame.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const ENTITY_MAP = {
  Inf: Infinity,
  NegInf: -Infinity,
  Undef: void 0,
  NaN: NaN
};
function decodeFieldValueEntities(lookup, values) {
  let key;
  for (key in lookup) {
    const repl = ENTITY_MAP[key];
    for (const idx of lookup[key]) {
      if (idx < values.length) {
        values[idx] = repl;
      }
    }
  }
}
function decodeFieldValueEnums(lookup, values) {
  for (let i = 0; i < values.length; i++) {
    values[i] = lookup[Number(values[i])];
  }
}
function guessFieldType(name, values) {
  for (const v of values) {
    if (v != null) {
      return guessFieldTypeFromNameAndValue(name, v);
    }
  }
  return FieldType.other;
}
function dataFrameFromJSON(dto) {
  const { schema, data } = dto;
  if (!schema || !schema.fields) {
    throw new Error("JSON needs a fields definition");
  }
  const length = data ? data.values.reduce((max, vals) => Math.max(max, vals.length), 0) : 0;
  const fields = schema.fields.map((f, index) => {
    var _a, _b, _c, _d;
    let buffer = data ? data.values[index] : [];
    let origLen = buffer.length;
    let type = f.type;
    if (origLen !== length) {
      buffer.length = length;
      buffer.fill(void 0, origLen);
    }
    let entities = (_a = data == null ? void 0 : data.entities) == null ? void 0 : _a[index];
    if (entities) {
      decodeFieldValueEntities(entities, buffer);
    }
    let enums = (_b = data == null ? void 0 : data.enums) == null ? void 0 : _b[index];
    if (enums) {
      decodeFieldValueEnums(enums, buffer);
      type = FieldType.string;
    }
    const nanos = (_c = data == null ? void 0 : data.nanos) == null ? void 0 : _c[index];
    const dataFrameField = __spreadProps(__spreadValues({}, f), {
      type: type != null ? type : guessFieldType(f.name, buffer),
      config: (_d = f.config) != null ? _d : {},
      values: buffer,
      // the presence of this prop is an optimization signal & lookup for consumers
      entities: entities != null ? entities : {}
    });
    if (nanos != null) {
      dataFrameField.nanos = nanos;
    }
    return dataFrameField;
  });
  return __spreadProps(__spreadValues({}, schema), {
    fields,
    length
  });
}
function dataFrameToJSON(frame) {
  const data = {
    values: []
  };
  const allNanos = [];
  let hasNanos = false;
  const schema = {
    refId: frame.refId,
    meta: frame.meta,
    name: frame.name,
    fields: frame.fields.map((f) => {
      const _a = f, { values, nanos, state, display } = _a, sfield = __objRest(_a, ["values", "nanos", "state", "display"]);
      if ("entities" in sfield) {
        delete sfield.entities;
      }
      data.values.push(values);
      if (nanos != null) {
        allNanos.push(nanos);
        hasNanos = true;
      } else {
        allNanos.push(null);
      }
      return sfield;
    })
  };
  if (hasNanos) {
    data.nanos = allNanos;
  }
  return {
    schema,
    data
  };
}

export { dataFrameFromJSON, dataFrameToJSON, decodeFieldValueEntities, decodeFieldValueEnums };
//# sourceMappingURL=DataFrameJSON.js.map
