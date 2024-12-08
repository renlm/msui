import { css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default, { PureComponent } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { FormField } from '../FormField/FormField.js';
import { Icon } from '../Icon/Icon.js';
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const getCustomHeaderRowStyles = () => ({
  layout: css({
    display: "flex",
    alignItems: "center",
    marginBottom: "4px",
    "> *": {
      marginLeft: "4px",
      marginBottom: 0,
      height: "100%",
      "&:first-child, &:last-child": {
        marginLeft: 0
      }
    }
  })
});
const CustomHeaderRow = ({ header, onBlur, onChange, onRemove, onReset }) => {
  const styles = useStyles2(getCustomHeaderRowStyles);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.layout }, /* @__PURE__ */ React__default.createElement(
    FormField,
    {
      label: "Header",
      name: "name",
      placeholder: "X-Custom-Header",
      labelWidth: 5,
      value: header.name || "",
      onChange: (e) => onChange(__spreadProps(__spreadValues({}, header), { name: e.target.value })),
      onBlur
    }
  ), /* @__PURE__ */ React__default.createElement(
    SecretFormField,
    {
      label: "Value",
      "aria-label": "Value",
      name: "value",
      isConfigured: header.configured,
      value: header.value,
      labelWidth: 5,
      inputWidth: header.configured ? 11 : 12,
      placeholder: "Header Value",
      onReset: () => onReset(header.id),
      onChange: (e) => onChange(__spreadProps(__spreadValues({}, header), { value: e.target.value })),
      onBlur
    }
  ), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      type: "button",
      "aria-label": "Remove header",
      variant: "secondary",
      size: "xs",
      onClick: (_e) => onRemove(header.id)
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "trash-alt" })
  ));
};
CustomHeaderRow.displayName = "CustomHeaderRow";
class CustomHeadersSettings extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "state", {
      headers: []
    });
    __publicField(this, "updateSettings", () => {
      const { headers } = this.state;
      const newJsonData = Object.fromEntries(
        Object.entries(this.props.dataSourceConfig.jsonData).filter(([key, val]) => !key.startsWith("httpHeaderName"))
      );
      const newSecureJsonData = Object.fromEntries(
        Object.entries(this.props.dataSourceConfig.secureJsonData || {}).filter(
          ([key, val]) => !key.startsWith("httpHeaderValue")
        )
      );
      for (const [index, header] of headers.entries()) {
        newJsonData[`httpHeaderName${index + 1}`] = header.name;
        if (!header.configured) {
          newSecureJsonData[`httpHeaderValue${index + 1}`] = header.value;
        }
      }
      this.props.onChange(__spreadProps(__spreadValues({}, this.props.dataSourceConfig), {
        jsonData: newJsonData,
        secureJsonData: newSecureJsonData
      }));
    });
    __publicField(this, "onHeaderAdd", () => {
      this.setState((prevState) => {
        return { headers: [...prevState.headers, { id: uniqueId(), name: "", value: "", configured: false }] };
      });
    });
    __publicField(this, "onHeaderChange", (headerIndex, value) => {
      this.setState(({ headers }) => {
        return {
          headers: headers.map((item, index) => {
            if (headerIndex !== index) {
              return item;
            }
            return __spreadValues({}, value);
          })
        };
      });
    });
    __publicField(this, "onHeaderReset", (headerId) => {
      this.setState(({ headers }) => {
        return {
          headers: headers.map((h, i) => {
            if (h.id !== headerId) {
              return h;
            }
            return __spreadProps(__spreadValues({}, h), {
              value: "",
              configured: false
            });
          })
        };
      });
    });
    __publicField(this, "onHeaderRemove", (headerId) => {
      this.setState(
        ({ headers }) => ({
          headers: headers.filter((h) => h.id !== headerId)
        }),
        this.updateSettings
      );
    });
    const { jsonData, secureJsonData, secureJsonFields } = this.props.dataSourceConfig;
    this.state = {
      headers: Object.keys(jsonData).sort().filter((key) => key.startsWith("httpHeaderName")).map((key, index) => {
        return {
          id: uniqueId(),
          name: jsonData[key],
          value: secureJsonData !== void 0 ? secureJsonData[key] : "",
          configured: secureJsonFields && secureJsonFields[`httpHeaderValue${index + 1}`] || false
        };
      })
    };
  }
  render() {
    const { headers } = this.state;
    const { dataSourceConfig } = this.props;
    return /* @__PURE__ */ React__default.createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default.createElement("h6", null, "Custom HTTP Headers")), /* @__PURE__ */ React__default.createElement("div", null, headers.map((header, i) => /* @__PURE__ */ React__default.createElement(
      CustomHeaderRow,
      {
        key: header.id,
        header,
        onChange: (h) => {
          this.onHeaderChange(i, h);
        },
        onBlur: this.updateSettings,
        onRemove: this.onHeaderRemove,
        onReset: this.onHeaderReset
      }
    ))), !dataSourceConfig.readOnly && /* @__PURE__ */ React__default.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default.createElement(
      Button,
      {
        variant: "secondary",
        icon: "plus",
        type: "button",
        onClick: (e) => {
          this.onHeaderAdd();
        }
      },
      "Add header"
    )));
  }
}

export { CustomHeadersSettings, CustomHeadersSettings as default };
//# sourceMappingURL=CustomHeadersSettings.js.map
