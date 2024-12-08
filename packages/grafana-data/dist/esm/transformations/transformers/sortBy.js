import { map } from 'rxjs/operators';
import '../../vector/FunctionalVector.js';
import 'lodash';
import { sortDataFrame } from '../../dataframe/processDataFrame.js';
import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import '../../dataframe/StreamingDataFrame.js';
import { DataTransformerID } from './ids.js';
import '../matchers.js';
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
import './reduce.js';
import './rename.js';
import './renameByRegex.js';
import './seriesToRows.js';
import '../fieldReducer.js';
import 'rxjs';
import '../standardTransformersRegistry.js';
import '../matchers/nameMatcher.js';
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
import { transformationsVariableSupport } from './utils.js';

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
const sortByTransformer = {
  id: DataTransformerID.sortBy,
  name: "Sort by",
  description: "Sort fields in a frame.",
  defaultOptions: {
    fields: {}
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => source.pipe(
    map((data) => {
      var _a;
      if (!Array.isArray(data) || data.length === 0 || !((_a = options == null ? void 0 : options.sort) == null ? void 0 : _a.length)) {
        return data;
      }
      return sortDataFrames(data, options.sort, ctx);
    })
  )
};
function sortDataFrames(data, sort, ctx) {
  return data.map((frame) => {
    const s = attachFieldIndex(frame, sort, ctx);
    if (s.length && s[0].index != null) {
      return sortDataFrame(frame, s[0].index, s[0].desc);
    }
    return frame;
  });
}
function attachFieldIndex(frame, sort, ctx) {
  return sort.map((s) => {
    if (s.index != null) {
      return s;
    }
    if (transformationsVariableSupport()) {
      return __spreadProps(__spreadValues({}, s), {
        index: frame.fields.findIndex((f) => ctx.interpolate(s.field) === getFieldDisplayName(f, frame))
      });
    }
    return __spreadProps(__spreadValues({}, s), {
      index: frame.fields.findIndex((f) => s.field === getFieldDisplayName(f, frame))
    });
  });
}

export { sortByTransformer };
//# sourceMappingURL=sortBy.js.map
