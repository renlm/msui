import { map } from 'rxjs/operators';
import { FieldType } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import 'lodash';
import '../../types/legacyEvents.js';
import { DataTransformerID } from './ids.js';
import { getFieldDisplayName } from '../../field/fieldState.js';

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
const labelsToFieldsTransformer = {
  id: DataTransformerID.labelsToFields,
  name: "Labels to fields",
  description: "Extract time series labels to fields (columns or rows)",
  defaultOptions: {},
  operator: (options, ctx) => (source) => source.pipe(map((data) => labelsToFieldsTransformer.transformer(options, ctx)(data))),
  transformer: (options) => (data) => {
    var _a, _b;
    if (options.mode === "rows" /* Rows */) {
      return convertLabelsToRows(data, options.keepLabels);
    }
    const result = [];
    const keepLabels = ((_a = options.keepLabels) == null ? void 0 : _a.length) ? new Set(options.keepLabels) : void 0;
    for (const frame of data) {
      const newFields = [];
      const uniqueLabels = {};
      for (const field of frame.fields) {
        if (!field.labels) {
          newFields.push(field);
          continue;
        }
        const sansLabels = __spreadProps(__spreadValues({}, field), {
          config: __spreadProps(__spreadValues({}, field.config), {
            // we need to clear these for this transform as these can contain label names that we no longer want
            displayName: void 0,
            displayNameFromDS: void 0
          }),
          labels: void 0
        });
        newFields.push(sansLabels);
        for (const labelName of Object.keys(field.labels)) {
          if (keepLabels && !keepLabels.has(labelName)) {
            continue;
          }
          if (options.valueLabel === labelName) {
            sansLabels.name = field.labels[labelName];
            continue;
          }
          const uniqueValues = (_b = uniqueLabels[labelName]) != null ? _b : uniqueLabels[labelName] = /* @__PURE__ */ new Set();
          uniqueValues.add(field.labels[labelName]);
        }
      }
      for (const name in uniqueLabels) {
        for (const value of uniqueLabels[name]) {
          const values = new Array(frame.length).fill(value);
          newFields.push({
            name,
            type: FieldType.string,
            values,
            config: {}
          });
        }
      }
      result.push(__spreadProps(__spreadValues({}, frame), {
        fields: newFields,
        length: frame.length
      }));
    }
    return result;
  }
};
function convertLabelsToRows(data, keepLabels) {
  const result = [];
  for (const frame of data) {
    for (const field of frame.fields) {
      if (field.labels) {
        const keys = [];
        const vals = [];
        if (keepLabels) {
          for (const key of keepLabels) {
            keys.push(key);
            vals.push(field.labels[key]);
          }
        } else {
          for (const [key, val] of Object.entries(field.labels)) {
            keys.push(key);
            vals.push(val);
          }
        }
        if (vals.length) {
          result.push(__spreadProps(__spreadValues({}, frame), {
            name: getFieldDisplayName(field, frame, data),
            fields: [
              { name: "label", type: FieldType.string, config: {}, values: keys },
              { name: "value", type: FieldType.string, config: {}, values: vals }
            ],
            length: vals.length
          }));
        }
      }
    }
  }
  return result;
}

export { labelsToFieldsTransformer };
//# sourceMappingURL=labelsToFields.js.map
