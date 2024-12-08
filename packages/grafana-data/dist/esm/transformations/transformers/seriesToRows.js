import { omit } from 'lodash';
import { map } from 'rxjs/operators';
import '../../vector/FunctionalVector.js';
import { MutableDataFrame } from '../../dataframe/MutableDataFrame.js';
import { sortDataFrame } from '../../dataframe/processDataFrame.js';
import { TIME_SERIES_METRIC_FIELD_NAME, FieldType, TIME_SERIES_TIME_FIELD_NAME, TIME_SERIES_VALUE_FIELD_NAME } from '../../types/dataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import { isTimeSeriesFrames } from '../../dataframe/utils.js';
import '../../dataframe/StreamingDataFrame.js';
import { getFrameDisplayName } from '../../field/fieldState.js';
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
const seriesToRowsTransformer = {
  id: DataTransformerID.seriesToRows,
  name: "Series to rows",
  description: "Combines multiple series into a single serie and appends a column with metric name per value.",
  defaultOptions: {},
  operator: (options) => (source) => source.pipe(
    map((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        return data;
      }
      data = data.filter((frame) => frame.length > 0);
      if (!isTimeSeriesFrames(data)) {
        return data;
      }
      const timeFieldByIndex = {};
      const targetFields = /* @__PURE__ */ new Set();
      const dataFrame = new MutableDataFrame();
      const metricField = {
        name: TIME_SERIES_METRIC_FIELD_NAME,
        values: [],
        config: {},
        type: FieldType.string
      };
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
          const field = frame.fields[fieldIndex];
          if (field.type === FieldType.time) {
            timeFieldByIndex[frameIndex] = fieldIndex;
            if (!targetFields.has(TIME_SERIES_TIME_FIELD_NAME)) {
              dataFrame.addField(copyFieldStructure(field, TIME_SERIES_TIME_FIELD_NAME));
              dataFrame.addField(metricField);
              targetFields.add(TIME_SERIES_TIME_FIELD_NAME);
            }
            continue;
          }
          if (!targetFields.has(TIME_SERIES_VALUE_FIELD_NAME)) {
            dataFrame.addField(copyFieldStructure(field, TIME_SERIES_VALUE_FIELD_NAME));
            targetFields.add(TIME_SERIES_VALUE_FIELD_NAME);
          }
        }
      }
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let valueIndex = 0; valueIndex < frame.length; valueIndex++) {
          const timeFieldIndex = timeFieldByIndex[frameIndex];
          const valueFieldIndex = timeFieldIndex === 0 ? 1 : 0;
          dataFrame.add({
            [TIME_SERIES_TIME_FIELD_NAME]: frame.fields[timeFieldIndex].values[valueIndex],
            [TIME_SERIES_METRIC_FIELD_NAME]: getFrameDisplayName(frame),
            [TIME_SERIES_VALUE_FIELD_NAME]: frame.fields[valueFieldIndex].values[valueIndex]
          });
        }
      }
      return [sortDataFrame(dataFrame, 0, true)];
    })
  )
};
const copyFieldStructure = (field, name) => {
  return __spreadProps(__spreadValues({}, omit(field, ["values", "state", "labels", "config", "name"])), {
    name,
    values: [],
    config: __spreadValues({}, omit(field.config, ["displayName", "displayNameFromDS"]))
  });
};

export { seriesToRowsTransformer };
//# sourceMappingURL=seriesToRows.js.map
