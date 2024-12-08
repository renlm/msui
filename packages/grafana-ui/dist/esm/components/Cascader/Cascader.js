import { css } from '@emotion/css';
import memoize from 'micro-memoize';
import RCCascader from 'rc-cascader';
import React__default, { PureComponent } from 'react';
import '@grafana/data';
import { withTheme2 } from '../../themes/ThemeContext.js';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Input } from '../Input/Input.js';
import { Stack } from '../Layout/Stack/Stack.js';
import { Select } from '../Select/Select.js';
import { onChangeCascader } from './optionMappings.js';
import { getCascaderStyles } from './styles.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const disableDivFocus = css({
  "&:focus": {
    outline: "none"
  }
});
const DEFAULT_SEPARATOR = " / ";
class UnthemedCascader extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "flattenOptions", (options, optionPath = []) => {
      let selectOptions = [];
      for (const option of options) {
        const cpy = [...optionPath];
        cpy.push(option);
        if (!option.items || option.items.length === 0) {
          selectOptions.push({
            singleLabel: cpy[cpy.length - 1].label,
            label: cpy.map((o) => o.label).join(this.props.separator || DEFAULT_SEPARATOR),
            value: cpy.map((o) => o.value)
          });
        } else {
          selectOptions = [...selectOptions, ...this.flattenOptions(option.items, cpy)];
        }
      }
      return selectOptions;
    });
    __publicField(this, "getSearchableOptions", memoize((options) => this.flattenOptions(options)));
    //For rc-cascader
    __publicField(this, "onChange", (value, selectedOptions) => {
      const activeLabel = this.props.hideActiveLevelLabel ? "" : this.props.displayAllSelectedLevels ? selectedOptions.map((option) => option.label).join(this.props.separator || DEFAULT_SEPARATOR) : selectedOptions[selectedOptions.length - 1].label;
      const state = {
        rcValue: { value, label: activeLabel },
        focusCascade: true,
        activeLabel,
        isSearching: false,
        inputValue: activeLabel
      };
      this.setState(state);
      this.props.onSelect(selectedOptions[selectedOptions.length - 1].value);
    });
    //For select
    __publicField(this, "onSelect", (obj) => {
      const valueArray = obj.value || [];
      const activeLabel = this.props.displayAllSelectedLevels ? obj.label : obj.singleLabel || "";
      const state = {
        activeLabel,
        inputValue: activeLabel,
        rcValue: { value: valueArray, label: activeLabel },
        isSearching: false,
        focusCascade: false
      };
      this.setState(state);
      this.props.onSelect(valueArray[valueArray.length - 1]);
    });
    __publicField(this, "onCreateOption", (value) => {
      this.setState({
        activeLabel: value,
        inputValue: value,
        rcValue: [],
        isSearching: false
      });
      this.props.onSelect(value);
    });
    __publicField(this, "onBlur", () => {
      var _a, _b;
      this.setState({
        isSearching: false,
        focusCascade: false
      });
      if (this.state.activeLabel === "") {
        this.setState({
          rcValue: []
        });
      }
      (_b = (_a = this.props).onBlur) == null ? void 0 : _b.call(_a);
    });
    __publicField(this, "onBlurCascade", () => {
      var _a, _b;
      this.setState({
        focusCascade: false
      });
      (_b = (_a = this.props).onBlur) == null ? void 0 : _b.call(_a);
    });
    __publicField(this, "onInputKeyDown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        return;
      }
      const { activeLabel } = this.state;
      this.setState({
        focusCascade: false,
        isSearching: true,
        inputValue: activeLabel
      });
    });
    __publicField(this, "onSelectInputChange", (value) => {
      this.setState({
        inputValue: value
      });
    });
    const searchableOptions = this.getSearchableOptions(props.options);
    const { rcValue, activeLabel } = this.setInitialValue(searchableOptions, props.initialValue);
    this.state = {
      isSearching: false,
      focusCascade: false,
      rcValue,
      activeLabel,
      inputValue: ""
    };
  }
  setInitialValue(searchableOptions, initValue) {
    if (!initValue) {
      return { rcValue: [], activeLabel: "" };
    }
    for (const option of searchableOptions) {
      const optionPath = option.value || [];
      if (optionPath[optionPath.length - 1] === initValue) {
        return {
          rcValue: optionPath,
          activeLabel: this.props.displayAllSelectedLevels ? option.label : option.singleLabel || ""
        };
      }
    }
    if (this.props.allowCustomValue) {
      return { rcValue: [], activeLabel: initValue };
    }
    return { rcValue: [], activeLabel: "" };
  }
  render() {
    const {
      allowCustomValue,
      formatCreateLabel,
      placeholder,
      width,
      changeOnSelect,
      options,
      disabled,
      id,
      isClearable,
      theme
    } = this.props;
    const { focusCascade, isSearching, rcValue, activeLabel, inputValue } = this.state;
    const searchableOptions = this.getSearchableOptions(options);
    const styles = getCascaderStyles(theme);
    return /* @__PURE__ */ React__default.createElement("div", null, isSearching ? /* @__PURE__ */ React__default.createElement(
      Select,
      {
        allowCustomValue,
        placeholder,
        autoFocus: !focusCascade,
        onChange: this.onSelect,
        onBlur: this.onBlur,
        options: searchableOptions,
        onCreateOption: this.onCreateOption,
        formatCreateLabel,
        width,
        onInputChange: this.onSelectInputChange,
        disabled,
        inputValue,
        inputId: id
      }
    ) : /* @__PURE__ */ React__default.createElement(
      RCCascader,
      {
        onChange: onChangeCascader(this.onChange),
        options,
        changeOnSelect,
        value: rcValue.value,
        fieldNames: { label: "label", value: "value", children: "items" },
        expandIcon: null,
        open: this.props.alwaysOpen,
        disabled,
        dropdownClassName: styles.dropdown
      },
      /* @__PURE__ */ React__default.createElement("div", { className: disableDivFocus }, /* @__PURE__ */ React__default.createElement(
        Input,
        {
          autoFocus: this.props.autoFocus,
          width,
          placeholder,
          onBlur: this.onBlurCascade,
          value: activeLabel,
          onKeyDown: this.onInputKeyDown,
          onChange: () => {
          },
          suffix: /* @__PURE__ */ React__default.createElement(Stack, { gap: 0.5 }, isClearable && activeLabel !== "" && /* @__PURE__ */ React__default.createElement(
            IconButton,
            {
              name: "times",
              "aria-label": "Clear selection",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setState({ rcValue: [], activeLabel: "", inputValue: "" });
                this.props.onSelect("");
              }
            }
          ), /* @__PURE__ */ React__default.createElement(Icon, { name: focusCascade ? "angle-up" : "angle-down" })),
          disabled,
          id
        }
      ))
    ));
  }
}
__publicField(UnthemedCascader, "defaultProps", { changeOnSelect: true });
const Cascader = withTheme2(UnthemedCascader);

export { Cascader };
//# sourceMappingURL=Cascader.js.map
