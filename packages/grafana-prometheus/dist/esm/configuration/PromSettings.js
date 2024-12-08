import React, { useState } from 'react';
import { onUpdateDatasourceJsonDataOptionChecked, updateDatasourcePluginJsonDataOption } from '@grafana/data';
import { ConfigSubSection } from '@grafana/experimental';
import { config } from '@grafana/runtime';
import { useTheme2, InlineField, Input, Select, Switch } from '@grafana/ui';
import { SUGGESTIONS_LIMIT } from '../language_provider.js';
import { QueryEditorMode } from '../querybuilder/shared/types.js';
import { defaultPrometheusQueryOverlapWindow } from '../querycache/QueryCache.js';
import { PrometheusCacheLevel, PromApplication } from '../types.js';
import { overhaulStyles, PROM_CONFIG_LABEL_WIDTH, docsTip, validateInput } from './ConfigEditor.js';
import { ExemplarsSettings } from './ExemplarsSettings.js';
import { PromFlavorVersions } from './PromFlavorVersions.js';
import { selectors } from '../grafana-e2e-selectors/src/selectors/index.js';

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
const httpOptions = [
  { value: "POST", label: "POST" },
  { value: "GET", label: "GET" }
];
const editorOptions = [
  { value: QueryEditorMode.Builder, label: "Builder" },
  { value: QueryEditorMode.Code, label: "Code" }
];
const cacheValueOptions = [
  { value: PrometheusCacheLevel.Low, label: "Low" },
  { value: PrometheusCacheLevel.Medium, label: "Medium" },
  { value: PrometheusCacheLevel.High, label: "High" },
  { value: PrometheusCacheLevel.None, label: "None" }
];
const prometheusFlavorSelectItems = [
  { value: PromApplication.Prometheus, label: PromApplication.Prometheus },
  { value: PromApplication.Cortex, label: PromApplication.Cortex },
  { value: PromApplication.Mimir, label: PromApplication.Mimir },
  { value: PromApplication.Thanos, label: PromApplication.Thanos }
];
const DURATION_REGEX = /^$|^\d+(ms|[Mwdhmsy])$/;
const MULTIPLE_DURATION_REGEX = /(\d+)(.+)/;
const NON_NEGATIVE_INTEGER_REGEX = /^(0|[1-9]\d*)(\.\d+)?(e\+?\d+)?$/;
const durationError = "Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s";
const countError = "Value is not valid, you can use non-negative integers, including scientific notation";
const PromSettings = (props) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { options, onOptionsChange } = props;
  if (!options.jsonData.httpMethod) {
    options.jsonData.httpMethod = "POST";
  }
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  const [validDuration, updateValidDuration] = useState({
    timeInterval: "",
    queryTimeout: "",
    incrementalQueryOverlapWindow: ""
  });
  const [validCount, updateValidCount] = useState({
    codeModeMetricNamesSuggestionLimit: ""
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Interval behaviour", className: styles.container }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Scrape interval",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "This interval is how frequently Prometheus scrapes targets. Set this to the typical scrape and evaluation interval configured in your Prometheus config file. If you set this to a greater value than your Prometheus config file interval, Grafana will evaluate the data according to this interval and you will see less data points. Defaults to 15s. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        className: "width-20",
        value: options.jsonData.timeInterval,
        spellCheck: false,
        placeholder: "15s",
        onChange: onChangeHandler("timeInterval", options, onOptionsChange),
        onBlur: (e) => updateValidDuration(__spreadProps(__spreadValues({}, validDuration), {
          timeInterval: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.scrapeInterval
      }
    ), validateInput(validDuration.timeInterval, DURATION_REGEX, durationError))
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Query timeout",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Set the Prometheus query timeout. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        className: "width-20",
        value: options.jsonData.queryTimeout,
        onChange: onChangeHandler("queryTimeout", options, onOptionsChange),
        spellCheck: false,
        placeholder: "60s",
        onBlur: (e) => updateValidDuration(__spreadProps(__spreadValues({}, validDuration), {
          queryTimeout: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.queryTimeout
      }
    ), validateInput(validDuration.queryTimeout, DURATION_REGEX, durationError))
  ))))), /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Query editor", className: styles.container }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Default editor",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Set default editor option for all users of this data source. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        "aria-label": `Default Editor (Code or Builder)`,
        options: editorOptions,
        value: (_a = editorOptions.find((o) => o.value === options.jsonData.defaultEditor)) != null ? _a : editorOptions.find((o) => o.value === QueryEditorMode.Builder),
        onChange: onChangeHandler("defaultEditor", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.defaultEditor
      }
    )
  )), /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      label: "Disable metrics lookup",
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Checking this option will disable the metrics chooser and metric/label support in the query field's autocomplete. This helps if you have performance issues with bigger Prometheus instances.", " ", docsTip()),
      interactive: true,
      disabled: options.readOnly,
      className: styles.switchField
    },
    /* @__PURE__ */ React.createElement(
      Switch,
      {
        value: (_b = options.jsonData.disableMetricsLookup) != null ? _b : false,
        onChange: onUpdateDatasourceJsonDataOptionChecked(props, "disableMetricsLookup"),
        id: selectors.components.DataSource.Prometheus.configPage.disableMetricLookup
      }
    )
  )))), /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Performance", className: styles.container }, !options.jsonData.prometheusType && !options.jsonData.prometheusVersion && options.readOnly && /* @__PURE__ */ React.createElement("div", { className: styles.versionMargin }, "For more information on configuring prometheus type and version in data sources, see the", " ", /* @__PURE__ */ React.createElement(
    "a",
    {
      className: styles.textUnderline,
      href: "https://grafana.com/docs/grafana/latest/administration/provisioning/"
    },
    "provisioning documentation"
  ), "."), /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Prometheus type",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Set this to the type of your prometheus database, e.g. Prometheus, Cortex, Mimir or Thanos. Changing this field will save your current settings. Certain types of Prometheus supports or does not support various APIs. For example, some types support regex matching for label queries to improve performance. Some types have an API for metadata. If you set this incorrectly you may experience odd behavior when querying metrics and labels. Please check your Prometheus documentation to ensure you enter the correct type. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        "aria-label": "Prometheus type",
        options: prometheusFlavorSelectItems,
        value: prometheusFlavorSelectItems.find((o) => o.value === options.jsonData.prometheusType),
        onChange: onChangeHandler("prometheusType", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.prometheusType
      }
    )
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, options.jsonData.prometheusType && /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: `${options.jsonData.prometheusType} version`,
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Use this to set the version of your ", options.jsonData.prometheusType, " instance if it is not automatically configured. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        "aria-label": `${options.jsonData.prometheusType} type`,
        options: PromFlavorVersions[options.jsonData.prometheusType],
        value: (_c = PromFlavorVersions[options.jsonData.prometheusType]) == null ? void 0 : _c.find(
          (o) => o.value === options.jsonData.prometheusVersion
        ),
        onChange: onChangeHandler("prometheusVersion", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.prometheusVersion
      }
    )
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Cache level",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Sets the browser caching level for editor queries. Higher cache settings are recommended for high cardinality data sources."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        width: 40,
        onChange: onChangeHandler("cacheLevel", options, onOptionsChange),
        options: cacheValueOptions,
        value: (_d = cacheValueOptions.find((o) => o.value === options.jsonData.cacheLevel)) != null ? _d : PrometheusCacheLevel.Low,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.cacheLevel
      }
    )
  ))), config.featureToggles.prometheusCodeModeMetricNamesSearch && /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Metric names suggestion limit",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "The maximum number of metric names that may appear as autocomplete suggestions in the query editor's Code mode."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        className: "width-20",
        value: options.jsonData.codeModeMetricNamesSuggestionLimit,
        onChange: onChangeHandler("codeModeMetricNamesSuggestionLimit", options, onOptionsChange),
        spellCheck: false,
        placeholder: SUGGESTIONS_LIMIT.toString(),
        onBlur: (e) => updateValidCount(__spreadProps(__spreadValues({}, validCount), {
          codeModeMetricNamesSuggestionLimit: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.codeModeMetricNamesSuggestionLimit
      }
    ), validateInput(
      validCount.codeModeMetricNamesSuggestionLimit,
      NON_NEGATIVE_INTEGER_REGEX,
      countError
    ))
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Incremental querying (beta)",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "This feature will change the default behavior of relative queries to always request fresh data from the prometheus instance, instead query results will be cached, and only new records are requested. Turn this on to decrease database and network load."),
      interactive: true,
      className: styles.switchField,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Switch,
      {
        value: (_e = options.jsonData.incrementalQuerying) != null ? _e : false,
        onChange: onUpdateDatasourceJsonDataOptionChecked(props, "incrementalQuerying"),
        id: selectors.components.DataSource.Prometheus.configPage.incrementalQuerying
      }
    )
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, options.jsonData.incrementalQuerying && /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Query overlap window",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Set a duration like 10m or 120s or 0s. Default of 10 minutes. This duration will be added to the duration of each incremental request."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        onBlur: (e) => updateValidDuration(__spreadProps(__spreadValues({}, validDuration), {
          incrementalQueryOverlapWindow: e.currentTarget.value
        })),
        className: "width-20",
        value: (_f = options.jsonData.incrementalQueryOverlapWindow) != null ? _f : defaultPrometheusQueryOverlapWindow,
        onChange: onChangeHandler("incrementalQueryOverlapWindow", options, onOptionsChange),
        spellCheck: false,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.queryOverlapWindow
      }
    ), validateInput(validDuration.incrementalQueryOverlapWindow, MULTIPLE_DURATION_REGEX, durationError))
  )), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Disable recording rules (beta)",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "This feature will disable recording rules Turn this on to improve dashboard performance"),
      interactive: true,
      className: styles.switchField,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Switch,
      {
        value: (_g = options.jsonData.disableRecordingRules) != null ? _g : false,
        onChange: onUpdateDatasourceJsonDataOptionChecked(props, "disableRecordingRules"),
        id: selectors.components.DataSource.Prometheus.configPage.disableRecordingRules
      }
    )
  ))))), /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Other", className: styles.container }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Custom query parameters",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Add custom parameters to the Prometheus query URL. For example timeout, partial_response, dedup, or max_source_resolution. Multiple parameters should be concatenated together with an \u2018&\u2019. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        className: "width-20",
        value: options.jsonData.customQueryParameters,
        onChange: onChangeHandler("customQueryParameters", options, onOptionsChange),
        spellCheck: false,
        placeholder: "Example: max_source_resolution=5m&timeout=10",
        "data-testid": selectors.components.DataSource.Prometheus.configPage.customQueryParameters
      }
    )
  ))), /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "You can use either POST or GET HTTP method to query your Prometheus data source. POST is the recommended method as it allows bigger queries. Change this to GET if you have a Prometheus version older than 2.1 or if POST requests are restricted in your network. ", docsTip()),
      interactive: true,
      label: "HTTP method",
      disabled: options.readOnly
    },
    /* @__PURE__ */ React.createElement(
      Select,
      {
        width: 40,
        "aria-label": "Select HTTP method",
        options: httpOptions,
        value: httpOptions.find((o) => o.value === options.jsonData.httpMethod),
        onChange: onChangeHandler("httpMethod", options, onOptionsChange),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.httpMethod
      }
    )
  ))))), /* @__PURE__ */ React.createElement(
    ExemplarsSettings,
    {
      options: options.jsonData.exemplarTraceIdDestinations,
      onChange: (exemplarOptions) => updateDatasourcePluginJsonDataOption(
        { onOptionsChange, options },
        "exemplarTraceIdDestinations",
        exemplarOptions
      ),
      disabled: options.readOnly
    }
  ));
};
const getValueFromEventItem = (eventItem) => {
  if (!eventItem) {
    return "";
  }
  if ("currentTarget" in eventItem) {
    return eventItem.currentTarget.value;
  }
  return eventItem.value;
};
const onChangeHandler = (key, options, onOptionsChange) => (eventItem) => {
  onOptionsChange(__spreadProps(__spreadValues({}, options), {
    jsonData: __spreadProps(__spreadValues({}, options.jsonData), {
      [key]: getValueFromEventItem(eventItem)
    })
  }));
};

export { DURATION_REGEX, MULTIPLE_DURATION_REGEX, NON_NEGATIVE_INTEGER_REGEX, PromSettings, countError, getValueFromEventItem };
//# sourceMappingURL=PromSettings.js.map
