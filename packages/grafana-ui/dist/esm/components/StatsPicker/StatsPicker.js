import { difference } from 'lodash';
import React__default, { PureComponent } from 'react';
import { fieldReducers } from '@grafana/data';
import { Select } from '../Select/Select.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class StatsPicker extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "checkInput", () => {
      const { stats, allowMultiple, defaultStat, onChange } = this.props;
      const current = fieldReducers.list(stats);
      if (current.length !== stats.length) {
        const found = current.map((v) => v.id);
        const notFound = difference(stats, found);
        console.warn("Unknown stats", notFound, stats);
        onChange(current.map((stat) => stat.id));
      }
      if (!allowMultiple && stats.length > 1) {
        console.warn("Removing extra stat", stats);
        onChange([stats[0]]);
      }
      if (defaultStat && stats.length < 1) {
        onChange([defaultStat]);
      }
    });
    __publicField(this, "onSelectionChange", (item) => {
      const { onChange } = this.props;
      if (Array.isArray(item)) {
        onChange(item.map((v) => v.value));
      } else {
        onChange(item && item.value ? [item.value] : []);
      }
    });
  }
  componentDidMount() {
    this.checkInput();
  }
  componentDidUpdate(prevProps) {
    this.checkInput();
  }
  render() {
    const { stats, allowMultiple, defaultStat, placeholder, className, menuPlacement, width, inputId, filterOptions } = this.props;
    const select = fieldReducers.selectOptions(stats, filterOptions);
    return /* @__PURE__ */ React__default.createElement(
      Select,
      {
        value: select.current,
        className,
        isClearable: !defaultStat,
        isMulti: allowMultiple,
        width,
        isSearchable: true,
        options: select.options,
        placeholder,
        onChange: this.onSelectionChange,
        menuPlacement,
        inputId
      }
    );
  }
}
__publicField(StatsPicker, "defaultProps", {
  allowMultiple: false
});

export { StatsPicker };
//# sourceMappingURL=StatsPicker.js.map
