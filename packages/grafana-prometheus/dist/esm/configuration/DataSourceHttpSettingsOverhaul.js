import React from 'react';
import { convertLegacyAuthProps, ConnectionSettings, Auth, AuthMethod } from '@grafana/experimental';
import { useTheme2, SecureSocksProxySettings } from '@grafana/ui';
import { overhaulStyles, docsTip } from './ConfigEditor.js';

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
const DataSourceHttpSettingsOverhaul = (props) => {
  const { options, onOptionsChange, secureSocksDSProxyEnabled } = props;
  const newAuthProps = convertLegacyAuthProps({
    config: options,
    onChange: onOptionsChange
  });
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  function returnSelectedMethod() {
    return newAuthProps.selectedMethod;
  }
  let urlTooltip;
  switch (options.access) {
    case "direct":
      urlTooltip = /* @__PURE__ */ React.createElement(React.Fragment, null, "Your access method is ", /* @__PURE__ */ React.createElement("em", null, "Browser"), ", this means the URL needs to be accessible from the browser.", docsTip());
      break;
    case "proxy":
      urlTooltip = /* @__PURE__ */ React.createElement(React.Fragment, null, "Your access method is ", /* @__PURE__ */ React.createElement("em", null, "Server"), ", this means the URL needs to be accessible from the grafana backend/server.", docsTip());
      break;
    default:
      urlTooltip = /* @__PURE__ */ React.createElement(React.Fragment, null, "Specify a complete HTTP URL (for example http://your_server:8080) ", docsTip());
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    ConnectionSettings,
    {
      urlPlaceholder: "http://localhost:9090",
      config: options,
      onChange: onOptionsChange,
      urlLabel: "Prometheus server URL",
      urlTooltip
    }
  ), /* @__PURE__ */ React.createElement("hr", { className: `${styles.hrTopSpace} ${styles.hrBottomSpace}` }), /* @__PURE__ */ React.createElement(
    Auth,
    __spreadProps(__spreadValues({}, newAuthProps), {
      onAuthMethodSelect: (method) => {
        onOptionsChange(__spreadProps(__spreadValues({}, options), {
          basicAuth: method === AuthMethod.BasicAuth,
          withCredentials: method === AuthMethod.CrossSiteCredentials,
          jsonData: __spreadProps(__spreadValues({}, options.jsonData), {
            oauthPassThru: method === AuthMethod.OAuthForward
          })
        }));
      },
      selectedMethod: returnSelectedMethod()
    })
  ), /* @__PURE__ */ React.createElement("div", { className: styles.sectionBottomPadding }), secureSocksDSProxyEnabled && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SecureSocksProxySettings, { options, onOptionsChange }), /* @__PURE__ */ React.createElement("div", { className: styles.sectionBottomPadding })));
};

export { DataSourceHttpSettingsOverhaul };
//# sourceMappingURL=DataSourceHttpSettingsOverhaul.js.map
