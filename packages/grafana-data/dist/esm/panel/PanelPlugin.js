import { set } from 'lodash';
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
import '../types/vector.js';
import { GrafanaPlugin } from '../types/plugin.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import '../dataframe/StreamingDataFrame.js';
import '../field/fieldColor.js';
import '../field/standardFieldConfigEditorRegistry.js';
import { FieldConfigOptionsRegistry } from '../field/FieldConfigOptionsRegistry.js';
import 'react';
import 'react-use/lib/usePrevious';
import 'tinycolor2';
import { deprecationWarning } from '../utils/deprecationWarning.js';
import 'papaparse';
import '../utils/binaryOperators.js';
import '../utils/unaryOperators.js';
import { PanelOptionsEditorBuilder } from '../utils/OptionsUIBuilders.js';
import 'marked';
import 'marked-mangle';
import '../text/sanitize.js';
import { createFieldConfigRegistry } from './registryFactories.js';

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelPlugin extends GrafanaPlugin {
  constructor(panel) {
    super();
    __publicField(this, "_defaults");
    __publicField(this, "_fieldConfigDefaults", {
      defaults: {},
      overrides: []
    });
    __publicField(this, "_fieldConfigRegistry");
    __publicField(this, "_initConfigRegistry", () => {
      return new FieldConfigOptionsRegistry();
    });
    __publicField(this, "optionsSupplier");
    __publicField(this, "suggestionsSupplier");
    __publicField(this, "panel");
    __publicField(this, "editor");
    __publicField(this, "onPanelMigration");
    __publicField(this, "onPanelTypeChanged");
    __publicField(this, "noPadding");
    __publicField(this, "dataSupport", {
      annotations: false,
      alertStates: false
    });
    /**
     * Legacy angular ctrl. If this exists it will be used instead of the panel
     */
    __publicField(this, "angularPanelCtrl");
    this.panel = panel;
  }
  get defaults() {
    let result = this._defaults || {};
    if (!this._defaults && this.optionsSupplier) {
      const builder = new PanelOptionsEditorBuilder();
      this.optionsSupplier(builder, { data: [] });
      for (const item of builder.getItems()) {
        if (item.defaultValue != null) {
          set(result, item.path, item.defaultValue);
        }
      }
    }
    return result;
  }
  get fieldConfigDefaults() {
    const configDefaults = this._fieldConfigDefaults.defaults;
    configDefaults.custom = {};
    for (const option of this.fieldConfigRegistry.list()) {
      if (option.defaultValue === void 0) {
        continue;
      }
      set(configDefaults, option.id, option.defaultValue);
    }
    return {
      defaults: __spreadValues({}, configDefaults),
      overrides: this._fieldConfigDefaults.overrides
    };
  }
  /**
   * @deprecated setDefaults is deprecated in favor of setPanelOptions
   */
  setDefaults(defaults) {
    deprecationWarning("PanelPlugin", "setDefaults", "setPanelOptions");
    this._defaults = defaults;
    return this;
  }
  get fieldConfigRegistry() {
    if (!this._fieldConfigRegistry) {
      this._fieldConfigRegistry = this._initConfigRegistry();
    }
    return this._fieldConfigRegistry;
  }
  /**
   * @deprecated setEditor is deprecated in favor of setPanelOptions
   */
  setEditor(editor) {
    deprecationWarning("PanelPlugin", "setEditor", "setPanelOptions");
    this.editor = editor;
    return this;
  }
  setNoPadding() {
    this.noPadding = true;
    return this;
  }
  /**
   * This function is called before the panel first loads if
   * the current version is different than the version that was saved.
   *
   * This is a good place to support any changes to the options model
   */
  setMigrationHandler(handler) {
    this.onPanelMigration = handler;
    return this;
  }
  /**
   * This function is called when the visualization was changed. This
   * passes in the panel model for previous visualisation options inspection
   * and panel model updates.
   *
   * This is useful for supporting PanelModel API updates when changing
   * between Angular and React panels.
   */
  setPanelChangeHandler(handler) {
    this.onPanelTypeChanged = handler;
    return this;
  }
  /**
   * Enables panel options editor creation
   *
   * @example
   * ```typescript
   *
   * import { ShapePanel } from './ShapePanel';
   *
   * interface ShapePanelOptions {}
   *
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *   .setPanelOptions(builder => {
   *     builder
   *       .addSelect({
   *         id: 'shape',
   *         name: 'Shape',
   *         description: 'Select shape to render'
   *         settings: {
   *           options: [
   *             {value: 'circle', label: 'Circle' },
   *             {value: 'square', label: 'Square },
   *             {value: 'triangle', label: 'Triangle }
   *            ]
   *         },
   *       })
   *   })
   * ```
   *
   * @public
   **/
  setPanelOptions(builder) {
    this.optionsSupplier = builder;
    return this;
  }
  /**
   * This is used while building the panel options editor.
   *
   * @internal
   */
  getPanelOptionsSupplier() {
    var _a;
    return (_a = this.optionsSupplier) != null ? _a : () => {
    };
  }
  /**
   * Tells Grafana if the plugin should subscribe to annotation and alertState results.
   *
   * @example
   * ```typescript
   *
   * import { ShapePanel } from './ShapePanel';
   *
   * interface ShapePanelOptions {}
   *
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *     .useFieldConfig({})
   *     ...
   *     ...
   *     .setDataSupport({
   *       annotations: true,
   *       alertStates: true,
   *     });
   * ```
   *
   * @public
   **/
  setDataSupport(support) {
    this.dataSupport = __spreadValues(__spreadValues({}, this.dataSupport), support);
    return this;
  }
  /**
   * Allows specifying which standard field config options panel should use and defining default values
   *
   * @example
   * ```typescript
   *
   * import { ShapePanel } from './ShapePanel';
   *
   * interface ShapePanelOptions {}
   *
   * // when plugin should use all standard options
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *  .useFieldConfig();
   *
   * // when plugin should only display specific standard options
   * // note, that options will be displayed in the order they are provided
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *  .useFieldConfig({
   *    standardOptions: [FieldConfigProperty.Min, FieldConfigProperty.Max]
   *   });
   *
   * // when standard option's default value needs to be provided
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *  .useFieldConfig({
   *    standardOptions: [FieldConfigProperty.Min, FieldConfigProperty.Max],
   *    standardOptionsDefaults: {
   *      [FieldConfigProperty.Min]: 20,
   *      [FieldConfigProperty.Max]: 100
   *    }
   *  });
   *
   * // when custom field config options needs to be provided
   * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
   *  .useFieldConfig({
   *    useCustomConfig: builder => {
   *      builder
   *       .addNumberInput({
   *         id: 'shapeBorderWidth',
   *         name: 'Border width',
   *         description: 'Border width of the shape',
   *         settings: {
   *           min: 1,
   *           max: 5,
   *         },
   *       })
   *       .addSelect({
   *         id: 'displayMode',
   *         name: 'Display mode',
   *         description: 'How the shape shout be rendered'
   *         settings: {
   *         options: [{value: 'fill', label: 'Fill' }, {value: 'transparent', label: 'Transparent }]
   *       },
   *     })
   *   },
   *  });
   *
   * ```
   *
   * @public
   */
  useFieldConfig(config = {}) {
    this._initConfigRegistry = () => createFieldConfigRegistry(config, this.meta.name);
    return this;
  }
  /**
   * Sets function that can return visualization examples and suggestions.
   * @alpha
   */
  setSuggestionsSupplier(supplier) {
    this.suggestionsSupplier = supplier;
    return this;
  }
  /**
   * Returns the suggestions supplier
   * @alpha
   */
  getSuggestionsSupplier() {
    return this.suggestionsSupplier;
  }
  hasPluginId(pluginId) {
    return this.meta.id === pluginId;
  }
}

export { PanelPlugin };
//# sourceMappingURL=PanelPlugin.js.map
