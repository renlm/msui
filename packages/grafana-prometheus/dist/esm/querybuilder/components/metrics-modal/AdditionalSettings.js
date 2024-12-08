import { css } from '@emotion/css';
import React from 'react';
import { useTheme2, Switch, Tooltip, Icon } from '@grafana/ui';
import { metricsModaltestIds } from './MetricsModal.js';
import { placeholders } from './state/helpers.js';

function AdditionalSettings(props) {
  const { state, onChangeFullMetaSearch, onChangeIncludeNullMetadata, onChangeDisableTextWrap, onChangeUseBackend } = props;
  const theme = useTheme2();
  const styles = getStyles(theme);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React.createElement(
    Switch,
    {
      "data-testid": metricsModaltestIds.searchWithMetadata,
      value: state.fullMetaSearch,
      disabled: state.useBackend || !state.hasMetadata,
      onChange: () => onChangeFullMetaSearch()
    }
  ), /* @__PURE__ */ React.createElement("div", { className: styles.selectItemLabel }, placeholders.metadataSearchSwitch)), /* @__PURE__ */ React.createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React.createElement(
    Switch,
    {
      value: state.includeNullMetadata,
      disabled: !state.hasMetadata,
      onChange: () => onChangeIncludeNullMetadata()
    }
  ), /* @__PURE__ */ React.createElement("div", { className: styles.selectItemLabel }, placeholders.includeNullMetadata)), /* @__PURE__ */ React.createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React.createElement(Switch, { value: state.disableTextWrap, onChange: () => onChangeDisableTextWrap() }), /* @__PURE__ */ React.createElement("div", { className: styles.selectItemLabel }, "Disable text wrap")), /* @__PURE__ */ React.createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React.createElement(
    Switch,
    {
      "data-testid": metricsModaltestIds.setUseBackend,
      value: state.useBackend,
      onChange: () => onChangeUseBackend()
    }
  ), /* @__PURE__ */ React.createElement("div", { className: styles.selectItemLabel }, placeholders.setUseBackend, "\xA0"), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      content: "Filter metric names by regex search, using an additional call on the Prometheus API.",
      placement: "bottom-end"
    },
    /* @__PURE__ */ React.createElement(Icon, { name: "info-circle", size: "xs", className: styles.settingsIcon })
  )));
}
function getStyles(theme) {
  return {
    settingsIcon: css({
      color: theme.colors.text.secondary
    }),
    selectItem: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "4px 0"
    }),
    selectItemLabel: css({
      margin: `0 0 0 ${theme.spacing(1)}`,
      alignSelf: "center",
      color: theme.colors.text.secondary,
      fontSize: "12px"
    })
  };
}

export { AdditionalSettings };
//# sourceMappingURL=AdditionalSettings.js.map
