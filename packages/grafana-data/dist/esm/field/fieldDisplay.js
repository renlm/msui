import { isEmpty } from 'lodash';
import { DataFrameView } from '../dataframe/DataFrameView.js';
import { getTimeField } from '../dataframe/processDataFrame.js';
import { FieldMatcherID } from '../transformations/matchers/ids.js';
import { getFieldMatcher } from '../transformations/matchers.js';
import '../transformations/transformers/calculateField.js';
import '../transformations/transformers/concat.js';
import '../transformations/transformers/convertFieldType.js';
import '../transformations/transformers/ensureColumns.js';
import '../transformations/transformers/filter.js';
import '../transformations/transformers/filterByName.js';
import '../transformations/transformers/filterByRefId.js';
import '../transformations/transformers/filterByValue.js';
import '../transformations/transformers/formatString.js';
import '../transformations/transformers/formatTime.js';
import '../transformations/transformers/groupBy.js';
import '../transformations/transformers/groupToNestedTable.js';
import '../transformations/transformers/groupingToMatrix.js';
import '../transformations/transformers/histogram.js';
import '../transformations/transformers/joinByField.js';
import '../transformations/transformers/labelsToFields.js';
import '../transformations/transformers/limit.js';
import '../transformations/transformers/merge.js';
import '../transformations/transformers/noop.js';
import '../transformations/transformers/order.js';
import '../transformations/transformers/organize.js';
import '../transformations/transformers/reduce.js';
import '../transformations/transformers/rename.js';
import '../transformations/transformers/renameByRegex.js';
import '../transformations/transformers/seriesToRows.js';
import '../transformations/transformers/sortBy.js';
import { ReducerID, reduceField } from '../transformations/fieldReducer.js';
import 'rxjs';
import 'rxjs/operators';
import '../transformations/standardTransformersRegistry.js';
import '../transformations/matchers/nameMatcher.js';
import { FieldType } from '../types/dataFrame.js';
import '../vector/FunctionalVector.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import '../dataframe/StreamingDataFrame.js';
import { getDisplayProcessor } from './displayProcessor.js';
import { getFieldDisplayName } from './fieldState.js';

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
const VAR_SERIES_NAME = "__series.name";
const VAR_FIELD_NAME = "__field.displayName";
const VAR_FIELD_LABELS = "__field.labels";
const VAR_CALC = "__calc";
const VAR_CELL_PREFIX = "__cell_";
const DEFAULT_FIELD_DISPLAY_VALUES_LIMIT = 25;
const getFieldDisplayValues = (options) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { replaceVariables, reduceOptions, timeZone, theme } = options;
  const calcs = reduceOptions.calcs.length ? reduceOptions.calcs : [ReducerID.last];
  const values = [];
  const fieldMatcher = getFieldMatcher(
    reduceOptions.fields ? {
      id: FieldMatcherID.byRegexp,
      options: reduceOptions.fields
    } : {
      id: FieldMatcherID.numeric
    }
  );
  const data = (_a = options.data) != null ? _a : [];
  const limit = reduceOptions.limit ? reduceOptions.limit : DEFAULT_FIELD_DISPLAY_VALUES_LIMIT;
  let hitLimit = false;
  for (let s = 0; s < data.length && !hitLimit; s++) {
    const dataFrame = data[s];
    const { timeField } = getTimeField(dataFrame);
    const view = new DataFrameView(dataFrame);
    for (let i = 0; i < dataFrame.fields.length && !hitLimit; i++) {
      const field = dataFrame.fields[i];
      const fieldLinksSupplier = field.getLinks;
      if (!fieldMatcher(field, dataFrame, data)) {
        continue;
      }
      let config = field.config;
      if ((_b = field.state) == null ? void 0 : _b.range) {
        config = __spreadValues(__spreadValues({}, config), (_c = field.state) == null ? void 0 : _c.range);
      }
      let displayName = (_d = field.config.displayName) != null ? _d : "";
      const display = (_e = field.display) != null ? _e : getDisplayProcessor({
        field,
        theme: options.theme,
        timeZone
      });
      if (reduceOptions.values) {
        for (let j = 0; j < field.values.length; j++) {
          field.state = setIndexForPaletteColor(field, values.length);
          const scopedVars = getFieldScopedVarsWithDataContexAndRowIndex(field, j);
          const displayValue = display(field.values[j]);
          const rowName = getSmartDisplayNameForRow(dataFrame, field, j, replaceVariables, scopedVars);
          const overrideColor = lookupRowColorFromOverride(rowName, options.fieldConfig, theme);
          values.push({
            name: "",
            field: config,
            display: __spreadProps(__spreadValues({}, displayValue), {
              title: rowName,
              color: overrideColor != null ? overrideColor : displayValue.color
            }),
            view,
            colIndex: i,
            rowIndex: j,
            getLinks: fieldLinksSupplier ? () => fieldLinksSupplier({
              valueRowIndex: j
            }) : () => [],
            hasLinks: hasLinks(field)
          });
          if (values.length >= limit) {
            hitLimit = true;
            break;
          }
        }
      } else {
        const results = reduceField({
          field,
          reducers: calcs
          // The stats to calculate
        });
        for (const calc of calcs) {
          const scopedVars = (_g = (_f = field.state) == null ? void 0 : _f.scopedVars) != null ? _g : {};
          scopedVars[VAR_CALC] = { value: calc, text: calc };
          const displayValue = display(results[calc]);
          if (displayName !== "") {
            displayValue.title = replaceVariables(displayName, scopedVars);
          } else {
            displayValue.title = getFieldDisplayName(field, dataFrame, data);
          }
          displayValue.percentChange = options.percentChange ? reduceField({ field, reducers: [ReducerID.diffperc] }).diffperc : void 0;
          let sparkline = void 0;
          if (options.sparkline) {
            sparkline = {
              y: dataFrame.fields[i],
              x: timeField
            };
            if (calc === ReducerID.last) {
              sparkline.highlightIndex = sparkline.y.values.length - 1;
            } else if (calc === ReducerID.first) {
              sparkline.highlightIndex = 0;
            }
          }
          const valueRowIndex = dataFrame.length === 1 ? 0 : void 0;
          values.push({
            name: calc,
            field: config,
            display: displayValue,
            sparkline,
            view,
            colIndex: i,
            getLinks: fieldLinksSupplier ? () => fieldLinksSupplier({
              calculatedValue: displayValue,
              valueRowIndex
            }) : () => [],
            hasLinks: hasLinks(field)
          });
        }
      }
    }
  }
  if (values.length === 0) {
    values.push(createNoValuesFieldDisplay(options));
  }
  return values;
};
function getSmartDisplayNameForRow(frame, field, rowIndex, replaceVariables, scopedVars) {
  var _a;
  const displayName = field.config.displayName;
  if (displayName) {
    if (displayName.indexOf(VAR_CELL_PREFIX)) {
      return replaceVariables(fixCellTemplateExpressions(displayName), scopedVars);
    }
    return replaceVariables(displayName, scopedVars);
  }
  let parts = [];
  let otherNumericFields = 0;
  for (const otherField of frame.fields) {
    if (otherField === field) {
      continue;
    }
    if (otherField.type === FieldType.string) {
      const value = (_a = otherField.values[rowIndex]) != null ? _a : "";
      const mappedValue = otherField.display ? otherField.display(value).text : value;
      if (mappedValue.length > 0) {
        parts.push(mappedValue);
      }
    } else if (otherField.type === FieldType.number) {
      otherNumericFields++;
    }
  }
  if (otherNumericFields || parts.length === 0) {
    parts.push(getFieldDisplayName(field, frame));
  }
  return parts.join(" ");
}
function setIndexForPaletteColor(field, currentLength) {
  return __spreadProps(__spreadValues({}, field.state), {
    seriesIndex: currentLength
  });
}
function lookupRowColorFromOverride(displayName, fieldConfig, theme) {
  for (const override of fieldConfig.overrides) {
    if (override.matcher.id === "byName" && override.matcher.options === displayName) {
      for (const prop of override.properties) {
        if (prop.id === "color" && prop.value) {
          return theme.visualization.getColorByName(prop.value.fixedColor);
        }
      }
    }
  }
  return null;
}
function hasLinks(field) {
  var _a, _b;
  return ((_b = (_a = field.config) == null ? void 0 : _a.links) == null ? void 0 : _b.length) ? field.config.links.length > 0 : false;
}
function getDisplayValueAlignmentFactors(values) {
  let maxTitle = "";
  let maxText = "";
  let maxPrefix = "";
  let maxSuffix = "";
  for (let i = 0; i < values.length; i++) {
    const v = values[i].display;
    if (v.text && v.text.length > maxText.length) {
      maxText = v.text;
    }
    if (v.title && v.title.length > maxTitle.length) {
      maxTitle = v.title;
    }
    if (v.prefix && v.prefix.length > maxPrefix.length) {
      maxPrefix = v.prefix;
    }
    if (v.suffix && v.suffix.length > maxSuffix.length) {
      maxSuffix = v.suffix;
    }
  }
  return { text: maxText, title: maxTitle, suffix: maxSuffix, prefix: maxPrefix };
}
function createNoValuesFieldDisplay(options) {
  var _a, _b;
  const displayName = "No data";
  const { fieldConfig, timeZone } = options;
  const { defaults } = fieldConfig;
  const displayProcessor = getDisplayProcessor({
    field: {
      type: FieldType.other,
      config: defaults
    },
    theme: options.theme,
    timeZone
  });
  const display = displayProcessor(null);
  const text = getDisplayText(display, displayName);
  return {
    name: displayName,
    field: __spreadProps(__spreadValues({}, defaults), {
      max: (_a = defaults.max) != null ? _a : 0,
      min: (_b = defaults.min) != null ? _b : 0
    }),
    display: {
      text,
      numeric: 0,
      color: display.color
    },
    hasLinks: false
  };
}
function getDisplayText(display, fallback) {
  if (!display || isEmpty(display.text)) {
    return fallback;
  }
  return display.text;
}
function fixCellTemplateExpressions(str) {
  return str.replace(
    /\${__cell_(\d+)(.*?)}|\[\[__cell_(\d+)(.*?)\]\]|\$__cell_(\d+)(\S*)/g,
    (match, cellNum1, fmt1, cellNum2, fmt2, cellNum3, fmt3) => {
      var _a, _b;
      return `\${__data.fields[${(_a = cellNum1 != null ? cellNum1 : cellNum2) != null ? _a : cellNum3}]${(_b = fmt1 != null ? fmt1 : fmt2) != null ? _b : fmt3}}`;
    }
  );
}
function getFieldScopedVarsWithDataContexAndRowIndex(field, rowIndex) {
  var _a, _b, _c, _d, _e, _f;
  if ((_b = (_a = field.state) == null ? void 0 : _a.scopedVars) == null ? void 0 : _b.__dataContext) {
    return __spreadProps(__spreadValues({}, (_c = field.state) == null ? void 0 : _c.scopedVars), {
      __dataContext: {
        value: __spreadProps(__spreadValues({}, (_e = (_d = field.state) == null ? void 0 : _d.scopedVars) == null ? void 0 : _e.__dataContext.value), {
          rowIndex
        })
      }
    });
  }
  return (_f = field.state) == null ? void 0 : _f.scopedVars;
}

export { DEFAULT_FIELD_DISPLAY_VALUES_LIMIT, VAR_CALC, VAR_CELL_PREFIX, VAR_FIELD_LABELS, VAR_FIELD_NAME, VAR_SERIES_NAME, fixCellTemplateExpressions, getDisplayValueAlignmentFactors, getFieldDisplayValues, hasLinks };
//# sourceMappingURL=fieldDisplay.js.map
