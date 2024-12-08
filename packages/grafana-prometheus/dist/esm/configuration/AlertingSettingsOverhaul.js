import { cx } from '@emotion/css';
import React from 'react';
import { ConfigSubSection } from '@grafana/experimental';
import { useTheme2, InlineField, Switch } from '@grafana/ui';
import { overhaulStyles, docsTip } from './ConfigEditor.js';
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
function AlertingSettingsOverhaul({
  options,
  onOptionsChange
}) {
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Alerting", className: cx(styles.container, styles.alertingTop) }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      labelWidth: 30,
      label: "Manage alerts via Alerting UI",
      disabled: options.readOnly,
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "Manage alert rules for this data source. To manage other alerting resources, add an Alertmanager data source. ", docsTip()),
      interactive: true,
      className: styles.switchField
    },
    /* @__PURE__ */ React.createElement(
      Switch,
      {
        value: options.jsonData.manageAlerts !== false,
        onChange: (event) => onOptionsChange(__spreadProps(__spreadValues({}, options), {
          jsonData: __spreadProps(__spreadValues({}, options.jsonData), { manageAlerts: event.currentTarget.checked })
        })),
        id: selectors.components.DataSource.Prometheus.configPage.manageAlerts
      }
    )
  )))));
}

export { AlertingSettingsOverhaul };
//# sourceMappingURL=AlertingSettingsOverhaul.js.map
