import { makeClassES5Compatible } from '../utils/makeClassES5Compatible.js';
import { GrafanaPlugin } from './plugin.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataSourcePlugin extends GrafanaPlugin {
  constructor(DataSourceClass) {
    super();
    this.DataSourceClass = DataSourceClass;
    __publicField(this, "components", {});
  }
  setConfigEditor(editor) {
    this.components.ConfigEditor = editor;
    return this;
  }
  setConfigCtrl(ConfigCtrl) {
    this.angularConfigCtrl = ConfigCtrl;
    return this;
  }
  setQueryCtrl(QueryCtrl) {
    this.components.QueryCtrl = QueryCtrl;
    return this;
  }
  /** @deprecated -- register the annotation support in the instance constructor */
  setAnnotationQueryCtrl(AnnotationsQueryCtrl) {
    this.components.AnnotationsQueryCtrl = AnnotationsQueryCtrl;
    return this;
  }
  setQueryEditor(QueryEditor) {
    this.components.QueryEditor = QueryEditor;
    return this;
  }
  /** @deprecated Use `setQueryEditor` instead. When using Explore `props.app` is equal to `CoreApp.Explore` */
  setExploreQueryField(ExploreQueryField) {
    this.components.ExploreQueryField = ExploreQueryField;
    return this;
  }
  /** @deprecated Use `setQueryEditor` instead. */
  setExploreMetricsQueryField(ExploreQueryField) {
    this.components.ExploreMetricsQueryField = ExploreQueryField;
    return this;
  }
  /** @deprecated Use `setQueryEditor` instead. */
  setExploreLogsQueryField(ExploreQueryField) {
    this.components.ExploreLogsQueryField = ExploreQueryField;
    return this;
  }
  setQueryEditorHelp(QueryEditorHelp) {
    this.components.QueryEditorHelp = QueryEditorHelp;
    return this;
  }
  /**
   * @deprecated prefer using `setQueryEditorHelp`
   */
  setExploreStartPage(ExploreStartPage) {
    return this.setQueryEditorHelp(ExploreStartPage);
  }
  /**
   * @deprecated -- prefer using {@link StandardVariableSupport} or {@link CustomVariableSupport} or {@link DataSourceVariableSupport} in data source instead
   */
  setVariableQueryEditor(VariableQueryEditor) {
    this.components.VariableQueryEditor = VariableQueryEditor;
    return this;
  }
  setMetadataInspector(MetadataInspector) {
    this.components.MetadataInspector = MetadataInspector;
    return this;
  }
  setComponentsFromLegacyExports(pluginExports) {
    this.angularConfigCtrl = pluginExports.ConfigCtrl;
    this.components.QueryCtrl = pluginExports.QueryCtrl;
    this.components.AnnotationsQueryCtrl = pluginExports.AnnotationsQueryCtrl;
    this.components.ExploreQueryField = pluginExports.ExploreQueryField;
    this.components.QueryEditor = pluginExports.QueryEditor;
    this.components.QueryEditorHelp = pluginExports.QueryEditorHelp;
    this.components.VariableQueryEditor = pluginExports.VariableQueryEditor;
  }
}
class DataSourceApi {
  constructor(instanceSettings) {
    /**
     *  Set in constructor
     */
    __publicField(this, "name");
    /**
     *  Set in constructor
     */
    __publicField(this, "id");
    /**
     *  Set in constructor
     */
    __publicField(this, "type");
    /**
     *  Set in constructor
     */
    __publicField(this, "uid");
    /**
     *  min interval range
     */
    __publicField(this, "interval");
    /**
     * Initializes a datasource after instantiation
     */
    __publicField(this, "init");
    /**
     * Set after constructor call, as the data source instance is the most common thing to pass around
     * we attach the components to this instance for easy access
     */
    __publicField(this, "components");
    /**
     * static information about the datasource
     */
    __publicField(this, "meta");
    /**
     * Information about the datasource's query caching configuration
     * When the caching feature is disabled, this config will always be falsy
     */
    __publicField(this, "cachingConfig");
    /**
     * Used in explore
     */
    __publicField(this, "languageProvider");
    /**
     * An annotation processor allows explicit control for how annotations are managed.
     *
     * It is only necessary to configure an annotation processor if the default behavior is not desirable
     */
    __publicField(this, "annotations");
    /**
     * Defines new variable support
     * @alpha -- experimental
     */
    __publicField(this, "variables");
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.type = instanceSettings.type;
    this.meta = instanceSettings.meta;
    this.cachingConfig = instanceSettings.cachingConfig;
    this.uid = instanceSettings.uid;
  }
  /**
   * Optionally, you can implement this method to prevent certain queries from being executed.
   * Return false to prevent the query from being executed.
   */
  filterQuery(query) {
    return true;
  }
  /** Get an identifier object for this datasource instance */
  getRef() {
    return { type: this.type, uid: this.uid };
  }
}
var ExploreMode = /* @__PURE__ */ ((ExploreMode2) => {
  ExploreMode2["Logs"] = "Logs";
  ExploreMode2["Metrics"] = "Metrics";
  ExploreMode2["Tracing"] = "Tracing";
  return ExploreMode2;
})(ExploreMode || {});
var DataQueryErrorType = /* @__PURE__ */ ((DataQueryErrorType2) => {
  DataQueryErrorType2["Cancelled"] = "cancelled";
  DataQueryErrorType2["Timeout"] = "timeout";
  DataQueryErrorType2["Unknown"] = "unknown";
  return DataQueryErrorType2;
})(DataQueryErrorType || {});
class LanguageProvider {
  constructor() {
    __publicField(this, "startTask");
  }
}
LanguageProvider = makeClassES5Compatible(LanguageProvider);
DataSourceApi = makeClassES5Compatible(DataSourceApi);

export { DataQueryErrorType, DataSourceApi, DataSourcePlugin, ExploreMode, LanguageProvider };
//# sourceMappingURL=datasource.js.map
