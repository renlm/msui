import { cloneDeep, set } from 'lodash';
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
import { isObject } from '../types/data.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import '../dataframe/StreamingDataFrame.js';
import '../field/fieldColor.js';
import { standardEditorsRegistry } from '../field/standardFieldConfigEditorRegistry.js';
import { numberOverrideProcessor, stringOverrideProcessor, selectOverrideProcessor, booleanOverrideProcessor, identityOverrideProcessor, unitOverrideProcessor } from '../field/overrides/processors.js';
import 'react';
import 'react-use/lib/usePrevious';
import 'tinycolor2';
import 'papaparse';
import './binaryOperators.js';
import './unaryOperators.js';
import { OptionsUIRegistryBuilder } from '../types/OptionsUIRegistryBuilder.js';
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FieldConfigEditorBuilder extends OptionsUIRegistryBuilder {
  addNumberInput(config) {
    var _a;
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("number").editor,
      editor: standardEditorsRegistry.get("number").editor,
      process: numberOverrideProcessor,
      shouldApply: (_a = config.shouldApply) != null ? _a : () => true,
      settings: config.settings || {}
    }));
  }
  addSliderInput(config) {
    var _a;
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("slider").editor,
      editor: standardEditorsRegistry.get("slider").editor,
      process: numberOverrideProcessor,
      shouldApply: (_a = config.shouldApply) != null ? _a : () => true,
      settings: config.settings || {}
    }));
  }
  addTextInput(config) {
    var _a;
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("text").editor,
      editor: standardEditorsRegistry.get("text").editor,
      process: stringOverrideProcessor,
      shouldApply: (_a = config.shouldApply) != null ? _a : () => true,
      settings: config.settings || {}
    }));
  }
  addSelect(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("select").editor,
      editor: standardEditorsRegistry.get("select").editor,
      process: selectOverrideProcessor,
      // ???
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || { options: [] }
    }));
  }
  addRadio(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("radio").editor,
      editor: standardEditorsRegistry.get("radio").editor,
      process: selectOverrideProcessor,
      // ???
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || { options: [] }
    }));
  }
  addBooleanSwitch(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("boolean").editor,
      override: standardEditorsRegistry.get("boolean").editor,
      process: booleanOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addColorPicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("color").editor,
      override: standardEditorsRegistry.get("color").editor,
      process: identityOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addUnitPicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("unit").editor,
      override: standardEditorsRegistry.get("unit").editor,
      process: unitOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addFieldNamePicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("field-name").editor,
      override: standardEditorsRegistry.get("field-name").editor,
      process: identityOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addGenericEditor(config, editor) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor,
      override: editor,
      process: identityOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
}
class NestedPanelOptionsBuilder {
  constructor(cfg) {
    this.cfg = cfg;
    __publicField(this, "path", "");
    __publicField(this, "category");
    __publicField(this, "defaultValue");
    __publicField(this, "id", "nested-panel-options");
    __publicField(this, "name", "nested");
    __publicField(this, "editor", () => null);
    __publicField(this, "getBuilder", () => {
      return this.cfg.build;
    });
    __publicField(this, "getNestedValueAccess", (parent) => {
      const values = this.cfg.values;
      if (values) {
        return values(parent);
      }
      return {
        getValue: (path) => parent.getValue(`${this.path}.${path}`),
        onChange: (path, value) => parent.onChange(`${this.path}.${path}`, value)
      };
    });
    this.path = cfg.path;
    this.category = cfg.category;
    this.defaultValue = this.getDefaultValue(cfg);
  }
  getDefaultValue(cfg) {
    let result = isObject(cfg.defaultValue) ? cloneDeep(cfg.defaultValue) : {};
    const builder = new PanelOptionsEditorBuilder();
    cfg.build(builder, { data: [] });
    for (const item of builder.getItems()) {
      if (item.defaultValue != null) {
        set(result, item.path, item.defaultValue);
      }
    }
    return result;
  }
}
class PanelOptionsEditorBuilder extends OptionsUIRegistryBuilder {
  addNestedOptions(opts) {
    const s = new NestedPanelOptionsBuilder(opts);
    return this.addCustomEditor(s);
  }
  addNumberInput(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("number").editor
    }));
  }
  addSliderInput(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("slider").editor
    }));
  }
  addTextInput(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("text").editor
    }));
  }
  addStringArray(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("strings").editor
    }));
  }
  addSelect(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("select").editor
    }));
  }
  addMultiSelect(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("multi-select").editor
    }));
  }
  addRadio(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("radio").editor
    }));
  }
  addBooleanSwitch(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("boolean").editor
    }));
  }
  addColorPicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("color").editor,
      settings: config.settings || {}
    }));
  }
  addTimeZonePicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("timezone").editor,
      settings: config.settings || {}
    }));
  }
  addUnitPicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("unit").editor
    }));
  }
  addFieldNamePicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("field-name").editor
    }));
  }
  addDashboardPicker(config) {
    return this.addCustomEditor(__spreadProps(__spreadValues({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("dashboard-uid").editor
      // added at runtime
    }));
  }
}

export { FieldConfigEditorBuilder, NestedPanelOptionsBuilder, PanelOptionsEditorBuilder };
//# sourceMappingURL=OptionsUIBuilders.js.map
