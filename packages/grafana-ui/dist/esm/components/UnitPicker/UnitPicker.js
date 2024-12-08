import React__default, { PureComponent } from 'react';
import { getValueFormats } from '@grafana/data';
import { Cascader } from '../Cascader/Cascader.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function formatCreateLabel(input) {
  return `Custom unit: ${input}`;
}
class UnitPicker extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "onChange", (value) => {
      this.props.onChange(value.value);
    });
  }
  render() {
    const { value, width } = this.props;
    let current = void 0;
    const unitGroups = getValueFormats();
    const groupOptions = unitGroups.map((group) => {
      const options = group.submenu.map((unit) => {
        const sel = {
          label: unit.text,
          value: unit.value
        };
        if (unit.value === value) {
          current = sel;
        }
        return sel;
      });
      return {
        label: group.text,
        value: group.text,
        items: options
      };
    });
    if (value && !current) {
      current = { value, label: value };
    }
    return /* @__PURE__ */ React__default.createElement(
      Cascader,
      {
        width,
        initialValue: current && current.label,
        allowCustomValue: true,
        changeOnSelect: false,
        formatCreateLabel,
        options: groupOptions,
        placeholder: "Choose",
        isClearable: true,
        onSelect: this.props.onChange
      }
    );
  }
}

export { UnitPicker };
//# sourceMappingURL=UnitPicker.js.map
