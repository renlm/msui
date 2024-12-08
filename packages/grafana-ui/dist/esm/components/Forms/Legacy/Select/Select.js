import classNames from 'classnames';
import React__default, { PureComponent } from 'react';
import ReactSelect, { components } from 'react-select';
import ReactAsyncSelect from 'react-select/async';
import Creatable from 'react-select/creatable';
import { ThemeContext } from '@grafana/data';
import { CustomScrollbar } from '../../../CustomScrollbar/CustomScrollbar.js';
import { SingleValue } from '../../../Select/SingleValue.js';
import resetSelectStyles from '../../../Select/resetSelectStyles.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { IndicatorsContainer } from './IndicatorsContainer.js';
import { NoOptionsMessage } from './NoOptionsMessage.js';
import { SelectOption } from './SelectOption.js';
import { SelectOptionGroup } from './SelectOptionGroup.js';

var __defProp = Object.defineProperty;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MenuList = (props) => {
  return /* @__PURE__ */ React__default.createElement(components.MenuList, __spreadValues({}, props), /* @__PURE__ */ React__default.createElement(CustomScrollbar, { autoHide: false, autoHeightMax: "inherit" }, props.children));
};
const _Select = class _Select extends PureComponent {
  render() {
    const {
      defaultValue,
      getOptionLabel,
      getOptionValue,
      onChange,
      options,
      placeholder,
      width,
      value,
      className,
      isDisabled,
      isLoading,
      isSearchable,
      isClearable,
      backspaceRemovesValue,
      isMulti,
      autoFocus,
      openMenuOnFocus,
      onBlur,
      maxMenuHeight,
      noOptionsMessage,
      isOpen,
      components: components2,
      tooltipContent,
      tabSelectsValue,
      onCloseMenu,
      onOpenMenu,
      allowCustomValue,
      formatCreateLabel,
      "aria-label": ariaLabel
    } = this.props;
    let widthClass = "";
    if (width) {
      widthClass = "width-" + width;
    }
    let SelectComponent = ReactSelect;
    const creatableOptions = {};
    if (allowCustomValue) {
      SelectComponent = Creatable;
      creatableOptions.formatCreateLabel = formatCreateLabel != null ? formatCreateLabel : (input) => input;
    }
    const selectClassNames = classNames("gf-form-input", "gf-form-input--form-dropdown", widthClass, className);
    const selectComponents = __spreadValues(__spreadValues({}, _Select.defaultProps.components), components2);
    return /* @__PURE__ */ React__default.createElement(WrapInTooltip, { onCloseMenu, onOpenMenu, tooltipContent, isOpen }, (onOpenMenuInternal, onCloseMenuInternal) => {
      return /* @__PURE__ */ React__default.createElement(
        SelectComponent,
        __spreadValues({
          captureMenuScroll: false,
          classNamePrefix: "gf-form-select-box",
          className: selectClassNames,
          components: selectComponents,
          defaultValue,
          value,
          getOptionLabel,
          getOptionValue,
          menuShouldScrollIntoView: false,
          isSearchable,
          onChange,
          options,
          placeholder: placeholder || "Choose",
          styles: resetSelectStyles(this.context),
          isDisabled,
          isLoading,
          isClearable,
          autoFocus,
          onBlur,
          openMenuOnFocus,
          maxMenuHeight,
          noOptionsMessage,
          isMulti,
          backspaceRemovesValue,
          menuIsOpen: isOpen,
          onMenuOpen: onOpenMenuInternal,
          onMenuClose: onCloseMenuInternal,
          tabSelectsValue,
          "aria-label": ariaLabel
        }, creatableOptions)
      );
    });
  }
};
__publicField(_Select, "contextType", ThemeContext);
__publicField(_Select, "defaultProps", {
  className: "",
  isDisabled: false,
  isSearchable: true,
  isClearable: false,
  isMulti: false,
  openMenuOnFocus: false,
  autoFocus: false,
  isLoading: false,
  backspaceRemovesValue: true,
  maxMenuHeight: 300,
  tabSelectsValue: true,
  allowCustomValue: false,
  components: {
    Option: SelectOption,
    SingleValue,
    IndicatorsContainer,
    MenuList,
    Group: SelectOptionGroup
  }
});
let Select = _Select;
class AsyncSelect extends PureComponent {
  render() {
    const {
      defaultValue,
      getOptionLabel,
      getOptionValue,
      onChange,
      placeholder,
      width,
      value,
      className,
      loadOptions,
      defaultOptions,
      isLoading,
      loadingMessage,
      noOptionsMessage,
      isDisabled,
      isSearchable,
      isClearable,
      backspaceRemovesValue,
      autoFocus,
      onBlur,
      openMenuOnFocus,
      maxMenuHeight,
      isMulti,
      tooltipContent,
      onCloseMenu,
      onOpenMenu,
      isOpen
    } = this.props;
    let widthClass = "";
    if (width) {
      widthClass = "width-" + width;
    }
    const selectClassNames = classNames("gf-form-input", "gf-form-input--form-dropdown", widthClass, className);
    return /* @__PURE__ */ React__default.createElement(WrapInTooltip, { onCloseMenu, onOpenMenu, tooltipContent, isOpen }, (onOpenMenuInternal, onCloseMenuInternal) => {
      return /* @__PURE__ */ React__default.createElement(
        ReactAsyncSelect,
        {
          captureMenuScroll: false,
          classNamePrefix: "gf-form-select-box",
          className: selectClassNames,
          components: {
            Option: SelectOption,
            SingleValue,
            IndicatorsContainer,
            NoOptionsMessage
          },
          defaultValue,
          value,
          getOptionLabel,
          getOptionValue,
          menuShouldScrollIntoView: false,
          onChange,
          loadOptions,
          isLoading,
          defaultOptions,
          placeholder: placeholder || "Choose",
          styles: resetSelectStyles(this.context),
          loadingMessage,
          noOptionsMessage,
          isDisabled,
          isSearchable,
          isClearable,
          autoFocus,
          onBlur,
          openMenuOnFocus,
          maxMenuHeight,
          isMulti,
          backspaceRemovesValue
        }
      );
    });
  }
}
__publicField(AsyncSelect, "contextType", ThemeContext);
__publicField(AsyncSelect, "defaultProps", {
  className: "",
  components: {},
  loadingMessage: () => "Loading...",
  isDisabled: false,
  isClearable: false,
  isMulti: false,
  isSearchable: true,
  backspaceRemovesValue: true,
  autoFocus: false,
  openMenuOnFocus: false,
  maxMenuHeight: 300
});
class WrapInTooltip extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      isOpenInternal: false
    });
    __publicField(this, "onOpenMenu", () => {
      const { onOpenMenu } = this.props;
      if (onOpenMenu) {
        onOpenMenu();
      }
      this.setState({ isOpenInternal: true });
    });
    __publicField(this, "onCloseMenu", () => {
      const { onCloseMenu } = this.props;
      if (onCloseMenu) {
        onCloseMenu();
      }
      this.setState({ isOpenInternal: false });
    });
  }
  render() {
    const { children, isOpen, tooltipContent } = this.props;
    const { isOpenInternal } = this.state;
    let showTooltip = void 0;
    if (isOpenInternal || isOpen) {
      showTooltip = false;
    }
    if (tooltipContent) {
      return /* @__PURE__ */ React__default.createElement(Tooltip, { show: showTooltip, content: tooltipContent, placement: "bottom" }, /* @__PURE__ */ React__default.createElement("div", null, children(this.onOpenMenu, this.onCloseMenu)));
    } else {
      return /* @__PURE__ */ React__default.createElement("div", null, children(this.onOpenMenu, this.onCloseMenu));
    }
  }
}

export { AsyncSelect, MenuList, Select, WrapInTooltip, Select as default };
//# sourceMappingURL=Select.js.map
