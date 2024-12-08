import { cloneDeep, isNumber, unset, set, get } from 'lodash';
import { useRef, useMemo } from 'react';
import usePrevious from 'react-use/lib/usePrevious';
import { VariableFormatID } from '@grafana/schema';
import '../vector/FunctionalVector.js';
import { FieldType } from '../types/dataFrame.js';
import { guessFieldTypeForField } from '../dataframe/processDataFrame.js';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import { FieldColorModeId } from '../types/fieldColor.js';
import '../types/legacyEvents.js';
import { compareArrayValues, compareDataFrameStructures } from '../dataframe/frameComparisons.js';
import '../dataframe/StreamingDataFrame.js';
import { asHexString } from '../themes/colorManipulator.js';
import { fieldMatchers } from '../transformations/matchers.js';
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
import 'papaparse';
import { getDisplayProcessor, getRawDisplayProcessor } from './displayProcessor.js';
import { standardFieldConfigEditorRegistry } from './standardFieldConfigEditorRegistry.js';
import './fieldColor.js';
import { mapInternalLinkToExplore } from '../utils/dataLinks.js';
import { getMinMaxAndDelta } from './scale.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import 'date-fns';
import '../utils/binaryOperators.js';
import '../utils/unaryOperators.js';
import { locationUtil } from '../utils/location.js';

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
function findNumericFieldMinMax(data) {
  let min = null;
  let max = null;
  const reducers = [ReducerID.min, ReducerID.max];
  for (const frame of data) {
    for (const field of frame.fields) {
      if (field.type === FieldType.number) {
        const stats = reduceField({ field, reducers });
        const statsMin = stats[ReducerID.min];
        const statsMax = stats[ReducerID.max];
        if (min === null || statsMin < min) {
          min = statsMin;
        }
        if (max === null || statsMax > max) {
          max = statsMax;
        }
      }
    }
  }
  return { min, max, delta: (max != null ? max : 0) - (min != null ? min : 0) };
}
function applyFieldOverrides(options) {
  var _a;
  if (!options.data) {
    return [];
  }
  const source = options.fieldConfig;
  if (!source) {
    return options.data;
  }
  const fieldConfigRegistry = (_a = options.fieldConfigRegistry) != null ? _a : standardFieldConfigEditorRegistry;
  let seriesIndex = 0;
  let globalRange = void 0;
  const override = [];
  if (source.overrides) {
    for (const rule of source.overrides) {
      const info = fieldMatchers.get(rule.matcher.id);
      if (info) {
        override.push({
          match: info.get(rule.matcher.options),
          properties: rule.properties
        });
      }
    }
  }
  return options.data.map((originalFrame, index) => {
    const newFrame = __spreadValues({}, originalFrame);
    newFrame.fields = newFrame.fields.map((field) => {
      return __spreadProps(__spreadValues({}, field), {
        config: cloneDeep(field.config),
        state: __spreadValues({}, field.state)
      });
    });
    for (const field of newFrame.fields) {
      const config = field.config;
      field.state.scopedVars = {
        __dataContext: {
          value: {
            data: options.data,
            frame: newFrame,
            frameIndex: index,
            field
          }
        }
      };
      const context = {
        field,
        data: options.data,
        dataFrameIndex: index,
        replaceVariables: options.replaceVariables,
        fieldConfigRegistry
      };
      setFieldConfigDefaults(config, source.defaults, context);
      for (const rule of override) {
        if (rule.match(field, newFrame, options.data)) {
          for (const prop of rule.properties) {
            setDynamicConfigValue(config, prop, context);
          }
        }
      }
      let type = field.type;
      if (!type || type === FieldType.other) {
        const t = guessFieldTypeForField(field);
        if (t) {
          type = t;
        }
      }
      const { range, newGlobalRange } = calculateRange(config, field, globalRange, options.data);
      globalRange = newGlobalRange;
      field.state.seriesIndex = seriesIndex;
      field.state.range = range;
      field.type = type;
      if (field.type !== FieldType.time) {
        seriesIndex++;
      }
      field.display = getDisplayProcessor({
        field,
        theme: options.theme,
        timeZone: options.timeZone
      });
      if (field.config.unit !== "dateTimeFromNow") {
        field.display = cachingDisplayProcessor(field.display, 2500);
      }
      field.getLinks = getLinksSupplier(
        newFrame,
        field,
        field.state.scopedVars,
        context.replaceVariables,
        options.timeZone,
        options.dataLinkPostProcessor
      );
      if (field.type === FieldType.nestedFrames) {
        for (const nestedFrames of field.values) {
          for (let nfIndex = 0; nfIndex < nestedFrames.length; nfIndex++) {
            for (const valueField of nestedFrames[nfIndex].fields) {
              valueField.display = getDisplayProcessor({
                field: valueField,
                theme: options.theme,
                timeZone: options.timeZone
              });
              valueField.state = {
                scopedVars: {
                  __dataContext: {
                    value: {
                      data: nestedFrames,
                      frame: nestedFrames[nfIndex],
                      frameIndex: nfIndex,
                      field: valueField
                    }
                  }
                }
              };
              valueField.getLinks = getLinksSupplier(
                nestedFrames[nfIndex],
                valueField,
                valueField.state.scopedVars,
                context.replaceVariables,
                options.timeZone,
                options.dataLinkPostProcessor
              );
            }
          }
        }
      }
    }
    return newFrame;
  });
}
function calculateRange(config, field, globalRange, data) {
  var _a, _b, _c, _d;
  if (field.type !== FieldType.number || isNumber(config.min) && isNumber(config.max)) {
    return { newGlobalRange: globalRange };
  }
  if (config.fieldMinMax) {
    const localRange = getMinMaxAndDelta(field);
    const min2 = (_a = config.min) != null ? _a : localRange.min;
    const max2 = (_b = config.max) != null ? _b : localRange.max;
    return { range: { min: min2, max: max2, delta: max2 - min2 }, newGlobalRange: globalRange };
  }
  const newGlobalRange = globalRange != null ? globalRange : findNumericFieldMinMax(data);
  const min = (_c = config.min) != null ? _c : newGlobalRange.min;
  const max = (_d = config.max) != null ? _d : newGlobalRange.max;
  return { range: { min, max, delta: max - min }, newGlobalRange };
}
function cachingDisplayProcessor(disp, maxCacheSize = 2500) {
  const caches = /* @__PURE__ */ new Map();
  for (let i = -1; i <= 15; i++) {
    caches.set(i, /* @__PURE__ */ new Map());
  }
  return (value, decimals) => {
    let cache = caches.get(decimals != null ? decimals : -1);
    let v = cache.get(value);
    if (!v) {
      if (cache.size === maxCacheSize) {
        cache.clear();
      }
      v = disp(value, decimals);
      if (v.color) {
        v.color = asHexString(v.color);
      }
      cache.set(value, v);
    }
    return v;
  };
}
function setDynamicConfigValue(config, value, context) {
  const reg = context.fieldConfigRegistry;
  const item = reg.getIfExists(value.id);
  if (!item) {
    return;
  }
  const val = item.process(value.value, context, item.settings);
  const remove = val === void 0 || val === null;
  if (remove) {
    if (item.isCustom && config.custom) {
      unset(config.custom, item.path);
    } else {
      unset(config, item.path);
    }
  } else {
    if (item.isCustom) {
      if (!config.custom) {
        config.custom = {};
      }
      set(config.custom, item.path, val);
    } else {
      set(config, item.path, val);
    }
  }
}
function setFieldConfigDefaults(config, defaults, context) {
  if (config.links && defaults.links) {
    config.links = [...config.links, ...defaults.links];
  }
  for (const fieldConfigProperty of context.fieldConfigRegistry.list()) {
    if (fieldConfigProperty.isCustom && !config.custom) {
      config.custom = {};
    }
    processFieldConfigValue(
      fieldConfigProperty.isCustom ? config.custom : config,
      fieldConfigProperty.isCustom ? defaults.custom : defaults,
      fieldConfigProperty,
      context
    );
  }
  validateFieldConfig(config);
}
function processFieldConfigValue(destination, source, fieldConfigProperty, context) {
  const currentConfig = get(destination, fieldConfigProperty.path);
  if (currentConfig === null || currentConfig === void 0) {
    const item = context.fieldConfigRegistry.getIfExists(fieldConfigProperty.id);
    if (!item) {
      return;
    }
    if (item && item.shouldApply(context.field)) {
      const val = item.process(get(source, item.path), context, item.settings);
      if (val !== void 0 && val !== null) {
        set(destination, item.path, val);
      }
    }
  }
}
function validateFieldConfig(config) {
  const { thresholds } = config;
  if (!config.color) {
    if (thresholds) {
      config.color = {
        mode: FieldColorModeId.Thresholds
      };
    }
  } else if (!config.color.mode) {
    delete config.color;
  }
  if (config.hasOwnProperty("min") && config.hasOwnProperty("max") && config.min > config.max) {
    const tmp = config.max;
    config.max = config.min;
    config.min = tmp;
  }
}
const defaultInternalLinkPostProcessor = (options) => {
  const { link, linkModel, dataLinkScopedVars, field, replaceVariables } = options;
  if (link.internal) {
    return mapInternalLinkToExplore({
      link,
      internalLink: link.internal,
      scopedVars: dataLinkScopedVars,
      field,
      range: link.internal.range,
      replaceVariables
    });
  } else {
    return linkModel;
  }
};
const getLinksSupplier = (frame, field, fieldScopedVars, replaceVariables, timeZone, dataLinkPostProcessor) => (config) => {
  if (!field.config.links || field.config.links.length === 0) {
    return [];
  }
  const linkModels = field.config.links.map((link) => {
    const dataContext = getFieldDataContextClone(frame, field, fieldScopedVars);
    const dataLinkScopedVars = __spreadProps(__spreadValues({}, fieldScopedVars), {
      __dataContext: dataContext
    });
    const boundReplaceVariables = (value, scopedVars, format) => replaceVariables(value, __spreadValues(__spreadValues({}, dataLinkScopedVars), scopedVars), format);
    if (config.valueRowIndex !== void 0 && !isNaN(config.valueRowIndex)) {
      dataContext.value.rowIndex = config.valueRowIndex;
    } else {
      dataContext.value.calculatedValue = config.calculatedValue;
    }
    let linkModel;
    let href = link.onClick || !link.onBuildUrl ? link.url : link.onBuildUrl({
      origin: field,
      replaceVariables: boundReplaceVariables
    });
    if (href) {
      href = locationUtil.assureBaseUrl(href.replace(/\n/g, ""));
      href = replaceVariables(href, dataLinkScopedVars, VariableFormatID.UriEncode);
      href = locationUtil.processUrl(href);
    }
    if (link.onClick) {
      linkModel = {
        href,
        title: replaceVariables(link.title || "", dataLinkScopedVars),
        target: link.targetBlank ? "_blank" : void 0,
        onClick: (evt, origin) => {
          link.onClick({
            origin: origin != null ? origin : field,
            e: evt,
            replaceVariables: boundReplaceVariables
          });
        },
        origin: field
      };
    } else {
      linkModel = {
        href,
        title: replaceVariables(link.title || "", dataLinkScopedVars),
        target: link.targetBlank ? "_blank" : void 0,
        origin: field
      };
    }
    return (dataLinkPostProcessor || defaultInternalLinkPostProcessor)({
      frame,
      field,
      dataLinkScopedVars,
      replaceVariables,
      config,
      link,
      linkModel
    });
  });
  return linkModels.filter((link) => !!link);
};
function applyRawFieldOverrides(data) {
  if (!data || data.length === 0) {
    return [];
  }
  const newData = [...data];
  const processor = getRawDisplayProcessor();
  for (let frameIndex = 0; frameIndex < newData.length; frameIndex++) {
    const newFrame = __spreadValues({}, newData[frameIndex]);
    const newFields = [...newFrame.fields];
    for (let fieldIndex = 0; fieldIndex < newFields.length; fieldIndex++) {
      newFields[fieldIndex] = __spreadProps(__spreadValues({}, newFields[fieldIndex]), {
        display: processor
      });
    }
    newData[frameIndex] = __spreadProps(__spreadValues({}, newFrame), {
      fields: newFields
    });
  }
  return newData;
}
function useFieldOverrides(plugin, fieldConfig, data, timeZone, theme, replace, dataLinkPostProcessor) {
  const fieldConfigRegistry = plugin == null ? void 0 : plugin.fieldConfigRegistry;
  const structureRev = useRef(0);
  const prevSeries = usePrevious(data == null ? void 0 : data.series);
  return useMemo(() => {
    if (!fieldConfigRegistry || !fieldConfig || !data) {
      return;
    }
    const series = data == null ? void 0 : data.series;
    if (data.structureRev == null && series && prevSeries && !compareArrayValues(series, prevSeries, compareDataFrameStructures)) {
      structureRev.current++;
    }
    const panelData = __spreadProps(__spreadValues({
      structureRev: structureRev.current
    }, data), {
      series: applyFieldOverrides({
        data: series,
        fieldConfig,
        fieldConfigRegistry,
        replaceVariables: replace,
        theme,
        timeZone,
        dataLinkPostProcessor
      })
    });
    if (data.annotations && data.annotations.length > 0) {
      panelData.annotations = applyFieldOverrides({
        data: data.annotations,
        fieldConfig: {
          defaults: {},
          overrides: []
        },
        replaceVariables: replace,
        theme,
        timeZone,
        dataLinkPostProcessor
      });
    }
    return panelData;
  }, [fieldConfigRegistry, fieldConfig, data, prevSeries, timeZone, theme, replace, dataLinkPostProcessor]);
}
function getFieldDataContextClone(frame, field, fieldScopedVars) {
  if (fieldScopedVars == null ? void 0 : fieldScopedVars.__dataContext) {
    return {
      value: __spreadValues({}, fieldScopedVars.__dataContext.value)
    };
  }
  return { value: { frame, field, data: [frame] } };
}

export { applyFieldOverrides, applyRawFieldOverrides, findNumericFieldMinMax, getLinksSupplier, setDynamicConfigValue, setFieldConfigDefaults, useFieldOverrides, validateFieldConfig };
//# sourceMappingURL=fieldOverrides.js.map
