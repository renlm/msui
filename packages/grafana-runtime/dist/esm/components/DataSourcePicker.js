import React, { PureComponent } from 'react';
import { getDataSourceUID, isUnsignedPluginSignature } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { Select, Stack, PluginSignatureBadge } from '@grafana/ui';
import { getDataSourceSrv } from '../services/dataSourceSrv.js';
import { ExpressionDatasourceRef } from '../utils/DataSourceWithBackend.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataSourcePicker extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "dataSourceSrv", getDataSourceSrv());
    __publicField(this, "state", {});
    __publicField(this, "onChange", (item, actionMeta) => {
      if (actionMeta.action === "clear" && this.props.onClear) {
        this.props.onClear();
        return;
      }
      const dsSettings = this.dataSourceSrv.getInstanceSettings(item.value);
      if (dsSettings) {
        this.props.onChange(dsSettings);
        this.setState({ error: void 0 });
      }
    });
  }
  componentDidMount() {
    const { current } = this.props;
    const dsSettings = this.dataSourceSrv.getInstanceSettings(current);
    if (!dsSettings) {
      this.setState({ error: "Could not find data source " + current });
    }
  }
  getCurrentValue() {
    const { current, hideTextValue, noDefault } = this.props;
    if (!current && noDefault) {
      return;
    }
    const ds = this.dataSourceSrv.getInstanceSettings(current);
    if (ds) {
      return {
        label: ds.name.slice(0, 37),
        value: ds.uid,
        imgUrl: ds.meta.info.logos.small,
        hideText: hideTextValue,
        meta: ds.meta
      };
    }
    const uid = getDataSourceUID(current);
    if (uid === ExpressionDatasourceRef.uid || uid === ExpressionDatasourceRef.name) {
      return { label: uid, value: uid, hideText: hideTextValue };
    }
    return {
      label: (uid != null ? uid : "no name") + " - not found",
      value: uid != null ? uid : void 0,
      imgUrl: "",
      hideText: hideTextValue
    };
  }
  getDataSourceOptions() {
    const { alerting, tracing, metrics, mixed, dashboard, variables, annotations, pluginId, type, filter, logs } = this.props;
    const options = this.dataSourceSrv.getList({
      alerting,
      tracing,
      metrics,
      logs,
      dashboard,
      mixed,
      variables,
      annotations,
      pluginId,
      filter,
      type
    }).map((ds) => ({
      value: ds.name,
      label: `${ds.name}${ds.isDefault ? " (default)" : ""}`,
      imgUrl: ds.meta.info.logos.small,
      meta: ds.meta
    }));
    return options;
  }
  render() {
    const {
      autoFocus,
      onBlur,
      onClear,
      openMenuOnFocus,
      placeholder,
      width,
      inputId,
      disabled = false,
      isLoading = false
    } = this.props;
    const { error } = this.state;
    const options = this.getDataSourceOptions();
    const value = this.getCurrentValue();
    const isClearable = typeof onClear === "function";
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        "aria-label": "Data source picker select container",
        "data-testid": selectors.components.DataSourcePicker.container
      },
      /* @__PURE__ */ React.createElement(
        Select,
        {
          isLoading,
          disabled,
          "aria-label": "Select a data source",
          "data-testid": selectors.components.DataSourcePicker.inputV2,
          inputId: inputId || "data-source-picker",
          className: "ds-picker select-container",
          isMulti: false,
          isClearable,
          backspaceRemovesValue: false,
          onChange: this.onChange,
          options,
          autoFocus,
          onBlur,
          width,
          openMenuOnFocus,
          maxMenuHeight: 500,
          placeholder,
          noOptionsMessage: "No datasources found",
          value: value != null ? value : null,
          invalid: Boolean(error) || Boolean(this.props.invalid),
          getOptionLabel: (o) => {
            if (o.meta && isUnsignedPluginSignature(o.meta.signature) && o !== value) {
              return /* @__PURE__ */ React.createElement(Stack, { alignItems: "center", justifyContent: "space-between" }, /* @__PURE__ */ React.createElement("span", null, o.label), " ", /* @__PURE__ */ React.createElement(PluginSignatureBadge, { status: o.meta.signature }));
            }
            return o.label || "";
          }
        }
      )
    );
  }
}
__publicField(DataSourcePicker, "defaultProps", {
  autoFocus: false,
  openMenuOnFocus: false,
  placeholder: "Select data source"
});

export { DataSourcePicker };
//# sourceMappingURL=DataSourcePicker.js.map
