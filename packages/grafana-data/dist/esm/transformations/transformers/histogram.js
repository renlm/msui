import { map } from 'rxjs/operators';
import 'lodash';
import '../../vector/FunctionalVector.js';
import '../../datetime/moment_wrapper.js';
import '../../datetime/rangeutil.js';
import '../../datetime/timezones.js';
import '../../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';
import { FieldType } from '../../types/dataFrame.js';
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
import './sortBy.js';
import '../fieldReducer.js';
import 'rxjs';
import '../standardTransformersRegistry.js';
import '../matchers/nameMatcher.js';
import { join } from './joinDataFrames.js';
import { DataFrameType } from '../../types/dataFrameTypes.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import '../../types/legacyEvents.js';
import { nullToValueField } from './nulls/nullToValue.js';
import { getDisplayProcessor } from '../../field/displayProcessor.js';
import '../../field/standardFieldConfigEditorRegistry.js';
import '../../field/fieldColor.js';
import 'react';
import 'react-use/lib/usePrevious';
import '../../dataframe/StreamingDataFrame.js';
import 'tinycolor2';
import 'papaparse';
import { roundDecimals } from '../../utils/numbers.js';
import '../../utils/binaryOperators.js';
import '../../utils/unaryOperators.js';
import 'marked';
import 'marked-mangle';
import '../../text/sanitize.js';
import { createTheme } from '../../themes/createTheme.js';
import '../../themes/registry.js';
import '../../themes/context.js';
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
const histogramBucketSizes = [
  1e-9,
  2e-9,
  25e-10,
  4e-9,
  5e-9,
  1e-8,
  2e-8,
  25e-9,
  4e-8,
  5e-8,
  1e-7,
  2e-7,
  25e-8,
  4e-7,
  5e-7,
  1e-6,
  2e-6,
  25e-7,
  4e-6,
  5e-6,
  1e-5,
  2e-5,
  25e-6,
  4e-5,
  5e-5,
  1e-4,
  2e-4,
  25e-5,
  4e-4,
  5e-4,
  1e-3,
  2e-3,
  25e-4,
  4e-3,
  5e-3,
  0.01,
  0.02,
  0.025,
  0.04,
  0.05,
  0.1,
  0.2,
  0.25,
  0.4,
  0.5,
  1,
  2,
  4,
  5,
  10,
  20,
  25,
  40,
  50,
  100,
  200,
  250,
  400,
  500,
  1e3,
  2e3,
  2500,
  4e3,
  5e3,
  1e4,
  2e4,
  25e3,
  4e4,
  5e4,
  1e5,
  2e5,
  25e4,
  4e5,
  5e5,
  1e6,
  2e6,
  25e5,
  4e6,
  5e6,
  1e7,
  2e7,
  25e6,
  4e7,
  5e7,
  1e8,
  2e8,
  25e7,
  4e8,
  5e8,
  1e9,
  2e9,
  25e8,
  4e9,
  5e9
];
const DEFAULT_BUCKET_COUNT = 30;
const histFilter = [];
const histSort = (a, b) => a - b;
const histogramFieldInfo = {
  bucketCount: {
    name: "Bucket count",
    description: "approx bucket count"
  },
  bucketSize: {
    name: "Bucket size",
    description: void 0
  },
  bucketOffset: {
    name: "Bucket offset",
    description: "for non-zero-based buckets"
  },
  combine: {
    name: "Combine series",
    description: "combine all series into a single histogram"
  }
};
const histogramTransformer = {
  id: DataTransformerID.histogram,
  name: "Histogram",
  description: "Calculate a histogram from input data.",
  defaultOptions: {
    fields: {}
  },
  operator: (options, ctx) => (source) => source.pipe(map((data) => histogramTransformer.transformer(options, ctx)(data))),
  transformer: (options, ctx) => (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return data;
    }
    let bucketSize, bucketOffset = void 0;
    if (options.bucketSize) {
      if (transformationsVariableSupport()) {
        options.bucketSize = ctx.interpolate(options.bucketSize.toString());
      }
      if (typeof options.bucketSize === "string") {
        bucketSize = parseFloat(options.bucketSize);
      } else {
        bucketSize = options.bucketSize;
      }
      if (isNaN(bucketSize)) {
        bucketSize = void 0;
      }
    }
    if (options.bucketOffset) {
      if (transformationsVariableSupport()) {
        options.bucketOffset = ctx.interpolate(options.bucketOffset.toString());
      }
      if (typeof options.bucketOffset === "string") {
        bucketOffset = parseFloat(options.bucketOffset);
      } else {
        bucketOffset = options.bucketOffset;
      }
      if (isNaN(bucketOffset)) {
        bucketOffset = void 0;
      }
    }
    const interpolatedOptions = {
      bucketSize,
      bucketOffset,
      combine: options.combine
    };
    const hist = buildHistogram(data, interpolatedOptions);
    if (hist == null) {
      return [];
    }
    return [histogramFieldsToFrame(hist)];
  }
};
const histogramFrameBucketMinFieldName = "xMin";
function isHistogramFrameBucketMinFieldName(v) {
  return v === histogramFrameBucketMinFieldName || v === "BucketMin";
}
const histogramFrameBucketMaxFieldName = "xMax";
function isHistogramFrameBucketMaxFieldName(v) {
  return v === histogramFrameBucketMaxFieldName || v === "BucketMax";
}
function getHistogramFields(frame) {
  var _a, _b;
  if (((_a = frame.meta) == null ? void 0 : _a.type) === DataFrameType.HeatmapCells) {
    let yMinField = frame.fields.find((f) => f.name === "yMin");
    let yMaxField = frame.fields.find((f) => f.name === "yMax");
    let countField = frame.fields.find((f) => f.name === "count");
    let uniqueMaxs = [...new Set(yMaxField.values)].sort((a, b) => a - b);
    let uniqueMins = [...new Set(yMinField.values)].sort((a, b) => a - b);
    let countsByMax = /* @__PURE__ */ new Map();
    uniqueMaxs.forEach((max) => countsByMax.set(max, 0));
    for (let i = 0; i < yMaxField.values.length; i++) {
      let max = yMaxField.values[i];
      countsByMax.set(max, countsByMax.get(max) + countField.values[i]);
    }
    let fields = {
      xMin: __spreadProps(__spreadValues({}, yMinField), {
        name: "xMin",
        values: uniqueMins
      }),
      xMax: __spreadProps(__spreadValues({}, yMaxField), {
        name: "xMax",
        values: uniqueMaxs
      }),
      counts: [
        __spreadProps(__spreadValues({}, countField), {
          values: [...countsByMax.values()]
        })
      ]
    };
    return fields;
  } else if (((_b = frame.meta) == null ? void 0 : _b.type) === DataFrameType.HeatmapRows) {
    let minVals = [];
    let maxVals = [];
    let countVals = [];
    let minVal = "0";
    frame.fields.forEach((f) => {
      if (f.type === FieldType.number) {
        let countsSum = f.values.reduce((acc, v) => acc + v, 0);
        countVals.push(countsSum);
        minVals.push(minVal);
        maxVals.push(minVal = f.name);
      }
    });
    countVals.push(0);
    minVals.push(minVal);
    maxVals.push(minVal);
    let fields = {
      xMin: __spreadProps(__spreadValues({}, frame.fields[1]), {
        name: "xMin",
        type: FieldType.string,
        values: minVals
      }),
      xMax: __spreadProps(__spreadValues({}, frame.fields[1]), {
        name: "xMax",
        type: FieldType.string,
        values: maxVals
      }),
      counts: [
        __spreadProps(__spreadValues({}, frame.fields[1]), {
          name: "count",
          type: FieldType.number,
          values: countVals
        })
      ]
    };
    return fields;
  }
  let xMin = void 0;
  let xMax = void 0;
  const counts = [];
  for (const field of frame.fields) {
    if (isHistogramFrameBucketMinFieldName(field.name)) {
      xMin = field;
    } else if (isHistogramFrameBucketMaxFieldName(field.name)) {
      xMax = field;
    } else if (field.type === FieldType.number) {
      counts.push(field);
    }
  }
  if (!xMax && xMin && xMin.values.length > 1) {
    let vals = xMin.values;
    let bucketSize = roundDecimals(vals[1] - vals[0], 6);
    xMax = __spreadProps(__spreadValues({}, xMin), {
      name: histogramFrameBucketMaxFieldName,
      values: vals.map((v) => v + bucketSize)
    });
  }
  if (!xMin && xMax && (xMax == null ? void 0 : xMax.values.length) > 1) {
    let vals = xMax.values;
    let bucketSize = roundDecimals(vals[1] - vals[0], 6);
    xMin = __spreadProps(__spreadValues({}, xMax), {
      name: histogramFrameBucketMinFieldName,
      values: vals.map((v) => v - bucketSize)
    });
  }
  if (xMin && xMax && counts.length) {
    return {
      xMin,
      xMax,
      counts
    };
  }
  return void 0;
}
function buildHistogram(frames, options) {
  var _a, _b, _c;
  let bucketSize = options == null ? void 0 : options.bucketSize;
  let bucketCount = (_a = options == null ? void 0 : options.bucketCount) != null ? _a : DEFAULT_BUCKET_COUNT;
  let bucketOffset = (_b = options == null ? void 0 : options.bucketOffset) != null ? _b : 0;
  frames = frames.map((frame) => {
    return __spreadProps(__spreadValues({}, frame), {
      fields: frame.fields.map((field) => {
        if (field.type === FieldType.number) {
          const noValue = Number(field.config.noValue);
          if (!Number.isNaN(noValue)) {
            field = nullToValueField(field, noValue);
          } else {
            field = __spreadProps(__spreadValues({}, field), { values: field.values.filter((v) => v != null) });
          }
        }
        return field;
      })
    });
  });
  if (!bucketSize || bucketSize < 0) {
    let allValues = [];
    for (const frame of frames) {
      for (const field of frame.fields) {
        if (field.type === FieldType.number) {
          allValues = allValues.concat(field.values);
        }
      }
    }
    allValues.sort((a, b) => a - b);
    let smallestDelta = Infinity;
    if (allValues.length === 1) {
      smallestDelta = 1;
    } else {
      for (let i = 1; i < allValues.length; i++) {
        let delta = allValues[i] - allValues[i - 1];
        if (delta !== 0) {
          smallestDelta = Math.min(smallestDelta, delta);
        }
      }
    }
    let min = allValues[0];
    let max = allValues[allValues.length - 1];
    let range = max - min;
    const targetSize = range / bucketCount;
    for (let i = 0; i < histogramBucketSizes.length; i++) {
      let _bucketSize = histogramBucketSizes[i];
      if (targetSize < _bucketSize && _bucketSize >= smallestDelta) {
        bucketSize = _bucketSize;
        break;
      }
    }
  }
  const getBucket = (v) => roundDecimals(incrRoundDn(v - bucketOffset, bucketSize) + bucketOffset, 9);
  let bucketDecimals = ((_c = ("" + bucketSize).match(/\.\d+$/)) != null ? _c : ["."])[0].length - 1;
  let histograms = [];
  let counts = [];
  let config = void 0;
  for (const frame of frames) {
    for (const field of frame.fields) {
      if (field.type === FieldType.number) {
        let fieldHist = histogram(field.values, getBucket, histFilter, histSort);
        histograms.push(fieldHist);
        counts.push(__spreadProps(__spreadValues({}, field), {
          config: __spreadProps(__spreadValues({}, field.config), {
            unit: field.config.unit === "short" ? "short" : void 0
          })
        }));
        if (!config && field.config.unit) {
          config = field.config;
        }
      }
    }
  }
  if (!counts.length) {
    return null;
  }
  let joinedHists = join(histograms);
  for (let histIdx = 1; histIdx < joinedHists.length; histIdx++) {
    let hist = joinedHists[histIdx];
    for (let bucketIdx = 0; bucketIdx < hist.length; bucketIdx++) {
      if (hist[bucketIdx] == null) {
        hist[bucketIdx] = 0;
      }
    }
  }
  const xMin = {
    name: histogramFrameBucketMinFieldName,
    values: joinedHists[0],
    type: FieldType.number,
    state: void 0,
    config: bucketDecimals === 0 ? config != null ? config : {} : __spreadProps(__spreadValues({}, config), {
      decimals: bucketDecimals
    })
  };
  const xMax = __spreadProps(__spreadValues({}, xMin), {
    name: histogramFrameBucketMaxFieldName,
    values: joinedHists[0].map((v) => v + bucketSize)
  });
  if (options == null ? void 0 : options.combine) {
    const vals = new Array(joinedHists[0].length).fill(0);
    for (let i = 1; i < joinedHists.length; i++) {
      for (let j = 0; j < vals.length; j++) {
        vals[j] += joinedHists[i][j];
      }
    }
    counts = [
      __spreadProps(__spreadValues({}, counts[0]), {
        name: "count",
        values: vals,
        type: FieldType.number,
        state: __spreadProps(__spreadValues({}, counts[0].state), {
          displayName: "Count",
          multipleFrames: false,
          origin: { frameIndex: 0, fieldIndex: 2 }
        })
      })
    ];
  } else {
    counts.forEach((field, i) => {
      field.values = joinedHists[i + 1];
    });
  }
  return {
    xMin,
    xMax,
    counts
  };
}
function incrRound(num, incr) {
  return Math.round(num / incr) * incr;
}
function incrRoundUp(num, incr) {
  return Math.ceil(num / incr) * incr;
}
function incrRoundDn(num, incr) {
  return Math.floor(num / incr) * incr;
}
function histogram(vals, getBucket, filterOut, sort) {
  let hist = /* @__PURE__ */ new Map();
  for (let i = 0; i < vals.length; i++) {
    let v = vals[i];
    if (v != null) {
      v = getBucket(v);
    }
    let entry = hist.get(v);
    if (entry) {
      entry.count++;
    } else {
      hist.set(v, { value: v, count: 1 });
    }
  }
  filterOut && filterOut.forEach((v) => hist.delete(v));
  let bins = [...hist.values()];
  sort && bins.sort((a, b) => sort(a.value, b.value));
  let values = Array(bins.length);
  let counts = Array(bins.length);
  for (let i = 0; i < bins.length; i++) {
    values[i] = bins[i].value;
    counts[i] = bins[i].count;
  }
  return [values, counts];
}
function histogramFieldsToFrame(info, theme) {
  if (!info.xMin.display) {
    const display = getDisplayProcessor({
      field: info.xMin,
      theme: theme != null ? theme : createTheme()
    });
    info.xMin.display = display;
    info.xMax.display = display;
  }
  info.counts[0].display = getDisplayProcessor({
    field: info.counts[0],
    theme: theme != null ? theme : createTheme()
  });
  return {
    length: info.xMin.values.length,
    meta: {
      type: DataFrameType.Histogram
    },
    fields: [info.xMin, info.xMax, ...info.counts]
  };
}

export { buildHistogram, getHistogramFields, histogramBucketSizes, histogramFieldInfo, histogramFieldsToFrame, histogramFrameBucketMaxFieldName, histogramFrameBucketMinFieldName, histogramTransformer, incrRound, incrRoundDn, incrRoundUp, isHistogramFrameBucketMaxFieldName, isHistogramFrameBucketMinFieldName };
//# sourceMappingURL=histogram.js.map
