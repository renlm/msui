import { t } from 'i18next';
import React__default, { useRef, useState, useEffect, useCallback } from 'react';
import ReactSelect from 'react-select';
import ReactAsyncSelect from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import Creatable from 'react-select/creatable';
import { toOption } from '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { Spinner } from '../Spinner/Spinner.js';
import { CustomInput } from './CustomInput.js';
import { DropdownIndicator } from './DropdownIndicator.js';
import { IndicatorsContainer } from './IndicatorsContainer.js';
import { InputControl } from './InputControl.js';
import { MultiValueContainer, MultiValueRemove } from './MultiValue.js';
import { SelectContainer } from './SelectContainer.js';
import { SelectMenuOptions, VirtualizedSelectMenu, SelectMenu } from './SelectMenu.js';
import { SelectOptionGroup } from './SelectOptionGroup.js';
import { SelectOptionGroupHeader } from './SelectOptionGroupHeader.js';
import { SingleValue } from './SingleValue.js';
import { ValueContainer } from './ValueContainer.js';
import { getSelectStyles } from './getSelectStyles.js';
import { useCustomSelectStyles } from './resetSelectStyles.js';
import { findSelectedValue, cleanValue, omitDescriptions } from './utils.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const CustomControl = (props) => {
  const {
    children,
    innerProps,
    selectProps: { menuIsOpen, onMenuClose, onMenuOpen },
    isFocused,
    isMulti,
    getValue,
    innerRef
  } = props;
  const selectProps = props.selectProps;
  if (selectProps.renderControl) {
    return React__default.createElement(selectProps.renderControl, {
      isOpen: menuIsOpen,
      value: isMulti ? getValue() : getValue()[0],
      ref: innerRef,
      onClick: menuIsOpen ? onMenuClose : onMenuOpen,
      onBlur: onMenuClose,
      disabled: !!selectProps.disabled,
      invalid: !!selectProps.invalid
    });
  }
  return /* @__PURE__ */ React__default.createElement(
    InputControl,
    {
      ref: innerRef,
      innerProps,
      prefix: selectProps.prefix,
      focused: isFocused,
      invalid: !!selectProps.invalid,
      disabled: !!selectProps.disabled
    },
    children
  );
};
function SelectBase(_a) {
  var _b = _a, {
    allowCustomValue = false,
    allowCreateWhileLoading = false,
    "aria-label": ariaLabel,
    "data-testid": dataTestid,
    autoFocus = false,
    backspaceRemovesValue = true,
    blurInputOnSelect,
    cacheOptions,
    className,
    closeMenuOnSelect = true,
    components,
    createOptionPosition = "last",
    defaultOptions,
    defaultValue,
    disabled = false,
    filterOption,
    formatCreateLabel,
    getOptionLabel,
    getOptionValue,
    inputValue,
    invalid,
    isClearable = false,
    id,
    isLoading = false,
    isMulti = false,
    inputId,
    isOpen,
    isOptionDisabled,
    isSearchable = true,
    loadOptions,
    loadingMessage = "Loading options...",
    maxMenuHeight = 300,
    minMenuHeight,
    maxVisibleValues,
    menuPlacement = "auto",
    menuPosition,
    menuShouldPortal = true,
    noOptionsMessage = t("grafana-ui.select.no-options-label", "No options found"),
    onBlur,
    onChange,
    onCloseMenu,
    onCreateOption,
    onInputChange,
    onKeyDown,
    onMenuScrollToBottom,
    onMenuScrollToTop,
    onOpenMenu,
    onFocus,
    openMenuOnFocus = false,
    options = [],
    placeholder = t("grafana-ui.select.placeholder", "Choose"),
    prefix,
    renderControl,
    showAllSelectedWhenOpen = true,
    tabSelectsValue = true,
    value,
    virtualized = false,
    noMultiValueWrap,
    width,
    isValidNewOption,
    formatOptionLabel,
    hideSelectedOptions
  } = _b, rest = __objRest(_b, [
    "allowCustomValue",
    "allowCreateWhileLoading",
    "aria-label",
    "data-testid",
    "autoFocus",
    "backspaceRemovesValue",
    "blurInputOnSelect",
    "cacheOptions",
    "className",
    "closeMenuOnSelect",
    "components",
    "createOptionPosition",
    "defaultOptions",
    "defaultValue",
    "disabled",
    "filterOption",
    "formatCreateLabel",
    "getOptionLabel",
    "getOptionValue",
    "inputValue",
    "invalid",
    "isClearable",
    "id",
    "isLoading",
    "isMulti",
    "inputId",
    "isOpen",
    "isOptionDisabled",
    "isSearchable",
    "loadOptions",
    "loadingMessage",
    "maxMenuHeight",
    "minMenuHeight",
    "maxVisibleValues",
    "menuPlacement",
    "menuPosition",
    "menuShouldPortal",
    "noOptionsMessage",
    "onBlur",
    "onChange",
    "onCloseMenu",
    "onCreateOption",
    "onInputChange",
    "onKeyDown",
    "onMenuScrollToBottom",
    "onMenuScrollToTop",
    "onOpenMenu",
    "onFocus",
    "openMenuOnFocus",
    "options",
    "placeholder",
    "prefix",
    "renderControl",
    "showAllSelectedWhenOpen",
    "tabSelectsValue",
    "value",
    "virtualized",
    "noMultiValueWrap",
    "width",
    "isValidNewOption",
    "formatOptionLabel",
    "hideSelectedOptions"
  ]);
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  const reactSelectRef = useRef(null);
  const [closeToBottom, setCloseToBottom] = useState(false);
  const selectStyles = useCustomSelectStyles(theme, width);
  const [hasInputValue, setHasInputValue] = useState(!!inputValue);
  useEffect(() => {
    if (loadOptions && isOpen && reactSelectRef.current && reactSelectRef.current.controlRef && menuPlacement === "auto") {
      const distance = window.innerHeight - reactSelectRef.current.controlRef.getBoundingClientRect().bottom;
      setCloseToBottom(distance < maxMenuHeight);
    }
  }, [maxMenuHeight, menuPlacement, loadOptions, isOpen]);
  const onChangeWithEmpty = useCallback(
    (value2, action) => {
      if (isMulti && (value2 === void 0 || value2 === null)) {
        return onChange([], action);
      }
      onChange(value2, action);
    },
    [isMulti, onChange]
  );
  let ReactSelectComponent = ReactSelect;
  const creatableProps = {};
  let asyncSelectProps = {};
  let selectedValue;
  if (isMulti && loadOptions) {
    selectedValue = value;
  } else {
    if (isMulti && value && Array.isArray(value) && !loadOptions) {
      selectedValue = value.map((v) => {
        var _a2;
        const selectableValue = findSelectedValue((_a2 = v.value) != null ? _a2 : v, options);
        if (selectableValue) {
          return selectableValue;
        }
        return typeof v === "string" ? toOption(v) : v;
      });
    } else if (loadOptions) {
      const hasValue = defaultValue || value;
      selectedValue = hasValue ? [hasValue] : [];
    } else {
      selectedValue = cleanValue(value, options);
    }
  }
  const commonSelectProps = {
    "aria-label": ariaLabel,
    "data-testid": dataTestid,
    autoFocus,
    backspaceRemovesValue,
    blurInputOnSelect,
    captureMenuScroll: onMenuScrollToBottom || onMenuScrollToTop,
    closeMenuOnSelect,
    // We don't want to close if we're actually scrolling the menu
    // So only close if none of the parents are the select menu itself
    defaultValue,
    // Also passing disabled, as this is the new Select API, and I want to use this prop instead of react-select's one
    disabled,
    // react-select always tries to filter the options even at first menu open, which is a problem for performance
    // in large lists. So we set it to not try to filter the options if there is no input value.
    filterOption: hasInputValue ? filterOption : null,
    getOptionLabel,
    getOptionValue,
    hideSelectedOptions,
    inputValue,
    invalid,
    isClearable,
    id,
    // Passing isDisabled as react-select accepts this prop
    isDisabled: disabled,
    isLoading,
    isMulti,
    inputId,
    isOptionDisabled,
    isSearchable,
    maxMenuHeight,
    minMenuHeight,
    maxVisibleValues,
    menuIsOpen: isOpen,
    menuPlacement: menuPlacement === "auto" && closeToBottom ? "top" : menuPlacement,
    menuPosition,
    menuShouldBlockScroll: true,
    menuPortalTarget: menuShouldPortal && typeof document !== "undefined" ? document.body : void 0,
    menuShouldScrollIntoView: false,
    onBlur,
    onChange: onChangeWithEmpty,
    onInputChange: (val, actionMeta) => {
      var _a2;
      const newValue = (_a2 = onInputChange == null ? void 0 : onInputChange(val, actionMeta)) != null ? _a2 : val;
      const newHasValue = !!newValue;
      if (newHasValue !== hasInputValue) {
        setHasInputValue(newHasValue);
      }
      return newValue;
    },
    onKeyDown,
    onMenuClose: onCloseMenu,
    onMenuOpen: onOpenMenu,
    onMenuScrollToBottom,
    onMenuScrollToTop,
    onFocus,
    formatOptionLabel,
    openMenuOnFocus,
    options: virtualized ? omitDescriptions(options) : options,
    placeholder,
    prefix,
    renderControl,
    showAllSelectedWhenOpen,
    tabSelectsValue,
    value: isMulti ? selectedValue : selectedValue == null ? void 0 : selectedValue[0],
    noMultiValueWrap
  };
  if (allowCustomValue) {
    ReactSelectComponent = Creatable;
    creatableProps.allowCreateWhileLoading = allowCreateWhileLoading;
    creatableProps.formatCreateLabel = formatCreateLabel != null ? formatCreateLabel : defaultFormatCreateLabel;
    creatableProps.onCreateOption = onCreateOption;
    creatableProps.createOptionPosition = createOptionPosition;
    creatableProps.isValidNewOption = isValidNewOption;
  }
  if (loadOptions) {
    ReactSelectComponent = allowCustomValue ? AsyncCreatable : ReactAsyncSelect;
    asyncSelectProps = {
      loadOptions,
      cacheOptions,
      defaultOptions
    };
  }
  const SelectMenuComponent = virtualized ? VirtualizedSelectMenu : SelectMenu;
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    ReactSelectComponent,
    __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      ref: reactSelectRef,
      components: __spreadValues({
        MenuList: SelectMenuComponent,
        Group: SelectOptionGroup,
        GroupHeading: SelectOptionGroupHeader,
        ValueContainer,
        IndicatorsContainer: CustomIndicatorsContainer,
        IndicatorSeparator,
        Control: CustomControl,
        Option: SelectMenuOptions,
        ClearIndicator(props) {
          const { clearValue } = props;
          return /* @__PURE__ */ React__default.createElement(
            Icon,
            {
              name: "times",
              role: "button",
              "aria-label": "select-clear-value",
              className: styles.singleValueRemove,
              onMouseDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
                clearValue();
              }
            }
          );
        },
        LoadingIndicator() {
          return /* @__PURE__ */ React__default.createElement(Spinner, { inline: true });
        },
        LoadingMessage() {
          return /* @__PURE__ */ React__default.createElement("div", { className: styles.loadingMessage }, loadingMessage);
        },
        NoOptionsMessage() {
          return /* @__PURE__ */ React__default.createElement("div", { className: styles.loadingMessage, "aria-label": "No options provided" }, noOptionsMessage);
        },
        DropdownIndicator,
        SingleValue(props) {
          return /* @__PURE__ */ React__default.createElement(SingleValue, __spreadProps(__spreadValues({}, props), { isDisabled: disabled }));
        },
        SelectContainer,
        MultiValueContainer,
        MultiValueRemove: !disabled ? MultiValueRemove : () => null,
        Input: CustomInput
      }, components),
      styles: selectStyles,
      className
    }, commonSelectProps), creatableProps), asyncSelectProps), rest)
  ));
}
function defaultFormatCreateLabel(input) {
  return /* @__PURE__ */ React__default.createElement("div", { style: { display: "flex", gap: "8px", alignItems: "center" } }, /* @__PURE__ */ React__default.createElement("div", null, input), /* @__PURE__ */ React__default.createElement("div", { style: { flexGrow: 1 } }), /* @__PURE__ */ React__default.createElement("div", { className: "muted small", style: { display: "flex", gap: "8px", alignItems: "center" } }, "Hit enter to add"));
}
function CustomIndicatorsContainer(props) {
  const { showAllSelectedWhenOpen, maxVisibleValues, menuIsOpen } = props.selectProps;
  const value = props.getValue();
  if (maxVisibleValues !== void 0 && Array.isArray(props.children)) {
    const selectedValuesCount = value.length;
    if (selectedValuesCount > maxVisibleValues && !(showAllSelectedWhenOpen && menuIsOpen)) {
      const indicatorChildren = [...props.children];
      indicatorChildren.splice(
        -1,
        0,
        /* @__PURE__ */ React__default.createElement("span", { key: "excess-values", id: "excess-values" }, "(+", selectedValuesCount - maxVisibleValues, ")")
      );
      return /* @__PURE__ */ React__default.createElement(IndicatorsContainer, __spreadValues({}, props), indicatorChildren);
    }
  }
  return /* @__PURE__ */ React__default.createElement(IndicatorsContainer, __spreadValues({}, props));
}
function IndicatorSeparator() {
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null);
}

export { SelectBase };
//# sourceMappingURL=SelectBase.js.map
