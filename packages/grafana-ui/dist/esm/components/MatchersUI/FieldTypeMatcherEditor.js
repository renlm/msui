import React__default, { memo, useCallback, useMemo } from 'react';
import { FieldType, FieldMatcherID, fieldMatchers } from '@grafana/data';
import { getFieldTypeIconName } from '../../types/icon.js';
import { Select } from '../Select/Select.js';

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
const FieldTypeMatcherEditor = memo((props) => {
  const { data, options, onChange: onChangeFromProps, id } = props;
  const counts = useFieldCounts(data);
  const selectOptions = useSelectOptions(counts, options);
  const onChange = useCallback(
    (selection) => {
      return onChangeFromProps(selection.value);
    },
    [onChangeFromProps]
  );
  const selectedOption = selectOptions.find((v) => v.value === options);
  return /* @__PURE__ */ React__default.createElement(Select, { inputId: id, value: selectedOption, options: selectOptions, onChange });
});
FieldTypeMatcherEditor.displayName = "FieldTypeMatcherEditor";
const allFieldTypeIconOptions = [
  { value: FieldType.number, label: "Number", icon: getFieldTypeIconName(FieldType.number) },
  { value: FieldType.string, label: "String", icon: getFieldTypeIconName(FieldType.string) },
  { value: FieldType.time, label: "Time", icon: getFieldTypeIconName(FieldType.time) },
  { value: FieldType.boolean, label: "Boolean", icon: getFieldTypeIconName(FieldType.boolean) },
  { value: FieldType.trace, label: "Traces", icon: getFieldTypeIconName(FieldType.trace) },
  { value: FieldType.enum, label: "Enum", icon: getFieldTypeIconName(FieldType.enum) },
  { value: FieldType.other, label: "Other", icon: getFieldTypeIconName(FieldType.other) }
];
const useFieldCounts = (data) => {
  return useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const t of allFieldTypeIconOptions) {
      counts.set(t.value, 0);
    }
    for (const frame of data) {
      for (const field of frame.fields) {
        const key = field.type || FieldType.other;
        let v = counts.get(key);
        if (!v) {
          v = 0;
        }
        counts.set(key, v + 1);
      }
    }
    return counts;
  }, [data]);
};
const useSelectOptions = (counts, opt) => {
  return useMemo(() => {
    let found = false;
    const options = [];
    for (const t of allFieldTypeIconOptions) {
      const count = counts.get(t.value);
      const match = opt === t.value;
      if (count || match) {
        options.push(__spreadProps(__spreadValues({}, t), {
          label: `${t.label} (${counts.get(t.value)})`
        }));
      }
      if (match) {
        found = true;
      }
    }
    if (opt && !found) {
      options.push({
        value: opt,
        label: `${opt} (No matches)`
      });
    }
    return options;
  }, [counts, opt]);
};
const fieldTypeMatcherItem = {
  id: FieldMatcherID.byType,
  component: FieldTypeMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byType),
  name: "Fields with type",
  description: "Set properties for fields of a specific type (number, string, boolean)",
  optionsToLabel: (options) => options
};

export { FieldTypeMatcherEditor, allFieldTypeIconOptions, fieldTypeMatcherItem };
//# sourceMappingURL=FieldTypeMatcherEditor.js.map
