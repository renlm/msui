import { cx, css } from '@emotion/css';
import React__default, { useMemo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import { getValueFormat, formattedValueToString } from '@grafana/data';
import '../FormField/FormField.js';
import '../Forms/Legacy/Input/Input.js';
import 'react-select';
import '../Icon/Icon.js';
import '../Forms/Legacy/Select/Select.js';
import '../Forms/Legacy/Switch/Switch.js';
import '../SecretFormField/SecretFormField.js';
import '../IconButton/IconButton.js';
import '../ConfirmButton/ConfirmButton.js';
import '../Button/Button.js';
import '../Button/ButtonGroup.js';
import '../Tooltip/Tooltip.js';
import '@floating-ui/react';
import { useStyles2, useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../Portal/Portal.js';
import '../Toggletip/Toggletip.js';
import 'react-custom-scrollbars-2';
import '../Tabs/Tab.js';
import '../Tabs/TabsBar.js';
import '../../utils/i18n.js';
import '../Cascader/Cascader.js';
import '../ButtonCascader/ButtonCascader.js';
import 'react-inlinesvg';
import '../ColorPicker/ColorPicker.js';
import '../ColorPicker/ColorPickerInput.js';
import '../ColorPicker/SeriesColorPickerPopover.js';
import '../Layout/Box/Box.js';
import { Stack } from '../Layout/Stack/Stack.js';
import '../Text/Text.js';
import '../EmptyState/GrotCTA/GrotCTA.js';
import '../EmptyState/GrotNotFound/GrotNotFound.js';
import '../StatsPicker/StatsPicker.js';
import '../RefreshPicker/RefreshPicker.js';
import '../DateTimePickers/TimeRangePicker.js';
import '../DateTimePickers/TimeRangePicker/TimeRangeLabel.js';
import 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import 'lodash';
import 'i18next';
import 'react-select/async';
import 'react-select/async-creatable';
import 'react-select/creatable';
import '../Select/IndicatorsContainer.js';
import '../Select/InputControl.js';
import '../Select/getSelectStyles.js';
import '../Input/Input.js';
import '../Select/SelectMenu.js';
import 'react-transition-group';
import '../Select/ValueContainer.js';
import '@grafana/e2e-selectors';
import '../DateTimePickers/DatePicker/DatePicker.js';
import '../DateTimePickers/DateTimePicker/DateTimePicker.js';
import '../List/AbstractList.js';
import 'react-table';
import '../InteractiveTable/Expander/index.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import 'ansicolor';
import '../../utils/logger.js';
import '../AutoSaveField/AutoSaveField.js';
import '../Tags/Tag.js';
import '../Tags/TagList.js';
import 'react-hook-form';
import '../Modal/Modal.js';
import '../QueryField/QueryField.js';
import '../Monaco/CodeEditor.js';
import 'react-use';
import '../ErrorBoundary/ErrorWithStack.js';
import '../Modal/ModalsContext.js';
import '../PageLayout/PageToolbar.js';
import 'rxjs';
import 'rxjs/operators';
import './Table.js';
import '../TableInputCSV/TableInputCSV.js';
import '../Tabs/VerticalTab.js';
import '../BigValue/BigValue.js';
import '../Sparkline/Sparkline.js';
import '../Gauge/Gauge.js';
import '../BarGauge/BarGauge.js';
import '../VizTooltip/VizTooltip.js';
import '../VizTooltip/VizTooltipContainer.js';
import '../VizLegend/SeriesIcon.js';
import '../VizRepeater/VizRepeater.js';
import '../PanelChrome/index.js';
import '../VizLayout/VizLayout.js';
import '../VizLegend/VizLegend.js';
import '../VizLegend/VizLegendListItem.js';
import '../Alert/Alert.js';
import '../Collapse/Collapse.js';
import '../ClickOutsideWrapper/ClickOutsideWrapper.js';
import '../ContextMenu/ContextMenu.js';
import '../Menu/Menu.js';
import '../Menu/MenuGroup.js';
import '../Menu/MenuItem.js';
import '../DataLinks/DataLinkEditor.js';
import '../DataLinks/DataLinkInput.js';
import '../InfoBox/InfoBox.js';
import '../InfoBox/FeatureInfoBox.js';
import '../Badge/Badge.js';
import '../JSONFormatter/JSONFormatter.js';
import '../ErrorBoundary/ErrorBoundary.js';
import 'classnames';
import '../Forms/InlineField.js';
import '../Switch/Switch.js';
import '../DataSourceSettings/CustomHeadersSettings.js';
import '../TextArea/TextArea.js';
import 'react-use/lib/useClickAway';
import '@react-aria/dialog';
import '@react-aria/focus';
import '@react-aria/overlays';
import 'rc-drawer';
import 'rc-drawer/assets/index.css';
import '../Slider/Slider.js';
import '../Slider/RangeSlider.js';
import '../ToolbarButton/ToolbarButton.js';
import '../ToolbarButton/ToolbarButtonRow.js';
import '../MatchersUI/fieldMatchersUI.js';
import '../Link/Link.js';
import '../Link/TextLink.js';
import '../Layout/Grid/Grid.js';
import { Label } from '../Forms/Label.js';
import '../Forms/Field.js';
import '../Forms/InlineSegmentGroup.js';
import '../Forms/RadioButtonGroup/RadioButtonGroup.js';
import '../Input/AutoSizeInput.js';
import { FilterInput } from '../FilterInput/FilterInput.js';
import { Checkbox } from '../Forms/Checkbox.js';
import 'uuid';
import 'react-dropzone';
import '../DateTimePickers/TimeRangePicker/TimePickerContent.js';
import '../DateTimePickers/RelativeTimeRangePicker/RelativeTimeRangePicker.js';
import '../Card/Card.js';
import '../FormattedValueDisplay/FormattedValueDisplay.js';
import { ButtonSelect } from '../Dropdown/ButtonSelect.js';
import '../Dropdown/Dropdown.js';
import '../PluginSignatureBadge/PluginSignatureBadge.js';
import '../Divider/Divider.js';
import '../uPlot/config.js';
import '@grafana/schema';
import 'uplot';
import '../uPlot/utils.js';
import 'uplot/dist/uPlot.min.css';
import '../uPlot/PlotLegend.js';
import 'react-dom';
import '../BrowserLabel/Label.js';
import '../../graveyard/Graph/Graph.js';
import '../../graveyard/GraphNG/GraphNG.js';
import '../../graveyard/TimeSeries/TimeSeries.js';
import '../../graveyard/GraphNG/hooks.js';

const ITEM_HEIGHT = 28;
const MIN_HEIGHT = ITEM_HEIGHT * 5;
const operatorSelectableValues = {
  Contains: { label: "Contains", value: "Contains", description: "Contains" },
  "=": { label: "=", value: "=", description: "Equals" },
  "!=": { label: "!=", value: "!=", description: "Not equals" },
  ">": { label: ">", value: ">", description: "Greater" },
  ">=": { label: ">=", value: ">=", description: "Greater or Equal" },
  "<": { label: "<", value: "<", description: "Less" },
  "<=": { label: "<=", value: "<=", description: "Less or Equal" },
  Expression: {
    label: "Expression",
    value: "Expression",
    description: 'Bool Expression (Char $ represents the column value in the expression, e.g. "$ >= 10 && $ <= 12")'
  }
};
const OPERATORS = Object.values(operatorSelectableValues);
const REGEX_OPERATOR = operatorSelectableValues["Contains"];
const XPR_OPERATOR = operatorSelectableValues["Expression"];
const comparableValue = (value) => {
  value = value.trim().replace(/\\/g, "");
  if (/^(\d{4}-\d{2}-\d{2}|\d{4}\/\d{2}\/\d{2})/.test(value)) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      const fmt = getValueFormat("dateTimeAsIso");
      return formattedValueToString(fmt(date.getTime()));
    }
  }
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return num;
  }
  const lvalue = value.toLowerCase();
  if (lvalue === "true" || lvalue === "false") {
    return lvalue === "true";
  }
  return value;
};
const FilterList = ({
  options,
  values,
  caseSensitive,
  showOperators,
  onChange,
  searchFilter,
  setSearchFilter,
  operator,
  setOperator
}) => {
  const regex = useMemo(() => new RegExp(searchFilter, caseSensitive ? void 0 : "i"), [searchFilter, caseSensitive]);
  const items = useMemo(
    () => options.filter((option) => {
      if (!showOperators || !searchFilter || operator.value === REGEX_OPERATOR.value) {
        if (option.label === void 0) {
          return false;
        }
        return regex.test(option.label);
      } else if (operator.value === XPR_OPERATOR.value) {
        if (option.value === void 0) {
          return false;
        }
        try {
          const xpr = searchFilter.replace(/\\/g, "");
          const fnc = new Function("$", `'use strict'; return ${xpr};`);
          const val = comparableValue(option.value);
          return fnc(val);
        } catch (_) {
        }
        return false;
      } else {
        if (option.value === void 0) {
          return false;
        }
        const value1 = comparableValue(option.value);
        const value2 = comparableValue(searchFilter);
        switch (operator.value) {
          case "=":
            return value1 === value2;
          case "!=":
            return value1 !== value2;
          case ">":
            return value1 > value2;
          case ">=":
            return value1 >= value2;
          case "<":
            return value1 < value2;
          case "<=":
            return value1 <= value2;
        }
        return false;
      }
    }),
    [options, regex, showOperators, operator, searchFilter]
  );
  const selectedItems = useMemo(() => items.filter((item) => values.includes(item)), [items, values]);
  const selectCheckValue = useMemo(() => items.length === selectedItems.length, [items, selectedItems]);
  const selectCheckIndeterminate = useMemo(
    () => selectedItems.length > 0 && items.length > selectedItems.length,
    [items, selectedItems]
  );
  const selectCheckLabel = useMemo(
    () => selectedItems.length ? `${selectedItems.length} selected` : `Select all`,
    [selectedItems]
  );
  const selectCheckDescription = useMemo(
    () => items.length !== selectedItems.length ? "Add all displayed values to the filter" : "Remove all displayed values from the filter",
    [items, selectedItems]
  );
  const styles = useStyles2(getStyles);
  const theme = useTheme2();
  const gutter = theme.spacing.gridSize;
  const height = useMemo(() => Math.min(items.length * ITEM_HEIGHT, MIN_HEIGHT) + gutter, [gutter, items.length]);
  const onCheckedChanged = useCallback(
    (option) => (event) => {
      const newValues = event.currentTarget.checked ? values.concat(option) : values.filter((c) => c.value !== option.value);
      onChange(newValues);
    },
    [onChange, values]
  );
  const onSelectChanged = useCallback(() => {
    if (items.length === selectedItems.length) {
      const newValues = values.filter((item) => !items.includes(item));
      onChange(newValues);
    } else {
      const newValues = [.../* @__PURE__ */ new Set([...values, ...items])];
      onChange(newValues);
    }
  }, [onChange, values, items, selectedItems]);
  return /* @__PURE__ */ React__default.createElement(Stack, { direction: "column", gap: 0.25 }, !showOperators && /* @__PURE__ */ React__default.createElement(FilterInput, { placeholder: "Filter values", onChange: setSearchFilter, value: searchFilter }), showOperators && /* @__PURE__ */ React__default.createElement(Stack, { direction: "row", gap: 0 }, /* @__PURE__ */ React__default.createElement(
    ButtonSelect,
    {
      variant: "canvas",
      options: OPERATORS,
      onChange: setOperator,
      value: operator,
      tooltip: operator.description
    }
  ), /* @__PURE__ */ React__default.createElement(FilterInput, { placeholder: "Filter values", onChange: setSearchFilter, value: searchFilter })), !items.length && /* @__PURE__ */ React__default.createElement(Label, null, "No values"), items.length && /* @__PURE__ */ React__default.createElement(
    FixedSizeList,
    {
      height,
      itemCount: items.length,
      itemSize: ITEM_HEIGHT,
      width: "100%",
      className: styles.filterList
    },
    ({ index, style }) => {
      const option = items[index];
      const { value, label } = option;
      const isChecked = values.find((s) => s.value === value) !== void 0;
      return /* @__PURE__ */ React__default.createElement("div", { className: styles.filterListRow, style, title: label }, /* @__PURE__ */ React__default.createElement(Checkbox, { value: isChecked, label, onChange: onCheckedChanged(option) }));
    }
  ), items.length && /* @__PURE__ */ React__default.createElement(Stack, { direction: "column", gap: 0.25 }, /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.selectDivider) }), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.filterListRow) }, /* @__PURE__ */ React__default.createElement(
    Checkbox,
    {
      value: selectCheckValue,
      indeterminate: selectCheckIndeterminate,
      label: selectCheckLabel,
      description: selectCheckDescription,
      onChange: onSelectChanged
    }
  ))));
};
const getStyles = (theme) => ({
  filterList: css({
    label: "filterList"
  }),
  filterListRow: css({
    label: "filterListRow",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0.5),
    ":hover": {
      backgroundColor: theme.colors.action.hover
    }
  }),
  selectDivider: css({
    label: "selectDivider",
    width: "100%",
    borderTop: `1px solid ${theme.colors.border.medium}`,
    padding: theme.spacing(0.5, 2)
  })
});

export { FilterList, REGEX_OPERATOR };
//# sourceMappingURL=FilterList.js.map
