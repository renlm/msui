import { isString } from 'lodash';

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
  if (isString(ref)) {
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
  props.onOptionsChange(__spreadProps(__spreadValues({}, config), {
    [key]: val
  }));
}
const updateDatasourcePluginJsonDataOption = (props, key, val) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps(__spreadValues({}, config), {
    jsonData: __spreadProps(__spreadValues({}, config.jsonData), {
      [key]: val
    })
  }));
};
const updateDatasourcePluginSecureJsonDataOption = (props, key, val) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps(__spreadValues({}, config), {
    secureJsonData: __spreadProps(__spreadValues({}, config.secureJsonData ? config.secureJsonData : {}), {
      [key]: val
    })
  }));
};
const updateDatasourcePluginResetOption = (props, key) => {
  const config = props.options;
  props.onOptionsChange(__spreadProps(__spreadValues({}, config), {
    secureJsonData: __spreadProps(__spreadValues({}, config.secureJsonData ? config.secureJsonData : {}), {
      [key]: ""
    }),
    secureJsonFields: __spreadProps(__spreadValues({}, config.secureJsonFields), {
      [key]: false
    })
  }));
};

export { getDataSourceRef, getDataSourceUID, isDataSourceRef, onUpdateDatasourceJsonDataOption, onUpdateDatasourceJsonDataOptionChecked, onUpdateDatasourceJsonDataOptionSelect, onUpdateDatasourceOption, onUpdateDatasourceResetOption, onUpdateDatasourceSecureJsonDataOption, onUpdateDatasourceSecureJsonDataOptionSelect, updateDatasourcePluginJsonDataOption, updateDatasourcePluginOption, updateDatasourcePluginResetOption, updateDatasourcePluginSecureJsonDataOption };
//# sourceMappingURL=datasource.js.map
