'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var schema = require('@grafana/schema');
var moment = require('moment');
var lodash = require('lodash');
var Papa = require('papaparse');
var moment$1 = require('moment-timezone');
var dateFns = require('date-fns');
var marked = require('marked');
var markedMangle = require('marked-mangle');
var sanitizeUrl$1 = require('@braintree/sanitize-url');
var DOMPurify = require('dompurify');
var xss = require('xss');
var operators = require('rxjs/operators');
var rxjs = require('rxjs');
var d3Interpolate = require('d3-interpolate');
var stringHash = require('string-hash');
var tinycolor = require('tinycolor2');
var React = require('react');
var usePrevious = require('react-use/lib/usePrevious');
var EventEmitter = require('eventemitter3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var Papa__default = /*#__PURE__*/_interopDefaultLegacy(Papa);
var moment__default$1 = /*#__PURE__*/_interopDefaultLegacy(moment$1);
var DOMPurify__default = /*#__PURE__*/_interopDefaultLegacy(DOMPurify);
var xss__namespace = /*#__PURE__*/_interopNamespace(xss);
var stringHash__default = /*#__PURE__*/_interopDefaultLegacy(stringHash);
var tinycolor__default = /*#__PURE__*/_interopDefaultLegacy(tinycolor);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var usePrevious__default = /*#__PURE__*/_interopDefaultLegacy(usePrevious);
var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);

function moveItemImmutably(arr, from, to) {
  const clone = [...arr];
  Array.prototype.splice.call(clone, to, 0, Array.prototype.splice.call(clone, from, 1)[0]);
  return clone;
}
function insertBeforeImmutably(array, item, index) {
  if (index < 0 || index > array.length) {
    throw new Error("Index out of bounds");
  }
  const clone = [...array];
  clone.splice(index, 0, item);
  return clone;
}
function insertAfterImmutably(array, item, index) {
  if (index < 0 || index > array.length) {
    throw new Error("Index out of bounds");
  }
  const clone = [...array];
  clone.splice(index + 1, 0, item);
  return clone;
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
const numericCompare = (a, b) => a - b;
function sortValues(sort) {
  return (a, b) => {
    if (a === b) {
      return 0;
    }
    if (b == null || typeof b === "string" && b.trim() === "") {
      return -1;
    }
    if (a == null || typeof a === "string" && (a == null ? void 0 : a.trim()) === "") {
      return 1;
    }
    let compareFn = collator.compare;
    if (typeof a === "number" && typeof b === "number") {
      compareFn = numericCompare;
    }
    if (sort === schema.SortOrder.Descending) {
      return compareFn(b, a);
    }
    return compareFn(a, b);
  };
}

var arrayUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  moveItemImmutably: moveItemImmutably,
  insertBeforeImmutably: insertBeforeImmutably,
  insertAfterImmutably: insertAfterImmutably,
  sortValues: sortValues
});

const GAUGE_DEFAULT_MINIMUM = 0;
const GAUGE_DEFAULT_MAXIMUM = 100;
const DEFAULT_SAML_NAME = "SAML";

var LoadingState = /* @__PURE__ */ ((LoadingState2) => {
  LoadingState2["NotStarted"] = "NotStarted";
  LoadingState2["Loading"] = "Loading";
  LoadingState2["Streaming"] = "Streaming";
  LoadingState2["Done"] = "Done";
  LoadingState2["Error"] = "Error";
  return LoadingState2;
})(LoadingState || {});
const preferredVisualizationTypes = [
  "graph",
  "table",
  "logs",
  "trace",
  "nodeGraph",
  "flamegraph",
  "rawPrometheus"
];
var NullValueMode = /* @__PURE__ */ ((NullValueMode2) => {
  NullValueMode2["Null"] = "null";
  NullValueMode2["Ignore"] = "connected";
  NullValueMode2["AsZero"] = "null as zero";
  return NullValueMode2;
})(NullValueMode || {});
const isTruthy = (value) => Boolean(value);
function isObject(value) {
  if (typeof value === "object" && value !== null) {
    return true;
  }
  return false;
}

var FieldType = /* @__PURE__ */ ((FieldType2) => {
  FieldType2["time"] = "time";
  FieldType2["number"] = "number";
  FieldType2["string"] = "string";
  FieldType2["boolean"] = "boolean";
  FieldType2["trace"] = "trace";
  FieldType2["geo"] = "geo";
  FieldType2["enum"] = "enum";
  FieldType2["other"] = "other";
  FieldType2["frame"] = "frame";
  FieldType2["nestedFrames"] = "nestedFrames";
  return FieldType2;
})(FieldType || {});
const TIME_SERIES_VALUE_FIELD_NAME = "Value";
const TIME_SERIES_TIME_FIELD_NAME = "Time";
const TIME_SERIES_METRIC_FIELD_NAME = "Metric";

var DataFrameType = /* @__PURE__ */ ((DataFrameType2) => {
  DataFrameType2["TimeSeriesWide"] = "timeseries-wide";
  DataFrameType2["TimeSeriesLong"] = "timeseries-long";
  DataFrameType2["TimeSeriesMany"] = "timeseries-many";
  DataFrameType2["TimeSeriesMulti"] = "timeseries-multi";
  DataFrameType2["NumericWide"] = "numeric-wide";
  DataFrameType2["NumericMulti"] = "numeric-multi";
  DataFrameType2["NumericLong"] = "numeric-long";
  DataFrameType2["LogLines"] = "log-lines";
  DataFrameType2["DirectoryListing"] = "directory-listing";
  DataFrameType2["HeatmapRows"] = "heatmap-rows";
  DataFrameType2["HeatmapCells"] = "heatmap-cells";
  DataFrameType2["Histogram"] = "histogram";
  return DataFrameType2;
})(DataFrameType || {});

var DataLinkConfigOrigin = /* @__PURE__ */ ((DataLinkConfigOrigin2) => {
  DataLinkConfigOrigin2["Datasource"] = "Datasource";
  DataLinkConfigOrigin2["Correlations"] = "Correlations";
  DataLinkConfigOrigin2["ExploreCorrelationsEditor"] = "CorrelationsEditor";
  return DataLinkConfigOrigin2;
})(DataLinkConfigOrigin || {});
var SupportedTransformationType = /* @__PURE__ */ ((SupportedTransformationType2) => {
  SupportedTransformationType2["Regex"] = "regex";
  SupportedTransformationType2["Logfmt"] = "logfmt";
  return SupportedTransformationType2;
})(SupportedTransformationType || {});
var VariableOrigin = /* @__PURE__ */ ((VariableOrigin2) => {
  VariableOrigin2["Series"] = "series";
  VariableOrigin2["Field"] = "field";
  VariableOrigin2["Fields"] = "fields";
  VariableOrigin2["Value"] = "value";
  VariableOrigin2["BuiltIn"] = "built-in";
  VariableOrigin2["Template"] = "template";
  return VariableOrigin2;
})(VariableOrigin || {});
var VariableSuggestionsScope = /* @__PURE__ */ ((VariableSuggestionsScope2) => {
  VariableSuggestionsScope2["Values"] = "values";
  return VariableSuggestionsScope2;
})(VariableSuggestionsScope || {});

var DashboardCursorSync = /* @__PURE__ */ ((DashboardCursorSync2) => {
  DashboardCursorSync2[DashboardCursorSync2["Off"] = 0] = "Off";
  DashboardCursorSync2[DashboardCursorSync2["Crosshair"] = 1] = "Crosshair";
  DashboardCursorSync2[DashboardCursorSync2["Tooltip"] = 2] = "Tooltip";
  return DashboardCursorSync2;
})(DashboardCursorSync || {});

var AbstractLabelOperator = /* @__PURE__ */ ((AbstractLabelOperator2) => {
  AbstractLabelOperator2["Equal"] = "Equal";
  AbstractLabelOperator2["NotEqual"] = "NotEqual";
  AbstractLabelOperator2["EqualRegEx"] = "EqualRegEx";
  AbstractLabelOperator2["NotEqualRegEx"] = "NotEqualRegEx";
  return AbstractLabelOperator2;
})(AbstractLabelOperator || {});
const hasQueryImportSupport = (datasource) => {
  if (!datasource || typeof datasource !== "object") {
    return false;
  }
  return "importFromAbstractQueries" in datasource;
};
const hasQueryExportSupport = (datasource) => {
  if (!datasource || typeof datasource !== "object") {
    return false;
  }
  return "exportToAbstractQueries" in datasource;
};

var AnnotationEventFieldSource = /* @__PURE__ */ ((AnnotationEventFieldSource2) => {
  AnnotationEventFieldSource2["Field"] = "field";
  AnnotationEventFieldSource2["Text"] = "text";
  AnnotationEventFieldSource2["Skip"] = "skip";
  return AnnotationEventFieldSource2;
})(AnnotationEventFieldSource || {});

var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["emerg"] = "critical";
  LogLevel2["fatal"] = "critical";
  LogLevel2["alert"] = "critical";
  LogLevel2["crit"] = "critical";
  LogLevel2["critical"] = "critical";
  LogLevel2["warn"] = "warning";
  LogLevel2["warning"] = "warning";
  LogLevel2["err"] = "error";
  LogLevel2["eror"] = "error";
  LogLevel2["error"] = "error";
  LogLevel2["info"] = "info";
  LogLevel2["information"] = "info";
  LogLevel2["informational"] = "info";
  LogLevel2["notice"] = "info";
  LogLevel2["dbug"] = "debug";
  LogLevel2["debug"] = "debug";
  LogLevel2["trace"] = "trace";
  LogLevel2["unknown"] = "unknown";
  return LogLevel2;
})(LogLevel || {});
const NumericLogLevel = {
  "0": "critical" /* critical */,
  "1": "critical" /* critical */,
  "2": "critical" /* critical */,
  "3": "error" /* error */,
  "4": "warning" /* warning */,
  "5": "info" /* info */,
  "6": "info" /* info */,
  "7": "debug" /* debug */
};
var LogsMetaKind = /* @__PURE__ */ ((LogsMetaKind2) => {
  LogsMetaKind2[LogsMetaKind2["Number"] = 0] = "Number";
  LogsMetaKind2[LogsMetaKind2["String"] = 1] = "String";
  LogsMetaKind2[LogsMetaKind2["LabelsMap"] = 2] = "LabelsMap";
  LogsMetaKind2[LogsMetaKind2["Error"] = 3] = "Error";
  return LogsMetaKind2;
})(LogsMetaKind || {});
var LogsDedupDescription = /* @__PURE__ */ ((LogsDedupDescription2) => {
  LogsDedupDescription2["none"] = "No de-duplication";
  LogsDedupDescription2["exact"] = "De-duplication of successive lines that are identical, ignoring ISO datetimes.";
  LogsDedupDescription2["numbers"] = "De-duplication of successive lines that are identical when ignoring numbers, e.g., IP addresses, latencies.";
  LogsDedupDescription2["signature"] = "De-duplication of successive lines that have identical punctuation and whitespace.";
  return LogsDedupDescription2;
})(LogsDedupDescription || {});
var LogRowContextQueryDirection = /* @__PURE__ */ ((LogRowContextQueryDirection2) => {
  LogRowContextQueryDirection2["Backward"] = "BACKWARD";
  LogRowContextQueryDirection2["Forward"] = "FORWARD";
  return LogRowContextQueryDirection2;
})(LogRowContextQueryDirection || {});
const hasLogsContextSupport = (datasource) => {
  if (!datasource || typeof datasource !== "object") {
    return false;
  }
  return "getLogRowContext" in datasource;
};
var SupplementaryQueryType = /* @__PURE__ */ ((SupplementaryQueryType2) => {
  SupplementaryQueryType2["LogsVolume"] = "LogsVolume";
  SupplementaryQueryType2["LogsSample"] = "LogsSample";
  return SupplementaryQueryType2;
})(SupplementaryQueryType || {});
var LogsVolumeType = /* @__PURE__ */ ((LogsVolumeType2) => {
  LogsVolumeType2["FullRange"] = "FullRange";
  LogsVolumeType2["Limited"] = "Limited";
  return LogsVolumeType2;
})(LogsVolumeType || {});
const hasSupplementaryQuerySupport = (datasource, type) => {
  if (!datasource) {
    return false;
  }
  return ("getDataProvider" in datasource || "getSupplementaryRequest" in datasource) && "getSupplementaryQuery" in datasource && "getSupportedSupplementaryQueryTypes" in datasource && datasource.getSupportedSupplementaryQueryTypes().includes(type);
};
const hasLogsContextUiSupport = (datasource) => {
  if (!datasource || typeof datasource !== "object") {
    return false;
  }
  return "getLogRowContextUi" in datasource;
};
const hasToggleableQueryFiltersSupport = (datasource) => {
  return datasource != null && typeof datasource === "object" && "toggleQueryFilter" in datasource && "queryHasFilter" in datasource;
};
const hasQueryModificationSupport = (datasource) => {
  return datasource != null && typeof datasource === "object" && "modifyQuery" in datasource && "getSupportedQueryModifications" in datasource;
};

var PageLayoutType = /* @__PURE__ */ ((PageLayoutType2) => {
  PageLayoutType2[PageLayoutType2["Standard"] = 0] = "Standard";
  PageLayoutType2[PageLayoutType2["Canvas"] = 1] = "Canvas";
  PageLayoutType2[PageLayoutType2["Custom"] = 2] = "Custom";
  return PageLayoutType2;
})(PageLayoutType || {});

const ISO_8601 = moment__default["default"].ISO_8601;
const setLocale = (language) => {
  moment__default["default"].locale(language);
};
const getLocale = () => {
  return moment__default["default"].locale();
};
const getLocaleData = () => {
  return moment__default["default"].localeData();
};
const isDateTimeInput = (value) => {
  return value === null || typeof value === "string" || typeof value === "number" || value instanceof Date || Array.isArray(value) && value.every((v) => typeof v === "string" || typeof v === "number") || isDateTime(value);
};
const isDateTime = (value) => {
  return moment__default["default"].isMoment(value);
};
const toUtc = (input, formatInput) => {
  return moment__default["default"].utc(input, formatInput);
};
const toDuration$1 = (input, unit) => {
  return moment__default["default"].duration(input, unit);
};
const dateTime = (input, formatInput) => {
  return moment__default["default"](input, formatInput);
};
const dateTimeAsMoment = (input) => {
  return dateTime(input);
};
const dateTimeForTimeZone = (timezone, input, formatInput) => {
  if (timezone && timezone !== "browser") {
    let result;
    if (typeof input === "string" && formatInput) {
      result = moment__default["default"].tz(input, formatInput, timezone);
    } else {
      result = moment__default["default"].tz(input, timezone);
    }
    if (isDateTime(result)) {
      return result;
    }
  }
  return dateTime(input, formatInput);
};
const getWeekdayIndex = (day) => {
  return moment__default["default"].weekdays().findIndex((wd) => wd.toLowerCase() === day.toLowerCase());
};
const getWeekdayIndexByEnglishName = (day) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].findIndex(
  (wd) => wd.toLowerCase() === day.toLowerCase()
);
const setWeekStart = (weekStart) => {
  const suffix = "-weekStart";
  const language = getLocale().replace(suffix, "");
  const dow = weekStart ? getWeekdayIndexByEnglishName(weekStart) : -1;
  if (dow !== -1) {
    moment__default["default"].locale(language + suffix, {
      parentLocale: language,
      week: {
        dow
      }
    });
  } else {
    setLocale(language);
  }
};

const DefaultTimeZone = schema.defaultTimeZone;
const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
function getDefaultTimeRange() {
  const now = dateTime();
  return {
    from: dateTime(now).subtract(6, "hour"),
    to: now,
    raw: { from: "now-6h", to: "now" }
  };
}
function getDefaultRelativeTimeRange() {
  return {
    from: 600,
    to: 0
  };
}
function makeTimeRange(from, to) {
  const fromDateTime = typeof from === "string" ? dateTime(from) : from;
  const toDateTime = typeof to === "string" ? dateTime(to) : to;
  return {
    from: fromDateTime,
    to: toDateTime,
    raw: {
      from: fromDateTime,
      to: toDateTime
    }
  };
}

var ThresholdsMode = /* @__PURE__ */ ((ThresholdsMode2) => {
  ThresholdsMode2["Absolute"] = "absolute";
  ThresholdsMode2["Percentage"] = "percentage";
  return ThresholdsMode2;
})(ThresholdsMode || {});

var MappingType = /* @__PURE__ */ ((MappingType2) => {
  MappingType2["ValueToText"] = "value";
  MappingType2["RangeToText"] = "range";
  MappingType2["RegexToText"] = "regex";
  MappingType2["SpecialValue"] = "special";
  return MappingType2;
})(MappingType || {});
var SpecialValueMatch = /* @__PURE__ */ ((SpecialValueMatch2) => {
  SpecialValueMatch2["True"] = "true";
  SpecialValueMatch2["False"] = "false";
  SpecialValueMatch2["Null"] = "null";
  SpecialValueMatch2["NaN"] = "nan";
  SpecialValueMatch2["NullAndNaN"] = "null+nan";
  SpecialValueMatch2["Empty"] = "empty";
  return SpecialValueMatch2;
})(SpecialValueMatch || {});

var TransformationApplicabilityLevels = /* @__PURE__ */ ((TransformationApplicabilityLevels2) => {
  TransformationApplicabilityLevels2[TransformationApplicabilityLevels2["NotPossible"] = -1] = "NotPossible";
  TransformationApplicabilityLevels2[TransformationApplicabilityLevels2["NotApplicable"] = 0] = "NotApplicable";
  TransformationApplicabilityLevels2[TransformationApplicabilityLevels2["Applicable"] = 1] = "Applicable";
  TransformationApplicabilityLevels2[TransformationApplicabilityLevels2["HighlyApplicable"] = 2] = "HighlyApplicable";
  return TransformationApplicabilityLevels2;
})(TransformationApplicabilityLevels || {});
var SpecialValue = /* @__PURE__ */ ((SpecialValue2) => {
  SpecialValue2["True"] = "true";
  SpecialValue2["False"] = "false";
  SpecialValue2["Null"] = "null";
  SpecialValue2["Empty"] = "empty";
  return SpecialValue2;
})(SpecialValue || {});

function isSystemOverrideWithRef(ref) {
  return (override) => {
    return "__systemRef" in override && override.__systemRef === ref;
  };
}
const isSystemOverride = (override) => {
  return "__systemRef" in override && typeof override.__systemRef === "string";
};
var FieldConfigProperty = /* @__PURE__ */ ((FieldConfigProperty2) => {
  FieldConfigProperty2["Unit"] = "unit";
  FieldConfigProperty2["Min"] = "min";
  FieldConfigProperty2["Max"] = "max";
  FieldConfigProperty2["Decimals"] = "decimals";
  FieldConfigProperty2["DisplayName"] = "displayName";
  FieldConfigProperty2["NoValue"] = "noValue";
  FieldConfigProperty2["Thresholds"] = "thresholds";
  FieldConfigProperty2["Mappings"] = "mappings";
  FieldConfigProperty2["Links"] = "links";
  FieldConfigProperty2["Color"] = "color";
  FieldConfigProperty2["Filterable"] = "filterable";
  return FieldConfigProperty2;
})(FieldConfigProperty || {});

function patchArrayVectorProrotypeMethods() {
  if (!Object.getOwnPropertyDescriptor(Array.prototype, "toArray")) {
    Object.defineProperties(Array.prototype, {
      get: {
        value: function(idx) {
          return this[idx];
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      set: {
        value: function(idx, value) {
          this[idx] = value;
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      add: {
        value: function(value) {
          this.push(value);
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      toArray: {
        value: function() {
          return this;
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
  }
}
patchArrayVectorProrotypeMethods();

var __defProp$11 = Object.defineProperty;
var __defNormalProp$11 = (obj, key, value) => key in obj ? __defProp$11(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$m = (obj, key, value) => {
  __defNormalProp$11(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var PluginState = /* @__PURE__ */ ((PluginState2) => {
  PluginState2["alpha"] = "alpha";
  PluginState2["beta"] = "beta";
  PluginState2["stable"] = "stable";
  PluginState2["deprecated"] = "deprecated";
  return PluginState2;
})(PluginState || {});
var PluginType = /* @__PURE__ */ ((PluginType2) => {
  PluginType2["panel"] = "panel";
  PluginType2["datasource"] = "datasource";
  PluginType2["app"] = "app";
  PluginType2["renderer"] = "renderer";
  PluginType2["secretsmanager"] = "secretsmanager";
  return PluginType2;
})(PluginType || {});
var PluginSignatureStatus = /* @__PURE__ */ ((PluginSignatureStatus2) => {
  PluginSignatureStatus2["internal"] = "internal";
  PluginSignatureStatus2["valid"] = "valid";
  PluginSignatureStatus2["invalid"] = "invalid";
  PluginSignatureStatus2["modified"] = "modified";
  PluginSignatureStatus2["missing"] = "missing";
  return PluginSignatureStatus2;
})(PluginSignatureStatus || {});
var PluginSignatureType = /* @__PURE__ */ ((PluginSignatureType2) => {
  PluginSignatureType2["grafana"] = "grafana";
  PluginSignatureType2["commercial"] = "commercial";
  PluginSignatureType2["community"] = "community";
  PluginSignatureType2["private"] = "private";
  PluginSignatureType2["core"] = "core";
  return PluginSignatureType2;
})(PluginSignatureType || {});
var PluginErrorCode = /* @__PURE__ */ ((PluginErrorCode2) => {
  PluginErrorCode2["missingSignature"] = "signatureMissing";
  PluginErrorCode2["invalidSignature"] = "signatureInvalid";
  PluginErrorCode2["modifiedSignature"] = "signatureModified";
  PluginErrorCode2["failedBackendStart"] = "failedBackendStart";
  PluginErrorCode2["angular"] = "angular";
  return PluginErrorCode2;
})(PluginErrorCode || {});
var PluginIncludeType = /* @__PURE__ */ ((PluginIncludeType2) => {
  PluginIncludeType2["dashboard"] = "dashboard";
  PluginIncludeType2["page"] = "page";
  PluginIncludeType2["panel"] = "panel";
  PluginIncludeType2["datasource"] = "datasource";
  return PluginIncludeType2;
})(PluginIncludeType || {});
class GrafanaPlugin {
  constructor() {
    // Meta is filled in by the plugin loading system
    __publicField$m(this, "meta");
    // This is set if the plugin system had errors loading the plugin
    __publicField$m(this, "loadError");
    // Config control (app/datasource)
    __publicField$m(this, "angularConfigCtrl");
    // Show configuration tabs on the plugin page
    __publicField$m(this, "configPages");
    this.meta = {};
  }
  // Tabs on the plugin page
  addConfigPage(tab) {
    if (!this.configPages) {
      this.configPages = [];
    }
    this.configPages.push(tab);
    return this;
  }
  /**
   * @deprecated -- this is no longer necessary and will be removed
   */
  setChannelSupport() {
    console.warn("[deprecation] plugin is using ignored option: setChannelSupport", this.meta);
    return this;
  }
}

var PluginExtensionTypes = /* @__PURE__ */ ((PluginExtensionTypes2) => {
  PluginExtensionTypes2["link"] = "link";
  PluginExtensionTypes2["component"] = "component";
  return PluginExtensionTypes2;
})(PluginExtensionTypes || {});
var PluginExtensionPoints = /* @__PURE__ */ ((PluginExtensionPoints2) => {
  PluginExtensionPoints2["AlertInstanceAction"] = "grafana/alerting/instance/action";
  PluginExtensionPoints2["AlertingHomePage"] = "grafana/alerting/home";
  PluginExtensionPoints2["AlertingAlertingRuleAction"] = "grafana/alerting/alertingrule/action";
  PluginExtensionPoints2["AlertingRecordingRuleAction"] = "grafana/alerting/recordingrule/action";
  PluginExtensionPoints2["CommandPalette"] = "grafana/commandpalette/action";
  PluginExtensionPoints2["DashboardPanelMenu"] = "grafana/dashboard/panel/menu";
  PluginExtensionPoints2["DataSourceConfig"] = "grafana/datasources/config";
  PluginExtensionPoints2["ExploreToolbarAction"] = "grafana/explore/toolbar/action";
  PluginExtensionPoints2["UserProfileTab"] = "grafana/user/profile/tab";
  return PluginExtensionPoints2;
})(PluginExtensionPoints || {});

var __defProp$10 = Object.defineProperty;
var __defProps$I = Object.defineProperties;
var __getOwnPropDescs$I = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$Q = Object.getOwnPropertySymbols;
var __hasOwnProp$Q = Object.prototype.hasOwnProperty;
var __propIsEnum$Q = Object.prototype.propertyIsEnumerable;
var __defNormalProp$10 = (obj, key, value) => key in obj ? __defProp$10(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$P = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$Q.call(b, prop))
      __defNormalProp$10(a, prop, b[prop]);
  if (__getOwnPropSymbols$Q)
    for (var prop of __getOwnPropSymbols$Q(b)) {
      if (__propIsEnum$Q.call(b, prop))
        __defNormalProp$10(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$I = (a, b) => __defProps$I(a, __getOwnPropDescs$I(b));
var __objRest$4 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$Q.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$Q)
    for (var prop of __getOwnPropSymbols$Q(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$Q.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField$l = (obj, key, value) => {
  __defNormalProp$10(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var CoreApp = /* @__PURE__ */ ((CoreApp2) => {
  CoreApp2["CloudAlerting"] = "cloud-alerting";
  CoreApp2["UnifiedAlerting"] = "unified-alerting";
  CoreApp2["Dashboard"] = "dashboard";
  CoreApp2["Explore"] = "explore";
  CoreApp2["Correlations"] = "correlations";
  CoreApp2["Unknown"] = "unknown";
  CoreApp2["PanelEditor"] = "panel-editor";
  CoreApp2["PanelViewer"] = "panel-viewer";
  return CoreApp2;
})(CoreApp || {});
class AppPlugin extends GrafanaPlugin {
  constructor() {
    super(...arguments);
    __publicField$l(this, "_extensionConfigs", []);
    // Content under: /a/${plugin-id}/*
    __publicField$l(this, "root");
  }
  /**
   * Called after the module has loaded, and before the app is used.
   * This function may be called multiple times on the same instance.
   * The first time, `this.meta` will be undefined
   */
  init(meta) {
  }
  /**
   * Set the component displayed under:
   *   /a/${plugin-id}/*
   *
   * If the NavModel is configured, the page will have a managed frame, otheriwse it has full control.
   */
  setRootPage(root) {
    this.root = root;
    return this;
  }
  setComponentsFromLegacyExports(pluginExports) {
    if (pluginExports.ConfigCtrl) {
      this.angularConfigCtrl = pluginExports.ConfigCtrl;
    }
    if (this.meta && this.meta.includes) {
      for (const include of this.meta.includes) {
        if (include.type === PluginIncludeType.page && include.component) {
          const exp = pluginExports[include.component];
          if (!exp) {
            console.warn("App Page uses unknown component: ", include.component, this.meta);
            continue;
          }
        }
      }
    }
  }
  get extensionConfigs() {
    return this._extensionConfigs;
  }
  addLink(extensionConfig) {
    const _a = extensionConfig, { targets } = _a, extension = __objRest$4(_a, ["targets"]);
    const targetsArray = Array.isArray(targets) ? targets : [targets];
    targetsArray.forEach((target) => {
      this._extensionConfigs.push(__spreadProps$I(__spreadValues$P({}, extension), {
        extensionPointId: target,
        type: PluginExtensionTypes.link
      }));
    });
    return this;
  }
  addComponent(extensionConfig) {
    const _a = extensionConfig, { targets } = _a, extension = __objRest$4(_a, ["targets"]);
    const targetsArray = Array.isArray(targets) ? targets : [targets];
    targetsArray.forEach((target) => {
      this._extensionConfigs.push(__spreadProps$I(__spreadValues$P({}, extension), {
        extensionPointId: target,
        type: PluginExtensionTypes.component
      }));
    });
    return this;
  }
  exposeComponent(componentConfig) {
    const _a = componentConfig, { id } = _a, extension = __objRest$4(_a, ["id"]);
    this._extensionConfigs.push(__spreadProps$I(__spreadValues$P({}, extension), {
      extensionPointId: `capabilities/${id}`,
      type: PluginExtensionTypes.component
    }));
    return this;
  }
  /** @deprecated Use .addLink() instead */
  configureExtensionLink(extension) {
    this.addLink(__spreadValues$P({
      targets: [extension.extensionPointId]
    }, extension));
    return this;
  }
  /** @deprecated Use .addComponent() instead */
  configureExtensionComponent(extension) {
    this.addComponent(__spreadValues$P({
      targets: [extension.extensionPointId]
    }, extension));
    return this;
  }
}
var FeatureState = /* @__PURE__ */ ((FeatureState2) => {
  FeatureState2["alpha"] = "alpha";
  FeatureState2["beta"] = "beta";
  FeatureState2["experimental"] = "experimental";
  FeatureState2["privatePreview"] = "private preview";
  FeatureState2["preview"] = "preview";
  return FeatureState2;
})(FeatureState || {});

function makeClassES5Compatible(ES6Class) {
  return new Proxy(ES6Class, {
    // ES5 code will call it like a function using super
    apply(target, self, argumentsList) {
      if (typeof Reflect === "undefined" || !Reflect.construct) {
        alert("Browser is too old");
      }
      return Reflect.construct(target, argumentsList, self.constructor);
    }
  });
}

var __defProp$$ = Object.defineProperty;
var __defNormalProp$$ = (obj, key, value) => key in obj ? __defProp$$(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$k = (obj, key, value) => {
  __defNormalProp$$(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataSourcePlugin extends GrafanaPlugin {
  constructor(DataSourceClass) {
    super();
    this.DataSourceClass = DataSourceClass;
    __publicField$k(this, "components", {});
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
    __publicField$k(this, "name");
    /**
     *  Set in constructor
     */
    __publicField$k(this, "id");
    /**
     *  Set in constructor
     */
    __publicField$k(this, "type");
    /**
     *  Set in constructor
     */
    __publicField$k(this, "uid");
    /**
     *  min interval range
     */
    __publicField$k(this, "interval");
    /**
     * Initializes a datasource after instantiation
     */
    __publicField$k(this, "init");
    /**
     * Set after constructor call, as the data source instance is the most common thing to pass around
     * we attach the components to this instance for easy access
     */
    __publicField$k(this, "components");
    /**
     * static information about the datasource
     */
    __publicField$k(this, "meta");
    /**
     * Information about the datasource's query caching configuration
     * When the caching feature is disabled, this config will always be falsy
     */
    __publicField$k(this, "cachingConfig");
    /**
     * Used in explore
     */
    __publicField$k(this, "languageProvider");
    /**
     * An annotation processor allows explicit control for how annotations are managed.
     *
     * It is only necessary to configure an annotation processor if the default behavior is not desirable
     */
    __publicField$k(this, "annotations");
    /**
     * Defines new variable support
     * @alpha -- experimental
     */
    __publicField$k(this, "variables");
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
    __publicField$k(this, "startTask");
  }
}
LanguageProvider = makeClassES5Compatible(LanguageProvider);
DataSourceApi = makeClassES5Compatible(DataSourceApi);

var __defProp$_ = Object.defineProperty;
var __defNormalProp$_ = (obj, key, value) => key in obj ? __defProp$_(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$j = (obj, key, value) => {
  __defNormalProp$_(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var VizOrientation = /* @__PURE__ */ ((VizOrientation2) => {
  VizOrientation2["Auto"] = "auto";
  VizOrientation2["Vertical"] = "vertical";
  VizOrientation2["Horizontal"] = "horizontal";
  return VizOrientation2;
})(VizOrientation || {});
var VisualizationSuggestionScore = /* @__PURE__ */ ((VisualizationSuggestionScore2) => {
  VisualizationSuggestionScore2[VisualizationSuggestionScore2["Best"] = 100] = "Best";
  VisualizationSuggestionScore2[VisualizationSuggestionScore2["Good"] = 70] = "Good";
  VisualizationSuggestionScore2[VisualizationSuggestionScore2["OK"] = 50] = "OK";
  return VisualizationSuggestionScore2;
})(VisualizationSuggestionScore || {});
class VisualizationSuggestionsBuilder {
  constructor(data, panel) {
    /** Current data */
    __publicField$j(this, "data");
    /** Current panel & options */
    __publicField$j(this, "panel");
    /** Summary stats for current data */
    __publicField$j(this, "dataSummary");
    __publicField$j(this, "list", []);
    this.data = data;
    this.panel = panel;
    this.dataSummary = this.computeDataSummary();
  }
  getListAppender(defaults) {
    return new VisualizationSuggestionsListAppender(this.list, defaults);
  }
  computeDataSummary() {
    var _a, _b;
    const frames = ((_a = this.data) == null ? void 0 : _a.series) || [];
    let numberFieldCount = 0;
    let timeFieldCount = 0;
    let stringFieldCount = 0;
    let rowCountTotal = 0;
    let rowCountMax = 0;
    let fieldCount = 0;
    let preferredVisualisationType;
    for (const frame of frames) {
      rowCountTotal += frame.length;
      if ((_b = frame.meta) == null ? void 0 : _b.preferredVisualisationType) {
        preferredVisualisationType = frame.meta.preferredVisualisationType;
      }
      for (const field of frame.fields) {
        fieldCount++;
        switch (field.type) {
          case FieldType.number:
            numberFieldCount += 1;
            break;
          case FieldType.time:
            timeFieldCount += 1;
            break;
          case FieldType.string:
            stringFieldCount += 1;
            break;
        }
      }
      if (frame.length > rowCountMax) {
        rowCountMax = frame.length;
      }
    }
    return {
      numberFieldCount,
      timeFieldCount,
      stringFieldCount,
      rowCountTotal,
      rowCountMax,
      fieldCount,
      preferredVisualisationType,
      frameCount: frames.length,
      hasData: rowCountTotal > 0,
      hasTimeField: timeFieldCount > 0,
      hasNumberField: numberFieldCount > 0,
      hasStringField: stringFieldCount > 0
    };
  }
  getList() {
    return this.list;
  }
}
class VisualizationSuggestionsListAppender {
  constructor(list, defaults) {
    this.list = list;
    this.defaults = defaults;
  }
  append(overrides) {
    this.list.push(lodash.defaultsDeep(overrides, this.defaults));
  }
}

var VariableRefresh = /* @__PURE__ */ ((VariableRefresh2) => {
  VariableRefresh2[VariableRefresh2["never"] = 0] = "never";
  VariableRefresh2[VariableRefresh2["onDashboardLoad"] = 1] = "onDashboardLoad";
  VariableRefresh2[VariableRefresh2["onTimeRangeChanged"] = 2] = "onTimeRangeChanged";
  return VariableRefresh2;
})(VariableRefresh || {});
var VariableSort = /* @__PURE__ */ ((VariableSort2) => {
  VariableSort2[VariableSort2["disabled"] = 0] = "disabled";
  VariableSort2[VariableSort2["alphabeticalAsc"] = 1] = "alphabeticalAsc";
  VariableSort2[VariableSort2["alphabeticalDesc"] = 2] = "alphabeticalDesc";
  VariableSort2[VariableSort2["numericalAsc"] = 3] = "numericalAsc";
  VariableSort2[VariableSort2["numericalDesc"] = 4] = "numericalDesc";
  VariableSort2[VariableSort2["alphabeticalCaseInsensitiveAsc"] = 5] = "alphabeticalCaseInsensitiveAsc";
  VariableSort2[VariableSort2["alphabeticalCaseInsensitiveDesc"] = 6] = "alphabeticalCaseInsensitiveDesc";
  VariableSort2[VariableSort2["naturalAsc"] = 7] = "naturalAsc";
  VariableSort2[VariableSort2["naturalDesc"] = 8] = "naturalDesc";
  return VariableSort2;
})(VariableSort || {});
var VariableHide = /* @__PURE__ */ ((VariableHide2) => {
  VariableHide2[VariableHide2["dontHide"] = 0] = "dontHide";
  VariableHide2[VariableHide2["hideLabel"] = 1] = "hideLabel";
  VariableHide2[VariableHide2["hideVariable"] = 2] = "hideVariable";
  return VariableHide2;
})(VariableHide || {});

var FieldColorModeId = /* @__PURE__ */ ((FieldColorModeId2) => {
  FieldColorModeId2["Thresholds"] = "thresholds";
  FieldColorModeId2["PaletteClassic"] = "palette-classic";
  FieldColorModeId2["PaletteClassicByName"] = "palette-classic-by-name";
  FieldColorModeId2["PaletteSaturated"] = "palette-saturated";
  FieldColorModeId2["ContinuousGrYlRd"] = "continuous-GrYlRd";
  FieldColorModeId2["ContinuousRdYlGr"] = "continuous-RdYlGr";
  FieldColorModeId2["ContinuousBlYlRd"] = "continuous-BlYlRd";
  FieldColorModeId2["ContinuousYlRd"] = "continuous-YlRd";
  FieldColorModeId2["ContinuousBlPu"] = "continuous-BlPu";
  FieldColorModeId2["ContinuousYlBl"] = "continuous-YlBl";
  FieldColorModeId2["ContinuousBlues"] = "continuous-blues";
  FieldColorModeId2["ContinuousReds"] = "continuous-reds";
  FieldColorModeId2["ContinuousGreens"] = "continuous-greens";
  FieldColorModeId2["ContinuousPurples"] = "continuous-purples";
  FieldColorModeId2["Fixed"] = "fixed";
  FieldColorModeId2["Shades"] = "shades";
  return FieldColorModeId2;
})(FieldColorModeId || {});
const FALLBACK_COLOR = "#808080";

var GrafanaThemeType = /* @__PURE__ */ ((GrafanaThemeType2) => {
  GrafanaThemeType2["Light"] = "light";
  GrafanaThemeType2["Dark"] = "dark";
  return GrafanaThemeType2;
})(GrafanaThemeType || {});

var OrgRole = /* @__PURE__ */ ((OrgRole2) => {
  OrgRole2["None"] = "None";
  OrgRole2["Viewer"] = "Viewer";
  OrgRole2["Editor"] = "Editor";
  OrgRole2["Admin"] = "Admin";
  return OrgRole2;
})(OrgRole || {});

const typeList = /* @__PURE__ */ new Set();
function eventFactory(name) {
  if (typeList.has(name)) {
    throw new Error(`There is already an event defined with type '${name}'`);
  }
  typeList.add(name);
  return { name };
}

var __defProp$Z = Object.defineProperty;
var __defNormalProp$Z = (obj, key, value) => key in obj ? __defProp$Z(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$i = (obj, key, value) => {
  __defNormalProp$Z(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BusEventBase {
  constructor() {
    __publicField$i(this, "type");
    __publicField$i(this, "payload");
    __publicField$i(this, "origin");
    /** @internal */
    __publicField$i(this, "tags");
    this.type = this.__proto__.constructor.type;
  }
  /**
   * @internal
   * Tag event for finer-grained filtering in subscribers
   */
  setTags(tags) {
    this.tags = new Set(tags);
    return this;
  }
}
class BusEventWithPayload extends BusEventBase {
  constructor(payload) {
    super();
    __publicField$i(this, "payload");
    this.payload = payload;
  }
}

var __defProp$Y = Object.defineProperty;
var __defNormalProp$Y = (obj, key, value) => key in obj ? __defProp$Y(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$h = (obj, key, value) => {
  __defNormalProp$Y(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const AppEvents = {
  alertSuccess: eventFactory("alert-success"),
  alertWarning: eventFactory("alert-warning"),
  alertError: eventFactory("alert-error")
};
const PanelEvents = {
  refresh: eventFactory("refresh"),
  componentDidMount: eventFactory("component-did-mount"),
  dataReceived: eventFactory("data-received"),
  dataError: eventFactory("data-error"),
  dataFramesReceived: eventFactory("data-frames-received"),
  dataSnapshotLoad: eventFactory("data-snapshot-load"),
  editModeInitialized: eventFactory("init-edit-mode"),
  initPanelActions: eventFactory("init-panel-actions"),
  initialized: eventFactory("panel-initialized"),
  panelTeardown: eventFactory("panel-teardown"),
  render: eventFactory("render")
};
class LegacyGraphHoverEvent extends BusEventWithPayload {
}
__publicField$h(LegacyGraphHoverEvent, "type", "graph-hover");
class LegacyGraphHoverClearEvent extends BusEventBase {
  constructor() {
    super(...arguments);
    __publicField$h(this, "payload", { point: {} });
  }
}
__publicField$h(LegacyGraphHoverClearEvent, "type", "graph-hover-clear");

var LiveChannelScope = /* @__PURE__ */ ((LiveChannelScope2) => {
  LiveChannelScope2["DataSource"] = "ds";
  LiveChannelScope2["Plugin"] = "plugin";
  LiveChannelScope2["Grafana"] = "grafana";
  LiveChannelScope2["Stream"] = "stream";
  return LiveChannelScope2;
})(LiveChannelScope || {});
var LiveChannelType = /* @__PURE__ */ ((LiveChannelType2) => {
  LiveChannelType2["DataStream"] = "stream";
  LiveChannelType2["DataFrame"] = "frame";
  LiveChannelType2["JSON"] = "json";
  return LiveChannelType2;
})(LiveChannelType || {});
var LiveChannelConnectionState = /* @__PURE__ */ ((LiveChannelConnectionState2) => {
  LiveChannelConnectionState2["Pending"] = "pending";
  LiveChannelConnectionState2["Connected"] = "connected";
  LiveChannelConnectionState2["Connecting"] = "connecting";
  LiveChannelConnectionState2["Disconnected"] = "disconnected";
  LiveChannelConnectionState2["Shutdown"] = "shutdown";
  LiveChannelConnectionState2["Invalid"] = "invalid";
  return LiveChannelConnectionState2;
})(LiveChannelConnectionState || {});
var LiveChannelEventType = /* @__PURE__ */ ((LiveChannelEventType2) => {
  LiveChannelEventType2["Status"] = "status";
  LiveChannelEventType2["Join"] = "join";
  LiveChannelEventType2["Leave"] = "leave";
  LiveChannelEventType2["Message"] = "message";
  return LiveChannelEventType2;
})(LiveChannelEventType || {});
function isLiveChannelStatusEvent(evt) {
  return evt.type === "status" /* Status */;
}
function isLiveChannelJoinEvent(evt) {
  return evt.type === "join" /* Join */;
}
function isLiveChannelLeaveEvent(evt) {
  return evt.type === "leave" /* Leave */;
}
function isLiveChannelMessageEvent(evt) {
  return evt.type === "message" /* Message */;
}
function parseLiveChannelAddress(id) {
  if (id == null ? void 0 : id.length) {
    let parts = id.trim().split("/");
    if (parts.length >= 3) {
      return {
        scope: parts[0],
        namespace: parts[1],
        path: parts.slice(2).join("/")
      };
    }
  }
  return void 0;
}
function isValidLiveChannelAddress(addr) {
  return !!((addr == null ? void 0 : addr.path) && addr.namespace && addr.scope);
}
function toLiveChannelId(addr) {
  if (!addr.scope) {
    return "";
  }
  let id = addr.scope;
  if (!addr.namespace) {
    return id;
  }
  id += "/" + addr.namespace;
  if (!addr.path) {
    return id;
  }
  return id + "/" + addr.path;
}

var VariableSupportType = /* @__PURE__ */ ((VariableSupportType2) => {
  VariableSupportType2["Legacy"] = "legacy";
  VariableSupportType2["Standard"] = "standard";
  VariableSupportType2["Custom"] = "custom";
  VariableSupportType2["Datasource"] = "datasource";
  return VariableSupportType2;
})(VariableSupportType || {});
class VariableSupportBase {
}
class StandardVariableSupport extends VariableSupportBase {
  getType() {
    return "standard" /* Standard */;
  }
}
class CustomVariableSupport extends VariableSupportBase {
  getType() {
    return "custom" /* Custom */;
  }
}
class DataSourceVariableSupport extends VariableSupportBase {
  getType() {
    return "datasource" /* Datasource */;
  }
}

function isUnsignedPluginSignature(signature) {
  return signature && signature !== PluginSignatureStatus.valid && signature !== PluginSignatureStatus.internal;
}

var AlertState = /* @__PURE__ */ ((AlertState2) => {
  AlertState2["NoData"] = "no_data";
  AlertState2["Paused"] = "paused";
  AlertState2["Alerting"] = "alerting";
  AlertState2["OK"] = "ok";
  AlertState2["Pending"] = "pending";
  AlertState2["Unknown"] = "unknown";
  return AlertState2;
})(AlertState || {});

const availableIconsIndex = {
  google: true,
  microsoft: true,
  github: true,
  gitlab: true,
  okta: true,
  discord: true,
  hipchat: true,
  amazon: true,
  "google-hangouts-alt": true,
  pagerduty: true,
  line: true,
  anchor: true,
  "adjust-circle": true,
  "angle-double-down": true,
  "angle-double-right": true,
  "angle-double-left": true,
  "angle-double-up": true,
  "angle-down": true,
  "angle-left": true,
  "angle-right": true,
  "angle-up": true,
  "align-left": true,
  "align-right": true,
  "application-observability": true,
  apps: true,
  "archive-alt": true,
  arrow: true,
  "arrow-down": true,
  "arrow-from-right": true,
  "arrow-left": true,
  "arrow-random": true,
  "arrow-right": true,
  "arrow-to-right": true,
  "arrow-up": true,
  "arrows-h": true,
  "arrows-v": true,
  asserts: true,
  "expand-arrows": true,
  "expand-arrows-alt": true,
  at: true,
  ai: true,
  backward: true,
  bars: true,
  bell: true,
  "bell-slash": true,
  bolt: true,
  book: true,
  bookmark: true,
  "book-open": true,
  "brackets-curly": true,
  bug: true,
  building: true,
  "calculator-alt": true,
  "calendar-alt": true,
  "calendar-slash": true,
  camera: true,
  capture: true,
  "channel-add": true,
  "chart-line": true,
  check: true,
  "check-circle": true,
  "check-square": true,
  circle: true,
  "circle-mono": true,
  "clipboard-alt": true,
  "clock-nine": true,
  cloud: true,
  "cloud-download": true,
  "cloud-upload": true,
  "code-branch": true,
  cog: true,
  columns: true,
  "comment-alt": true,
  "comment-alt-message": true,
  "comment-alt-share": true,
  "comments-alt": true,
  compass: true,
  "compress-arrows": true,
  copy: true,
  "corner-down-right-alt": true,
  "create-dashboard": true,
  "credit-card": true,
  crosshair: true,
  cube: true,
  dashboard: true,
  database: true,
  "dice-three": true,
  docker: true,
  "document-info": true,
  "document-layout-left": true,
  "download-alt": true,
  draggabledots: true,
  edit: true,
  "ellipsis-v": true,
  enter: true,
  envelope: true,
  "exchange-alt": true,
  "exclamation-triangle": true,
  "exclamation-circle": true,
  exclamation: true,
  "external-link-alt": true,
  eye: true,
  "eye-slash": true,
  "ellipsis-h": true,
  /* @deprecated, use 'spinner' instead */
  "fa fa-spinner": true,
  favorite: true,
  "file-alt": true,
  "file-blank": true,
  "file-copy-alt": true,
  "file-download": true,
  "file-edit-alt": true,
  "file-landscape-alt": true,
  filter: true,
  flip: true,
  folder: true,
  font: true,
  fire: true,
  "folder-open": true,
  "folder-plus": true,
  "folder-upload": true,
  forward: true,
  "frontend-observability": true,
  "gf-bar-alignment-after": true,
  "gf-bar-alignment-before": true,
  "gf-bar-alignment-center": true,
  "gf-glue": true,
  "gf-grid": true,
  "gf-interpolation-linear": true,
  "gf-interpolation-smooth": true,
  "gf-interpolation-step-after": true,
  "gf-interpolation-step-before": true,
  "gf-landscape": true,
  "gf-layout-simple": true,
  "gf-logs": true,
  "gf-ml": true,
  "gf-movepane-left": true,
  "gf-movepane-right": true,
  "gf-portrait": true,
  "gf-service-account": true,
  "gf-show-context": true,
  "gf-pin": true,
  "gf-prometheus": true,
  "gf-traces": true,
  globe: true,
  grafana: true,
  "graph-bar": true,
  heart: true,
  "heart-rate": true,
  "heart-break": true,
  history: true,
  "history-alt": true,
  home: true,
  "home-alt": true,
  "horizontal-align-center": true,
  "horizontal-align-left": true,
  "horizontal-align-right": true,
  hourglass: true,
  import: true,
  info: true,
  "info-circle": true,
  k6: true,
  "key-skeleton-alt": true,
  keyboard: true,
  kubernetes: true,
  "layer-group": true,
  "layers-alt": true,
  "library-panel": true,
  "line-alt": true,
  link: true,
  "list-ui-alt": true,
  "list-ul": true,
  "list-ol": true,
  lock: true,
  "map-marker": true,
  "map-marker-plus": true,
  "map-marker-minus": true,
  message: true,
  minus: true,
  "minus-circle": true,
  "mobile-android": true,
  monitor: true,
  palette: true,
  "panel-add": true,
  paragraph: true,
  "pathfinder-unite": true,
  pause: true,
  "pause-circle": true,
  pen: true,
  percentage: true,
  play: true,
  plug: true,
  plus: true,
  "plus-circle": true,
  "plus-square": true,
  power: true,
  "presentation-play": true,
  process: true,
  "question-circle": true,
  "record-audio": true,
  repeat: true,
  rocket: true,
  "ruler-combined": true,
  save: true,
  search: true,
  "search-minus": true,
  "search-plus": true,
  "share-alt": true,
  shield: true,
  "shield-exclamation": true,
  signal: true,
  signin: true,
  signout: true,
  sitemap: true,
  slack: true,
  "sliders-v-alt": true,
  spinner: true,
  "sort-amount-down": true,
  "sort-amount-up": true,
  "square-shape": true,
  star: true,
  "step-backward": true,
  stopwatch: true,
  "stopwatch-slash": true,
  sync: true,
  "sync-slash": true,
  table: true,
  "table-collapse-all": true,
  "table-expand-all": true,
  "tag-alt": true,
  "telegram-alt": true,
  "text-fields": true,
  "thumbs-up": true,
  times: true,
  "times-circle": true,
  "toggle-on": true,
  "toggle-off": true,
  "trash-alt": true,
  unarchive: true,
  unlock: true,
  upload: true,
  user: true,
  "users-alt": true,
  "user-arrows": true,
  "vertical-align-bottom": true,
  "vertical-align-center": true,
  "vertical-align-top": true,
  "web-section-alt": true,
  "wrap-text": true,
  rss: true,
  x: true,
  "add-user": true,
  attach: true
};
function isIconName(iconName) {
  if (!iconName || typeof iconName !== "string") {
    return false;
  }
  return iconName in availableIconsIndex;
}
function toIconName(iconName) {
  if (isIconName(iconName)) {
    return iconName;
  }
  return void 0;
}

const scopeFilterOperatorMap = {
  "=": "equals",
  "!=": "not-equals",
  "=~": "regex-match",
  "!~": "regex-not-match"
};

var __defProp$X = Object.defineProperty;
var __defNormalProp$X = (obj, key, value) => key in obj ? __defProp$X(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$g = (obj, key, value) => {
  __defNormalProp$X(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Registry {
  constructor(init) {
    this.init = init;
    __publicField$g(this, "ordered", []);
    __publicField$g(this, "byId", /* @__PURE__ */ new Map());
    __publicField$g(this, "initialized", false);
    __publicField$g(this, "setInit", (init) => {
      if (this.initialized) {
        throw new Error("Registry already initialized");
      }
      this.init = init;
    });
    this.init = init;
  }
  getIfExists(id) {
    if (!this.initialized) {
      this.initialize();
    }
    if (id) {
      return this.byId.get(id);
    }
    return void 0;
  }
  initialize() {
    if (this.init) {
      for (const ext of this.init()) {
        this.register(ext);
      }
    }
    this.sort();
    this.initialized = true;
  }
  get(id) {
    const v = this.getIfExists(id);
    if (!v) {
      throw new Error(`"${id}" not found in: ${this.list().map((v2) => v2.id)}`);
    }
    return v;
  }
  selectOptions(current, filter) {
    if (!this.initialized) {
      this.initialize();
    }
    const select = {
      options: [],
      current: []
    };
    const currentOptions = {};
    if (current) {
      for (const id of current) {
        currentOptions[id] = {};
      }
    }
    for (const ext of this.ordered) {
      if (ext.excludeFromPicker) {
        continue;
      }
      if (filter && !filter(ext)) {
        continue;
      }
      const option = {
        value: ext.id,
        label: ext.name,
        description: ext.description
      };
      if (ext.state === PluginState.alpha) {
        option.label += " (alpha)";
      }
      select.options.push(option);
      if (currentOptions[ext.id]) {
        currentOptions[ext.id] = option;
      }
    }
    if (current) {
      select.current = Object.values(currentOptions);
    }
    return select;
  }
  /**
   * Return a list of values by ID, or all values if not specified
   */
  list(ids) {
    if (!this.initialized) {
      this.initialize();
    }
    if (ids) {
      const found = [];
      for (const id of ids) {
        const v = this.getIfExists(id);
        if (v) {
          found.push(v);
        }
      }
      return found;
    }
    return this.ordered;
  }
  isEmpty() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.ordered.length === 0;
  }
  register(ext) {
    if (this.byId.has(ext.id)) {
      throw new Error("Duplicate Key:" + ext.id);
    }
    this.byId.set(ext.id, ext);
    this.ordered.push(ext);
    if (ext.aliasIds) {
      for (const alias of ext.aliasIds) {
        if (!this.byId.has(alias)) {
          this.byId.set(alias, ext);
        }
      }
    }
    if (this.initialized) {
      this.sort();
    }
  }
  sort() {
  }
}

var __defProp$W = Object.defineProperty;
var __defProps$H = Object.defineProperties;
var __getOwnPropDescs$H = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$P = Object.getOwnPropertySymbols;
var __hasOwnProp$P = Object.prototype.hasOwnProperty;
var __propIsEnum$P = Object.prototype.propertyIsEnumerable;
var __defNormalProp$W = (obj, key, value) => key in obj ? __defProp$W(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$O = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$P.call(b, prop))
      __defNormalProp$W(a, prop, b[prop]);
  if (__getOwnPropSymbols$P)
    for (var prop of __getOwnPropSymbols$P(b)) {
      if (__propIsEnum$P.call(b, prop))
        __defNormalProp$W(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$H = (a, b) => __defProps$H(a, __getOwnPropDescs$H(b));
function getDataSourceRef(ds) {
  return { uid: ds.uid, type: ds.type };
}
function isDataSourceRef(ref) {
  return typeof ref === "object" && typeof (ref == null ? void 0 : ref.uid) === "string";
}
function getDataSourceUID(ref) {
  if (isDataSourceRef(ref)) {
    return ref.uid;
  }
  if (lodash.isString(ref)) {
    return ref;
  }
  return void 0;
}
const onUpdateDatasourceOption = (props, key) => (event) => {
  updateDatasourcePluginOption(props, key, event.currentTarget.value);
};
const onUpdateDatasourceJsonDataOption = (props, key) => (event) => {
  updateDatasourcePluginJsonDataOption(props, key, event.currentTarget.value);
};
const onUpdateDatasourceSecureJsonDataOption = (props, key) => (event) => {
  updateDatasourcePluginSecureJsonDataOption(props, key, event.currentTarget.value);
};
const onUpdateDatasourceJsonDataOptionSelect = (props, key) => (selected) => {
  updateDatasourcePluginJsonDataOption(props, key, selected.value);
};
const onUpdateDatasourceJsonDataOptionChecked = (props, key) => (event) => {
  updateDatasourcePluginJsonDataOption(props, key, event.currentTarget.checked);
};
const onUpdateDatasourceSecureJsonDataOptionSelect = (props, key) => (selected) => {
  updateDatasourcePluginSecureJsonDataOption(props, key, selected.value);
};
const onUpdateDatasourceResetOption = (props, key) => (event) => {
  updateDatasourcePluginResetOption(props, key);
};
function updateDatasourcePluginOption(props, key, val) {
  const config = props.options;
  props.onOptionsChange(__spreadProps$H(__spreadValues$O({}, config), {
    [key]: val
  }));
}
const updateDatasourcePluginJsonDataOption = (props, key, val) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps$H(__spreadValues$O({}, config), {
    jsonData: __spreadProps$H(__spreadValues$O({}, config.jsonData), {
      [key]: val
    })
  }));
};
const updateDatasourcePluginSecureJsonDataOption = (props, key, val) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps$H(__spreadValues$O({}, config), {
    secureJsonData: __spreadProps$H(__spreadValues$O({}, config.secureJsonData ? config.secureJsonData : {}), {
      [key]: val
    })
  }));
};
const updateDatasourcePluginResetOption = (props, key) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps$H(__spreadValues$O({}, config), {
    secureJsonData: __spreadProps$H(__spreadValues$O({}, config.secureJsonData ? config.secureJsonData : {}), {
      [key]: ""
    }),
    secureJsonFields: __spreadProps$H(__spreadValues$O({}, config.secureJsonFields), {
      [key]: false
    })
  }));
};

const history = {};
const deprecationWarning = (file, oldName, newName) => {
  let message = `[Deprecation warning] ${file}: ${oldName} is deprecated`;
  if (newName) {
    message += `. Use ${newName} instead`;
  }
  const now = Date.now();
  const last = history[message];
  if (!last || now - last > 1e4) {
    console.warn(message);
    history[message] = now;
  }
};

const units = ["y", "M", "w", "d", "h", "m", "s", "Q"];
function isMathString(text) {
  if (!text) {
    return false;
  }
  if (typeof text === "string" && (text.substring(0, 3) === "now" || text.includes("||"))) {
    return true;
  } else {
    return false;
  }
}
function parse(text, roundUp, timezone, fiscalYearStartMonth) {
  if (!text) {
    return void 0;
  }
  if (typeof text !== "string") {
    if (isDateTime(text)) {
      return text;
    }
    if (lodash.isDate(text)) {
      return dateTime(text);
    }
    return void 0;
  } else {
    let time;
    let mathString = "";
    let index;
    let parseString;
    if (text.substring(0, 3) === "now") {
      time = dateTimeForTimeZone(timezone);
      mathString = text.substring("now".length);
    } else {
      index = text.indexOf("||");
      if (index === -1) {
        parseString = text;
        mathString = "";
      } else {
        parseString = text.substring(0, index);
        mathString = text.substring(index + 2);
      }
      time = dateTime(parseString, ISO_8601);
    }
    if (!mathString.length) {
      return time;
    }
    return parseDateMath(mathString, time, roundUp, fiscalYearStartMonth);
  }
}
function isValid(text) {
  const date = parse(text);
  if (!date) {
    return false;
  }
  if (isDateTime(date)) {
    return date.isValid();
  }
  return false;
}
function parseDateMath(mathString, time, roundUp, fiscalYearStartMonth = 0) {
  const strippedMathString = mathString.replace(/\s/g, "");
  const result = dateTime(time);
  let i = 0;
  const len = strippedMathString.length;
  while (i < len) {
    const c = strippedMathString.charAt(i++);
    let type;
    let num;
    let unitString;
    let isFiscal = false;
    if (c === "/") {
      type = 0;
    } else if (c === "+") {
      type = 1;
    } else if (c === "-") {
      type = 2;
    } else {
      return void 0;
    }
    if (isNaN(parseInt(strippedMathString.charAt(i), 10))) {
      num = 1;
    } else if (strippedMathString.length === 2) {
      num = parseInt(strippedMathString.charAt(i), 10);
    } else {
      const numFrom = i;
      while (!isNaN(parseInt(strippedMathString.charAt(i), 10))) {
        i++;
        if (i > 10) {
          return void 0;
        }
      }
      num = parseInt(strippedMathString.substring(numFrom, i), 10);
    }
    if (type === 0) {
      if (num !== 1) {
        return void 0;
      }
    }
    unitString = strippedMathString.charAt(i++);
    if (unitString === "f") {
      unitString = strippedMathString.charAt(i++);
      isFiscal = true;
    }
    const unit = unitString;
    if (!lodash.includes(units, unit)) {
      return void 0;
    } else {
      if (type === 0) {
        if (isFiscal) {
          roundToFiscal(fiscalYearStartMonth, result, unit, roundUp);
        } else {
          if (roundUp) {
            result.endOf(unit);
          } else {
            result.startOf(unit);
          }
        }
      } else if (type === 1) {
        result.add(num, unit);
      } else if (type === 2) {
        result.subtract(num, unit);
      }
    }
  }
  return result;
}
function roundToFiscal(fyStartMonth, dateTime2, unit, roundUp) {
  switch (unit) {
    case "y":
      if (roundUp) {
        roundToFiscal(fyStartMonth, dateTime2, unit, false).add(11, "M").endOf("M");
      } else {
        dateTime2.subtract((dateTime2.month() - fyStartMonth + 12) % 12, "M").startOf("M");
      }
      return dateTime2;
    case "Q":
      if (roundUp) {
        roundToFiscal(fyStartMonth, dateTime2, unit, false).add(2, "M").endOf("M");
      } else {
        dateTime2.subtract((dateTime2.month() - fyStartMonth + 12) % 3, "M").startOf("M");
      }
      return dateTime2;
    default:
      return void 0;
  }
}

var datemath = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isMathString: isMathString,
  parse: parse,
  isValid: isValid,
  parseDateMath: parseDateMath,
  roundToFiscal: roundToFiscal
});

let defaultTimeZoneResolver = () => DefaultTimeZone;
const setTimeZoneResolver = (resolver) => {
  defaultTimeZoneResolver = resolver != null ? resolver : defaultTimeZoneResolver;
};
const getTimeZone = (options) => {
  var _a;
  if ((options == null ? void 0 : options.timeZone) && !lodash.isEmpty(options.timeZone)) {
    return options.timeZone;
  }
  return (_a = defaultTimeZoneResolver()) != null ? _a : DefaultTimeZone;
};

var __defProp$V = Object.defineProperty;
var __defNormalProp$V = (obj, key, value) => key in obj ? __defProp$V(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$f = (obj, key, value) => {
  __defNormalProp$V(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const DEFAULT_SYSTEM_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DEFAULT_SYSTEM_DATE_MS_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";
class SystemDateFormatsState {
  constructor() {
    __publicField$f(this, "fullDate", DEFAULT_SYSTEM_DATE_FORMAT);
    __publicField$f(this, "fullDateMS", DEFAULT_SYSTEM_DATE_MS_FORMAT);
    __publicField$f(this, "interval", {
      millisecond: "HH:mm:ss.SSS",
      second: "HH:mm:ss",
      minute: "HH:mm",
      hour: "MM/DD HH:mm",
      day: "MM/DD",
      month: "YYYY-MM",
      year: "YYYY"
    });
  }
  update(settings) {
    this.fullDate = settings.fullDate;
    this.interval = settings.interval;
    if (settings.useBrowserLocale) {
      this.useBrowserLocale();
    }
  }
  useBrowserLocale() {
    this.fullDate = localTimeFormat({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    this.fullDateMS = this.fullDate.replace("ss", "ss.SSS");
    this.interval.millisecond = localTimeFormat(
      { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false },
      null,
      this.interval.second
    ).replace("ss", "ss.SSS");
    this.interval.second = localTimeFormat(
      { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false },
      null,
      this.interval.second
    );
    this.interval.minute = localTimeFormat(
      { hour: "2-digit", minute: "2-digit", hour12: false },
      null,
      this.interval.minute
    );
    this.interval.hour = localTimeFormat(
      { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false },
      null,
      this.interval.hour
    );
    this.interval.day = localTimeFormat({ month: "2-digit", day: "2-digit", hour12: false }, null, this.interval.day);
    this.interval.month = localTimeFormat(
      { year: "numeric", month: "2-digit", hour12: false },
      null,
      this.interval.month
    );
  }
  getTimeFieldUnit(useMsResolution) {
    return `time:${useMsResolution ? this.fullDateMS : this.fullDate}`;
  }
}
function localTimeFormat(options, locale, fallback) {
  if (missingIntlDateTimeFormatSupport()) {
    return fallback != null ? fallback : DEFAULT_SYSTEM_DATE_FORMAT;
  }
  if (!locale && navigator) {
    locale = [...navigator.languages];
  }
  const dateTimeFormat = new Intl.DateTimeFormat(locale || void 0, options);
  const parts = dateTimeFormat.formatToParts(/* @__PURE__ */ new Date());
  const hour12 = dateTimeFormat.resolvedOptions().hour12;
  const mapping = {
    year: "YYYY",
    month: "MM",
    day: "DD",
    hour: hour12 ? "hh" : "HH",
    minute: "mm",
    second: "ss",
    weekday: "ddd",
    era: "N",
    dayPeriod: "A",
    timeZoneName: "Z"
  };
  return parts.map((part) => mapping[part.type] || part.value).join("");
}
const systemDateFormats = new SystemDateFormatsState();
const missingIntlDateTimeFormatSupport = () => {
  return !("DateTimeFormat" in Intl) || !("formatToParts" in Intl.DateTimeFormat.prototype);
};

const dateTimeFormat = (dateInUtc, options) => toTz(dateInUtc, getTimeZone(options)).format(getFormat(options));
const dateTimeFormatISO = (dateInUtc, options) => toTz(dateInUtc, getTimeZone(options)).format();
const dateTimeFormatTimeAgo = (dateInUtc, options) => toTz(dateInUtc, getTimeZone(options)).fromNow();
const dateTimeFormatWithAbbrevation = (dateInUtc, options) => toTz(dateInUtc, getTimeZone(options)).format(`${systemDateFormats.fullDate} z`);
const timeZoneAbbrevation = (dateInUtc, options) => toTz(dateInUtc, getTimeZone(options)).format("z");
const getFormat = (options) => {
  var _a, _b;
  if (options == null ? void 0 : options.defaultWithMS) {
    return (_a = options == null ? void 0 : options.format) != null ? _a : systemDateFormats.fullDateMS;
  }
  return (_b = options == null ? void 0 : options.format) != null ? _b : systemDateFormats.fullDate;
};
const toTz = (dateInUtc, timeZone) => {
  const date = dateInUtc;
  const zone = moment__default$1["default"].tz.zone(timeZone);
  if (zone && zone.name) {
    return dateTimeAsMoment(toUtc(date)).tz(zone.name);
  }
  switch (timeZone) {
    case "utc":
      return dateTimeAsMoment(toUtc(date));
    default:
      return dateTimeAsMoment(toUtc(date)).local();
  }
};

const dateTimeParse = (value, options) => {
  if (isDateTime(value)) {
    return value;
  }
  if (typeof value === "string") {
    return parseString(value, options);
  }
  return parseOthers(value, options);
};
const parseString = (value, options) => {
  var _a;
  if (value.indexOf("now") !== -1) {
    if (!isValid(value)) {
      return dateTime();
    }
    const parsed = parse(value, options == null ? void 0 : options.roundUp, options == null ? void 0 : options.timeZone, options == null ? void 0 : options.fiscalYearStartMonth);
    return parsed || dateTime();
  }
  const timeZone = getTimeZone(options);
  const zone = moment__default$1["default"].tz.zone(timeZone);
  const format = (_a = options == null ? void 0 : options.format) != null ? _a : systemDateFormats.fullDate;
  if (zone && zone.name) {
    return dateTimeForTimeZone(zone.name, value, format);
  }
  switch (lodash.lowerCase(timeZone)) {
    case "utc":
      return toUtc(value, format);
    default:
      return dateTime(value, format);
  }
};
const parseOthers = (value, options) => {
  const date = value;
  const timeZone = getTimeZone(options);
  const zone = moment__default$1["default"].tz.zone(timeZone);
  if (zone && zone.name) {
    return dateTimeForTimeZone(zone.name, date);
  }
  switch (lodash.lowerCase(timeZone)) {
    case "utc":
      return toUtc(date);
    default:
      return dateTime(date);
  }
};

const spans = {
  s: { display: "second" },
  m: { display: "minute" },
  h: { display: "hour" },
  d: { display: "day" },
  w: { display: "week" },
  M: { display: "month" },
  y: { display: "year" }
};
const rangeOptions = [
  { from: "now/d", to: "now/d", display: "Today" },
  { from: "now/d", to: "now", display: "Today so far" },
  { from: "now/w", to: "now/w", display: "This week" },
  { from: "now/w", to: "now", display: "This week so far" },
  { from: "now/M", to: "now/M", display: "This month" },
  { from: "now/M", to: "now", display: "This month so far" },
  { from: "now/y", to: "now/y", display: "This year" },
  { from: "now/y", to: "now", display: "This year so far" },
  { from: "now-1d/d", to: "now-1d/d", display: "Yesterday" },
  {
    from: "now-2d/d",
    to: "now-2d/d",
    display: "Day before yesterday"
  },
  {
    from: "now-7d/d",
    to: "now-7d/d",
    display: "This day last week"
  },
  { from: "now-1w/w", to: "now-1w/w", display: "Previous week" },
  { from: "now-1M/M", to: "now-1M/M", display: "Previous month" },
  { from: "now-1Q/fQ", to: "now-1Q/fQ", display: "Previous fiscal quarter" },
  { from: "now-1y/y", to: "now-1y/y", display: "Previous year" },
  { from: "now-1y/fy", to: "now-1y/fy", display: "Previous fiscal year" },
  { from: "now-5m", to: "now", display: "Last 5 minutes" },
  { from: "now-15m", to: "now", display: "Last 15 minutes" },
  { from: "now-30m", to: "now", display: "Last 30 minutes" },
  { from: "now-1h", to: "now", display: "Last 1 hour" },
  { from: "now-3h", to: "now", display: "Last 3 hours" },
  { from: "now-6h", to: "now", display: "Last 6 hours" },
  { from: "now-12h", to: "now", display: "Last 12 hours" },
  { from: "now-24h", to: "now", display: "Last 24 hours" },
  { from: "now-2d", to: "now", display: "Last 2 days" },
  { from: "now-7d", to: "now", display: "Last 7 days" },
  { from: "now-30d", to: "now", display: "Last 30 days" },
  { from: "now-90d", to: "now", display: "Last 90 days" },
  { from: "now-6M", to: "now", display: "Last 6 months" },
  { from: "now-1y", to: "now", display: "Last 1 year" },
  { from: "now-2y", to: "now", display: "Last 2 years" },
  { from: "now-5y", to: "now", display: "Last 5 years" },
  { from: "now/fQ", to: "now", display: "This fiscal quarter so far" },
  { from: "now/fQ", to: "now/fQ", display: "This fiscal quarter" },
  { from: "now/fy", to: "now", display: "This fiscal year so far" },
  { from: "now/fy", to: "now/fy", display: "This fiscal year" }
];
const hiddenRangeOptions = [
  { from: "now", to: "now+1m", display: "Next minute" },
  { from: "now", to: "now+5m", display: "Next 5 minutes" },
  { from: "now", to: "now+15m", display: "Next 15 minutes" },
  { from: "now", to: "now+30m", display: "Next 30 minutes" },
  { from: "now", to: "now+1h", display: "Next hour" },
  { from: "now", to: "now+3h", display: "Next 3 hours" },
  { from: "now", to: "now+6h", display: "Next 6 hours" },
  { from: "now", to: "now+12h", display: "Next 12 hours" },
  { from: "now", to: "now+24h", display: "Next 24 hours" },
  { from: "now", to: "now+2d", display: "Next 2 days" },
  { from: "now", to: "now+7d", display: "Next 7 days" },
  { from: "now", to: "now+30d", display: "Next 30 days" },
  { from: "now", to: "now+90d", display: "Next 90 days" },
  { from: "now", to: "now+6M", display: "Next 6 months" },
  { from: "now", to: "now+1y", display: "Next year" },
  { from: "now", to: "now+2y", display: "Next 2 years" },
  { from: "now", to: "now+5y", display: "Next 5 years" }
];
const rangeIndex = {};
lodash.each(rangeOptions, (frame) => {
  rangeIndex[frame.from + " to " + frame.to] = frame;
});
lodash.each(hiddenRangeOptions, (frame) => {
  rangeIndex[frame.from + " to " + frame.to] = frame;
});
function describeTextRange(expr) {
  const isLast = expr.indexOf("+") !== 0;
  if (expr.indexOf("now") === -1) {
    expr = (isLast ? "now-" : "now") + expr;
  }
  let opt = rangeIndex[expr + " to now"];
  if (opt) {
    return opt;
  }
  if (isLast) {
    opt = { from: expr, to: "now", display: "" };
  } else {
    opt = { from: "now", to: expr, display: "" };
  }
  const parts = /^now([-+])(\d+)(\w)/.exec(expr);
  if (parts) {
    const unit = parts[3];
    const amount = parseInt(parts[2], 10);
    const span = spans[unit];
    if (span) {
      opt.display = isLast ? "Last " : "Next ";
      opt.display += amount + " " + span.display;
      opt.section = span.section;
      if (amount > 1) {
        opt.display += "s";
      }
    }
  } else {
    opt.display = opt.from + " to " + opt.to;
    opt.invalid = true;
  }
  return opt;
}
function describeTimeRange(range, timeZone) {
  const option = rangeIndex[range.from.toString() + " to " + range.to.toString()];
  if (option) {
    return option.display;
  }
  const options = { timeZone };
  if (isDateTime(range.from) && isDateTime(range.to)) {
    return dateTimeFormat(range.from, options) + " to " + dateTimeFormat(range.to, options);
  }
  if (isDateTime(range.from)) {
    const parsed = parse(range.to, true, "utc");
    return parsed ? dateTimeFormat(range.from, options) + " to " + dateTimeFormatTimeAgo(parsed, options) : "";
  }
  if (isDateTime(range.to)) {
    const parsed = parse(range.from, false, "utc");
    return parsed ? dateTimeFormatTimeAgo(parsed, options) + " to " + dateTimeFormat(range.to, options) : "";
  }
  if (range.to.toString() === "now") {
    const res = describeTextRange(range.from);
    return res.display;
  }
  return range.from.toString() + " to " + range.to.toString();
}
const isValidTimeSpan = (value) => {
  if (value.indexOf("$") === 0 || value.indexOf("+$") === 0) {
    return true;
  }
  const info = describeTextRange(value);
  return info.invalid !== true;
};
const describeTimeRangeAbbreviation = (range, timeZone) => {
  if (isDateTime(range.from)) {
    return timeZoneAbbrevation(range.from, { timeZone });
  }
  const parsed = parse(range.from, true);
  return parsed ? timeZoneAbbrevation(parsed, { timeZone }) : "";
};
const convertRawToRange = (raw, timeZone, fiscalYearStartMonth, format) => {
  const from = dateTimeParse(raw.from, { roundUp: false, timeZone, fiscalYearStartMonth, format });
  const to = dateTimeParse(raw.to, { roundUp: true, timeZone, fiscalYearStartMonth, format });
  if (isMathString(raw.from) || isMathString(raw.to)) {
    return { from, to, raw };
  }
  return { from, to, raw: { from, to } };
};
function isRelativeTime(v) {
  if (typeof v === "string") {
    return v.indexOf("now") >= 0;
  }
  return false;
}
function isFiscal(timeRange) {
  if (typeof timeRange.raw.from === "string" && timeRange.raw.from.indexOf("f") > 0) {
    return true;
  } else if (typeof timeRange.raw.to === "string" && timeRange.raw.to.indexOf("f") > 0) {
    return true;
  }
  return false;
}
function isRelativeTimeRange(raw) {
  return isRelativeTime(raw.from) || isRelativeTime(raw.to);
}
function secondsToHms(seconds) {
  const numYears = Math.floor(seconds / 31536e3);
  if (numYears) {
    return numYears + "y";
  }
  const numDays = Math.floor(seconds % 31536e3 / 86400);
  if (numDays) {
    return numDays + "d";
  }
  const numHours = Math.floor(seconds % 31536e3 % 86400 / 3600);
  if (numHours) {
    return numHours + "h";
  }
  const numMinutes = Math.floor(seconds % 31536e3 % 86400 % 3600 / 60);
  if (numMinutes) {
    return numMinutes + "m";
  }
  const numSeconds = Math.floor(seconds % 31536e3 % 86400 % 3600 % 60);
  if (numSeconds) {
    return numSeconds + "s";
  }
  const numMilliseconds = Math.floor(seconds * 1e3);
  if (numMilliseconds) {
    return numMilliseconds + "ms";
  }
  return "less than a millisecond";
}
function msRangeToTimeString(rangeMs) {
  const rangeSec = Number((rangeMs / 1e3).toFixed());
  const h = Math.floor(rangeSec / 60 / 60);
  const m = Math.floor(rangeSec / 60) - h * 60;
  const s = Number((rangeSec % 60).toFixed());
  let formattedH = h ? h + "h" : "";
  let formattedM = m ? m + "min" : "";
  let formattedS = s ? s + "sec" : "";
  formattedH && formattedM ? formattedH = formattedH + " " : formattedH = formattedH;
  (formattedM || formattedH) && formattedS ? formattedM = formattedM + " " : formattedM = formattedM;
  return formattedH + formattedM + formattedS || "less than 1sec";
}
function calculateInterval(range, resolution, lowLimitInterval) {
  let lowLimitMs = 1;
  if (lowLimitInterval) {
    lowLimitMs = intervalToMs(lowLimitInterval);
  }
  let intervalMs = roundInterval((range.to.valueOf() - range.from.valueOf()) / resolution);
  if (lowLimitMs > intervalMs) {
    intervalMs = lowLimitMs;
  }
  return {
    intervalMs,
    interval: secondsToHms(intervalMs / 1e3)
  };
}
const interval_regex = /(-?\d+(?:\.\d+)?)(ms|[Mwdhmsy])/;
const intervals_in_seconds = {
  y: 31536e3,
  M: 2592e3,
  w: 604800,
  d: 86400,
  h: 3600,
  m: 60,
  s: 1,
  ms: 1e-3
};
function describeInterval(str) {
  if (Number(str)) {
    return {
      sec: intervals_in_seconds.s,
      type: "s",
      count: parseInt(str, 10)
    };
  }
  const matches = str.match(interval_regex);
  if (!matches) {
    throw new Error(
      `Invalid interval string, has to be either unit-less or end with one of the following units: "${Object.keys(
        intervals_in_seconds
      ).join(", ")}"`
    );
  }
  const sec = intervals_in_seconds[matches[2]];
  if (sec === void 0) {
    throw new Error("describeInterval failed: invalid interval string");
  }
  return {
    sec,
    type: matches[2],
    count: parseInt(matches[1], 10)
  };
}
function intervalToSeconds(str) {
  const info = describeInterval(str);
  return info.sec * info.count;
}
function intervalToMs(str) {
  const info = describeInterval(str);
  return info.sec * 1e3 * info.count;
}
function roundInterval(interval) {
  switch (true) {
    case interval < 10:
      return 1;
    case interval < 15:
      return 10;
    case interval < 35:
      return 20;
    case interval < 75:
      return 50;
    case interval < 150:
      return 100;
    case interval < 350:
      return 200;
    case interval < 750:
      return 500;
    case interval < 1500:
      return 1e3;
    case interval < 3500:
      return 2e3;
    case interval < 7500:
      return 5e3;
    case interval < 12500:
      return 1e4;
    case interval < 17500:
      return 15e3;
    case interval < 25e3:
      return 2e4;
    case interval < 45e3:
      return 3e4;
    case interval < 9e4:
      return 6e4;
    case interval < 21e4:
      return 12e4;
    case interval < 45e4:
      return 3e5;
    case interval < 75e4:
      return 6e5;
    case interval < 105e4:
      return 9e5;
    case interval < 15e5:
      return 12e5;
    case interval < 27e5:
      return 18e5;
    case interval < 54e5:
      return 36e5;
    case interval < 9e6:
      return 72e5;
    case interval < 162e5:
      return 108e5;
    case interval < 324e5:
      return 216e5;
    case interval < 864e5:
      return 432e5;
    case interval < 6048e5:
      return 864e5;
    case interval < 18144e5:
      return 6048e5;
    case interval < 36288e5:
      return 2592e6;
    default:
      return 31536e6;
  }
}
function timeRangeToRelative(timeRange, now = dateTime()) {
  const from = now.unix() - timeRange.from.unix();
  const to = now.unix() - timeRange.to.unix();
  return {
    from,
    to
  };
}
function relativeToTimeRange(relativeTimeRange, now = dateTime()) {
  const from = dateTime(now).subtract(relativeTimeRange.from, "s");
  const to = relativeTimeRange.to === 0 ? dateTime(now) : dateTime(now).subtract(relativeTimeRange.to, "s");
  return {
    from,
    to,
    raw: { from, to }
  };
}

var rangeutil = /*#__PURE__*/Object.freeze({
  __proto__: null,
  describeTextRange: describeTextRange,
  describeTimeRange: describeTimeRange,
  isValidTimeSpan: isValidTimeSpan,
  describeTimeRangeAbbreviation: describeTimeRangeAbbreviation,
  convertRawToRange: convertRawToRange,
  isRelativeTime: isRelativeTime,
  isFiscal: isFiscal,
  isRelativeTimeRange: isRelativeTimeRange,
  secondsToHms: secondsToHms,
  msRangeToTimeString: msRangeToTimeString,
  calculateInterval: calculateInterval,
  describeInterval: describeInterval,
  intervalToSeconds: intervalToSeconds,
  intervalToMs: intervalToMs,
  roundInterval: roundInterval,
  timeRangeToRelative: timeRangeToRelative,
  relativeToTimeRange: relativeToTimeRange
});

var __defProp$U = Object.defineProperty;
var __defProps$G = Object.defineProperties;
var __getOwnPropDescs$G = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$O = Object.getOwnPropertySymbols;
var __hasOwnProp$O = Object.prototype.hasOwnProperty;
var __propIsEnum$O = Object.prototype.propertyIsEnumerable;
var __defNormalProp$U = (obj, key, value) => key in obj ? __defProp$U(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$N = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$O.call(b, prop))
      __defNormalProp$U(a, prop, b[prop]);
  if (__getOwnPropSymbols$O)
    for (var prop of __getOwnPropSymbols$O(b)) {
      if (__propIsEnum$O.call(b, prop))
        __defNormalProp$U(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$G = (a, b) => __defProps$G(a, __getOwnPropDescs$G(b));
var InternalTimeZones = /* @__PURE__ */ ((InternalTimeZones2) => {
  InternalTimeZones2["default"] = "";
  InternalTimeZones2["localBrowserTime"] = "browser";
  InternalTimeZones2["utc"] = "utc";
  return InternalTimeZones2;
})(InternalTimeZones || {});
const timeZoneFormatUserFriendly = (timeZone) => {
  switch (getTimeZone({ timeZone })) {
    case "browser":
      return "Local browser time";
    case "utc":
      return "UTC";
    default:
      return timeZone;
  }
};
const getZone = (timeZone) => {
  return moment__default$1["default"].tz.zone(timeZone);
};
const getTimeZoneInfo = (zone, timestamp) => {
  const internal = mapInternal(zone, timestamp);
  if (internal) {
    return internal;
  }
  return mapToInfo(zone, timestamp);
};
const getTimeZones = lodash.memoize((includeInternal = false) => {
  const initial = [];
  if (includeInternal === true) {
    initial.push("" /* default */, "browser" /* localBrowserTime */, "utc" /* utc */);
  } else if (includeInternal) {
    initial.push(...includeInternal);
  }
  return moment__default$1["default"].tz.names().reduce((zones, zone) => {
    const countriesForZone = countriesByTimeZone[zone];
    if (!Array.isArray(countriesForZone) || countriesForZone.length === 0) {
      return zones;
    }
    zones.push(zone);
    return zones;
  }, initial);
});
const getTimeZoneGroups = lodash.memoize(
  (includeInternal = false) => {
    const timeZones = getTimeZones(includeInternal);
    const groups = timeZones.reduce((groups2, zone) => {
      var _a, _b;
      const delimiter = zone.indexOf("/");
      if (delimiter === -1) {
        const group2 = "";
        groups2[group2] = (_a = groups2[group2]) != null ? _a : [];
        groups2[group2].push(zone);
        return groups2;
      }
      const group = zone.slice(0, delimiter);
      groups2[group] = (_b = groups2[group]) != null ? _b : [];
      groups2[group].push(zone);
      return groups2;
    }, {});
    return Object.keys(groups).map((name) => ({
      name,
      zones: groups[name]
    }));
  }
);
const mapInternal = (zone, timestamp) => {
  var _a, _b, _c, _d;
  switch (zone) {
    case "utc" /* utc */: {
      return {
        name: "Coordinated Universal Time",
        ianaName: "UTC",
        zone,
        countries: [],
        abbreviation: "UTC, GMT",
        offsetInMins: 0
      };
    }
    case "" /* default */: {
      const tz = getTimeZone();
      const isInternal = tz === "browser" || tz === "utc";
      const info = isInternal ? mapInternal(tz, timestamp) : mapToInfo(tz, timestamp);
      return __spreadProps$G(__spreadValues$N({
        countries: (_a = countriesByTimeZone[tz]) != null ? _a : [],
        abbreviation: "",
        offsetInMins: 0
      }, info), {
        ianaName: (_b = info == null ? void 0 : info.ianaName) != null ? _b : "",
        name: "Default",
        zone
      });
    }
    case "browser" /* localBrowserTime */: {
      const tz = moment__default$1["default"].tz.guess(true);
      const info = mapToInfo(tz, timestamp);
      return __spreadProps$G(__spreadValues$N({
        countries: (_c = countriesByTimeZone[tz]) != null ? _c : [],
        abbreviation: "Your local time",
        offsetInMins: (/* @__PURE__ */ new Date()).getTimezoneOffset()
      }, info), {
        name: "Browser Time",
        ianaName: (_d = info == null ? void 0 : info.ianaName) != null ? _d : "",
        zone
      });
    }
    default:
      return void 0;
  }
};
const abbrevationWithoutOffset = (abbrevation) => {
  if (/^(\+|\-).+/.test(abbrevation)) {
    return "";
  }
  return abbrevation;
};
const mapToInfo = (timeZone, timestamp) => {
  var _a;
  const momentTz = moment__default$1["default"].tz.zone(timeZone);
  if (!momentTz) {
    return void 0;
  }
  return {
    name: timeZone,
    ianaName: momentTz.name,
    zone: timeZone,
    countries: (_a = countriesByTimeZone[timeZone]) != null ? _a : [],
    abbreviation: abbrevationWithoutOffset(momentTz.abbr(timestamp)),
    offsetInMins: momentTz.utcOffset(timestamp)
  };
};
const countryByCode = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic Of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States Of)",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};
const countriesByTimeZone = (() => {
  return moment__default$1["default"].tz.countries().reduce((all, code) => {
    const timeZones = moment__default$1["default"].tz.zonesForCountry(code);
    return timeZones.reduce((all2, timeZone) => {
      if (!all2[timeZone]) {
        all2[timeZone] = [];
      }
      const name = countryByCode[code];
      if (!name) {
        return all2;
      }
      all2[timeZone].push({ code, name });
      return all2;
    }, all);
  }, {});
})();

var __defProp$T = Object.defineProperty;
var __defProps$F = Object.defineProperties;
var __getOwnPropDescs$F = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$N = Object.getOwnPropertySymbols;
var __hasOwnProp$N = Object.prototype.hasOwnProperty;
var __propIsEnum$N = Object.prototype.propertyIsEnumerable;
var __defNormalProp$T = (obj, key, value) => key in obj ? __defProp$T(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$M = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$N.call(b, prop))
      __defNormalProp$T(a, prop, b[prop]);
  if (__getOwnPropSymbols$N)
    for (var prop of __getOwnPropSymbols$N(b)) {
      if (__propIsEnum$N.call(b, prop))
        __defNormalProp$T(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$F = (a, b) => __defProps$F(a, __getOwnPropDescs$F(b));
const durationMap = {
  years: ["y", "Y", "years"],
  months: ["M", "months"],
  weeks: ["w", "W", "weeks"],
  days: ["d", "D", "days"],
  hours: ["h", "H", "hours"],
  minutes: ["m", "minutes"],
  seconds: ["s", "S", "seconds"]
};
function intervalToAbbreviatedDurationString(interval, includeSeconds = true) {
  if (dateFns.isAfter(interval.start, interval.end)) {
    return "";
  }
  const duration = dateFns.intervalToDuration(interval);
  return Object.entries(duration).reduce((str, [unit, value]) => {
    if (value && value !== 0 && !(unit === "seconds" && !includeSeconds && str)) {
      const padding = str !== "" ? " " : "";
      return str + `${padding}${value}${durationMap[unit][0]}`;
    }
    return str;
  }, "");
}
function parseDuration(durationString) {
  return durationString.split(" ").reduce((acc, value) => {
    const match = value.match(/(\d+)(.+)/);
    const rawLength = match == null ? void 0 : match[1];
    const unit = match == null ? void 0 : match[2];
    if (!(rawLength && unit)) {
      return acc;
    }
    const mapping = Object.entries(durationMap).find(([_, abbreviations]) => abbreviations == null ? void 0 : abbreviations.includes(match[2]));
    const length = parseInt(rawLength, 10);
    return mapping ? __spreadProps$F(__spreadValues$M({}, acc), { [mapping[0]]: length }) : acc;
  }, {});
}
function addDurationToDate(date, duration) {
  return dateFns.add(date, duration);
}
function durationToMilliseconds(duration) {
  const now = /* @__PURE__ */ new Date();
  return addDurationToDate(now, duration).getTime() - now.getTime();
}
function isValidDate(dateString) {
  return !isNaN(Date.parse(dateString));
}
function isValidDuration(durationString) {
  var _a;
  for (const value of durationString.trim().split(" ")) {
    const match = value.match(/(\d+)(.+)/);
    if (match === null || match.length !== 3) {
      return false;
    }
    const key = (_a = Object.entries(durationMap).find(([_, abbreviations]) => abbreviations == null ? void 0 : abbreviations.includes(match[2]))) == null ? void 0 : _a[0];
    if (!key) {
      return false;
    }
  }
  return true;
}
function isValidGoDuration(durationString) {
  const timeUnits = ["h", "m", "s", "ms", "us", "\xB5s", "ns"];
  return validateDurationByUnits(durationString, timeUnits);
}
function isValidGrafanaDuration(durationString) {
  const timeUnits = ["y", "M", "w", "d", "h", "m", "s", "ms", "us", "\xB5s", "ns"];
  return validateDurationByUnits(durationString, timeUnits);
}
function validateDurationByUnits(durationString, timeUnits) {
  for (const value of durationString.trim().split(" ")) {
    const match = value.match(/([0-9]*[.]?[0-9]+)(.+)/);
    if (match === null || match.length !== 3) {
      return false;
    }
    const isValidUnit = timeUnits.includes(match[2]);
    if (!isValidUnit) {
      return false;
    }
  }
  return true;
}

const fieldIndexComparer = (field, reverse = false) => {
  const values = field.values;
  switch (field.type) {
    case FieldType.number:
      return numericIndexComparer(values, reverse);
    case FieldType.string:
      return stringIndexComparer(values, reverse);
    case FieldType.boolean:
      return booleanIndexComparer(values, reverse);
    case FieldType.time:
      if (typeof field.values[0] === "number") {
        return timestampIndexComparer(values, reverse);
      }
      return timeIndexComparer(values, reverse);
    default:
      return naturalIndexComparer(reverse);
  }
};
const timeComparer = (a, b) => {
  if (!a || !b) {
    return falsyComparer(a, b);
  }
  if (lodash.isNumber(a) && lodash.isNumber(b)) {
    return numericComparer(a, b);
  }
  if (isDateTimeInput(a) && isDateTimeInput(b)) {
    if (dateTime(a).isBefore(b)) {
      return -1;
    }
    if (dateTime(b).isBefore(a)) {
      return 1;
    }
  }
  return 0;
};
const numericComparer = (a, b) => {
  return a - b;
};
const stringComparer = (a, b) => {
  if (!a || !b) {
    return falsyComparer(a, b);
  }
  return a.localeCompare(b);
};
const booleanComparer = (a, b) => {
  return falsyComparer(a, b);
};
const falsyComparer = (a, b) => {
  if (!a && b) {
    return 1;
  }
  if (a && !b) {
    return -1;
  }
  return 0;
};
const timestampIndexComparer = (values, reverse) => {
  let mult = reverse ? -1 : 1;
  return (a, b) => mult * (values[a] - values[b]);
};
const timeIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? timeComparer(vB, vA) : timeComparer(vA, vB);
  };
};
const booleanIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? booleanComparer(vB, vA) : booleanComparer(vA, vB);
  };
};
const numericIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? numericComparer(vB, vA) : numericComparer(vA, vB);
  };
};
const stringIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? stringComparer(vB, vA) : stringComparer(vA, vB);
  };
};
const naturalIndexComparer = (reverse) => {
  return (a, b) => {
    return reverse ? numericComparer(b, a) : numericComparer(a, b);
  };
};

var MatcherID = /* @__PURE__ */ ((MatcherID2) => {
  MatcherID2["anyMatch"] = "anyMatch";
  MatcherID2["allMatch"] = "allMatch";
  MatcherID2["invertMatch"] = "invertMatch";
  MatcherID2["alwaysMatch"] = "alwaysMatch";
  MatcherID2["neverMatch"] = "neverMatch";
  return MatcherID2;
})(MatcherID || {});
var FieldMatcherID = /* @__PURE__ */ ((FieldMatcherID2) => {
  FieldMatcherID2["numeric"] = "numeric";
  FieldMatcherID2["time"] = "time";
  FieldMatcherID2["first"] = "first";
  FieldMatcherID2["firstTimeField"] = "firstTimeField";
  FieldMatcherID2["byType"] = "byType";
  FieldMatcherID2["byTypes"] = "byTypes";
  FieldMatcherID2["byName"] = "byName";
  FieldMatcherID2["byNames"] = "byNames";
  FieldMatcherID2["byRegexp"] = "byRegexp";
  FieldMatcherID2["byRegexpOrNames"] = "byRegexpOrNames";
  FieldMatcherID2["byFrameRefID"] = "byFrameRefID";
  FieldMatcherID2["byValue"] = "byValue";
  return FieldMatcherID2;
})(FieldMatcherID || {});
var FrameMatcherID = /* @__PURE__ */ ((FrameMatcherID2) => {
  FrameMatcherID2["byName"] = "byName";
  FrameMatcherID2["byRefId"] = "byRefId";
  FrameMatcherID2["byIndex"] = "byIndex";
  return FrameMatcherID2;
})(FrameMatcherID || {});
var ValueMatcherID = /* @__PURE__ */ ((ValueMatcherID2) => {
  ValueMatcherID2["regex"] = "regex";
  ValueMatcherID2["isNull"] = "isNull";
  ValueMatcherID2["isNotNull"] = "isNotNull";
  ValueMatcherID2["greater"] = "greater";
  ValueMatcherID2["greaterOrEqual"] = "greaterOrEqual";
  ValueMatcherID2["lower"] = "lower";
  ValueMatcherID2["lowerOrEqual"] = "lowerOrEqual";
  ValueMatcherID2["equal"] = "equal";
  ValueMatcherID2["notEqual"] = "notEqual";
  ValueMatcherID2["substring"] = "substring";
  ValueMatcherID2["notSubstring"] = "notSubstring";
  ValueMatcherID2["between"] = "between";
  return ValueMatcherID2;
})(ValueMatcherID || {});

var DataTransformerID = /* @__PURE__ */ ((DataTransformerID2) => {
  DataTransformerID2["append"] = "append";
  DataTransformerID2["reduce"] = "reduce";
  DataTransformerID2["order"] = "order";
  DataTransformerID2["organize"] = "organize";
  DataTransformerID2["rename"] = "rename";
  DataTransformerID2["calculateField"] = "calculateField";
  DataTransformerID2["seriesToColumns"] = "seriesToColumns";
  DataTransformerID2["seriesToRows"] = "seriesToRows";
  DataTransformerID2["merge"] = "merge";
  DataTransformerID2["concatenate"] = "concatenate";
  DataTransformerID2["labelsToFields"] = "labelsToFields";
  DataTransformerID2["filterFields"] = "filterFields";
  DataTransformerID2["filterFieldsByName"] = "filterFieldsByName";
  DataTransformerID2["filterFrames"] = "filterFrames";
  DataTransformerID2["filterByRefId"] = "filterByRefId";
  DataTransformerID2["renameByRegex"] = "renameByRegex";
  DataTransformerID2["filterByValue"] = "filterByValue";
  DataTransformerID2["noop"] = "noop";
  DataTransformerID2["ensureColumns"] = "ensureColumns";
  DataTransformerID2["groupBy"] = "groupBy";
  DataTransformerID2["sortBy"] = "sortBy";
  DataTransformerID2["histogram"] = "histogram";
  DataTransformerID2["configFromData"] = "configFromData";
  DataTransformerID2["rowsToFields"] = "rowsToFields";
  DataTransformerID2["prepareTimeSeries"] = "prepareTimeSeries";
  DataTransformerID2["convertFieldType"] = "convertFieldType";
  DataTransformerID2["fieldLookup"] = "fieldLookup";
  DataTransformerID2["heatmap"] = "heatmap";
  DataTransformerID2["spatial"] = "spatial";
  DataTransformerID2["joinByField"] = "joinByField";
  DataTransformerID2["joinByLabels"] = "joinByLabels";
  DataTransformerID2["extractFields"] = "extractFields";
  DataTransformerID2["groupingToMatrix"] = "groupingToMatrix";
  DataTransformerID2["limit"] = "limit";
  DataTransformerID2["partitionByValues"] = "partitionByValues";
  DataTransformerID2["timeSeriesTable"] = "timeSeriesTable";
  DataTransformerID2["formatTime"] = "formatTime";
  DataTransformerID2["formatString"] = "formatString";
  DataTransformerID2["regression"] = "regression";
  DataTransformerID2["groupToNestedTable"] = "groupToNestedTable";
  return DataTransformerID2;
})(DataTransformerID || {});

const fieldTypeMatcher = {
  id: FieldMatcherID.byType,
  name: "Field Type",
  description: "match based on the field type",
  defaultOptions: FieldType.number,
  get: (type) => {
    return (field, frame, allFrames) => {
      return type === field.type;
    };
  },
  getOptionsDisplayText: (type) => {
    return `Field type: ${type}`;
  }
};
const fieldTypesMatcher = {
  id: FieldMatcherID.byTypes,
  name: "Field Type",
  description: "match based on the field types",
  defaultOptions: /* @__PURE__ */ new Set(),
  get: (types) => {
    return (field, frame, allFrames) => {
      return types.has(field.type);
    };
  },
  getOptionsDisplayText: (types) => {
    return `Field types: ${[...types].join(" | ")}`;
  }
};
const numericMatcher = {
  id: FieldMatcherID.numeric,
  name: "Numeric Fields",
  description: "Fields with type number",
  get: () => {
    return fieldTypeMatcher.get(FieldType.number);
  },
  getOptionsDisplayText: () => {
    return "Numeric Fields";
  }
};
const timeMatcher = {
  id: FieldMatcherID.time,
  name: "Time Fields",
  description: "Fields with type time",
  get: () => {
    return fieldTypeMatcher.get(FieldType.time);
  },
  getOptionsDisplayText: () => {
    return "Time Fields";
  }
};
function getFieldTypeMatchers() {
  return [fieldTypeMatcher, fieldTypesMatcher, numericMatcher, timeMatcher];
}

var __defProp$S = Object.defineProperty;
var __getOwnPropSymbols$M = Object.getOwnPropertySymbols;
var __hasOwnProp$M = Object.prototype.hasOwnProperty;
var __propIsEnum$M = Object.prototype.propertyIsEnumerable;
var __defNormalProp$S = (obj, key, value) => key in obj ? __defProp$S(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$L = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$M.call(b, prop))
      __defNormalProp$S(a, prop, b[prop]);
  if (__getOwnPropSymbols$M)
    for (var prop of __getOwnPropSymbols$M(b)) {
      if (__propIsEnum$M.call(b, prop))
        __defNormalProp$S(a, prop, b[prop]);
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
      return __spreadValues$L({}, field.state.calcs);
    }
  }
  if (!field.state) {
    field.state = {};
  }
  const queue = fieldReducers.list(reducers);
  const data = field.values;
  if (data && data.length < 1) {
    const calcs = __spreadValues$L({}, field.state.calcs);
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
    field.state.calcs = __spreadValues$L(__spreadValues$L({}, field.state.calcs), values2);
    return values2;
  }
  let values = doStandardCalcs(field, ignoreNulls, nullAsZero);
  for (const reducer of queue) {
    if (!values.hasOwnProperty(reducer.id) && reducer.reduce) {
      values = __spreadValues$L(__spreadValues$L({}, values), reducer.reduce(field, ignoreNulls, nullAsZero));
    }
  }
  field.state.calcs = __spreadValues$L(__spreadValues$L({}, field.state.calcs), values);
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
    reduce: calculateStdDev$1,
    preservesUnits: true
  },
  {
    id: "stdDev" /* stdDev */,
    name: "StdDev",
    description: "Standard deviation of all values in a field",
    standard: false,
    reduce: calculateStdDev$1,
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
  const calcs = __spreadValues$L({}, defaultCalcs);
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
  if (lodash.isNumber(calcs.firstNotNull) && lodash.isNumber(calcs.lastNotNull)) {
    calcs.diff = calcs.lastNotNull - calcs.firstNotNull;
  }
  if (lodash.isNumber(calcs.firstNotNull) && lodash.isNumber(calcs.diff)) {
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
function calculateStdDev$1(field, ignoreNulls, nullAsZero) {
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

function compareValues(left, op, right) {
  if (left == null || right == null) {
    if (left == null) {
      left = "null";
    }
    if (right == null) {
      right = "null";
    }
    if (op === schema.ComparisonOperation.GTE || op === schema.ComparisonOperation.LTE) {
      op = schema.ComparisonOperation.EQ;
    }
  }
  switch (op) {
    case schema.ComparisonOperation.EQ:
      return `${left}` === `${right}`;
    case schema.ComparisonOperation.NEQ:
      return `${left}` !== `${right}`;
    case schema.ComparisonOperation.GT:
      return left > right;
    case schema.ComparisonOperation.GTE:
      return left >= right;
    case schema.ComparisonOperation.LT:
      return left < right;
    case schema.ComparisonOperation.LTE:
      return left <= right;
    default:
      return false;
  }
}

function isBooleanReducer(r) {
  return r === ReducerID.allIsNull || r === ReducerID.allIsZero;
}
const fieldValueMatcherInfo = {
  id: FieldMatcherID.byValue,
  name: "By value (reducer)",
  description: "Reduce a field to a single value and test for inclusion",
  // This is added to overrides by default
  defaultOptions: {
    reducer: ReducerID.allIsZero,
    op: schema.ComparisonOperation.GTE,
    value: 0
  },
  get: (props) => {
    if (!props || !props.reducer) {
      return () => false;
    }
    let { reducer, op, value } = props;
    const isBoolean = isBooleanReducer(reducer);
    if (!op) {
      op = schema.ComparisonOperation.EQ;
    }
    return (field, frame, allFrames) => {
      const left = reduceField({
        field,
        reducers: [reducer]
      })[reducer];
      if (isBoolean) {
        return Boolean(left);
      }
      return compareValues(left, op, value);
    };
  },
  getOptionsDisplayText: (props) => {
    return `By value (${props.reducer})`;
  }
};

const specialChars = ["(", "[", "{", "}", "]", ")", "\\", "|", "*", "+", "-", ".", "?", "<", ">", "#", "&", "^", "$"];
const specialMatcher = "([\\" + specialChars.join("\\") + "])";
const specialCharEscape = new RegExp(specialMatcher, "g");
const specialCharUnescape = new RegExp("(\\\\)" + specialMatcher, "g");
function escapeStringForRegex(value) {
  if (!value) {
    return value;
  }
  return value.replace(specialCharEscape, "\\$1");
}
function unEscapeStringFromRegex(value) {
  if (!value) {
    return value;
  }
  return value.replace(specialCharUnescape, "$2");
}
function stringStartsAsRegEx(str) {
  if (!str) {
    return false;
  }
  return str[0] === "/";
}
function stringToJsRegex(str) {
  if (!stringStartsAsRegEx(str)) {
    return new RegExp(`^${str}$`);
  }
  const match = str.match(new RegExp("^/(.*?)/(g?i?m?y?s?)$"));
  if (!match) {
    throw new Error(`'${str}' is not a valid regular expression.`);
  }
  return new RegExp(match[1], match[2]);
}
function stringToMs(str) {
  if (!str) {
    return 0;
  }
  const nr = parseInt(str, 10);
  const unit = str.slice(String(nr).length);
  const s = 1e3;
  const m = s * 60;
  const h = m * 60;
  const d = h * 24;
  switch (unit) {
    case "s":
      return nr * s;
    case "m":
      return nr * m;
    case "h":
      return nr * h;
    case "d":
      return nr * d;
    default:
      if (!unit) {
        return isNaN(nr) ? 0 : nr;
      }
      throw new Error("Not supported unit: " + unit);
  }
}
function toNumberString(value) {
  if (value !== null && value !== void 0 && Number.isFinite(value)) {
    return value.toString();
  }
  return "";
}
function toIntegerOrUndefined(value) {
  if (!value) {
    return void 0;
  }
  const v = parseInt(value, 10);
  return isNaN(v) ? void 0 : v;
}
function toFloatOrUndefined(value) {
  if (!value) {
    return void 0;
  }
  const v = parseFloat(value);
  return isNaN(v) ? void 0 : v;
}
function toPascalCase(string) {
  const str = lodash.camelCase(string);
  return str.charAt(0).toUpperCase() + str.substring(1);
}
function escapeRegex(value) {
  return value.replace(/[\\^$*+?.()|[\]{}\/]/g, "\\$&");
}

var ByNamesMatcherMode = /* @__PURE__ */ ((ByNamesMatcherMode2) => {
  ByNamesMatcherMode2["exclude"] = "exclude";
  ByNamesMatcherMode2["include"] = "include";
  return ByNamesMatcherMode2;
})(ByNamesMatcherMode || {});
const fieldNameMatcher = {
  id: FieldMatcherID.byName,
  name: "Field Name",
  description: "match the field name",
  defaultOptions: "",
  get: (name) => {
    const uniqueNames = /* @__PURE__ */ new Set([name]);
    const fallback = fieldNameFallback(uniqueNames);
    return (field, frame, allFrames) => {
      return name === field.name || name === getFieldDisplayName(field, frame, allFrames) || Boolean(fallback && fallback(field, frame, allFrames));
    };
  },
  getOptionsDisplayText: (name) => {
    return `Field name: ${name}`;
  }
};
const multipleFieldNamesMatcher = {
  id: FieldMatcherID.byNames,
  name: "Field Names",
  description: "match any of the given the field names",
  defaultOptions: {
    mode: "include" /* include */,
    names: []
  },
  get: (options) => {
    const { names, mode = "include" /* include */ } = options;
    const uniqueNames = new Set(names != null ? names : []);
    const fallback = fieldNameFallback(uniqueNames);
    const matcher = (field, frame, frames) => {
      return uniqueNames.has(field.name) || uniqueNames.has(getFieldDisplayName(field, frame, frames)) || Boolean(fallback && fallback(field, frame, frames));
    };
    if (mode === "exclude" /* exclude */) {
      return (field, frame, frames) => {
        return !matcher(field, frame, frames);
      };
    }
    return matcher;
  },
  getOptionsDisplayText: (options) => {
    const { names, mode } = options;
    const displayText = (names != null ? names : []).join(", ");
    if (mode === "exclude" /* exclude */) {
      return `All except: ${displayText}`;
    }
    return `All of: ${displayText}`;
  }
};
function fieldNameFallback(fields) {
  var _a, _b, _c;
  let fallback = void 0;
  const useMatcherFallback = (_c = (_b = (_a = window == null ? void 0 : window.grafanaBootData) == null ? void 0 : _a.settings) == null ? void 0 : _b.featureToggles) == null ? void 0 : _c.dataplaneFrontendFallback;
  if (useMatcherFallback) {
    if (fields.has(TIME_SERIES_VALUE_FIELD_NAME)) {
      fallback = (field, frame) => {
        var _a2;
        return Boolean(field.labels) && // Value was reasonable when the name was set in labels or on the frame
        ((_a2 = field.labels) == null ? void 0 : _a2.__name__) === field.name;
      };
    } else if (fields.has("Time") || fields.has("time")) {
      fallback = (field, frame) => {
        var _a2;
        return ((_a2 = frame.meta) == null ? void 0 : _a2.typeVersion) == null && field.type === FieldType.time;
      };
    }
  }
  return fallback;
}
const regexpFieldNameMatcher = {
  id: FieldMatcherID.byRegexp,
  name: "Field Name by Regexp",
  description: "match the field name by a given regexp pattern",
  defaultOptions: "/.*/",
  get: (pattern) => {
    const regexp = patternToRegex(pattern);
    return (field, frame, allFrames) => {
      const displayName = getFieldDisplayName(field, frame, allFrames);
      return !!regexp && regexp.test(displayName);
    };
  },
  getOptionsDisplayText: (pattern) => {
    return `Field name by pattern: ${pattern}`;
  }
};
const fieldsInFrameMatcher = {
  id: FieldMatcherID.byFrameRefID,
  name: "Fields by frame refId",
  description: "match all fields returned in data frame with refId.",
  defaultOptions: "",
  get: (refId) => {
    return (field, frame, allFrames) => {
      return frame.refId === refId;
    };
  },
  getOptionsDisplayText: (refId) => {
    return `Math all fields returned by query with reference ID: ${refId}`;
  }
};
const regexpOrMultipleNamesMatcher = {
  id: FieldMatcherID.byRegexpOrNames,
  name: "Field Name by Regexp or Names",
  description: "match the field name by a given regexp pattern or given names",
  defaultOptions: {
    pattern: "/.*/",
    names: []
  },
  get: (options) => {
    var _a;
    const regexpMatcher = regexpFieldNameMatcher.get((options == null ? void 0 : options.pattern) || "");
    const namesMatcher = multipleFieldNamesMatcher.get({
      mode: "include" /* include */,
      names: (_a = options == null ? void 0 : options.names) != null ? _a : []
    });
    return (field, frame, allFrames) => {
      return namesMatcher(field, frame, allFrames) || regexpMatcher(field, frame, allFrames);
    };
  },
  getOptionsDisplayText: (options) => {
    var _a, _b, _c;
    const pattern = (_a = options == null ? void 0 : options.pattern) != null ? _a : "";
    const names = (_c = (_b = options == null ? void 0 : options.names) == null ? void 0 : _b.join(",")) != null ? _c : "";
    return `Field name by pattern: ${pattern} or names: ${names}`;
  }
};
const patternToRegex = (pattern) => {
  if (!pattern) {
    return void 0;
  }
  try {
    return stringToJsRegex(pattern);
  } catch (error) {
    console.error(error);
    return void 0;
  }
};
const frameNameMatcher = {
  id: FrameMatcherID.byName,
  name: "Frame Name",
  description: "match the frame name",
  defaultOptions: "/.*/",
  get: (pattern) => {
    const regex = stringToJsRegex(pattern);
    return (frame) => {
      return regex.test(frame.name || "");
    };
  },
  getOptionsDisplayText: (pattern) => {
    return `Frame name: ${pattern}`;
  }
};
function getFieldNameMatchers() {
  return [
    fieldNameMatcher,
    regexpFieldNameMatcher,
    multipleFieldNamesMatcher,
    regexpOrMultipleNamesMatcher,
    fieldsInFrameMatcher
  ];
}
function getFrameNameMatchers() {
  return [frameNameMatcher];
}

const anyFieldMatcher = {
  id: MatcherID.anyMatch,
  name: "Any",
  description: "Any child matches (OR)",
  excludeFromPicker: true,
  defaultOptions: [],
  // empty array
  get: (options) => {
    const children = options.map((option) => {
      return getFieldMatcher(option);
    });
    return (field, frame, allFrames) => {
      for (const child of children) {
        if (child(field, frame, allFrames)) {
          return true;
        }
      }
      return false;
    };
  },
  getOptionsDisplayText: (options) => {
    let text = "";
    for (const sub of options) {
      if (text.length > 0) {
        text += " OR ";
      }
      const matcher = fieldMatchers.get(sub.id);
      text += matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(sub) : matcher.name;
    }
    return text;
  }
};
const anyFrameMatcher = {
  id: MatcherID.anyMatch,
  name: "Any",
  description: "Any child matches (OR)",
  excludeFromPicker: true,
  defaultOptions: [],
  // empty array
  get: (options) => {
    const children = options.map((option) => {
      return getFrameMatchers(option);
    });
    return (frame) => {
      for (const child of children) {
        if (child(frame)) {
          return true;
        }
      }
      return false;
    };
  },
  getOptionsDisplayText: (options) => {
    let text = "";
    for (const sub of options) {
      if (text.length > 0) {
        text += " OR ";
      }
      const matcher = frameMatchers.get(sub.id);
      text += matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(sub) : matcher.name;
    }
    return text;
  }
};
const allFieldsMatcher = {
  id: MatcherID.allMatch,
  name: "All",
  description: "Everything matches (AND)",
  excludeFromPicker: true,
  defaultOptions: [],
  // empty array
  get: (options) => {
    const children = options.map((option) => {
      return getFieldMatcher(option);
    });
    return (field, frame, allFrames) => {
      for (const child of children) {
        if (!child(field, frame, allFrames)) {
          return false;
        }
      }
      return true;
    };
  },
  getOptionsDisplayText: (options) => {
    let text = "";
    for (const sub of options) {
      if (text.length > 0) {
        text += " AND ";
      }
      const matcher = fieldMatchers.get(sub.id);
      text += matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(sub) : matcher.name;
    }
    return text;
  }
};
const allFramesMatcher = {
  id: MatcherID.allMatch,
  name: "All",
  description: "Everything matches (AND)",
  excludeFromPicker: true,
  defaultOptions: [],
  // empty array
  get: (options) => {
    const children = options.map((option) => {
      return getFrameMatchers(option);
    });
    return (frame) => {
      for (const child of children) {
        if (!child(frame)) {
          return false;
        }
      }
      return true;
    };
  },
  getOptionsDisplayText: (options) => {
    let text = "";
    for (const sub of options) {
      if (text.length > 0) {
        text += " AND ";
      }
      const matcher = frameMatchers.get(sub.id);
      text += matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(sub) : matcher.name;
    }
    return text;
  }
};
const notFieldMatcher = {
  id: MatcherID.invertMatch,
  name: "NOT",
  description: "Inverts other matchers",
  excludeFromPicker: true,
  get: (option) => {
    const check = getFieldMatcher(option);
    return (field, frame, allFrames) => {
      return !check(field, frame, allFrames);
    };
  },
  getOptionsDisplayText: (options) => {
    const matcher = fieldMatchers.get(options.id);
    const text = matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(options.options) : matcher.name;
    return "NOT " + text;
  }
};
const notFrameMatcher = {
  id: MatcherID.invertMatch,
  name: "NOT",
  description: "Inverts other matchers",
  excludeFromPicker: true,
  get: (option) => {
    const check = getFrameMatchers(option);
    return (frame) => {
      return !check(frame);
    };
  },
  getOptionsDisplayText: (options) => {
    const matcher = frameMatchers.get(options.id);
    const text = matcher.getOptionsDisplayText ? matcher.getOptionsDisplayText(options.options) : matcher.name;
    return "NOT " + text;
  }
};
const alwaysFieldMatcher = (field) => {
  return true;
};
const alwaysFrameMatcher = (frame) => {
  return true;
};
const neverFieldMatcher = (field) => {
  return false;
};
const notTimeFieldMatcher = (field) => {
  return field.type !== FieldType.time;
};
const neverFrameMatcher = (frame) => {
  return false;
};
const alwaysFieldMatcherInfo = {
  id: MatcherID.alwaysMatch,
  name: "All Fields",
  description: "Always Match",
  get: (_option) => {
    return alwaysFieldMatcher;
  },
  getOptionsDisplayText: (_options) => {
    return "Always";
  }
};
const alwaysFrameMatcherInfo = {
  id: MatcherID.alwaysMatch,
  name: "All Frames",
  description: "Always Match",
  get: (_option) => {
    return alwaysFrameMatcher;
  },
  getOptionsDisplayText: (_options) => {
    return "Always";
  }
};
const neverFieldMatcherInfo = {
  id: MatcherID.neverMatch,
  name: "No Fields",
  description: "Never Match",
  excludeFromPicker: true,
  get: (_option) => {
    return neverFieldMatcher;
  },
  getOptionsDisplayText: (_options) => {
    return "Never";
  }
};
const neverFrameMatcherInfo = {
  id: MatcherID.neverMatch,
  name: "No Frames",
  description: "Never Match",
  get: (_option) => {
    return neverFrameMatcher;
  },
  getOptionsDisplayText: (_options) => {
    return "Never";
  }
};
function getFieldPredicateMatchers() {
  return [anyFieldMatcher, allFieldsMatcher, notFieldMatcher, alwaysFieldMatcherInfo, neverFieldMatcherInfo];
}
function getFramePredicateMatchers() {
  return [anyFrameMatcher, allFramesMatcher, notFrameMatcher, alwaysFrameMatcherInfo, neverFrameMatcherInfo];
}

var __defProp$R = Object.defineProperty;
var __defProps$E = Object.defineProperties;
var __getOwnPropDescs$E = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$L = Object.getOwnPropertySymbols;
var __hasOwnProp$L = Object.prototype.hasOwnProperty;
var __propIsEnum$L = Object.prototype.propertyIsEnumerable;
var __defNormalProp$R = (obj, key, value) => key in obj ? __defProp$R(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$K = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$L.call(b, prop))
      __defNormalProp$R(a, prop, b[prop]);
  if (__getOwnPropSymbols$L)
    for (var prop of __getOwnPropSymbols$L(b)) {
      if (__propIsEnum$L.call(b, prop))
        __defNormalProp$R(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$E = (a, b) => __defProps$E(a, __getOwnPropDescs$E(b));
const XSSWL = Object.keys(xss__namespace.whiteList).reduce((acc, element) => {
  var _a;
  acc[element] = (_a = xss__namespace.whiteList[element]) == null ? void 0 : _a.concat(["class", "style"]);
  return acc;
}, {});
const sanitizeTextPanelWhitelist = new xss__namespace.FilterXSS({
  whiteList: XSSWL,
  css: {
    whiteList: __spreadProps$E(__spreadValues$K({}, xss__namespace.getDefaultCSSWhiteList()), {
      "flex-direction": true,
      "flex-wrap": true,
      "flex-basis": true,
      "flex-grow": true,
      "flex-shrink": true,
      "flex-flow": true,
      gap: true,
      order: true,
      "justify-content": true,
      "justify-items": true,
      "justify-self": true,
      "align-items": true,
      "align-content": true,
      "align-self": true
    })
  }
});
function sanitize(unsanitizedString) {
  try {
    return DOMPurify__default["default"].sanitize(unsanitizedString, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ["form", "input"]
    });
  } catch (error) {
    console.error("String could not be sanitized", unsanitizedString);
    return escapeHtml(unsanitizedString);
  }
}
function sanitizeTrustedTypesRSS(unsanitizedString) {
  return DOMPurify__default["default"].sanitize(unsanitizedString, {
    RETURN_TRUSTED_TYPE: true,
    ADD_ATTR: ["xmlns:atom", "version", "property", "content"],
    ADD_TAGS: ["rss", "meta", "channel", "title", "link", "description", "atom:link", "item", "pubDate", "guid"],
    PARSER_MEDIA_TYPE: "application/xhtml+xml"
  });
}
function sanitizeTrustedTypes(unsanitizedString) {
  return DOMPurify__default["default"].sanitize(unsanitizedString, { RETURN_TRUSTED_TYPE: true });
}
function sanitizeTextPanelContent(unsanitizedString) {
  try {
    return sanitizeTextPanelWhitelist.process(unsanitizedString);
  } catch (error) {
    console.error("String could not be sanitized", unsanitizedString);
    return "Text string could not be sanitized";
  }
}
function sanitizeSVGContent(unsanitizedString) {
  return DOMPurify__default["default"].sanitize(unsanitizedString, { USE_PROFILES: { svg: true, svgFilters: true } });
}
function sanitizeUrl(url) {
  return sanitizeUrl$1.sanitizeUrl(url);
}
function hasAnsiCodes(input) {
  return /\u001b\[\d{1,2}m/.test(input);
}
function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

var __defProp$Q = Object.defineProperty;
var __defProps$D = Object.defineProperties;
var __getOwnPropDescs$D = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$K = Object.getOwnPropertySymbols;
var __hasOwnProp$K = Object.prototype.hasOwnProperty;
var __propIsEnum$K = Object.prototype.propertyIsEnumerable;
var __defNormalProp$Q = (obj, key, value) => key in obj ? __defProp$Q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$J = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$K.call(b, prop))
      __defNormalProp$Q(a, prop, b[prop]);
  if (__getOwnPropSymbols$K)
    for (var prop of __getOwnPropSymbols$K(b)) {
      if (__propIsEnum$K.call(b, prop))
        __defNormalProp$Q(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$D = (a, b) => __defProps$D(a, __getOwnPropDescs$D(b));
let hasInitialized = false;
const markdownOptions = {
  pedantic: false,
  gfm: true,
  breaks: false
};
function renderMarkdown(str, options) {
  if (!hasInitialized) {
    marked.marked.use(markedMangle.mangle());
    marked.marked.setOptions(__spreadValues$J({}, markdownOptions));
    hasInitialized = true;
  }
  let opts = void 0;
  if (options == null ? void 0 : options.breaks) {
    opts = __spreadProps$D(__spreadValues$J({}, markdownOptions), {
      breaks: true
    });
  }
  const html = marked.marked(str || "", opts);
  if (typeof html !== "string") {
    throw new Error("Failed to process markdown synchronously.");
  }
  if (options == null ? void 0 : options.noSanitize) {
    return html;
  }
  return sanitizeTextPanelContent(html);
}
function renderTextPanelMarkdown(str, options) {
  if (!hasInitialized) {
    marked.marked.use(markedMangle.mangle());
    marked.marked.setOptions(__spreadValues$J({}, markdownOptions));
    hasInitialized = true;
  }
  const html = marked.marked(str || "");
  if (typeof html !== "string") {
    throw new Error("Failed to process markdown synchronously.");
  }
  if (options == null ? void 0 : options.noSanitize) {
    return html;
  }
  return sanitizeTextPanelContent(html);
}

function findHighlightChunksInText({
  searchWords,
  textToHighlight
}) {
  const chunks = [];
  for (const term of searchWords) {
    if (typeof term === "string") {
      chunks.push(...findMatchesInText(textToHighlight, term));
    }
  }
  return chunks;
}
const cleanNeedle = (needle) => {
  return needle.replace(/[[{(][\w,.\/:;<=>?:*+]+$/, "");
};
function findMatchesInText(haystack, needle) {
  if (!haystack || !needle) {
    return [];
  }
  const matches = [];
  const { cleaned, flags } = parseFlags(cleanNeedle(needle));
  let regexp;
  try {
    regexp = new RegExp(`(?:${cleaned})`, flags);
  } catch (error) {
    return matches;
  }
  haystack.replace(regexp, (substring, ...rest) => {
    if (substring) {
      const offset = rest[rest.length - 2];
      matches.push({
        text: substring,
        start: offset,
        length: substring.length,
        end: offset + substring.length
      });
    }
    return "";
  });
  return matches;
}
const CLEAR_FLAG = "-";
const FLAGS_REGEXP = /\(\?([ims-]+)\)/g;
function parseFlags(text) {
  const flags = /* @__PURE__ */ new Set(["g"]);
  const cleaned = text.replace(FLAGS_REGEXP, (str, group) => {
    const clearAll = group.startsWith(CLEAR_FLAG);
    for (let i = 0; i < group.length; ++i) {
      const flag = group.charAt(i);
      if (clearAll || group.charAt(i - 1) === CLEAR_FLAG) {
        flags.delete(flag);
      } else if (flag !== CLEAR_FLAG) {
        flags.add(flag);
      }
    }
    return "";
  });
  return {
    cleaned,
    flags: Array.from(flags).join("")
  };
}

const textUtil = {
  escapeHtml,
  hasAnsiCodes,
  sanitize,
  sanitizeTextPanelContent,
  sanitizeUrl,
  sanitizeSVGContent,
  sanitizeTrustedTypes,
  sanitizeTrustedTypesRSS
};

const refIdMatcher = {
  id: FrameMatcherID.byRefId,
  name: "Query refId",
  description: "match the refId",
  defaultOptions: "A",
  get: (pattern) => {
    const regex = stringToJsRegex(pattern);
    return (frame) => {
      return regex.test(frame.refId || "");
    };
  },
  getOptionsDisplayText: (pattern) => {
    return `RefID: ${pattern}`;
  }
};
function getRefIdMatchers() {
  return [refIdMatcher];
}

const firstFieldMatcher = {
  id: FieldMatcherID.first,
  name: "First Field",
  description: "The first field in the frame",
  get: (type) => {
    return (field, frame, allFrames) => {
      return field === frame.fields[0];
    };
  },
  getOptionsDisplayText: () => {
    return `First field`;
  }
};
const firstTimeFieldMatcher = {
  id: FieldMatcherID.firstTimeField,
  name: "First time field",
  description: "The first field of type time in a frame",
  get: (type) => {
    return (field, frame, allFrames) => {
      return field.type === FieldType.time && field === frame.fields.find((f) => f.type === FieldType.time);
    };
  },
  getOptionsDisplayText: () => {
    return `First time field`;
  }
};
function getSimpleFieldMatchers() {
  return [firstFieldMatcher, firstTimeFieldMatcher];
}

const isEqualValueMatcher = {
  id: ValueMatcherID.equal,
  name: "Is equal",
  description: "Match where value for given field is equal to options value.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return value == options.value;
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is null.`;
  },
  isApplicable: () => true,
  getDefaultOptions: () => ({ value: "" })
};
const isNotEqualValueMatcher = {
  id: ValueMatcherID.notEqual,
  name: "Is not equal",
  description: "Match where value for given field is not equal to options value.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return value != options.value;
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is not null.`;
  },
  isApplicable: () => true,
  getDefaultOptions: () => ({ value: "" })
};
const getEqualValueMatchers = () => [isEqualValueMatcher, isNotEqualValueMatcher];

const isNullValueMatcher = {
  id: ValueMatcherID.isNull,
  name: "Is null",
  description: "Match where value for given field is null.",
  get: () => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return value == null;
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is null.`;
  },
  isApplicable: () => true,
  getDefaultOptions: () => ({})
};
const isNotNullValueMatcher = {
  id: ValueMatcherID.isNotNull,
  name: "Is not null",
  description: "Match where value for given field is not null.",
  get: () => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return value != null;
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is not null.`;
  },
  isApplicable: () => true,
  getDefaultOptions: () => ({})
};
const getNullValueMatchers = () => [isNullValueMatcher, isNotNullValueMatcher];

const isGreaterValueMatcher = {
  id: ValueMatcherID.greater,
  name: "Is greater",
  description: "Match when field value is greater than option.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      if (isNaN(value)) {
        return false;
      }
      return value > options.value;
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is greater than: ${options.value}.`;
  },
  isApplicable: (field) => field.type === FieldType.number,
  getDefaultOptions: () => ({ value: 0 })
};
const isGreaterOrEqualValueMatcher = {
  id: ValueMatcherID.greaterOrEqual,
  name: "Is greater or equal",
  description: "Match when field value is greater than or equal to option.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      if (isNaN(value)) {
        return false;
      }
      return value >= options.value;
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is greater than or equal to: ${options.value}.`;
  },
  isApplicable: (field) => field.type === FieldType.number,
  getDefaultOptions: () => ({ value: 0 })
};
const isLowerValueMatcher = {
  id: ValueMatcherID.lower,
  name: "Is lower",
  description: "Match when field value is lower than option.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      if (isNaN(value)) {
        return false;
      }
      return value < options.value;
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is lower than: ${options.value}.`;
  },
  isApplicable: (field) => field.type === FieldType.number,
  getDefaultOptions: () => ({ value: 0 })
};
const isLowerOrEqualValueMatcher = {
  id: ValueMatcherID.lowerOrEqual,
  name: "Is lower or equal",
  description: "Match when field value is lower or equal than option.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      if (isNaN(value)) {
        return false;
      }
      return value <= options.value;
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is lower or equal than: ${options.value}.`;
  },
  isApplicable: (field) => field.type === FieldType.number,
  getDefaultOptions: () => ({ value: 0 })
};
const getNumericValueMatchers = () => [
  isGreaterValueMatcher,
  isGreaterOrEqualValueMatcher,
  isLowerValueMatcher,
  isLowerOrEqualValueMatcher
];

const isBetweenValueMatcher = {
  id: ValueMatcherID.between,
  name: "Is between",
  description: "Match when field value is between given option values.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      if (isNaN(value)) {
        return false;
      }
      return value > options.from && value < options.to;
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is between ${options.from} and ${options.to}.`;
  },
  isApplicable: (field) => field.type === FieldType.number,
  getDefaultOptions: () => ({ from: 0, to: 100 })
};
const getRangeValueMatchers = () => [isBetweenValueMatcher];

const regexValueMatcher = {
  id: ValueMatcherID.regex,
  name: "Regex",
  description: "Match when field value is matching regex.",
  get: (options) => {
    const regex = new RegExp(options.value);
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return regex.test(value);
    };
  },
  getOptionsDisplayText: (options) => {
    return `Matches all rows where field value is matching regex: ${options.value}`;
  },
  isApplicable: () => true,
  getDefaultOptions: () => ({ value: ".*" })
};
const getRegexValueMatcher = () => [regexValueMatcher];

const isSubstringMatcher = {
  id: ValueMatcherID.substring,
  name: "Contains substring",
  description: "Match where value for given field is a substring to options value.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return value && options.value && typeof value === "string" && value.toLowerCase().includes(options.value.toLowerCase()) || options.value === "";
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is similar to the value.`;
  },
  isApplicable: (field) => field.type === FieldType.string,
  getDefaultOptions: () => ({ value: "" })
};
const isNotSubstringValueMatcher = {
  id: ValueMatcherID.notSubstring,
  name: "Does not contain substring",
  description: "Match where value for given field is not a substring to options value.",
  get: (options) => {
    return (valueIndex, field) => {
      const value = field.values[valueIndex];
      return typeof value === "string" && options.value && value && options.value !== "" && !value.toLowerCase().includes(options.value.toLowerCase());
    };
  },
  getOptionsDisplayText: () => {
    return `Matches all rows where field is not similar to the value.`;
  },
  isApplicable: (field) => field.type === FieldType.string,
  getDefaultOptions: () => ({ value: "" })
};
const getSubstringValueMatchers = () => [isSubstringMatcher, isNotSubstringValueMatcher];

const fieldMatchers = new Registry(() => {
  return [
    ...getFieldPredicateMatchers(),
    // Predicates
    ...getFieldTypeMatchers(),
    // by type
    ...getFieldNameMatchers(),
    // by name
    ...getSimpleFieldMatchers(),
    // first
    fieldValueMatcherInfo
    // reduce field (all null/zero)
  ];
});
const frameMatchers = new Registry(() => {
  return [
    ...getFramePredicateMatchers(),
    // Predicates
    ...getFrameNameMatchers(),
    // by name
    ...getRefIdMatchers()
    // by query refId
  ];
});
const valueMatchers = new Registry(() => {
  return [
    ...getNullValueMatchers(),
    ...getNumericValueMatchers(),
    ...getEqualValueMatchers(),
    ...getSubstringValueMatchers(),
    ...getRangeValueMatchers(),
    ...getRegexValueMatcher()
  ];
});
function getFieldMatcher(config) {
  const info = fieldMatchers.get(config.id);
  if (!info) {
    throw new Error("Unknown field matcher: " + config.id);
  }
  return info.get(config.options);
}
function getFrameMatchers(config) {
  const info = frameMatchers.get(config.id);
  if (!info) {
    throw new Error("Unknown frame matcher: " + config.id);
  }
  return info.get(config.options);
}
function getValueMatcher(config) {
  const info = valueMatchers.get(config.id);
  if (!info) {
    throw new Error("Unknown value matcher: " + config.id);
  }
  return info.get(config.options);
}

var __defProp$P = Object.defineProperty;
var __defNormalProp$P = (obj, key, value) => key in obj ? __defProp$P(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$e = (obj, key, value) => {
  __defNormalProp$P(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a$1;
class FunctionalVector {
  constructor() {
    // Object not implemented
    __publicField$e(this, _a$1, {});
  }
  // Implement "iterator protocol"
  *iterator() {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
  set(index, value) {
    throw "unsupported operation";
  }
  add(value) {
    throw "unsupported operation";
  }
  push(...vals) {
    for (const v of vals) {
      this.add(v);
    }
    return this.length;
  }
  // Implement "iterable protocol"
  [Symbol.iterator]() {
    return this.iterator();
  }
  forEach(iterator) {
    return vectorator(this).forEach(iterator);
  }
  map(transform) {
    return vectorator(this).map(transform);
  }
  filter(predicate) {
    return vectorator(this).filter(predicate);
  }
  at(index) {
    return this.get(index);
  }
  toArray() {
    const arr = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      arr[i] = this.get(i);
    }
    return arr;
  }
  join(separator) {
    return this.toArray().join(separator);
  }
  toJSON() {
    return this.toArray();
  }
  pop() {
    throw new Error("Method not implemented.");
  }
  concat(...items) {
    throw new Error("Method not implemented.");
  }
  reverse() {
    throw new Error("Method not implemented.");
  }
  shift() {
    throw new Error("Method not implemented.");
  }
  sort(compareFn) {
    throw new Error("Method not implemented.");
  }
  splice(start, deleteCount, ...items) {
    throw new Error("Method not implemented.");
  }
  unshift(...items) {
    throw new Error("Method not implemented.");
  }
  fill(value, start, end) {
    throw new Error("Method not implemented.");
  }
  copyWithin(target, start, end) {
    throw new Error("Method not implemented.");
  }
  //--------------------------------------------------------------------------------
  // Delegated Array function -- these will not be efficient :grimmice:
  //--------------------------------------------------------------------------------
  slice(start, end) {
    return this.toArray().slice(start, end);
  }
  indexOf(searchElement, fromIndex) {
    return this.toArray().indexOf(searchElement, fromIndex);
  }
  lastIndexOf(searchElement, fromIndex) {
    return this.toArray().lastIndexOf(searchElement, fromIndex);
  }
  every(predicate, thisArg) {
    return this.toArray().every(predicate, thisArg);
  }
  some(predicate, thisArg) {
    return this.toArray().some(predicate, thisArg);
  }
  reduce(callbackfn, initialValue) {
    throw new Error("Method not implemented.");
  }
  reduceRight(callbackfn, initialValue) {
    throw new Error("Method not implemented.");
  }
  find(predicate, thisArg) {
    return this.toArray().find(predicate, thisArg);
  }
  findIndex(predicate, thisArg) {
    return this.toArray().findIndex(predicate, thisArg);
  }
  entries() {
    return this.toArray().entries();
  }
  keys() {
    return this.toArray().keys();
  }
  values() {
    return this.toArray().values();
  }
  includes(searchElement, fromIndex) {
    return this.toArray().includes(searchElement, fromIndex);
  }
  flatMap(callback, thisArg) {
    return this.toArray().flatMap(callback, thisArg);
  }
  flat(depth) {
    throw new Error("Method not implemented.");
  }
}
_a$1 = Symbol.unscopables;
const emptyarray = [];
function vectorator(vector) {
  return {
    *[Symbol.iterator]() {
      for (let i = 0; i < vector.length; i++) {
        yield vector.get(i);
      }
    },
    forEach(iterator) {
      for (let i = 0; i < vector.length; i++) {
        iterator(vector.get(i), i, emptyarray);
      }
    },
    map(transform) {
      const result = [];
      for (let i = 0; i < vector.length; i++) {
        result.push(transform(vector.get(i), i, emptyarray));
      }
      return result;
    },
    /** Add a predicate where you return true if it should *keep* the value */
    filter(predicate) {
      const result = [];
      let count = 0;
      for (const val of this) {
        if (predicate(val, count++, emptyarray)) {
          result.push(val);
        }
      }
      return result;
    }
  };
}

var __defProp$O = Object.defineProperty;
var __getOwnPropSymbols$J = Object.getOwnPropertySymbols;
var __hasOwnProp$J = Object.prototype.hasOwnProperty;
var __propIsEnum$J = Object.prototype.propertyIsEnumerable;
var __defNormalProp$O = (obj, key, value) => key in obj ? __defProp$O(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$I = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$J.call(b, prop))
      __defNormalProp$O(a, prop, b[prop]);
  if (__getOwnPropSymbols$J)
    for (var prop of __getOwnPropSymbols$J(b)) {
      if (__propIsEnum$J.call(b, prop))
        __defNormalProp$O(a, prop, b[prop]);
    }
  return a;
};
var __publicField$d = (obj, key, value) => {
  __defNormalProp$O(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataFrameView extends FunctionalVector {
  constructor(data) {
    super();
    this.data = data;
    __publicField$d(this, "index", 0);
    __publicField$d(this, "obj");
    __publicField$d(this, "fields");
    const obj = {};
    const fields = {};
    for (let i = 0; i < data.fields.length; i++) {
      const field = data.fields[i];
      if (!field.name) {
        continue;
      }
      fields[field.name] = field;
      const getter = () => field.values.get(this.index);
      if (!obj.hasOwnProperty(field.name)) {
        Object.defineProperty(obj, field.name, {
          enumerable: true,
          // Shows up as enumerable property
          get: getter
        });
      }
      if (!obj.hasOwnProperty(i.toString())) {
        Object.defineProperty(obj, i, {
          enumerable: false,
          // Don't enumerate array index
          get: getter
        });
      }
    }
    this.obj = obj;
    this.fields = fields;
  }
  get dataFrame() {
    return this.data;
  }
  get length() {
    return this.data.length;
  }
  /**
   * Helper function to return the {@link DisplayProcessor} for a given field column.
   * @param colIndex - the field column index for the data frame.
   */
  getFieldDisplayProcessor(colIndex) {
    if (!this.dataFrame || !this.dataFrame.fields) {
      return void 0;
    }
    const field = this.dataFrame.fields[colIndex];
    if (!field || !field.display) {
      return void 0;
    }
    return field.display;
  }
  /**
   * The contents of the object returned from this function
   * are optimized for use in a loop. All calls return the same object
   * but the index has changed.
   *
   * @example
   * ```typescript
   *   // `first`, `second` and `third` will all point to the same contents at index 2:
   *   const first = view.get(0);
   *   const second = view.get(1);
   *   const third = view.get(2);
   *
   *   // If you need three different objects, consider something like:
   *   const first = { ...view.get(0) };
   *   const second = { ...view.get(1) };
   *   const third = { ...view.get(2) };
   * ```
   * @param idx - The index of the object you currently are inspecting
   */
  get(idx) {
    this.index = idx;
    return this.obj;
  }
  toArray() {
    return new Array(this.data.length).fill(0).map((_, i) => __spreadValues$I({}, this.get(i)));
  }
}

function anyToNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  if (value === "" || value === null || value === void 0 || Array.isArray(value)) {
    return NaN;
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return lodash.toNumber(value);
}

var __defProp$N = Object.defineProperty;
var __defProps$C = Object.defineProperties;
var __getOwnPropDescs$C = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$I = Object.getOwnPropertySymbols;
var __hasOwnProp$I = Object.prototype.hasOwnProperty;
var __propIsEnum$I = Object.prototype.propertyIsEnumerable;
var __defNormalProp$N = (obj, key, value) => key in obj ? __defProp$N(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$H = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$I.call(b, prop))
      __defNormalProp$N(a, prop, b[prop]);
  if (__getOwnPropSymbols$I)
    for (var prop of __getOwnPropSymbols$I(b)) {
      if (__propIsEnum$I.call(b, prop))
        __defNormalProp$N(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$C = (a, b) => __defProps$C(a, __getOwnPropDescs$C(b));
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
          const res = __spreadValues$H({}, vm.options.result);
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
          __spreadProps$C(__spreadValues$H({}, map), {
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
          __spreadProps$C(__spreadValues$H({}, map), {
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

function toPercent(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  return { text: toFixed(size, decimals), suffix: "%" };
}
function toPercentUnit(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  return { text: toFixed(100 * size, decimals), suffix: "%" };
}
function toHex0x(value, decimals) {
  if (value == null) {
    return { text: "" };
  }
  const asHex = toHex(value, decimals);
  if (asHex.text.substring(0, 1) === "-") {
    asHex.text = "-0x" + asHex.text.substring(1);
  } else {
    asHex.text = "0x" + asHex.text;
  }
  return asHex;
}
function toHex(value, decimals) {
  if (value == null) {
    return { text: "" };
  }
  return {
    text: parseFloat(toFixed(value, decimals)).toString(16).toUpperCase()
  };
}
function sci(value, decimals) {
  if (value == null) {
    return { text: "" };
  }
  return { text: value.toExponential(decimals != null ? decimals : void 0) };
}

const UNITS = [
  "year" /* Year */,
  "month" /* Month */,
  "week" /* Week */,
  "day" /* Day */,
  "hour" /* Hour */,
  "minute" /* Minute */,
  "second" /* Second */,
  "millisecond" /* Millisecond */
];
const INTERVALS_IN_SECONDS = {
  ["year" /* Year */]: 31536e3,
  ["month" /* Month */]: 2592e3,
  ["week" /* Week */]: 604800,
  ["day" /* Day */]: 86400,
  ["hour" /* Hour */]: 3600,
  ["minute" /* Minute */]: 60,
  ["second" /* Second */]: 1,
  ["millisecond" /* Millisecond */]: 1e-3
};
function toNanoSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " ns" };
  } else if (Math.abs(size) < 1e6) {
    return toFixedScaled(size / 1e3, decimals, " \xB5s");
  } else if (Math.abs(size) < 1e9) {
    return toFixedScaled(size / 1e6, decimals, " ms");
  } else if (Math.abs(size) < 6e10) {
    return toFixedScaled(size / 1e9, decimals, " s");
  } else if (Math.abs(size) < 36e11) {
    return toFixedScaled(size / 6e10, decimals, " min");
  } else if (Math.abs(size) < 864e11) {
    return toFixedScaled(size / 36e11, decimals, " hour");
  } else {
    return toFixedScaled(size / 864e11, decimals, " day");
  }
}
function toMicroSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " \xB5s" };
  } else if (Math.abs(size) < 1e6) {
    return toFixedScaled(size / 1e3, decimals, " ms");
  } else {
    return toFixedScaled(size / 1e6, decimals, " s");
  }
}
function toMilliSeconds(size, decimals, scaledDecimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " ms" };
  } else if (Math.abs(size) < 6e4) {
    return toFixedScaled(size / 1e3, decimals, " s");
  } else if (Math.abs(size) < 36e5) {
    return toFixedScaled(size / 6e4, decimals, " min");
  } else if (Math.abs(size) < 864e5) {
    return toFixedScaled(size / 36e5, decimals, " hour");
  } else if (Math.abs(size) < 31536e6) {
    return toFixedScaled(size / 864e5, decimals, " day");
  }
  return toFixedScaled(size / 31536e6, decimals, " year");
}
function toSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (size === 0) {
    return { text: "0", suffix: " s" };
  }
  if (Math.abs(size) < 1e-6) {
    return toFixedScaled(size * 1e9, decimals, " ns");
  }
  if (Math.abs(size) < 1e-3) {
    return toFixedScaled(size * 1e6, decimals, " \xB5s");
  }
  if (Math.abs(size) < 1) {
    return toFixedScaled(size * 1e3, decimals, " ms");
  }
  if (Math.abs(size) < 60) {
    return { text: toFixed(size, decimals), suffix: " s" };
  } else if (Math.abs(size) < 3600) {
    return toFixedScaled(size / 60, decimals, " min");
  } else if (Math.abs(size) < 86400) {
    return toFixedScaled(size / 3600, decimals, " hour");
  } else if (Math.abs(size) < 604800) {
    return toFixedScaled(size / 86400, decimals, " day");
  } else if (Math.abs(size) < 31536e3) {
    return toFixedScaled(size / 604800, decimals, " week");
  }
  return toFixedScaled(size / 31556900, decimals, " year");
}
function toMinutes(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 60) {
    return { text: toFixed(size, decimals), suffix: " min" };
  } else if (Math.abs(size) < 1440) {
    return toFixedScaled(size / 60, decimals, " hour");
  } else if (Math.abs(size) < 10080) {
    return toFixedScaled(size / 1440, decimals, " day");
  } else if (Math.abs(size) < 604800) {
    return toFixedScaled(size / 10080, decimals, " week");
  } else {
    return toFixedScaled(size / 525948, decimals, " year");
  }
}
function toHours(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 24) {
    return { text: toFixed(size, decimals), suffix: " hour" };
  } else if (Math.abs(size) < 168) {
    return toFixedScaled(size / 24, decimals, " day");
  } else if (Math.abs(size) < 8760) {
    return toFixedScaled(size / 168, decimals, " week");
  } else {
    return toFixedScaled(size / 8760, decimals, " year");
  }
}
function toDays(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 7) {
    return { text: toFixed(size, decimals), suffix: " day" };
  } else if (Math.abs(size) < 365) {
    return toFixedScaled(size / 7, decimals, " week");
  } else {
    return toFixedScaled(size / 365, decimals, " year");
  }
}
function toDuration(size, decimals, timeScale) {
  if (size === null) {
    return { text: "" };
  }
  if (size === 0) {
    return { text: "0", suffix: " " + timeScale + "s" };
  }
  if (size < 0) {
    const v = toDuration(-size, decimals, timeScale);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  size *= INTERVALS_IN_SECONDS[timeScale] * 1e3;
  const strings = [];
  let decrementDecimals = false;
  let decimalsCount = 0;
  if (decimals !== null && decimals !== void 0) {
    decimalsCount = decimals;
  }
  for (let i = 0; i < UNITS.length && decimalsCount >= 0; i++) {
    const interval = INTERVALS_IN_SECONDS[UNITS[i]] * 1e3;
    const value = size / interval;
    if (value >= 1 || decrementDecimals) {
      decrementDecimals = true;
      const floor = Math.floor(value);
      const unit = UNITS[i] + (floor !== 1 ? "s" : "");
      strings.push(floor + " " + unit);
      size = size % interval;
      decimalsCount--;
    }
  }
  return { text: strings.join(", ") };
}
function toClock(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (size < 1e3) {
    return {
      text: toUtc(size).format("SSS\\m\\s")
    };
  }
  if (size < 6e4) {
    let format2 = "ss\\s:SSS\\m\\s";
    if (decimals === 0) {
      format2 = "ss\\s";
    }
    return { text: toUtc(size).format(format2) };
  }
  if (size < 36e5) {
    let format2 = "mm\\m:ss\\s:SSS\\m\\s";
    if (decimals === 0) {
      format2 = "mm\\m";
    } else if (decimals === 1) {
      format2 = "mm\\m:ss\\s";
    }
    return { text: toUtc(size).format(format2) };
  }
  let format = "mm\\m:ss\\s:SSS\\m\\s";
  const hours = `${("0" + Math.floor(toDuration$1(size, "milliseconds").asHours())).slice(-2)}h`;
  if (decimals === 0) {
    format = "";
  } else if (decimals === 1) {
    format = "mm\\m";
  } else if (decimals === 2) {
    format = "mm\\m:ss\\s";
  }
  const text = format ? `${hours}:${toUtc(size).format(format)}` : hours;
  return { text };
}
function toDurationInMilliseconds(size, decimals) {
  return toDuration(size, decimals, "millisecond" /* Millisecond */);
}
function toDurationInSeconds(size, decimals) {
  return toDuration(size, decimals, "second" /* Second */);
}
function toDurationInHoursMinutesSeconds(size) {
  if (size < 0) {
    const v = toDurationInHoursMinutesSeconds(-size);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  const strings = [];
  const numHours = Math.floor(size / 3600);
  const numMinutes = Math.floor(size % 3600 / 60);
  const numSeconds = Math.floor(size % 3600 % 60);
  numHours > 9 ? strings.push("" + numHours) : strings.push("0" + numHours);
  numMinutes > 9 ? strings.push("" + numMinutes) : strings.push("0" + numMinutes);
  numSeconds > 9 ? strings.push("" + numSeconds) : strings.push("0" + numSeconds);
  return { text: strings.join(":") };
}
function toDurationInDaysHoursMinutesSeconds(size) {
  if (size < 0) {
    const v = toDurationInDaysHoursMinutesSeconds(-size);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  let dayString = "";
  const numDays = Math.floor(size / (24 * 3600));
  if (numDays > 0) {
    dayString = numDays + " d ";
  }
  const hmsString = toDurationInHoursMinutesSeconds(size - numDays * 24 * 3600);
  return { text: dayString + hmsString.text };
}
function toTimeTicks(size, decimals) {
  return toSeconds(size / 100, decimals);
}
function toClockMilliseconds(size, decimals) {
  return toClock(size, decimals);
}
function toClockSeconds(size, decimals) {
  return toClock(size * 1e3, decimals);
}
function toDateTimeValueFormatter(pattern, todayPattern) {
  return (value, decimals, scaledDecimals, timeZone) => {
    if (todayPattern) {
      if (dateTime().isSame(value, "day")) {
        return {
          text: dateTimeFormat(value, { format: todayPattern, timeZone })
        };
      }
    }
    return { text: dateTimeFormat(value, { format: pattern, timeZone }) };
  };
}
const dateTimeAsIso = toDateTimeValueFormatter("YYYY-MM-DD HH:mm:ss");
const dateTimeAsIsoNoDateIfToday = toDateTimeValueFormatter("YYYY-MM-DD HH:mm:ss", "HH:mm:ss");
const dateTimeAsUS = toDateTimeValueFormatter("MM/DD/YYYY h:mm:ss a");
const dateTimeAsUSNoDateIfToday = toDateTimeValueFormatter("MM/DD/YYYY h:mm:ss a", "h:mm:ss a");
function getDateTimeAsLocalFormat() {
  return toDateTimeValueFormatter(
    localTimeFormat({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  );
}
function getDateTimeAsLocalFormatNoDateIfToday() {
  return toDateTimeValueFormatter(
    localTimeFormat({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
    localTimeFormat({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  );
}
function dateTimeSystemFormatter(value, decimals, scaledDecimals, timeZone, showMs) {
  return {
    text: dateTimeFormat(value, {
      format: showMs ? systemDateFormats.fullDateMS : systemDateFormats.fullDate,
      timeZone
    })
  };
}
function dateTimeFromNow(value, decimals, scaledDecimals, timeZone) {
  return { text: dateTimeFormatTimeAgo(value, { timeZone }) };
}

function currency(symbol, asSuffix) {
  const units = ["", "K", "M", "B", "T"];
  const scaler = scaledUnits(1e3, units);
  return (value, decimals, scaledDecimals) => {
    var _a;
    if (value == null) {
      return { text: "" };
    }
    const isNegative = value < 0;
    if (isNegative) {
      value = Math.abs(value);
    }
    const scaled = scaler(value, decimals, scaledDecimals);
    if (asSuffix) {
      scaled.suffix = scaled.suffix !== void 0 ? `${scaled.suffix}${symbol}` : void 0;
    } else {
      scaled.prefix = symbol;
    }
    if (isNegative) {
      scaled.prefix = `-${((_a = scaled.prefix) == null ? void 0 : _a.length) ? scaled.prefix : ""}`;
    }
    return scaled;
  };
}
const SI_PREFIXES = ["f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
const SI_BASE_INDEX = SI_PREFIXES.indexOf("");
function getOffsetFromSIPrefix(c) {
  const charIndex = SI_PREFIXES.findIndex((prefix) => prefix.normalize("NFKD") === c.normalize("NFKD"));
  return charIndex < 0 ? 0 : charIndex - SI_BASE_INDEX;
}
const BIN_PREFIXES = ["", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi", "Yi"];
function binaryPrefix(unit, offset = 0) {
  const units = BIN_PREFIXES.map((p) => " " + p + unit);
  return scaledUnits(1024, units, offset);
}
function SIPrefix(unit, offset = 0) {
  const units = SI_PREFIXES.map((p) => " " + p + unit);
  return scaledUnits(1e3, units, SI_BASE_INDEX + offset);
}

const getCategories = () => [
  {
    name: "Misc",
    formats: [
      { name: "Number", id: "none", fn: toFixedUnit("") },
      { name: "String", id: "string", fn: stringFormater },
      {
        name: "short",
        id: "short",
        fn: scaledUnits(1e3, ["", " K", " Mil", " Bil", " Tri", " Quadr", " Quint", " Sext", " Sept"])
      },
      { name: "SI short", id: "sishort", fn: SIPrefix("") },
      { name: "Percent (0-100)", id: "percent", fn: toPercent },
      { name: "Percent (0.0-1.0)", id: "percentunit", fn: toPercentUnit },
      { name: "Humidity (%H)", id: "humidity", fn: toFixedUnit("%H") },
      { name: "Decibel", id: "dB", fn: toFixedUnit("dB") },
      { name: "Candela (cd)", id: "candela", fn: SIPrefix("cd") },
      { name: "Hexadecimal (0x)", id: "hex0x", fn: toHex0x },
      { name: "Hexadecimal", id: "hex", fn: toHex },
      { name: "Scientific notation", id: "sci", fn: sci },
      { name: "Locale format", id: "locale", fn: locale },
      { name: "Pixels", id: "pixel", fn: toFixedUnit("px") }
    ]
  },
  {
    name: "Acceleration",
    formats: [
      { name: "Meters/sec\xB2", id: "accMS2", fn: toFixedUnit("m/sec\xB2") },
      { name: "Feet/sec\xB2", id: "accFS2", fn: toFixedUnit("f/sec\xB2") },
      { name: "G unit", id: "accG", fn: toFixedUnit("g") }
    ]
  },
  {
    name: "Angle",
    formats: [
      { name: "Degrees (\xB0)", id: "degree", fn: toFixedUnit("\xB0") },
      { name: "Radians", id: "radian", fn: toFixedUnit("rad") },
      { name: "Gradian", id: "grad", fn: toFixedUnit("grad") },
      { name: "Arc Minutes", id: "arcmin", fn: toFixedUnit("arcmin") },
      { name: "Arc Seconds", id: "arcsec", fn: toFixedUnit("arcsec") }
    ]
  },
  {
    name: "Area",
    formats: [
      { name: "Square Meters (m\xB2)", id: "areaM2", fn: toFixedUnit("m\xB2") },
      { name: "Square Feet (ft\xB2)", id: "areaF2", fn: toFixedUnit("ft\xB2") },
      { name: "Square Miles (mi\xB2)", id: "areaMI2", fn: toFixedUnit("mi\xB2") },
      { name: "Acres (ac)", id: "acres", fn: toFixedUnit("ac") },
      { name: "Hectares (ha)", id: "hectares", fn: toFixedUnit("ha") }
    ]
  },
  {
    name: "Computation",
    formats: [
      { name: "FLOP/s", id: "flops", fn: SIPrefix("FLOPS") },
      { name: "MFLOP/s", id: "mflops", fn: SIPrefix("FLOPS", 2) },
      { name: "GFLOP/s", id: "gflops", fn: SIPrefix("FLOPS", 3) },
      { name: "TFLOP/s", id: "tflops", fn: SIPrefix("FLOPS", 4) },
      { name: "PFLOP/s", id: "pflops", fn: SIPrefix("FLOPS", 5) },
      { name: "EFLOP/s", id: "eflops", fn: SIPrefix("FLOPS", 6) },
      { name: "ZFLOP/s", id: "zflops", fn: SIPrefix("FLOPS", 7) },
      { name: "YFLOP/s", id: "yflops", fn: SIPrefix("FLOPS", 8) }
    ]
  },
  {
    name: "Concentration",
    formats: [
      { name: "parts-per-million (ppm)", id: "ppm", fn: toFixedUnit("ppm") },
      { name: "parts-per-billion (ppb)", id: "conppb", fn: toFixedUnit("ppb") },
      { name: "nanogram per cubic meter (ng/m\xB3)", id: "conngm3", fn: toFixedUnit("ng/m\xB3") },
      { name: "nanogram per normal cubic meter (ng/Nm\xB3)", id: "conngNm3", fn: toFixedUnit("ng/Nm\xB3") },
      { name: "microgram per cubic meter (\u03BCg/m\xB3)", id: "con\u03BCgm3", fn: toFixedUnit("\u03BCg/m\xB3") },
      { name: "microgram per normal cubic meter (\u03BCg/Nm\xB3)", id: "con\u03BCgNm3", fn: toFixedUnit("\u03BCg/Nm\xB3") },
      { name: "milligram per cubic meter (mg/m\xB3)", id: "conmgm3", fn: toFixedUnit("mg/m\xB3") },
      { name: "milligram per normal cubic meter (mg/Nm\xB3)", id: "conmgNm3", fn: toFixedUnit("mg/Nm\xB3") },
      { name: "gram per cubic meter (g/m\xB3)", id: "congm3", fn: toFixedUnit("g/m\xB3") },
      { name: "gram per normal cubic meter (g/Nm\xB3)", id: "congNm3", fn: toFixedUnit("g/Nm\xB3") },
      { name: "milligrams per decilitre (mg/dL)", id: "conmgdL", fn: toFixedUnit("mg/dL") },
      { name: "millimoles per litre (mmol/L)", id: "conmmolL", fn: toFixedUnit("mmol/L") }
    ]
  },
  {
    name: "Currency",
    formats: [
      { name: "Dollars ($)", id: "currencyUSD", fn: currency("$") },
      { name: "Pounds (\xA3)", id: "currencyGBP", fn: currency("\xA3") },
      { name: "Euro (\u20AC)", id: "currencyEUR", fn: currency("\u20AC") },
      { name: "Yen (\xA5)", id: "currencyJPY", fn: currency("\xA5") },
      { name: "Rubles (\u20BD)", id: "currencyRUB", fn: currency("\u20BD") },
      { name: "Hryvnias (\u20B4)", id: "currencyUAH", fn: currency("\u20B4") },
      { name: "Real (R$)", id: "currencyBRL", fn: currency("R$") },
      { name: "Danish Krone (kr)", id: "currencyDKK", fn: currency("kr", true) },
      { name: "Icelandic Kr\xF3na (kr)", id: "currencyISK", fn: currency("kr", true) },
      { name: "Norwegian Krone (kr)", id: "currencyNOK", fn: currency("kr", true) },
      { name: "Swedish Krona (kr)", id: "currencySEK", fn: currency("kr", true) },
      { name: "Czech koruna (czk)", id: "currencyCZK", fn: currency("czk") },
      { name: "Swiss franc (CHF)", id: "currencyCHF", fn: currency("CHF") },
      { name: "Polish Z\u0142oty (PLN)", id: "currencyPLN", fn: currency("PLN") },
      { name: "Bitcoin (\u0E3F)", id: "currencyBTC", fn: currency("\u0E3F") },
      { name: "Milli Bitcoin (\u0E3F)", id: "currencymBTC", fn: currency("mBTC") },
      { name: "Micro Bitcoin (\u0E3F)", id: "currency\u03BCBTC", fn: currency("\u03BCBTC") },
      { name: "South African Rand (R)", id: "currencyZAR", fn: currency("R") },
      { name: "Indian Rupee (\u20B9)", id: "currencyINR", fn: currency("\u20B9") },
      { name: "South Korean Won (\u20A9)", id: "currencyKRW", fn: currency("\u20A9") },
      { name: "Indonesian Rupiah (Rp)", id: "currencyIDR", fn: currency("Rp") },
      { name: "Philippine Peso (PHP)", id: "currencyPHP", fn: currency("PHP") },
      { name: "Vietnamese Dong (VND)", id: "currencyVND", fn: currency("\u0111", true) },
      { name: "Turkish Lira (\u20BA)", id: "currencyTRY", fn: currency("\u20BA", true) },
      { name: "Malaysian Ringgit (RM)", id: "currencyMYR", fn: currency("RM") },
      { name: "CFP franc (XPF)", id: "currencyXPF", fn: currency("XPF") },
      { name: "Bulgarian Lev (BGN)", id: "currencyBGN", fn: currency("BGN") },
      { name: "Guaran\xED (\u20B2)", id: "currencyPYG", fn: currency("\u20B2") },
      { name: "Uruguay Peso (UYU)", id: "currencyUYU", fn: currency("UYU") }
    ]
  },
  {
    name: "Data",
    formats: [
      { name: "bytes(IEC)", id: "bytes", fn: binaryPrefix("B") },
      { name: "bytes(SI)", id: "decbytes", fn: SIPrefix("B") },
      { name: "bits(IEC)", id: "bits", fn: binaryPrefix("b") },
      { name: "bits(SI)", id: "decbits", fn: SIPrefix("b") },
      { name: "kibibytes", id: "kbytes", fn: binaryPrefix("B", 1) },
      { name: "kilobytes", id: "deckbytes", fn: SIPrefix("B", 1) },
      { name: "mebibytes", id: "mbytes", fn: binaryPrefix("B", 2) },
      { name: "megabytes", id: "decmbytes", fn: SIPrefix("B", 2) },
      { name: "gibibytes", id: "gbytes", fn: binaryPrefix("B", 3) },
      { name: "gigabytes", id: "decgbytes", fn: SIPrefix("B", 3) },
      { name: "tebibytes", id: "tbytes", fn: binaryPrefix("B", 4) },
      { name: "terabytes", id: "dectbytes", fn: SIPrefix("B", 4) },
      { name: "pebibytes", id: "pbytes", fn: binaryPrefix("B", 5) },
      { name: "petabytes", id: "decpbytes", fn: SIPrefix("B", 5) }
    ]
  },
  {
    name: "Data rate",
    formats: [
      { name: "packets/sec", id: "pps", fn: SIPrefix("p/s") },
      { name: "bytes/sec(IEC)", id: "binBps", fn: binaryPrefix("B/s") },
      { name: "bytes/sec(SI)", id: "Bps", fn: SIPrefix("B/s") },
      { name: "bits/sec(IEC)", id: "binbps", fn: binaryPrefix("b/s") },
      { name: "bits/sec(SI)", id: "bps", fn: SIPrefix("b/s") },
      { name: "kibibytes/sec", id: "KiBs", fn: binaryPrefix("B/s", 1) },
      { name: "kibibits/sec", id: "Kibits", fn: binaryPrefix("b/s", 1) },
      { name: "kilobytes/sec", id: "KBs", fn: SIPrefix("B/s", 1) },
      { name: "kilobits/sec", id: "Kbits", fn: SIPrefix("b/s", 1) },
      { name: "mebibytes/sec", id: "MiBs", fn: binaryPrefix("B/s", 2) },
      { name: "mebibits/sec", id: "Mibits", fn: binaryPrefix("b/s", 2) },
      { name: "megabytes/sec", id: "MBs", fn: SIPrefix("B/s", 2) },
      { name: "megabits/sec", id: "Mbits", fn: SIPrefix("b/s", 2) },
      { name: "gibibytes/sec", id: "GiBs", fn: binaryPrefix("B/s", 3) },
      { name: "gibibits/sec", id: "Gibits", fn: binaryPrefix("b/s", 3) },
      { name: "gigabytes/sec", id: "GBs", fn: SIPrefix("B/s", 3) },
      { name: "gigabits/sec", id: "Gbits", fn: SIPrefix("b/s", 3) },
      { name: "tebibytes/sec", id: "TiBs", fn: binaryPrefix("B/s", 4) },
      { name: "tebibits/sec", id: "Tibits", fn: binaryPrefix("b/s", 4) },
      { name: "terabytes/sec", id: "TBs", fn: SIPrefix("B/s", 4) },
      { name: "terabits/sec", id: "Tbits", fn: SIPrefix("b/s", 4) },
      { name: "pebibytes/sec", id: "PiBs", fn: binaryPrefix("B/s", 5) },
      { name: "pebibits/sec", id: "Pibits", fn: binaryPrefix("b/s", 5) },
      { name: "petabytes/sec", id: "PBs", fn: SIPrefix("B/s", 5) },
      { name: "petabits/sec", id: "Pbits", fn: SIPrefix("b/s", 5) }
    ]
  },
  {
    name: "Date & time",
    formats: [
      { name: "Datetime ISO", id: "dateTimeAsIso", fn: dateTimeAsIso },
      { name: "Datetime ISO (No date if today)", id: "dateTimeAsIsoNoDateIfToday", fn: dateTimeAsIsoNoDateIfToday },
      { name: "Datetime US", id: "dateTimeAsUS", fn: dateTimeAsUS },
      { name: "Datetime US (No date if today)", id: "dateTimeAsUSNoDateIfToday", fn: dateTimeAsUSNoDateIfToday },
      { name: "Datetime local", id: "dateTimeAsLocal", fn: getDateTimeAsLocalFormat() },
      {
        name: "Datetime local (No date if today)",
        id: "dateTimeAsLocalNoDateIfToday",
        fn: getDateTimeAsLocalFormatNoDateIfToday()
      },
      { name: "Datetime default", id: "dateTimeAsSystem", fn: dateTimeSystemFormatter },
      { name: "From Now", id: "dateTimeFromNow", fn: dateTimeFromNow }
    ]
  },
  {
    name: "Energy",
    formats: [
      { name: "Watt (W)", id: "watt", fn: SIPrefix("W") },
      { name: "Kilowatt (kW)", id: "kwatt", fn: SIPrefix("W", 1) },
      { name: "Megawatt (MW)", id: "megwatt", fn: SIPrefix("W", 2) },
      { name: "Gigawatt (GW)", id: "gwatt", fn: SIPrefix("W", 3) },
      { name: "Milliwatt (mW)", id: "mwatt", fn: SIPrefix("W", -1) },
      { name: "Watt per square meter (W/m\xB2)", id: "Wm2", fn: toFixedUnit("W/m\xB2") },
      { name: "Volt-Ampere (VA)", id: "voltamp", fn: SIPrefix("VA") },
      { name: "Kilovolt-Ampere (kVA)", id: "kvoltamp", fn: SIPrefix("VA", 1) },
      { name: "Volt-Ampere reactive (VAr)", id: "voltampreact", fn: SIPrefix("VAr") },
      { name: "Kilovolt-Ampere reactive (kVAr)", id: "kvoltampreact", fn: SIPrefix("VAr", 1) },
      { name: "Watt-hour (Wh)", id: "watth", fn: SIPrefix("Wh") },
      { name: "Watt-hour per Kilogram (Wh/kg)", id: "watthperkg", fn: SIPrefix("Wh/kg") },
      { name: "Kilowatt-hour (kWh)", id: "kwatth", fn: SIPrefix("Wh", 1) },
      { name: "Kilowatt-min (kWm)", id: "kwattm", fn: SIPrefix("W-Min", 1) },
      { name: "Megawatt-hour (MWh)", id: "mwatth", fn: SIPrefix("Wh", 2) },
      { name: "Ampere-hour (Ah)", id: "amph", fn: SIPrefix("Ah") },
      { name: "Kiloampere-hour (kAh)", id: "kamph", fn: SIPrefix("Ah", 1) },
      { name: "Milliampere-hour (mAh)", id: "mamph", fn: SIPrefix("Ah", -1) },
      { name: "Joule (J)", id: "joule", fn: SIPrefix("J") },
      { name: "Electron volt (eV)", id: "ev", fn: SIPrefix("eV") },
      { name: "Ampere (A)", id: "amp", fn: SIPrefix("A") },
      { name: "Kiloampere (kA)", id: "kamp", fn: SIPrefix("A", 1) },
      { name: "Milliampere (mA)", id: "mamp", fn: SIPrefix("A", -1) },
      { name: "Volt (V)", id: "volt", fn: SIPrefix("V") },
      { name: "Kilovolt (kV)", id: "kvolt", fn: SIPrefix("V", 1) },
      { name: "Millivolt (mV)", id: "mvolt", fn: SIPrefix("V", -1) },
      { name: "Decibel-milliwatt (dBm)", id: "dBm", fn: SIPrefix("dBm") },
      { name: "Milliohm (m\u03A9)", id: "mohm", fn: SIPrefix("\u03A9", -1) },
      { name: "Ohm (\u03A9)", id: "ohm", fn: SIPrefix("\u03A9") },
      { name: "Kiloohm (k\u03A9)", id: "kohm", fn: SIPrefix("\u03A9", 1) },
      { name: "Megaohm (M\u03A9)", id: "Mohm", fn: SIPrefix("\u03A9", 2) },
      { name: "Farad (F)", id: "farad", fn: SIPrefix("F") },
      { name: "Microfarad (\xB5F)", id: "\xB5farad", fn: SIPrefix("F", -2) },
      { name: "Nanofarad (nF)", id: "nfarad", fn: SIPrefix("F", -3) },
      { name: "Picofarad (pF)", id: "pfarad", fn: SIPrefix("F", -4) },
      { name: "Femtofarad (fF)", id: "ffarad", fn: SIPrefix("F", -5) },
      { name: "Henry (H)", id: "henry", fn: SIPrefix("H") },
      { name: "Millihenry (mH)", id: "mhenry", fn: SIPrefix("H", -1) },
      { name: "Microhenry (\xB5H)", id: "\xB5henry", fn: SIPrefix("H", -2) },
      { name: "Lumens (Lm)", id: "lumens", fn: SIPrefix("Lm") }
    ]
  },
  {
    name: "Flow",
    formats: [
      { name: "Gallons/min (gpm)", id: "flowgpm", fn: toFixedUnit("gpm") },
      { name: "Cubic meters/sec (cms)", id: "flowcms", fn: toFixedUnit("cms") },
      { name: "Cubic feet/sec (cfs)", id: "flowcfs", fn: toFixedUnit("cfs") },
      { name: "Cubic feet/min (cfm)", id: "flowcfm", fn: toFixedUnit("cfm") },
      { name: "Litre/hour", id: "litreh", fn: toFixedUnit("L/h") },
      { name: "Litre/min (L/min)", id: "flowlpm", fn: toFixedUnit("L/min") },
      { name: "milliLitre/min (mL/min)", id: "flowmlpm", fn: toFixedUnit("mL/min") },
      { name: "Lux (lx)", id: "lux", fn: toFixedUnit("lux") }
    ]
  },
  {
    name: "Force",
    formats: [
      { name: "Newton-meters (Nm)", id: "forceNm", fn: SIPrefix("Nm") },
      { name: "Kilonewton-meters (kNm)", id: "forcekNm", fn: SIPrefix("Nm", 1) },
      { name: "Newtons (N)", id: "forceN", fn: SIPrefix("N") },
      { name: "Kilonewtons (kN)", id: "forcekN", fn: SIPrefix("N", 1) }
    ]
  },
  {
    name: "Hash rate",
    formats: [
      { name: "hashes/sec", id: "Hs", fn: SIPrefix("H/s") },
      { name: "kilohashes/sec", id: "KHs", fn: SIPrefix("H/s", 1) },
      { name: "megahashes/sec", id: "MHs", fn: SIPrefix("H/s", 2) },
      { name: "gigahashes/sec", id: "GHs", fn: SIPrefix("H/s", 3) },
      { name: "terahashes/sec", id: "THs", fn: SIPrefix("H/s", 4) },
      { name: "petahashes/sec", id: "PHs", fn: SIPrefix("H/s", 5) },
      { name: "exahashes/sec", id: "EHs", fn: SIPrefix("H/s", 6) }
    ]
  },
  {
    name: "Mass",
    formats: [
      { name: "milligram (mg)", id: "massmg", fn: SIPrefix("g", -1) },
      { name: "gram (g)", id: "massg", fn: SIPrefix("g") },
      { name: "pound (lb)", id: "masslb", fn: toFixedUnit("lb") },
      { name: "kilogram (kg)", id: "masskg", fn: SIPrefix("g", 1) },
      { name: "metric ton (t)", id: "masst", fn: toFixedUnit("t") }
    ]
  },
  {
    name: "Length",
    formats: [
      { name: "millimeter (mm)", id: "lengthmm", fn: SIPrefix("m", -1) },
      { name: "inch (in)", id: "lengthin", fn: toFixedUnit("in") },
      { name: "feet (ft)", id: "lengthft", fn: toFixedUnit("ft") },
      { name: "meter (m)", id: "lengthm", fn: SIPrefix("m") },
      { name: "kilometer (km)", id: "lengthkm", fn: SIPrefix("m", 1) },
      { name: "mile (mi)", id: "lengthmi", fn: toFixedUnit("mi") }
    ]
  },
  {
    name: "Pressure",
    formats: [
      { name: "Millibars", id: "pressurembar", fn: SIPrefix("bar", -1) },
      { name: "Bars", id: "pressurebar", fn: SIPrefix("bar") },
      { name: "Kilobars", id: "pressurekbar", fn: SIPrefix("bar", 1) },
      { name: "Pascals", id: "pressurepa", fn: SIPrefix("Pa") },
      { name: "Hectopascals", id: "pressurehpa", fn: toFixedUnit("hPa") },
      { name: "Kilopascals", id: "pressurekpa", fn: toFixedUnit("kPa") },
      { name: "Inches of mercury", id: "pressurehg", fn: toFixedUnit('"Hg') },
      { name: "PSI", id: "pressurepsi", fn: scaledUnits(1e3, ["psi", "ksi", "Mpsi"]) }
    ]
  },
  {
    name: "Radiation",
    formats: [
      { name: "Becquerel (Bq)", id: "radbq", fn: SIPrefix("Bq") },
      { name: "curie (Ci)", id: "radci", fn: SIPrefix("Ci") },
      { name: "Gray (Gy)", id: "radgy", fn: SIPrefix("Gy") },
      { name: "rad", id: "radrad", fn: SIPrefix("rad") },
      { name: "Sievert (Sv)", id: "radsv", fn: SIPrefix("Sv") },
      { name: "milliSievert (mSv)", id: "radmsv", fn: SIPrefix("Sv", -1) },
      { name: "microSievert (\xB5Sv)", id: "radusv", fn: SIPrefix("Sv", -2) },
      { name: "rem", id: "radrem", fn: SIPrefix("rem") },
      { name: "Exposure (C/kg)", id: "radexpckg", fn: SIPrefix("C/kg") },
      { name: "roentgen (R)", id: "radr", fn: SIPrefix("R") },
      { name: "Sievert/hour (Sv/h)", id: "radsvh", fn: SIPrefix("Sv/h") },
      { name: "milliSievert/hour (mSv/h)", id: "radmsvh", fn: SIPrefix("Sv/h", -1) },
      { name: "microSievert/hour (\xB5Sv/h)", id: "radusvh", fn: SIPrefix("Sv/h", -2) }
    ]
  },
  {
    name: "Rotational Speed",
    formats: [
      { name: "Revolutions per minute (rpm)", id: "rotrpm", fn: toFixedUnit("rpm") },
      { name: "Hertz (Hz)", id: "rothz", fn: SIPrefix("Hz") },
      { name: "Kilohertz (kHz)", id: "rotkhz", fn: SIPrefix("Hz", 1) },
      { name: "Megahertz (MHz)", id: "rotmhz", fn: SIPrefix("Hz", 2) },
      { name: "Gigahertz (GHz)", id: "rotghz", fn: SIPrefix("Hz", 3) },
      { name: "Radians per second (rad/s)", id: "rotrads", fn: toFixedUnit("rad/s") },
      { name: "Degrees per second (\xB0/s)", id: "rotdegs", fn: toFixedUnit("\xB0/s") }
    ]
  },
  {
    name: "Temperature",
    formats: [
      { name: "Celsius (\xB0C)", id: "celsius", fn: toFixedUnit("\xB0C") },
      { name: "Fahrenheit (\xB0F)", id: "fahrenheit", fn: toFixedUnit("\xB0F") },
      { name: "Kelvin (K)", id: "kelvin", fn: toFixedUnit("K") }
    ]
  },
  {
    name: "Time",
    formats: [
      { name: "Hertz (1/s)", id: "hertz", fn: SIPrefix("Hz") },
      { name: "nanoseconds (ns)", id: "ns", fn: toNanoSeconds },
      { name: "microseconds (\xB5s)", id: "\xB5s", fn: toMicroSeconds },
      { name: "milliseconds (ms)", id: "ms", fn: toMilliSeconds },
      { name: "seconds (s)", id: "s", fn: toSeconds },
      { name: "minutes (m)", id: "m", fn: toMinutes },
      { name: "hours (h)", id: "h", fn: toHours },
      { name: "days (d)", id: "d", fn: toDays },
      { name: "duration (ms)", id: "dtdurationms", fn: toDurationInMilliseconds },
      { name: "duration (s)", id: "dtdurations", fn: toDurationInSeconds },
      { name: "duration (hh:mm:ss)", id: "dthms", fn: toDurationInHoursMinutesSeconds },
      { name: "duration (d hh:mm:ss)", id: "dtdhms", fn: toDurationInDaysHoursMinutesSeconds },
      { name: "Timeticks (s/100)", id: "timeticks", fn: toTimeTicks },
      { name: "clock (ms)", id: "clockms", fn: toClockMilliseconds },
      { name: "clock (s)", id: "clocks", fn: toClockSeconds }
    ]
  },
  {
    name: "Throughput",
    formats: [
      { name: "counts/sec (cps)", id: "cps", fn: simpleCountUnit("c/s") },
      { name: "ops/sec (ops)", id: "ops", fn: simpleCountUnit("ops/s") },
      { name: "requests/sec (rps)", id: "reqps", fn: simpleCountUnit("req/s") },
      { name: "reads/sec (rps)", id: "rps", fn: simpleCountUnit("rd/s") },
      { name: "writes/sec (wps)", id: "wps", fn: simpleCountUnit("wr/s") },
      { name: "I/O ops/sec (iops)", id: "iops", fn: simpleCountUnit("io/s") },
      { name: "events/sec (eps)", id: "eps", fn: simpleCountUnit("evt/s") },
      { name: "messages/sec (mps)", id: "mps", fn: simpleCountUnit("msg/s") },
      { name: "records/sec (rps)", id: "recps", fn: simpleCountUnit("rec/s") },
      { name: "rows/sec (rps)", id: "rowsps", fn: simpleCountUnit("rows/s") },
      { name: "counts/min (cpm)", id: "cpm", fn: simpleCountUnit("c/m") },
      { name: "ops/min (opm)", id: "opm", fn: simpleCountUnit("ops/m") },
      { name: "requests/min (rpm)", id: "reqpm", fn: simpleCountUnit("req/m") },
      { name: "reads/min (rpm)", id: "rpm", fn: simpleCountUnit("rd/m") },
      { name: "writes/min (wpm)", id: "wpm", fn: simpleCountUnit("wr/m") },
      { name: "events/min (epm)", id: "epm", fn: simpleCountUnit("evts/m") },
      { name: "messages/min (mpm)", id: "mpm", fn: simpleCountUnit("msgs/m") },
      { name: "records/min (rpm)", id: "recpm", fn: simpleCountUnit("rec/m") },
      { name: "rows/min (rpm)", id: "rowspm", fn: simpleCountUnit("rows/m") }
    ]
  },
  {
    name: "Velocity",
    formats: [
      { name: "meters/second (m/s)", id: "velocityms", fn: toFixedUnit("m/s") },
      { name: "kilometers/hour (km/h)", id: "velocitykmh", fn: toFixedUnit("km/h") },
      { name: "miles/hour (mph)", id: "velocitymph", fn: toFixedUnit("mph") },
      { name: "knot (kn)", id: "velocityknot", fn: toFixedUnit("kn") }
    ]
  },
  {
    name: "Volume",
    formats: [
      { name: "millilitre (mL)", id: "mlitre", fn: SIPrefix("L", -1) },
      { name: "litre (L)", id: "litre", fn: SIPrefix("L") },
      { name: "cubic meter", id: "m3", fn: toFixedUnit("m\xB3") },
      { name: "Normal cubic meter", id: "Nm3", fn: toFixedUnit("Nm\xB3") },
      { name: "cubic decimeter", id: "dm3", fn: toFixedUnit("dm\xB3") },
      { name: "gallons", id: "gallons", fn: toFixedUnit("gal") }
    ]
  },
  {
    name: "Boolean",
    formats: [
      { name: "True / False", id: "bool", fn: booleanValueFormatter("True", "False") },
      { name: "Yes / No", id: "bool_yes_no", fn: booleanValueFormatter("Yes", "No") },
      { name: "On / Off", id: "bool_on_off", fn: booleanValueFormatter("On", "Off") }
    ]
  }
];

function formattedValueToString(val) {
  var _a, _b;
  return `${(_a = val.prefix) != null ? _a : ""}${val.text}${(_b = val.suffix) != null ? _b : ""}`;
}
let categories = [];
const index = {};
let hasBuiltIndex = false;
function toFixed(value, decimals) {
  if (value === null) {
    return "";
  }
  if (value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY) {
    return value.toLocaleString();
  }
  if (decimals === null || decimals === void 0) {
    decimals = getDecimalsForValue(value);
  }
  if (value === 0) {
    return value.toFixed(decimals);
  }
  const factor = decimals ? Math.pow(10, Math.max(0, decimals)) : 1;
  const formatted = String(Math.round(value * factor) / factor);
  if (formatted.indexOf("e") !== -1 || value === 0) {
    return formatted;
  }
  const decimalPos = formatted.indexOf(".");
  const precision = decimalPos === -1 ? 0 : formatted.length - decimalPos - 1;
  if (precision < decimals) {
    return (precision ? formatted : formatted + ".") + String(factor).slice(1, decimals - precision + 1);
  }
  return formatted;
}
function getDecimalsForValue(value) {
  const absValue = Math.abs(value);
  const log10 = Math.floor(Math.log(absValue) / Math.LN10);
  let dec = -log10 + 1;
  const magn = Math.pow(10, -dec);
  const norm = absValue / magn;
  if (norm > 2.25) {
    ++dec;
  }
  if (value % 1 === 0) {
    dec = 0;
  }
  const decimals = Math.max(0, dec);
  return decimals;
}
function toFixedScaled(value, decimals, ext) {
  return {
    text: toFixed(value, decimals),
    suffix: appendPluralIf(ext, Math.abs(value) > 1)
  };
}
function appendPluralIf(ext, condition) {
  if (!condition) {
    return ext;
  }
  switch (ext) {
    case " min":
    case " hour":
    case " day":
    case " week":
    case " year":
      return `${ext}s`;
    default:
      return ext;
  }
}
function toFixedUnit(unit, asPrefix) {
  return (size, decimals) => {
    if (size === null) {
      return { text: "" };
    }
    const text = toFixed(size, decimals);
    if (unit) {
      if (asPrefix) {
        return { text, prefix: unit };
      }
      return { text, suffix: " " + unit };
    }
    return { text };
  };
}
function isBooleanUnit(unit) {
  return unit && unit.startsWith("bool");
}
function booleanValueFormatter(t, f) {
  return (value) => {
    return { text: value ? t : f };
  };
}
const logb = (b, x) => Math.log10(x) / Math.log10(b);
function scaledUnits(factor, extArray, offset = 0) {
  return (size, decimals) => {
    if (size === null || size === void 0) {
      return { text: "" };
    }
    if (size === Number.NEGATIVE_INFINITY || size === Number.POSITIVE_INFINITY || isNaN(size)) {
      return { text: size.toLocaleString() };
    }
    const siIndex = size === 0 ? 0 : Math.floor(logb(factor, Math.abs(size)));
    const suffix = extArray[lodash.clamp(offset + siIndex, 0, extArray.length - 1)];
    return {
      text: toFixed(size / factor ** lodash.clamp(siIndex, -offset, extArray.length - offset - 1), decimals),
      suffix
    };
  };
}
function locale(value, decimals) {
  if (value == null) {
    return { text: "" };
  }
  return {
    text: value.toLocaleString(void 0, { maximumFractionDigits: decimals != null ? decimals : void 0 })
  };
}
function simpleCountUnit(symbol) {
  const units = ["", "K", "M", "B", "T"];
  const scaler = scaledUnits(1e3, units);
  return (size, decimals, scaledDecimals) => {
    if (size === null) {
      return { text: "" };
    }
    const v = scaler(size, decimals, scaledDecimals);
    v.suffix += " " + symbol;
    return v;
  };
}
function stringFormater(value) {
  return { text: `${value}` };
}
function buildFormats() {
  categories = getCategories();
  for (const cat of categories) {
    for (const format of cat.formats) {
      index[format.id] = format.fn;
    }
  }
  [{ from: "farenheit", to: "fahrenheit" }].forEach((alias) => {
    const f = index[alias.to];
    if (f) {
      index[alias.from] = f;
    }
  });
  hasBuiltIndex = true;
}
function getValueFormat(id) {
  if (!id) {
    return toFixedUnit("");
  }
  if (!hasBuiltIndex) {
    buildFormats();
  }
  const fmt = index[id];
  if (!fmt && id) {
    let idx = id.indexOf(":");
    if (idx > 0) {
      const key = id.substring(0, idx);
      const sub = id.substring(idx + 1);
      if (key === "prefix") {
        return toFixedUnit(sub, true);
      }
      if (key === "suffix") {
        return toFixedUnit(sub, false);
      }
      if (key === "time") {
        return toDateTimeValueFormatter(sub);
      }
      if (key === "si") {
        const offset = getOffsetFromSIPrefix(sub.charAt(0));
        const unit = offset === 0 ? sub : sub.substring(1);
        return SIPrefix(unit, offset);
      }
      if (key === "count") {
        return simpleCountUnit(sub);
      }
      if (key === "currency") {
        return currency(sub);
      }
      if (key === "bool") {
        idx = sub.indexOf("/");
        if (idx >= 0) {
          const t = sub.substring(0, idx);
          const f = sub.substring(idx + 1);
          return booleanValueFormatter(t, f);
        }
        return booleanValueFormatter(sub, "-");
      }
    }
    return toFixedUnit(id);
  }
  return fmt;
}
function getValueFormatterIndex() {
  if (!hasBuiltIndex) {
    buildFormats();
  }
  return index;
}
function getValueFormats() {
  if (!hasBuiltIndex) {
    buildFormats();
  }
  return categories.map((cat) => {
    return {
      text: cat.name,
      submenu: cat.formats.map((format) => {
        return {
          text: format.name,
          value: format.id
        };
      })
    };
  });
}

function createBreakpoints() {
  const step = 5;
  const keys = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const unit = "px";
  const values = {
    xs: 0,
    sm: 544,
    md: 769,
    // 1 more than regular ipad in portrait
    lg: 992,
    xl: 1200,
    xxl: 1440
  };
  function up(key) {
    const value = typeof key === "number" ? key : values[key];
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof key === "number" ? key : values[key];
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  return {
    values,
    up,
    down,
    keys,
    unit
  };
}

function clamp(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== "production") {
    if (value < min || value > max) {
      console.error(`The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let result = color.match(re);
  if (!result) {
    return "";
  }
  let colors = Array.from(result);
  if (colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function rgbToHex(color) {
  if (color.indexOf("#") === 0) {
    return color;
  }
  const { values } = decomposeColor(color);
  return `#${values.map((n) => intToHex(n)).join("")}`;
}
function asHexString(color) {
  if (color[0] === "#") {
    return color;
  }
  const tColor = tinycolor__default["default"](color);
  return tColor.getAlpha() === 1 ? tColor.toHexString() : tColor.toHex8String();
}
function asRgbString(color) {
  if (color.startsWith("rgb")) {
    return color;
  }
  return tinycolor__default["default"](color).toRgbString();
}
function hslToRgb(color) {
  const parts = decomposeColor(color);
  const { values } = parts;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (parts.type === "hsla") {
    type += "a";
    rgb.push(values[3]);
  }
  return recomposeColor({ type, values: rgb });
}
function decomposeColor(color) {
  if (typeof color !== "string") {
    return color;
  }
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }
  const marker = color.indexOf("(");
  const type = color.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(
      `Unsupported '${color}' color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()`
    );
  }
  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;
  if (type === "color") {
    values = values.split(" ");
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(
        `Unsupported ${colorSpace} color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
      );
    }
  } else {
    values = values.split(",");
  }
  values = values.map((value) => parseFloat(value));
  return { type, values, colorSpace };
}
function recomposeColor(color) {
  const { type, colorSpace } = color;
  let values = color.values;
  if (type.indexOf("rgb") !== -1) {
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values = `${colorSpace} ${values.join(" ")}`;
  } else {
    values = `${values.join(", ")}`;
  }
  return `${type}(${values})`;
}
function getContrastRatio(foreground, background, canvas) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background, canvas);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color, background) {
  const parts = decomposeColor(color);
  let rgb = parts.type === "hsl" ? decomposeColor(hslToRgb(color)).values : parts.values;
  if (background && parts.type === "rgba") {
    const backgroundParts = decomposeColor(background);
    const alpha2 = rgb[3];
    rgb[0] = rgb[0] * alpha2 + backgroundParts.values[0] * (1 - alpha2);
    rgb[1] = rgb[1] * alpha2 + backgroundParts.values[1] * (1 - alpha2);
    rgb[2] = rgb[2] * alpha2 + backgroundParts.values[2] * (1 - alpha2);
  }
  const rgbNumbers = rgb.map((val) => {
    if (parts.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgbNumbers[0] + 0.7152 * rgbNumbers[1] + 0.0722 * rgbNumbers[2]).toFixed(3));
}
function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function alpha(color, value) {
  if (color === "") {
    return "#000000";
  }
  value = clamp(value);
  if (color[0] === "#") {
    if (color.length === 9) {
      color = color.substring(0, 7);
    } else if (color.length <= 5) {
      let c = "#";
      for (let i = 1; i < 4; i++) {
        c += color[i] + color[i];
      }
      color = c;
    }
    return color + Math.round(value * 255).toString(16).padStart(2, "0");
  } else if (color[3] === "(") {
    return color.replace(")", `, ${value})`);
  } else if (color[4] === "(") {
    return color.substring(0, color.lastIndexOf(",")) + `, ${value})`;
  }
  const parts = decomposeColor(color);
  if (parts.type === "color") {
    parts.values[3] = `/${value}`;
  } else {
    parts.values[3] = value;
  }
  return recomposeColor(parts);
}
function darken(color, coefficient) {
  const parts = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (parts.type.indexOf("hsl") !== -1) {
    parts.values[2] *= 1 - coefficient;
  } else if (parts.type.indexOf("rgb") !== -1 || parts.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(parts);
}
function lighten(color, coefficient) {
  const parts = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (parts.type.indexOf("hsl") !== -1) {
    parts.values[2] += (100 - parts.values[2]) * coefficient;
  } else if (parts.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] += (255 - parts.values[i]) * coefficient;
    }
  } else if (parts.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] += (1 - parts.values[i]) * coefficient;
    }
  }
  return recomposeColor(parts);
}

var colorManipulator = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  asHexString: asHexString,
  asRgbString: asRgbString,
  hslToRgb: hslToRgb,
  decomposeColor: decomposeColor,
  recomposeColor: recomposeColor,
  getContrastRatio: getContrastRatio,
  getLuminance: getLuminance,
  emphasize: emphasize,
  alpha: alpha,
  darken: darken,
  lighten: lighten
});

const palette = {
  white: "#FFFFFF",
  black: "#000000",
  gray25: "#2c3235",
  gray15: "#22252b",
  //'#202226',
  gray10: "#181b1f",
  // old '#141619',
  gray05: "#111217",
  // old '#0b0c0e',
  // new from figma,
  darkLayer0: "#18181A",
  darkLayer1: "#212124",
  darkLayer2: "#2a2a2f",
  // figma used #34343B but a bit too bright
  darkBorder1: "#34343B",
  darkBorder2: "#64646B",
  // Dashboard bg / layer 0 (light theme)
  gray90: "#F4F5F5",
  // Card bg / layer 1
  gray100: "#F4F5F5",
  // divider line
  gray80: "#D0D1D3",
  // from figma
  lightBorder1: "#E4E7E7",
  blueDarkMain: "#3D71D9",
  // '#4165F5',
  blueDarkText: "#6E9FFF",
  // '#58a6ff', //'#33a2e5', // '#5790FF',
  redDarkMain: "#D10E5C",
  redDarkText: "#FF5286",
  greenDarkMain: "#1A7F4B",
  greenDarkText: "#6CCF8E",
  orangeDarkMain: "#FF9900",
  orangeDarkText: "#fbad37",
  blueLightMain: "#3871DC",
  blueLightText: "#1F62E0",
  redLightMain: "#E0226E",
  redLightText: "#CF0E5B",
  greenLightMain: "#1B855E",
  greenLightText: "#0A764E",
  orangeLightMain: "#FF9900",
  orangeLightText: "#B5510D"
};

var __defProp$M = Object.defineProperty;
var __defProps$B = Object.defineProperties;
var __getOwnPropDescs$B = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$H = Object.getOwnPropertySymbols;
var __hasOwnProp$H = Object.prototype.hasOwnProperty;
var __propIsEnum$H = Object.prototype.propertyIsEnumerable;
var __defNormalProp$M = (obj, key, value) => key in obj ? __defProp$M(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$G = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$H.call(b, prop))
      __defNormalProp$M(a, prop, b[prop]);
  if (__getOwnPropSymbols$H)
    for (var prop of __getOwnPropSymbols$H(b)) {
      if (__propIsEnum$H.call(b, prop))
        __defNormalProp$M(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$B = (a, b) => __defProps$B(a, __getOwnPropDescs$B(b));
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$H.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$H)
    for (var prop of __getOwnPropSymbols$H(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$H.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField$c = (obj, key, value) => {
  __defNormalProp$M(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DarkColors {
  constructor() {
    __publicField$c(this, "mode", "dark");
    // Used to get more white opacity colors
    __publicField$c(this, "whiteBase", "204, 204, 220");
    __publicField$c(this, "border", {
      weak: `rgba(${this.whiteBase}, 0.12)`,
      medium: `rgba(${this.whiteBase}, 0.20)`,
      strong: `rgba(${this.whiteBase}, 0.30)`
    });
    __publicField$c(this, "text", {
      primary: `rgb(${this.whiteBase})`,
      secondary: `rgba(${this.whiteBase}, 0.65)`,
      disabled: `rgba(${this.whiteBase}, 0.6)`,
      link: palette.blueDarkText,
      maxContrast: palette.white
    });
    __publicField$c(this, "primary", {
      main: palette.blueDarkMain,
      text: palette.blueDarkText,
      border: palette.blueDarkText
    });
    __publicField$c(this, "secondary", {
      main: `rgba(${this.whiteBase}, 0.10)`,
      shade: `rgba(${this.whiteBase}, 0.14)`,
      transparent: `rgba(${this.whiteBase}, 0.08)`,
      text: this.text.primary,
      contrastText: `rgb(${this.whiteBase})`,
      border: `rgba(${this.whiteBase}, 0.08)`
    });
    __publicField$c(this, "info", this.primary);
    __publicField$c(this, "error", {
      main: palette.redDarkMain,
      text: palette.redDarkText
    });
    __publicField$c(this, "success", {
      main: palette.greenDarkMain,
      text: palette.greenDarkText
    });
    __publicField$c(this, "warning", {
      main: palette.orangeDarkMain,
      text: palette.orangeDarkText
    });
    __publicField$c(this, "background", {
      canvas: palette.gray05,
      primary: palette.gray10,
      secondary: palette.gray15
    });
    __publicField$c(this, "action", {
      hover: `rgba(${this.whiteBase}, 0.16)`,
      selected: `rgba(${this.whiteBase}, 0.12)`,
      selectedBorder: palette.orangeDarkMain,
      focus: `rgba(${this.whiteBase}, 0.16)`,
      hoverOpacity: 0.08,
      disabledText: this.text.disabled,
      disabledBackground: `rgba(${this.whiteBase}, 0.04)`,
      disabledOpacity: 0.38
    });
    __publicField$c(this, "gradients", {
      brandHorizontal: "linear-gradient(270deg, #F55F3E 0%, #FF8833 100%)",
      brandVertical: "linear-gradient(0.01deg, #F55F3E 0.01%, #FF8833 99.99%)"
    });
    __publicField$c(this, "contrastThreshold", 3);
    __publicField$c(this, "hoverFactor", 0.03);
    __publicField$c(this, "tonalOffset", 0.15);
  }
}
class LightColors {
  constructor() {
    __publicField$c(this, "mode", "light");
    __publicField$c(this, "blackBase", "36, 41, 46");
    __publicField$c(this, "primary", {
      main: palette.blueLightMain,
      border: palette.blueLightText,
      text: palette.blueLightText
    });
    __publicField$c(this, "text", {
      primary: `rgba(${this.blackBase}, 1)`,
      secondary: `rgba(${this.blackBase}, 0.75)`,
      disabled: `rgba(${this.blackBase}, 0.64)`,
      link: this.primary.text,
      maxContrast: palette.black
    });
    __publicField$c(this, "border", {
      weak: `rgba(${this.blackBase}, 0.12)`,
      medium: `rgba(${this.blackBase}, 0.30)`,
      strong: `rgba(${this.blackBase}, 0.40)`
    });
    __publicField$c(this, "secondary", {
      main: `rgba(${this.blackBase}, 0.08)`,
      shade: `rgba(${this.blackBase}, 0.15)`,
      transparent: `rgba(${this.blackBase}, 0.08)`,
      contrastText: `rgba(${this.blackBase},  1)`,
      text: this.text.primary,
      border: this.border.weak
    });
    __publicField$c(this, "info", {
      main: palette.blueLightMain,
      text: palette.blueLightText
    });
    __publicField$c(this, "error", {
      main: palette.redLightMain,
      text: palette.redLightText,
      border: palette.redLightText
    });
    __publicField$c(this, "success", {
      main: palette.greenLightMain,
      text: palette.greenLightText
    });
    __publicField$c(this, "warning", {
      main: palette.orangeLightMain,
      text: palette.orangeLightText
    });
    __publicField$c(this, "background", {
      canvas: palette.gray90,
      primary: palette.white,
      secondary: palette.gray100
    });
    __publicField$c(this, "action", {
      hover: `rgba(${this.blackBase}, 0.12)`,
      selected: `rgba(${this.blackBase}, 0.08)`,
      selectedBorder: palette.orangeLightMain,
      hoverOpacity: 0.08,
      focus: `rgba(${this.blackBase}, 0.12)`,
      disabledBackground: `rgba(${this.blackBase}, 0.04)`,
      disabledText: this.text.disabled,
      disabledOpacity: 0.38
    });
    __publicField$c(this, "gradients", {
      brandHorizontal: "linear-gradient(90deg, #FF8833 0%, #F53E4C 100%)",
      brandVertical: "linear-gradient(0.01deg, #F53E4C -31.2%, #FF8833 113.07%)"
    });
    __publicField$c(this, "contrastThreshold", 3);
    __publicField$c(this, "hoverFactor", 0.03);
    __publicField$c(this, "tonalOffset", 0.2);
  }
}
function createColors(colors) {
  var _a;
  const dark = new DarkColors();
  const light = new LightColors();
  const base = ((_a = colors.mode) != null ? _a : "dark") === "dark" ? dark : light;
  const _b = colors, {
    primary = base.primary,
    secondary = base.secondary,
    info = base.info,
    warning = base.warning,
    success = base.success,
    error = base.error,
    tonalOffset = base.tonalOffset,
    hoverFactor = base.hoverFactor,
    contrastThreshold = base.contrastThreshold
  } = _b, other = __objRest$3(_b, [
    "primary",
    "secondary",
    "info",
    "warning",
    "success",
    "error",
    "tonalOffset",
    "hoverFactor",
    "contrastThreshold"
  ]);
  function getContrastText(background, threshold = contrastThreshold) {
    const contrastText = getContrastRatio(dark.text.maxContrast, background, base.background.primary) >= threshold ? dark.text.maxContrast : light.text.maxContrast;
    return contrastText;
  }
  const getRichColor = ({ color, name }) => {
    color = __spreadProps$B(__spreadValues$G({}, color), { name });
    if (!color.main) {
      throw new Error(`Missing main color for ${name}`);
    }
    if (!color.text) {
      color.text = color.main;
    }
    if (!color.border) {
      color.border = color.text;
    }
    if (!color.shade) {
      color.shade = base.mode === "light" ? darken(color.main, tonalOffset) : lighten(color.main, tonalOffset);
    }
    if (!color.transparent) {
      color.transparent = alpha(color.main, 0.15);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    if (!color.borderTransparent) {
      color.borderTransparent = alpha(color.border, 0.25);
    }
    return color;
  };
  return lodash.merge(
    __spreadProps$B(__spreadValues$G({}, base), {
      primary: getRichColor({ color: primary, name: "primary" }),
      secondary: getRichColor({ color: secondary, name: "secondary" }),
      info: getRichColor({ color: info, name: "info" }),
      error: getRichColor({ color: error, name: "error" }),
      success: getRichColor({ color: success, name: "success" }),
      warning: getRichColor({ color: warning, name: "warning" }),
      getContrastText,
      emphasize: (color, factor) => {
        return emphasize(color, factor != null ? factor : hoverFactor);
      }
    }),
    other
  );
}

function createComponents(colors, shadows) {
  const panel = {
    padding: 1,
    headerHeight: 4,
    background: colors.background.primary,
    borderColor: colors.border.weak,
    boxShadow: "none"
  };
  const input = {
    borderColor: colors.border.medium,
    borderHover: colors.border.strong,
    text: colors.text.primary,
    background: colors.mode === "dark" ? colors.background.canvas : colors.background.primary
  };
  return {
    height: {
      sm: 3,
      md: 4,
      lg: 6
    },
    input,
    panel,
    dropdown: {
      background: input.background
    },
    tooltip: {
      background: colors.background.secondary,
      text: colors.text.primary
    },
    dashboard: {
      background: colors.background.canvas,
      padding: 1
    },
    overlay: {
      background: colors.mode === "dark" ? "rgba(63, 62, 62, 0.45)" : "rgba(208, 209, 211, 0.24)"
    },
    sidemenu: {
      width: 57
    },
    menuTabs: {
      height: 42
    },
    textHighlight: {
      text: colors.warning.contrastText,
      background: colors.warning.main
    },
    horizontalDrawer: {
      defaultHeight: 400
    },
    table: {
      rowHoverBackground: colors.emphasize(colors.background.primary, 0.03)
    }
  };
}

function createShadows(colors) {
  if (colors.mode === "dark") {
    return {
      z1: "0px 1px 2px rgba(1, 4, 9, 0.75)",
      z2: "0px 4px 8px rgba(1, 4, 9, 0.75)",
      z3: "0px 8px 24px rgb(1, 4, 9)"
    };
  }
  return {
    z1: "0px 1px 2px rgba(24, 26, 27, 0.2)",
    z2: "0px 4px 8px rgba(24, 26, 27, 0.2)",
    z3: "0px 13px 20px 1px rgba(24, 26, 27, 0.18)"
  };
}

function createShape(options) {
  var _a;
  const baseBorderRadius = (_a = options.borderRadius) != null ? _a : 2;
  const radius = {
    default: "2px",
    pill: "9999px",
    circle: "100%"
  };
  const borderRadius = (amount) => {
    const value = (amount != null ? amount : 1) * baseBorderRadius;
    return `${value}px`;
  };
  return {
    radius,
    borderRadius
  };
}

function createSpacing(options = {}) {
  const { gridSize = 8 } = options;
  const transform = (value) => {
    if (typeof value === "string") {
      return value;
    }
    if (process.env.NODE_ENV !== "production") {
      if (typeof value !== "number") {
        console.error(`Expected spacing argument to be a number or a string, got ${value}.`);
      }
    }
    return value * gridSize;
  };
  const spacing = (...args) => {
    if (process.env.NODE_ENV !== "production") {
      if (!(args.length <= 4)) {
        console.error(`Too many arguments provided, expected between 0 and 4, got ${args.length}`);
      }
    }
    if (args.length === 0) {
      args[0] = 1;
    }
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing.gridSize = gridSize;
  spacing.x0 = "0px";
  spacing.x0_25 = "2px";
  spacing.x0_5 = "4px";
  spacing.x1 = "8px";
  spacing.x1_5 = "12px";
  spacing.x2 = "16px";
  spacing.x2_5 = "20px";
  spacing.x3 = "24px";
  spacing.x4 = "32px";
  spacing.x5 = "40px";
  spacing.x6 = "48px";
  spacing.x8 = "64px";
  spacing.x10 = "80px";
  return spacing;
}

const easing = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function create(props = ["all"], options = {}) {
  const { duration: durationOption = duration.standard, easing: easingOption = easing.easeInOut, delay = 0 } = options;
  return (Array.isArray(props) ? props : [props]).map(
    (animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`
  ).join(",");
}
function handleMotion(...props) {
  return props.map((prop) => `@media (prefers-reduced-motion: ${prop})`).join(",");
}
function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function createTransitions() {
  return {
    create,
    duration,
    easing,
    getAutoHeightDuration,
    handleMotion
  };
}

var __defProp$L = Object.defineProperty;
var __defProps$A = Object.defineProperties;
var __getOwnPropDescs$A = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$G = Object.getOwnPropertySymbols;
var __hasOwnProp$G = Object.prototype.hasOwnProperty;
var __propIsEnum$G = Object.prototype.propertyIsEnumerable;
var __defNormalProp$L = (obj, key, value) => key in obj ? __defProp$L(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$F = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$G.call(b, prop))
      __defNormalProp$L(a, prop, b[prop]);
  if (__getOwnPropSymbols$G)
    for (var prop of __getOwnPropSymbols$G(b)) {
      if (__propIsEnum$G.call(b, prop))
        __defNormalProp$L(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$A = (a, b) => __defProps$A(a, __getOwnPropDescs$A(b));
const defaultFontFamily = '"Inter", "Helvetica", "Arial", sans-serif';
const defaultFontFamilyMonospace = "'Roboto Mono', monospace";
function createTypography(colors, typographyInput = {}) {
  const {
    fontFamily = defaultFontFamily,
    fontFamilyMonospace = defaultFontFamilyMonospace,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 500,
    // Tell Grafana-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 14
  } = typographyInput;
  if (process.env.NODE_ENV !== "production") {
    if (typeof fontSize !== "number") {
      console.error("Grafana-UI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("Grafana-UI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize / 14;
  const pxToRem = (size2) => `${size2 / htmlFontSize * coef}rem`;
  const buildVariant = (fontWeight, size2, lineHeight, letterSpacing, casing) => {
    if (lineHeight % 2 !== 0 || size2 % 2 !== 0) {
      throw new Error("Font size and line height should be integer multiples of 2 to prevent issues with alignment");
    }
    return __spreadValues$F(__spreadValues$F({
      fontFamily,
      fontWeight,
      fontSize: pxToRem(size2),
      lineHeight: lineHeight / size2
    }, fontFamily === defaultFontFamily ? { letterSpacing: `${round(letterSpacing / size2)}em` } : {}), casing);
  };
  const variants = {
    h1: buildVariant(fontWeightRegular, 28, 32, -0.25),
    h2: buildVariant(fontWeightRegular, 24, 28, 0),
    h3: buildVariant(fontWeightRegular, 22, 24, 0),
    h4: buildVariant(fontWeightRegular, 18, 22, 0.25),
    h5: buildVariant(fontWeightRegular, 16, 22, 0),
    h6: buildVariant(fontWeightMedium, 14, 22, 0.15),
    body: buildVariant(fontWeightRegular, fontSize, 22, 0.15),
    bodySmall: buildVariant(fontWeightRegular, 12, 18, 0.15),
    code: __spreadProps$A(__spreadValues$F({}, buildVariant(fontWeightRegular, 14, 16, 0.15)), { fontFamily: fontFamilyMonospace })
  };
  const size = {
    base: "14px",
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "18px"
  };
  return __spreadValues$F({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontFamilyMonospace,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    size
  }, variants);
}
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

var __defProp$K = Object.defineProperty;
var __defProps$z = Object.defineProperties;
var __getOwnPropDescs$z = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$F = Object.getOwnPropertySymbols;
var __hasOwnProp$F = Object.prototype.hasOwnProperty;
var __propIsEnum$F = Object.prototype.propertyIsEnumerable;
var __defNormalProp$K = (obj, key, value) => key in obj ? __defProp$K(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$E = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$F.call(b, prop))
      __defNormalProp$K(a, prop, b[prop]);
  if (__getOwnPropSymbols$F)
    for (var prop of __getOwnPropSymbols$F(b)) {
      if (__propIsEnum$F.call(b, prop))
        __defNormalProp$K(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$z = (a, b) => __defProps$z(a, __getOwnPropDescs$z(b));
function createV1Theme(theme) {
  const oldCommon = {
    name: "Grafana Default",
    typography: {
      fontFamily: {
        sansSerif: theme.typography.fontFamily,
        monospace: theme.typography.fontFamilyMonospace
      },
      size: {
        base: `${theme.typography.fontSize}px`,
        xs: theme.typography.size.xs,
        sm: theme.typography.size.sm,
        md: theme.typography.size.md,
        lg: theme.typography.size.lg
      },
      heading: {
        h1: theme.typography.h1.fontSize,
        h2: theme.typography.h2.fontSize,
        h3: theme.typography.h3.fontSize,
        h4: theme.typography.h4.fontSize,
        h5: theme.typography.h5.fontSize,
        h6: theme.typography.h6.fontSize
      },
      weight: {
        light: theme.typography.fontWeightLight,
        regular: theme.typography.fontWeightRegular,
        semibold: theme.typography.fontWeightMedium,
        bold: theme.typography.fontWeightBold
      },
      lineHeight: {
        xs: theme.typography.bodySmall.lineHeight,
        sm: theme.typography.bodySmall.lineHeight,
        md: theme.typography.body.lineHeight,
        lg: theme.typography.h2.lineHeight
      },
      link: {
        decoration: "none",
        hoverDecoration: "none"
      }
    },
    breakpoints: {
      xs: `${theme.breakpoints.values.xs}px`,
      sm: `${theme.breakpoints.values.sm}px`,
      md: `${theme.breakpoints.values.md}px`,
      lg: `${theme.breakpoints.values.lg}px`,
      xl: `${theme.breakpoints.values.xl}px`,
      xxl: `${theme.breakpoints.values.xxl}px`
    },
    spacing: {
      base: theme.spacing.gridSize,
      insetSquishMd: theme.spacing(0.5, 1),
      d: theme.spacing(2),
      xxs: theme.spacing(0.25),
      xs: theme.spacing(0.5),
      sm: theme.spacing(1),
      md: theme.spacing(2),
      lg: theme.spacing(3),
      xl: theme.spacing(4),
      gutter: theme.spacing(4),
      // Next-gen forms spacing variables
      // TODO: Move variables definition to respective components when implementing
      formSpacingBase: theme.spacing.gridSize,
      formMargin: `${theme.spacing.gridSize * 4}px`,
      formFieldsetMargin: `${theme.spacing.gridSize * 2}px`,
      formInputHeight: theme.spacing.gridSize * 4,
      formButtonHeight: theme.spacing.gridSize * 4,
      formInputPaddingHorizontal: `${theme.spacing.gridSize}px`,
      // Used for icons do define spacing between icon and input field
      // Applied on the right(prefix) or left(suffix)
      formInputAffixPaddingHorizontal: `${theme.spacing.gridSize / 2}px`,
      formInputMargin: `${theme.spacing.gridSize * 2}px`,
      formLabelPadding: "0 0 0 2px",
      formLabelMargin: `0 0 ${theme.spacing.gridSize / 2 + "px"} 0`,
      formValidationMessagePadding: "4px 8px",
      formValidationMessageMargin: "4px 0 0 0",
      inlineFormMargin: "4px"
    },
    border: {
      radius: {
        sm: theme.shape.borderRadius(1),
        md: theme.shape.borderRadius(2),
        lg: theme.shape.borderRadius(3)
      },
      width: {
        sm: "1px"
      }
    },
    height: {
      sm: theme.spacing.gridSize * theme.components.height.sm,
      md: theme.spacing.gridSize * theme.components.height.md,
      lg: theme.spacing.gridSize * theme.components.height.lg
    },
    panelPadding: theme.components.panel.padding * theme.spacing.gridSize,
    panelHeaderHeight: theme.spacing.gridSize * theme.components.panel.headerHeight,
    zIndex: theme.zIndex
  };
  const basicColors = __spreadProps$z(__spreadValues$E({}, commonColorsPalette), {
    black: "#000000",
    white: "#ffffff",
    dark1: "#141414",
    dark2: "#161719",
    dark3: "#1f1f20",
    dark4: "#212124",
    dark5: "#222426",
    dark6: "#262628",
    dark7: "#292a2d",
    dark8: "#2f2f32",
    dark9: "#343436",
    dark10: "#424345",
    gray1: "#555555",
    gray2: "#8e8e8e",
    gray3: "#b3b3b3",
    gray4: "#d8d9da",
    gray5: "#ececec",
    gray6: "#f4f5f8",
    // not used in dark theme
    gray7: "#fbfbfb",
    // not used in dark theme
    redBase: "#e02f44",
    redShade: "#c4162a",
    greenBase: "#299c46",
    greenShade: "#23843b",
    red: "#d44a3a",
    yellow: "#ecbb13",
    purple: "#9933cc",
    variable: "#32d1df",
    orange: "#eb7b18",
    orangeDark: "#ff780a"
  });
  const backgrounds = {
    bg1: theme.colors.background.primary,
    bg2: theme.colors.background.secondary,
    bg3: theme.colors.action.hover,
    dashboardBg: theme.colors.background.canvas,
    bgBlue1: theme.colors.primary.main,
    bgBlue2: theme.colors.primary.shade
  };
  const borders = {
    border1: theme.colors.border.weak,
    border2: theme.colors.border.medium,
    border3: theme.colors.border.strong
  };
  const textColors = {
    textStrong: theme.colors.text.maxContrast,
    textHeading: theme.colors.text.primary,
    text: theme.colors.text.primary,
    textSemiWeak: theme.colors.text.secondary,
    textWeak: theme.colors.text.secondary,
    textFaint: theme.colors.text.disabled,
    textBlue: theme.colors.primary.text
  };
  const form = {
    // Next-gen forms functional colors
    formLabel: theme.colors.text.primary,
    formDescription: theme.colors.text.secondary,
    formInputBg: theme.components.input.background,
    formInputBgDisabled: theme.colors.action.disabledBackground,
    formInputBorder: theme.components.input.borderColor,
    formInputBorderHover: theme.components.input.borderHover,
    formInputBorderActive: theme.colors.primary.border,
    formInputBorderInvalid: theme.colors.error.border,
    formInputPlaceholderText: theme.colors.text.disabled,
    formInputText: theme.components.input.text,
    formInputDisabledText: theme.colors.action.disabledText,
    formFocusOutline: theme.colors.primary.main,
    formValidationMessageText: theme.colors.error.contrastText,
    formValidationMessageBg: theme.colors.error.main
  };
  return __spreadProps$z(__spreadValues$E({}, oldCommon), {
    type: theme.colors.mode === "dark" ? GrafanaThemeType.Dark : GrafanaThemeType.Light,
    isDark: theme.isDark,
    isLight: theme.isLight,
    name: theme.name,
    palette: __spreadProps$z(__spreadValues$E({}, basicColors), {
      brandPrimary: basicColors.orange,
      brandSuccess: theme.colors.success.main,
      brandWarning: theme.colors.warning.main,
      brandDanger: theme.colors.error.main,
      queryRed: theme.colors.error.text,
      queryGreen: theme.colors.success.text,
      queryPurple: "#fe85fc",
      queryOrange: basicColors.orange,
      online: theme.colors.success.main,
      warn: theme.colors.success.main,
      critical: theme.colors.success.main
    }),
    colors: __spreadProps$z(__spreadValues$E(__spreadValues$E(__spreadValues$E(__spreadValues$E({}, backgrounds), borders), form), textColors), {
      bodyBg: theme.colors.background.canvas,
      panelBg: theme.components.panel.background,
      panelBorder: theme.components.panel.borderColor,
      pageHeaderBg: theme.colors.background.canvas,
      pageHeaderBorder: theme.colors.background.canvas,
      dropdownBg: form.formInputBg,
      dropdownShadow: basicColors.black,
      dropdownOptionHoverBg: backgrounds.bg2,
      link: theme.colors.text.primary,
      linkDisabled: theme.colors.text.disabled,
      linkHover: theme.colors.text.maxContrast,
      linkExternal: theme.colors.text.link
    }),
    shadows: {
      listItem: "none"
    },
    visualization: theme.visualization
  });
}
const commonColorsPalette = {
  // New greys palette used by next-gen form elements
  gray98: "#f7f8fa",
  gray97: "#f1f5f9",
  gray95: "#e9edf2",
  gray90: "#dce1e6",
  gray85: "#c7d0d9",
  gray70: "#9fa7b3",
  gray60: "#7b8087",
  gray33: "#464c54",
  gray25: "#2c3235",
  gray15: "#202226",
  gray10: "#141619",
  gray05: "#0b0c0e",
  // New blues palette used by next-gen form elements
  blue95: "#5794f2",
  // blue95
  blue85: "#33a2e5",
  // blueText
  blue80: "#3274d9",
  // blue80
  blue77: "#1f60c4",
  // blue77
  // New reds palette used by next-gen form elements
  red88: "#e02f44"
};

function createVisualizationColors(colors) {
  const hues = colors.mode === "light" ? getLightHues() : getDarkHues();
  const byNameIndex = {};
  for (const hue of hues) {
    for (const shade of hue.shades) {
      byNameIndex[shade.name] = shade.color;
      if (shade.aliases) {
        for (const alias of shade.aliases) {
          byNameIndex[alias] = shade.color;
        }
      }
    }
  }
  byNameIndex["transparent"] = colors.mode === "light" ? "rgba(255, 255, 255, 0)" : "rgba(0,0,0,0)";
  byNameIndex["panel-bg"] = colors.background.primary;
  byNameIndex["text"] = colors.text.primary;
  const getColorByName = (colorName) => {
    if (!colorName) {
      return FALLBACK_COLOR;
    }
    const realColor = byNameIndex[colorName];
    if (realColor) {
      return realColor;
    }
    if (colorName[0] === "#") {
      return colorName;
    }
    if (colorName.indexOf("rgb") > -1) {
      return colorName;
    }
    const nativeColor = nativeColorNames[colorName.toLowerCase()];
    if (nativeColor) {
      byNameIndex[colorName] = nativeColor;
      return nativeColor;
    }
    return colorName;
  };
  const palette = getClassicPalette();
  return {
    hues,
    palette,
    getColorByName
  };
}
function getDarkHues() {
  return [
    {
      name: "red",
      shades: [
        { color: "#FFA6B0", name: "super-light-red" },
        { color: "#FF7383", name: "light-red" },
        { color: "#F2495C", name: "red", primary: true },
        { color: "#E02F44", name: "semi-dark-red" },
        { color: "#C4162A", name: "dark-red" }
      ]
    },
    {
      name: "orange",
      shades: [
        { color: "#FFCB7D", name: "super-light-orange", aliases: [] },
        { color: "#FFB357", name: "light-orange", aliases: [] },
        { color: "#FF9830", name: "orange", aliases: [], primary: true },
        { color: "#FF780A", name: "semi-dark-orange", aliases: [] },
        { color: "#FA6400", name: "dark-orange", aliases: [] }
      ]
    },
    {
      name: "yellow",
      shades: [
        { color: "#FFF899", name: "super-light-yellow", aliases: [] },
        { color: "#FFEE52", name: "light-yellow", aliases: [] },
        { color: "#FADE2A", name: "yellow", aliases: [], primary: true },
        { color: "#F2CC0C", name: "semi-dark-yellow", aliases: [] },
        { color: "#E0B400", name: "dark-yellow", aliases: [] }
      ]
    },
    {
      name: "green",
      shades: [
        { color: "#C8F2C2", name: "super-light-green", aliases: [] },
        { color: "#96D98D", name: "light-green", aliases: [] },
        { color: "#73BF69", name: "green", aliases: [], primary: true },
        { color: "#56A64B", name: "semi-dark-green", aliases: [] },
        { color: "#37872D", name: "dark-green", aliases: [] }
      ]
    },
    {
      name: "blue",
      shades: [
        { color: "#C0D8FF", name: "super-light-blue", aliases: [] },
        { color: "#8AB8FF", name: "light-blue", aliases: [] },
        { color: "#5794F2", name: "blue", aliases: [], primary: true },
        { color: "#3274D9", name: "semi-dark-blue", aliases: [] },
        { color: "#1F60C4", name: "dark-blue", aliases: [] }
      ]
    },
    {
      name: "purple",
      shades: [
        { color: "#DEB6F2", name: "super-light-purple", aliases: [] },
        { color: "#CA95E5", name: "light-purple", aliases: [] },
        { color: "#B877D9", name: "purple", aliases: [], primary: true },
        { color: "#A352CC", name: "semi-dark-purple", aliases: [] },
        { color: "#8F3BB8", name: "dark-purple", aliases: [] }
      ]
    }
  ];
}
function getLightHues() {
  return [
    {
      name: "red",
      shades: [
        { color: "#FF7383", name: "super-light-red" },
        { color: "#F2495C", name: "light-red" },
        { color: "#E02F44", name: "red", primary: true },
        { color: "#C4162A", name: "semi-dark-red" },
        { color: "#AD0317", name: "dark-red" }
      ]
    },
    {
      name: "orange",
      shades: [
        { color: "#FFB357", name: "super-light-orange", aliases: [] },
        { color: "#FF9830", name: "light-orange", aliases: [] },
        { color: "#FF780A", name: "orange", aliases: [], primary: true },
        { color: "#FA6400", name: "semi-dark-orange", aliases: [] },
        { color: "#E55400", name: "dark-orange", aliases: [] }
      ]
    },
    {
      name: "yellow",
      shades: [
        { color: "#FFEE52", name: "super-light-yellow", aliases: [] },
        { color: "#FADE2A", name: "light-yellow", aliases: [] },
        { color: "#F2CC0C", name: "yellow", aliases: [], primary: true },
        { color: "#E0B400", name: "semi-dark-yellow", aliases: [] },
        { color: "#CC9D00", name: "dark-yellow", aliases: [] }
      ]
    },
    {
      name: "green",
      shades: [
        { color: "#96D98D", name: "super-light-green", aliases: [] },
        { color: "#73BF69", name: "light-green", aliases: [] },
        { color: "#56A64B", name: "green", aliases: [], primary: true },
        { color: "#37872D", name: "semi-dark-green", aliases: [] },
        { color: "#19730E", name: "dark-green", aliases: [] }
      ]
    },
    {
      name: "blue",
      shades: [
        { color: "#8AB8FF", name: "super-light-blue", aliases: [] },
        { color: "#5794F2", name: "light-blue", aliases: [] },
        { color: "#3274D9", name: "blue", aliases: [], primary: true },
        { color: "#1F60C4", name: "semi-dark-blue", aliases: [] },
        { color: "#1250B0", name: "dark-blue", aliases: [] }
      ]
    },
    {
      name: "purple",
      shades: [
        { color: "#CA95E5", name: "super-light-purple", aliases: [] },
        { color: "#B877D9", name: "light-purple", aliases: [] },
        { color: "#A352CC", name: "purple", aliases: [], primary: true },
        { color: "#8F3BB8", name: "semi-dark-purple", aliases: [] },
        { color: "#7C2EA3", name: "dark-purple", aliases: [] }
      ]
    }
  ];
}
function getClassicPalette() {
  return [
    "green",
    // '#7EB26D', // 0: pale green
    "semi-dark-yellow",
    // '#EAB839', // 1: mustard
    "light-blue",
    // #6ED0E0', // 2: light blue
    "semi-dark-orange",
    // '#EF843C', // 3: orange
    "red",
    // '#E24D42', // 4: red
    "blue",
    // #1F78C1', // 5: ocean
    "purple",
    // '#BA43A9', // 6: purple
    "#705DA0",
    // 7: violet
    "dark-green",
    // '#508642', // 8: dark green
    "yellow",
    //'#CCA300', // 9: dark sand
    "#447EBC",
    "#C15C17",
    "#890F02",
    "#0A437C",
    "#6D1F62",
    "#584477",
    "#B7DBAB",
    "#F4D598",
    "#70DBED",
    "#F9BA8F",
    "#F29191",
    "#82B5D8",
    "#E5A8E2",
    "#AEA2E0",
    "#629E51",
    "#E5AC0E",
    "#64B0C8",
    "#E0752D",
    "#BF1B00",
    "#0A50A1",
    "#962D82",
    "#614D93",
    "#9AC48A",
    "#F2C96D",
    "#65C5DB",
    "#F9934E",
    "#EA6460",
    "#5195CE",
    "#D683CE",
    "#806EB7",
    "#3F6833",
    "#967302",
    "#2F575E",
    "#99440A",
    "#58140C",
    "#052B51",
    "#511749",
    "#3F2B5B",
    "#E0F9D7",
    "#FCEACA",
    "#CFFAFF",
    "#F9E2D2",
    "#FCE2DE",
    "#BADFF4",
    "#F9D9F9",
    "#DEDAF7"
  ];
}
const nativeColorNames = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

const zIndex = {
  activePanel: 999,
  navbarFixed: 1e3,
  sidemenu: 1020,
  dropdown: 1030,
  typeahead: 1030,
  tooltip: 1040,
  modalBackdrop: 1050,
  modal: 1060,
  portal: 1061
};

var __defProp$J = Object.defineProperty;
var __defProps$y = Object.defineProperties;
var __getOwnPropDescs$y = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$E = Object.getOwnPropertySymbols;
var __hasOwnProp$E = Object.prototype.hasOwnProperty;
var __propIsEnum$E = Object.prototype.propertyIsEnumerable;
var __defNormalProp$J = (obj, key, value) => key in obj ? __defProp$J(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$D = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$E.call(b, prop))
      __defNormalProp$J(a, prop, b[prop]);
  if (__getOwnPropSymbols$E)
    for (var prop of __getOwnPropSymbols$E(b)) {
      if (__propIsEnum$E.call(b, prop))
        __defNormalProp$J(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$y = (a, b) => __defProps$y(a, __getOwnPropDescs$y(b));
function createTheme(options = {}) {
  const {
    colors: colorsInput = {},
    spacing: spacingInput = {},
    shape: shapeInput = {},
    typography: typographyInput = {}
  } = options;
  const colors = createColors(colorsInput);
  const breakpoints = createBreakpoints();
  const spacing = createSpacing(spacingInput);
  const shape = createShape(shapeInput);
  const typography = createTypography(colors, typographyInput);
  const shadows = createShadows(colors);
  const transitions = createTransitions();
  const components = createComponents(colors);
  const visualization = createVisualizationColors(colors);
  const theme = {
    name: colors.mode === "dark" ? "Dark" : "Light",
    isDark: colors.mode === "dark",
    isLight: colors.mode === "light",
    colors,
    breakpoints,
    spacing,
    shape,
    components,
    typography,
    shadows,
    transitions,
    visualization,
    zIndex: __spreadValues$D({}, zIndex),
    flags: {}
  };
  return __spreadProps$y(__spreadValues$D({}, theme), {
    v1: createV1Theme(theme)
  });
}

function getThemeById(id) {
  var _a;
  const theme = (_a = themeRegistry.getIfExists(id)) != null ? _a : themeRegistry.get("dark");
  return theme.build();
}
function getBuiltInThemes(includeExtras) {
  return themeRegistry.list().filter((item) => {
    return includeExtras ? true : !item.isExtra;
  });
}
const themeRegistry = new Registry(() => {
  return [
    { id: "system", name: "System preference", build: getSystemPreferenceTheme },
    { id: "dark", name: "Dark", build: () => createTheme({ colors: { mode: "dark" } }) },
    { id: "light", name: "Light", build: () => createTheme({ colors: { mode: "light" } }) },
    { id: "blue-night", name: "Blue night", build: createBlueNight, isExtra: true },
    { id: "midnight", name: "Midnight", build: createMidnight, isExtra: true }
  ];
});
function getSystemPreferenceTheme() {
  const mediaResult = window.matchMedia("(prefers-color-scheme: dark)");
  const id = mediaResult.matches ? "dark" : "light";
  return getThemeById(id);
}
function createMidnight() {
  const whiteBase = "204, 204, 220";
  return createTheme({
    name: "Midnight",
    colors: {
      mode: "dark",
      background: {
        canvas: "#000000",
        primary: "#000000",
        secondary: "#181818"
      },
      border: {
        weak: `rgba(${whiteBase}, 0.17)`,
        medium: `rgba(${whiteBase}, 0.25)`,
        strong: `rgba(${whiteBase}, 0.35)`
      }
    }
  });
}
function createBlueNight() {
  return createTheme({
    name: "Blue night",
    colors: {
      mode: "dark",
      background: {
        canvas: "#15161d",
        primary: "#15161d",
        secondary: "#1d1f2e"
      },
      border: {
        weak: `#2e304f`,
        medium: `#2e304f`,
        strong: `#2e304f`
      }
    }
  });
}

const ThemeContext = React__default["default"].createContext(createTheme());
ThemeContext.displayName = "ThemeContext";

const fallBackThreshold = { value: 0, color: FALLBACK_COLOR };
function getActiveThreshold(value, thresholds) {
  if (!thresholds || thresholds.length === 0) {
    return fallBackThreshold;
  }
  let active = thresholds[0];
  for (const threshold of thresholds) {
    if (value >= threshold.value) {
      active = threshold;
    } else {
      break;
    }
  }
  return active;
}
function getActiveThresholdForValue(field, value, percent) {
  const { thresholds } = field.config;
  if ((thresholds == null ? void 0 : thresholds.mode) === ThresholdsMode.Percentage) {
    return getActiveThreshold(percent * 100, thresholds == null ? void 0 : thresholds.steps);
  }
  return getActiveThreshold(value, thresholds == null ? void 0 : thresholds.steps);
}
function sortThresholds(thresholds) {
  return thresholds.sort((t1, t2) => t1.value - t2.value);
}

var __defProp$I = Object.defineProperty;
var __defNormalProp$I = (obj, key, value) => key in obj ? __defProp$I(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$b = (obj, key, value) => {
  __defNormalProp$I(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const fieldColorModeRegistry = new Registry(() => {
  return [
    {
      id: FieldColorModeId.Fixed,
      name: "Single color",
      description: "Set a specific color",
      getCalculator: getFixedColor
    },
    {
      id: FieldColorModeId.Shades,
      name: "Shades of a color",
      description: "Select shades of a specific color",
      getCalculator: getShadedColor
    },
    {
      id: FieldColorModeId.Thresholds,
      name: "From thresholds",
      isByValue: true,
      description: "Derive colors from thresholds",
      getCalculator: (_field, theme) => {
        return (_value, _percent, threshold) => {
          const thresholdSafe = threshold != null ? threshold : fallBackThreshold;
          return theme.visualization.getColorByName(thresholdSafe.color);
        };
      }
    },
    new FieldColorSchemeMode({
      id: FieldColorModeId.PaletteClassic,
      name: "Classic palette",
      isContinuous: false,
      isByValue: false,
      getColors: (theme) => {
        return theme.visualization.palette;
      }
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.PaletteClassicByName,
      name: "Classic palette (by series name)",
      isContinuous: false,
      isByValue: false,
      useSeriesName: true,
      getColors: (theme) => {
        return theme.visualization.palette.filter(
          (color) => getContrastRatio(
            theme.visualization.getColorByName(color),
            theme.colors.background.primary
          ) >= theme.colors.contrastThreshold
        );
      }
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousGrYlRd,
      name: "Green-Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["green", "yellow", "red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousRdYlGr,
      name: "Red-Yellow-Green",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["red", "yellow", "green"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlYlRd,
      name: "Blue-Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["dark-blue", "super-light-yellow", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousYlRd,
      name: "Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["super-light-yellow", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlPu,
      name: "Blue-Purple",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["blue", "purple"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousYlBl,
      name: "Yellow-Blue",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["super-light-yellow", "dark-blue"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlues,
      name: "Blues",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-blue"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousReds,
      name: "Reds",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousGreens,
      name: "Greens",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-green"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousPurples,
      name: "Purples",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-purple"]
    })
  ];
});
class FieldColorSchemeMode {
  constructor(options) {
    __publicField$b(this, "id");
    __publicField$b(this, "name");
    __publicField$b(this, "description");
    __publicField$b(this, "isContinuous");
    __publicField$b(this, "isByValue");
    __publicField$b(this, "useSeriesName");
    __publicField$b(this, "colorCache");
    __publicField$b(this, "colorCacheTheme");
    __publicField$b(this, "interpolator");
    __publicField$b(this, "getNamedColors");
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.getNamedColors = options.getColors;
    this.isContinuous = options.isContinuous;
    this.isByValue = options.isByValue;
    this.useSeriesName = options.useSeriesName;
  }
  getColors(theme) {
    if (!this.getNamedColors) {
      return [];
    }
    if (this.colorCache && this.colorCacheTheme === theme) {
      return this.colorCache;
    }
    this.colorCache = this.getNamedColors(theme).map(theme.visualization.getColorByName);
    this.colorCacheTheme = theme;
    return this.colorCache;
  }
  getInterpolator() {
    if (!this.interpolator) {
      this.interpolator = d3Interpolate.interpolateRgbBasis(this.colorCache);
    }
    return this.interpolator;
  }
  getCalculator(field, theme) {
    const colors = this.getColors(theme);
    if (this.isByValue) {
      if (this.isContinuous) {
        return (_, percent, _threshold) => {
          return this.getInterpolator()(percent);
        };
      } else {
        return (_, percent, _threshold) => {
          return colors[percent * (colors.length - 1)];
        };
      }
    } else if (this.useSeriesName) {
      return (_, _percent, _threshold) => {
        return colors[Math.abs(stringHash__default["default"](field.name)) % colors.length];
      };
    } else {
      return (_, _percent, _threshold) => {
        var _a, _b;
        const seriesIndex = (_b = (_a = field.state) == null ? void 0 : _a.seriesIndex) != null ? _b : 0;
        return colors[seriesIndex % colors.length];
      };
    }
  }
}
function getFieldColorModeForField(field) {
  var _a, _b;
  return fieldColorModeRegistry.get((_b = (_a = field.config.color) == null ? void 0 : _a.mode) != null ? _b : FieldColorModeId.Thresholds);
}
function getFieldColorMode(mode) {
  return fieldColorModeRegistry.get(mode != null ? mode : FieldColorModeId.Thresholds);
}
function getFieldSeriesColor(field, theme) {
  var _a, _b, _c;
  const mode = getFieldColorModeForField(field);
  if (!mode.isByValue) {
    return {
      color: mode.getCalculator(field, theme)(0, 0),
      threshold: fallBackThreshold,
      percent: 1
    };
  }
  const scale = getScaleCalculator(field, theme);
  const stat = (_b = (_a = field.config.color) == null ? void 0 : _a.seriesBy) != null ? _b : "last";
  const calcs = reduceField({ field, reducers: [stat] });
  const value = (_c = calcs[stat]) != null ? _c : 0;
  return scale(value);
}
function getFixedColor(field, theme) {
  return () => {
    var _a, _b;
    return theme.visualization.getColorByName((_b = (_a = field.config.color) == null ? void 0 : _a.fixedColor) != null ? _b : FALLBACK_COLOR);
  };
}
function getShadedColor(field, theme) {
  return () => {
    var _a, _b, _c, _d;
    const baseColorString = theme.visualization.getColorByName(
      (_b = (_a = field.config.color) == null ? void 0 : _a.fixedColor) != null ? _b : FALLBACK_COLOR
    );
    const colors = [
      baseColorString
      // start with base color
    ];
    const shadesCount = 6;
    const maxHueSpin = 10;
    const maxDarken = 35;
    const maxBrighten = 35;
    for (let i = 1; i < shadesCount; i++) {
      colors.push(
        tinycolor__default["default"](baseColorString).spin(i / shadesCount * maxHueSpin).brighten(i / shadesCount * maxDarken).toHexString()
      );
      colors.push(
        tinycolor__default["default"](baseColorString).spin(-(i / shadesCount) * maxHueSpin).darken(i / shadesCount * maxBrighten).toHexString()
      );
    }
    const seriesIndex = (_d = (_c = field.state) == null ? void 0 : _c.seriesIndex) != null ? _d : 0;
    return colors[seriesIndex % colors.length];
  };
}

var __defProp$H = Object.defineProperty;
var __getOwnPropSymbols$D = Object.getOwnPropertySymbols;
var __hasOwnProp$D = Object.prototype.hasOwnProperty;
var __propIsEnum$D = Object.prototype.propertyIsEnumerable;
var __defNormalProp$H = (obj, key, value) => key in obj ? __defProp$H(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$C = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$D.call(b, prop))
      __defNormalProp$H(a, prop, b[prop]);
  if (__getOwnPropSymbols$D)
    for (var prop of __getOwnPropSymbols$D(b)) {
      if (__propIsEnum$D.call(b, prop))
        __defNormalProp$H(a, prop, b[prop]);
    }
  return a;
};
function getScaleCalculator(field, theme) {
  var _a, _b;
  if (field.type === FieldType.boolean) {
    return getBooleanScaleCalculator(field, theme);
  }
  const mode = getFieldColorModeForField(field);
  const getColor = mode.getCalculator(field, theme);
  const info = (_b = (_a = field.state) == null ? void 0 : _a.range) != null ? _b : getMinMaxAndDelta(field);
  return (value) => {
    let percent = 0;
    if (value !== -Infinity) {
      percent = (value - info.min) / info.delta;
      if (Number.isNaN(percent)) {
        percent = 0;
      }
    }
    const threshold = getActiveThresholdForValue(field, value, percent);
    return {
      percent,
      threshold,
      color: getColor(value, percent, threshold)
    };
  };
}
function getBooleanScaleCalculator(field, theme) {
  const trueValue = {
    color: theme.visualization.getColorByName("green"),
    percent: 1,
    threshold: void 0
  };
  const falseValue = {
    color: theme.visualization.getColorByName("red"),
    percent: 0,
    threshold: void 0
  };
  const mode = getFieldColorModeForField(field);
  if (mode.isContinuous && mode.getColors) {
    const colors = mode.getColors(theme);
    trueValue.color = colors[colors.length - 1];
    falseValue.color = colors[0];
  }
  return (value) => {
    return Boolean(value) ? trueValue : falseValue;
  };
}
function getMinMaxAndDelta(field) {
  if (field.type !== FieldType.number) {
    return { min: 0, max: 100, delta: 100 };
  }
  let min = field.config.min;
  let max = field.config.max;
  if (!lodash.isNumber(min) || !lodash.isNumber(max)) {
    if (field.values && field.values.length) {
      const stats = reduceField({ field, reducers: [ReducerID.min, ReducerID.max] });
      if (!lodash.isNumber(min)) {
        min = stats[ReducerID.min];
      }
      if (!lodash.isNumber(max)) {
        max = stats[ReducerID.max];
      }
    } else {
      min = 0;
      max = 100;
    }
  }
  return {
    min,
    max,
    delta: max - min
  };
}
function getFieldConfigWithMinMax(field, local) {
  var _a;
  const { config } = field;
  let { min, max } = config;
  if (lodash.isNumber(min) && lodash.isNumber(max)) {
    return config;
  }
  if (local || !((_a = field.state) == null ? void 0 : _a.range)) {
    return __spreadValues$C(__spreadValues$C({}, config), getMinMaxAndDelta(field));
  }
  return __spreadValues$C(__spreadValues$C({}, config), field.state.range);
}

const timeFormats = {
  dateTimeAsIso: true,
  dateTimeAsIsoNoDateIfToday: true,
  dateTimeAsUS: true,
  dateTimeAsUSNoDateIfToday: true,
  dateTimeAsLocal: true,
  dateTimeAsLocalNoDateIfToday: true,
  dateTimeFromNow: true
};
function getDisplayProcessor(options) {
  var _a;
  if (!options || lodash.isEmpty(options) || !options.field) {
    return toStringProcessor;
  }
  const field = options.field;
  const config = (_a = field.config) != null ? _a : {};
  const { palette } = options.theme.visualization;
  let unit = config.unit;
  let hasDateUnit = unit && (timeFormats[unit] || unit.startsWith("time:"));
  let showMs = false;
  if (field.type === FieldType.time && !hasDateUnit) {
    unit = `dateTimeAsSystem`;
    hasDateUnit = true;
    if (field.values && field.values.length > 1) {
      let start = field.values[0];
      let end = field.values[field.values.length - 1];
      if (typeof start === "string") {
        start = dateTimeParse(start).unix();
        end = dateTimeParse(end).unix();
      } else {
        start /= 1e3;
        end /= 1e3;
      }
      showMs = Math.abs(end - start) < 60;
    }
  } else if (field.type === FieldType.boolean) {
    if (!isBooleanUnit(unit)) {
      unit = "bool";
    }
  } else if (!unit && field.type === FieldType.string) {
    unit = "string";
  }
  const hasCurrencyUnit = unit == null ? void 0 : unit.startsWith("currency");
  const hasBoolUnit = isBooleanUnit(unit);
  const isNumType = field.type === FieldType.number;
  const isLocaleFormat = unit === "locale";
  const canTrimTrailingDecimalZeros = !hasDateUnit && !hasCurrencyUnit && !hasBoolUnit && !isLocaleFormat && isNumType && config.decimals == null;
  const formatFunc = getValueFormat(unit || "none");
  const scaleFunc = getScaleCalculator(field, options.theme);
  return (value, adjacentDecimals) => {
    const { mappings } = config;
    const isStringUnit = unit === "string";
    if (hasDateUnit && typeof value === "string") {
      value = toUtc(value).valueOf();
    }
    let numeric = isStringUnit ? NaN : anyToNumber(value);
    let text;
    let prefix;
    let suffix;
    let color;
    let icon;
    let percent;
    if (mappings && mappings.length > 0) {
      const mappingResult = getValueMappingResult(mappings, value);
      if (mappingResult) {
        if (mappingResult.text != null) {
          text = mappingResult.text;
        }
        if (mappingResult.color != null) {
          color = options.theme.visualization.getColorByName(mappingResult.color);
        }
        if (mappingResult.icon != null) {
          icon = mappingResult.icon;
        }
      }
    } else if (field.type === FieldType.enum) {
      if (value == null) {
        return {
          text: "",
          numeric: NaN
        };
      }
      const enumIndex = +value;
      if (config && config.type && config.type.enum) {
        const { text: enumText, color: enumColor } = config.type.enum;
        text = enumText ? enumText[enumIndex] : `${value}`;
        color = enumColor ? enumColor[enumIndex] : void 0;
        if (color == null) {
          const namedColor = palette[enumIndex % palette.length];
          color = options.theme.visualization.getColorByName(namedColor);
        }
      }
    }
    if (!Number.isNaN(numeric)) {
      if (text == null && !lodash.isBoolean(value)) {
        let v;
        if (canTrimTrailingDecimalZeros && adjacentDecimals != null) {
          v = formatFunc(numeric, adjacentDecimals, null, options.timeZone, showMs);
          v.text = +v.text + "";
        } else {
          v = formatFunc(numeric, config.decimals, null, options.timeZone, showMs);
        }
        text = v.text;
        suffix = v.suffix;
        prefix = v.prefix;
      }
      if (color == null) {
        const scaleResult = scaleFunc(numeric);
        color = scaleResult.color;
        percent = scaleResult.percent;
      }
    }
    if (text == null && lodash.isArray(value)) {
      text = lodash.join(value, ", ");
    }
    if (text == null) {
      text = lodash.toString(value);
      if (!text) {
        if (config.noValue) {
          text = config.noValue;
        } else {
          text = "";
        }
      }
    }
    if (!color) {
      const scaleResult = scaleFunc(-Infinity);
      color = scaleResult.color;
      percent = scaleResult.percent;
    }
    const display = {
      text,
      numeric,
      prefix,
      suffix,
      color
    };
    if (icon != null) {
      display.icon = icon;
    }
    if (percent != null) {
      display.percent = percent;
    }
    return display;
  };
}
function toStringProcessor(value) {
  return { text: lodash.toString(value), numeric: anyToNumber(value) };
}
function getRawDisplayProcessor() {
  return (value) => ({
    text: getFieldTypeFromValue(value) === "other" ? `${JSON.stringify(value, getCircularReplacer())}` : `${value}`,
    numeric: null
  });
}
const getCircularReplacer = () => {
  const seen = /* @__PURE__ */ new WeakSet();
  return (_key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

var __defProp$G = Object.defineProperty;
var __defProps$x = Object.defineProperties;
var __getOwnPropDescs$x = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$C = Object.getOwnPropertySymbols;
var __hasOwnProp$C = Object.prototype.hasOwnProperty;
var __propIsEnum$C = Object.prototype.propertyIsEnumerable;
var __defNormalProp$G = (obj, key, value) => key in obj ? __defProp$G(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$B = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$C.call(b, prop))
      __defNormalProp$G(a, prop, b[prop]);
  if (__getOwnPropSymbols$C)
    for (var prop of __getOwnPropSymbols$C(b)) {
      if (__propIsEnum$C.call(b, prop))
        __defNormalProp$G(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$x = (a, b) => __defProps$x(a, __getOwnPropDescs$x(b));
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
        config = __spreadValues$B(__spreadValues$B({}, config), (_c = field.state) == null ? void 0 : _c.range);
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
            display: __spreadProps$x(__spreadValues$B({}, displayValue), {
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
  return __spreadProps$x(__spreadValues$B({}, field.state), {
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
    field: __spreadProps$x(__spreadValues$B({}, defaults), {
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
  if (!display || lodash.isEmpty(display.text)) {
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
    return __spreadProps$x(__spreadValues$B({}, (_c = field.state) == null ? void 0 : _c.scopedVars), {
      __dataContext: {
        value: __spreadProps$x(__spreadValues$B({}, (_e = (_d = field.state) == null ? void 0 : _d.scopedVars) == null ? void 0 : _e.__dataContext.value), {
          rowIndex
        })
      }
    });
  }
  return (_f = field.state) == null ? void 0 : _f.scopedVars;
}

class FieldConfigOptionsRegistry extends Registry {
}

const standardFieldConfigEditorRegistry = new FieldConfigOptionsRegistry();
const standardEditorsRegistry = new Registry();

const identityOverrideProcessor = (value) => {
  return value;
};
const numberOverrideProcessor = (value, context, settings) => {
  if (value === void 0 || value === null) {
    return void 0;
  }
  return parseFloat(value);
};
const displayNameOverrideProcessor = (value, context, settings) => {
  var _a, _b;
  (_b = (_a = context.field) == null ? void 0 : _a.state) == null ? true : delete _b.displayName;
  return stringOverrideProcessor(value, context, settings);
};
const dataLinksOverrideProcessor = (value, _context, _settings) => {
  return value;
};
const valueMappingsOverrideProcessor = (value, _context, _settings) => {
  return value;
};
const selectOverrideProcessor = (value, _context, _settings) => {
  return value;
};
const stringOverrideProcessor = (value, context, settings) => {
  if (value === null || value === void 0) {
    return value;
  }
  if (settings && settings.expandTemplateVars && context.replaceVariables && typeof value === "string") {
    return context.replaceVariables(value, context.field.state.scopedVars);
  }
  return `${value}`;
};
const thresholdsOverrideProcessor = (value, _context, _settings) => {
  return value;
};
const unitOverrideProcessor = (value, _context, _settings) => {
  return value;
};
const booleanOverrideProcessor = (value, _context, _settings) => {
  return value;
};
var FieldNamePickerBaseNameMode = /* @__PURE__ */ ((FieldNamePickerBaseNameMode2) => {
  FieldNamePickerBaseNameMode2["IncludeAll"] = "all";
  FieldNamePickerBaseNameMode2["ExcludeBaseNames"] = "exclude";
  FieldNamePickerBaseNameMode2["OnlyBaseNames"] = "only";
  return FieldNamePickerBaseNameMode2;
})(FieldNamePickerBaseNameMode || {});

var __defProp$F = Object.defineProperty;
var __defProps$w = Object.defineProperties;
var __getOwnPropDescs$w = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$B = Object.getOwnPropertySymbols;
var __hasOwnProp$B = Object.prototype.hasOwnProperty;
var __propIsEnum$B = Object.prototype.propertyIsEnumerable;
var __defNormalProp$F = (obj, key, value) => key in obj ? __defProp$F(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$A = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$B.call(b, prop))
      __defNormalProp$F(a, prop, b[prop]);
  if (__getOwnPropSymbols$B)
    for (var prop of __getOwnPropSymbols$B(b)) {
      if (__propIsEnum$B.call(b, prop))
        __defNormalProp$F(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$w = (a, b) => __defProps$w(a, __getOwnPropDescs$w(b));
var __publicField$a = (obj, key, value) => {
  __defNormalProp$F(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FieldCache {
  constructor(data) {
    __publicField$a(this, "fields", []);
    __publicField$a(this, "fieldByName", {});
    __publicField$a(this, "fieldByType", {});
    this.fields = data.fields.map((field, idx) => __spreadProps$w(__spreadValues$A({}, field), {
      index: idx
    }));
    for (let i = 0; i < data.fields.length; i++) {
      const field = data.fields[i];
      if (field.type === FieldType.other) {
        const t = guessFieldTypeForField(field);
        if (t) {
          field.type = t;
        }
      }
      if (!this.fieldByType[field.type]) {
        this.fieldByType[field.type] = [];
      }
      this.fieldByType[field.type].push(__spreadProps$w(__spreadValues$A({}, field), {
        index: i
      }));
      if (this.fieldByName[field.name]) {
        console.warn("Duplicate field names in DataFrame: ", field.name);
      } else {
        this.fieldByName[field.name] = __spreadProps$w(__spreadValues$A({}, field), { index: i });
      }
    }
  }
  getFields(type) {
    if (!type) {
      return [...this.fields];
    }
    const fields = this.fieldByType[type];
    if (fields) {
      return [...fields];
    }
    return [];
  }
  hasFieldOfType(type) {
    const types = this.fieldByType[type];
    return types && types.length > 0;
  }
  getFirstFieldOfType(type, includeHidden = false) {
    const fields = this.fieldByType[type];
    const firstField = fields == null ? void 0 : fields.find((field) => {
      var _a;
      return includeHidden || !((_a = field.config.custom) == null ? void 0 : _a.hidden);
    });
    return firstField;
  }
  hasFieldNamed(name) {
    return !!this.fieldByName[name];
  }
  hasFieldWithNameAndType(name, type) {
    return !!this.fieldByName[name] && this.fieldByType[type].filter((field) => field.name === name).length > 0;
  }
  /**
   * Returns the first field with the given name.
   */
  getFieldByName(name) {
    return this.fieldByName[name];
  }
  /**
   * Returns the fields with the given label.
   */
  getFieldsByLabel(label, value) {
    return Object.values(this.fieldByName).filter((f) => {
      return f.labels && f.labels[label] === value;
    });
  }
}

const createDimension = (name, columns) => {
  return {
    name,
    columns
  };
};
const getColumnsFromDimension = (dimension) => {
  return dimension.columns;
};
const getColumnFromDimension = (dimension, column) => {
  return dimension.columns[column];
};
const getValueFromDimension = (dimension, column, row) => {
  return dimension.columns[column].values[row];
};
const getAllValuesFromDimension = (dimension, column, row) => {
  return dimension.columns.map((c) => c.values[row]);
};
const getDimensionByName = (dimensions, name) => dimensions[name];

var __defProp$E = Object.defineProperty;
var __defNormalProp$E = (obj, key, value) => key in obj ? __defProp$E(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$9 = (obj, key, value) => {
  __defNormalProp$E(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ArrayDataFrame {
  constructor(source, names) {
    __publicField$9(this, "fields", []);
    __publicField$9(this, "length", 0);
    __publicField$9(this, "name");
    __publicField$9(this, "refId");
    __publicField$9(this, "meta");
    return arrayToDataFrame(source, names);
  }
}
function arrayToDataFrame(source, names) {
  const df = {
    fields: [],
    length: source.length
  };
  if (!(source == null ? void 0 : source.length)) {
    return df;
  }
  if (names) {
    if (!isObjectArray(source)) {
      throw new Error("source is not an array of objects");
    }
    for (const name of names) {
      df.fields.push(
        makeFieldFromValues(
          name,
          source.map((v) => v ? v[name] : v)
        )
      );
    }
    return df;
  }
  const firstDefined = source.find((v) => v);
  if (firstDefined === null) {
    return df;
  }
  if (isObjectArray(source)) {
    const first = source.find((v) => v);
    df.fields = Object.keys(first || {}).map((name) => {
      return makeFieldFromValues(
        name,
        source.map((v) => v ? v[name] : v)
      );
    });
  } else {
    df.fields.push(makeFieldFromValues(TIME_SERIES_VALUE_FIELD_NAME, source));
  }
  return df;
}
function makeFieldFromValues(name, values) {
  var _a;
  const f = { name, config: {}, values, type: FieldType.other };
  f.type = (_a = guessFieldTypeForField(f)) != null ? _a : FieldType.other;
  return f;
}
function isObjectArray(arr) {
  const first = arr.find((v) => v);
  return arr.length > 0 && typeof first === "object";
}

var __defProp$D = Object.defineProperty;
var __defProps$v = Object.defineProperties;
var __getOwnPropDescs$v = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$A = Object.getOwnPropertySymbols;
var __hasOwnProp$A = Object.prototype.hasOwnProperty;
var __propIsEnum$A = Object.prototype.propertyIsEnumerable;
var __defNormalProp$D = (obj, key, value) => key in obj ? __defProp$D(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$z = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$A.call(b, prop))
      __defNormalProp$D(a, prop, b[prop]);
  if (__getOwnPropSymbols$A)
    for (var prop of __getOwnPropSymbols$A(b)) {
      if (__propIsEnum$A.call(b, prop))
        __defNormalProp$D(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$v = (a, b) => __defProps$v(a, __getOwnPropDescs$v(b));
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$A.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$A)
    for (var prop of __getOwnPropSymbols$A(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$A.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const ENTITY_MAP = {
  Inf: Infinity,
  NegInf: -Infinity,
  Undef: void 0,
  NaN: NaN
};
function decodeFieldValueEntities(lookup, values) {
  let key;
  for (key in lookup) {
    const repl = ENTITY_MAP[key];
    for (const idx of lookup[key]) {
      if (idx < values.length) {
        values[idx] = repl;
      }
    }
  }
}
function decodeFieldValueEnums(lookup, values) {
  for (let i = 0; i < values.length; i++) {
    values[i] = lookup[Number(values[i])];
  }
}
function guessFieldType(name, values) {
  for (const v of values) {
    if (v != null) {
      return guessFieldTypeFromNameAndValue(name, v);
    }
  }
  return FieldType.other;
}
function dataFrameFromJSON(dto) {
  const { schema, data } = dto;
  if (!schema || !schema.fields) {
    throw new Error("JSON needs a fields definition");
  }
  const length = data ? data.values.reduce((max, vals) => Math.max(max, vals.length), 0) : 0;
  const fields = schema.fields.map((f, index) => {
    var _a, _b, _c, _d;
    let buffer = data ? data.values[index] : [];
    let origLen = buffer.length;
    let type = f.type;
    if (origLen !== length) {
      buffer.length = length;
      buffer.fill(void 0, origLen);
    }
    let entities = (_a = data == null ? void 0 : data.entities) == null ? void 0 : _a[index];
    if (entities) {
      decodeFieldValueEntities(entities, buffer);
    }
    let enums = (_b = data == null ? void 0 : data.enums) == null ? void 0 : _b[index];
    if (enums) {
      decodeFieldValueEnums(enums, buffer);
      type = FieldType.string;
    }
    const nanos = (_c = data == null ? void 0 : data.nanos) == null ? void 0 : _c[index];
    const dataFrameField = __spreadProps$v(__spreadValues$z({}, f), {
      type: type != null ? type : guessFieldType(f.name, buffer),
      config: (_d = f.config) != null ? _d : {},
      values: buffer,
      // the presence of this prop is an optimization signal & lookup for consumers
      entities: entities != null ? entities : {}
    });
    if (nanos != null) {
      dataFrameField.nanos = nanos;
    }
    return dataFrameField;
  });
  return __spreadProps$v(__spreadValues$z({}, schema), {
    fields,
    length
  });
}
function dataFrameToJSON(frame) {
  const data = {
    values: []
  };
  const allNanos = [];
  let hasNanos = false;
  const schema = {
    refId: frame.refId,
    meta: frame.meta,
    name: frame.name,
    fields: frame.fields.map((f) => {
      const _a = f, { values, nanos, state, display } = _a, sfield = __objRest$2(_a, ["values", "nanos", "state", "display"]);
      if ("entities" in sfield) {
        delete sfield.entities;
      }
      data.values.push(values);
      if (nanos != null) {
        allNanos.push(nanos);
        hasNanos = true;
      } else {
        allNanos.push(null);
      }
      return sfield;
    })
  };
  if (hasNanos) {
    data.nanos = allNanos;
  }
  return {
    schema,
    data
  };
}

function compareDataFrameStructures(a, b, skipConfig) {
  var _a, _b;
  if (a === b) {
    return true;
  }
  if (((_a = a == null ? void 0 : a.fields) == null ? void 0 : _a.length) !== ((_b = b == null ? void 0 : b.fields) == null ? void 0 : _b.length)) {
    return false;
  }
  if (a.name !== b.name) {
    return false;
  }
  for (let i = 0; i < a.fields.length; i++) {
    const fA = a.fields[i];
    const fB = b.fields[i];
    if (fA.type !== fB.type || fA.name !== fB.name) {
      return false;
    }
    if (skipConfig) {
      continue;
    }
    if (fA.labels && fB.labels && !shallowCompare(fA.labels, fB.labels)) {
      return false;
    }
    const cfgA = fA.config;
    const cfgB = fB.config;
    if (Object.keys(cfgA).length !== Object.keys(cfgB).length) {
      return false;
    }
    let key;
    for (key in cfgA) {
      if (!(key in cfgB)) {
        return false;
      }
      if (key === "interval") {
        continue;
      }
      if (!lodash.isEqual(cfgA[key], cfgB[key])) {
        return false;
      }
    }
  }
  return true;
}
function compareArrayValues(a, b, cmp) {
  if (a === b) {
    return true;
  }
  if ((a == null ? void 0 : a.length) !== (b == null ? void 0 : b.length)) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!cmp(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
const defaultCmp = (a, b) => a === b;
function shallowCompare(a, b, cmp = defaultCmp) {
  if (a === b) {
    return true;
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  let key;
  for (key in a) {
    if (!cmp(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

const MAX_TIME_COMPARISONS = 100;
function isTimeSeriesFrame(frame) {
  if (frame.fields.length < 2) {
    return false;
  }
  const numberField = frame.fields.find((field) => field.type === FieldType.number);
  let timeFieldFound = false;
  for (const field of frame.fields) {
    if (isTimeSeriesField(field)) {
      timeFieldFound = true;
      break;
    }
  }
  return timeFieldFound && numberField !== void 0;
}
function isTimeSeriesFrames(data) {
  return !data.find((frame) => !isTimeSeriesFrame(frame));
}
function isTimeSeriesField(field) {
  if (field.type !== FieldType.time) {
    return false;
  }
  let greatestTime = null;
  let testWindow = field.values.length > MAX_TIME_COMPARISONS ? MAX_TIME_COMPARISONS : field.values.length;
  for (let i = 0; i < testWindow; i++) {
    const time = field.values[i];
    if (greatestTime === null || time !== null && time > greatestTime) {
      greatestTime = time;
    } else {
      return false;
    }
  }
  return true;
}
function anySeriesWithTimeField(data) {
  for (let i = 0; i < data.length; i++) {
    const timeField = getTimeField(data[i]);
    if (timeField.timeField !== void 0 && timeField.timeIndex !== void 0) {
      return true;
    }
  }
  return false;
}
function hasTimeField(data) {
  return data.fields.some((field) => field.type === FieldType.time);
}
function getRowUniqueId(dataFrame, rowIndex) {
  var _a;
  if (((_a = dataFrame.meta) == null ? void 0 : _a.uniqueRowIdFields) === void 0) {
    return void 0;
  }
  return dataFrame.meta.uniqueRowIdFields.map((fieldIndex) => dataFrame.fields[fieldIndex].values[rowIndex]).join("-");
}
function addRow(dataFrame, row) {
  if (row instanceof Array) {
    for (let i = 0; i < row.length; i++) {
      dataFrame.fields[i].values.push(row[i]);
    }
  } else {
    for (const field of dataFrame.fields) {
      field.values.push(row[field.name]);
    }
  }
  try {
    dataFrame.length++;
  } catch (e) {
  }
}

var JoinMode = /* @__PURE__ */ ((JoinMode2) => {
  JoinMode2["outer"] = "outer";
  JoinMode2["inner"] = "inner";
  JoinMode2["outerTabular"] = "outerTabular";
  return JoinMode2;
})(JoinMode || {});
const joinByFieldTransformer = {
  id: DataTransformerID.joinByField,
  aliasIds: [DataTransformerID.seriesToColumns],
  name: "Join by field",
  description: "Combine rows from two or more tables, based on a related field between them.  This can be used to outer join multiple time series on the _time_ field to show many time series in one table.",
  defaultOptions: {
    byField: void 0,
    // DEFAULT_KEY_FIELD,
    mode: "outer" /* outer */
  },
  operator: (options, ctx) => (source) => source.pipe(operators.map((data) => joinByFieldTransformer.transformer(options, ctx)(data))),
  transformer: (options, ctx) => {
    let joinBy = void 0;
    return (data) => {
      if (data.length > 1) {
        if (options.byField && !joinBy) {
          joinBy = fieldMatchers.get(FieldMatcherID.byName).get(ctx.interpolate(options.byField));
        }
        const joined = joinDataFrames({ frames: data, joinBy, mode: options.mode });
        if (joined) {
          return [joined];
        }
      }
      return data;
    };
  }
};

var __defProp$C = Object.defineProperty;
var __defProps$u = Object.defineProperties;
var __getOwnPropDescs$u = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$z = Object.getOwnPropertySymbols;
var __hasOwnProp$z = Object.prototype.hasOwnProperty;
var __propIsEnum$z = Object.prototype.propertyIsEnumerable;
var __defNormalProp$C = (obj, key, value) => key in obj ? __defProp$C(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$y = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$z.call(b, prop))
      __defNormalProp$C(a, prop, b[prop]);
  if (__getOwnPropSymbols$z)
    for (var prop of __getOwnPropSymbols$z(b)) {
      if (__propIsEnum$z.call(b, prop))
        __defNormalProp$C(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$u = (a, b) => __defProps$u(a, __getOwnPropDescs$u(b));
function pickBestJoinField(data) {
  const { timeField } = getTimeField(data[0]);
  if (timeField) {
    return fieldMatchers.get(FieldMatcherID.firstTimeField).get({});
  }
  let common = [];
  for (const f of data[0].fields) {
    if (f.type === FieldType.number) {
      common.push(f.name);
    }
  }
  for (let i = 1; i < data.length; i++) {
    const names = [];
    for (const f of data[0].fields) {
      if (f.type === FieldType.number) {
        names.push(f.name);
      }
    }
    common = common.filter((v) => !names.includes(v));
  }
  return fieldMatchers.get(FieldMatcherID.byName).get(common[0]);
}
function getJoinMatcher(options) {
  var _a;
  return (_a = options.joinBy) != null ? _a : pickBestJoinField(options.frames);
}
function maybeSortFrame(frame, fieldIdx) {
  if (fieldIdx >= 0) {
    let sortByField = frame.fields[fieldIdx];
    if (sortByField.type !== FieldType.string && !isLikelyAscendingVector(sortByField.values)) {
      frame = sortDataFrame(frame, fieldIdx);
    }
  }
  return frame;
}
function joinDataFrames(options) {
  var _a, _b, _c, _d, _e;
  if (!((_a = options.frames) == null ? void 0 : _a.length)) {
    return;
  }
  const nullMode = (_b = options.nullMode) != null ? _b : (field) => {
    var _a2;
    let spanNulls = (_a2 = field.config.custom) == null ? void 0 : _a2.spanNulls;
    return spanNulls === true ? NULL_REMOVE : spanNulls === -1 ? NULL_RETAIN : NULL_EXPAND;
  };
  if (options.frames.length === 1) {
    let frame = options.frames[0];
    let frameCopy = frame;
    const joinFieldMatcher2 = getJoinMatcher(options);
    let joinIndex = frameCopy.fields.findIndex((f) => joinFieldMatcher2(f, frameCopy, options.frames));
    if (options.keepOriginIndices) {
      frameCopy = __spreadProps$u(__spreadValues$y({}, frame), {
        fields: frame.fields.map((f, fieldIndex) => {
          const copy = __spreadValues$y({}, f);
          const origin = {
            frameIndex: 0,
            fieldIndex
          };
          if (copy.state) {
            copy.state.origin = origin;
          } else {
            copy.state = { origin };
          }
          return copy;
        })
      });
      if (joinIndex > 0) {
        const joinField = frameCopy.fields[joinIndex];
        const fields = frameCopy.fields.filter((f, idx) => idx !== joinIndex);
        fields.unshift(joinField);
        frameCopy.fields = fields;
        joinIndex = 0;
      }
    }
    if (joinIndex >= 0) {
      frameCopy = maybeSortFrame(frameCopy, joinIndex);
    }
    if (options.keep) {
      let fields = frameCopy.fields.filter(
        (f, fieldIdx) => fieldIdx === joinIndex || options.keep(f, frameCopy, options.frames)
      );
      if (frame !== frameCopy) {
        frameCopy.fields = fields;
      } else {
        frameCopy = __spreadProps$u(__spreadValues$y({}, frame), {
          fields
        });
      }
    }
    return frameCopy;
  }
  const nullModes = [];
  const allData = [];
  const originalFields = [];
  const originalFieldsOrderByFrame = [];
  let fieldsOrder = 1;
  const joinFieldMatcher = getJoinMatcher(options);
  for (let frameIndex = 0; frameIndex < options.frames.length; frameIndex++) {
    const frame = options.frames[frameIndex];
    if (!frame || !((_c = frame.fields) == null ? void 0 : _c.length)) {
      continue;
    }
    const nullModesFrame = [NULL_REMOVE];
    let join2 = void 0;
    let fields = [];
    let frameFieldsOrder = [];
    for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
      const field = frame.fields[fieldIndex];
      field.state = field.state || {};
      if (!join2 && joinFieldMatcher(field, frame, options.frames)) {
        join2 = field;
      } else {
        if (options.keep && !options.keep(field, frame, options.frames)) {
          continue;
        }
        nullModesFrame.push(nullMode(field));
        let labels = (_d = field.labels) != null ? _d : {};
        let name = field.name;
        if (frame.name) {
          if (field.name === TIME_SERIES_VALUE_FIELD_NAME) {
            name = frame.name;
          } else if (labels.name == null) {
            labels = __spreadProps$u(__spreadValues$y({}, labels), { name: frame.name });
          }
        }
        fields.push(__spreadProps$u(__spreadValues$y({}, field), {
          name,
          labels
        }));
      }
      if (options.keepOriginIndices) {
        field.state.origin = {
          frameIndex,
          fieldIndex
        };
      }
    }
    if (!join2) {
      continue;
    }
    if (originalFields.length === 0) {
      originalFields.push(join2);
    }
    nullModes.push(nullModesFrame);
    const a = [join2.values];
    for (const field of fields) {
      a.push(field.values);
      originalFields.push(field);
      if (!options.keepDisplayNames) {
        (_e = field.state) == null ? true : delete _e.displayName;
      }
      frameFieldsOrder.push(fieldsOrder);
      fieldsOrder++;
    }
    originalFieldsOrderByFrame.push(frameFieldsOrder);
    allData.push(a);
  }
  let joined = [];
  if (options.mode === JoinMode.outerTabular) {
    joined = joinOuterTabular(allData, originalFieldsOrderByFrame, originalFields.length);
  } else if (options.mode === JoinMode.inner) {
    joined = joinInner(allData);
  } else {
    joined = join(allData, nullModes, options.mode);
  }
  return {
    // ...options.data[0], // keep name, meta?
    length: joined[0] ? joined[0].length : 0,
    fields: originalFields.map((f, index) => __spreadProps$u(__spreadValues$y({}, f), {
      values: joined[index]
    }))
  };
}
function joinOuterTabular(tables, originalFieldsOrderByFrame, numberOfFields, nullModes) {
  let duplicateHash = {};
  for (let tableIdx = 0; tableIdx < tables.length; tableIdx++) {
    let table = tables[tableIdx];
    let joinOnTableField = table[0];
    for (let otherTablesIdx = 0; otherTablesIdx < tables.length; otherTablesIdx++) {
      if (otherTablesIdx === tableIdx) {
        continue;
      }
      let otherTable = tables[otherTablesIdx];
      let otherTableJoinOnField = otherTable[0];
      for (let joinTableFieldValuesIdx = 0; joinTableFieldValuesIdx < joinOnTableField.length; joinTableFieldValuesIdx++) {
        const tableJoinOnValue = joinOnTableField[joinTableFieldValuesIdx];
        const allOtherFields = numberOfFields - 1;
        let joinedRow = [tableJoinOnValue].concat(new Array(allOtherFields));
        let tableFieldValIdx = 0;
        for (let fieldsIdx = 1; fieldsIdx < table.length; fieldsIdx++) {
          const joinRowIdx = originalFieldsOrderByFrame[tableIdx][tableFieldValIdx];
          joinedRow[joinRowIdx] = table[fieldsIdx][joinTableFieldValuesIdx];
          tableFieldValIdx++;
        }
        for (let otherTableValuesIdx = 0; otherTableValuesIdx < otherTableJoinOnField.length; otherTableValuesIdx++) {
          if (joinOnTableField[joinTableFieldValuesIdx] === otherTableJoinOnField[otherTableValuesIdx]) {
            let tableFieldValIdx2 = 0;
            for (let fieldsIdx = 1; fieldsIdx < otherTable.length; fieldsIdx++) {
              const joinRowIdx = originalFieldsOrderByFrame[otherTablesIdx][tableFieldValIdx2];
              joinedRow[joinRowIdx] = otherTable[fieldsIdx][otherTableValuesIdx];
              tableFieldValIdx2++;
            }
            break;
          }
        }
        duplicateHash[JSON.stringify(joinedRow)] = joinedRow;
      }
    }
  }
  let data = [];
  for (let field = 0; field < numberOfFields; field++) {
    data.push(new Array(0));
  }
  for (let key in duplicateHash) {
    const row = duplicateHash[key];
    for (let valIdx = 0; valIdx < row.length; valIdx++) {
      data[valIdx].push(row[valIdx]);
    }
  }
  return data;
}
function joinInner(tables) {
  const joinedTables = [];
  const joinTables = (currentTables, currentIndex, currentRow) => {
    if (currentIndex === currentTables.length) {
      joinedTables.push(currentRow);
      return;
    }
    const currentTable = currentTables[currentIndex];
    const [xValues, ...yValues] = currentTable;
    for (let i = 0; i < xValues.length; i++) {
      const value = xValues[i];
      if (currentIndex === 0 || currentRow.includes(value)) {
        const newRow = [...currentRow];
        if (currentIndex === 0) {
          newRow.push(value);
        }
        for (let j = 0; j < yValues.length; j++) {
          newRow.push(yValues[j][i]);
        }
        joinTables(currentTables, currentIndex + 1, newRow);
      }
    }
  };
  joinTables(tables, 0, []);
  if (joinedTables.length === 0) {
    return [];
  }
  return joinedTables[0].map((_, colIndex) => joinedTables.map((row) => row[colIndex]));
}
const NULL_REMOVE = 0;
const NULL_RETAIN = 1;
const NULL_EXPAND = 2;
function nullExpand(yVals, nullIdxs, alignedLen) {
  for (let i = 0, xi, lastNullIdx = -1; i < nullIdxs.length; i++) {
    let nullIdx = nullIdxs[i];
    if (nullIdx > lastNullIdx) {
      xi = nullIdx - 1;
      while (xi >= 0 && yVals[xi] == null) {
        yVals[xi--] = null;
      }
      xi = nullIdx + 1;
      while (xi < alignedLen && yVals[xi] == null) {
        yVals[lastNullIdx = xi++] = null;
      }
    }
  }
}
function join(tables, nullModes, mode = JoinMode.outer) {
  let xVals = /* @__PURE__ */ new Set();
  for (let ti = 0; ti < tables.length; ti++) {
    let t = tables[ti];
    let xs = t[0];
    let len = xs.length;
    for (let i = 0; i < len; i++) {
      xVals.add(xs[i]);
    }
  }
  let data = [Array.from(xVals).sort((a, b) => a - b)];
  let alignedLen = data[0].length;
  let xIdxs = /* @__PURE__ */ new Map();
  for (let i = 0; i < alignedLen; i++) {
    xIdxs.set(data[0][i], i);
  }
  for (let ti = 0; ti < tables.length; ti++) {
    let t = tables[ti];
    let xs = t[0];
    for (let si = 1; si < t.length; si++) {
      let ys = t[si];
      let yVals = Array(alignedLen).fill(void 0);
      let nullMode = nullModes ? nullModes[ti][si] : NULL_RETAIN;
      let nullIdxs = [];
      for (let i = 0; i < ys.length; i++) {
        let yVal = ys[i];
        let alignedIdx = xIdxs.get(xs[i]);
        if (yVal === null) {
          if (nullMode !== NULL_REMOVE) {
            yVals[alignedIdx] = yVal;
            if (nullMode === NULL_EXPAND) {
              nullIdxs.push(alignedIdx);
            }
          }
        } else {
          yVals[alignedIdx] = yVal;
        }
      }
      nullExpand(yVals, nullIdxs, alignedLen);
      data.push(yVals);
    }
  }
  return data;
}
function isLikelyAscendingVector(data, samples = 50) {
  const len = data.length;
  if (len <= 1) {
    return true;
  }
  let firstIdx = 0;
  let lastIdx = len - 1;
  while (firstIdx <= lastIdx && data[firstIdx] == null) {
    firstIdx++;
  }
  while (lastIdx >= firstIdx && data[lastIdx] == null) {
    lastIdx--;
  }
  if (lastIdx <= firstIdx) {
    return true;
  }
  const stride = Math.max(1, Math.floor((lastIdx - firstIdx + 1) / samples));
  for (let prevVal = data[firstIdx], i = firstIdx + stride; i <= lastIdx; i += stride) {
    const v = data[i];
    if (v != null) {
      if (v <= prevVal) {
        return false;
      }
      prevVal = v;
    }
  }
  return true;
}

function renderLegendFormat(aliasPattern, aliasData) {
  const aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
  return aliasPattern.replace(aliasRegex, (_, g1) => aliasData[g1] ? aliasData[g1] : g1);
}

var __defProp$B = Object.defineProperty;
var __defProps$t = Object.defineProperties;
var __getOwnPropDescs$t = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$y = Object.getOwnPropertySymbols;
var __hasOwnProp$y = Object.prototype.hasOwnProperty;
var __propIsEnum$y = Object.prototype.propertyIsEnumerable;
var __defNormalProp$B = (obj, key, value) => key in obj ? __defProp$B(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$x = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$y.call(b, prop))
      __defNormalProp$B(a, prop, b[prop]);
  if (__getOwnPropSymbols$y)
    for (var prop of __getOwnPropSymbols$y(b)) {
      if (__propIsEnum$y.call(b, prop))
        __defNormalProp$B(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$t = (a, b) => __defProps$t(a, __getOwnPropDescs$t(b));
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$B(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var StreamingFrameAction = /* @__PURE__ */ ((StreamingFrameAction2) => {
  StreamingFrameAction2["Append"] = "append";
  StreamingFrameAction2["Replace"] = "replace";
  return StreamingFrameAction2;
})(StreamingFrameAction || {});
const PROM_STYLE_METRIC_LABEL = "__name__";
const _StreamingDataFrame = class _StreamingDataFrame {
  constructor(options) {
    this.options = options;
    __publicField$8(this, "name");
    __publicField$8(this, "refId");
    __publicField$8(this, "meta", {});
    __publicField$8(this, "fields", []);
    __publicField$8(this, "length", 0);
    __publicField$8(this, "schemaFields", []);
    __publicField$8(this, "timeFieldIndex", -1);
    __publicField$8(this, "pushMode", 0 /* wide */);
    // current labels
    __publicField$8(this, "labels", /* @__PURE__ */ new Set());
    __publicField$8(this, "packetInfo", {
      schemaChanged: true,
      number: 0,
      action: "replace" /* Replace */,
      length: 0
    });
    __publicField$8(this, "serialize", (fieldPredicate, optionsOverride, trimValues) => {
      var _a, _b, _c;
      const options = optionsOverride ? Object.assign({}, __spreadValues$x(__spreadValues$x({}, this.options), optionsOverride)) : this.options;
      const dataFrameDTO = toFilteredDataFrameDTO(this, fieldPredicate);
      const numberOfItemsToRemove = getNumberOfItemsToRemove(
        dataFrameDTO.fields.map((f) => {
          var _a2;
          return (_a2 = f.values) != null ? _a2 : [];
        }),
        typeof (trimValues == null ? void 0 : trimValues.maxLength) === "number" ? Math.min(trimValues.maxLength, options.maxLength) : options.maxLength,
        this.timeFieldIndex,
        options.maxDelta
      );
      dataFrameDTO.fields = dataFrameDTO.fields.map((f) => {
        var _a2;
        return __spreadProps$t(__spreadValues$x({}, f), {
          values: (_a2 = f.values) == null ? void 0 : _a2.slice(numberOfItemsToRemove)
        });
      });
      const length = (_c = (_b = (_a = dataFrameDTO.fields[0]) == null ? void 0 : _a.values) == null ? void 0 : _b.length) != null ? _c : 0;
      return __spreadProps$t(__spreadValues$x({}, dataFrameDTO), {
        // TODO: Labels and schema are not filtered by field
        labels: this.labels,
        schemaFields: this.schemaFields,
        name: this.name,
        refId: this.refId,
        meta: this.meta,
        length,
        timeFieldIndex: this.timeFieldIndex,
        pushMode: this.pushMode,
        packetInfo: this.packetInfo,
        options
      });
    });
    __publicField$8(this, "initFromSerialized", (serialized) => {
      this.name = serialized.name;
      this.refId = serialized.refId;
      this.meta = serialized.meta;
      this.length = serialized.length;
      this.labels = serialized.labels;
      this.schemaFields = serialized.schemaFields;
      this.timeFieldIndex = serialized.timeFieldIndex;
      this.pushMode = serialized.pushMode;
      this.packetInfo.length = serialized.packetInfo.length;
      this.packetInfo.number = serialized.packetInfo.number;
      this.packetInfo.action = "replace" /* Replace */;
      this.packetInfo.schemaChanged = true;
      this.fields = serialized.fields.map((f) => {
        var _a, _b, _c;
        return __spreadProps$t(__spreadValues$x({}, f), {
          type: (_a = f.type) != null ? _a : FieldType.other,
          config: (_b = f.config) != null ? _b : {},
          values: (_c = f.values) != null ? _c : []
        });
      });
      assureValuesAreWithinLengthLimit(
        this.fields.map((f) => f.values),
        this.options.maxLength,
        this.timeFieldIndex,
        this.options.maxDelta
      );
    });
    __publicField$8(this, "needsResizing", ({ maxLength, maxDelta }) => {
      const needsMoreLength = maxLength && this.options.maxLength < maxLength;
      const needsBiggerDelta = maxDelta && this.options.maxDelta < maxDelta;
      const needsToOverrideDefaultInfinityDelta = maxDelta && this.options.maxDelta === Infinity;
      return Boolean(needsMoreLength || needsBiggerDelta || needsToOverrideDefaultInfinityDelta);
    });
    __publicField$8(this, "resize", ({ maxLength, maxDelta }) => {
      if (maxDelta) {
        if (this.options.maxDelta === Infinity) {
          this.options.maxDelta = maxDelta;
        } else {
          this.options.maxDelta = Math.max(maxDelta, this.options.maxDelta);
        }
      }
      this.options.maxLength = Math.max(this.options.maxLength, maxLength != null ? maxLength : 0);
    });
    __publicField$8(this, "pushNewValues", (values) => {
      var _a, _b;
      if (!(values == null ? void 0 : values.length)) {
        return;
      }
      this.packetInfo.action = this.options.action;
      this.packetInfo.number++;
      this.packetInfo.length = values[0].length;
      this.packetInfo.schemaChanged = false;
      if (this.options.action === "append" /* Append */) {
        circPush(
          this.fields.map((f) => f.values),
          values,
          this.options.maxLength,
          this.timeFieldIndex,
          this.options.maxDelta
        );
      } else {
        values.forEach((v, i) => {
          if (this.fields[i]) {
            this.fields[i].values = v;
          }
        });
        assureValuesAreWithinLengthLimit(
          this.fields.map((f) => f.values),
          this.options.maxLength,
          this.timeFieldIndex,
          this.options.maxDelta
        );
      }
      const newLength = (_b = (_a = this.fields) == null ? void 0 : _a[0]) == null ? void 0 : _b.values.length;
      if (newLength !== void 0) {
        this.length = newLength;
      }
    });
    __publicField$8(this, "resetStateCalculations", () => {
      this.fields.forEach((f) => {
        var _a;
        f.state = __spreadProps$t(__spreadValues$x({}, (_a = f.state) != null ? _a : {}), {
          calcs: void 0,
          range: void 0
        });
      });
    });
    __publicField$8(this, "getMatchingFieldIndexes", (fieldPredicate) => this.fields.map((f, index) => fieldPredicate(f) ? index : void 0).filter((val) => val !== void 0));
    __publicField$8(this, "getValuesFromLastPacket", () => this.fields.map((f) => {
      const values = f.values;
      return values.slice(Math.max(values.length - this.packetInfo.length));
    }));
    __publicField$8(this, "hasAtLeastOnePacket", () => Boolean(this.packetInfo.length));
    __publicField$8(this, "getOptions", () => this.options);
    Object.defineProperty(this, "length", {
      enumerable: true
    });
    Object.defineProperty(this, "fields", {
      enumerable: true
    });
  }
  get alwaysReplace() {
    return this.options.action === "replace" /* Replace */;
  }
  /**
   * apply the new message to the existing data.  This will replace the existing schema
   * if a new schema is included in the message, or append data matching the current schema
   */
  push(msg) {
    const { schema, data } = msg;
    this.packetInfo.number++;
    this.packetInfo.length = 0;
    this.packetInfo.schemaChanged = false;
    if (schema) {
      this.pushMode = 0 /* wide */;
      this.timeFieldIndex = schema.fields.findIndex((f) => f.type === FieldType.time);
      const firstField = schema.fields[0];
      if (this.timeFieldIndex === 1 && firstField.type === FieldType.string && (firstField.name === "labels" || firstField.name === "Labels")) {
        this.pushMode = 1 /* labels */;
        this.timeFieldIndex = 0;
      }
      const niceSchemaFields = this.pushMode === 1 /* labels */ ? schema.fields.slice(1) : schema.fields;
      this.refId = schema.refId;
      if (schema.meta) {
        this.meta = __spreadValues$x({}, schema.meta);
      }
      const { displayNameFormat } = this.options;
      if (hasSameStructure(this.schemaFields, niceSchemaFields)) {
        const len = niceSchemaFields.length;
        this.fields.forEach((f, idx) => {
          var _a;
          const sf = niceSchemaFields[idx % len];
          f.config = (_a = sf.config) != null ? _a : {};
          f.labels = sf.labels;
        });
        if (displayNameFormat) {
          this.fields.forEach((f) => {
            const labels = __spreadValues$x({ [PROM_STYLE_METRIC_LABEL]: f.name }, f.labels);
            f.config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          });
        }
      } else {
        this.packetInfo.schemaChanged = true;
        const isWide = this.pushMode === 0 /* wide */;
        this.fields = niceSchemaFields.map((f) => {
          var _a, _b, _c, _d;
          const config = (_a = f.config) != null ? _a : {};
          if (displayNameFormat) {
            const labels = __spreadValues$x({ [PROM_STYLE_METRIC_LABEL]: f.name }, f.labels);
            config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          }
          return {
            config,
            name: f.name,
            labels: f.labels,
            type: (_b = f.type) != null ? _b : FieldType.other,
            // transfer old values by type & name, unless we relied on labels to match fields
            values: isWide ? (_d = (_c = this.fields.find((of) => of.name === f.name && f.type === of.type)) == null ? void 0 : _c.values) != null ? _d : Array(this.length).fill(void 0) : []
          };
        });
      }
      this.schemaFields = niceSchemaFields;
    }
    if (data && data.values.length && data.values[0].length) {
      let { values, entities } = data;
      if (entities) {
        entities.forEach((ents, i) => {
          if (ents) {
            decodeFieldValueEntities(ents, values[i]);
          }
        });
      }
      if (this.pushMode === 1 /* labels */) {
        const labeledTables = transpose(values);
        for (const label of labeledTables.keys()) {
          if (!this.labels.has(label)) {
            this.packetInfo.schemaChanged = true;
            this.addLabel(label);
          }
        }
        let dummyTable = Array(this.schemaFields.length).fill([]);
        let tables = [];
        this.labels.forEach((label) => {
          var _a;
          tables.push((_a = labeledTables.get(label)) != null ? _a : dummyTable);
        });
        values = join(tables);
      }
      if (values.length !== this.fields.length) {
        if (this.fields.length) {
          throw new Error(
            `push message mismatch.  Expected: ${this.fields.length}, received: ${values.length} (labels=${this.pushMode === 1 /* labels */})`
          );
        }
        this.fields = values.map((vals, idx) => {
          let name = `Field ${idx}`;
          let type = guessFieldTypeFromValue(vals[0]);
          const isTime = idx === 0 && type === FieldType.number && vals[0] > 1600016688632;
          if (isTime) {
            type = FieldType.time;
            name = "Time";
          }
          return {
            name,
            type,
            config: {},
            values: []
          };
        });
      }
      let appended = values;
      this.packetInfo.length = values[0].length;
      if (this.alwaysReplace || !this.length) {
        this.packetInfo.action = "replace" /* Replace */;
      } else {
        this.packetInfo.action = "append" /* Append */;
        appended = this.fields.map((f) => f.values);
        circPush(appended, values, this.options.maxLength, this.timeFieldIndex, this.options.maxDelta);
      }
      appended.forEach((v, i) => {
        const field = this.fields[i];
        const { state } = field;
        field.values = v;
        if (state) {
          state.calcs = void 0;
        }
      });
      this.length = appended[0].length;
    }
    return __spreadValues$x({}, this.packetInfo);
  }
  // adds a set of fields for a new label
  addLabel(label) {
    var _a;
    const { displayNameFormat } = this.options;
    const labelCount = this.labels.size;
    const parsedLabels = parseLabelsFromField(label);
    if (labelCount === 0) {
      this.fields.forEach((f, i) => {
        if (i > 0) {
          f.labels = parsedLabels;
          if (displayNameFormat) {
            const labels = __spreadValues$x({ [PROM_STYLE_METRIC_LABEL]: f.name }, parsedLabels);
            f.config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
          }
        }
      });
    } else {
      for (let i = 1; i < this.schemaFields.length; i++) {
        let proto = this.schemaFields[i];
        const config = (_a = proto.config) != null ? _a : {};
        if (displayNameFormat) {
          const labels = __spreadValues$x({ [PROM_STYLE_METRIC_LABEL]: proto.name }, parsedLabels);
          config.displayNameFromDS = renderLegendFormat(displayNameFormat, labels);
        }
        this.fields.push(__spreadProps$t(__spreadValues$x({}, proto), {
          config,
          labels: parsedLabels,
          values: Array(this.length).fill(void 0)
        }));
      }
    }
    this.labels.add(label);
  }
};
__publicField$8(_StreamingDataFrame, "deserialize", (serialized) => {
  const frame = new _StreamingDataFrame(serialized.options);
  frame.initFromSerialized(serialized);
  return frame;
});
__publicField$8(_StreamingDataFrame, "empty", (opts) => new _StreamingDataFrame(getStreamingFrameOptions(opts)));
__publicField$8(_StreamingDataFrame, "fromDataFrameJSON", (frame, opts) => {
  const streamingDataFrame = new _StreamingDataFrame(getStreamingFrameOptions(opts));
  streamingDataFrame.push(frame);
  return streamingDataFrame;
});
let StreamingDataFrame = _StreamingDataFrame;
function getStreamingFrameOptions(opts) {
  var _a, _b, _c;
  return {
    maxLength: (_a = opts == null ? void 0 : opts.maxLength) != null ? _a : 1e3,
    maxDelta: (_b = opts == null ? void 0 : opts.maxDelta) != null ? _b : Infinity,
    action: (_c = opts == null ? void 0 : opts.action) != null ? _c : "append" /* Append */,
    displayNameFormat: opts == null ? void 0 : opts.displayNameFormat
  };
}
function transpose(vrecs) {
  let tableKeys = new Set(vrecs[0]);
  let tables = /* @__PURE__ */ new Map();
  tableKeys.forEach((key) => {
    let cols = Array(vrecs.length - 1).fill(null).map(() => []);
    tables.set(key, cols);
  });
  for (let r = 0; r < vrecs[0].length; r++) {
    let table = tables.get(vrecs[0][r]);
    for (let c = 1; c < vrecs.length; c++) {
      table[c - 1].push(vrecs[c][r]);
    }
  }
  return tables;
}
function closestIdx(num, arr, lo, hi) {
  let mid;
  lo = lo || 0;
  hi = hi || arr.length - 1;
  let bitwise = hi <= 2147483647;
  while (hi - lo > 1) {
    mid = bitwise ? lo + hi >> 1 : Math.floor((lo + hi) / 2);
    if (arr[mid] < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (num - arr[lo] <= arr[hi] - num) {
    return lo;
  }
  return hi;
}
function parseLabelsFromField(str) {
  if (!str.length) {
    return {};
  }
  if (str.charAt(0) === "{") {
    return parseLabels(str);
  }
  const parsedLabels = {};
  str.split(",").forEach((kv) => {
    const [key, val] = kv.trim().split("=");
    parsedLabels[key] = val;
  });
  return parsedLabels;
}
function circPush(data, newData, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < newData[i].length; k++) {
      data[i].push(newData[i][k]);
    }
  }
  return assureValuesAreWithinLengthLimit(data, maxLength, deltaIdx, maxDelta);
}
function assureValuesAreWithinLengthLimit(data, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  const count = getNumberOfItemsToRemove(data, maxLength, deltaIdx, maxDelta);
  if (count) {
    for (let i = 0; i < data.length; i++) {
      data[i].splice(0, count);
    }
  }
  return count;
}
function getNumberOfItemsToRemove(data, maxLength = Infinity, deltaIdx = 0, maxDelta = Infinity) {
  var _a;
  if (!((_a = data[0]) == null ? void 0 : _a.length)) {
    return 0;
  }
  const nlen = data[0].length;
  let sliceIdx = 0;
  if (nlen > maxLength) {
    sliceIdx = nlen - maxLength;
  }
  if (maxDelta !== Infinity && deltaIdx >= 0) {
    const deltaLookup = data[deltaIdx];
    const low = deltaLookup[sliceIdx];
    const high = deltaLookup[nlen - 1];
    if (high - low > maxDelta) {
      sliceIdx = closestIdx(high - maxDelta, deltaLookup, sliceIdx);
    }
  }
  return sliceIdx;
}
function hasSameStructure(a, b) {
  if ((a == null ? void 0 : a.length) !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    const fA = a[i];
    const fB = b[i];
    if (fA.name !== fB.name || fA.type !== fB.type) {
      return false;
    }
  }
  return true;
}

/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */
function renderUrl(path, query) {
  if (query && Object.keys(query).length > 0) {
    path += "?" + toUrlParams(query);
  }
  return path;
}
function encodeURIComponentAsAngularJS(val, pctEncodeSpaces) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+").replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function toUrlParams(a, encodeAsAngularJS = true) {
  const s = [];
  const rbracket = /\[\]$/;
  const encodingFunction = encodeAsAngularJS ? (value, pctEncodeSpaces) => encodeURIComponentAsAngularJS(value, pctEncodeSpaces) : (value, _) => encodeURIComponent(value);
  const isArray = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  const add = (k, v) => {
    v = typeof v === "function" ? v() : v === null ? "" : v === void 0 ? "" : v;
    if (typeof v !== "boolean") {
      s[s.length] = encodingFunction(k, true) + "=" + encodingFunction(v, true);
    } else {
      const valueQueryPart = v ? "" : "=" + encodingFunction("false", true);
      s[s.length] = encodingFunction(k, true) + valueQueryPart;
    }
  };
  const buildParams = (prefix, obj) => {
    let i, len, key;
    if (prefix) {
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (rbracket.test(prefix)) {
            add(prefix, obj[i]);
          } else {
            buildParams(prefix, obj[i]);
          }
        }
      } else if (obj && String(obj) === "[object Object]") {
        for (key in obj) {
          buildParams(prefix + "[" + key + "]", obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };
  return buildParams("", a).join("&");
}
function serializeParams(params) {
  return toUrlParams(params, false);
}
function appendQueryToUrl(url, stringToAppend) {
  if (stringToAppend !== void 0 && stringToAppend !== null && stringToAppend !== "") {
    const pos = url.indexOf("?");
    if (pos !== -1) {
      if (url.length - pos > 1) {
        url += "&";
      }
    } else {
      url += "?";
    }
    url += stringToAppend;
  }
  return url;
}
function getUrlSearchParams() {
  const search = window.location.search.substring(1);
  const searchParamsSegments = search.split("&");
  const params = {};
  for (const p of searchParamsSegments) {
    const keyValuePair = p.split("=");
    if (keyValuePair.length > 1) {
      const key = decodeURIComponent(keyValuePair[0]);
      const value = decodeURIComponent(keyValuePair[1]);
      if (key in params) {
        params[key] = [...params[key], value];
      } else {
        params[key] = [value];
      }
    } else if (keyValuePair.length === 1) {
      const key = decodeURIComponent(keyValuePair[0]);
      params[key] = true;
    }
  }
  return params;
}
function parseKeyValue(keyValue) {
  const obj = {};
  const parts = (keyValue || "").split("&");
  for (let keyValue2 of parts) {
    let splitPoint;
    let key;
    let val;
    if (keyValue2) {
      key = keyValue2 = keyValue2.replace(/\+/g, "%20");
      splitPoint = keyValue2.indexOf("=");
      if (splitPoint !== -1) {
        key = keyValue2.substring(0, splitPoint);
        val = keyValue2.substring(splitPoint + 1);
      }
      key = tryDecodeURIComponent(key);
      if (key !== void 0) {
        val = val !== void 0 ? tryDecodeURIComponent(val) : true;
        let parsedVal;
        if (typeof val === "string" && val !== "") {
          parsedVal = val === "true" || val === "false" ? val === "true" : val;
        } else {
          parsedVal = val;
        }
        if (!obj.hasOwnProperty(key)) {
          obj[key] = isNaN(parsedVal) ? val : parsedVal;
        } else if (Array.isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key], isNaN(parsedVal) ? val : parsedVal];
        }
      }
    }
  }
  return obj;
}
function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return void 0;
  }
}
const urlUtil = {
  renderUrl,
  toUrlParams,
  appendQueryToUrl,
  getUrlSearchParams,
  parseKeyValue,
  serializeParams
};
function serializeStateToUrlParam(urlState, compact) {
  if (compact !== void 0) {
    console.warn("`compact` parameter is deprecated and will be removed in a future release");
  }
  return JSON.stringify(urlState);
}
const toURLRange = (range) => {
  let from = range.from;
  if (isDateTime(from)) {
    from = from.valueOf().toString();
  }
  let to = range.to;
  if (isDateTime(to)) {
    to = to.valueOf().toString();
  }
  return {
    from,
    to
  };
};

let grafanaConfig = { appSubUrl: "" };
let getTimeRangeUrlParams;
let getVariablesUrlParams;
const maybeParseUrl = (input) => {
  try {
    return new URL(input);
  } catch (e) {
    return void 0;
  }
};
const stripBaseFromUrl = (urlOrPath) => {
  var _a;
  const parsedUrl = maybeParseUrl(urlOrPath);
  if (parsedUrl) {
    if (parsedUrl.origin !== window.location.origin) {
      return urlOrPath;
    }
  }
  const appSubUrl = (_a = grafanaConfig.appSubUrl) != null ? _a : "";
  const stripExtraChars = appSubUrl.endsWith("/") ? 1 : 0;
  const isAbsoluteUrl = urlOrPath.startsWith("http");
  let segmentToStrip = appSubUrl;
  if (!urlOrPath.startsWith("/") || isAbsoluteUrl) {
    segmentToStrip = `${window.location.origin}${appSubUrl}`;
  }
  return urlOrPath.length > 0 && (urlOrPath.indexOf(segmentToStrip + "/") === 0 || urlOrPath === segmentToStrip) ? urlOrPath.slice(segmentToStrip.length - stripExtraChars) : urlOrPath;
};
const assureBaseUrl = (url) => {
  if (url.startsWith("/")) {
    return `${grafanaConfig.appSubUrl}${stripBaseFromUrl(url)}`;
  }
  return url;
};
const getUrlForPartial = (location, searchParamsToUpdate) => {
  const searchParams = urlUtil.parseKeyValue(
    location.search.startsWith("?") ? location.search.substring(1) : location.search
  );
  for (const key in searchParamsToUpdate) {
    if (searchParamsToUpdate[key] === null || searchParamsToUpdate[key] === void 0) {
      delete searchParams[key];
    } else {
      searchParams[key] = searchParamsToUpdate[key];
    }
  }
  return assureBaseUrl(urlUtil.renderUrl(location.pathname, searchParams));
};
const updateSearchParams = (init, partial) => {
  const urlSearchParams = new URLSearchParams(partial);
  try {
    const curURL = new URL(init);
    urlSearchParams.forEach((val, key) => curURL.searchParams.set(key, val));
    return curURL.href;
  } catch (e) {
    const newSearchParams = new URLSearchParams(init);
    urlSearchParams.forEach((v, k) => {
      newSearchParams.set(k, v);
    });
    return "?" + newSearchParams.toString();
  }
};
const locationUtil = {
  /**
   *
   * @param getConfig
   * @param getAllVariableValuesForUrl
   * @param getTimeRangeForUrl
   * @internal
   */
  initialize: (dependencies) => {
    grafanaConfig = dependencies.config;
    getTimeRangeUrlParams = dependencies.getTimeRangeForUrl;
    getVariablesUrlParams = dependencies.getVariablesUrlParams;
  },
  stripBaseFromUrl,
  assureBaseUrl,
  updateSearchParams,
  getTimeRangeUrlParams: () => {
    if (!getTimeRangeUrlParams) {
      return null;
    }
    return urlUtil.toUrlParams(getTimeRangeUrlParams());
  },
  getVariablesUrlParams: (scopedVars) => {
    if (!getVariablesUrlParams) {
      return null;
    }
    const params = getVariablesUrlParams(scopedVars);
    return urlUtil.toUrlParams(params);
  },
  getUrlForPartial,
  processUrl: (url) => {
    return grafanaConfig.disableSanitizeHtml ? url : textUtil.sanitizeUrl(url);
  }
};

var __defProp$A = Object.defineProperty;
var __defProps$s = Object.defineProperties;
var __getOwnPropDescs$s = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$x = Object.getOwnPropertySymbols;
var __hasOwnProp$x = Object.prototype.hasOwnProperty;
var __propIsEnum$x = Object.prototype.propertyIsEnumerable;
var __defNormalProp$A = (obj, key, value) => key in obj ? __defProp$A(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$w = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$x.call(b, prop))
      __defNormalProp$A(a, prop, b[prop]);
  if (__getOwnPropSymbols$x)
    for (var prop of __getOwnPropSymbols$x(b)) {
      if (__propIsEnum$x.call(b, prop))
        __defNormalProp$A(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$s = (a, b) => __defProps$s(a, __getOwnPropDescs$s(b));
const DataLinkBuiltInVars = {
  keepTime: "__url_time_range",
  timeRangeFrom: "__from",
  timeRangeTo: "__to",
  includeVars: "__all_variables",
  seriesName: "__series.name",
  fieldName: "__field.name",
  valueTime: "__value.time",
  valueNumeric: "__value.numeric",
  valueText: "__value.text",
  valueRaw: "__value.raw",
  // name of the calculation represented by the value
  valueCalc: "__value.calc"
};
function mapInternalLinkToExplore(options) {
  var _a, _b, _c, _d;
  const { onClickFn, replaceVariables, link, scopedVars, range, field, internalLink } = options;
  const interpolatedQuery = interpolateObject((_a = link.internal) == null ? void 0 : _a.query, scopedVars, replaceVariables);
  const interpolatedPanelsState = interpolateObject((_b = link.internal) == null ? void 0 : _b.panelsState, scopedVars, replaceVariables);
  const interpolatedCorrelationData = interpolateObject(
    (_d = (_c = link.internal) == null ? void 0 : _c.meta) == null ? void 0 : _d.correlationData,
    scopedVars,
    replaceVariables
  );
  const title = link.title ? link.title : internalLink.datasourceName;
  return {
    title: replaceVariables(title, scopedVars),
    // In this case this is meant to be internal link (opens split view by default) the href will also points
    // to explore but this way you can open it in new tab.
    href: generateInternalHref(internalLink.datasourceUid, interpolatedQuery, range, interpolatedPanelsState),
    onClick: onClickFn ? (event) => {
      if (event.preventDefault) {
        event.preventDefault();
      }
      onClickFn({
        datasourceUid: internalLink.datasourceUid,
        queries: [interpolatedQuery],
        panelsState: interpolatedPanelsState,
        correlationHelperData: interpolatedCorrelationData,
        range
      });
    } : void 0,
    target: (link == null ? void 0 : link.targetBlank) ? "_blank" : "_self",
    origin: field
  };
}
function generateInternalHref(datasourceUid, query, range, panelsState) {
  return locationUtil.assureBaseUrl(
    `/explore?left=${encodeURIComponent(
      serializeStateToUrlParam(__spreadProps$s(__spreadValues$w({}, (range == null ? void 0 : range.raw) ? { range: toURLRange(range.raw) } : {}), {
        datasource: datasourceUid,
        queries: [query],
        panelsState
      }))
    )}`
  );
}
function interpolateObject(obj, scopedVars, replaceVariables) {
  if (!obj) {
    return obj;
  }
  if (typeof obj === "string") {
    return replaceVariables(obj, scopedVars);
  }
  const copy = JSON.parse(JSON.stringify(obj));
  return interpolateObjectRecursive(copy, scopedVars, replaceVariables);
}
function interpolateObjectRecursive(obj, scopedVars, replaceVariables) {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === "string") {
      obj[k] = replaceVariables(obj[k], scopedVars);
    } else if (typeof obj[k] === "object" && obj[k] !== null) {
      obj[k] = interpolateObjectRecursive(obj[k], scopedVars, replaceVariables);
    }
  }
  return obj;
}

var __defProp$z = Object.defineProperty;
var __defProps$r = Object.defineProperties;
var __getOwnPropDescs$r = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$w = Object.getOwnPropertySymbols;
var __hasOwnProp$w = Object.prototype.hasOwnProperty;
var __propIsEnum$w = Object.prototype.propertyIsEnumerable;
var __defNormalProp$z = (obj, key, value) => key in obj ? __defProp$z(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$v = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$w.call(b, prop))
      __defNormalProp$z(a, prop, b[prop]);
  if (__getOwnPropSymbols$w)
    for (var prop of __getOwnPropSymbols$w(b)) {
      if (__propIsEnum$w.call(b, prop))
        __defNormalProp$z(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$r = (a, b) => __defProps$r(a, __getOwnPropDescs$r(b));
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
    const newFrame = __spreadValues$v({}, originalFrame);
    newFrame.fields = newFrame.fields.map((field) => {
      return __spreadProps$r(__spreadValues$v({}, field), {
        config: lodash.cloneDeep(field.config),
        state: __spreadValues$v({}, field.state)
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
  if (field.type !== FieldType.number || lodash.isNumber(config.min) && lodash.isNumber(config.max)) {
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
      lodash.unset(config.custom, item.path);
    } else {
      lodash.unset(config, item.path);
    }
  } else {
    if (item.isCustom) {
      if (!config.custom) {
        config.custom = {};
      }
      lodash.set(config.custom, item.path, val);
    } else {
      lodash.set(config, item.path, val);
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
  const currentConfig = lodash.get(destination, fieldConfigProperty.path);
  if (currentConfig === null || currentConfig === void 0) {
    const item = context.fieldConfigRegistry.getIfExists(fieldConfigProperty.id);
    if (!item) {
      return;
    }
    if (item && item.shouldApply(context.field)) {
      const val = item.process(lodash.get(source, item.path), context, item.settings);
      if (val !== void 0 && val !== null) {
        lodash.set(destination, item.path, val);
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
    const dataLinkScopedVars = __spreadProps$r(__spreadValues$v({}, fieldScopedVars), {
      __dataContext: dataContext
    });
    const boundReplaceVariables = (value, scopedVars, format) => replaceVariables(value, __spreadValues$v(__spreadValues$v({}, dataLinkScopedVars), scopedVars), format);
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
      href = replaceVariables(href, dataLinkScopedVars, schema.VariableFormatID.UriEncode);
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
    const newFrame = __spreadValues$v({}, newData[frameIndex]);
    const newFields = [...newFrame.fields];
    for (let fieldIndex = 0; fieldIndex < newFields.length; fieldIndex++) {
      newFields[fieldIndex] = __spreadProps$r(__spreadValues$v({}, newFields[fieldIndex]), {
        display: processor
      });
    }
    newData[frameIndex] = __spreadProps$r(__spreadValues$v({}, newFrame), {
      fields: newFields
    });
  }
  return newData;
}
function useFieldOverrides(plugin, fieldConfig, data, timeZone, theme, replace, dataLinkPostProcessor) {
  const fieldConfigRegistry = plugin == null ? void 0 : plugin.fieldConfigRegistry;
  const structureRev = React.useRef(0);
  const prevSeries = usePrevious__default["default"](data == null ? void 0 : data.series);
  return React.useMemo(() => {
    if (!fieldConfigRegistry || !fieldConfig || !data) {
      return;
    }
    const series = data == null ? void 0 : data.series;
    if (data.structureRev == null && series && prevSeries && !compareArrayValues(series, prevSeries, compareDataFrameStructures)) {
      structureRev.current++;
    }
    const panelData = __spreadProps$r(__spreadValues$v({
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
      value: __spreadValues$v({}, fieldScopedVars.__dataContext.value)
    };
  }
  return { value: { frame, field, data: [frame] } };
}

function getFieldDisplayValuesProxy(options) {
  return new Proxy(
    {},
    {
      get: (obj, key) => {
        var _a;
        let field = options.frame.fields.find((f) => key === f.name);
        if (!field) {
          const k = lodash.toNumber(key);
          field = options.frame.fields[k];
        }
        if (!field) {
          field = options.frame.fields.find((f) => key === f.config.displayName);
        }
        if (!field) {
          field = options.frame.fields.find((f) => {
            if (f.labels) {
              return key === f.labels.name;
            }
            return false;
          });
        }
        if (!field) {
          return void 0;
        }
        const displayProcessor = (_a = field.display) != null ? _a : getDisplayProcessor();
        const raw = field.values[options.rowIndex];
        const disp = displayProcessor(raw);
        disp.toString = () => formattedValueToString(disp);
        return disp;
      }
    }
  );
}

var BinaryOperationID = /* @__PURE__ */ ((BinaryOperationID2) => {
  BinaryOperationID2["Add"] = "+";
  BinaryOperationID2["Subtract"] = "-";
  BinaryOperationID2["Divide"] = "/";
  BinaryOperationID2["Multiply"] = "*";
  return BinaryOperationID2;
})(BinaryOperationID || {});
const binaryOperators = new Registry(() => {
  return [
    {
      id: "+" /* Add */,
      name: "Add",
      operation: (a, b) => a + b,
      binaryOperationID: "+" /* Add */
    },
    {
      id: "-" /* Subtract */,
      name: "Subtract",
      operation: (a, b) => a - b,
      binaryOperationID: "-" /* Subtract */
    },
    {
      id: "*" /* Multiply */,
      name: "Multiply",
      operation: (a, b) => a * b,
      binaryOperationID: "*" /* Multiply */
    },
    {
      id: "/" /* Divide */,
      name: "Divide",
      operation: (a, b) => a / b,
      binaryOperationID: "/" /* Divide */
    }
  ];
});

var UnaryOperationID = /* @__PURE__ */ ((UnaryOperationID2) => {
  UnaryOperationID2["Abs"] = "abs";
  UnaryOperationID2["Exp"] = "exp";
  UnaryOperationID2["Ln"] = "ln";
  UnaryOperationID2["Floor"] = "floor";
  UnaryOperationID2["Ceil"] = "ceil";
  return UnaryOperationID2;
})(UnaryOperationID || {});
const unaryOperators = new Registry(() => {
  return [
    {
      id: "abs" /* Abs */,
      name: "Absolute value",
      operation: (value) => Math.abs(value),
      unaryOperationID: "abs" /* Abs */
    },
    {
      id: "exp" /* Exp */,
      name: "Natural exponent",
      operation: (value) => Math.exp(value),
      unaryOperationID: "exp" /* Exp */
    },
    {
      id: "ln" /* Ln */,
      name: "Natural logarithm",
      operation: (value) => Math.log(value),
      unaryOperationID: "ln" /* Ln */
    },
    {
      id: "floor" /* Floor */,
      name: "Floor",
      operation: (value) => Math.floor(value),
      unaryOperationID: "floor" /* Floor */
    },
    {
      id: "ceil" /* Ceil */,
      name: "Ceiling",
      operation: (value) => Math.ceil(value),
      unaryOperationID: "ceil" /* Ceil */
    }
  ];
});

const ensureColumnsTransformer = {
  id: DataTransformerID.ensureColumns,
  name: "Ensure Columns Transformer",
  description: "Will check if current data frames is series or columns. If in series it will convert to columns.",
  operator: (options, ctx) => (source) => source.pipe(operators.map((data) => ensureColumnsTransformer.transformer(options, ctx)(data))),
  transformer: (_options, ctx) => (frames) => {
    const timeFieldName = findConsistentTimeFieldName(frames);
    if (frames.length > 1 && timeFieldName) {
      return joinByFieldTransformer.transformer(
        {
          byField: timeFieldName
        },
        ctx
      )(frames);
    }
    return frames;
  }
};
function findConsistentTimeFieldName(data) {
  let name = void 0;
  for (const frame of data) {
    const { timeField } = getTimeField(frame);
    if (!timeField) {
      return void 0;
    }
    if (!name) {
      name = timeField.name;
    } else if (name !== timeField.name) {
      return void 0;
    }
  }
  return name;
}

const noopTransformer = {
  id: DataTransformerID.noop,
  name: "noop",
  description: "No-operation transformer",
  defaultOptions: {},
  /** no operation */
  operator: (options) => (source) => source,
  /** no operation */
  transformer: (options) => (data) => data
};

var __defProp$y = Object.defineProperty;
var __defProps$q = Object.defineProperties;
var __getOwnPropDescs$q = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$v = Object.getOwnPropertySymbols;
var __hasOwnProp$v = Object.prototype.hasOwnProperty;
var __propIsEnum$v = Object.prototype.propertyIsEnumerable;
var __defNormalProp$y = (obj, key, value) => key in obj ? __defProp$y(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$u = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$v.call(b, prop))
      __defNormalProp$y(a, prop, b[prop]);
  if (__getOwnPropSymbols$v)
    for (var prop of __getOwnPropSymbols$v(b)) {
      if (__propIsEnum$v.call(b, prop))
        __defNormalProp$y(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$q = (a, b) => __defProps$q(a, __getOwnPropDescs$q(b));
const defaultReduceOptions = {
  reducer: ReducerID.sum
};
const defaultWindowOptions = {
  reducer: ReducerID.mean,
  windowAlignment: "trailing" /* Trailing */,
  windowSizeMode: "percentage" /* Percentage */,
  windowSize: 0.1
};
const defaultBinaryOptions = {
  left: "",
  operator: BinaryOperationID.Add,
  right: ""
};
const defaultUnaryOptions = {
  operator: UnaryOperationID.Abs,
  fieldName: ""
};
const calculateFieldTransformer = {
  id: DataTransformerID.calculateField,
  name: "Add field from calculation",
  description: "Use the row values to calculate a new field",
  defaultOptions: {
    mode: "reduceRow" /* ReduceRow */,
    reduce: {
      reducer: ReducerID.sum
    }
  },
  operator: (options, ctx) => (outerSource) => {
    const operator = options && options.timeSeries !== false ? ensureColumnsTransformer.operator(null, ctx) : noopTransformer.operator({}, ctx);
    if (options.alias != null) {
      options.alias = ctx.interpolate(options.alias);
    }
    return outerSource.pipe(
      operator,
      operators.map((data) => {
        var _a, _b, _c;
        const mode = (_a = options.mode) != null ? _a : "reduceRow" /* ReduceRow */;
        let creator = void 0;
        switch (mode) {
          case "reduceRow" /* ReduceRow */:
            creator = getReduceRowCreator(lodash.defaults(options.reduce, defaultReduceOptions), data);
            break;
          case "cumulativeFunctions" /* CumulativeFunctions */:
            creator = getCumulativeCreator(lodash.defaults(options.cumulative, defaultReduceOptions), data);
            break;
          case "windowFunctions" /* WindowFunctions */:
            creator = getWindowCreator(lodash.defaults(options.window, defaultWindowOptions), data);
            break;
          case "unary" /* UnaryOperation */:
            creator = getUnaryCreator(lodash.defaults(options.unary, defaultUnaryOptions), data);
            break;
          case "binary" /* BinaryOperation */:
            const binaryOptions = __spreadProps$q(__spreadValues$u({}, options.binary), {
              left: ctx.interpolate((_b = options.binary) == null ? void 0 : _b.left),
              right: ctx.interpolate((_c = options.binary) == null ? void 0 : _c.right)
            });
            creator = getBinaryCreator(lodash.defaults(binaryOptions, defaultBinaryOptions), data);
            break;
          case "index" /* Index */:
            return data.map((frame) => {
              var _a2, _b2, _c2;
              const indexArr = [...Array(frame.length).keys()];
              if ((_a2 = options.index) == null ? void 0 : _a2.asPercentile) {
                for (let i = 0; i < indexArr.length; i++) {
                  indexArr[i] = indexArr[i] / indexArr.length;
                }
              }
              const f = {
                name: (_b2 = options.alias) != null ? _b2 : "Row",
                type: FieldType.number,
                values: indexArr,
                config: ((_c2 = options.index) == null ? void 0 : _c2.asPercentile) ? { unit: "percentunit" } : {}
              };
              return __spreadProps$q(__spreadValues$u({}, frame), {
                fields: options.replaceFields ? [f] : [...frame.fields, f]
              });
            });
        }
        if (!creator) {
          return data;
        }
        return data.map((frame) => {
          const values = creator(frame);
          if (!values) {
            return frame;
          }
          const field = {
            name: getNameFromOptions(options),
            type: FieldType.number,
            config: {},
            values
          };
          let fields = [];
          if (options.replaceFields) {
            const { timeField } = getTimeField(frame);
            if (timeField && options.timeSeries !== false) {
              fields = [timeField, field];
            } else {
              fields = [field];
            }
          } else {
            fields = [...frame.fields, field];
          }
          return __spreadProps$q(__spreadValues$u({}, frame), {
            fields
          });
        });
      })
    );
  }
};
function getWindowCreator(options, allFrames) {
  if (options.windowSize <= 0) {
    throw new Error("Add field from calculation transformation - Window size must be larger than 0");
  }
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.field) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: [options.field]
      }
    });
  }
  return (frame) => {
    const window = Math.ceil(
      options.windowSize * (options.windowSizeMode === "percentage" /* Percentage */ ? frame.length : 1)
    );
    let selectedField = null;
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        selectedField = field;
        break;
      }
    }
    if (!selectedField) {
      return;
    }
    if (![ReducerID.mean, ReducerID.stdDev, ReducerID.variance].includes(options.reducer)) {
      throw new Error(`Add field from calculation transformation - Unsupported reducer: ${options.reducer}`);
    }
    if (options.windowAlignment === "centered" /* Centered */) {
      return getCenteredWindowValues(frame, options.reducer, selectedField, window);
    } else {
      return getTrailingWindowValues(frame, options.reducer, selectedField, window);
    }
  };
}
function getTrailingWindowValues(frame, reducer, selectedField, window) {
  const vals = [];
  let sum = 0;
  let count = 0;
  for (let i = 0; i < frame.length; i++) {
    if (reducer === ReducerID.mean) {
      const currentValue = selectedField.values[i];
      if (currentValue !== null && currentValue !== void 0) {
        count++;
        sum += currentValue;
        if (i > window - 1) {
          sum -= selectedField.values[i - window];
          count--;
        }
      }
      vals.push(count === 0 ? 0 : sum / count);
    } else if (reducer === ReducerID.variance) {
      const start = Math.max(0, i - window + 1);
      const end = i + 1;
      vals.push(calculateVariance(selectedField.values.slice(start, end)));
    } else if (reducer === ReducerID.stdDev) {
      const start = Math.max(0, i - window + 1);
      const end = i + 1;
      vals.push(calculateStdDev(selectedField.values.slice(start, end)));
    }
  }
  return vals;
}
function getCenteredWindowValues(frame, reducer, selectedField, window) {
  const vals = [];
  let sum = 0;
  let count = 0;
  const leadingPartOfWindow = Math.ceil(window / 2) - 1;
  const trailingPartOfWindow = Math.floor(window / 2);
  for (let i = 0; i < frame.length; i++) {
    const first = i - trailingPartOfWindow;
    const last = i + leadingPartOfWindow;
    if (reducer === ReducerID.mean) {
      if (i === 0) {
        for (let x = 0; x < leadingPartOfWindow + 1 && x < selectedField.values.length; x++) {
          if (selectedField.values[x] != null) {
            sum += selectedField.values[x];
            count++;
          }
        }
      } else {
        if (last < selectedField.values.length) {
          if (selectedField.values[last] != null) {
            sum += selectedField.values[last];
            count++;
          }
        }
        if (first > 0) {
          if (selectedField.values[first - 1] != null) {
            sum -= selectedField.values[first - 1];
            count--;
          }
        }
      }
      vals.push(count === 0 ? 0 : sum / count);
    } else if (reducer === ReducerID.variance) {
      const windowVals = selectedField.values.slice(
        Math.max(0, first),
        Math.min(last + 1, selectedField.values.length)
      );
      vals.push(calculateVariance(windowVals));
    } else if (reducer === ReducerID.stdDev) {
      const windowVals = selectedField.values.slice(
        Math.max(0, first),
        Math.min(last + 1, selectedField.values.length)
      );
      vals.push(calculateStdDev(windowVals));
    }
  }
  return vals;
}
function calculateVariance(vals) {
  if (vals.length < 1) {
    return 0;
  }
  let squareSum = 0;
  let runningMean = 0;
  let nonNullCount = 0;
  for (let i = 0; i < vals.length; i++) {
    const currentValue = vals[i];
    if (currentValue != null) {
      nonNullCount++;
      let _oldMean = runningMean;
      runningMean += (currentValue - _oldMean) / nonNullCount;
      squareSum += (currentValue - _oldMean) * (currentValue - runningMean);
    }
  }
  if (nonNullCount === 0) {
    return 0;
  }
  const variance = squareSum / nonNullCount;
  return variance;
}
function calculateStdDev(vals) {
  return Math.sqrt(calculateVariance(vals));
}
function getCumulativeCreator(options, allFrames) {
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.field) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: [options.field]
      }
    });
  }
  if (![ReducerID.mean, ReducerID.sum].includes(options.reducer)) {
    throw new Error(`Add field from calculation transformation - Unsupported reducer: ${options.reducer}`);
  }
  return (frame) => {
    var _a;
    let selectedField = null;
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        selectedField = field;
        break;
      }
    }
    if (!selectedField) {
      return;
    }
    const vals = [];
    let total = 0;
    for (let i = 0; i < frame.length; i++) {
      total += (_a = selectedField.values[i]) != null ? _a : 0;
      if (options.reducer === ReducerID.sum) {
        vals.push(total);
      } else if (options.reducer === ReducerID.mean) {
        vals.push(total / (i + 1));
      }
    }
    return vals;
  };
}
function getReduceRowCreator(options, allFrames) {
  var _a;
  let matcher = getFieldMatcher({
    id: FieldMatcherID.numeric
  });
  if (options.include && options.include.length) {
    matcher = getFieldMatcher({
      id: FieldMatcherID.byNames,
      options: {
        names: options.include
      }
    });
  }
  const info = fieldReducers.get(options.reducer);
  if (!info) {
    throw new Error(`Unknown reducer: ${options.reducer}`);
  }
  const reducer = (_a = info.reduce) != null ? _a : doStandardCalcs;
  const ignoreNulls = options.nullValueMode === NullValueMode.Ignore;
  const nullAsZero = options.nullValueMode === NullValueMode.AsZero;
  return (frame) => {
    const columns = [];
    for (const field of frame.fields) {
      if (matcher(field, frame, allFrames)) {
        columns.push(field.values);
      }
    }
    const size = columns.length;
    const row = {
      name: "temp",
      values: new Array(size),
      type: FieldType.number,
      config: {}
    };
    const vals = [];
    for (let i = 0; i < frame.length; i++) {
      for (let j = 0; j < size; j++) {
        row.values[j] = columns[j][i];
      }
      vals.push(reducer(row, ignoreNulls, nullAsZero)[options.reducer]);
    }
    return vals;
  };
}
function findFieldValuesWithNameOrConstant(frame, name, allFrames) {
  if (!name) {
    return void 0;
  }
  for (const f of frame.fields) {
    if (name === getFieldDisplayName(f, frame, allFrames)) {
      if (f.type === FieldType.boolean) {
        return f.values.map((v2) => v2 ? 1 : 0);
      }
      return f.values;
    }
  }
  const v = parseFloat(name);
  if (!isNaN(v)) {
    return new Array(frame.length).fill(v);
  }
  return void 0;
}
function getBinaryCreator(options, allFrames) {
  const operator = binaryOperators.getIfExists(options.operator);
  return (frame) => {
    const left = findFieldValuesWithNameOrConstant(frame, options.left, allFrames);
    const right = findFieldValuesWithNameOrConstant(frame, options.right, allFrames);
    if (!left || !right || !operator) {
      return void 0;
    }
    const arr = new Array(left.length);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = operator.operation(left[i], right[i]);
    }
    return arr;
  };
}
function getUnaryCreator(options, allFrames) {
  const operator = unaryOperators.getIfExists(options.operator);
  return (frame) => {
    let value = [];
    for (const f of frame.fields) {
      if (options.fieldName === getFieldDisplayName(f, frame, allFrames) && f.type === FieldType.number) {
        value = f.values;
      }
    }
    if (!value.length || !operator) {
      return void 0;
    }
    const arr = new Array(value.length);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = operator.operation(value[i]);
    }
    return arr;
  };
}
function getNameFromOptions(options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if ((_a = options.alias) == null ? void 0 : _a.length) {
    return options.alias;
  }
  switch (options.mode) {
    case "cumulativeFunctions" /* CumulativeFunctions */: {
      const { cumulative } = options;
      return `cumulative ${(_b = cumulative == null ? void 0 : cumulative.reducer) != null ? _b : ""}${(cumulative == null ? void 0 : cumulative.field) ? `(${cumulative.field})` : ""}`;
    }
    case "windowFunctions" /* WindowFunctions */: {
      const { window } = options;
      return `${(_c = window == null ? void 0 : window.windowAlignment) != null ? _c : ""} moving ${(_d = window == null ? void 0 : window.reducer) != null ? _d : ""}${(window == null ? void 0 : window.field) ? `(${window.field})` : ""}`;
    }
    case "unary" /* UnaryOperation */: {
      const { unary } = options;
      return `${(_e = unary == null ? void 0 : unary.operator) != null ? _e : ""}${(unary == null ? void 0 : unary.fieldName) ? `(${unary.fieldName})` : ""}`;
    }
    case "binary" /* BinaryOperation */: {
      const { binary } = options;
      const alias = `${(_f = binary == null ? void 0 : binary.left) != null ? _f : ""} ${(_g = binary == null ? void 0 : binary.operator) != null ? _g : ""} ${(_h = binary == null ? void 0 : binary.right) != null ? _h : ""}`;
      return alias.replace(/\$/g, "");
    }
    case "reduceRow" /* ReduceRow */:
      {
        const r = fieldReducers.getIfExists((_i = options.reduce) == null ? void 0 : _i.reducer);
        if (r) {
          return r.name;
        }
      }
      break;
    case "index" /* Index */:
      return "Row";
  }
  return "math";
}

var __defProp$x = Object.defineProperty;
var __defProps$p = Object.defineProperties;
var __getOwnPropDescs$p = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$u = Object.getOwnPropertySymbols;
var __hasOwnProp$u = Object.prototype.hasOwnProperty;
var __propIsEnum$u = Object.prototype.propertyIsEnumerable;
var __defNormalProp$x = (obj, key, value) => key in obj ? __defProp$x(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$t = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$u.call(b, prop))
      __defNormalProp$x(a, prop, b[prop]);
  if (__getOwnPropSymbols$u)
    for (var prop of __getOwnPropSymbols$u(b)) {
      if (__propIsEnum$u.call(b, prop))
        __defNormalProp$x(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$p = (a, b) => __defProps$p(a, __getOwnPropDescs$p(b));
const concatenateTransformer = {
  id: DataTransformerID.concatenate,
  name: "Concatenate fields",
  description: "Combine all fields into a single frame.  Values will be appended with undefined values if not the same length.",
  defaultOptions: {
    frameNameMode: "field" /* FieldName */,
    frameNameLabel: "frame"
  },
  operator: (options) => (source) => source.pipe(
    operators.map((dataFrames) => {
      if (!Array.isArray(dataFrames) || dataFrames.length < 2) {
        return dataFrames;
      }
      return [concatenateFields(dataFrames, options)];
    })
  )
};
function concatenateFields(data, opts) {
  var _a;
  let sameLength = true;
  let maxLength = data[0].length;
  const frameNameLabel = (_a = opts.frameNameLabel) != null ? _a : "frame";
  let fields = [];
  for (const frame of data) {
    if (maxLength !== frame.length) {
      sameLength = false;
      maxLength = Math.max(maxLength, frame.length);
    }
    for (const f of frame.fields) {
      const copy = __spreadValues$t({}, f);
      copy.state = void 0;
      if (frame.name) {
        if (opts.frameNameMode === "drop" /* Drop */) ; else if (opts.frameNameMode === "label" /* Label */) {
          copy.labels = __spreadValues$t({}, f.labels);
          copy.labels[frameNameLabel] = frame.name;
        } else if (!copy.name || copy.name === TIME_SERIES_VALUE_FIELD_NAME) {
          copy.name = frame.name;
        } else {
          copy.name = `${frame.name} \xB7 ${f.name}`;
        }
      }
      fields.push(copy);
    }
  }
  if (!sameLength) {
    fields = fields.map((f) => {
      if (f.values.length === maxLength) {
        return f;
      }
      const values = f.values.slice();
      values.length = maxLength;
      return __spreadProps$p(__spreadValues$t({}, f), {
        values
      });
    });
  }
  return {
    fields,
    length: maxLength
  };
}

var __defProp$w = Object.defineProperty;
var __defProps$o = Object.defineProperties;
var __getOwnPropDescs$o = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$t = Object.getOwnPropertySymbols;
var __hasOwnProp$t = Object.prototype.hasOwnProperty;
var __propIsEnum$t = Object.prototype.propertyIsEnumerable;
var __defNormalProp$w = (obj, key, value) => key in obj ? __defProp$w(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$s = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$t.call(b, prop))
      __defNormalProp$w(a, prop, b[prop]);
  if (__getOwnPropSymbols$t)
    for (var prop of __getOwnPropSymbols$t(b)) {
      if (__propIsEnum$t.call(b, prop))
        __defNormalProp$w(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$o = (a, b) => __defProps$o(a, __getOwnPropDescs$o(b));
const convertFieldTypeTransformer = {
  id: DataTransformerID.convertFieldType,
  name: "Convert field type",
  description: "Convert a field to a specified field type.",
  defaultOptions: {
    fields: {},
    conversions: [{ targetField: void 0, destinationType: void 0, dateFormat: void 0, timezone: void 0 }]
  },
  operator: (options, ctx) => (source) => source.pipe(operators.map((data) => convertFieldTypeTransformer.transformer(options, ctx)(data))),
  transformer: (options) => (data) => {
    var _a;
    if (!Array.isArray(data) || data.length === 0) {
      return data;
    }
    return (_a = convertFieldTypes(options, data)) != null ? _a : [];
  }
};
function convertFieldTypes(options, frames) {
  if (!options.conversions.length) {
    return frames;
  }
  const framesCopy = frames.map((frame) => __spreadValues$s({}, frame));
  for (const conversion of options.conversions) {
    if (!conversion.targetField) {
      continue;
    }
    const matches = fieldMatchers.get(FieldMatcherID.byName).get(conversion.targetField);
    for (const frame of framesCopy) {
      frame.fields = frame.fields.map((field) => {
        if (matches(field, frame, framesCopy)) {
          return convertFieldType(field, conversion);
        }
        return field;
      });
    }
  }
  return framesCopy;
}
function convertFieldType(field, opts) {
  switch (opts.destinationType) {
    case FieldType.time:
      return ensureTimeField(field, opts.dateFormat);
    case FieldType.number:
      return fieldToNumberField(field);
    case FieldType.string:
      return fieldToStringField(field, opts.dateFormat, { timeZone: opts.timezone }, opts.joinWith);
    case FieldType.boolean:
      return fieldToBooleanField(field);
    case FieldType.enum:
      return fieldToEnumField(field, opts.enumConfig);
    case FieldType.other:
      return fieldToComplexField(field);
    default:
      return field;
  }
}
const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3,})?(?:Z|[-+]\d{2}:?\d{2})$/;
function fieldToTimeField(field, dateFormat) {
  let opts = dateFormat ? { format: dateFormat } : void 0;
  const timeValues = field.values.slice();
  let firstDefined = timeValues.find((v) => v != null);
  let isISO8601 = typeof firstDefined === "string" && iso8601Regex.test(firstDefined);
  for (let t = 0; t < timeValues.length; t++) {
    if (timeValues[t]) {
      let parsed = isISO8601 ? Date.parse(timeValues[t]) : dateTimeParse(timeValues[t], opts).valueOf();
      timeValues[t] = Number.isFinite(parsed) ? parsed : null;
    } else {
      timeValues[t] = null;
    }
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    type: FieldType.time,
    values: timeValues
  });
}
function fieldToNumberField(field) {
  const numValues = field.values.slice();
  const valuesAsStrings = numValues.some((v) => typeof v === "string");
  for (let n = 0; n < numValues.length; n++) {
    let toBeConverted = numValues[n];
    if (valuesAsStrings && toBeConverted != null && typeof toBeConverted === "string") {
      toBeConverted = toBeConverted.replace(/,/g, "");
    }
    const number = +toBeConverted;
    numValues[n] = Number.isFinite(number) ? number : null;
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    type: FieldType.number,
    values: numValues
  });
}
function fieldToBooleanField(field) {
  const booleanValues = field.values.slice();
  for (let b = 0; b < booleanValues.length; b++) {
    booleanValues[b] = Boolean(!!booleanValues[b]);
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    type: FieldType.boolean,
    values: booleanValues
  });
}
function fieldToStringField(field, dateFormat, parseOptions, joinWith) {
  let values = field.values;
  switch (field.type) {
    case FieldType.time:
      values = values.map((v) => dateTimeParse(v, parseOptions).format(dateFormat));
      break;
    case FieldType.other:
      values = values.map((v) => {
        if ((joinWith == null ? void 0 : joinWith.length) && Array.isArray(v)) {
          return v.join(joinWith);
        }
        return JSON.stringify(v);
      });
      break;
    default:
      values = values.map((v) => `${v}`);
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    type: FieldType.string,
    values
  });
}
function fieldToComplexField(field) {
  const complexValues = field.values.slice();
  for (let s = 0; s < complexValues.length; s++) {
    try {
      complexValues[s] = JSON.parse(complexValues[s]);
    } catch (e) {
      complexValues[s] = null;
    }
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    type: FieldType.other,
    values: complexValues
  });
}
function ensureTimeField(field, dateFormat) {
  const firstValueTypeIsNumber = typeof field.values[0] === "number";
  if (field.type === FieldType.time && firstValueTypeIsNumber) {
    return field;
  }
  if (firstValueTypeIsNumber) {
    return __spreadProps$o(__spreadValues$s({}, field), {
      type: FieldType.time
      //assumes it should be time
    });
  }
  return fieldToTimeField(field, dateFormat);
}
function fieldToEnumField(field, config) {
  const enumConfig = __spreadValues$s({}, config);
  const enumValues = field.values.slice();
  const lookup = /* @__PURE__ */ new Map();
  if (enumConfig.text && enumConfig.text.length > 0) {
    for (let i = 0; i < enumConfig.text.length; i++) {
      lookup.set(enumConfig.text[i], i);
    }
  } else {
    return field;
  }
  for (let i = 0; i < enumValues.length; i++) {
    const value = enumValues[i];
    enumValues[i] = lookup.get(value);
  }
  return __spreadProps$o(__spreadValues$s({}, field), {
    config: __spreadProps$o(__spreadValues$s({}, field.config), {
      type: {
        enum: enumConfig
      }
    }),
    type: FieldType.enum,
    values: enumValues
  });
}

var __defProp$v = Object.defineProperty;
var __defProps$n = Object.defineProperties;
var __getOwnPropDescs$n = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$s = Object.getOwnPropertySymbols;
var __hasOwnProp$s = Object.prototype.hasOwnProperty;
var __propIsEnum$s = Object.prototype.propertyIsEnumerable;
var __defNormalProp$v = (obj, key, value) => key in obj ? __defProp$v(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$r = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$s.call(b, prop))
      __defNormalProp$v(a, prop, b[prop]);
  if (__getOwnPropSymbols$s)
    for (var prop of __getOwnPropSymbols$s(b)) {
      if (__propIsEnum$s.call(b, prop))
        __defNormalProp$v(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$n = (a, b) => __defProps$n(a, __getOwnPropDescs$n(b));
const filterFieldsTransformer = {
  id: DataTransformerID.filterFields,
  name: "Filter Fields",
  description: "select a subset of fields",
  defaultOptions: {},
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (!options.include && !options.exclude) {
      return source.pipe(noopTransformer.operator({}, ctx));
    }
    if (typeof ((_a = options.include) == null ? void 0 : _a.options) === "string") {
      options.include.options = ctx.interpolate((_b = options.include) == null ? void 0 : _b.options);
    } else if (typeof ((_d = (_c = options.include) == null ? void 0 : _c.options) == null ? void 0 : _d.pattern) === "string") {
      options.include.options.pattern = ctx.interpolate((_e = options.include) == null ? void 0 : _e.options.pattern);
    }
    if (typeof ((_f = options.exclude) == null ? void 0 : _f.options) === "string") {
      options.exclude.options = ctx.interpolate((_g = options.exclude) == null ? void 0 : _g.options);
    } else if (typeof ((_i = (_h = options.exclude) == null ? void 0 : _h.options) == null ? void 0 : _i.pattern) === "string") {
      options.exclude.options.pattern = ctx.interpolate((_j = options.exclude) == null ? void 0 : _j.options.pattern);
    }
    return source.pipe(
      operators.map((data) => {
        const include = options.include ? getFieldMatcher(options.include) : null;
        const exclude = options.exclude ? getFieldMatcher(options.exclude) : null;
        const processed = [];
        for (const series of data) {
          const fields = [];
          for (let i = 0; i < series.fields.length; i++) {
            const field = series.fields[i];
            if (exclude) {
              if (exclude(field, series, data)) {
                continue;
              }
              if (!include) {
                fields.push(field);
              }
            }
            if (include && include(field, series, data)) {
              fields.push(field);
            }
          }
          if (!fields.length) {
            continue;
          }
          const copy = __spreadProps$n(__spreadValues$r({}, series), {
            // all the other properties
            fields
            // but a different set of fields
          });
          processed.push(copy);
        }
        return processed;
      })
    );
  }
};
const filterFramesTransformer = {
  id: DataTransformerID.filterFrames,
  name: "Filter Frames",
  description: "select a subset of frames",
  defaultOptions: {},
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => {
    if (!options.include && !options.exclude) {
      return source.pipe(noopTransformer.operator({}, ctx));
    }
    return source.pipe(
      operators.map((data) => {
        const include = options.include ? getFrameMatchers(options.include) : null;
        const exclude = options.exclude ? getFrameMatchers(options.exclude) : null;
        const processed = [];
        for (const series of data) {
          if (exclude) {
            if (exclude(series)) {
              continue;
            }
            if (!include) {
              processed.push(series);
            }
          }
          if (include && include(series)) {
            processed.push(series);
          }
        }
        return processed;
      })
    );
  }
};

const filterFieldsByNameTransformer = {
  id: DataTransformerID.filterFieldsByName,
  name: "Filter fields by name",
  description: "select a subset of fields",
  defaultOptions: {},
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => source.pipe(
    filterFieldsTransformer.operator(
      {
        include: getMatcherConfig(ctx, options.include, options.byVariable),
        exclude: getMatcherConfig(ctx, options.exclude, options.byVariable)
      },
      ctx
    )
  )
};
const getMatcherConfig = (ctx, options, byVariable) => {
  if (!options) {
    return void 0;
  }
  const { names, pattern, variable } = options;
  if (byVariable && variable) {
    const stringOfNames = ctx.interpolate(variable);
    if (/\{.*\}/.test(stringOfNames)) {
      const namesFromString = stringOfNames.slice(1).slice(0, -1).split(",");
      return { id: FieldMatcherID.byNames, options: { names: namesFromString } };
    }
    return { id: FieldMatcherID.byNames, options: { names: stringOfNames.split(",") } };
  }
  if ((!Array.isArray(names) || names.length === 0) && !pattern) {
    return void 0;
  }
  if (!pattern) {
    return { id: FieldMatcherID.byNames, options: { names } };
  }
  if (!Array.isArray(names) || names.length === 0) {
    return { id: FieldMatcherID.byRegexp, options: pattern };
  }
  return { id: FieldMatcherID.byRegexpOrNames, options };
};

const filterFramesByRefIdTransformer = {
  id: DataTransformerID.filterByRefId,
  name: "Filter data by query refId",
  description: "select a subset of results",
  defaultOptions: {},
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => {
    const filterOptions = {};
    if (options.include) {
      filterOptions.include = {
        id: FrameMatcherID.byRefId,
        options: options.include
      };
    }
    if (options.exclude) {
      filterOptions.exclude = {
        id: FrameMatcherID.byRefId,
        options: options.exclude
      };
    }
    return source.pipe(filterFramesTransformer.operator(filterOptions, ctx));
  }
};

const transformationsVariableSupport = () => {
  var _a, _b, _c;
  return (_c = (_b = (_a = window == null ? void 0 : window.grafanaBootData) == null ? void 0 : _a.settings) == null ? void 0 : _b.featureToggles) == null ? void 0 : _c.transformationsVariableSupport;
};
function findMaxFields(data) {
  let maxFields = 0;
  for (const frame of data) {
    if (frame.fields.length > maxFields) {
      maxFields = frame.fields.length;
    }
  }
  return maxFields;
}

var __defProp$u = Object.defineProperty;
var __defProps$m = Object.defineProperties;
var __getOwnPropDescs$m = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$r = Object.getOwnPropertySymbols;
var __hasOwnProp$r = Object.prototype.hasOwnProperty;
var __propIsEnum$r = Object.prototype.propertyIsEnumerable;
var __defNormalProp$u = (obj, key, value) => key in obj ? __defProp$u(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$q = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$r.call(b, prop))
      __defNormalProp$u(a, prop, b[prop]);
  if (__getOwnPropSymbols$r)
    for (var prop of __getOwnPropSymbols$r(b)) {
      if (__propIsEnum$r.call(b, prop))
        __defNormalProp$u(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$m = (a, b) => __defProps$m(a, __getOwnPropDescs$m(b));
const filterByValueTransformer = {
  id: DataTransformerID.filterByValue,
  name: "Filter data by values",
  description: "select a subset of results based on values",
  defaultOptions: {
    filters: [],
    type: "include" /* include */,
    match: "any" /* any */
  },
  operator: (options, ctx) => (source) => {
    const filters = options.filters;
    const matchAll = options.match === "all" /* all */;
    const include = options.type === "include" /* include */;
    if (!Array.isArray(filters) || filters.length === 0) {
      return source.pipe(noopTransformer.operator({}, ctx));
    }
    const interpolatedFilters = [];
    if (transformationsVariableSupport()) {
      interpolatedFilters.push(
        ...filters.map((filter) => {
          if (filter.config.id === ValueMatcherID.between) {
            const interpolatedFrom = ctx.interpolate(filter.config.options.from);
            const interpolatedTo = ctx.interpolate(filter.config.options.to);
            const newFilter = __spreadProps$m(__spreadValues$q({}, filter), {
              config: __spreadProps$m(__spreadValues$q({}, filter.config), {
                options: __spreadProps$m(__spreadValues$q({}, filter.config.options), {
                  to: interpolatedTo,
                  from: interpolatedFrom
                })
              })
            });
            return newFilter;
          } else if (filter.config.id === ValueMatcherID.regex) {
            return filter;
          } else if (filter.config.options.value) {
            const interpolatedValue = ctx.interpolate(filter.config.options.value);
            const newFilter = __spreadProps$m(__spreadValues$q({}, filter), {
              config: __spreadProps$m(__spreadValues$q({}, filter.config), { options: __spreadProps$m(__spreadValues$q({}, filter.config.options), { value: interpolatedValue }) })
            });
            newFilter.config.options.value = interpolatedValue;
            return newFilter;
          }
          return filter;
        })
      );
    }
    return source.pipe(
      operators.map((data) => {
        if (data.length === 0) {
          return data;
        }
        const processed = [];
        const fieldIndexByName = groupFieldIndexByName(data);
        for (const frame of data) {
          const rows = /* @__PURE__ */ new Set();
          let matchers;
          if (transformationsVariableSupport()) {
            matchers = createFilterValueMatchers(interpolatedFilters, fieldIndexByName);
          } else {
            matchers = createFilterValueMatchers(filters, fieldIndexByName);
          }
          for (let index = 0; index < frame.length; index++) {
            if (rows.has(index)) {
              continue;
            }
            let matching = true;
            for (const matcher of matchers) {
              const match = matcher(index, frame, data);
              if (!matchAll && match) {
                matching = true;
                break;
              }
              if (matchAll && !match) {
                matching = false;
                break;
              }
              matching = match;
            }
            if (matching) {
              rows.add(index);
            }
          }
          const fields = [];
          const frameLength = include ? rows.size : data[0].length - rows.size;
          for (const field of frame.fields) {
            const buffer = [];
            for (let index = 0; index < frame.length; index++) {
              if (include && rows.has(index)) {
                buffer.push(field.values[index]);
                continue;
              }
              if (!include && !rows.has(index)) {
                buffer.push(field.values[index]);
                continue;
              }
            }
            fields.push(__spreadProps$m(__spreadValues$q({}, field), {
              values: buffer,
              state: {}
            }));
          }
          processed.push(__spreadProps$m(__spreadValues$q({}, frame), {
            fields,
            length: frameLength
          }));
        }
        return processed;
      })
    );
  }
};
const createFilterValueMatchers = (filters, fieldIndexByName) => {
  const noop = () => false;
  return filters.map((filter) => {
    var _a;
    const fieldIndex = (_a = fieldIndexByName[filter.fieldName]) != null ? _a : -1;
    if (fieldIndex < 0) {
      console.warn(`[FilterByValue] Could not find index for field name: ${filter.fieldName}`);
      return noop;
    }
    const matcher = getValueMatcher(filter.config);
    return (index, frame, data) => matcher(index, frame.fields[fieldIndex], frame, data);
  });
};
const groupFieldIndexByName = (data) => {
  const lookup = {};
  for (const frame of data) {
    frame.fields.forEach((field, fieldIndex) => {
      const fieldName = getFieldDisplayName(field, frame, data);
      lookup[fieldName] = fieldIndex;
    });
  }
  return lookup;
};

var __defProp$t = Object.defineProperty;
var __defProps$l = Object.defineProperties;
var __getOwnPropDescs$l = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$q = Object.getOwnPropertySymbols;
var __hasOwnProp$q = Object.prototype.hasOwnProperty;
var __propIsEnum$q = Object.prototype.propertyIsEnumerable;
var __defNormalProp$t = (obj, key, value) => key in obj ? __defProp$t(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$p = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$q.call(b, prop))
      __defNormalProp$t(a, prop, b[prop]);
  if (__getOwnPropSymbols$q)
    for (var prop of __getOwnPropSymbols$q(b)) {
      if (__propIsEnum$q.call(b, prop))
        __defNormalProp$t(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$l = (a, b) => __defProps$l(a, __getOwnPropDescs$l(b));
const splitToCapitalWords = (input) => {
  const arr = input.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr;
};
const getFormatStringFunction = (options) => {
  return (field) => field.values.map((value) => {
    switch (options.outputFormat) {
      case "Upper Case" /* UpperCase */:
        return value.toUpperCase();
      case "Lower Case" /* LowerCase */:
        return value.toLowerCase();
      case "Sentence Case" /* SentenceCase */:
        return value.charAt(0).toUpperCase() + value.slice(1);
      case "Title Case" /* TitleCase */:
        return splitToCapitalWords(value).join(" ");
      case "Pascal Case" /* PascalCase */:
        return splitToCapitalWords(value).join("");
      case "Camel Case" /* CamelCase */:
        value = splitToCapitalWords(value).join("");
        return value.charAt(0).toLowerCase() + value.slice(1);
      case "Snake Case" /* SnakeCase */:
        return value.toLowerCase().split(" ").join("_");
      case "Kebab Case" /* KebabCase */:
        return value.toLowerCase().split(" ").join("-");
      case "Trim" /* Trim */:
        return value.trim();
      case "Substring" /* Substring */:
        return value.substring(options.substringStart, options.substringEnd);
    }
  });
};
const formatStringTransformer = {
  id: DataTransformerID.formatString,
  name: "Format string",
  description: "Manipulate string fields formatting",
  defaultOptions: { stringField: "", outputFormat: "Upper Case" /* UpperCase */ },
  isApplicable: (data) => {
    for (const frame of data) {
      for (const field of frame.fields) {
        if (field.type === "string") {
          return TransformationApplicabilityLevels.Applicable;
        }
      }
    }
    return TransformationApplicabilityLevels.NotApplicable;
  },
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      if (data.length === 0) {
        return data;
      }
      const fieldMatches = fieldMatchers.get(FieldMatcherID.byName).get(options.stringField);
      const formatStringFunction = getFormatStringFunction(options);
      const formatter = createStringFormatter(fieldMatches, formatStringFunction);
      return data.map((frame) => __spreadProps$l(__spreadValues$p({}, frame), {
        fields: formatter(frame, data)
      }));
    })
  )
};
const createStringFormatter = (fieldMatches, formatStringFunction) => (frame, allFrames) => {
  return frame.fields.map((field) => {
    if (fieldMatches(field, frame, allFrames)) {
      const newVals = formatStringFunction(field);
      return __spreadProps$l(__spreadValues$p({}, field), {
        type: FieldType.string,
        values: newVals
      });
    }
    return field;
  });
};

var __defProp$s = Object.defineProperty;
var __defProps$k = Object.defineProperties;
var __getOwnPropDescs$k = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$p = Object.getOwnPropertySymbols;
var __hasOwnProp$p = Object.prototype.hasOwnProperty;
var __propIsEnum$p = Object.prototype.propertyIsEnumerable;
var __defNormalProp$s = (obj, key, value) => key in obj ? __defProp$s(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$o = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$p.call(b, prop))
      __defNormalProp$s(a, prop, b[prop]);
  if (__getOwnPropSymbols$p)
    for (var prop of __getOwnPropSymbols$p(b)) {
      if (__propIsEnum$p.call(b, prop))
        __defNormalProp$s(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$k = (a, b) => __defProps$k(a, __getOwnPropDescs$k(b));
const formatTimeTransformer = {
  id: DataTransformerID.formatTime,
  name: "Format time",
  description: "Set the output format of a time field",
  defaultOptions: { timeField: "", outputFormat: "", useTimezone: true },
  isApplicable: (data) => {
    for (const frame of data) {
      for (const field of frame.fields) {
        if (field.type === "time") {
          return TransformationApplicabilityLevels.Applicable;
        }
      }
    }
    return TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: "The Format time transformation requires a time field to work. No time field could be found.",
  operator: (options, ctx) => (source) => source.pipe(
    operators.map((data) => {
      return applyFormatTime(options, data, ctx);
    })
  )
};
const applyFormatTime = ({ timeField, outputFormat, timezone }, data, ctx) => {
  var _a;
  if (!Array.isArray(data) || data.length === 0) {
    return data;
  }
  cacheFieldDisplayNames(data);
  outputFormat = (_a = ctx == null ? void 0 : ctx.interpolate(outputFormat)) != null ? _a : outputFormat;
  return data.map((frame) => __spreadProps$k(__spreadValues$o({}, frame), {
    fields: frame.fields.map((field) => {
      var _a2;
      if (((_a2 = field.state) == null ? void 0 : _a2.displayName) === timeField) {
        field = fieldToStringField(field, outputFormat, { timeZone: timezone });
      }
      return field;
    })
  }));
};

var __defProp$r = Object.defineProperty;
var __getOwnPropSymbols$o = Object.getOwnPropertySymbols;
var __hasOwnProp$o = Object.prototype.hasOwnProperty;
var __propIsEnum$o = Object.prototype.propertyIsEnumerable;
var __defNormalProp$r = (obj, key, value) => key in obj ? __defProp$r(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$n = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$o.call(b, prop))
      __defNormalProp$r(a, prop, b[prop]);
  if (__getOwnPropSymbols$o)
    for (var prop of __getOwnPropSymbols$o(b)) {
      if (__propIsEnum$o.call(b, prop))
        __defNormalProp$r(a, prop, b[prop]);
    }
  return a;
};
const MINIMUM_FIELDS_REQUIRED$1 = 2;
const groupByTransformer = {
  id: DataTransformerID.groupBy,
  name: "Group by",
  description: "Group the data by a field values then process calculations for each group.",
  defaultOptions: {
    fields: {}
  },
  isApplicable: (data) => {
    const maxFields = findMaxFields(data);
    return maxFields >= MINIMUM_FIELDS_REQUIRED$1 ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    const maxFields = findMaxFields(data);
    return `The Group by transformation requires a series with at least ${MINIMUM_FIELDS_REQUIRED$1} fields to work. The maximum number of fields found on a series is ${maxFields}`;
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      var _a;
      const hasValidConfig = Object.keys(options.fields).find(
        (name) => options.fields[name].operation === "groupby" /* groupBy */
      );
      if (!hasValidConfig) {
        return data;
      }
      const processed = [];
      for (const frame of data) {
        const groupByFields = frame.fields.filter((field) => shouldGroupOnField$1(field, options));
        if (groupByFields.length === 0) {
          continue;
        }
        const valuesByGroupKey = groupValuesByKey(frame, groupByFields);
        const fields = createGroupedFields(groupByFields, valuesByGroupKey);
        for (const field of frame.fields) {
          if (!shouldCalculateField$1(field, options)) {
            continue;
          }
          const fieldName = getFieldDisplayName(field);
          const aggregations = options.fields[fieldName].aggregations;
          const valuesByAggregation = {};
          valuesByGroupKey.forEach((value) => {
            const fieldWithValuesForGroup = value[fieldName];
            const results = reduceField({
              field: fieldWithValuesForGroup,
              reducers: aggregations
            });
            for (const aggregation of aggregations) {
              if (!Array.isArray(valuesByAggregation[aggregation])) {
                valuesByAggregation[aggregation] = [];
              }
              valuesByAggregation[aggregation].push(results[aggregation]);
            }
          });
          for (const aggregation of aggregations) {
            const aggregationField = {
              name: `${fieldName} (${aggregation})`,
              values: (_a = valuesByAggregation[aggregation]) != null ? _a : [],
              type: FieldType.other,
              config: {}
            };
            aggregationField.type = detectFieldType$1(aggregation, field, aggregationField);
            fields.push(aggregationField);
          }
        }
        processed.push({
          fields,
          length: valuesByGroupKey.size
        });
      }
      return processed;
    })
  )
};
const shouldGroupOnField$1 = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "groupby" /* groupBy */;
};
const shouldCalculateField$1 = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "aggregate" /* aggregate */ && Array.isArray(options == null ? void 0 : options.fields[fieldName].aggregations) && (options == null ? void 0 : options.fields[fieldName].aggregations.length) > 0;
};
function detectFieldType$1(aggregation, sourceField, targetField) {
  var _a;
  switch (aggregation) {
    case ReducerID.allIsNull:
      return FieldType.boolean;
    case ReducerID.last:
    case ReducerID.lastNotNull:
    case ReducerID.first:
    case ReducerID.firstNotNull:
      return sourceField.type;
    default:
      return (_a = guessFieldTypeForField(targetField)) != null ? _a : FieldType.string;
  }
}
function groupValuesByKey(frame, groupByFields) {
  var _a;
  const valuesByGroupKey = /* @__PURE__ */ new Map();
  for (let rowIndex = 0; rowIndex < frame.length; rowIndex++) {
    const groupKey = String(groupByFields.map((field) => field.values[rowIndex]));
    const valuesByField = (_a = valuesByGroupKey.get(groupKey)) != null ? _a : {};
    if (!valuesByGroupKey.has(groupKey)) {
      valuesByGroupKey.set(groupKey, valuesByField);
    }
    for (let field of frame.fields) {
      const fieldName = getFieldDisplayName(field);
      if (!valuesByField[fieldName]) {
        valuesByField[fieldName] = {
          name: fieldName,
          type: field.type,
          config: __spreadValues$n({}, field.config),
          values: []
        };
      }
      valuesByField[fieldName].values.push(field.values[rowIndex]);
    }
  }
  return valuesByGroupKey;
}
function createGroupedFields(groupByFields, valuesByGroupKey) {
  const fields = [];
  for (const field of groupByFields) {
    const values = [];
    const fieldName = getFieldDisplayName(field);
    valuesByGroupKey.forEach((value) => {
      values.push(value[fieldName].values[0]);
    });
    fields.push({
      name: field.name,
      type: field.type,
      config: __spreadValues$n({}, field.config),
      values
    });
  }
  return fields;
}

const SHOW_NESTED_HEADERS_DEFAULT = true;
const MINIMUM_FIELDS_REQUIRED = 2;
const groupToNestedTable = {
  id: DataTransformerID.groupToNestedTable,
  name: "Group to nested tables",
  description: "Group data by a field value and create nested tables with the grouped data",
  defaultOptions: {
    showSubframeHeaders: SHOW_NESTED_HEADERS_DEFAULT,
    fields: {}
  },
  isApplicable: (data) => {
    const maxFields = findMaxFields(data);
    return maxFields >= MINIMUM_FIELDS_REQUIRED ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    const maxFields = findMaxFields(data);
    return `The Group to nested table transformation requires a series with at least ${MINIMUM_FIELDS_REQUIRED} fields to work. The maximum number of fields found on a series is ${maxFields}`;
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      const hasValidConfig = Object.keys(options.fields).find(
        (name) => options.fields[name].operation === "groupby" /* groupBy */
      );
      if (!hasValidConfig) {
        return data;
      }
      const processed = [];
      for (const frame of data) {
        const groupByFields = frame.fields.filter((field) => shouldGroupOnField(field, options));
        if (groupByFields.length === 0) {
          continue;
        }
        const valuesByGroupKey = groupValuesByKey(frame, groupByFields);
        const fields = createGroupedFields(groupByFields, valuesByGroupKey);
        const subFrames = groupToSubframes(valuesByGroupKey, options);
        for (let i = 0; i < frame.fields.length; i++) {
          const field = frame.fields[i];
          if (!shouldCalculateField(field, options)) {
            continue;
          }
          const fieldName = getFieldDisplayName(field);
          const aggregations = options.fields[fieldName].aggregations;
          const valuesByAggregation = {};
          valuesByGroupKey.forEach((value) => {
            const fieldWithValuesForGroup = value[fieldName];
            const results = reduceField({
              field: fieldWithValuesForGroup,
              reducers: aggregations
            });
            for (const aggregation of aggregations) {
              if (!Array.isArray(valuesByAggregation[aggregation])) {
                valuesByAggregation[aggregation] = [];
              }
              valuesByAggregation[aggregation].push(results[aggregation]);
            }
          });
          for (const aggregation of aggregations) {
            const aggregationField = {
              name: `${fieldName} (${aggregation})`,
              values: valuesByAggregation[aggregation],
              type: FieldType.other,
              config: {}
            };
            aggregationField.type = detectFieldType(aggregation, field, aggregationField);
            fields.push(aggregationField);
          }
        }
        fields.push({
          config: {},
          name: "Nested frames",
          type: FieldType.nestedFrames,
          values: subFrames
        });
        processed.push({
          fields,
          length: valuesByGroupKey.size
        });
      }
      return processed;
    })
  )
};
function createSubframe(fields, frameLength, options) {
  const showHeaders = options.showSubframeHeaders === void 0 ? SHOW_NESTED_HEADERS_DEFAULT : options.showSubframeHeaders;
  return {
    meta: { custom: { noHeader: !showHeaders } },
    length: frameLength,
    fields
  };
}
const shouldGroupOnField = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "groupby" /* groupBy */;
};
const shouldCalculateField = (field, options) => {
  var _a;
  const fieldName = getFieldDisplayName(field);
  return ((_a = options == null ? void 0 : options.fields[fieldName]) == null ? void 0 : _a.operation) === "aggregate" /* aggregate */ && Array.isArray(options == null ? void 0 : options.fields[fieldName].aggregations) && (options == null ? void 0 : options.fields[fieldName].aggregations.length) > 0;
};
const detectFieldType = (aggregation, sourceField, targetField) => {
  var _a;
  switch (aggregation) {
    case ReducerID.allIsNull:
      return FieldType.boolean;
    case ReducerID.last:
    case ReducerID.lastNotNull:
    case ReducerID.first:
    case ReducerID.firstNotNull:
      return sourceField.type;
    default:
      return (_a = guessFieldTypeForField(targetField)) != null ? _a : FieldType.string;
  }
};
function groupToSubframes(valuesByGroupKey, options) {
  const subFrames = [];
  for (const [, value] of valuesByGroupKey) {
    const nestedFields = [];
    for (const [fieldName, field] of Object.entries(value)) {
      const fieldOpts = options.fields[fieldName];
      if (fieldOpts === void 0) {
        nestedFields.push(field);
      } else if (fieldOpts.aggregations === void 0 || fieldOpts.operation === "aggregate" /* aggregate */ && fieldOpts.aggregations.length === 0 || fieldOpts.operation === null || fieldOpts.operation === void 0) {
        nestedFields.push(field);
      }
    }
    if (nestedFields.length > 0) {
      subFrames.push([createSubframe(nestedFields, nestedFields[0].values.length, options)]);
    } else {
      subFrames.push([createSubframe([], 0, options)]);
    }
  }
  return subFrames;
}

var __defProp$q = Object.defineProperty;
var __defProps$j = Object.defineProperties;
var __getOwnPropDescs$j = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$n = Object.getOwnPropertySymbols;
var __hasOwnProp$n = Object.prototype.hasOwnProperty;
var __propIsEnum$n = Object.prototype.propertyIsEnumerable;
var __defNormalProp$q = (obj, key, value) => key in obj ? __defProp$q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$m = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$n.call(b, prop))
      __defNormalProp$q(a, prop, b[prop]);
  if (__getOwnPropSymbols$n)
    for (var prop of __getOwnPropSymbols$n(b)) {
      if (__propIsEnum$n.call(b, prop))
        __defNormalProp$q(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$j = (a, b) => __defProps$j(a, __getOwnPropDescs$j(b));
var _a, _b, _c;
const DEFAULT_COLUMN_FIELD = "Time";
const DEFAULT_ROW_FIELD = "Time";
const DEFAULT_VALUE_FIELD = "Value";
const DEFAULT_EMPTY_VALUE = SpecialValue.Empty;
const supportDataplaneFallback = (_c = (_b = (_a = window == null ? void 0 : window.grafanaBootData) == null ? void 0 : _a.settings) == null ? void 0 : _b.featureToggles) == null ? void 0 : _c.dataplaneFrontendFallback;
const groupingToMatrixTransformer = {
  id: DataTransformerID.groupingToMatrix,
  name: "Grouping to Matrix",
  description: "Groups series by field and return a matrix visualisation",
  defaultOptions: {
    columnField: DEFAULT_COLUMN_FIELD,
    rowField: DEFAULT_ROW_FIELD,
    valueField: DEFAULT_VALUE_FIELD
  },
  /**
   * Grouping to matrix requires at least 3 fields to work.
   */
  isApplicable: (data) => {
    let numFields = 0;
    for (const frame of data) {
      numFields += frame.fields.length;
    }
    return numFields >= 3 ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    let numFields = 0;
    for (const frame of data) {
      numFields += frame.fields.length;
    }
    return `Grouping to matrix requiers at least 3 fields to work. Currently there are ${numFields} fields.`;
  },
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      var _a2;
      const columnFieldMatch = options.columnField || DEFAULT_COLUMN_FIELD;
      const rowFieldMatch = options.rowField || DEFAULT_ROW_FIELD;
      const valueFieldMatch = options.valueField || DEFAULT_VALUE_FIELD;
      const emptyValue = options.emptyValue || DEFAULT_EMPTY_VALUE;
      if (data.length !== 1) {
        return data;
      }
      const frame = data[0];
      const keyColumnField = findKeyField(frame, columnFieldMatch);
      const keyRowField = findKeyField(frame, rowFieldMatch);
      const valueField = findKeyField(frame, valueFieldMatch);
      const rowColumnField = `${rowFieldMatch}\\${columnFieldMatch}`;
      if (!keyColumnField || !keyRowField || !valueField) {
        return data;
      }
      const columnValues = uniqueValues(keyColumnField.values);
      const rowValues = uniqueValues(keyRowField.values);
      const matrixValues = {};
      for (let index = 0; index < valueField.values.length; index++) {
        const columnName = keyColumnField.values[index];
        const rowName = keyRowField.values[index];
        const value = valueField.values[index];
        if (!matrixValues[columnName]) {
          matrixValues[columnName] = {};
        }
        matrixValues[columnName][rowName] = value;
      }
      const fields = [
        {
          name: rowColumnField,
          values: rowValues,
          type: FieldType.string,
          config: {}
        }
      ];
      for (const columnName of columnValues) {
        let values = [];
        for (const rowName of rowValues) {
          const value = (_a2 = matrixValues[columnName][rowName]) != null ? _a2 : getSpecialValue(emptyValue);
          values.push(value);
        }
        if (supportDataplaneFallback && typeof columnName === "number") {
          valueField.config = __spreadProps$j(__spreadValues$m({}, valueField.config), { displayNameFromDS: void 0 });
        }
        fields.push({
          name: columnName.toString(),
          values,
          config: valueField.config,
          type: valueField.type
        });
      }
      return [
        {
          fields,
          length: rowValues.length
        }
      ];
    })
  )
};
function uniqueValues(values) {
  const unique = /* @__PURE__ */ new Set();
  for (let index = 0; index < values.length; index++) {
    unique.add(values[index]);
  }
  return Array.from(unique);
}
function findKeyField(frame, matchTitle) {
  for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
    const field = frame.fields[fieldIndex];
    let matches;
    if (supportDataplaneFallback) {
      const matcher = fieldMatchers.get(FieldMatcherID.byName).get(matchTitle);
      matches = matcher(field, frame, [frame]);
    } else {
      matches = matchTitle === getFieldDisplayName(field);
    }
    if (matches) {
      return field;
    }
  }
  return null;
}
function getSpecialValue(specialValue) {
  switch (specialValue) {
    case SpecialValue.False:
      return false;
    case SpecialValue.True:
      return true;
    case SpecialValue.Null:
      return null;
    case SpecialValue.Empty:
    default:
      return "";
  }
}

var __defProp$p = Object.defineProperty;
var __defProps$i = Object.defineProperties;
var __getOwnPropDescs$i = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$m = Object.getOwnPropertySymbols;
var __hasOwnProp$m = Object.prototype.hasOwnProperty;
var __propIsEnum$m = Object.prototype.propertyIsEnumerable;
var __defNormalProp$p = (obj, key, value) => key in obj ? __defProp$p(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$l = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$m.call(b, prop))
      __defNormalProp$p(a, prop, b[prop]);
  if (__getOwnPropSymbols$m)
    for (var prop of __getOwnPropSymbols$m(b)) {
      if (__propIsEnum$m.call(b, prop))
        __defNormalProp$p(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$i = (a, b) => __defProps$i(a, __getOwnPropDescs$i(b));
function nullToValue(frame) {
  return __spreadProps$i(__spreadValues$l({}, frame), {
    fields: frame.fields.map((field) => {
      const noValue = Number(field.config.noValue);
      if (!Number.isNaN(noValue)) {
        return nullToValueField(field, noValue);
      } else {
        return field;
      }
    })
  });
}
function nullToValueField(field, noValue) {
  const transformedVals = field.values.slice();
  for (let i = 0; i < transformedVals.length; i++) {
    if (transformedVals[i] === null) {
      transformedVals[i] = noValue;
    }
  }
  return __spreadProps$i(__spreadValues$l({}, field), {
    values: transformedVals
  });
}

var __defProp$o = Object.defineProperty;
var __defProps$h = Object.defineProperties;
var __getOwnPropDescs$h = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$l = Object.getOwnPropertySymbols;
var __hasOwnProp$l = Object.prototype.hasOwnProperty;
var __propIsEnum$l = Object.prototype.propertyIsEnumerable;
var __defNormalProp$o = (obj, key, value) => key in obj ? __defProp$o(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$k = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$l.call(b, prop))
      __defNormalProp$o(a, prop, b[prop]);
  if (__getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(b)) {
      if (__propIsEnum$l.call(b, prop))
        __defNormalProp$o(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$h = (a, b) => __defProps$h(a, __getOwnPropDescs$h(b));
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
  operator: (options, ctx) => (source) => source.pipe(operators.map((data) => histogramTransformer.transformer(options, ctx)(data))),
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
      xMin: __spreadProps$h(__spreadValues$k({}, yMinField), {
        name: "xMin",
        values: uniqueMins
      }),
      xMax: __spreadProps$h(__spreadValues$k({}, yMaxField), {
        name: "xMax",
        values: uniqueMaxs
      }),
      counts: [
        __spreadProps$h(__spreadValues$k({}, countField), {
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
      xMin: __spreadProps$h(__spreadValues$k({}, frame.fields[1]), {
        name: "xMin",
        type: FieldType.string,
        values: minVals
      }),
      xMax: __spreadProps$h(__spreadValues$k({}, frame.fields[1]), {
        name: "xMax",
        type: FieldType.string,
        values: maxVals
      }),
      counts: [
        __spreadProps$h(__spreadValues$k({}, frame.fields[1]), {
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
    xMax = __spreadProps$h(__spreadValues$k({}, xMin), {
      name: histogramFrameBucketMaxFieldName,
      values: vals.map((v) => v + bucketSize)
    });
  }
  if (!xMin && xMax && (xMax == null ? void 0 : xMax.values.length) > 1) {
    let vals = xMax.values;
    let bucketSize = roundDecimals(vals[1] - vals[0], 6);
    xMin = __spreadProps$h(__spreadValues$k({}, xMax), {
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
    return __spreadProps$h(__spreadValues$k({}, frame), {
      fields: frame.fields.map((field) => {
        if (field.type === FieldType.number) {
          const noValue = Number(field.config.noValue);
          if (!Number.isNaN(noValue)) {
            field = nullToValueField(field, noValue);
          } else {
            field = __spreadProps$h(__spreadValues$k({}, field), { values: field.values.filter((v) => v != null) });
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
        counts.push(__spreadProps$h(__spreadValues$k({}, field), {
          config: __spreadProps$h(__spreadValues$k({}, field.config), {
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
    config: bucketDecimals === 0 ? config != null ? config : {} : __spreadProps$h(__spreadValues$k({}, config), {
      decimals: bucketDecimals
    })
  };
  const xMax = __spreadProps$h(__spreadValues$k({}, xMin), {
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
      __spreadProps$h(__spreadValues$k({}, counts[0]), {
        name: "count",
        values: vals,
        type: FieldType.number,
        state: __spreadProps$h(__spreadValues$k({}, counts[0].state), {
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

var __defProp$n = Object.defineProperty;
var __defProps$g = Object.defineProperties;
var __getOwnPropDescs$g = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$k = Object.getOwnPropertySymbols;
var __hasOwnProp$k = Object.prototype.hasOwnProperty;
var __propIsEnum$k = Object.prototype.propertyIsEnumerable;
var __defNormalProp$n = (obj, key, value) => key in obj ? __defProp$n(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$j = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$k.call(b, prop))
      __defNormalProp$n(a, prop, b[prop]);
  if (__getOwnPropSymbols$k)
    for (var prop of __getOwnPropSymbols$k(b)) {
      if (__propIsEnum$k.call(b, prop))
        __defNormalProp$n(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$g = (a, b) => __defProps$g(a, __getOwnPropDescs$g(b));
const labelsToFieldsTransformer = {
  id: DataTransformerID.labelsToFields,
  name: "Labels to fields",
  description: "Extract time series labels to fields (columns or rows)",
  defaultOptions: {},
  operator: (options, ctx) => (source) => source.pipe(operators.map((data) => labelsToFieldsTransformer.transformer(options, ctx)(data))),
  transformer: (options) => (data) => {
    var _a, _b;
    if (options.mode === "rows" /* Rows */) {
      return convertLabelsToRows(data, options.keepLabels);
    }
    const result = [];
    const keepLabels = ((_a = options.keepLabels) == null ? void 0 : _a.length) ? new Set(options.keepLabels) : void 0;
    for (const frame of data) {
      const newFields = [];
      const uniqueLabels = {};
      for (const field of frame.fields) {
        if (!field.labels) {
          newFields.push(field);
          continue;
        }
        const sansLabels = __spreadProps$g(__spreadValues$j({}, field), {
          config: __spreadProps$g(__spreadValues$j({}, field.config), {
            // we need to clear these for this transform as these can contain label names that we no longer want
            displayName: void 0,
            displayNameFromDS: void 0
          }),
          labels: void 0
        });
        newFields.push(sansLabels);
        for (const labelName of Object.keys(field.labels)) {
          if (keepLabels && !keepLabels.has(labelName)) {
            continue;
          }
          if (options.valueLabel === labelName) {
            sansLabels.name = field.labels[labelName];
            continue;
          }
          const uniqueValues = (_b = uniqueLabels[labelName]) != null ? _b : uniqueLabels[labelName] = /* @__PURE__ */ new Set();
          uniqueValues.add(field.labels[labelName]);
        }
      }
      for (const name in uniqueLabels) {
        for (const value of uniqueLabels[name]) {
          const values = new Array(frame.length).fill(value);
          newFields.push({
            name,
            type: FieldType.string,
            values,
            config: {}
          });
        }
      }
      result.push(__spreadProps$g(__spreadValues$j({}, frame), {
        fields: newFields,
        length: frame.length
      }));
    }
    return result;
  }
};
function convertLabelsToRows(data, keepLabels) {
  const result = [];
  for (const frame of data) {
    for (const field of frame.fields) {
      if (field.labels) {
        const keys = [];
        const vals = [];
        if (keepLabels) {
          for (const key of keepLabels) {
            keys.push(key);
            vals.push(field.labels[key]);
          }
        } else {
          for (const [key, val] of Object.entries(field.labels)) {
            keys.push(key);
            vals.push(val);
          }
        }
        if (vals.length) {
          result.push(__spreadProps$g(__spreadValues$j({}, frame), {
            name: getFieldDisplayName(field, frame, data),
            fields: [
              { name: "label", type: FieldType.string, config: {}, values: keys },
              { name: "value", type: FieldType.string, config: {}, values: vals }
            ],
            length: vals.length
          }));
        }
      }
    }
  }
  return result;
}

var __defProp$m = Object.defineProperty;
var __defProps$f = Object.defineProperties;
var __getOwnPropDescs$f = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$j = Object.getOwnPropertySymbols;
var __hasOwnProp$j = Object.prototype.hasOwnProperty;
var __propIsEnum$j = Object.prototype.propertyIsEnumerable;
var __defNormalProp$m = (obj, key, value) => key in obj ? __defProp$m(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$i = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$j.call(b, prop))
      __defNormalProp$m(a, prop, b[prop]);
  if (__getOwnPropSymbols$j)
    for (var prop of __getOwnPropSymbols$j(b)) {
      if (__propIsEnum$j.call(b, prop))
        __defNormalProp$m(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$f = (a, b) => __defProps$f(a, __getOwnPropDescs$f(b));
const DEFAULT_LIMIT_FIELD = 10;
const limitTransformer = {
  id: DataTransformerID.limit,
  name: "Limit",
  description: "Limit the number of items to the top N",
  defaultOptions: {
    limitField: DEFAULT_LIMIT_FIELD
  },
  operator: (options, ctx) => (source) => source.pipe(
    operators.map((data) => {
      let limit = DEFAULT_LIMIT_FIELD;
      if (options.limitField !== void 0) {
        if (typeof options.limitField === "string") {
          if (transformationsVariableSupport()) {
            limit = parseInt(ctx.interpolate(options.limitField), 10);
          } else {
            limit = parseInt(options.limitField, 10);
          }
        } else {
          limit = options.limitField;
        }
      }
      return data.map((frame) => {
        if (frame.length > limit) {
          return __spreadProps$f(__spreadValues$i({}, frame), {
            fields: frame.fields.map((f) => {
              return __spreadProps$f(__spreadValues$i({}, f), {
                values: f.values.slice(0, limit)
              });
            }),
            length: limit
          });
        }
        return frame;
      });
    })
  )
};

var __defProp$l = Object.defineProperty;
var __defProps$e = Object.defineProperties;
var __getOwnPropDescs$e = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$i = Object.getOwnPropertySymbols;
var __hasOwnProp$i = Object.prototype.hasOwnProperty;
var __propIsEnum$i = Object.prototype.propertyIsEnumerable;
var __defNormalProp$l = (obj, key, value) => key in obj ? __defProp$l(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$h = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$i.call(b, prop))
      __defNormalProp$l(a, prop, b[prop]);
  if (__getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(b)) {
      if (__propIsEnum$i.call(b, prop))
        __defNormalProp$l(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$e = (a, b) => __defProps$e(a, __getOwnPropDescs$e(b));
const mergeTransformer = {
  id: DataTransformerID.merge,
  name: "Merge series/tables",
  description: "Merges multiple series/tables into a single serie/table",
  defaultOptions: {},
  isApplicable: (data) => {
    return data.length > 1 ? TransformationApplicabilityLevels.Applicable : TransformationApplicabilityLevels.NotApplicable;
  },
  isApplicableDescription: (data) => {
    return `The merge transformation requires at least 2 data series to work. There is currently ${data.length} data series.`;
  },
  operator: (options) => (source) => source.pipe(
    operators.map((dataFrames) => {
      if (!Array.isArray(dataFrames) || dataFrames.length <= 1) {
        return dataFrames;
      }
      const data = dataFrames.filter((frame) => frame.fields.length > 0);
      if (data.length === 0) {
        return [dataFrames[0]];
      }
      const fieldNames = /* @__PURE__ */ new Set();
      const fieldIndexByName = {};
      const fieldNamesForKey = [];
      const dataFrame = new MutableDataFrame();
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let fieldIndex = 0; fieldIndex < frame.fields.length; fieldIndex++) {
          const field = frame.fields[fieldIndex];
          if (!fieldNames.has(field.name)) {
            dataFrame.addField(copyFieldStructure$1(field));
            fieldNames.add(field.name);
          }
          fieldIndexByName[field.name] = fieldIndexByName[field.name] || {};
          fieldIndexByName[field.name][frameIndex] = fieldIndex;
          if (data.length - 1 !== frameIndex) {
            continue;
          }
          if (fieldExistsInAllFrames(fieldIndexByName, field, data)) {
            fieldNamesForKey.push(field.name);
          }
        }
      }
      if (fieldNamesForKey.length === 0) {
        return dataFrames;
      }
      const valuesByKey = {};
      const valuesInOrder = [];
      const keyFactory = createKeyFactory(data, fieldIndexByName, fieldNamesForKey);
      const valueMapper = createValueMapper(data, fieldNames, fieldIndexByName);
      for (let frameIndex = 0; frameIndex < data.length; frameIndex++) {
        const frame = data[frameIndex];
        for (let valueIndex = 0; valueIndex < frame.length; valueIndex++) {
          const key = keyFactory(frameIndex, valueIndex);
          const value = valueMapper(frameIndex, valueIndex);
          if (!Array.isArray(valuesByKey[key])) {
            valuesByKey[key] = [value];
            valuesInOrder.push(createPointer(key, valuesByKey));
            continue;
          }
          let valueWasMerged = false;
          valuesByKey[key] = valuesByKey[key].map((existing) => {
            if (!isMergable(existing, value)) {
              return existing;
            }
            valueWasMerged = true;
            return __spreadValues$h(__spreadValues$h({}, existing), value);
          });
          if (!valueWasMerged) {
            valuesByKey[key].push(value);
            valuesInOrder.push(createPointer(key, valuesByKey));
          }
        }
      }
      for (const pointer of valuesInOrder) {
        const value = valuesByKey[pointer.key][pointer.index];
        if (value) {
          dataFrame.add(value);
        }
      }
      return [dataFrame];
    })
  )
};
const copyFieldStructure$1 = (field) => {
  return __spreadProps$e(__spreadValues$h({}, lodash.omit(field, ["values", "state", "labels", "config"])), {
    values: [],
    config: __spreadValues$h({}, lodash.omit(field.config, "displayName"))
  });
};
const createKeyFactory = (data, fieldPointerByName, keyFieldNames) => {
  const factoryIndex = keyFieldNames.reduce((index, fieldName) => {
    return Object.keys(fieldPointerByName[fieldName]).reduce((index2, frameIndex) => {
      index2[frameIndex] = index2[frameIndex] || [];
      index2[frameIndex].push(fieldPointerByName[fieldName][frameIndex]);
      return index2;
    }, index);
  }, {});
  return (frameIndex, valueIndex) => {
    return factoryIndex[frameIndex].reduce((key, fieldIndex) => {
      return key + data[frameIndex].fields[fieldIndex].values[valueIndex];
    }, "");
  };
};
const createValueMapper = (data, fieldByName, fieldIndexByName) => {
  return (frameIndex, valueIndex) => {
    const value = {};
    const fieldNames = Array.from(fieldByName);
    for (const fieldName of fieldNames) {
      const fieldIndexByFrameIndex = fieldIndexByName[fieldName];
      if (!fieldIndexByFrameIndex) {
        continue;
      }
      const fieldIndex = fieldIndexByFrameIndex[frameIndex];
      if (typeof fieldIndex !== "number") {
        continue;
      }
      const frame = data[frameIndex];
      if (!frame || !frame.fields) {
        continue;
      }
      const field = frame.fields[fieldIndex];
      if (!field || !field.values) {
        continue;
      }
      value[fieldName] = field.values[valueIndex];
    }
    return value;
  };
};
const isMergable = (existing, value) => {
  let mergable = true;
  for (const prop in value) {
    if (typeof existing[prop] === "undefined") {
      continue;
    }
    if (existing[prop] === null) {
      continue;
    }
    if (existing[prop] !== value[prop]) {
      mergable = false;
      break;
    }
  }
  return mergable;
};
const fieldExistsInAllFrames = (fieldIndexByName, field, data) => {
  return Object.keys(fieldIndexByName[field.name]).length === data.length;
};
const createPointer = (key, valuesByKey) => {
  return {
    key,
    index: valuesByKey[key].length - 1
  };
};

var __defProp$k = Object.defineProperty;
var __defProps$d = Object.defineProperties;
var __getOwnPropDescs$d = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$h = Object.getOwnPropertySymbols;
var __hasOwnProp$h = Object.prototype.hasOwnProperty;
var __propIsEnum$h = Object.prototype.propertyIsEnumerable;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$g = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$h.call(b, prop))
      __defNormalProp$k(a, prop, b[prop]);
  if (__getOwnPropSymbols$h)
    for (var prop of __getOwnPropSymbols$h(b)) {
      if (__propIsEnum$h.call(b, prop))
        __defNormalProp$k(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$d = (a, b) => __defProps$d(a, __getOwnPropDescs$d(b));
const orderFieldsTransformer = {
  id: DataTransformerID.order,
  name: "Order fields by name",
  description: "Order fields based on configuration given by user",
  defaultOptions: {
    indexByName: {}
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      const orderer = createFieldsOrderer(options.indexByName);
      if (!Array.isArray(data) || data.length === 0) {
        return data;
      }
      return data.map((frame) => __spreadProps$d(__spreadValues$g({}, frame), {
        fields: orderer(frame.fields, data, frame)
      }));
    })
  )
};
const createOrderFieldsComparer = (indexByName) => (a, b) => {
  return indexOfField(a, indexByName) - indexOfField(b, indexByName);
};
const createFieldsOrderer = (indexByName) => (fields, data, frame) => {
  if (!Array.isArray(fields) || fields.length === 0) {
    return fields;
  }
  if (!indexByName || Object.keys(indexByName).length === 0) {
    return fields;
  }
  const comparer = createOrderFieldsComparer(indexByName);
  return lodash.clone(fields).sort(
    (a, b) => comparer(getFieldDisplayName(a, frame, data), getFieldDisplayName(b, frame, data))
  );
};
const indexOfField = (fieldName, indexByName) => {
  if (Number.isInteger(indexByName[fieldName])) {
    return indexByName[fieldName];
  }
  return Number.MAX_SAFE_INTEGER;
};

var __defProp$j = Object.defineProperty;
var __defProps$c = Object.defineProperties;
var __getOwnPropDescs$c = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$f = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$g.call(b, prop))
      __defNormalProp$j(a, prop, b[prop]);
  if (__getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(b)) {
      if (__propIsEnum$g.call(b, prop))
        __defNormalProp$j(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$c = (a, b) => __defProps$c(a, __getOwnPropDescs$c(b));
const renameFieldsTransformer = {
  id: DataTransformerID.rename,
  name: "Rename fields by name",
  description: "Rename fields based on configuration given by user",
  defaultOptions: {
    renameByName: {}
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      const renamer = createRenamer(options.renameByName);
      if (!Array.isArray(data) || data.length === 0) {
        return data;
      }
      return data.map((frame) => __spreadProps$c(__spreadValues$f({}, frame), {
        fields: renamer(frame)
      }));
    })
  )
};
const createRenamer = (renameByName) => (frame) => {
  if (!renameByName || Object.keys(renameByName).length === 0) {
    return frame.fields;
  }
  return frame.fields.map((field) => {
    const displayName = getFieldDisplayName(field, frame);
    const renameTo = renameByName[displayName];
    if (typeof renameTo !== "string" || renameTo.length === 0) {
      return field;
    }
    return __spreadProps$c(__spreadValues$f({}, field), {
      config: __spreadProps$c(__spreadValues$f({}, field.config), {
        displayName: renameTo
      }),
      state: __spreadProps$c(__spreadValues$f({}, field.state), {
        displayName: renameTo
      })
    });
  });
};

const organizeFieldsTransformer = {
  id: DataTransformerID.organize,
  name: "Organize fields by name",
  description: "Order, filter and rename fields based on configuration given by user",
  defaultOptions: {
    excludeByName: {},
    indexByName: {},
    renameByName: {},
    includeByName: {}
  },
  isApplicable: (data) => {
    return data.length > 1 ? TransformationApplicabilityLevels.NotPossible : TransformationApplicabilityLevels.Applicable;
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => source.pipe(
    filterFieldsByNameTransformer.operator(
      {
        include: options.includeByName ? { names: mapToExcludeArray(options.includeByName) } : void 0,
        exclude: { names: mapToExcludeArray(options.excludeByName) }
      },
      ctx
    ),
    orderFieldsTransformer.operator(options, ctx),
    renameFieldsTransformer.operator(options, ctx)
  )
};
const mapToExcludeArray = (excludeByName) => {
  if (!excludeByName) {
    return [];
  }
  return Object.keys(excludeByName).filter((name) => excludeByName[name]);
};

var __defProp$i = Object.defineProperty;
var __defProps$b = Object.defineProperties;
var __getOwnPropDescs$b = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
var __hasOwnProp$f = Object.prototype.hasOwnProperty;
var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
var __defNormalProp$i = (obj, key, value) => key in obj ? __defProp$i(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$e = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$f.call(b, prop))
      __defNormalProp$i(a, prop, b[prop]);
  if (__getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(b)) {
      if (__propIsEnum$f.call(b, prop))
        __defNormalProp$i(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$b = (a, b) => __defProps$b(a, __getOwnPropDescs$b(b));
const reduceTransformer = {
  id: DataTransformerID.reduce,
  name: "Reduce",
  description: "Reduce all rows or data points to a single value using a function like max, min, mean or last.",
  defaultOptions: {
    reducers: [ReducerID.max]
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      var _a;
      if (!((_a = options == null ? void 0 : options.reducers) == null ? void 0 : _a.length)) {
        return data;
      }
      const matcher = options.fields ? getFieldMatcher(options.fields) : options.includeTimeField && options.mode === "reduceFields" /* ReduceFields */ ? alwaysFieldMatcher : notTimeFieldMatcher;
      if (options.mode === "reduceFields" /* ReduceFields */) {
        return reduceFields(data, matcher, options.reducers);
      }
      const res = reduceSeriesToRows(data, matcher, options.reducers, options.labelsToFields);
      return res ? [res] : [];
    })
  )
};
function reduceSeriesToRows(data, matcher, reducerId, labelsToFields) {
  const calculators = fieldReducers.list(reducerId);
  const reducers = calculators.map((c) => c.id);
  const processed = [];
  const distinctLabels = labelsToFields ? getDistinctLabelKeys(data) : [];
  for (const series of data) {
    const source = series.fields.filter((f) => matcher(f, series, data));
    const size = source.length;
    const fields = [];
    const names = new Array(size);
    fields.push({
      name: "Field",
      type: FieldType.string,
      values: names,
      config: {}
    });
    const labels = {};
    if (labelsToFields) {
      for (const key of distinctLabels) {
        labels[key] = new Array(size);
        fields.push({
          name: key,
          type: FieldType.string,
          values: labels[key],
          config: {}
        });
      }
    }
    const calcs = {};
    for (const info of calculators) {
      calcs[info.id] = new Array(size);
      fields.push({
        name: info.name,
        type: FieldType.other,
        // UNKNOWN until after we call the functions
        values: calcs[info.id],
        config: {}
      });
    }
    for (let i = 0; i < source.length; i++) {
      const field = source[i];
      const results = reduceField({
        field,
        reducers
      });
      if (labelsToFields) {
        names[i] = field.name;
        if (field.labels) {
          for (const key in field.labels) {
            labels[key][i] = field.labels[key];
          }
        }
      } else {
        names[i] = getFieldDisplayName(field, series, data);
      }
      for (const info of calculators) {
        const v = results[info.id];
        calcs[info.id][i] = v;
      }
    }
    for (const f of fields) {
      if (f.type === FieldType.other) {
        const t = guessFieldTypeForField(f);
        if (t) {
          f.type = t;
        }
      }
    }
    processed.push(__spreadProps$b(__spreadValues$e({}, series), {
      // Same properties, different fields
      fields,
      length: size
    }));
  }
  return mergeResults(processed);
}
function getDistinctLabelKeys(frames) {
  const keys = /* @__PURE__ */ new Set();
  for (const frame of frames) {
    for (const field of frame.fields) {
      if (field.labels) {
        for (const k of Object.keys(field.labels)) {
          keys.add(k);
        }
      }
    }
  }
  return [...keys];
}
function mergeResults(data) {
  if (!(data == null ? void 0 : data.length)) {
    return void 0;
  }
  const baseFrame = data[0];
  for (let seriesIndex = 1; seriesIndex < data.length; seriesIndex++) {
    const series = data[seriesIndex];
    for (let baseIndex = 0; baseIndex < baseFrame.fields.length; baseIndex++) {
      const baseField = baseFrame.fields[baseIndex];
      for (let fieldIndex = 0; fieldIndex < series.fields.length; fieldIndex++) {
        const field = series.fields[fieldIndex];
        const isFirstField = baseIndex === 0 && fieldIndex === 0;
        const isSameField = baseField.type === field.type && baseField.name === field.name;
        if (isFirstField || isSameField) {
          const baseValues = baseField.values;
          const values = field.values;
          baseField.values = baseValues.concat(values);
        }
      }
    }
  }
  baseFrame.name = void 0;
  baseFrame.length = baseFrame.fields[0].values.length;
  return baseFrame;
}
function reduceFields(data, matcher, reducerId) {
  const calculators = fieldReducers.list(reducerId);
  const reducers = calculators.map((c) => c.id);
  const processed = [];
  for (const series of data) {
    const fields = [];
    for (const field of series.fields) {
      if (matcher(field, series, data)) {
        const results = reduceField({
          field,
          reducers
        });
        for (const reducer of reducers) {
          const value = results[reducer];
          const copy = __spreadProps$b(__spreadValues$e({}, field), {
            type: getFieldType(reducer, field),
            values: [value]
          });
          copy.state = void 0;
          if (reducers.length > 1) {
            if (!copy.labels) {
              copy.labels = {};
            }
            copy.labels["reducer"] = fieldReducers.get(reducer).name;
          }
          fields.push(copy);
        }
      }
    }
    if (fields.length) {
      processed.push(__spreadProps$b(__spreadValues$e({}, series), {
        fields,
        length: 1
        // always one row
      }));
    }
  }
  return processed;
}
function getFieldType(reducer, field) {
  switch (reducer) {
    case ReducerID.allValues:
    case ReducerID.uniqueValues:
      return FieldType.other;
    case ReducerID.first:
    case ReducerID.firstNotNull:
    case ReducerID.last:
    case ReducerID.lastNotNull:
      return field.type;
    default:
      return FieldType.number;
  }
}

var __defProp$h = Object.defineProperty;
var __defProps$a = Object.defineProperties;
var __getOwnPropDescs$a = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
var __hasOwnProp$e = Object.prototype.hasOwnProperty;
var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$d = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$e.call(b, prop))
      __defNormalProp$h(a, prop, b[prop]);
  if (__getOwnPropSymbols$e)
    for (var prop of __getOwnPropSymbols$e(b)) {
      if (__propIsEnum$e.call(b, prop))
        __defNormalProp$h(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$a = (a, b) => __defProps$a(a, __getOwnPropDescs$a(b));
const renameByRegexTransformer = {
  id: DataTransformerID.renameByRegex,
  name: "Rename fields by regex",
  description: "Rename fields based on regular expression by users.",
  defaultOptions: {
    regex: "(.*)",
    renamePattern: "$1"
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        return data;
      }
      return data.map(renameFieldsByRegex(options));
    })
  )
};
const renameFieldsByRegex = (options) => (frame) => {
  const regex = stringToJsRegex(options.regex);
  const fields = frame.fields.map((field) => {
    const displayName = getFieldDisplayName(field, frame);
    if (!regex.test(displayName)) {
      return field;
    }
    const newDisplayName = displayName.replace(regex, options.renamePattern);
    return __spreadProps$a(__spreadValues$d({}, field), {
      config: __spreadProps$a(__spreadValues$d({}, field.config), { displayName: newDisplayName }),
      state: __spreadProps$a(__spreadValues$d({}, field.state), { displayName: newDisplayName })
    });
  });
  return __spreadProps$a(__spreadValues$d({}, frame), { fields });
};

var __defProp$g = Object.defineProperty;
var __defProps$9 = Object.defineProperties;
var __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$c = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$d.call(b, prop))
      __defNormalProp$g(a, prop, b[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b)) {
      if (__propIsEnum$d.call(b, prop))
        __defNormalProp$g(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$9 = (a, b) => __defProps$9(a, __getOwnPropDescs$9(b));
const seriesToRowsTransformer = {
  id: DataTransformerID.seriesToRows,
  name: "Series to rows",
  description: "Combines multiple series into a single serie and appends a column with metric name per value.",
  defaultOptions: {},
  operator: (options) => (source) => source.pipe(
    operators.map((data) => {
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
  return __spreadProps$9(__spreadValues$c({}, lodash.omit(field, ["values", "state", "labels", "config", "name"])), {
    name,
    values: [],
    config: __spreadValues$c({}, lodash.omit(field.config, ["displayName", "displayNameFromDS"]))
  });
};

var __defProp$f = Object.defineProperty;
var __defProps$8 = Object.defineProperties;
var __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$c.call(b, prop))
      __defNormalProp$f(a, prop, b[prop]);
  if (__getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(b)) {
      if (__propIsEnum$c.call(b, prop))
        __defNormalProp$f(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$8 = (a, b) => __defProps$8(a, __getOwnPropDescs$8(b));
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
    operators.map((data) => {
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
      return __spreadProps$8(__spreadValues$b({}, s), {
        index: frame.fields.findIndex((f) => ctx.interpolate(s.field) === getFieldDisplayName(f, frame))
      });
    }
    return __spreadProps$8(__spreadValues$b({}, s), {
      index: frame.fields.findIndex((f) => s.field === getFieldDisplayName(f, frame))
    });
  });
}

const standardTransformers = {
  noopTransformer,
  filterFieldsTransformer,
  filterFieldsByNameTransformer,
  filterFramesTransformer,
  filterFramesByRefIdTransformer,
  filterByValueTransformer,
  formatStringTransformer,
  formatTimeTransformer,
  orderFieldsTransformer,
  organizeFieldsTransformer,
  reduceTransformer,
  concatenateTransformer,
  calculateFieldTransformer,
  joinByFieldTransformer,
  /** @deprecated */
  seriesToColumnsTransformer: joinByFieldTransformer,
  seriesToRowsTransformer,
  renameFieldsTransformer,
  labelsToFieldsTransformer,
  ensureColumnsTransformer,
  groupByTransformer,
  sortByTransformer,
  mergeTransformer,
  renameByRegexTransformer,
  histogramTransformer,
  convertFieldTypeTransformer,
  groupingToMatrixTransformer,
  limitTransformer,
  groupToNestedTable
};

var TransformerCategory = /* @__PURE__ */ ((TransformerCategory2) => {
  TransformerCategory2["Combine"] = "combine";
  TransformerCategory2["CalculateNewFields"] = "calculateNewFields";
  TransformerCategory2["CreateNewVisualization"] = "createNewVisualization";
  TransformerCategory2["Filter"] = "filter";
  TransformerCategory2["PerformSpatialOperations"] = "performSpatialOperations";
  TransformerCategory2["Reformat"] = "reformat";
  TransformerCategory2["ReorderAndRename"] = "reorderAndRename";
  return TransformerCategory2;
})(TransformerCategory || {});
const standardTransformersRegistry = new Registry();

var __defProp$e = Object.defineProperty;
var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
var __hasOwnProp$b = Object.prototype.hasOwnProperty;
var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$a = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$b.call(b, prop))
      __defNormalProp$e(a, prop, b[prop]);
  if (__getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(b)) {
      if (__propIsEnum$b.call(b, prop))
        __defNormalProp$e(a, prop, b[prop]);
    }
  return a;
};
const getOperator = (config, ctx) => (source) => {
  var _a, _b;
  const info = standardTransformersRegistry.get(config.id);
  if (!info) {
    return source;
  }
  const defaultOptions = (_a = info.transformation.defaultOptions) != null ? _a : {};
  const options = __spreadValues$a(__spreadValues$a({}, defaultOptions), config.options);
  const matcher = ((_b = config.filter) == null ? void 0 : _b.options) ? getFrameMatchers(config.filter) : void 0;
  return source.pipe(
    operators.mergeMap(
      (before) => rxjs.of(filterInput(before, matcher)).pipe(
        info.transformation.operator(options, ctx),
        postProcessTransform(before, info, matcher)
      )
    )
  );
};
function filterInput(data, matcher) {
  if (matcher) {
    return data.filter((v) => matcher(v));
  }
  return data;
}
const postProcessTransform = (before, info, matcher) => (source) => source.pipe(
  operators.map((after) => {
    if (after === before) {
      return after;
    }
    if (matcher) {
      let insert = 0;
      const append = before.filter((v, idx) => {
        const keep = !matcher(v);
        if (keep && !insert) {
          insert = idx;
        }
        return keep;
      });
      if (append.length) {
        after.splice(insert, 0, ...append);
      }
    }
    return after;
  })
);
function transformDataFrame(options, data, ctx) {
  const stream = rxjs.of(data);
  if (!options.length) {
    return stream;
  }
  const operators = [];
  const context = ctx != null ? ctx : { interpolate: (str) => str };
  for (let index = 0; index < options.length; index++) {
    const config = options[index];
    if (isCustomTransformation(config)) {
      operators.push(config(context));
    } else {
      if (config.disabled) {
        continue;
      }
      operators.push(getOperator(config, context));
    }
  }
  return stream.pipe.apply(stream, operators);
}
function isCustomTransformation(t) {
  return typeof t === "function";
}

var __defProp$d = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$d(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$d(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
const INSERT_MODES = {
  threshold: (prev, next, threshold) => prev + threshold,
  midpoint: (prev, next, threshold) => (prev + next) / 2,
  // previous time + 1ms to prevent StateTimeline from forward-interpolating prior state
  plusone: (prev, next, threshold) => prev + 1
};
function getRefField(frame, refFieldName) {
  return frame.fields.find((field) => {
    return refFieldName != null ? field.name === refFieldName : field.type === FieldType.time;
  });
}
function applyNullInsertThreshold(opts) {
  if (opts.frame.length === 0) {
    return opts.frame;
  }
  let thorough = true;
  let { frame, refFieldName, refFieldPseudoMax, refFieldPseudoMin, insertMode } = opts;
  if (!insertMode) {
    insertMode = INSERT_MODES.threshold;
  }
  const refField = getRefField(frame, refFieldName);
  if (refField == null) {
    return frame;
  }
  refField.state = __spreadProps$7(__spreadValues$9({}, refField.state), {
    nullThresholdApplied: true
  });
  const thresholds = frame.fields.map((field) => {
    var _a;
    return ((_a = field.config.custom) == null ? void 0 : _a.insertNulls) || refField.config.interval || null;
  });
  const uniqueThresholds = new Set(thresholds);
  uniqueThresholds.delete(null);
  if (uniqueThresholds.size === 0) {
    return frame;
  }
  if (uniqueThresholds.size === 1) {
    const threshold = uniqueThresholds.values().next().value;
    if (threshold <= 0) {
      return frame;
    }
    const refValues = refField.values;
    const frameValues = frame.fields.map((field) => field.values);
    const filledFieldValues = nullInsertThreshold(
      refValues,
      frameValues,
      threshold,
      refFieldPseudoMin,
      refFieldPseudoMax,
      insertMode,
      thorough
    );
    if (filledFieldValues === frameValues) {
      return frame;
    }
    return __spreadProps$7(__spreadValues$9({}, frame), {
      length: filledFieldValues[0].length,
      fields: frame.fields.map((field, i) => __spreadProps$7(__spreadValues$9({}, field), {
        values: filledFieldValues[i]
      }))
    });
  }
  return frame;
}
function nullInsertThreshold(refValues, frameValues, threshold, refFieldPseudoMin = null, refFieldPseudoMax = null, getInsertValue, thorough) {
  const len = refValues.length;
  const refValuesNew = [];
  if (refFieldPseudoMin != null && refFieldPseudoMin < refValues[0]) {
    let preFillCount = Math.ceil((refValues[0] - refFieldPseudoMin) / threshold);
    let prevSlot = refValues[0] - preFillCount * threshold;
    while (prevSlot < refValues[0]) {
      refValuesNew.push(getInsertValue(prevSlot - threshold, prevSlot, threshold));
      prevSlot += threshold;
    }
  }
  refValuesNew.push(refValues[0]);
  let prevValue = refValues[0];
  for (let i = 1; i < len; i++) {
    const curValue = refValues[i];
    while (curValue - prevValue > threshold) {
      refValuesNew.push(getInsertValue(prevValue, curValue, threshold));
      prevValue += threshold;
      if (!thorough) {
        break;
      }
    }
    refValuesNew.push(curValue);
    prevValue = curValue;
  }
  if (refFieldPseudoMax != null && refFieldPseudoMax > prevValue) {
    while (prevValue + threshold < refFieldPseudoMax) {
      refValuesNew.push(getInsertValue(prevValue, refFieldPseudoMax, threshold));
      prevValue += threshold;
    }
  }
  const filledLen = refValuesNew.length;
  if (filledLen === len) {
    return frameValues;
  }
  const filledFieldValues = [];
  for (let fieldValues of frameValues) {
    let filledValues;
    if (fieldValues !== refValues) {
      filledValues = Array(filledLen);
      for (let i = 0, j = 0; i < filledLen; i++) {
        filledValues[i] = refValues[j] === refValuesNew[i] ? fieldValues[j++] : null;
      }
    } else {
      filledValues = refValuesNew;
    }
    filledFieldValues.push(filledValues);
  }
  return filledFieldValues;
}

var __defProp$c = Object.defineProperty;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$c(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    }
  return a;
};
const labelRegexp = /\b(\w+)(!?=~?)"([^"\n]*?)"/g;
function parseLabels(labels) {
  const labelsByKey = {};
  labels.replace(labelRegexp, (_, key, operator, value) => {
    labelsByKey[key] = value;
    return "";
  });
  return labelsByKey;
}
function findCommonLabels(labelsSets) {
  return labelsSets.reduce(
    (acc, labels) => {
      if (!labels) {
        throw new Error("Need parsed labels to find common labels.");
      }
      Object.keys(labels).forEach((key) => {
        if (acc[key] === void 0 || acc[key] !== labels[key]) {
          delete acc[key];
        }
      });
      Object.keys(acc).forEach((key) => {
        if (labels[key] === void 0) {
          delete acc[key];
        }
      });
      return acc;
    },
    __spreadValues$8({}, labelsSets[0])
  );
}
function findUniqueLabels(labels, commonLabels) {
  const uncommonLabels = __spreadValues$8({}, labels);
  Object.keys(commonLabels).forEach((key) => {
    delete uncommonLabels[key];
  });
  return uncommonLabels;
}
function matchAllLabels(expect, against) {
  if (!expect) {
    return true;
  }
  for (const [key, value] of Object.entries(expect)) {
    if (!against || against[key] !== value) {
      return false;
    }
  }
  return true;
}
function formatLabels(labels, defaultValue = "", withoutBraces) {
  if (!labels || Object.keys(labels).length === 0) {
    return defaultValue;
  }
  const labelKeys = Object.keys(labels).sort();
  const cleanSelector = labelKeys.map((key) => `${key}="${labels[key]}"`).join(", ");
  if (withoutBraces) {
    return cleanSelector;
  }
  return ["{", cleanSelector, "}"].join("");
}

function getFrameDisplayName(frame, index) {
  if (frame.name) {
    return frame.name;
  }
  const valueFieldNames = [];
  for (const field of frame.fields) {
    if (field.type === FieldType.time) {
      continue;
    }
    if (valueFieldNames.length > 1) {
      break;
    }
    valueFieldNames.push(getFieldDisplayName(field, frame));
  }
  if (valueFieldNames.length === 1) {
    return valueFieldNames[0];
  }
  if (index === void 0 && frame.fields.length > 0) {
    return frame.fields.filter((f) => f.type !== FieldType.time).map((f) => getFieldDisplayName(f, frame)).join(", ");
  }
  if (frame.refId) {
    return `Series (${frame.refId})`;
  }
  return `Series (${index})`;
}
function cacheFieldDisplayNames(frames) {
  frames.forEach((frame) => {
    frame.fields.forEach((field) => {
      getFieldDisplayName(field, frame, frames);
    });
  });
}
function getFieldDisplayName(field, frame, allFrames) {
  var _a, _b;
  const existingTitle = (_a = field.state) == null ? void 0 : _a.displayName;
  const multipleFrames = Boolean(allFrames && allFrames.length > 1);
  if (existingTitle && multipleFrames === ((_b = field.state) == null ? void 0 : _b.multipleFrames)) {
    return existingTitle;
  }
  const displayName = calculateFieldDisplayName(field, frame, allFrames);
  field.state = field.state || {};
  field.state.displayName = displayName;
  field.state.multipleFrames = multipleFrames;
  return displayName;
}
function calculateFieldDisplayName(field, frame, allFrames) {
  var _a, _b, _c, _d, _e;
  const hasConfigTitle = ((_a = field.config) == null ? void 0 : _a.displayName) && ((_b = field.config) == null ? void 0 : _b.displayName.length);
  const isComparisonSeries = Boolean((_d = (_c = frame == null ? void 0 : frame.meta) == null ? void 0 : _c.timeCompare) == null ? void 0 : _d.isTimeShiftQuery);
  let displayName = hasConfigTitle ? field.config.displayName : field.name;
  if (hasConfigTitle) {
    return isComparisonSeries ? `${displayName} (comparison)` : displayName;
  }
  if (frame && ((_e = field.config) == null ? void 0 : _e.displayNameFromDS)) {
    return isComparisonSeries ? `${field.config.displayNameFromDS} (comparison)` : field.config.displayNameFromDS;
  }
  if (field.type === FieldType.time && !field.labels) {
    return displayName != null ? displayName : TIME_SERIES_TIME_FIELD_NAME;
  }
  let parts = [];
  let frameNamesDiffer = false;
  if (allFrames && allFrames.length > 1) {
    for (let i = 1; i < allFrames.length; i++) {
      const frame2 = allFrames[i];
      if (frame2.name !== allFrames[i - 1].name) {
        frameNamesDiffer = true;
        break;
      }
    }
  }
  let frameNameAdded = false;
  let labelsAdded = false;
  if (frameNamesDiffer && (frame == null ? void 0 : frame.name)) {
    parts.push(frame.name);
    frameNameAdded = true;
  }
  if (field.name && field.name !== TIME_SERIES_VALUE_FIELD_NAME) {
    parts.push(field.name);
  }
  if (field.labels && frame) {
    let singleLabelName = getSingleLabelName(allFrames != null ? allFrames : [frame]);
    if (!singleLabelName) {
      let allLabels = formatLabels(field.labels);
      if (allLabels) {
        parts.push(allLabels);
        labelsAdded = true;
      }
    } else if (field.labels[singleLabelName]) {
      parts.push(field.labels[singleLabelName]);
      labelsAdded = true;
    }
  }
  if (frame && !frameNameAdded && !labelsAdded && field.name === TIME_SERIES_VALUE_FIELD_NAME) {
    if (frame.name && frame.name.length > 0) {
      parts.push(frame.name);
      frameNameAdded = true;
    }
  }
  if (parts.length) {
    displayName = parts.join(" ");
  } else if (field.name) {
    displayName = field.name;
  } else {
    displayName = TIME_SERIES_VALUE_FIELD_NAME;
  }
  if (displayName === field.name) {
    displayName = getUniqueFieldName(field, frame);
  }
  if (isComparisonSeries) {
    displayName = `${displayName} (comparison)`;
  }
  return displayName;
}
function getUniqueFieldName(field, frame) {
  let dupeCount = 0;
  let foundSelf = false;
  if (frame) {
    for (let i = 0; i < frame.fields.length; i++) {
      const otherField = frame.fields[i];
      if (field === otherField) {
        foundSelf = true;
        if (dupeCount > 0) {
          dupeCount++;
          break;
        }
      } else if (field.name === otherField.name) {
        dupeCount++;
        if (foundSelf) {
          break;
        }
      }
    }
  }
  if (dupeCount) {
    return `${field.name} ${dupeCount}`;
  }
  return field.name;
}
function getSingleLabelName(frames) {
  let singleName = null;
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    for (const field of frame.fields) {
      if (!field.labels) {
        continue;
      }
      for (const labelKey in field.labels) {
        if (singleName === null) {
          singleName = labelKey;
        } else if (labelKey !== singleName) {
          return null;
        }
      }
    }
  }
  return singleName;
}

var __defProp$b = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$b(a, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$8.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$8.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function convertTableToDataFrame(table) {
  const fields = table.columns.map((c) => {
    const _a = c, { text, type } = _a, disp = __objRest$1(_a, ["text", "type"]);
    const values = [];
    return {
      name: (text == null ? void 0 : text.length) ? text : c,
      // rename 'text' to the 'name' field
      config: disp || {},
      values,
      type: type && Object.values(FieldType).includes(type) ? type : FieldType.other
    };
  });
  if (!lodash.isArray(table.rows)) {
    throw new Error(`Expected table rows to be array, got ${typeof table.rows}.`);
  }
  for (const row of table.rows) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].values.push(row[i]);
    }
  }
  for (const f of fields) {
    if (f.type === FieldType.other) {
      const t = guessFieldTypeForField(f);
      if (t) {
        f.type = t;
      }
    }
  }
  return {
    fields,
    refId: table.refId,
    meta: table.meta,
    name: table.name,
    length: table.rows.length
  };
}
function convertTimeSeriesToDataFrame(timeSeries) {
  const times = [];
  const values = [];
  const points = timeSeries.datapoints || timeSeries.points;
  for (const point of points) {
    values.push(point[0]);
    times.push(point[1]);
  }
  const fields = [
    {
      name: TIME_SERIES_TIME_FIELD_NAME,
      type: FieldType.time,
      config: {},
      values: times
    },
    {
      name: TIME_SERIES_VALUE_FIELD_NAME,
      type: FieldType.number,
      config: {
        unit: timeSeries.unit
      },
      values,
      labels: timeSeries.tags
    }
  ];
  if (timeSeries.title) {
    fields[1].config.displayNameFromDS = timeSeries.title;
  }
  return {
    name: timeSeries.target || timeSeries.name,
    refId: timeSeries.refId,
    meta: timeSeries.meta,
    fields,
    length: values.length
  };
}
function convertGraphSeriesToDataFrame(graphSeries) {
  const x = [];
  const y = [];
  for (let i = 0; i < graphSeries.data.length; i++) {
    const row = graphSeries.data[i];
    x.push(row[1]);
    y.push(row[0]);
  }
  return {
    name: graphSeries.label,
    fields: [
      {
        name: graphSeries.label || TIME_SERIES_VALUE_FIELD_NAME,
        type: FieldType.number,
        config: {},
        values: x
      },
      {
        name: TIME_SERIES_TIME_FIELD_NAME,
        type: FieldType.time,
        config: {
          unit: "dateTimeAsIso"
        },
        values: y
      }
    ],
    length: x.length
  };
}
function convertJSONDocumentDataToDataFrame(timeSeries) {
  const fields = [
    {
      name: timeSeries.target,
      type: FieldType.other,
      labels: timeSeries.tags,
      config: {
        unit: timeSeries.unit,
        filterable: timeSeries.filterable
      },
      values: []
    }
  ];
  for (const point of timeSeries.datapoints) {
    fields[0].values.push(point);
  }
  return {
    name: timeSeries.target,
    refId: timeSeries.target,
    meta: { json: true },
    fields,
    length: timeSeries.datapoints.length
  };
}
const NUMBER = /^\s*(-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?|NAN)\s*$/i;
function guessFieldTypeFromNameAndValue(name, v) {
  if (name) {
    name = name.toLowerCase();
    if (name === "date" || name === "time") {
      return FieldType.time;
    }
  }
  return guessFieldTypeFromValue(v);
}
function getFieldTypeFromValue(v) {
  if (v instanceof Date || isDateTime(v)) {
    return FieldType.time;
  }
  if (lodash.isNumber(v)) {
    return FieldType.number;
  }
  if (lodash.isString(v)) {
    return FieldType.string;
  }
  if (lodash.isBoolean(v)) {
    return FieldType.boolean;
  }
  return FieldType.other;
}
function guessFieldTypeFromValue(v) {
  if (v instanceof Date || isDateTime(v)) {
    return FieldType.time;
  }
  if (lodash.isNumber(v)) {
    return FieldType.number;
  }
  if (lodash.isString(v)) {
    if (NUMBER.test(v)) {
      return FieldType.number;
    }
    if (v === "true" || v === "TRUE" || v === "True" || v === "false" || v === "FALSE" || v === "False") {
      return FieldType.boolean;
    }
    return FieldType.string;
  }
  if (lodash.isBoolean(v)) {
    return FieldType.boolean;
  }
  return FieldType.other;
}
function guessFieldTypeForField(field) {
  if (field.name) {
    const name = field.name.toLowerCase();
    if (name === "date" || name === "time") {
      return FieldType.time;
    }
  }
  for (let i = 0; i < field.values.length; i++) {
    const v = field.values[i];
    if (v != null) {
      return guessFieldTypeFromValue(v);
    }
  }
  return void 0;
}
const guessFieldTypes = (series, guessDefined = false) => {
  for (const field of series.fields) {
    if (!field.type || field.type === FieldType.other || guessDefined) {
      return __spreadProps$6(__spreadValues$7({}, series), {
        fields: series.fields.map((field2) => {
          if (field2.type && field2.type !== FieldType.other && !guessDefined) {
            return field2;
          }
          return __spreadProps$6(__spreadValues$7({}, field2), {
            type: guessFieldTypeForField(field2) || FieldType.other
          });
        })
      });
    }
  }
  return series;
};
const isTableData = (data) => Boolean(data && data.hasOwnProperty("columns"));
const isDataFrame = (data) => Boolean(data && data.hasOwnProperty("fields"));
const isDataFrameWithValue = (data) => Boolean(isDataFrame(data) && data.hasOwnProperty("value"));
function toDataFrame(data) {
  var _a, _b;
  if ("fields" in data) {
    if ("length" in data && ((_b = (_a = data.fields[0]) == null ? void 0 : _a.values) == null ? void 0 : _b.get)) {
      return data;
    }
    return createDataFrame(data);
  }
  if (data.hasOwnProperty("type") && data.type === "docs") {
    return convertJSONDocumentDataToDataFrame(data);
  }
  if (data.hasOwnProperty("datapoints") || data.hasOwnProperty("points")) {
    return convertTimeSeriesToDataFrame(data);
  }
  if (data.hasOwnProperty("data")) {
    if (data.hasOwnProperty("schema")) {
      return dataFrameFromJSON(data);
    }
    return convertGraphSeriesToDataFrame(data);
  }
  if (data.hasOwnProperty("columns")) {
    return convertTableToDataFrame(data);
  }
  if (Array.isArray(data)) {
    return arrayToDataFrame(data);
  }
  console.warn("Can not convert", data);
  throw new Error("Unsupported data format");
}
const toLegacyResponseData = (frame) => {
  const { fields } = frame;
  const rowCount = frame.length;
  const rows = [];
  if (fields.length === 2) {
    const { timeField, timeIndex } = getTimeField(frame);
    if (timeField) {
      const valueIndex = timeIndex === 0 ? 1 : 0;
      const valueField = fields[valueIndex];
      const timeField2 = fields[timeIndex];
      for (let i = 0; i < rowCount; i++) {
        rows.push([
          valueField.values[i],
          // value
          timeField2.values[i]
          // time
        ]);
      }
      return {
        alias: frame.name,
        target: getFieldDisplayName(valueField, frame),
        datapoints: rows,
        unit: fields[0].config ? fields[0].config.unit : void 0,
        refId: frame.refId,
        meta: frame.meta
      };
    }
  }
  for (let i = 0; i < rowCount; i++) {
    const row = [];
    for (let j = 0; j < fields.length; j++) {
      row.push(fields[j].values[i]);
    }
    rows.push(row);
  }
  if (frame.meta && frame.meta.json) {
    return {
      alias: fields[0].name || frame.name,
      target: fields[0].name || frame.name,
      datapoints: fields[0].values,
      filterable: fields[0].config ? fields[0].config.filterable : void 0,
      type: "docs"
    };
  }
  return {
    columns: fields.map((f) => {
      const { name, config } = f;
      if (config) {
        const column = __objRest$1(config, []);
        column.text = name;
        return column;
      }
      return { text: name };
    }),
    type: "table",
    refId: frame.refId,
    meta: frame.meta,
    rows
  };
};
function sortDataFrame(data, sortIndex, reverse = false) {
  const field = data.fields[sortIndex];
  if (!field) {
    return data;
  }
  const index = [];
  for (let i = 0; i < data.length; i++) {
    index.push(i);
  }
  const fieldComparer = fieldIndexComparer(field, reverse);
  index.sort(fieldComparer);
  return __spreadProps$6(__spreadValues$7({}, data), {
    fields: data.fields.map((f) => {
      const newF = __spreadProps$6(__spreadValues$7({}, f), {
        values: f.values.map((v, i) => f.values[index[i]])
      });
      const { nanos } = f;
      if (nanos !== void 0) {
        newF.nanos = nanos.map((n, i) => nanos[index[i]]);
      }
      return newF;
    })
  });
}
function reverseDataFrame(data) {
  return __spreadProps$6(__spreadValues$7({}, data), {
    fields: data.fields.map((f) => {
      const values = [...f.values];
      values.reverse();
      const newF = __spreadProps$6(__spreadValues$7({}, f), {
        values
      });
      const { nanos } = f;
      if (nanos !== void 0) {
        const revNanos = [...nanos];
        revNanos.reverse();
        newF.nanos = revNanos;
      }
      return newF;
    })
  });
}
function getDataFrameRow(data, row) {
  const values = [];
  for (const field of data.fields) {
    values.push(field.values[row]);
  }
  return values;
}
function toDataFrameDTO(data) {
  return toFilteredDataFrameDTO(data);
}
function toFilteredDataFrameDTO(data, fieldPredicate) {
  const filteredFields = fieldPredicate ? data.fields.filter(fieldPredicate) : data.fields;
  const fields = filteredFields.map((f) => {
    let values = f.values;
    return {
      name: f.name,
      type: f.type,
      config: f.config,
      values,
      labels: f.labels
    };
  });
  return {
    fields,
    refId: data.refId,
    meta: data.meta,
    name: data.name
  };
}
const getTimeField = (series) => {
  for (let i = 0; i < series.fields.length; i++) {
    if (series.fields[i].type === FieldType.time) {
      return {
        timeField: series.fields[i],
        timeIndex: i
      };
    }
  }
  return {};
};
function getProcessedDataFrame(data) {
  const dataFrame = guessFieldTypes(toDataFrame(data));
  if (dataFrame.fields && dataFrame.fields.length) {
    for (const field of dataFrame.fields) {
      field.state = null;
    }
  }
  return dataFrame;
}
function getProcessedDataFrames(results) {
  if (!results || !lodash.isArray(results)) {
    return [];
  }
  return results.map((data) => getProcessedDataFrame(data));
}
function preProcessPanelData(data, lastResult) {
  const { series, annotations } = data;
  if (data.state === LoadingState.Loading && series.length === 0) {
    if (!lastResult) {
      lastResult = data;
    }
    return __spreadProps$6(__spreadValues$7({}, lastResult), {
      state: LoadingState.Loading,
      request: data.request
    });
  }
  const STARTTIME = performance.now();
  const processedDataFrames = series.map((data2) => getProcessedDataFrame(data2));
  const annotationsProcessed = getProcessedDataFrames(annotations);
  const STOPTIME = performance.now();
  return __spreadProps$6(__spreadValues$7({}, data), {
    series: processedDataFrames,
    annotations: annotationsProcessed,
    timings: { dataProcessingTime: STOPTIME - STARTTIME }
  });
}
function createDataFrame(input) {
  let length = 0;
  const fields = input.fields.map((p, idx) => {
    var _b;
    const _a = p, field = __objRest$1(_a, ["state"]);
    if (!field.name) {
      field.name = `Field ${idx + 1}`;
    }
    if (!field.config) {
      field.config = {};
    }
    if (!field.values) {
      field.values = new Array(length);
    } else if (field.values.length > length) {
      length = field.values.length;
    }
    if (!field.type) {
      field.type = (_b = guessFieldTypeForField(field)) != null ? _b : FieldType.other;
    }
    return field;
  });
  return __spreadProps$6(__spreadValues$7({}, input), {
    fields,
    length
  });
}

function makeFieldParser(value, field) {
  if (!field.type) {
    if (field.name === "time" || field.name === "Time") {
      field.type = FieldType.time;
    } else {
      field.type = guessFieldTypeFromValue(value);
    }
  }
  if (field.type === FieldType.number) {
    return (value2) => {
      return parseFloat(value2);
    };
  }
  if (field.type === FieldType.boolean) {
    return (value2) => {
      return !(value2[0] === "F" || value2[0] === "f" || value2[0] === "0");
    };
  }
  return (value2) => value2;
}

var __defProp$a = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$a(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$a(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MISSING_VALUE = void 0;
class MutableDataFrame extends FunctionalVector {
  constructor(source, creator) {
    super();
    __publicField$7(this, "name");
    __publicField$7(this, "refId");
    __publicField$7(this, "meta");
    __publicField$7(this, "fields", []);
    __publicField$7(this, "first", []);
    __publicField$7(this, "creator");
    __publicField$7(this, "parsers");
    this.creator = creator ? creator : (buffer) => {
      return buffer != null ? buffer : [];
    };
    if (source) {
      const { name, refId, meta, fields } = source;
      if (name) {
        this.name = name;
      }
      if (refId) {
        this.refId = refId;
      }
      if (meta) {
        this.meta = meta;
      }
      if (fields) {
        for (const f of fields) {
          this.addField(f);
        }
      }
    }
    Object.defineProperty(this, "length", {
      enumerable: true,
      get: () => {
        return this.first.length;
      }
    });
  }
  // Defined for Vector interface
  get length() {
    return this.first.length;
  }
  addFieldFor(value, name) {
    return this.addField({
      name: name || "",
      // Will be filled in
      type: guessFieldTypeFromValue(value)
    });
  }
  addField(f, startLength) {
    let buffer = void 0;
    if (f.values) {
      buffer = f.values;
    }
    let type = f.type;
    if (!type && ("time" === f.name || "Time" === f.name)) {
      type = FieldType.time;
    } else {
      if (!type && buffer && buffer.length) {
        type = guessFieldTypeFromValue(buffer[0]);
      }
      if (!type) {
        type = FieldType.other;
      }
    }
    let name = f.name;
    if (!name) {
      name = `Field ${this.fields.length + 1}`;
    }
    const field = __spreadProps$5(__spreadValues$6({}, f), {
      name,
      type,
      config: f.config || {},
      values: this.creator(buffer)
    });
    if (type === FieldType.other) {
      type = guessFieldTypeForField(field);
      if (type) {
        field.type = type;
      }
    }
    this.fields.push(field);
    this.first = this.fields[0].values;
    if (startLength) {
      while (field.values.length < startLength) {
        field.values.push(MISSING_VALUE);
      }
    } else {
      this.validate();
    }
    return field;
  }
  validate() {
    const length = this.fields.reduce((v, f) => {
      return Math.max(v, f.values.length);
    }, 0);
    for (const field of this.fields) {
      while (field.values.length !== length) {
        field.values.push(MISSING_VALUE);
      }
    }
  }
  /**
   * @deprecated unclear if this is actually used
   */
  setParser(field, parser) {
    if (!this.parsers) {
      this.parsers = /* @__PURE__ */ new Map();
    }
    this.parsers.set(field, parser);
    return parser;
  }
  parseValue(field, v) {
    var _a;
    let p = (_a = this.parsers) == null ? void 0 : _a.get(field);
    if (!p) {
      p = this.setParser(field, makeFieldParser(v, field));
    }
    return p(v);
  }
  /**
   * This will add each value to the corresponding column
   */
  appendRow(row) {
    for (let i = this.fields.length; i < row.length; i++) {
      this.addField({
        name: `Field ${i + 1}`,
        type: guessFieldTypeFromValue(row[i])
      });
    }
    if (this.length < 1) {
      for (let i = 0; i < this.fields.length; i++) {
        const f = this.fields[i];
        if (!f.type || f.type === FieldType.other) {
          f.type = guessFieldTypeFromValue(row[i]);
        }
      }
    }
    for (let i = 0; i < this.fields.length; i++) {
      const f = this.fields[i];
      let v = row[i];
      if (f.type !== FieldType.string && lodash.isString(v)) {
        v = this.parseValue(f, v);
      }
      f.values.push(v);
    }
  }
  /** support standard array push syntax */
  push(...vals) {
    for (const v of vals) {
      this.add(v);
    }
    return this.length;
  }
  reverse() {
    for (const field of this.fields) {
      field.values.reverse();
    }
    return this;
  }
  /**
   * Add values from an object to corresponding fields. Similar to appendRow but does not create new fields.
   */
  add(value) {
    const obj = value;
    for (const field of this.fields) {
      let val = obj[field.name];
      if (field.type !== FieldType.string && lodash.isString(val)) {
        val = this.parseValue(field, val);
      }
      if (val === void 0) {
        val = MISSING_VALUE;
      }
      field.values.push(val);
    }
  }
  set(index, value) {
    if (index > this.length) {
      throw new Error("Unable to set value beyond current length");
    }
    const obj = value || {};
    for (const field of this.fields) {
      field.values[index] = obj[field.name];
    }
  }
  /**
   * Get an object with a property for each field in the DataFrame
   */
  get(idx) {
    const v = {};
    for (const field of this.fields) {
      v[field.name] = field.values[idx];
    }
    return v;
  }
  /**
   * The simplified JSON values used in JSON.stringify()
   */
  toJSON() {
    return toDataFrameDTO(this);
  }
}

var __defProp$9 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var CSVHeaderStyle = /* @__PURE__ */ ((CSVHeaderStyle2) => {
  CSVHeaderStyle2[CSVHeaderStyle2["full"] = 0] = "full";
  CSVHeaderStyle2[CSVHeaderStyle2["name"] = 1] = "name";
  CSVHeaderStyle2[CSVHeaderStyle2["none"] = 2] = "none";
  return CSVHeaderStyle2;
})(CSVHeaderStyle || {});
function readCSV(csv, options) {
  return new CSVReader(options).readCSV(csv);
}
class CSVReader {
  constructor(options) {
    __publicField$6(this, "config");
    __publicField$6(this, "callback");
    __publicField$6(this, "state");
    __publicField$6(this, "data");
    __publicField$6(this, "current");
    // PapaParse callback on each line
    __publicField$6(this, "chunk", (results, parser) => {
      for (let i = 0; i < results.data.length; i++) {
        const line = results.data[i];
        if (line.length < 1) {
          continue;
        }
        const first = line[0];
        if (first) {
          if (first.startsWith("#")) {
            const idx = first.indexOf("#", 2);
            if (idx > 0) {
              const k = first.slice(1, idx);
              const isName = "name" === k;
              const headerKeys = {
                unit: "#"
              };
              if (isName || headerKeys.hasOwnProperty(k)) {
                if (this.state === 2 /* ReadingRows */) {
                  this.current = new MutableDataFrame({ fields: [] });
                  this.data.push(this.current);
                }
                const v = first.slice(idx + 1);
                if (isName) {
                  this.current.addFieldFor(void 0, v);
                  for (let j = 1; j < line.length; j++) {
                    this.current.addFieldFor(void 0, line[j]);
                  }
                } else {
                  const { fields } = this.current;
                  for (let j = 0; j < fields.length; j++) {
                    if (!fields[j].config) {
                      fields[j].config = {};
                    }
                    const disp = fields[j].config;
                    disp[k] = j === 0 ? v : line[j];
                  }
                }
                this.state = 1 /* InHeader */;
                continue;
              }
            } else if (this.state === 0 /* Starting */) {
              this.state = 1 /* InHeader */;
              continue;
            }
            continue;
          }
          if (this.state === 0 /* Starting */) {
            const type = guessFieldTypeFromValue(first);
            if (type === FieldType.string) {
              for (const s of line) {
                this.current.addFieldFor(void 0, s);
              }
              this.state = 1 /* InHeader */;
              continue;
            }
            this.state = 1 /* InHeader */;
          }
        }
        if (this.state !== 2 /* ReadingRows */) ;
        this.state = 2 /* ReadingRows */;
        if (line.length > this.current.fields.length) {
          const { fields } = this.current;
          for (let f = fields.length; f < line.length; f++) {
            this.current.addFieldFor(line[f]);
          }
          if (this.callback) {
            this.callback.onHeader(this.current.fields);
          }
        }
        this.current.appendRow(line);
        if (this.callback) {
          this.callback.onRow(line);
        }
      }
    });
    if (!options) {
      options = {};
    }
    this.config = options.config || {};
    this.callback = options.callback;
    this.current = new MutableDataFrame({ fields: [] });
    this.state = 0 /* Starting */;
    this.data = [];
  }
  readCSV(text) {
    this.current = new MutableDataFrame({ fields: [] });
    this.data = [this.current];
    const papacfg = __spreadProps$4(__spreadValues$5({}, this.config), {
      dynamicTyping: false,
      skipEmptyLines: true,
      comments: false,
      // Keep comment lines
      chunk: this.chunk
    });
    Papa__default["default"].parse(text, papacfg);
    return this.data;
  }
}
function writeValue(value, config) {
  if (value === null || value === void 0) {
    return "";
  }
  const str = value.toString();
  if (str.includes('"')) {
    return config.quoteChar + str.replace(/"/gi, '""') + config.quoteChar;
  }
  if (str.includes("\n") || config.delimiter && str.includes(config.delimiter)) {
    return config.quoteChar + str + config.quoteChar;
  }
  return str;
}
function makeFieldWriter(field, config) {
  if (field.display) {
    return (value) => {
      const displayValue = field.display(value);
      return writeValue(formattedValueToString(displayValue), config);
    };
  }
  return (value) => writeValue(value, config);
}
function getHeaderLine(key, fields, config) {
  const isName = "name" === key;
  const isType = "type" === key;
  for (const f of fields) {
    const display = f.config;
    if (isName || isType || display && display.hasOwnProperty(key)) {
      let line = "#" + key + "#";
      for (let i = 0; i < fields.length; i++) {
        if (i > 0) {
          line = line + config.delimiter;
        }
        let v = fields[i].name;
        if (isType) {
          v = fields[i].type;
        } else if (isName) ; else {
          v = fields[i].config[key];
        }
        if (v) {
          line = line + writeValue(v, config);
        }
      }
      return line + config.newline;
    }
  }
  return "";
}
function getLocaleDelimiter() {
  const arr = ["x", "y"];
  if (arr.toLocaleString) {
    return arr.toLocaleString().charAt(1);
  }
  return ",";
}
function toCSV(data, config) {
  if (!data) {
    return "";
  }
  config = lodash.defaults(config, {
    delimiter: getLocaleDelimiter(),
    newline: "\r\n",
    quoteChar: '"',
    encoding: "",
    headerStyle: 1 /* name */,
    useExcelHeader: false
  });
  let csv = config.useExcelHeader ? `sep=${config.delimiter}${config.newline}` : "";
  for (let s = 0; s < data.length; s++) {
    const series = data[s];
    const { fields } = series;
    if (fields.length === 0) {
      continue;
    }
    if (config.headerStyle === 0 /* full */) {
      csv = csv + getHeaderLine("name", fields, config) + getHeaderLine("type", fields, config) + getHeaderLine("unit", fields, config) + getHeaderLine("dateFormat", fields, config);
    } else if (config.headerStyle === 1 /* name */) {
      for (let i = 0; i < fields.length; i++) {
        if (i > 0) {
          csv += config.delimiter;
        }
        csv += `"${getFieldDisplayName(fields[i], series).replace(/"/g, '""')}"`;
      }
      csv += config.newline;
    }
    const length = fields[0].values.length;
    if (length > 0) {
      const writers = fields.map((field) => makeFieldWriter(field, config));
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < fields.length; j++) {
          if (j > 0) {
            csv = csv + config.delimiter;
          }
          const v = fields[j].values[i];
          if (v !== null) {
            csv = csv + writers[j](v);
          }
        }
        if (i !== length - 1) {
          csv = csv + config.newline;
        }
      }
    }
    if (s !== data.length - 1) {
      csv = csv + config.newline;
    }
  }
  return csv;
}

function roundDecimals(val, dec = 0) {
  if (Number.isInteger(val)) {
    return val;
  }
  let p = 10 ** dec;
  let n = val * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}
function guessDecimals(num) {
  return (("" + num).split(".")[1] || "").length;
}

const objRemoveUndefined = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== void 0) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
const isEmptyObject = (value) => {
  return typeof value === "object" && value !== null && Object.keys(value).length === 0;
};

const classicColors = [
  "#7EB26D",
  // 0: pale green
  "#EAB839",
  // 1: mustard
  "#6ED0E0",
  // 2: light blue
  "#EF843C",
  // 3: orange
  "#E24D42",
  // 4: red
  "#1F78C1",
  // 5: ocean
  "#BA43A9",
  // 6: purple
  "#705DA0",
  // 7: violet
  "#508642",
  // 8: dark green
  "#CCA300",
  // 9: dark sand
  "#447EBC",
  "#C15C17",
  "#890F02",
  "#0A437C",
  "#6D1F62",
  "#584477",
  "#B7DBAB",
  "#F4D598",
  "#70DBED",
  "#F9BA8F",
  "#F29191",
  "#82B5D8",
  "#E5A8E2",
  "#AEA2E0",
  "#629E51",
  "#E5AC0E",
  "#64B0C8",
  "#E0752D",
  "#BF1B00",
  "#0A50A1",
  "#962D82",
  "#614D93",
  "#9AC48A",
  "#F2C96D",
  "#65C5DB",
  "#F9934E",
  "#EA6460",
  "#5195CE",
  "#D683CE",
  "#806EB7",
  "#3F6833",
  "#967302",
  "#2F575E",
  "#99440A",
  "#58140C",
  "#052B51",
  "#511749",
  "#3F2B5B",
  "#E0F9D7",
  "#FCEACA",
  "#CFFAFF",
  "#F9E2D2",
  "#FCE2DE",
  "#BADFF4",
  "#F9D9F9",
  "#DEDAF7"
];

const getSeriesTimeStep = (timeField) => {
  let previousTime;
  let returnTimeStep = Number.MAX_VALUE;
  for (let i = 0; i < timeField.values.length; i++) {
    const currentTime = timeField.values[i];
    if (previousTime !== void 0) {
      const timeStep = currentTime - previousTime;
      {
        returnTimeStep = timeStep;
      }
      if (timeStep < returnTimeStep) {
        returnTimeStep = timeStep;
      }
    }
    previousTime = currentTime;
  }
  return returnTimeStep;
};
const hasMsResolution = (timeField) => {
  for (let i = 0; i < timeField.values.length; i++) {
    const value = timeField.values[i];
    if (value !== null && value !== void 0) {
      const timestamp = value.toString();
      if (timestamp.length === 13 && timestamp % 1e3 !== 0) {
        return true;
      }
    }
  }
  return false;
};

var NodeGraphDataFrameFieldNames = /* @__PURE__ */ ((NodeGraphDataFrameFieldNames2) => {
  NodeGraphDataFrameFieldNames2["id"] = "id";
  NodeGraphDataFrameFieldNames2["title"] = "title";
  NodeGraphDataFrameFieldNames2["subTitle"] = "subtitle";
  NodeGraphDataFrameFieldNames2["mainStat"] = "mainstat";
  NodeGraphDataFrameFieldNames2["secondaryStat"] = "secondarystat";
  NodeGraphDataFrameFieldNames2["arc"] = "arc__";
  NodeGraphDataFrameFieldNames2["icon"] = "icon";
  NodeGraphDataFrameFieldNames2["color"] = "color";
  NodeGraphDataFrameFieldNames2["source"] = "source";
  NodeGraphDataFrameFieldNames2["target"] = "target";
  NodeGraphDataFrameFieldNames2["detail"] = "detail__";
  NodeGraphDataFrameFieldNames2["nodeRadius"] = "noderadius";
  NodeGraphDataFrameFieldNames2["thickness"] = "thickness";
  NodeGraphDataFrameFieldNames2["highlighted"] = "highlighted";
  NodeGraphDataFrameFieldNames2["strokeDasharray"] = "strokedasharray";
  NodeGraphDataFrameFieldNames2["fixedX"] = "fixedx";
  NodeGraphDataFrameFieldNames2["fixedY"] = "fixedy";
  return NodeGraphDataFrameFieldNames2;
})(NodeGraphDataFrameFieldNames || {});

const toOption = (value) => ({ label: value, value });

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class OptionsUIRegistryBuilder {
  constructor() {
    __publicField$5(this, "properties", []);
  }
  addCustomEditor(config) {
    this.properties.push(config);
    return this;
  }
  getRegistry() {
    return new Registry(() => {
      return this.properties;
    });
  }
  getItems() {
    return this.properties;
  }
}

var __defProp$7 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FieldConfigEditorBuilder extends OptionsUIRegistryBuilder {
  addNumberInput(config) {
    var _a;
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
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
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
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
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      override: standardEditorsRegistry.get("text").editor,
      editor: standardEditorsRegistry.get("text").editor,
      process: stringOverrideProcessor,
      shouldApply: (_a = config.shouldApply) != null ? _a : () => true,
      settings: config.settings || {}
    }));
  }
  addSelect(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
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
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
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
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("boolean").editor,
      override: standardEditorsRegistry.get("boolean").editor,
      process: booleanOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addColorPicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("color").editor,
      override: standardEditorsRegistry.get("color").editor,
      process: identityOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addUnitPicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("unit").editor,
      override: standardEditorsRegistry.get("unit").editor,
      process: unitOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addFieldNamePicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("field-name").editor,
      override: standardEditorsRegistry.get("field-name").editor,
      process: identityOverrideProcessor,
      shouldApply: config.shouldApply ? config.shouldApply : () => true,
      settings: config.settings || {}
    }));
  }
  addGenericEditor(config, editor) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
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
    __publicField$4(this, "path", "");
    __publicField$4(this, "category");
    __publicField$4(this, "defaultValue");
    __publicField$4(this, "id", "nested-panel-options");
    __publicField$4(this, "name", "nested");
    __publicField$4(this, "editor", () => null);
    __publicField$4(this, "getBuilder", () => {
      return this.cfg.build;
    });
    __publicField$4(this, "getNestedValueAccess", (parent) => {
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
    let result = isObject(cfg.defaultValue) ? lodash.cloneDeep(cfg.defaultValue) : {};
    const builder = new PanelOptionsEditorBuilder();
    cfg.build(builder, { data: [] });
    for (const item of builder.getItems()) {
      if (item.defaultValue != null) {
        lodash.set(result, item.path, item.defaultValue);
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
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("number").editor
    }));
  }
  addSliderInput(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("slider").editor
    }));
  }
  addTextInput(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("text").editor
    }));
  }
  addStringArray(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("strings").editor
    }));
  }
  addSelect(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("select").editor
    }));
  }
  addMultiSelect(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("multi-select").editor
    }));
  }
  addRadio(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("radio").editor
    }));
  }
  addBooleanSwitch(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("boolean").editor
    }));
  }
  addColorPicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("color").editor,
      settings: config.settings || {}
    }));
  }
  addTimeZonePicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("timezone").editor,
      settings: config.settings || {}
    }));
  }
  addUnitPicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("unit").editor
    }));
  }
  addFieldNamePicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("field-name").editor
    }));
  }
  addDashboardPicker(config) {
    return this.addCustomEditor(__spreadProps$3(__spreadValues$4({}, config), {
      id: config.path,
      editor: standardEditorsRegistry.get("dashboard-uid").editor
      // added at runtime
    }));
  }
}

function getFlotPairs({ xField, yField, nullValueMode }) {
  const vX = xField.values;
  const vY = yField.values;
  const length = vX.length;
  if (vY.length !== length) {
    throw new Error("Unexpected field length");
  }
  const ignoreNulls = nullValueMode === NullValueMode.Ignore;
  const nullAsZero = nullValueMode === NullValueMode.AsZero;
  const pairs = [];
  for (let i = 0; i < length; i++) {
    const x = vX[i];
    let y = vY[i];
    if (y === null) {
      if (ignoreNulls) {
        continue;
      }
      if (nullAsZero) {
        y = 0;
      }
    }
    if (x === null) {
      continue;
    }
    pairs.push([x, y]);
  }
  return pairs;
}
function getFlotPairsConstant(seriesData, range) {
  if (!range.from || !range.to || !seriesData || seriesData.length === 0) {
    return [];
  }
  const from = range.from.valueOf();
  const to = range.to.valueOf();
  const value = seriesData[0][1];
  return [
    [from, value],
    [to, value]
  ];
}

var DocsId = /* @__PURE__ */ ((DocsId2) => {
  DocsId2[DocsId2["Transformations"] = 0] = "Transformations";
  DocsId2[DocsId2["FieldConfig"] = 1] = "FieldConfig";
  DocsId2[DocsId2["FieldConfigOverrides"] = 2] = "FieldConfigOverrides";
  return DocsId2;
})(DocsId || {});

function withLoadingIndicator({ whileLoading, source }) {
  return rxjs.merge(rxjs.timer(200).pipe(operators.mapTo(whileLoading), operators.takeUntil(source)), source);
}

const SEARCH_FILTER_VARIABLE = "__searchFilter";
const containsSearchFilter = (query) => query && typeof query === "string" ? query.indexOf(SEARCH_FILTER_VARIABLE) !== -1 : false;
const getSearchFilterScopedVar = (args) => {
  const { query, wildcardChar } = args;
  if (!containsSearchFilter(query)) {
    return {};
  }
  let { options } = args;
  options = options || { searchFilter: "" };
  const value = options.searchFilter ? `${options.searchFilter}${wildcardChar}` : `${wildcardChar}`;
  return {
    __searchFilter: {
      value,
      text: ""
    }
  };
};

function matchPluginId(idToMatch, pluginMeta) {
  if (pluginMeta.id === idToMatch) {
    return true;
  }
  if (pluginMeta.aliasIDs) {
    return pluginMeta.aliasIDs.includes(idToMatch);
  }
  return false;
}

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventBusSrv {
  constructor() {
    __publicField$3(this, "emitter");
    __publicField$3(this, "subscribers", /* @__PURE__ */ new Map());
    this.emitter = new EventEmitter__default["default"]();
  }
  publish(event) {
    this.emitter.emit(event.type, event);
  }
  subscribe(typeFilter, handler) {
    return this.getStream(typeFilter).subscribe({ next: handler });
  }
  getStream(eventType) {
    return new rxjs.Observable((observer) => {
      const handler = (event) => {
        observer.next(event);
      };
      this.emitter.on(eventType.type, handler);
      this.subscribers.set(handler, observer);
      return () => {
        this.emitter.off(eventType.type, handler);
        this.subscribers.delete(handler);
      };
    });
  }
  newScopedBus(key, filter2) {
    return new ScopedEventBus([key], this, filter2);
  }
  /**
   * Legacy functions
   */
  emit(event, payload) {
    if (typeof event === "string") {
      this.emitter.emit(event, { type: event, payload });
    } else {
      this.emitter.emit(event.name, { type: event.name, payload });
    }
  }
  on(event, handler, scope) {
    handler.wrapper = (emittedEvent) => {
      handler(emittedEvent.payload);
    };
    if (typeof event === "string") {
      this.emitter.on(event, handler.wrapper);
    } else {
      this.emitter.on(event.name, handler.wrapper);
    }
    if (scope) {
      const unbind = scope.$on("$destroy", () => {
        this.off(event, handler);
        unbind();
      });
    }
  }
  off(event, handler) {
    if (typeof event === "string") {
      this.emitter.off(event, handler.wrapper);
      return;
    }
    this.emitter.off(event.name, handler.wrapper);
  }
  removeAllListeners() {
    this.emitter.removeAllListeners();
    for (const [key, sub] of this.subscribers) {
      sub.complete();
      this.subscribers.delete(key);
    }
  }
}
class ScopedEventBus {
  // The path is not yet exposed, but can be used to indicate nested groups and support faster filtering
  constructor(path, eventBus, filter2) {
    this.path = path;
    this.eventBus = eventBus;
    // will be mutated by panel runners
    __publicField$3(this, "filterConfig");
    this.filterConfig = filter2 != null ? filter2 : { onlyLocal: false };
  }
  publish(event) {
    if (!event.origin) {
      event.origin = this;
    }
    this.eventBus.publish(event);
  }
  filter(event) {
    if (this.filterConfig.onlyLocal) {
      return event.origin === this;
    }
    return true;
  }
  getStream(eventType) {
    return this.eventBus.getStream(eventType).pipe(operators.filter(this.filter.bind(this)));
  }
  // syntax sugar
  subscribe(typeFilter, handler) {
    return this.getStream(typeFilter).subscribe({ next: handler });
  }
  removeAllListeners() {
    this.eventBus.removeAllListeners();
  }
  /**
   * Creates a nested event bus structure
   */
  newScopedBus(key, filter2) {
    return new ScopedEventBus([...this.path, key], this, filter2);
  }
}

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataHoverEvent extends BusEventWithPayload {
}
__publicField$2(DataHoverEvent, "type", "data-hover");
class DataHoverClearEvent extends BusEventBase {
}
__publicField$2(DataHoverClearEvent, "type", "data-hover-clear");
class DataSelectEvent extends BusEventWithPayload {
}
__publicField$2(DataSelectEvent, "type", "data-select");
class AnnotationChangeEvent extends BusEventWithPayload {
}
__publicField$2(AnnotationChangeEvent, "type", "annotation-event");
class DashboardLoadedEvent extends BusEventWithPayload {
}
__publicField$2(DashboardLoadedEvent, "type", "dashboard-loaded");
class DataSourceUpdatedSuccessfully extends BusEventBase {
}
__publicField$2(DataSourceUpdatedSuccessfully, "type", "datasource-updated-successfully");
class DataSourceTestSucceeded extends BusEventBase {
}
__publicField$2(DataSourceTestSucceeded, "type", "datasource-test-succeeded");
class DataSourceTestFailed extends BusEventBase {
}
__publicField$2(DataSourceTestFailed, "type", "datasource-test-failed");
class SetPanelAttentionEvent extends BusEventWithPayload {
}
__publicField$2(SetPanelAttentionEvent, "type", "set-panel-attention");

const monacoLanguageRegistry = new Registry();

const getNextRefId = (queries) => {
  for (let num = 0; ; num++) {
    const refId = getRefId(num);
    if (!queries.some((query) => query.refId === refId)) {
      return refId;
    }
  }
};
function getRefId(num) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (num < letters.length) {
    return letters[num];
  } else {
    return getRefId(Math.floor(num / letters.length) - 1) + letters[num % letters.length];
  }
}

var LayoutModes = /* @__PURE__ */ ((LayoutModes2) => {
  LayoutModes2["Grid"] = "grid";
  LayoutModes2["List"] = "list";
  return LayoutModes2;
})(LayoutModes || {});

var __defProp$4 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
function createFieldConfigRegistry(config = {}, pluginName) {
  var _a, _b, _c, _d;
  const registry = new FieldConfigOptionsRegistry();
  const standardConfigs = standardFieldConfigEditorRegistry.list();
  const standardOptionsExtensions = {};
  if (config.useCustomConfig) {
    const builder = new FieldConfigEditorBuilder();
    config.useCustomConfig(builder);
    for (const customProp of builder.getRegistry().list()) {
      customProp.isCustom = true;
      customProp.id = "custom." + customProp.id;
      if (isStandardConfigExtension(customProp, standardConfigs)) {
        const currentExtensions = (_a = standardOptionsExtensions[customProp.category[0]]) != null ? _a : [];
        currentExtensions.push(customProp);
        standardOptionsExtensions[customProp.category[0]] = currentExtensions;
      } else {
        registry.register(customProp);
      }
    }
  }
  for (let fieldConfigProp of standardConfigs) {
    const id = fieldConfigProp.id;
    if (config.disableStandardOptions) {
      const isDisabled = config.disableStandardOptions.indexOf(id) > -1;
      if (isDisabled) {
        continue;
      }
    }
    if (config.standardOptions) {
      const customHideFromDefaults = (_b = config.standardOptions[id]) == null ? void 0 : _b.hideFromDefaults;
      const customDefault = (_c = config.standardOptions[id]) == null ? void 0 : _c.defaultValue;
      const customSettings = (_d = config.standardOptions[id]) == null ? void 0 : _d.settings;
      if (customHideFromDefaults) {
        fieldConfigProp = __spreadProps$2(__spreadValues$3({}, fieldConfigProp), {
          hideFromDefaults: customHideFromDefaults
        });
      }
      if (customDefault) {
        fieldConfigProp = __spreadProps$2(__spreadValues$3({}, fieldConfigProp), {
          defaultValue: customDefault
        });
      }
      if (customSettings) {
        fieldConfigProp = __spreadProps$2(__spreadValues$3({}, fieldConfigProp), {
          settings: fieldConfigProp.settings ? __spreadValues$3(__spreadValues$3({}, fieldConfigProp.settings), customSettings) : customSettings
        });
      }
    }
    registry.register(fieldConfigProp);
    if (fieldConfigProp.category && standardOptionsExtensions[fieldConfigProp.category[0]]) {
      for (let extensionProperty of standardOptionsExtensions[fieldConfigProp.category[0]]) {
        registry.register(extensionProperty);
      }
    }
  }
  for (const item of registry.list()) {
    if (item.path.indexOf("[") > 0) {
      throw new Error(`[${pluginName}] Field config paths do not support arrays: ${item.id}`);
    }
  }
  return registry;
}
function isStandardConfigExtension(property, standardProperties) {
  return Boolean(
    standardProperties.find((p) => property.category && p.category && property.category[0] === p.category[0])
  );
}

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelPlugin extends GrafanaPlugin {
  constructor(panel) {
    super();
    __publicField$1(this, "_defaults");
    __publicField$1(this, "_fieldConfigDefaults", {
      defaults: {},
      overrides: []
    });
    __publicField$1(this, "_fieldConfigRegistry");
    __publicField$1(this, "_initConfigRegistry", () => {
      return new FieldConfigOptionsRegistry();
    });
    __publicField$1(this, "optionsSupplier");
    __publicField$1(this, "suggestionsSupplier");
    __publicField$1(this, "panel");
    __publicField$1(this, "editor");
    __publicField$1(this, "onPanelMigration");
    __publicField$1(this, "onPanelTypeChanged");
    __publicField$1(this, "noPadding");
    __publicField$1(this, "dataSupport", {
      annotations: false,
      alertStates: false
    });
    /**
     * Legacy angular ctrl. If this exists it will be used instead of the panel
     */
    __publicField$1(this, "angularPanelCtrl");
    this.panel = panel;
  }
  get defaults() {
    let result = this._defaults || {};
    if (!this._defaults && this.optionsSupplier) {
      const builder = new PanelOptionsEditorBuilder();
      this.optionsSupplier(builder, { data: [] });
      for (const item of builder.getItems()) {
        if (item.defaultValue != null) {
          lodash.set(result, item.path, item.defaultValue);
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
      lodash.set(configDefaults, option.id, option.defaultValue);
    }
    return {
      defaults: __spreadValues$2({}, configDefaults),
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
    this.dataSupport = __spreadValues$2(__spreadValues$2({}, this.dataSupport), support);
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

var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function getPanelOptionsWithDefaults({
  plugin,
  currentOptions,
  currentFieldConfig,
  isAfterPluginChange
}) {
  const optionsWithDefaults = lodash.mergeWith({}, plugin.defaults, currentOptions || {}, (objValue, srcValue) => {
    if (lodash.isArray(srcValue)) {
      return srcValue;
    }
    return;
  });
  const fieldConfigWithDefaults = applyFieldConfigDefaults(currentFieldConfig, plugin);
  const fieldConfigWithOptimalColorMode = adaptFieldColorMode(plugin, fieldConfigWithDefaults, isAfterPluginChange);
  return { options: optionsWithDefaults, fieldConfig: fieldConfigWithOptimalColorMode };
}
function applyFieldConfigDefaults(existingFieldConfig, plugin) {
  var _a;
  const pluginDefaults = plugin.fieldConfigDefaults;
  const result = {
    defaults: lodash.mergeWith(
      {},
      pluginDefaults.defaults,
      existingFieldConfig ? existingFieldConfig.defaults : {},
      (objValue, srcValue) => {
        if (lodash.isArray(srcValue)) {
          return srcValue;
        }
        return;
      }
    ),
    overrides: (_a = existingFieldConfig == null ? void 0 : existingFieldConfig.overrides) != null ? _a : []
  };
  cleanProperties(result.defaults, "", plugin.fieldConfigRegistry);
  if (result.defaults.thresholds) {
    fixThresholds(result.defaults.thresholds);
  }
  result.overrides = filterFieldConfigOverrides(result.overrides, (prop) => {
    return plugin.fieldConfigRegistry.getIfExists(prop.id) !== void 0;
  });
  for (const override of result.overrides) {
    for (const property of override.properties) {
      if (property.id === "thresholds") {
        fixThresholds(property.value);
      }
    }
  }
  return result;
}
function filterFieldConfigOverrides(overrides, condition) {
  return overrides.map((x) => {
    const properties = x.properties.filter(condition);
    return __spreadProps$1(__spreadValues$1({}, x), {
      properties
    });
  });
}
function cleanProperties(obj, parentPath, fieldConfigRegistry) {
  let found = false;
  for (const [propName, value] of Object.entries(obj)) {
    const fullPath = `${parentPath}${propName}`;
    const existsInRegistry = !!fieldConfigRegistry.getIfExists(fullPath);
    if (existsInRegistry) {
      found = true;
      continue;
    }
    if (lodash.isArray(value) || !lodash.isObject(value)) {
      if (!existsInRegistry) {
        lodash.unset(obj, propName);
      }
    } else {
      const childPropFound = cleanProperties(value, `${fullPath}.`, fieldConfigRegistry);
      if (!childPropFound) {
        lodash.unset(obj, propName);
      }
    }
  }
  return found;
}
function adaptFieldColorMode(plugin, fieldConfig, isAfterPluginChange) {
  var _a;
  if (!isAfterPluginChange) {
    return fieldConfig;
  }
  const color = plugin.fieldConfigRegistry.getIfExists(FieldConfigProperty.Color);
  if (color && color.settings) {
    const colorSettings = color.settings;
    const mode = fieldColorModeRegistry.getIfExists((_a = fieldConfig.defaults.color) == null ? void 0 : _a.mode);
    if (!colorSettings.byValueSupport) {
      if (!mode || mode.isByValue) {
        fieldConfig.defaults.color = { mode: FieldColorModeId.PaletteClassic };
        return fieldConfig;
      }
    }
    if (colorSettings.byValueSupport && colorSettings.preferThresholdsMode && (mode == null ? void 0 : mode.id) !== FieldColorModeId.Fixed) {
      if (!mode || !mode.isByValue) {
        fieldConfig.defaults.color = { mode: FieldColorModeId.Thresholds };
        return fieldConfig;
      }
    }
    if (colorSettings.bySeriesSupport && (mode == null ? void 0 : mode.isByValue)) {
      fieldConfig.defaults.color = { mode: FieldColorModeId.PaletteClassic };
      return fieldConfig;
    }
  }
  return fieldConfig;
}
function fixThresholds(thresholds) {
  if (!thresholds.mode) {
    thresholds.mode = ThresholdsMode.Absolute;
  }
  if (!thresholds.steps) {
    thresholds.steps = [];
  } else if (thresholds.steps.length) {
    thresholds.steps[0].value = -Infinity;
  }
}
function restoreCustomOverrideRules(current, old) {
  const result = {
    defaults: __spreadProps$1(__spreadValues$1({}, current.defaults), {
      custom: old.defaults.custom
    }),
    overrides: [...current.overrides]
  };
  for (const override of old.overrides) {
    for (const prop of override.properties) {
      if (isCustomFieldProp(prop)) {
        const currentOverride = result.overrides.find((o) => lodash.isEqual(o.matcher, override.matcher));
        if (currentOverride) {
          if (currentOverride !== override) {
            currentOverride.properties.push(prop);
          }
        } else {
          result.overrides.push(override);
        }
      }
    }
  }
  return result;
}
function isCustomFieldProp(prop) {
  return prop.id.startsWith("custom.");
}
function isStandardFieldProp(prop) {
  return !isCustomFieldProp(prop);
}

const Context = React.createContext(void 0);

var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function PluginContextProvider(props) {
  const _a = props, { children } = _a, rest = __objRest(_a, ["children"]);
  return /* @__PURE__ */ React__default["default"].createElement(Context.Provider, { value: rest }, children);
}

function DataSourcePluginContextProvider(props) {
  const { children, instanceSettings } = props;
  const value = React.useMemo(() => {
    return { instanceSettings, meta: instanceSettings.meta };
  }, [instanceSettings]);
  return /* @__PURE__ */ React__default["default"].createElement(Context.Provider, { value }, children);
}

function usePluginContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("usePluginContext must be used within a PluginContextProvider");
  }
  return context;
}

function isDataSourcePluginContext(context) {
  return "instanceSettings" in context && "meta" in context;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CircularVector extends FunctionalVector {
  constructor(options) {
    super();
    __publicField(this, "buffer");
    __publicField(this, "index");
    __publicField(this, "capacity");
    __publicField(this, "tail");
    this.buffer = options.buffer || [];
    this.capacity = this.buffer.length;
    this.tail = "head" !== options.append;
    this.index = 0;
    this.add = this.getAddFunction();
    if (options.capacity) {
      this.setCapacity(options.capacity);
    }
    return new Proxy(this, {
      get(target, property, receiver) {
        if (typeof property !== "symbol") {
          const idx = +property;
          if (String(idx) === property) {
            return target.get(idx);
          }
        }
        return Reflect.get(target, property, receiver);
      },
      set(target, property, value, receiver) {
        if (typeof property !== "symbol") {
          const idx = +property;
          if (String(idx) === property) {
            target.set(idx, value);
            return true;
          }
        }
        return Reflect.set(target, property, value, receiver);
      }
    });
  }
  /**
   * This gets the appropriate add function depending on the buffer state:
   *  * head vs tail
   *  * growing buffer vs overwriting values
   */
  getAddFunction() {
    if (this.capacity > this.buffer.length) {
      if (this.tail) {
        return (value) => {
          this.buffer.push(value);
          if (this.buffer.length >= this.capacity) {
            this.add = this.getAddFunction();
          }
        };
      } else {
        return (value) => {
          this.buffer.unshift(value);
          if (this.buffer.length >= this.capacity) {
            this.add = this.getAddFunction();
          }
        };
      }
    }
    if (this.tail) {
      return (value) => {
        this.buffer[this.index] = value;
        this.index = (this.index + 1) % this.buffer.length;
      };
    }
    return (value) => {
      let idx = this.index - 1;
      if (idx < 0) {
        idx = this.buffer.length - 1;
      }
      this.buffer[idx] = value;
      this.index = idx;
    };
  }
  setCapacity(v) {
    if (this.capacity === v) {
      return;
    }
    const copy = this.toArray();
    if (v > this.length) {
      this.buffer = copy;
    } else if (v < this.capacity) {
      const delta = this.length - v;
      if (this.tail) {
        this.buffer = copy.slice(delta, copy.length);
      } else {
        this.buffer = copy.slice(0, copy.length - delta);
      }
    }
    this.capacity = v;
    this.index = 0;
    this.add = this.getAddFunction();
  }
  setAppendMode(mode) {
    const tail = "head" !== mode;
    if (tail !== this.tail) {
      this.buffer = this.toArray().reverse();
      this.index = 0;
      this.tail = tail;
      this.add = this.getAddFunction();
    }
  }
  reverse() {
    return this.buffer.reverse();
  }
  get(index) {
    return this.buffer[(index + this.index) % this.buffer.length];
  }
  set(index, value) {
    this.buffer[(index + this.index) % this.buffer.length] = value;
  }
  get length() {
    return this.buffer.length;
  }
}

const notice = "ArrayVector is deprecated and will be removed in Grafana 11. Please use plain arrays for field.values.";
let notified = false;
class ArrayVector extends Array {
  get buffer() {
    return this;
  }
  set buffer(values) {
    this.length = 0;
    const len = values == null ? void 0 : values.length;
    if (len) {
      let chonkSize = 65e3;
      let numChonks = Math.ceil(len / chonkSize);
      for (let chonkIdx = 0; chonkIdx < numChonks; chonkIdx++) {
        this.push.apply(this, values.slice(chonkIdx * chonkSize, (chonkIdx + 1) * chonkSize));
      }
    }
  }
  /**
   * ArrayVector is deprecated and should not be used. If you get a Typescript error here, use plain arrays for field.values.
   */
  // `never` is used to force a build-type error from Typescript to encourage developers to move away from using this
  constructor(buffer) {
    super();
    this.buffer = buffer != null ? buffer : [];
    if (!notified) {
      console.warn(notice);
      notified = true;
    }
  }
  toJSON() {
    return [...this];
  }
}

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
class CircularDataFrame extends MutableDataFrame {
  constructor(options) {
    super(void 0, (buffer) => {
      return new CircularVector(__spreadProps(__spreadValues({}, options), {
        buffer
      }));
    });
  }
}

Object.defineProperty(exports, 'DataTopic', {
  enumerable: true,
  get: function () { return schema.DataTopic; }
});
Object.defineProperty(exports, 'FrameGeometrySourceMode', {
  enumerable: true,
  get: function () { return schema.FrameGeometrySourceMode; }
});
Object.defineProperty(exports, 'LogsDedupStrategy', {
  enumerable: true,
  get: function () { return schema.LogsDedupStrategy; }
});
Object.defineProperty(exports, 'LogsSortOrder', {
  enumerable: true,
  get: function () { return schema.LogsSortOrder; }
});
exports.AbstractLabelOperator = AbstractLabelOperator;
exports.AlertState = AlertState;
exports.AnnotationChangeEvent = AnnotationChangeEvent;
exports.AnnotationEventFieldSource = AnnotationEventFieldSource;
exports.AppEvents = AppEvents;
exports.AppPlugin = AppPlugin;
exports.ArrayDataFrame = ArrayDataFrame;
exports.ArrayVector = ArrayVector;
exports.BinaryOperationID = BinaryOperationID;
exports.BusEventBase = BusEventBase;
exports.BusEventWithPayload = BusEventWithPayload;
exports.ByNamesMatcherMode = ByNamesMatcherMode;
exports.CSVHeaderStyle = CSVHeaderStyle;
exports.CSVReader = CSVReader;
exports.CircularDataFrame = CircularDataFrame;
exports.CircularVector = CircularVector;
exports.CoreApp = CoreApp;
exports.CustomVariableSupport = CustomVariableSupport;
exports.DEFAULT_FIELD_DISPLAY_VALUES_LIMIT = DEFAULT_FIELD_DISPLAY_VALUES_LIMIT;
exports.DEFAULT_SAML_NAME = DEFAULT_SAML_NAME;
exports.DashboardCursorSync = DashboardCursorSync;
exports.DashboardLoadedEvent = DashboardLoadedEvent;
exports.DataFrameType = DataFrameType;
exports.DataFrameView = DataFrameView;
exports.DataHoverClearEvent = DataHoverClearEvent;
exports.DataHoverEvent = DataHoverEvent;
exports.DataLinkBuiltInVars = DataLinkBuiltInVars;
exports.DataLinkConfigOrigin = DataLinkConfigOrigin;
exports.DataQueryErrorType = DataQueryErrorType;
exports.DataSelectEvent = DataSelectEvent;
exports.DataSourceApi = DataSourceApi;
exports.DataSourcePlugin = DataSourcePlugin;
exports.DataSourcePluginContextProvider = DataSourcePluginContextProvider;
exports.DataSourceTestFailed = DataSourceTestFailed;
exports.DataSourceTestSucceeded = DataSourceTestSucceeded;
exports.DataSourceUpdatedSuccessfully = DataSourceUpdatedSuccessfully;
exports.DataSourceVariableSupport = DataSourceVariableSupport;
exports.DataTransformerID = DataTransformerID;
exports.DefaultTimeZone = DefaultTimeZone;
exports.DocsId = DocsId;
exports.EventBusSrv = EventBusSrv;
exports.ExploreMode = ExploreMode;
exports.FALLBACK_COLOR = FALLBACK_COLOR;
exports.FeatureState = FeatureState;
exports.FieldCache = FieldCache;
exports.FieldColorModeId = FieldColorModeId;
exports.FieldConfigEditorBuilder = FieldConfigEditorBuilder;
exports.FieldConfigOptionsRegistry = FieldConfigOptionsRegistry;
exports.FieldConfigProperty = FieldConfigProperty;
exports.FieldMatcherID = FieldMatcherID;
exports.FieldNamePickerBaseNameMode = FieldNamePickerBaseNameMode;
exports.FieldType = FieldType;
exports.FrameMatcherID = FrameMatcherID;
exports.GAUGE_DEFAULT_MAXIMUM = GAUGE_DEFAULT_MAXIMUM;
exports.GAUGE_DEFAULT_MINIMUM = GAUGE_DEFAULT_MINIMUM;
exports.GrafanaPlugin = GrafanaPlugin;
exports.GrafanaThemeType = GrafanaThemeType;
exports.ISO_8601 = ISO_8601;
exports.InternalTimeZones = InternalTimeZones;
exports.LanguageProvider = LanguageProvider;
exports.LayoutModes = LayoutModes;
exports.LegacyGraphHoverClearEvent = LegacyGraphHoverClearEvent;
exports.LegacyGraphHoverEvent = LegacyGraphHoverEvent;
exports.LegacyMappingType = LegacyMappingType;
exports.LiveChannelConnectionState = LiveChannelConnectionState;
exports.LiveChannelEventType = LiveChannelEventType;
exports.LiveChannelScope = LiveChannelScope;
exports.LiveChannelType = LiveChannelType;
exports.LoadingState = LoadingState;
exports.LogLevel = LogLevel;
exports.LogRowContextQueryDirection = LogRowContextQueryDirection;
exports.LogsDedupDescription = LogsDedupDescription;
exports.LogsMetaKind = LogsMetaKind;
exports.LogsVolumeType = LogsVolumeType;
exports.MISSING_VALUE = MISSING_VALUE;
exports.MappingType = MappingType;
exports.MatcherID = MatcherID;
exports.MutableDataFrame = MutableDataFrame;
exports.NodeGraphDataFrameFieldNames = NodeGraphDataFrameFieldNames;
exports.NullValueMode = NullValueMode;
exports.NumericLogLevel = NumericLogLevel;
exports.OrgRole = OrgRole;
exports.PageLayoutType = PageLayoutType;
exports.PanelEvents = PanelEvents;
exports.PanelOptionsEditorBuilder = PanelOptionsEditorBuilder;
exports.PanelPlugin = PanelPlugin;
exports.PluginContextProvider = PluginContextProvider;
exports.PluginErrorCode = PluginErrorCode;
exports.PluginExtensionPoints = PluginExtensionPoints;
exports.PluginExtensionTypes = PluginExtensionTypes;
exports.PluginIncludeType = PluginIncludeType;
exports.PluginSignatureStatus = PluginSignatureStatus;
exports.PluginSignatureType = PluginSignatureType;
exports.PluginState = PluginState;
exports.PluginType = PluginType;
exports.ReducerID = ReducerID;
exports.Registry = Registry;
exports.SetPanelAttentionEvent = SetPanelAttentionEvent;
exports.SpecialValue = SpecialValue;
exports.SpecialValueMatch = SpecialValueMatch;
exports.StandardVariableSupport = StandardVariableSupport;
exports.StreamingDataFrame = StreamingDataFrame;
exports.StreamingFrameAction = StreamingFrameAction;
exports.SupplementaryQueryType = SupplementaryQueryType;
exports.SupportedTransformationType = SupportedTransformationType;
exports.SystemDateFormatsState = SystemDateFormatsState;
exports.TIME_FORMAT = TIME_FORMAT;
exports.TIME_SERIES_METRIC_FIELD_NAME = TIME_SERIES_METRIC_FIELD_NAME;
exports.TIME_SERIES_TIME_FIELD_NAME = TIME_SERIES_TIME_FIELD_NAME;
exports.TIME_SERIES_VALUE_FIELD_NAME = TIME_SERIES_VALUE_FIELD_NAME;
exports.ThemeContext = ThemeContext;
exports.ThresholdsMode = ThresholdsMode;
exports.TransformationApplicabilityLevels = TransformationApplicabilityLevels;
exports.TransformerCategory = TransformerCategory;
exports.UnaryOperationID = UnaryOperationID;
exports.VAR_CALC = VAR_CALC;
exports.VAR_CELL_PREFIX = VAR_CELL_PREFIX;
exports.VAR_FIELD_LABELS = VAR_FIELD_LABELS;
exports.VAR_FIELD_NAME = VAR_FIELD_NAME;
exports.VAR_SERIES_NAME = VAR_SERIES_NAME;
exports.ValueMatcherID = ValueMatcherID;
exports.VariableHide = VariableHide;
exports.VariableOrigin = VariableOrigin;
exports.VariableRefresh = VariableRefresh;
exports.VariableSort = VariableSort;
exports.VariableSuggestionsScope = VariableSuggestionsScope;
exports.VariableSupportBase = VariableSupportBase;
exports.VariableSupportType = VariableSupportType;
exports.VisualizationSuggestionScore = VisualizationSuggestionScore;
exports.VisualizationSuggestionsBuilder = VisualizationSuggestionsBuilder;
exports.VisualizationSuggestionsListAppender = VisualizationSuggestionsListAppender;
exports.VizOrientation = VizOrientation;
exports.addDurationToDate = addDurationToDate;
exports.addRow = addRow;
exports.anySeriesWithTimeField = anySeriesWithTimeField;
exports.anyToNumber = anyToNumber;
exports.applyFieldOverrides = applyFieldOverrides;
exports.applyNullInsertThreshold = applyNullInsertThreshold;
exports.applyRawFieldOverrides = applyRawFieldOverrides;
exports.arrayToDataFrame = arrayToDataFrame;
exports.arrayUtils = arrayUtils;
exports.availableIconsIndex = availableIconsIndex;
exports.binaryOperators = binaryOperators;
exports.booleanOverrideProcessor = booleanOverrideProcessor;
exports.booleanValueFormatter = booleanValueFormatter;
exports.buildHistogram = buildHistogram;
exports.cacheFieldDisplayNames = cacheFieldDisplayNames;
exports.classicColors = classicColors;
exports.closestIdx = closestIdx;
exports.colorManipulator = colorManipulator;
exports.compareArrayValues = compareArrayValues;
exports.compareDataFrameStructures = compareDataFrameStructures;
exports.containsSearchFilter = containsSearchFilter;
exports.convertOldAngularValueMappings = convertOldAngularValueMappings;
exports.createDataFrame = createDataFrame;
exports.createDimension = createDimension;
exports.createFieldConfigRegistry = createFieldConfigRegistry;
exports.createTheme = createTheme;
exports.dataFrameFromJSON = dataFrameFromJSON;
exports.dataFrameToJSON = dataFrameToJSON;
exports.dataLinksOverrideProcessor = dataLinksOverrideProcessor;
exports.dateMath = datemath;
exports.dateTime = dateTime;
exports.dateTimeAsMoment = dateTimeAsMoment;
exports.dateTimeForTimeZone = dateTimeForTimeZone;
exports.dateTimeFormat = dateTimeFormat;
exports.dateTimeFormatISO = dateTimeFormatISO;
exports.dateTimeFormatTimeAgo = dateTimeFormatTimeAgo;
exports.dateTimeFormatWithAbbrevation = dateTimeFormatWithAbbrevation;
exports.dateTimeParse = dateTimeParse;
exports.decodeFieldValueEntities = decodeFieldValueEntities;
exports.decodeFieldValueEnums = decodeFieldValueEnums;
exports.defaultCalcs = defaultCalcs;
exports.deprecationWarning = deprecationWarning;
exports.displayNameOverrideProcessor = displayNameOverrideProcessor;
exports.doStandardCalcs = doStandardCalcs;
exports.durationToMilliseconds = durationToMilliseconds;
exports.ensureTimeField = ensureTimeField;
exports.escapeRegex = escapeRegex;
exports.escapeStringForRegex = escapeStringForRegex;
exports.eventFactory = eventFactory;
exports.fieldColorModeRegistry = fieldColorModeRegistry;
exports.fieldMatchers = fieldMatchers;
exports.fieldReducers = fieldReducers;
exports.filterFieldConfigOverrides = filterFieldConfigOverrides;
exports.findCommonLabels = findCommonLabels;
exports.findHighlightChunksInText = findHighlightChunksInText;
exports.findMatchesInText = findMatchesInText;
exports.findUniqueLabels = findUniqueLabels;
exports.fixCellTemplateExpressions = fixCellTemplateExpressions;
exports.formatLabels = formatLabels;
exports.formattedValueToString = formattedValueToString;
exports.frameMatchers = frameMatchers;
exports.getActiveThreshold = getActiveThreshold;
exports.getAllValuesFromDimension = getAllValuesFromDimension;
exports.getBuiltInThemes = getBuiltInThemes;
exports.getColumnFromDimension = getColumnFromDimension;
exports.getColumnsFromDimension = getColumnsFromDimension;
exports.getDataFrameRow = getDataFrameRow;
exports.getDataSourceRef = getDataSourceRef;
exports.getDataSourceUID = getDataSourceUID;
exports.getDefaultRelativeTimeRange = getDefaultRelativeTimeRange;
exports.getDefaultTimeRange = getDefaultTimeRange;
exports.getDimensionByName = getDimensionByName;
exports.getDisplayProcessor = getDisplayProcessor;
exports.getDisplayValueAlignmentFactors = getDisplayValueAlignmentFactors;
exports.getFieldColorMode = getFieldColorMode;
exports.getFieldColorModeForField = getFieldColorModeForField;
exports.getFieldConfigWithMinMax = getFieldConfigWithMinMax;
exports.getFieldDisplayName = getFieldDisplayName;
exports.getFieldDisplayValues = getFieldDisplayValues;
exports.getFieldDisplayValuesProxy = getFieldDisplayValuesProxy;
exports.getFieldMatcher = getFieldMatcher;
exports.getFieldSeriesColor = getFieldSeriesColor;
exports.getFieldTypeFromValue = getFieldTypeFromValue;
exports.getFlotPairs = getFlotPairs;
exports.getFlotPairsConstant = getFlotPairsConstant;
exports.getFrameDisplayName = getFrameDisplayName;
exports.getFrameMatchers = getFrameMatchers;
exports.getHistogramFields = getHistogramFields;
exports.getLinksSupplier = getLinksSupplier;
exports.getLocale = getLocale;
exports.getLocaleData = getLocaleData;
exports.getMinMaxAndDelta = getMinMaxAndDelta;
exports.getNextRefId = getNextRefId;
exports.getPanelOptionsWithDefaults = getPanelOptionsWithDefaults;
exports.getProcessedDataFrames = getProcessedDataFrames;
exports.getRawDisplayProcessor = getRawDisplayProcessor;
exports.getRowUniqueId = getRowUniqueId;
exports.getScaleCalculator = getScaleCalculator;
exports.getSearchFilterScopedVar = getSearchFilterScopedVar;
exports.getSeriesTimeStep = getSeriesTimeStep;
exports.getThemeById = getThemeById;
exports.getTimeField = getTimeField;
exports.getTimeZone = getTimeZone;
exports.getTimeZoneGroups = getTimeZoneGroups;
exports.getTimeZoneInfo = getTimeZoneInfo;
exports.getTimeZones = getTimeZones;
exports.getUniqueFieldName = getUniqueFieldName;
exports.getValueFormat = getValueFormat;
exports.getValueFormats = getValueFormats;
exports.getValueFormatterIndex = getValueFormatterIndex;
exports.getValueFromDimension = getValueFromDimension;
exports.getValueMatcher = getValueMatcher;
exports.getWeekdayIndex = getWeekdayIndex;
exports.getWeekdayIndexByEnglishName = getWeekdayIndexByEnglishName;
exports.getZone = getZone;
exports.guessDecimals = guessDecimals;
exports.guessFieldTypeForField = guessFieldTypeForField;
exports.guessFieldTypeFromNameAndValue = guessFieldTypeFromNameAndValue;
exports.guessFieldTypeFromValue = guessFieldTypeFromValue;
exports.guessFieldTypes = guessFieldTypes;
exports.hasLinks = hasLinks;
exports.hasLogsContextSupport = hasLogsContextSupport;
exports.hasLogsContextUiSupport = hasLogsContextUiSupport;
exports.hasMsResolution = hasMsResolution;
exports.hasQueryExportSupport = hasQueryExportSupport;
exports.hasQueryImportSupport = hasQueryImportSupport;
exports.hasQueryModificationSupport = hasQueryModificationSupport;
exports.hasSupplementaryQuerySupport = hasSupplementaryQuerySupport;
exports.hasTimeField = hasTimeField;
exports.hasToggleableQueryFiltersSupport = hasToggleableQueryFiltersSupport;
exports.histogramBucketSizes = histogramBucketSizes;
exports.histogramFieldInfo = histogramFieldInfo;
exports.histogramFieldsToFrame = histogramFieldsToFrame;
exports.histogramFrameBucketMaxFieldName = histogramFrameBucketMaxFieldName;
exports.histogramFrameBucketMinFieldName = histogramFrameBucketMinFieldName;
exports.histogramTransformer = histogramTransformer;
exports.identityOverrideProcessor = identityOverrideProcessor;
exports.incrRound = incrRound;
exports.incrRoundDn = incrRoundDn;
exports.incrRoundUp = incrRoundUp;
exports.intervalToAbbreviatedDurationString = intervalToAbbreviatedDurationString;
exports.isBooleanUnit = isBooleanUnit;
exports.isCustomFieldProp = isCustomFieldProp;
exports.isDataFrame = isDataFrame;
exports.isDataFrameWithValue = isDataFrameWithValue;
exports.isDataSourcePluginContext = isDataSourcePluginContext;
exports.isDataSourceRef = isDataSourceRef;
exports.isDateTime = isDateTime;
exports.isDateTimeInput = isDateTimeInput;
exports.isEmptyObject = isEmptyObject;
exports.isHistogramFrameBucketMaxFieldName = isHistogramFrameBucketMaxFieldName;
exports.isHistogramFrameBucketMinFieldName = isHistogramFrameBucketMinFieldName;
exports.isIconName = isIconName;
exports.isLikelyAscendingVector = isLikelyAscendingVector;
exports.isLiveChannelJoinEvent = isLiveChannelJoinEvent;
exports.isLiveChannelLeaveEvent = isLiveChannelLeaveEvent;
exports.isLiveChannelMessageEvent = isLiveChannelMessageEvent;
exports.isLiveChannelStatusEvent = isLiveChannelStatusEvent;
exports.isObject = isObject;
exports.isReducerID = isReducerID;
exports.isStandardFieldProp = isStandardFieldProp;
exports.isSystemOverride = isSystemOverride;
exports.isSystemOverrideWithRef = isSystemOverrideWithRef;
exports.isTableData = isTableData;
exports.isTimeSeriesField = isTimeSeriesField;
exports.isTimeSeriesFrame = isTimeSeriesFrame;
exports.isTimeSeriesFrames = isTimeSeriesFrames;
exports.isTruthy = isTruthy;
exports.isUnsignedPluginSignature = isUnsignedPluginSignature;
exports.isValidDate = isValidDate;
exports.isValidDuration = isValidDuration;
exports.isValidGoDuration = isValidGoDuration;
exports.isValidGrafanaDuration = isValidGrafanaDuration;
exports.isValidLiveChannelAddress = isValidLiveChannelAddress;
exports.localTimeFormat = localTimeFormat;
exports.locale = locale;
exports.locationUtil = locationUtil;
exports.makeClassES5Compatible = makeClassES5Compatible;
exports.makeTimeRange = makeTimeRange;
exports.mapInternalLinkToExplore = mapInternalLinkToExplore;
exports.matchAllLabels = matchAllLabels;
exports.matchPluginId = matchPluginId;
exports.monacoLanguageRegistry = monacoLanguageRegistry;
exports.nullToValue = nullToValue;
exports.numberOverrideProcessor = numberOverrideProcessor;
exports.objRemoveUndefined = objRemoveUndefined;
exports.onUpdateDatasourceJsonDataOption = onUpdateDatasourceJsonDataOption;
exports.onUpdateDatasourceJsonDataOptionChecked = onUpdateDatasourceJsonDataOptionChecked;
exports.onUpdateDatasourceJsonDataOptionSelect = onUpdateDatasourceJsonDataOptionSelect;
exports.onUpdateDatasourceOption = onUpdateDatasourceOption;
exports.onUpdateDatasourceResetOption = onUpdateDatasourceResetOption;
exports.onUpdateDatasourceSecureJsonDataOption = onUpdateDatasourceSecureJsonDataOption;
exports.onUpdateDatasourceSecureJsonDataOptionSelect = onUpdateDatasourceSecureJsonDataOptionSelect;
exports.outerJoinDataFrames = joinDataFrames;
exports.parseDuration = parseDuration;
exports.parseFlags = parseFlags;
exports.parseLabels = parseLabels;
exports.parseLiveChannelAddress = parseLiveChannelAddress;
exports.patchArrayVectorProrotypeMethods = patchArrayVectorProrotypeMethods;
exports.preProcessPanelData = preProcessPanelData;
exports.preferredVisualizationTypes = preferredVisualizationTypes;
exports.rangeUtil = rangeutil;
exports.readCSV = readCSV;
exports.reduceField = reduceField;
exports.renderLegendFormat = renderLegendFormat;
exports.renderMarkdown = renderMarkdown;
exports.renderTextPanelMarkdown = renderTextPanelMarkdown;
exports.restoreCustomOverrideRules = restoreCustomOverrideRules;
exports.reverseDataFrame = reverseDataFrame;
exports.roundDecimals = roundDecimals;
exports.scaledUnits = scaledUnits;
exports.scopeFilterOperatorMap = scopeFilterOperatorMap;
exports.selectOverrideProcessor = selectOverrideProcessor;
exports.serializeStateToUrlParam = serializeStateToUrlParam;
exports.setLocale = setLocale;
exports.setTimeZoneResolver = setTimeZoneResolver;
exports.setWeekStart = setWeekStart;
exports.shallowCompare = shallowCompare;
exports.simpleCountUnit = simpleCountUnit;
exports.sortDataFrame = sortDataFrame;
exports.sortThresholds = sortThresholds;
exports.standardEditorsRegistry = standardEditorsRegistry;
exports.standardFieldConfigEditorRegistry = standardFieldConfigEditorRegistry;
exports.standardTransformers = standardTransformers;
exports.standardTransformersRegistry = standardTransformersRegistry;
exports.stringFormater = stringFormater;
exports.stringOverrideProcessor = stringOverrideProcessor;
exports.stringStartsAsRegEx = stringStartsAsRegEx;
exports.stringToJsRegex = stringToJsRegex;
exports.stringToMs = stringToMs;
exports.systemDateFormats = systemDateFormats;
exports.textUtil = textUtil;
exports.thresholdsOverrideProcessor = thresholdsOverrideProcessor;
exports.timeZoneAbbrevation = timeZoneAbbrevation;
exports.timeZoneFormatUserFriendly = timeZoneFormatUserFriendly;
exports.toCSV = toCSV;
exports.toDataFrame = toDataFrame;
exports.toDataFrameDTO = toDataFrameDTO;
exports.toDuration = toDuration$1;
exports.toFilteredDataFrameDTO = toFilteredDataFrameDTO;
exports.toFixed = toFixed;
exports.toFixedScaled = toFixedScaled;
exports.toFixedUnit = toFixedUnit;
exports.toFloatOrUndefined = toFloatOrUndefined;
exports.toIconName = toIconName;
exports.toIntegerOrUndefined = toIntegerOrUndefined;
exports.toLegacyResponseData = toLegacyResponseData;
exports.toLiveChannelId = toLiveChannelId;
exports.toNumberString = toNumberString;
exports.toOption = toOption;
exports.toPascalCase = toPascalCase;
exports.toURLRange = toURLRange;
exports.toUtc = toUtc;
exports.transformDataFrame = transformDataFrame;
exports.unEscapeStringFromRegex = unEscapeStringFromRegex;
exports.unaryOperators = unaryOperators;
exports.unitOverrideProcessor = unitOverrideProcessor;
exports.updateDatasourcePluginJsonDataOption = updateDatasourcePluginJsonDataOption;
exports.updateDatasourcePluginOption = updateDatasourcePluginOption;
exports.updateDatasourcePluginResetOption = updateDatasourcePluginResetOption;
exports.updateDatasourcePluginSecureJsonDataOption = updateDatasourcePluginSecureJsonDataOption;
exports.urlUtil = urlUtil;
exports.useFieldOverrides = useFieldOverrides;
exports.usePluginContext = usePluginContext;
exports.validateFieldConfig = validateFieldConfig;
exports.valueMappingsOverrideProcessor = valueMappingsOverrideProcessor;
exports.valueMatchers = valueMatchers;
exports.vectorator = vectorator;
exports.withLoadingIndicator = withLoadingIndicator;
//# sourceMappingURL=index.js.map
