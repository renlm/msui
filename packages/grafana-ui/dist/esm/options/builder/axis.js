import React__default from 'react';
import { FieldType, identityOverrideProcessor } from '@grafana/data';
import { ScaleDistribution, AxisPlacement, AxisColorMode } from '@grafana/schema';
import { Field } from '../../components/Forms/Field.js';
import { RadioButtonGroup } from '../../components/Forms/RadioButtonGroup/RadioButtonGroup.js';
import { Input } from '../../components/Input/Input.js';
import { Select } from '../../components/Select/Select.js';
import { graphFieldOptions } from '../../components/uPlot/config.js';

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
function addAxisConfig(builder, defaultConfig, hideScale) {
  const category = ["Axis"];
  builder.addRadio({
    path: "axisPlacement",
    name: "Placement",
    category,
    defaultValue: graphFieldOptions.axisPlacement[0].value,
    settings: {
      options: graphFieldOptions.axisPlacement
    }
  }).addTextInput({
    path: "axisLabel",
    name: "Label",
    category,
    defaultValue: "",
    settings: {
      placeholder: "Optional text",
      expandTemplateVars: true
    },
    showIf: (c) => c.axisPlacement !== AxisPlacement.Hidden,
    // Do not apply default settings to time and string fields which are used as x-axis fields in Time series and Bar chart panels
    shouldApply: (f) => f.type !== FieldType.time && f.type !== FieldType.string
  }).addNumberInput({
    path: "axisWidth",
    name: "Width",
    category,
    settings: {
      placeholder: "Auto"
    },
    showIf: (c) => c.axisPlacement !== AxisPlacement.Hidden
  }).addRadio({
    path: "axisGridShow",
    name: "Show grid lines",
    category,
    defaultValue: void 0,
    settings: {
      options: [
        { value: void 0, label: "Auto" },
        { value: true, label: "On" },
        { value: false, label: "Off" }
      ]
    },
    showIf: (c) => c.axisPlacement !== AxisPlacement.Hidden
  }).addRadio({
    path: "axisColorMode",
    name: "Color",
    category,
    defaultValue: AxisColorMode.Text,
    settings: {
      options: [
        { value: AxisColorMode.Text, label: "Text" },
        { value: AxisColorMode.Series, label: "Series" }
      ]
    },
    showIf: (c) => c.axisPlacement !== AxisPlacement.Hidden
  }).addBooleanSwitch({
    path: "axisBorderShow",
    name: "Show border",
    category,
    defaultValue: false,
    showIf: (c) => c.axisPlacement !== AxisPlacement.Hidden
  });
  builder.addCustomEditor({
    id: "scaleDistribution",
    path: "scaleDistribution",
    name: "Scale",
    category,
    editor: ScaleDistributionEditor,
    override: ScaleDistributionEditor,
    defaultValue: { type: ScaleDistribution.Linear },
    shouldApply: (f) => f.type === FieldType.number,
    process: identityOverrideProcessor
  }).addBooleanSwitch({
    path: "axisCenteredZero",
    name: "Centered zero",
    category,
    defaultValue: false,
    showIf: (c) => {
      var _a;
      return ((_a = c.scaleDistribution) == null ? void 0 : _a.type) !== ScaleDistribution.Log;
    }
  }).addNumberInput({
    path: "axisSoftMin",
    name: "Soft min",
    defaultValue: defaultConfig.axisSoftMin,
    category,
    settings: {
      placeholder: "See: Standard options > Min"
    }
  }).addNumberInput({
    path: "axisSoftMax",
    name: "Soft max",
    defaultValue: defaultConfig.axisSoftMax,
    category,
    settings: {
      placeholder: "See: Standard options > Max"
    }
  });
}
const DISTRIBUTION_OPTIONS = [
  {
    label: "Linear",
    value: ScaleDistribution.Linear
  },
  {
    label: "Logarithmic",
    value: ScaleDistribution.Log
  },
  {
    label: "Symlog",
    value: ScaleDistribution.Symlog
  }
];
const LOG_DISTRIBUTION_OPTIONS = [
  {
    label: "2",
    value: 2
  },
  {
    label: "10",
    value: 10
  }
];
const ScaleDistributionEditor = ({ value, onChange }) => {
  var _a, _b;
  const type = (_a = value == null ? void 0 : value.type) != null ? _a : ScaleDistribution.Linear;
  const log = (_b = value == null ? void 0 : value.log) != null ? _b : 2;
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React__default.createElement(
    RadioButtonGroup,
    {
      value: type,
      options: DISTRIBUTION_OPTIONS,
      onChange: (v) => {
        onChange(__spreadProps(__spreadValues({}, value), {
          type: v,
          log: v === ScaleDistribution.Linear ? void 0 : log
        }));
      }
    }
  )), (type === ScaleDistribution.Log || type === ScaleDistribution.Symlog) && /* @__PURE__ */ React__default.createElement(Field, { label: "Log base" }, /* @__PURE__ */ React__default.createElement(
    Select,
    {
      options: LOG_DISTRIBUTION_OPTIONS,
      value: log,
      onChange: (v) => {
        onChange(__spreadProps(__spreadValues({}, value), {
          log: v.value
        }));
      }
    }
  )), type === ScaleDistribution.Symlog && /* @__PURE__ */ React__default.createElement(Field, { label: "Linear threshold" }, /* @__PURE__ */ React__default.createElement(
    Input,
    {
      placeholder: "1",
      value: value == null ? void 0 : value.linearThreshold,
      onChange: (v) => {
        onChange(__spreadProps(__spreadValues({}, value), {
          linearThreshold: Number(v.currentTarget.value)
        }));
      }
    }
  )));
};

export { ScaleDistributionEditor, addAxisConfig };
//# sourceMappingURL=axis.js.map
