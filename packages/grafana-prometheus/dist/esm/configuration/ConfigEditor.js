import { css } from '@emotion/css';
import React from 'react';
import { DataSourceDescription, ConfigSection, AdvancedHttpSettings } from '@grafana/experimental';
import { config } from '@grafana/runtime';
import { useTheme2, Alert, FieldValidationMessage } from '@grafana/ui';
import { AlertingSettingsOverhaul } from './AlertingSettingsOverhaul.js';
import { DataSourceHttpSettingsOverhaul } from './DataSourceHttpSettingsOverhaul.js';
import { PromSettings } from './PromSettings.js';

const PROM_CONFIG_LABEL_WIDTH = 30;
const ConfigEditor = (props) => {
  const { options, onOptionsChange } = props;
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, options.access === "direct" && /* @__PURE__ */ React.createElement(Alert, { title: "Error", severity: "error" }, "Browser access mode in the Prometheus data source is no longer available. Switch to server access mode."), /* @__PURE__ */ React.createElement(
    DataSourceDescription,
    {
      dataSourceName: "Prometheus",
      docsLink: "https://grafana.com/docs/grafana/latest/datasources/prometheus/configure-prometheus-data-source/"
    }
  ), /* @__PURE__ */ React.createElement("hr", { className: `${styles.hrTopSpace} ${styles.hrBottomSpace}` }), /* @__PURE__ */ React.createElement(
    DataSourceHttpSettingsOverhaul,
    {
      options,
      onOptionsChange,
      secureSocksDSProxyEnabled: config.secureSocksDSProxyEnabled
    }
  ), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(
    ConfigSection,
    {
      className: styles.advancedSettings,
      title: "Advanced settings",
      description: "Additional settings are optional settings that can be configured for more control over your data source."
    },
    /* @__PURE__ */ React.createElement(
      AdvancedHttpSettings,
      {
        className: styles.advancedHTTPSettingsMargin,
        config: options,
        onChange: onOptionsChange
      }
    ),
    /* @__PURE__ */ React.createElement(AlertingSettingsOverhaul, { options, onOptionsChange }),
    /* @__PURE__ */ React.createElement(PromSettings, { options, onOptionsChange })
  ));
};
function docsTip(url) {
  const docsUrl = "https://grafana.com/docs/grafana/latest/datasources/prometheus/#configure-the-data-source";
  return /* @__PURE__ */ React.createElement("a", { href: url ? url : docsUrl, target: "_blank", rel: "noopener noreferrer" }, "Visit docs for more details here.");
}
const validateInput = (input, pattern, errorMessage) => {
  const defaultErrorMessage = "Value is not valid";
  if (input && !input.match(pattern)) {
    return /* @__PURE__ */ React.createElement(FieldValidationMessage, null, errorMessage ? errorMessage : defaultErrorMessage);
  } else {
    return true;
  }
};
function overhaulStyles(theme) {
  return {
    additionalSettings: css({
      marginBottom: "25px"
    }),
    secondaryGrey: css({
      color: theme.colors.secondary.text,
      opacity: "65%"
    }),
    inlineError: css({
      margin: "0px 0px 4px 245px"
    }),
    switchField: css({
      alignItems: "center"
    }),
    sectionHeaderPadding: css({
      paddingTop: "32px"
    }),
    sectionBottomPadding: css({
      paddingBottom: "28px"
    }),
    subsectionText: css({
      fontSize: "12px"
    }),
    hrBottomSpace: css({
      marginBottom: "56px"
    }),
    hrTopSpace: css({
      marginTop: "50px"
    }),
    textUnderline: css({
      textDecoration: "underline"
    }),
    versionMargin: css({
      marginBottom: "12px"
    }),
    advancedHTTPSettingsMargin: css({
      margin: "24px 0 8px 0"
    }),
    advancedSettings: css({
      paddingTop: "32px"
    }),
    alertingTop: css({
      marginTop: "40px !important"
    }),
    overhaulPageHeading: css({
      fontWeight: 400
    }),
    container: css({
      maxwidth: 578
    })
  };
}

export { ConfigEditor, PROM_CONFIG_LABEL_WIDTH, docsTip, overhaulStyles, validateInput };
//# sourceMappingURL=ConfigEditor.js.map
