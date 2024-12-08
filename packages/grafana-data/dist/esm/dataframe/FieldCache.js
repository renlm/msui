import { guessFieldTypeForField } from './processDataFrame.js';
import { FieldType } from '../types/dataFrame.js';

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FieldCache {
  constructor(data) {
    __publicField(this, "fields", []);
    __publicField(this, "fieldByName", {});
    __publicField(this, "fieldByType", {});
    this.fields = data.fields.map((field, idx) => __spreadProps(__spreadValues({}, field), {
      index: idx
    }));
    for (let i = 0; i < data.fields.length; i++) {
      const field = data.fields[i];
      if (field.type === FieldType.other) {
        const t = guessFieldTypeForField(field);
        if (t) {
          field.type = t;
        }
      }
      if (!this.fieldByType[field.type]) {
        this.fieldByType[field.type] = [];
      }
      this.fieldByType[field.type].push(__spreadProps(__spreadValues({}, field), {
        index: i
      }));
      if (this.fieldByName[field.name]) {
        console.warn("Duplicate field names in DataFrame: ", field.name);
      } else {
        this.fieldByName[field.name] = __spreadProps(__spreadValues({}, field), { index: i });
      }
    }
  }
  getFields(type) {
    if (!type) {
      return [...this.fields];
    }
    const fields = this.fieldByType[type];
    if (fields) {
      return [...fields];
    }
    return [];
  }
  hasFieldOfType(type) {
    const types = this.fieldByType[type];
    return types && types.length > 0;
  }
  getFirstFieldOfType(type, includeHidden = false) {
    const fields = this.fieldByType[type];
    const firstField = fields == null ? void 0 : fields.find((field) => {
      var _a;
      return includeHidden || !((_a = field.config.custom) == null ? void 0 : _a.hidden);
    });
    return firstField;
  }
  hasFieldNamed(name) {
    return !!this.fieldByName[name];
  }
  hasFieldWithNameAndType(name, type) {
    return !!this.fieldByName[name] && this.fieldByType[type].filter((field) => field.name === name).length > 0;
  }
  /**
   * Returns the first field with the given name.
   */
  getFieldByName(name) {
    return this.fieldByName[name];
  }
  /**
   * Returns the fields with the given label.
   */
  getFieldsByLabel(label, value) {
    return Object.values(this.fieldByName).filter((f) => {
      return f.labels && f.labels[label] === value;
    });
  }
}

export { FieldCache };
//# sourceMappingURL=FieldCache.js.map
