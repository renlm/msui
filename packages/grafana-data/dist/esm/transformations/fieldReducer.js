import { isNumber } from 'lodash';
import { NullValueMode } from '../types/data.js';
import { FieldType } from '../types/dataFrame.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import { Registry } from '../utils/Registry.js';

var __defProp = Object.defineProperty;
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
var ReducerID = /* @__PURE__ */ ((ReducerID2) => {
  ReducerID2["sum"] = "sum";
  ReducerID2["max"] = "max";
  ReducerID2["min"] = "min";
  ReducerID2["logmin"] = "logmin";
  ReducerID2["mean"] = "mean";
  ReducerID2["variance"] = "variance";
  ReducerID2["stdDev"] = "stdDev";
  ReducerID2["last"] = "last";
  ReducerID2["first"] = "first";
  ReducerID2["count"] = "count";
  ReducerID2["range"] = "range";
  ReducerID2["diff"] = "diff";
  ReducerID2["diffperc"] = "diffperc";
  ReducerID2["delta"] = "delta";
  ReducerID2["step"] = "step";
  ReducerID2["firstNotNull"] = "firstNotNull";
  ReducerID2["lastNotNull"] = "lastNotNull";
  ReducerID2["changeCount"] = "changeCount";
  ReducerID2["distinctCount"] = "distinctCount";
  ReducerID2["allIsZero"] = "allIsZero";
  ReducerID2["allIsNull"] = "allIsNull";
  ReducerID2["allValues"] = "allValues";
  ReducerID2["uniqueValues"] = "uniqueValues";
  ReducerID2["p1"] = "p1";
  ReducerID2["p2"] = "p2";
  ReducerID2["p3"] = "p3";
  ReducerID2["p4"] = "p4";
  ReducerID2["p5"] = "p5";
  ReducerID2["p6"] = "p6";
  ReducerID2["p7"] = "p7";
  ReducerID2["p8"] = "p8";
  ReducerID2["p9"] = "p9";
  ReducerID2["p10"] = "p10";
  ReducerID2["p11"] = "p11";
  ReducerID2["p12"] = "p12";
  ReducerID2["p13"] = "p13";
  ReducerID2["p14"] = "p14";
  ReducerID2["p15"] = "p15";
  ReducerID2["p16"] = "p16";
  ReducerID2["p17"] = "p17";
  ReducerID2["p18"] = "p18";
  ReducerID2["p19"] = "p19";
  ReducerID2["p20"] = "p20";
  ReducerID2["p21"] = "p21";
  ReducerID2["p22"] = "p22";
  ReducerID2["p23"] = "p23";
  ReducerID2["p24"] = "p24";
  ReducerID2["p25"] = "p25";
  ReducerID2["p26"] = "p26";
  ReducerID2["p27"] = "p27";
  ReducerID2["p28"] = "p28";
  ReducerID2["p29"] = "p29";
  ReducerID2["p30"] = "p30";
  ReducerID2["p31"] = "p31";
  ReducerID2["p32"] = "p32";
  ReducerID2["p33"] = "p33";
  ReducerID2["p34"] = "p34";
  ReducerID2["p35"] = "p35";
  ReducerID2["p36"] = "p36";
  ReducerID2["p37"] = "p37";
  ReducerID2["p38"] = "p38";
  ReducerID2["p39"] = "p39";
  ReducerID2["p40"] = "p40";
  ReducerID2["p41"] = "p41";
  ReducerID2["p42"] = "p42";
  ReducerID2["p43"] = "p43";
  ReducerID2["p44"] = "p44";
  ReducerID2["p45"] = "p45";
  ReducerID2["p46"] = "p46";
  ReducerID2["p47"] = "p47";
  ReducerID2["p48"] = "p48";
  ReducerID2["p49"] = "p49";
  ReducerID2["p50"] = "p50";
  ReducerID2["p51"] = "p51";
  ReducerID2["p52"] = "p52";
  ReducerID2["p53"] = "p53";
  ReducerID2["p54"] = "p54";
  ReducerID2["p55"] = "p55";
  ReducerID2["p56"] = "p56";
  ReducerID2["p57"] = "p57";
  ReducerID2["p58"] = "p58";
  ReducerID2["p59"] = "p59";
  ReducerID2["p60"] = "p60";
  ReducerID2["p61"] = "p61";
  ReducerID2["p62"] = "p62";
  ReducerID2["p63"] = "p63";
  ReducerID2["p64"] = "p64";
  ReducerID2["p65"] = "p65";
  ReducerID2["p66"] = "p66";
  ReducerID2["p67"] = "p67";
  ReducerID2["p68"] = "p68";
  ReducerID2["p69"] = "p69";
  ReducerID2["p70"] = "p70";
  ReducerID2["p71"] = "p71";
  ReducerID2["p72"] = "p72";
  ReducerID2["p73"] = "p73";
  ReducerID2["p74"] = "p74";
  ReducerID2["p75"] = "p75";
  ReducerID2["p76"] = "p76";
  ReducerID2["p77"] = "p77";
  ReducerID2["p78"] = "p78";
  ReducerID2["p79"] = "p79";
  ReducerID2["p80"] = "p80";
  ReducerID2["p81"] = "p81";
  ReducerID2["p82"] = "p82";
  ReducerID2["p83"] = "p83";
  ReducerID2["p84"] = "p84";
  ReducerID2["p85"] = "p85";
  ReducerID2["p86"] = "p86";
  ReducerID2["p87"] = "p87";
  ReducerID2["p88"] = "p88";
  ReducerID2["p89"] = "p89";
  ReducerID2["p90"] = "p90";
  ReducerID2["p91"] = "p91";
  ReducerID2["p92"] = "p92";
  ReducerID2["p93"] = "p93";
  ReducerID2["p94"] = "p94";
  ReducerID2["p95"] = "p95";
  ReducerID2["p96"] = "p96";
  ReducerID2["p97"] = "p97";
  ReducerID2["p98"] = "p98";
  ReducerID2["p99"] = "p99";
  return ReducerID2;
})(ReducerID || {});
function isReducerID(id) {
  return Object.keys(ReducerID).includes(id);
}
function reduceField(options) {
  var _a;
  const { field, reducers } = options;
  if (!field || !reducers || reducers.length < 1) {
    return {};
  }
  if ((_a = field.state) == null ? void 0 : _a.calcs) {
    const missing = [];
    for (const s of reducers) {
      if (!field.state.calcs.hasOwnProperty(s)) {
        missing.push(s);
      }
    }
    if (missing.length < 1) {
      return __spreadValues({}, field.state.calcs);
    }
  }
  if (!field.state) {
    field.state = {};
  }
  const queue = fieldReducers.list(reducers);
  const data = field.values;
  if (data && data.length < 1) {
    const calcs = __spreadValues({}, field.state.calcs);
    for (const reducer of queue) {
      calcs[reducer.id] = reducer.emptyInputResult !== null ? reducer.emptyInputResult : null;
    }
    return field.state.calcs = calcs;
  }
  const { nullValueMode = NullValueMode.Ignore } = field.config;
  const ignoreNulls = nullValueMode === NullValueMode.Ignore;
  const nullAsZero = nullValueMode === NullValueMode.AsZero;
  if (queue.length === 1 && queue[0].reduce) {
    const values2 = queue[0].reduce(field, ignoreNulls, nullAsZero);
    field.state.calcs = __spreadValues(__spreadValues({}, field.state.calcs), values2);
    return values2;
  }
  let values = doStandardCalcs(field, ignoreNulls, nullAsZero);
  for (const reducer of queue) {
    if (!values.hasOwnProperty(reducer.id) && reducer.reduce) {
      values = __spreadValues(__spreadValues({}, values), reducer.reduce(field, ignoreNulls, nullAsZero));
    }
  }
  field.state.calcs = __spreadValues(__spreadValues({}, field.state.calcs), values);
  return values;
}
const fieldReducers = new Registry(() => [
  {
    id: "lastNotNull" /* lastNotNull */,
    name: "Last *",
    description: "Last non-null value (also excludes NaNs)",
    standard: true,
    aliasIds: ["current"],
    reduce: calculateLastNotNull,
    preservesUnits: true
  },
  {
    id: "last" /* last */,
    name: "Last",
    description: "Last value",
    standard: true,
    reduce: calculateLast,
    preservesUnits: true
  },
  {
    id: "firstNotNull" /* firstNotNull */,
    name: "First *",
    description: "First non-null value (also excludes NaNs)",
    standard: true,
    reduce: calculateFirstNotNull,
    preservesUnits: true
  },
  {
    id: "first" /* first */,
    name: "First",
    description: "First Value",
    standard: true,
    reduce: calculateFirst,
    preservesUnits: true
  },
  { id: "min" /* min */, name: "Min", description: "Minimum Value", standard: true, preservesUnits: true },
  { id: "max" /* max */, name: "Max", description: "Maximum Value", standard: true, preservesUnits: true },
  {
    id: "mean" /* mean */,
    name: "Mean",
    description: "Average Value",
    standard: true,
    aliasIds: ["avg"],
    preservesUnits: true
  },
  {
    id: "variance" /* variance */,
    name: "Variance",
    description: "Variance of all values in a field",
    standard: false,
    reduce: calculateStdDev,
    preservesUnits: true
  },
  {
    id: "stdDev" /* stdDev */,
    name: "StdDev",
    description: "Standard deviation of all values in a field",
    standard: false,
    reduce: calculateStdDev,
    preservesUnits: true
  },
  {
    id: "sum" /* sum */,
    name: "Total",
    description: "The sum of all values",
    emptyInputResult: 0,
    standard: true,
    aliasIds: ["total"],
    preservesUnits: true
  },
  {
    id: "count" /* count */,
    name: "Count",
    description: "Number of values in response",
    emptyInputResult: 0,
    standard: true,
    preservesUnits: false
  },
  {
    id: "range" /* range */,
    name: "Range",
    description: "Difference between minimum and maximum values",
    standard: true,
    preservesUnits: true
  },
  {
    id: "delta" /* delta */,
    name: "Delta",
    description: "Cumulative change in value",
    standard: true,
    preservesUnits: true
  },
  {
    id: "step" /* step */,
    name: "Step",
    description: "Minimum interval between values",
    standard: true,
    preservesUnits: true
  },
  {
    id: "diff" /* diff */,
    name: "Difference",
    description: "Difference between first and last values",
    standard: true,
    preservesUnits: true
  },
  {
    id: "logmin" /* logmin */,
    name: "Min (above zero)",
    description: "Used for log min scale",
    standard: true,
    preservesUnits: true
  },
  {
    id: "allIsZero" /* allIsZero */,
    name: "All Zeros",
    description: "All values are zero",
    emptyInputResult: false,
    standard: true,
    preservesUnits: true
  },
  {
    id: "allIsNull" /* allIsNull */,
    name: "All Nulls",
    description: "All values are null",
    emptyInputResult: true,
    standard: true,
    preservesUnits: false
  },
  {
    id: "changeCount" /* changeCount */,
    name: "Change Count",
    description: "Number of times the value changes",
    standard: false,
    reduce: calculateChangeCount,
    preservesUnits: false
  },
  {
    id: "distinctCount" /* distinctCount */,
    name: "Distinct Count",
    description: "Number of distinct values",
    standard: false,
    reduce: calculateDistinctCount,
    preservesUnits: false
  },
  {
    id: "diffperc" /* diffperc */,
    name: "Difference percent",
    description: "Percentage difference between first and last values",
    standard: true,
    preservesUnits: false
  },
  {
    id: "allValues" /* allValues */,
    name: "All values",
    description: "Returns an array with all values",
    standard: false,
    reduce: (field) => ({ allValues: [...field.values] }),
    preservesUnits: false
  },
  {
    id: "uniqueValues" /* uniqueValues */,
    name: "All unique values",
    description: "Returns an array with all unique values",
    standard: false,
    reduce: (field) => ({
      uniqueValues: [...new Set(field.values)]
    }),
    preservesUnits: false
  },
  ...buildPercentileReducers()
]);
const buildPercentileReducers = (percentiles = [...Array.from({ length: 99 }, (_, i) => i + 1)]) => {
  const percentileReducers = [];
  const nth = (n) => n > 3 && n < 21 ? "th" : n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ? "rd" : "th";
  percentiles.forEach((p) => {
    const percentile = p / 100;
    const id = `p${p}`;
    const name = `${p}${nth(p)} %`;
    const description = `${p}${nth(p)} percentile value`;
    percentileReducers.push({
      id,
      name,
      description,
      standard: false,
      reduce: (field, ignoreNulls, nullAsZero) => {
        return { [id]: calculatePercentile(field, percentile, ignoreNulls, nullAsZero) };
      },
      preservesUnits: true
    });
  });
  return percentileReducers;
};
const defaultCalcs = {
  sum: 0,
  max: -Number.MAX_VALUE,
  min: Number.MAX_VALUE,
  logmin: Number.MAX_VALUE,
  mean: null,
  last: null,
  first: null,
  lastNotNull: null,
  firstNotNull: null,
  count: 0,
  nonNullCount: 0,
  allIsNull: true,
  allIsZero: true,
  range: null,
  diff: null,
  delta: 0,
  step: Number.MAX_VALUE,
  diffperc: 0,
  // Just used for calculations -- not exposed as a stat
  previousDeltaUp: true
};
function doStandardCalcs(field, ignoreNulls, nullAsZero) {
  const calcs = __spreadValues({}, defaultCalcs);
  const data = field.values;
  if (!data) {
    return calcs;
  }
  const isNumberField = field.type === FieldType.number || field.type === FieldType.time;
  for (let i = 0; i < data.length; i++) {
    let currentValue = data[i];
    if (i === 0) {
      calcs.first = currentValue;
    }
    calcs.last = currentValue;
    if (currentValue == null) {
      if (ignoreNulls) {
        continue;
      }
      if (nullAsZero) {
        currentValue = 0;
      }
    }
    calcs.count++;
    if (currentValue != null && !Number.isNaN(currentValue)) {
      const isFirst = calcs.firstNotNull === null;
      if (isFirst) {
        calcs.firstNotNull = currentValue;
      }
      if (isNumberField) {
        calcs.sum += currentValue;
        calcs.allIsNull = false;
        calcs.nonNullCount++;
        if (!isFirst) {
          const step = currentValue - calcs.lastNotNull;
          if (calcs.step > step) {
            calcs.step = step;
          }
          if (calcs.lastNotNull > currentValue) {
            calcs.previousDeltaUp = false;
            if (i === data.length - 1) {
              calcs.delta += currentValue;
            }
          } else {
            if (calcs.previousDeltaUp) {
              calcs.delta += step;
            } else {
              calcs.delta += currentValue;
            }
            calcs.previousDeltaUp = true;
          }
        }
        if (currentValue > calcs.max) {
          calcs.max = currentValue;
        }
        if (currentValue < calcs.min) {
          calcs.min = currentValue;
        }
        if (currentValue < calcs.logmin && currentValue > 0) {
          calcs.logmin = currentValue;
        }
      }
      if (currentValue !== 0) {
        calcs.allIsZero = false;
      }
      calcs.lastNotNull = currentValue;
    }
  }
  if (calcs.max === -Number.MAX_VALUE) {
    calcs.max = null;
  }
  if (calcs.min === Number.MAX_VALUE) {
    calcs.min = null;
  }
  if (calcs.step === Number.MAX_VALUE) {
    calcs.step = null;
  }
  if (calcs.nonNullCount > 0) {
    calcs.mean = calcs.sum / calcs.nonNullCount;
  }
  if (calcs.allIsNull) {
    calcs.allIsZero = false;
  }
  if (calcs.max !== null && calcs.min !== null) {
    calcs.range = calcs.max - calcs.min;
  }
  if (isNumber(calcs.firstNotNull) && isNumber(calcs.lastNotNull)) {
    calcs.diff = calcs.lastNotNull - calcs.firstNotNull;
  }
  if (isNumber(calcs.firstNotNull) && isNumber(calcs.diff)) {
    calcs.diffperc = calcs.diff / calcs.firstNotNull;
  }
  return calcs;
}
function calculateFirst(field, ignoreNulls, nullAsZero) {
  return { first: field.values[0] };
}
function calculateFirstNotNull(field, ignoreNulls, nullAsZero) {
  const data = field.values;
  for (let idx = 0; idx < data.length; idx++) {
    const v = data[idx];
    if (v != null && !Number.isNaN(v)) {
      return { firstNotNull: v };
    }
  }
  return { firstNotNull: null };
}
function calculateLast(field, ignoreNulls, nullAsZero) {
  const data = field.values;
  return { last: data[data.length - 1] };
}
function calculateLastNotNull(field, ignoreNulls, nullAsZero) {
  const data = field.values;
  let idx = data.length - 1;
  while (idx >= 0) {
    const v = data[idx--];
    if (v != null && !Number.isNaN(v)) {
      return { lastNotNull: v };
    }
  }
  return { lastNotNull: null };
}
function calculateStdDev(field, ignoreNulls, nullAsZero) {
  if (!(field.type === FieldType.number || field.type === FieldType.time)) {
    return { variance: 0, stdDev: 0 };
  }
  let squareSum = 0;
  let runningMean = 0;
  let runningNonNullCount = 0;
  const data = field.values;
  for (let i = 0; i < data.length; i++) {
    const currentValue = data[i];
    if (currentValue != null) {
      runningNonNullCount++;
      let _oldMean = runningMean;
      runningMean += (currentValue - _oldMean) / runningNonNullCount;
      squareSum += (currentValue - _oldMean) * (currentValue - runningMean);
    }
  }
  if (runningNonNullCount > 0) {
    const variance = squareSum / runningNonNullCount;
    return { variance, stdDev: Math.sqrt(variance) };
  }
  return { variance: 0, stdDev: 0 };
}
function calculateChangeCount(field, ignoreNulls, nullAsZero) {
  const data = field.values;
  let count = 0;
  let first = true;
  let last = null;
  for (let i = 0; i < data.length; i++) {
    let currentValue = data[i];
    if (currentValue === null) {
      if (ignoreNulls) {
        continue;
      }
      if (nullAsZero) {
        currentValue = 0;
      }
    }
    if (!first && last !== currentValue) {
      count++;
    }
    first = false;
    last = currentValue;
  }
  return { changeCount: count };
}
function calculateDistinctCount(field, ignoreNulls, nullAsZero) {
  const data = field.values;
  const distinct = /* @__PURE__ */ new Set();
  for (let i = 0; i < data.length; i++) {
    let currentValue = data[i];
    if (currentValue === null) {
      if (ignoreNulls) {
        continue;
      }
      if (nullAsZero) {
        currentValue = 0;
      }
    }
    distinct.add(currentValue);
  }
  return { distinctCount: distinct.size };
}
function calculatePercentile(field, percentile, ignoreNulls, nullAsZero) {
  let data = field.values;
  if (ignoreNulls) {
    data = data.filter((value) => value !== null);
  }
  if (nullAsZero) {
    data = data.map((value) => value === null ? 0 : value);
  }
  const sorted = data.slice().sort((a, b) => a - b);
  const index = Math.round((sorted.length - 1) * percentile);
  return sorted[index];
}

export { ReducerID, defaultCalcs, doStandardCalcs, fieldReducers, isReducerID, reduceField };
//# sourceMappingURL=fieldReducer.js.map
