import React, { useState } from 'react';
import { DataSourcePicker, config } from '@grafana/runtime';
import { useTheme2, InlineField, Switch, Input, Button } from '@grafana/ui';
import { overhaulStyles, PROM_CONFIG_LABEL_WIDTH, docsTip } from './ConfigEditor.js';
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
function ExemplarSetting({ value, onChange, onDelete, disabled }) {
  const [isInternalLink, setIsInternalLink] = useState(Boolean(value.datasourceUid));
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Internal link",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      disabled,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Enable this option if you have an internal link. When enabled, this reveals the data source selector. Select the backend tracing data store for your exemplar data. ", docsTip()),
      interactive: true,
      className: styles.switchField
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Switch,
      {
        value: isInternalLink,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.internalLinkSwitch,
        onChange: (ev) => setIsInternalLink(ev.currentTarget.checked)
      }
    ))
  ), isInternalLink ? /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Data source",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "The data source the exemplar is going to navigate to. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React.createElement(
      DataSourcePicker,
      {
        filter: config.featureToggles.azureMonitorPrometheusExemplars ? void 0 : (ds) => ds.type !== "grafana-azure-monitor-datasource",
        tracing: true,
        current: value.datasourceUid,
        noDefault: true,
        width: 40,
        onChange: (ds) => onChange(__spreadProps(__spreadValues({}, value), {
          datasourceUid: ds.uid,
          url: void 0
        }))
      }
    )
  ) : /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "URL",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "The URL of the trace backend the user would go to see its trace. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "https://example.com/${__value.raw}",
        spellCheck: false,
        width: 40,
        value: value.url,
        onChange: (event) => onChange(__spreadProps(__spreadValues({}, value), {
          datasourceUid: void 0,
          url: event.currentTarget.value
        }))
      }
    )
  ), /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "URL Label",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Use to override the button label on the exemplar traceID field. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "Go to example.com",
        spellCheck: false,
        width: 40,
        value: value.urlDisplayLabel,
        onChange: (event) => onChange(__spreadProps(__spreadValues({}, value), {
          urlDisplayLabel: event.currentTarget.value
        }))
      }
    )
  ), /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Label name",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "The name of the field in the labels object that should be used to get the traceID. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "traceID",
        spellCheck: false,
        width: 40,
        value: value.name,
        onChange: (event) => onChange(__spreadProps(__spreadValues({}, value), {
          name: event.currentTarget.value
        }))
      }
    )
  ), !disabled && /* @__PURE__ */ React.createElement(InlineField, { label: "Remove exemplar link", labelWidth: PROM_CONFIG_LABEL_WIDTH, disabled }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "destructive",
      title: "Remove exemplar link",
      icon: "times",
      onClick: (event) => {
        event.preventDefault();
        onDelete();
      }
    }
  )));
}

export { ExemplarSetting };
//# sourceMappingURL=ExemplarSetting.js.map
