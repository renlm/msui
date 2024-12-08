import React__default from 'react';
import { identityOverrideProcessor, FieldType } from '@grafana/data';
import { StackingMode } from '@grafana/schema';
import { RadioButtonGroup } from '../../components/Forms/RadioButtonGroup/RadioButtonGroup.js';
import { IconButton } from '../../components/IconButton/IconButton.js';
import { Input } from '../../components/Input/Input.js';
import { Stack } from '../../components/Layout/Stack/Stack.js';
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
const StackingEditor = ({
  value,
  context,
  onChange,
  item
}) => {
  var _a, _b;
  return /* @__PURE__ */ React__default.createElement(Stack, null, /* @__PURE__ */ React__default.createElement(
    RadioButtonGroup,
    {
      value: (value == null ? void 0 : value.mode) || StackingMode.None,
      options: (_b = (_a = item.settings) == null ? void 0 : _a.options) != null ? _b : [],
      onChange: (v) => {
        onChange(__spreadProps(__spreadValues({}, value), {
          mode: v
        }));
      }
    }
  ), context.isOverride && (value == null ? void 0 : value.mode) && (value == null ? void 0 : value.mode) !== StackingMode.None && /* @__PURE__ */ React__default.createElement(
    Input,
    {
      type: "text",
      placeholder: "Group",
      suffix: /* @__PURE__ */ React__default.createElement(IconButton, { name: "question-circle", tooltip: "Name of the stacking group", tooltipPlacement: "top" }),
      defaultValue: value == null ? void 0 : value.group,
      onChange: (v) => {
        onChange(__spreadProps(__spreadValues({}, value), {
          group: v.currentTarget.value.trim()
        }));
      }
    }
  ));
};
function addStackingConfig(builder, defaultConfig, category = ["Graph styles"]) {
  builder.addCustomEditor({
    id: "stacking",
    path: "stacking",
    name: "Stack series",
    category,
    defaultValue: defaultConfig,
    editor: StackingEditor,
    override: StackingEditor,
    settings: {
      options: graphFieldOptions.stacking
    },
    process: identityOverrideProcessor,
    shouldApply: (f) => f.type === FieldType.number
  });
}

export { StackingEditor, addStackingConfig };
//# sourceMappingURL=stacking.js.map
