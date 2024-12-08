import 'lodash';
import '../vector/FunctionalVector.js';
import '../datetime/moment_wrapper.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';
import '../transformations/matchers.js';
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
import '../transformations/fieldReducer.js';
import 'rxjs';
import 'rxjs/operators';
import '../transformations/standardTransformersRegistry.js';
import '../transformations/matchers/nameMatcher.js';
import { MappingType, SpecialValueMatch } from '../types/valueMapping.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import '../dataframe/StreamingDataFrame.js';
import { stringToJsRegex } from '../text/string.js';
import '../field/fieldColor.js';
import { getActiveThreshold } from '../field/thresholds.js';
import '../field/standardFieldConfigEditorRegistry.js';
import 'react';
import 'react-use/lib/usePrevious';
import 'tinycolor2';
import 'papaparse';
import './binaryOperators.js';
import './unaryOperators.js';
import 'marked';
import 'marked-mangle';
import '../text/sanitize.js';

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
function getValueMappingResult(valueMappings, value) {
  for (const vm of valueMappings) {
    switch (vm.type) {
      case MappingType.ValueToText:
        if (value == null) {
          continue;
        }
        const result = vm.options[value];
        if (result) {
          return result;
        }
        break;
      case MappingType.RangeToText:
        if (value == null) {
          continue;
        }
        const valueAsNumber = parseFloat(value);
        if (isNaN(valueAsNumber)) {
          continue;
        }
        const isNumFrom = !isNaN(vm.options.from);
        if (isNumFrom && valueAsNumber < vm.options.from) {
          continue;
        }
        const isNumTo = !isNaN(vm.options.to);
        if (isNumTo && valueAsNumber > vm.options.to) {
          continue;
        }
        return vm.options.result;
      case MappingType.RegexToText:
        if (value == null) {
          continue;
        }
        if (typeof value !== "string") {
          continue;
        }
        const regex = stringToJsRegex(vm.options.pattern);
        if (value.match(regex)) {
          const res = __spreadValues({}, vm.options.result);
          if (res.text != null) {
            res.text = value.replace(regex, vm.options.result.text || "");
          }
          return res;
        }
      case MappingType.SpecialValue:
        switch (vm.options.match) {
          case SpecialValueMatch.Null: {
            if (value == null) {
              return vm.options.result;
            }
            break;
          }
          case SpecialValueMatch.NaN: {
            if (typeof value === "number" && isNaN(value)) {
              return vm.options.result;
            }
            break;
          }
          case SpecialValueMatch.NullAndNaN: {
            if (typeof value === "number" && isNaN(value) || value == null) {
              return vm.options.result;
            }
            break;
          }
          case SpecialValueMatch.True: {
            if (value === true || value === "true") {
              return vm.options.result;
            }
            break;
          }
          case SpecialValueMatch.False: {
            if (value === false || value === "false") {
              return vm.options.result;
            }
            break;
          }
          case SpecialValueMatch.Empty: {
            if (value === "") {
              return vm.options.result;
            }
            break;
          }
        }
    }
  }
  return null;
}
var LegacyMappingType = /* @__PURE__ */ ((LegacyMappingType2) => {
  LegacyMappingType2[LegacyMappingType2["ValueToText"] = 1] = "ValueToText";
  LegacyMappingType2[LegacyMappingType2["RangeToText"] = 2] = "RangeToText";
  return LegacyMappingType2;
})(LegacyMappingType || {});
function convertOldAngularValueMappings(panel, migratedThresholds) {
  var _a, _b, _c, _d;
  const mappings = [];
  let mappingType = panel.mappingType;
  if (!panel.mappingType) {
    if (panel.valueMaps && panel.valueMaps.length) {
      mappingType = 1;
    } else if (panel.rangeMaps && panel.rangeMaps.length) {
      mappingType = 2;
    }
  }
  if (mappingType === 1) {
    for (let i = 0; i < panel.valueMaps.length; i++) {
      const map = panel.valueMaps[i];
      mappings.push(
        upgradeOldAngularValueMapping(
          __spreadProps(__spreadValues({}, map), {
            id: i,
            // used for order
            type: MappingType.ValueToText
          }),
          ((_b = (_a = panel.fieldConfig) == null ? void 0 : _a.defaults) == null ? void 0 : _b.thresholds) || migratedThresholds
        )
      );
    }
  } else if (mappingType === 2) {
    for (let i = 0; i < panel.rangeMaps.length; i++) {
      const map = panel.rangeMaps[i];
      mappings.push(
        upgradeOldAngularValueMapping(
          __spreadProps(__spreadValues({}, map), {
            id: i,
            // used for order
            type: MappingType.RangeToText
          }),
          ((_d = (_c = panel.fieldConfig) == null ? void 0 : _c.defaults) == null ? void 0 : _d.thresholds) || migratedThresholds
        )
      );
    }
  }
  return mappings;
}
function upgradeOldAngularValueMapping(old, thresholds) {
  const valueMaps = { type: MappingType.ValueToText, options: {} };
  const newMappings = [];
  let color = void 0;
  const numeric = parseFloat(old.text);
  if (thresholds && !isNaN(numeric)) {
    const level = getActiveThreshold(numeric, thresholds.steps);
    if (level && level.color) {
      color = level.color;
    }
  }
  switch (old.type) {
    case 1 /* ValueToText */:
    case MappingType.ValueToText:
      if (old.value != null) {
        if (old.value === "null") {
          newMappings.push({
            type: MappingType.SpecialValue,
            options: {
              match: SpecialValueMatch.Null,
              result: { text: old.text, color }
            }
          });
        } else {
          valueMaps.options[String(old.value)] = {
            text: old.text,
            color
          };
        }
      }
      break;
    case 2 /* RangeToText */:
    case MappingType.RangeToText:
      if (old.from === "null" || old.to === "null") {
        newMappings.push({
          type: MappingType.SpecialValue,
          options: {
            match: SpecialValueMatch.Null,
            result: { text: old.text, color }
          }
        });
      } else {
        newMappings.push({
          type: MappingType.RangeToText,
          options: {
            from: +old.from,
            to: +old.to,
            result: { text: old.text, color }
          }
        });
      }
      break;
  }
  if (Object.keys(valueMaps.options).length > 0) {
    newMappings.unshift(valueMaps);
  }
  return newMappings[0];
}

export { LegacyMappingType, convertOldAngularValueMappings, getValueMappingResult };
//# sourceMappingURL=valueMappings.js.map
