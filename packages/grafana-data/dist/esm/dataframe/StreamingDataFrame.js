import { join } from '../transformations/transformers/joinDataFrames.js';
import { renderLegendFormat } from '../utils/legend.js';
import '../vector/FunctionalVector.js';
import 'lodash';
import { FieldType } from '../types/dataFrame.js';
import { toFilteredDataFrameDTO, guessFieldTypeFromValue } from './processDataFrame.js';
import { decodeFieldValueEntities } from './DataFrameJSON.js';
import { parseLabels } from '../utils/labels.js';

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
var StreamingFrameAction = /* @__PURE__ */ ((StreamingFrameAction2) => {
  StreamingFrameAction2["Append"] = "append";
  StreamingFrameAction2["Replace"] = "replace";
  return StreamingFrameAction2;
})(StreamingFrameAction || {});
const PROM_STYLE_METRIC_LABEL = "__name__";
const _StreamingDataFrame = class _StreamingDataFrame {
  constructor(options) {
    this.options = options;
    __publicField(this, "name");
    __publicField(this, "refId");
    __publicField(this, "meta", {});
    __publicField(this, "fields", []);
    __publicField(this, "length", 0);
    __publicField(this, "schemaFields", []);
    __publicField(this, "timeFieldIndex", -1);
    __publicField(this, "pushMode", 0 /* wide */);
    // current labels
    __publicField(this, "labels", /* @__PURE__ */ new Set());
    __publicField(this, "packetInfo", {
      schemaChanged: true,
      number: 0,
      action: "replace" /* Replace */,
      length: 0
    });
    __publicField(this, "serialize", (fieldPredicate, optionsOverride, trimValues) => {
      var _a, _b, _c;
      const options = optionsOverride ? Object.assign({}, __spreadValues(__spreadValues({}, this.options), optionsOverride)) : this.options;
      const dataFrameDTO = toFilteredDataFrameDTO(this, fieldPredicate);
      const numberOfItemsToRemove = getNumberOfItemsToRemove(
        dataFrameDTO.fields.map((f) => {
          var _a2;
          return (_a2 = f.values) != null ? _a2 : [];
        }),
        typeof (trimValues == null ? void 0 : trimValues.maxLength) === "number" ? Math.min(trimValues.maxLength, options.maxLength) : options.maxLength,
        this.timeFieldIndex,
        options.maxDelta
      );
      dataFrameDTO.fields = dataFrameDTO.fields.map((f) => {
        var _a2;
        return __spreadProps(__spreadValues({}, f), {
          values: (_a2 = f.values) == null ? void 0 : _a2.slice(numberOfItemsToRemove)
        });
      });
      const length = (_c = (_b = (_a = dataFrameDTO.fields[0]) == null ? void 0 : _a.values) == null ? void 0 : _b.length) != null ? _c : 0;
      return __spreadProps(__spreadValues({}, dataFrameDTO), {
        // TODO: Labels and schema are not filtered by field
        labels: this.labels,
        schemaFields: this.schemaFields,
        name: this.name,
        refId: this.refId,
        meta: this.meta,
        length,
        timeFieldIndex: this.timeFieldIndex,
        pushMode: this.pushMode,
        packetInfo: this.packetInfo,
        options
      });
    });
    __publicField(this, "initFromSerialized", (serialized) => {
      this.name = serialized.name;
      this.refId = serialized.refId;
      this.meta = serialized.meta;
      this.length = serialized.length;
      this.labels = serialized.labels;
      this.schemaFields = serialized.schemaFields;
      this.timeFieldIndex = serialized.timeFieldIndex;
      this.pushMode = serialized.pushMode;
      this.packetInfo.length = serialized.packetInfo.length;
      this.packetInfo.number = serialized.packetInfo.number;
      this.packetInfo.action = "replace" /* Replace */;
      this.packetInfo.schemaChanged = true;
      this.fields = serialized.fields.map((f) => {
        var _a, _b, _c;
        return __spreadProps(__spreadValues({}, f), {
          type: (_a = f.type) != null ? _a : FieldType.other,
          config: (_b = f.config) != null ? _b : {},
          values: (_c = f.values) != null ? _c : []
        });
      });
      assureValuesAreWithinLengthLimit(
        this.fields.map((f) => f.values),
        this.options.maxLength,
        this.timeFieldIndex,
        this.options.maxDelta
      );
    });
    __publicField(this, "needsResizing", ({ maxLength, maxDelta }) => {
      const needsMoreLength = maxLength && this.options.maxLength < maxLength;
      const needsBiggerDelta = maxDelta && this.options.maxDelta < maxDelta;
      const needsToOverrideDefaultInfinityDelta = maxDelta && this.options.maxDelta === Infinity;
      return Boolean(needsMoreLength || needsBiggerDelta || needsToOverrideDefaultInfinityDelta);
    });
    __publicField(this, "resize", ({ maxLength, maxDelta }) => {
      if (maxDelta) {
        if (this.options.maxDelta === Infinity) {
          this.options.maxDelta = maxDelta;
        } else {
          this.options.maxDelta = Math.max(maxDelta, this.options.maxDelta);
        }
      }
      this.options.maxLength = Math.max(this.options.maxLength, maxLength != null ? maxLength : 0);
    });
    __publicField(this, "pushNewValues", (values) => {
      var _a, _b;
      if (!(values == null ? void 0 : values.length)) {
        return;
      }
      this.packetInfo.action = this.options.action;
      this.packetInfo.number++;
      this.packetInfo.length = values[0].length;
      this.packetInfo.schemaChanged = false;
      if (this.options.action === "append" /* Append */) {
        circPush(
          this.fields.map((f) => f.values),
          values,
          this.options.maxLength,
          this.timeFieldIndex,
          this.options.maxDelta
        );
      } else {
        values.forEach((v, i) => {
          if (this.fields[i]) {
            this.fields[i].values = v;
          }
        });
        assureValuesAreWithinLengthLimit(
          this.fields.map((f) => f.values),
          this.options.maxLength,
          this.timeFieldIndex,
          this.options.maxDelta
        );
      }
      const newLength = (_b = (_a = this.fields) == null ? void 0 : _a[0]) == null ? void 0 : _b.values.length;
      if (newLength !== void 0) {
        this.length = newLength;
      }
    });
    __publicField(this, "resetStateCalculations", () => {
      this.fields.forEach((f) => {
        var _a;
        f.state = __spreadProps(__spreadValues({}, (_a = f.state) != null ? _a : {}), {
          calcs: void 0,
          range: void 0
        });
      });
    });
    __publicField(this, "getMatchingFieldIndexes", (fieldPredicate) => this.fields.map((f, index) => fieldPredicate(f) ? index : void 0).filter((val) => val !== void 0));
    __publicField(this, "getValuesFromLastPacket", () => this.fields.map((f) => {
      const values = f.values;
      return values.slice(Math.max(values.length - this.packetInfo.length));
    }));
    __publicField(this, "hasAtLeastOnePacket", () => Boolean(this.packetInfo.length));
    __publicField(this, "getOptions", () => this.options);
    Object.defineProperty(this, "length", {
      enumerable: true
    });
    Object.defineProperty(this, "fields", {
      enumerable: true
    });
  }
  get alwaysReplace() {
    return this.options.action === "replace" /* Replace */;
  }
  /**
   * apply the new message to the existing data.  This will replace the existing schema
   * if a new schema is included in the message, or append data matching the current schema
   */
  push(msg) {
    const { schema, data } = msg;
    this.packetInfo.number++;
    this.packetInfo.length = 0;
    this.packetInfo.schemaChanged = false;
    if (schema) {
      this.pushMode = 0 /* wide */;
      this.timeFieldIndex = schema.fields.findIndex((f) => f.type === FieldType.time);
      const firstField = schema.fields[0];
      if (this.timeFieldIndex === 1 && firstField.type === FieldType.string && (firstField.name === "labels" || firstField.name === "Labels")) {
        this.pushMode = 1 /* labels */;
        this.timeFieldIndex = 0;
      }
      const niceSchemaFields = this.pushMode === 1 /* labels */ ? schema.fields.slice(1) : schema.fields;
      this.refId = schema.refId;
      if (schema.meta) {
        this.meta = __spreadValues({}, schema.meta);
      }
      const { displayNameFormat } = this.options;
      if (hasSameStructure(this.schemaFields, niceSchemaFields)) {
        const len = niceSchemaFields.length;
        this.fields.forEach((f, idx) => {
          var _a;
          const sf = niceSchemaFields[idx % len];
          f.config = (_a = sf.config) != null ? _a : {};
          f.labels = sf.labels;
        });
        if (displayNameFormat) {
          this.fields.forEach((f) => {
            const labels = __spreadValues({ [PROM_STYLE_METRIC_LABEL]: f.name }, f.labels);
            f.config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          });
        }
      } else {
        this.packetInfo.schemaChanged = true;
        const isWide = this.pushMode === 0 /* wide */;
        this.fields = niceSchemaFields.map((f) => {
          var _a, _b, _c, _d;
          const config = (_a = f.config) != null ? _a : {};
          if (displayNameFormat) {
            const labels = __spreadValues({ [PROM_STYLE_METRIC_LABEL]: f.name }, f.labels);
            config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          }
          return {
            config,
            name: f.name,
            labels: f.labels,
            type: (_b = f.type) != null ? _b : FieldType.other,
            // transfer old values by type & name, unless we relied on labels to match fields
            values: isWide ? (_d = (_c = this.fields.find((of) => of.name === f.name && f.type === of.type)) == null ? void 0 : _c.values) != null ? _d : Array(this.length).fill(void 0) : []
          };
        });
      }
      this.schemaFields = niceSchemaFields;
    }
    if (data && data.values.length && data.values[0].length) {
      let { values, entities } = data;
      if (entities) {
        entities.forEach((ents, i) => {
          if (ents) {
            decodeFieldValueEntities(ents, values[i]);
          }
        });
      }
      if (this.pushMode === 1 /* labels */) {
        const labeledTables = transpose(values);
        for (const label of labeledTables.keys()) {
          if (!this.labels.has(label)) {
            this.packetInfo.schemaChanged = true;
            this.addLabel(label);
          }
        }
        let dummyTable = Array(this.schemaFields.length).fill([]);
        let tables = [];
        this.labels.forEach((label) => {
          var _a;
          tables.push((_a = labeledTables.get(label)) != null ? _a : dummyTable);
        });
        values = join(tables);
      }
      if (values.length !== this.fields.length) {
        if (this.fields.length) {
          throw new Error(
            `push message mismatch.  Expected: ${this.fields.length}, received: ${values.length} (labels=${this.pushMode === 1 /* labels */})`
          );
        }
        this.fields = values.map((vals, idx) => {
          let name = `Field ${idx}`;
          let type = guessFieldTypeFromValue(vals[0]);
          const isTime = idx === 0 && type === FieldType.number && vals[0] > 1600016688632;
          if (isTime) {
            type = FieldType.time;
            name = "Time";
          }
          return {
            name,
            type,
            config: {},
            values: []
          };
        });
      }
      let appended = values;
      this.packetInfo.length = values[0].length;
      if (this.alwaysReplace || !this.length) {
        this.packetInfo.action = "replace" /* Replace */;
      } else {
        this.packetInfo.action = "append" /* Append */;
        appended = this.fields.map((f) => f.values);
        circPush(appended, values, this.options.maxLength, this.timeFieldIndex, this.options.maxDelta);
      }
      appended.forEach((v, i) => {
        const field = this.fields[i];
        const { state } = field;
        field.values = v;
        if (state) {
          state.calcs = void 0;
        }
      });
      this.length = appended[0].length;
    }
    return __spreadValues({}, this.packetInfo);
  }
  // adds a set of fields for a new label
  addLabel(label) {
    var _a;
    const { displayNameFormat } = this.options;
    const labelCount = this.labels.size;
    const parsedLabels = parseLabelsFromField(label);
    if (labelCount === 0) {
      this.fields.forEach((f, i) => {
        if (i > 0) {
          f.labels = parsedLabels;
          if (displayNameFormat) {
            const labels = __spreadValues({ [PROM_STYLE_METRIC_LABEL]: f.name }, parsedLabels);
            f.config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          }
        }
      });
    } else {
      for (let i = 1; i < this.schemaFields.length; i++) {
        let proto = this.schemaFields[i];
        const config = (_a = proto.config) != null ? _a : {};
        if (displayNameFormat) {
          const labels = __spreadValues({ [PROM_STYLE_METRIC_LABEL]: proto.name }, parsedLabels);
          config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
        }
        this.fields.push(__spreadProps(__spreadValues({}, proto), {
          config,
          labels: parsedLabels,
          values: Array(this.length).fill(void 0)
        }));
      }
    }
    this.labels.add(label);
  }
};
__publicField(_StreamingDataFrame, "deserialize", (serialized) => {
  const frame = new _StreamingDataFrame(serialized.options);
  frame.initFromSerialized(serialized);
  return frame;
});
__publicField(_StreamingDataFrame, "empty", (opts) => new _StreamingDataFrame(getStreamingFrameOptions(opts)));
__publicField(_StreamingDataFrame, "fromDataFrameJSON", (frame, opts) => {
  const streamingDataFrame = new _StreamingDataFrame(getStreamingFrameOptions(opts));
  streamingDataFrame.push(frame);
  return streamingDataFrame;
});
let StreamingDataFrame = _StreamingDataFrame;
function getStreamingFrameOptions(opts) {
  var _a, _b, _c;
  return {
    maxLength: (_a = opts == null ? void 0 : opts.maxLength) != null ? _a : 1e3,
    maxDelta: (_b = opts == null ? void 0 : opts.maxDelta) != null ? _b : Infinity,
    action: (_c = opts == null ? void 0 : opts.action) != null ? _c : "append" /* Append */,
    displayNameFormat: opts == null ? void 0 : opts.displayNameFormat
  };
}
function transpose(vrecs) {
  let tableKeys = new Set(vrecs[0]);
  let tables = /* @__PURE__ */ new Map();
  tableKeys.forEach((key) => {
    let cols = Array(vrecs.length - 1).fill(null).map(() => []);
    tables.set(key, cols);
  });
  for (let r = 0; r < vrecs[0].length; r++) {
    let table = tables.get(vrecs[0][r]);
    for (let c = 1; c < vrecs.length; c++) {
      table[c - 1].push(vrecs[c][r]);
    }
  }
  return tables;
}
function closestIdx(num, arr, lo, hi) {
  let mid;
  lo = lo || 0;
  hi = hi || arr.length - 1;
  let bitwise = hi <= 2147483647;
  while (hi - lo > 1) {
    mid = bitwise ? lo + hi >> 1 : Math.floor((lo + hi) / 2);
    if (arr[mid] < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (num - arr[lo] <= arr[hi] - num) {
    return lo;
  }
  return hi;
}
function parseLabelsFromField(str) {
  if (!str.length) {
    return {};
  }
  if (str.charAt(0) === "{") {
    return parseLabels(str);
  }
  const parsedLabels = {};
  str.split(",").forEach((kv) => {
    const [key, val] = kv.trim().split("=");
    parsedLabels[key] = val;
  });
  return parsedLabels;
}
function circPush(data, newData, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < newData[i].length; k++) {
      data[i].push(newData[i][k]);
    }
  }
  return assureValuesAreWithinLengthLimit(data, maxLength, deltaIdx, maxDelta);
}
function assureValuesAreWithinLengthLimit(data, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  const count = getNumberOfItemsToRemove(data, maxLength, deltaIdx, maxDelta);
  if (count) {
    for (let i = 0; i < data.length; i++) {
      data[i].splice(0, count);
    }
  }
  return count;
}
function getNumberOfItemsToRemove(data, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  var _a;
  if (!((_a = data[0]) == null ? void 0 : _a.length)) {
    return 0;
  }
  const nlen = data[0].length;
  let sliceIdx = 0;
  if (nlen > maxLength) {
    sliceIdx = nlen - maxLength;
  }
  if (maxDelta !== Infinity && deltaIdx >= 0) {
    const deltaLookup = data[deltaIdx];
    const low = deltaLookup[sliceIdx];
    const high = deltaLookup[nlen - 1];
    if (high - low > maxDelta) {
      sliceIdx = closestIdx(high - maxDelta, deltaLookup, sliceIdx);
    }
  }
  return sliceIdx;
}
function hasSameStructure(a, b) {
  if ((a == null ? void 0 : a.length) !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    const fA = a[i];
    const fB = b[i];
    if (fA.name !== fB.name || fA.type !== fB.type) {
      return false;
    }
  }
  return true;
}

export { StreamingDataFrame, StreamingFrameAction, closestIdx, getStreamingFrameOptions, parseLabelsFromField, transpose };
//# sourceMappingURL=StreamingDataFrame.js.map
