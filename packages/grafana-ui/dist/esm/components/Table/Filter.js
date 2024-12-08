import { cx, css } from '@emotion/css';
import React__default, { useRef, useState, useMemo, useCallback } from 'react';
import '../FormField/FormField.js';
import '../Forms/Legacy/Input/Input.js';
import 'react-select';
import { Icon } from '../Icon/Icon.js';
import '../Forms/Legacy/Select/Select.js';
import '../Forms/Legacy/Switch/Switch.js';
import '../SecretFormField/SecretFormField.js';
import '../IconButton/IconButton.js';
import '../ConfirmButton/ConfirmButton.js';
import '../Button/Button.js';
import '../Button/ButtonGroup.js';
import '../Tooltip/Tooltip.js';
import { Popover } from '../Tooltip/Popover.js';
import '../Toggletip/Toggletip.js';
import '../Portal/Portal.js';
import 'react-custom-scrollbars-2';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../Tabs/Tab.js';
import '../Tabs/TabsBar.js';
import '../../utils/i18n.js';
import '@floating-ui/react';
import '../Cascader/Cascader.js';
import '../ButtonCascader/ButtonCascader.js';
import 'react-inlinesvg';
import '../ColorPicker/ColorPicker.js';
import '../ColorPicker/ColorPickerInput.js';
import '../ColorPicker/SeriesColorPickerPopover.js';
import '../Layout/Box/Box.js';
import '../Layout/Stack/Stack.js';
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
import { REGEX_OPERATOR } from './FilterList.js';
import { FilterPopup } from './FilterPopup.js';

const Filter = ({ column, field, tableStyles }) => {
  var _a;
  const ref = useRef(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const styles = useStyles2(getStyles);
  const filterEnabled = useMemo(() => Boolean(column.filterValue), [column.filterValue]);
  const onShowPopover = useCallback(() => setPopoverVisible(true), [setPopoverVisible]);
  const onClosePopover = useCallback(() => setPopoverVisible(false), [setPopoverVisible]);
  const [searchFilter, setSearchFilter] = useState("");
  const [operator, setOperator] = useState(REGEX_OPERATOR);
  if (!field || !((_a = field.config.custom) == null ? void 0 : _a.filterable)) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(
    "button",
    {
      className: cx(tableStyles.headerFilter, filterEnabled ? styles.filterIconEnabled : styles.filterIconDisabled),
      ref,
      type: "button",
      onClick: onShowPopover
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "filter" }),
    isPopoverVisible && ref.current && /* @__PURE__ */ React__default.createElement(
      Popover,
      {
        content: /* @__PURE__ */ React__default.createElement(
          FilterPopup,
          {
            column,
            tableStyles,
            field,
            onClose: onClosePopover,
            searchFilter,
            setSearchFilter,
            operator,
            setOperator
          }
        ),
        placement: "bottom-start",
        referenceElement: ref.current,
        show: true
      }
    )
  );
};
const getStyles = (theme) => ({
  filterIconEnabled: css({
    label: "filterIconEnabled",
    color: theme.colors.primary.text
  }),
  filterIconDisabled: css({
    label: "filterIconDisabled",
    color: theme.colors.text.disabled
  })
});

export { Filter };
//# sourceMappingURL=Filter.js.map
