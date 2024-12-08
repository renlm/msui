import React__default from 'react';
import { InlineField } from '../Forms/InlineField.js';
import { FormField } from '../FormField/FormField.js';
import { SecretFormField } from '../SecretFormField/SecretFormField.js';

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
const BasicAuthSettings = ({ dataSourceConfig, onChange }) => {
  const password = dataSourceConfig.secureJsonData ? dataSourceConfig.secureJsonData.basicAuthPassword : "";
  const onPasswordReset = () => {
    onChange(__spreadProps(__spreadValues({}, dataSourceConfig), {
      secureJsonData: __spreadProps(__spreadValues({}, dataSourceConfig.secureJsonData), {
        basicAuthPassword: ""
      }),
      secureJsonFields: __spreadProps(__spreadValues({}, dataSourceConfig.secureJsonFields), {
        basicAuthPassword: false
      })
    }));
  };
  const onPasswordChange = (event) => {
    onChange(__spreadProps(__spreadValues({}, dataSourceConfig), {
      secureJsonData: __spreadProps(__spreadValues({}, dataSourceConfig.secureJsonData), {
        basicAuthPassword: event.currentTarget.value
      })
    }));
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(InlineField, { disabled: dataSourceConfig.readOnly }, /* @__PURE__ */ React__default.createElement(
    FormField,
    {
      label: "User",
      labelWidth: 10,
      inputWidth: 18,
      placeholder: "user",
      value: dataSourceConfig.basicAuthUser,
      onChange: (event) => onChange(__spreadProps(__spreadValues({}, dataSourceConfig), { basicAuthUser: event.currentTarget.value }))
    }
  )), /* @__PURE__ */ React__default.createElement(InlineField, { disabled: dataSourceConfig.readOnly }, /* @__PURE__ */ React__default.createElement(
    SecretFormField,
    {
      isConfigured: !!(dataSourceConfig.secureJsonFields && dataSourceConfig.secureJsonFields.basicAuthPassword),
      value: password || "",
      inputWidth: 18,
      labelWidth: 10,
      onReset: onPasswordReset,
      onChange: onPasswordChange
    }
  )));
};

export { BasicAuthSettings };
//# sourceMappingURL=BasicAuthSettings.js.map
