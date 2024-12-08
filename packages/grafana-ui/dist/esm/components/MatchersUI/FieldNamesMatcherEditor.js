import React__default, { memo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers } from '@grafana/data';
import { Input } from '../Input/Input.js';
import { MultiSelect } from '../Select/Select.js';
import { useFieldDisplayNames, useSelectOptions, frameHasName } from './utils.js';

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
const FieldNamesMatcherEditor = memo((props) => {
  var _a;
  const { data, options, onChange: onChangeFromProps } = props;
  const { readOnly, prefix } = options;
  const names = useFieldDisplayNames(data);
  const selectOptions = useSelectOptions(names, void 0);
  const onChange = useCallback(
    (selections) => {
      if (!Array.isArray(selections)) {
        return;
      }
      return onChangeFromProps(__spreadProps(__spreadValues({}, options), {
        names: selections.reduce((all, current) => {
          if (!frameHasName(current.value, names)) {
            return all;
          }
          all.push(current.value);
          return all;
        }, [])
      }));
    },
    [names, onChangeFromProps, options]
  );
  if (readOnly) {
    const displayNames = ((_a = options.names) != null ? _a : []).join(", ");
    return /* @__PURE__ */ React__default.createElement(Input, { value: displayNames, readOnly: true, disabled: true, prefix });
  }
  return /* @__PURE__ */ React__default.createElement(MultiSelect, { value: options.names, options: selectOptions, onChange });
});
FieldNamesMatcherEditor.displayName = "FieldNameMatcherEditor";
const fieldNamesMatcherItem = {
  id: FieldMatcherID.byNames,
  component: FieldNamesMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byNames),
  name: "Fields with name",
  description: "Set properties for a specific field",
  optionsToLabel: (options) => {
    var _a;
    return ((_a = options.names) != null ? _a : []).join(", ");
  },
  excludeFromPicker: true
};

export { FieldNamesMatcherEditor, fieldNamesMatcherItem };
//# sourceMappingURL=FieldNamesMatcherEditor.js.map
