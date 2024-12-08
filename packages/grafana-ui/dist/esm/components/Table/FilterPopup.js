import { cx, css } from '@emotion/css';
import React__default, { useMemo, useState, useCallback } from 'react';
import '../FormField/FormField.js';
import '../Forms/Legacy/Input/Input.js';
import 'react-select';
import '../Icon/Icon.js';
import '../Forms/Legacy/Select/Select.js';
import '../Forms/Legacy/Switch/Switch.js';
import '../SecretFormField/SecretFormField.js';
import { IconButton } from '../IconButton/IconButton.js';
import '../ConfirmButton/ConfirmButton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import '../Tooltip/Tooltip.js';
import '@floating-ui/react';
import '@grafana/data';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
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
import { ClickOutsideWrapper } from '../ClickOutsideWrapper/ClickOutsideWrapper.js';
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
import '../FilterInput/FilterInput.js';
import '../Forms/Checkbox.js';
import 'uuid';
import 'react-dropzone';
import '../DateTimePickers/TimeRangePicker/TimePickerContent.js';
import '../DateTimePickers/RelativeTimeRangePicker/RelativeTimeRangePicker.js';
import '../Card/Card.js';
import '../FormattedValueDisplay/FormattedValueDisplay.js';
import '../Dropdown/ButtonSelect.js';
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
import { FilterList } from './FilterList.js';
import { calculateUniqueFieldValues, valuesToOptions, getFilteredOptions } from './utils.js';

const FilterPopup = ({
  column: { preFilteredRows, filterValue, setFilter },
  onClose,
  field,
  searchFilter,
  setSearchFilter,
  operator,
  setOperator
}) => {
  const theme = useTheme2();
  const uniqueValues = useMemo(() => calculateUniqueFieldValues(preFilteredRows, field), [preFilteredRows, field]);
  const options = useMemo(() => valuesToOptions(uniqueValues), [uniqueValues]);
  const filteredOptions = useMemo(() => getFilteredOptions(options, filterValue), [options, filterValue]);
  const [values, setValues] = useState(filteredOptions);
  const [matchCase, setMatchCase] = useState(false);
  const onCancel = useCallback((event) => onClose(), [onClose]);
  const onFilter = useCallback(
    (event) => {
      const filtered = values.length ? values : void 0;
      setFilter(filtered);
      onClose();
    },
    [setFilter, values, onClose]
  );
  const onClearFilter = useCallback(
    (event) => {
      setFilter(void 0);
      onClose();
    },
    [setFilter, onClose]
  );
  const clearFilterVisible = useMemo(() => filterValue !== void 0, [filterValue]);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(ClickOutsideWrapper, { onClick: onCancel, useCapture: true }, /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.filterContainer), onClick: stopPropagation }, /* @__PURE__ */ React__default.createElement(Stack, { direction: "column", gap: 3 }, /* @__PURE__ */ React__default.createElement(Stack, { direction: "column", gap: 0.5 }, /* @__PURE__ */ React__default.createElement(Stack, { justifyContent: "space-between", alignItems: "center" }, /* @__PURE__ */ React__default.createElement(Label, { className: styles.label }, "Filter by values:"), /* @__PURE__ */ React__default.createElement(
    IconButton,
    {
      name: "text-fields",
      tooltip: "Match case",
      style: { color: matchCase ? theme.colors.text.link : theme.colors.text.disabled },
      onClick: () => {
        setMatchCase((s) => !s);
      }
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.listDivider) }), /* @__PURE__ */ React__default.createElement(
    FilterList,
    {
      onChange: setValues,
      values,
      options,
      caseSensitive: matchCase,
      showOperators: true,
      searchFilter,
      setSearchFilter,
      operator,
      setOperator
    }
  )), /* @__PURE__ */ React__default.createElement(Stack, { gap: 3 }, /* @__PURE__ */ React__default.createElement(Stack, null, /* @__PURE__ */ React__default.createElement(Button, { size: "sm", onClick: onFilter }, "Ok"), /* @__PURE__ */ React__default.createElement(Button, { size: "sm", variant: "secondary", onClick: onCancel }, "Cancel")), clearFilterVisible && /* @__PURE__ */ React__default.createElement(Stack, null, /* @__PURE__ */ React__default.createElement(Button, { fill: "text", size: "sm", onClick: onClearFilter }, "Clear filter"))))));
};
const getStyles = (theme) => ({
  filterContainer: css({
    label: "filterContainer",
    width: "100%",
    minWidth: "250px",
    height: "100%",
    maxHeight: "400px",
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.weak}`,
    padding: theme.spacing(2),
    boxShadow: theme.shadows.z3,
    borderRadius: theme.shape.radius.default
  }),
  listDivider: css({
    label: "listDivider",
    width: "100%",
    borderTop: `1px solid ${theme.colors.border.medium}`,
    padding: theme.spacing(0.5, 2)
  }),
  label: css({
    marginBottom: 0
  })
});
const stopPropagation = (event) => {
  event.stopPropagation();
};

export { FilterPopup };
//# sourceMappingURL=FilterPopup.js.map
