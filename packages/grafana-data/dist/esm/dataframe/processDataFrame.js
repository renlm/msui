import { isNumber, isString, isBoolean, isArray } from 'lodash';
import { isDateTime } from '../datetime/moment_wrapper.js';
import { fieldIndexComparer } from '../field/fieldComparers.js';
import { getFieldDisplayName } from '../field/fieldState.js';
import { LoadingState } from '../types/data.js';
import { FieldType, TIME_SERIES_TIME_FIELD_NAME, TIME_SERIES_VALUE_FIELD_NAME } from '../types/dataFrame.js';
import '@grafana/schema';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import { arrayToDataFrame } from './ArrayDataFrame.js';
import { dataFrameFromJSON } from './DataFrameJSON.js';

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
function convertTableToDataFrame(table) {
  const fields = table.columns.map((c) => {
    const _a = c, { text, type } = _a, disp = __objRest(_a, ["text", "type"]);
    const values = [];
    return {
      name: (text == null ? void 0 : text.length) ? text : c,
      // rename 'text' to the 'name' field
      config: disp || {},
      values,
      type: type && Object.values(FieldType).includes(type) ? type : FieldType.other
    };
  });
  if (!isArray(table.rows)) {
    throw new Error(`Expected table rows to be array, got ${typeof table.rows}.`);
  }
  for (const row of table.rows) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].values.push(row[i]);
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
  return {
    fields,
    refId: table.refId,
    meta: table.meta,
    name: table.name,
    length: table.rows.length
  };
}
function convertTimeSeriesToDataFrame(timeSeries) {
  const times = [];
  const values = [];
  const points = timeSeries.datapoints || timeSeries.points;
  for (const point of points) {
    values.push(point[0]);
    times.push(point[1]);
  }
  const fields = [
    {
      name: TIME_SERIES_TIME_FIELD_NAME,
      type: FieldType.time,
      config: {},
      values: times
    },
    {
      name: TIME_SERIES_VALUE_FIELD_NAME,
      type: FieldType.number,
      config: {
        unit: timeSeries.unit
      },
      values,
      labels: timeSeries.tags
    }
  ];
  if (timeSeries.title) {
    fields[1].config.displayNameFromDS = timeSeries.title;
  }
  return {
    name: timeSeries.target || timeSeries.name,
    refId: timeSeries.refId,
    meta: timeSeries.meta,
    fields,
    length: values.length
  };
}
function convertGraphSeriesToDataFrame(graphSeries) {
  const x = [];
  const y = [];
  for (let i = 0; i < graphSeries.data.length; i++) {
    const row = graphSeries.data[i];
    x.push(row[1]);
    y.push(row[0]);
  }
  return {
    name: graphSeries.label,
    fields: [
      {
        name: graphSeries.label || TIME_SERIES_VALUE_FIELD_NAME,
        type: FieldType.number,
        config: {},
        values: x
      },
      {
        name: TIME_SERIES_TIME_FIELD_NAME,
        type: FieldType.time,
        config: {
          unit: "dateTimeAsIso"
        },
        values: y
      }
    ],
    length: x.length
  };
}
function convertJSONDocumentDataToDataFrame(timeSeries) {
  const fields = [
    {
      name: timeSeries.target,
      type: FieldType.other,
      labels: timeSeries.tags,
      config: {
        unit: timeSeries.unit,
        filterable: timeSeries.filterable
      },
      values: []
    }
  ];
  for (const point of timeSeries.datapoints) {
    fields[0].values.push(point);
  }
  return {
    name: timeSeries.target,
    refId: timeSeries.target,
    meta: { json: true },
    fields,
    length: timeSeries.datapoints.length
  };
}
const NUMBER = /^\s*(-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?|NAN)\s*$/i;
function guessFieldTypeFromNameAndValue(name, v) {
  if (name) {
    name = name.toLowerCase();
    if (name === "date" || name === "time") {
      return FieldType.time;
    }
  }
  return guessFieldTypeFromValue(v);
}
function getFieldTypeFromValue(v) {
  if (v instanceof Date || isDateTime(v)) {
    return FieldType.time;
  }
  if (isNumber(v)) {
    return FieldType.number;
  }
  if (isString(v)) {
    return FieldType.string;
  }
  if (isBoolean(v)) {
    return FieldType.boolean;
  }
  return FieldType.other;
}
function guessFieldTypeFromValue(v) {
  if (v instanceof Date || isDateTime(v)) {
    return FieldType.time;
  }
  if (isNumber(v)) {
    return FieldType.number;
  }
  if (isString(v)) {
    if (NUMBER.test(v)) {
      return FieldType.number;
    }
    if (v === "true" || v === "TRUE" || v === "True" || v === "false" || v === "FALSE" || v === "False") {
      return FieldType.boolean;
    }
    return FieldType.string;
  }
  if (isBoolean(v)) {
    return FieldType.boolean;
  }
  return FieldType.other;
}
function guessFieldTypeForField(field) {
  if (field.name) {
    const name = field.name.toLowerCase();
    if (name === "date" || name === "time") {
      return FieldType.time;
    }
  }
  for (let i = 0; i < field.values.length; i++) {
    const v = field.values[i];
    if (v != null) {
      return guessFieldTypeFromValue(v);
    }
  }
  return void 0;
}
const guessFieldTypes = (series, guessDefined = false) => {
  for (const field of series.fields) {
    if (!field.type || field.type === FieldType.other || guessDefined) {
      return __spreadProps(__spreadValues({}, series), {
        fields: series.fields.map((field2) => {
          if (field2.type && field2.type !== FieldType.other && !guessDefined) {
            return field2;
          }
          return __spreadProps(__spreadValues({}, field2), {
            type: guessFieldTypeForField(field2) || FieldType.other
          });
        })
      });
    }
  }
  return series;
};
const isTableData = (data) => Boolean(data && data.hasOwnProperty("columns"));
const isDataFrame = (data) => Boolean(data && data.hasOwnProperty("fields"));
const isDataFrameWithValue = (data) => Boolean(isDataFrame(data) && data.hasOwnProperty("value"));
function toDataFrame(data) {
  var _a, _b;
  if ("fields" in data) {
    if ("length" in data && ((_b = (_a = data.fields[0]) == null ? void 0 : _a.values) == null ? void 0 : _b.get)) {
      return data;
    }
    return createDataFrame(data);
  }
  if (data.hasOwnProperty("type") && data.type === "docs") {
    return convertJSONDocumentDataToDataFrame(data);
  }
  if (data.hasOwnProperty("datapoints") || data.hasOwnProperty("points")) {
    return convertTimeSeriesToDataFrame(data);
  }
  if (data.hasOwnProperty("data")) {
    if (data.hasOwnProperty("schema")) {
      return dataFrameFromJSON(data);
    }
    return convertGraphSeriesToDataFrame(data);
  }
  if (data.hasOwnProperty("columns")) {
    return convertTableToDataFrame(data);
  }
  if (Array.isArray(data)) {
    return arrayToDataFrame(data);
  }
  console.warn("Can not convert", data);
  throw new Error("Unsupported data format");
}
const toLegacyResponseData = (frame) => {
  const { fields } = frame;
  const rowCount = frame.length;
  const rows = [];
  if (fields.length === 2) {
    const { timeField, timeIndex } = getTimeField(frame);
    if (timeField) {
      const valueIndex = timeIndex === 0 ? 1 : 0;
      const valueField = fields[valueIndex];
      const timeField2 = fields[timeIndex];
      for (let i = 0; i < rowCount; i++) {
        rows.push([
          valueField.values[i],
          // value
          timeField2.values[i]
          // time
        ]);
      }
      return {
        alias: frame.name,
        target: getFieldDisplayName(valueField, frame),
        datapoints: rows,
        unit: fields[0].config ? fields[0].config.unit : void 0,
        refId: frame.refId,
        meta: frame.meta
      };
    }
  }
  for (let i = 0; i < rowCount; i++) {
    const row = [];
    for (let j = 0; j < fields.length; j++) {
      row.push(fields[j].values[i]);
    }
    rows.push(row);
  }
  if (frame.meta && frame.meta.json) {
    return {
      alias: fields[0].name || frame.name,
      target: fields[0].name || frame.name,
      datapoints: fields[0].values,
      filterable: fields[0].config ? fields[0].config.filterable : void 0,
      type: "docs"
    };
  }
  return {
    columns: fields.map((f) => {
      const { name, config } = f;
      if (config) {
        const column = __objRest(config, []);
        column.text = name;
        return column;
      }
      return { text: name };
    }),
    type: "table",
    refId: frame.refId,
    meta: frame.meta,
    rows
  };
};
function sortDataFrame(data, sortIndex, reverse = false) {
  const field = data.fields[sortIndex];
  if (!field) {
    return data;
  }
  const index = [];
  for (let i = 0; i < data.length; i++) {
    index.push(i);
  }
  const fieldComparer = fieldIndexComparer(field, reverse);
  index.sort(fieldComparer);
  return __spreadProps(__spreadValues({}, data), {
    fields: data.fields.map((f) => {
      const newF = __spreadProps(__spreadValues({}, f), {
        values: f.values.map((v, i) => f.values[index[i]])
      });
      const { nanos } = f;
      if (nanos !== void 0) {
        newF.nanos = nanos.map((n, i) => nanos[index[i]]);
      }
      return newF;
    })
  });
}
function reverseDataFrame(data) {
  return __spreadProps(__spreadValues({}, data), {
    fields: data.fields.map((f) => {
      const values = [...f.values];
      values.reverse();
      const newF = __spreadProps(__spreadValues({}, f), {
        values
      });
      const { nanos } = f;
      if (nanos !== void 0) {
        const revNanos = [...nanos];
        revNanos.reverse();
        newF.nanos = revNanos;
      }
      return newF;
    })
  });
}
function getDataFrameRow(data, row) {
  const values = [];
  for (const field of data.fields) {
    values.push(field.values[row]);
  }
  return values;
}
function toDataFrameDTO(data) {
  return toFilteredDataFrameDTO(data);
}
function toFilteredDataFrameDTO(data, fieldPredicate) {
  const filteredFields = fieldPredicate ? data.fields.filter(fieldPredicate) : data.fields;
  const fields = filteredFields.map((f) => {
    let values = f.values;
    return {
      name: f.name,
      type: f.type,
      config: f.config,
      values,
      labels: f.labels
    };
  });
  return {
    fields,
    refId: data.refId,
    meta: data.meta,
    name: data.name
  };
}
const getTimeField = (series) => {
  for (let i = 0; i < series.fields.length; i++) {
    if (series.fields[i].type === FieldType.time) {
      return {
        timeField: series.fields[i],
        timeIndex: i
      };
    }
  }
  return {};
};
function getProcessedDataFrame(data) {
  const dataFrame = guessFieldTypes(toDataFrame(data));
  if (dataFrame.fields && dataFrame.fields.length) {
    for (const field of dataFrame.fields) {
      field.state = null;
    }
  }
  return dataFrame;
}
function getProcessedDataFrames(results) {
  if (!results || !isArray(results)) {
    return [];
  }
  return results.map((data) => getProcessedDataFrame(data));
}
function preProcessPanelData(data, lastResult) {
  const { series, annotations } = data;
  if (data.state === LoadingState.Loading && series.length === 0) {
    if (!lastResult) {
      lastResult = data;
    }
    return __spreadProps(__spreadValues({}, lastResult), {
      state: LoadingState.Loading,
      request: data.request
    });
  }
  const STARTTIME = performance.now();
  const processedDataFrames = series.map((data2) => getProcessedDataFrame(data2));
  const annotationsProcessed = getProcessedDataFrames(annotations);
  const STOPTIME = performance.now();
  return __spreadProps(__spreadValues({}, data), {
    series: processedDataFrames,
    annotations: annotationsProcessed,
    timings: { dataProcessingTime: STOPTIME - STARTTIME }
  });
}
function createDataFrame(input) {
  let length = 0;
  const fields = input.fields.map((p, idx) => {
    var _b;
    const _a = p, field = __objRest(_a, ["state"]);
    if (!field.name) {
      field.name = `Field ${idx + 1}`;
    }
    if (!field.config) {
      field.config = {};
    }
    if (!field.values) {
      field.values = new Array(length);
    } else if (field.values.length > length) {
      length = field.values.length;
    }
    if (!field.type) {
      field.type = (_b = guessFieldTypeForField(field)) != null ? _b : FieldType.other;
    }
    return field;
  });
  return __spreadProps(__spreadValues({}, input), {
    fields,
    length
  });
}

export { createDataFrame, getDataFrameRow, getFieldTypeFromValue, getProcessedDataFrames, getTimeField, guessFieldTypeForField, guessFieldTypeFromNameAndValue, guessFieldTypeFromValue, guessFieldTypes, isDataFrame, isDataFrameWithValue, isTableData, preProcessPanelData, reverseDataFrame, sortDataFrame, toDataFrame, toDataFrameDTO, toFilteredDataFrameDTO, toLegacyResponseData };
//# sourceMappingURL=processDataFrame.js.map
