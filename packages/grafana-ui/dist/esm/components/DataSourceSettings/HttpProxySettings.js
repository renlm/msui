import React__default from 'react';
import { InlineField } from '../Forms/InlineField.js';
import { InlineSwitch } from '../Switch/Switch.js';

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
const LABEL_WIDTH = 26;
const HttpProxySettings = ({
  dataSourceConfig,
  onChange,
  showForwardOAuthIdentityOption = true
}) => {
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default.createElement(InlineField, { label: "TLS Client Auth", labelWidth: LABEL_WIDTH, disabled: dataSourceConfig.readOnly }, /* @__PURE__ */ React__default.createElement(
    InlineSwitch,
    {
      id: "http-settings-tls-client-auth",
      value: dataSourceConfig.jsonData.tlsAuth || false,
      onChange: (event) => onChange(__spreadProps(__spreadValues({}, dataSourceConfig.jsonData), { tlsAuth: event.currentTarget.checked }))
    }
  )), /* @__PURE__ */ React__default.createElement(
    InlineField,
    {
      label: "With CA Cert",
      tooltip: "Needed for verifying self-signed TLS Certs",
      labelWidth: LABEL_WIDTH,
      disabled: dataSourceConfig.readOnly
    },
    /* @__PURE__ */ React__default.createElement(
      InlineSwitch,
      {
        id: "http-settings-ca-cert",
        value: dataSourceConfig.jsonData.tlsAuthWithCACert || false,
        onChange: (event) => onChange(__spreadProps(__spreadValues({}, dataSourceConfig.jsonData), { tlsAuthWithCACert: event.currentTarget.checked }))
      }
    )
  )), /* @__PURE__ */ React__default.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default.createElement(InlineField, { label: "Skip TLS Verify", labelWidth: LABEL_WIDTH, disabled: dataSourceConfig.readOnly }, /* @__PURE__ */ React__default.createElement(
    InlineSwitch,
    {
      id: "http-settings-skip-tls-verify",
      value: dataSourceConfig.jsonData.tlsSkipVerify || false,
      onChange: (event) => onChange(__spreadProps(__spreadValues({}, dataSourceConfig.jsonData), { tlsSkipVerify: event.currentTarget.checked }))
    }
  ))), showForwardOAuthIdentityOption && /* @__PURE__ */ React__default.createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default.createElement(
    InlineField,
    {
      label: "Forward OAuth Identity",
      tooltip: "Forward the user's upstream OAuth identity to the data source (Their access token gets passed along).",
      labelWidth: LABEL_WIDTH,
      disabled: dataSourceConfig.readOnly
    },
    /* @__PURE__ */ React__default.createElement(
      InlineSwitch,
      {
        id: "http-settings-forward-oauth",
        value: dataSourceConfig.jsonData.oauthPassThru || false,
        onChange: (event) => onChange(__spreadProps(__spreadValues({}, dataSourceConfig.jsonData), { oauthPassThru: event.currentTarget.checked }))
      }
    )
  )));
};

export { HttpProxySettings };
//# sourceMappingURL=HttpProxySettings.js.map
