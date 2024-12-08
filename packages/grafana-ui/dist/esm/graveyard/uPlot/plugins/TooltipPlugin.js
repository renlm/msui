import { css } from '@emotion/css';
import React__default, { useRef, useState, useLayoutEffect } from 'react';
import { useMountedState } from 'react-use';
import { DashboardCursorSync, getDisplayProcessor, FALLBACK_COLOR, getFieldDisplayName, formattedValueToString, FieldType, arrayUtils } from '@grafana/data';
import { TooltipDisplayMode, SortOrder } from '@grafana/schema';
import '../../../components/FormField/FormField.js';
import '../../../components/Forms/Legacy/Input/Input.js';
import 'react-select';
import '../../../components/Icon/Icon.js';
import '../../../components/Forms/Legacy/Select/Select.js';
import '../../../components/Forms/Legacy/Switch/Switch.js';
import '../../../components/SecretFormField/SecretFormField.js';
import '../../../components/IconButton/IconButton.js';
import '../../../components/ConfirmButton/ConfirmButton.js';
import '../../../components/Button/Button.js';
import '../../../components/Button/ButtonGroup.js';
import '../../../components/Tooltip/Tooltip.js';
import '@floating-ui/react';
import { useTheme2, useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { Portal } from '../../../components/Portal/Portal.js';
import '../../../components/Toggletip/Toggletip.js';
import 'react-custom-scrollbars-2';
import '../../../components/Tabs/Tab.js';
import '../../../components/Tabs/TabsBar.js';
import '../../../utils/i18n.js';
import '../../../components/Cascader/Cascader.js';
import '../../../components/ButtonCascader/ButtonCascader.js';
import 'react-inlinesvg';
import '../../../components/ColorPicker/ColorPicker.js';
import '../../../components/ColorPicker/ColorPickerInput.js';
import '../../../components/ColorPicker/SeriesColorPickerPopover.js';
import '../../../components/Layout/Box/Box.js';
import '../../../components/Layout/Stack/Stack.js';
import '../../../components/Text/Text.js';
import '../../../components/EmptyState/GrotCTA/GrotCTA.js';
import '../../../components/EmptyState/GrotNotFound/GrotNotFound.js';
import '../../../components/StatsPicker/StatsPicker.js';
import '../../../components/RefreshPicker/RefreshPicker.js';
import '../../../components/DateTimePickers/TimeRangePicker.js';
import '../../../components/DateTimePickers/TimeRangePicker/TimeRangeLabel.js';
import 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import 'lodash';
import 'i18next';
import 'react-select/async';
import 'react-select/async-creatable';
import 'react-select/creatable';
import '../../../components/Select/IndicatorsContainer.js';
import '../../../components/Select/InputControl.js';
import '../../../components/Select/getSelectStyles.js';
import '../../../components/Input/Input.js';
import '../../../components/Select/SelectMenu.js';
import 'react-transition-group';
import '../../../components/Select/ValueContainer.js';
import '@grafana/e2e-selectors';
import '../../../components/DateTimePickers/DatePicker/DatePicker.js';
import '../../../components/DateTimePickers/DateTimePicker/DateTimePicker.js';
import '../../../components/List/AbstractList.js';
import 'react-table';
import '../../../components/InteractiveTable/Expander/index.js';
import '../../../utils/dom.js';
import '../../../utils/colors.js';
import 'slate';
import 'ansicolor';
import '../../../utils/logger.js';
import '../../../components/AutoSaveField/AutoSaveField.js';
import '../../../components/Tags/Tag.js';
import '../../../components/Tags/TagList.js';
import 'react-hook-form';
import '../../../components/Modal/Modal.js';
import '../../../components/QueryField/QueryField.js';
import '../../../components/Monaco/CodeEditor.js';
import '../../../components/ErrorBoundary/ErrorWithStack.js';
import '../../../components/Modal/ModalsContext.js';
import '../../../components/PageLayout/PageToolbar.js';
import 'rxjs';
import 'rxjs/operators';
import '../../../components/Table/Table.js';
import '../../../components/TableInputCSV/TableInputCSV.js';
import '../../../components/Tabs/VerticalTab.js';
import '../../../components/BigValue/BigValue.js';
import '../../../components/Sparkline/Sparkline.js';
import '../../../components/Gauge/Gauge.js';
import '../../../components/BarGauge/BarGauge.js';
import '../../../components/VizTooltip/VizTooltip.js';
import { VizTooltipContainer } from '../../../components/VizTooltip/VizTooltipContainer.js';
import { SeriesTable } from '../../../components/VizTooltip/SeriesTable.js';
import '../../../components/VizRepeater/VizRepeater.js';
import '../../../components/PanelChrome/index.js';
import '../../../components/VizLayout/VizLayout.js';
import '../../../components/VizLegend/VizLegend.js';
import '../../../components/VizLegend/VizLegendListItem.js';
import '../../../components/Alert/Alert.js';
import '../../../components/Collapse/Collapse.js';
import '../../../components/ClickOutsideWrapper/ClickOutsideWrapper.js';
import '../../../components/ContextMenu/ContextMenu.js';
import '../../../components/Menu/Menu.js';
import '../../../components/Menu/MenuGroup.js';
import '../../../components/Menu/MenuItem.js';
import '../../../components/DataLinks/DataLinkEditor.js';
import '../../../components/DataLinks/DataLinkInput.js';
import '../../../components/VizLegend/SeriesIcon.js';
import '../../../components/InfoBox/InfoBox.js';
import '../../../components/InfoBox/FeatureInfoBox.js';
import '../../../components/Badge/Badge.js';
import '../../../components/JSONFormatter/JSONFormatter.js';
import '../../../components/ErrorBoundary/ErrorBoundary.js';
import 'classnames';
import '../../../components/Forms/InlineField.js';
import '../../../components/Switch/Switch.js';
import '../../../components/DataSourceSettings/CustomHeadersSettings.js';
import '../../../components/TextArea/TextArea.js';
import 'react-use/lib/useClickAway';
import '@react-aria/dialog';
import '@react-aria/focus';
import '@react-aria/overlays';
import 'rc-drawer';
import 'rc-drawer/assets/index.css';
import '../../../components/Slider/Slider.js';
import '../../../components/Slider/RangeSlider.js';
import '../../../components/ToolbarButton/ToolbarButton.js';
import '../../../components/ToolbarButton/ToolbarButtonRow.js';
import '../../../components/MatchersUI/fieldMatchersUI.js';
import '../../../components/Link/Link.js';
import '../../../components/Link/TextLink.js';
import '../../../components/Layout/Grid/Grid.js';
import '../../../components/Forms/Field.js';
import '../../../components/Forms/InlineSegmentGroup.js';
import '../../../components/Forms/RadioButtonGroup/RadioButtonGroup.js';
import '../../../components/Input/AutoSizeInput.js';
import '../../../components/FilterInput/FilterInput.js';
import '../../../components/Forms/Checkbox.js';
import 'uuid';
import 'react-dropzone';
import '../../../components/DateTimePickers/TimeRangePicker/TimePickerContent.js';
import '../../../components/DateTimePickers/RelativeTimeRangePicker/RelativeTimeRangePicker.js';
import '../../../components/Card/Card.js';
import '../../../components/FormattedValueDisplay/FormattedValueDisplay.js';
import '../../../components/Dropdown/ButtonSelect.js';
import '../../../components/Dropdown/Dropdown.js';
import '../../../components/PluginSignatureBadge/PluginSignatureBadge.js';
import '../../../components/Divider/Divider.js';
import '../../../components/uPlot/config.js';
import 'uplot';
import { findMidPointYPosition } from '../../../components/uPlot/utils.js';
import 'uplot/dist/uPlot.min.css';
import '../../../components/uPlot/PlotLegend.js';
import 'react-dom';
import '../../../components/BrowserLabel/Label.js';
import '../../Graph/Graph.js';
import '../../GraphNG/GraphNG.js';
import '../../TimeSeries/TimeSeries.js';
import '../../GraphNG/hooks.js';

var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
const TOOLTIP_OFFSET = 10;
const TooltipPlugin = (_a) => {
  var _b = _a, {
    mode = TooltipDisplayMode.Single,
    sortOrder = SortOrder.None,
    sync,
    timeZone,
    config,
    renderTooltip
  } = _b, otherProps = __objRest(_b, [
    "mode",
    "sortOrder",
    "sync",
    "timeZone",
    "config",
    "renderTooltip"
  ]);
  var _a2, _b2, _c, _d, _e;
  const plotInstance = useRef();
  const theme = useTheme2();
  const [focusedSeriesIdx, setFocusedSeriesIdx] = useState(null);
  const [focusedPointIdx, setFocusedPointIdx] = useState(null);
  const [focusedPointIdxs, setFocusedPointIdxs] = useState([]);
  const [coords, setCoords] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const isMounted = useMountedState();
  let parentWithFocus = null;
  const style = useStyles2(getStyles);
  useLayoutEffect(() => {
    let bbox = void 0;
    const plotEnter = () => {
      var _a3;
      if (!isMounted()) {
        return;
      }
      setIsActive(true);
      (_a3 = plotInstance.current) == null ? void 0 : _a3.root.classList.add("plot-active");
    };
    const plotLeave = () => {
      var _a3;
      if (!isMounted()) {
        return;
      }
      setCoords(null);
      setIsActive(false);
      (_a3 = plotInstance.current) == null ? void 0 : _a3.root.classList.remove("plot-active");
    };
    config.addHook("syncRect", (u, rect) => bbox = rect);
    config.addHook("init", (u) => {
      plotInstance.current = u;
      u.over.addEventListener("mouseenter", plotEnter);
      u.over.addEventListener("mouseleave", plotLeave);
      parentWithFocus = u.root.closest("[tabindex]");
      if (parentWithFocus) {
        parentWithFocus.addEventListener("focus", plotEnter);
        parentWithFocus.addEventListener("blur", plotLeave);
      }
      if (sync && sync() === DashboardCursorSync.Crosshair) {
        u.root.classList.add("shared-crosshair");
      }
    });
    config.addHook("setLegend", (u) => {
      if (!isMounted()) {
        return;
      }
      setFocusedPointIdx(u.legend.idx);
      setFocusedPointIdxs(u.legend.idxs.slice());
    });
    config.addHook("setCursor", (u) => {
      if (!bbox || !isMounted()) {
        return;
      }
      const { x, y } = positionTooltip(u, bbox);
      if (x !== void 0 && y !== void 0) {
        setCoords({ x, y });
      } else {
        setCoords(null);
      }
    });
    config.addHook("setSeries", (_, idx) => {
      if (!isMounted()) {
        return;
      }
      setFocusedSeriesIdx(idx);
    });
    return () => {
      setCoords(null);
      if (plotInstance.current) {
        plotInstance.current.over.removeEventListener("mouseleave", plotLeave);
        plotInstance.current.over.removeEventListener("mouseenter", plotEnter);
        if (parentWithFocus) {
          parentWithFocus.removeEventListener("focus", plotEnter);
          parentWithFocus.removeEventListener("blur", plotLeave);
        }
      }
    };
  }, [config, setCoords, setIsActive, setFocusedPointIdx, setFocusedPointIdxs]);
  if (focusedPointIdx === null || !isActive && sync && sync() === DashboardCursorSync.Crosshair) {
    return null;
  }
  let xField = otherProps.data.fields[0];
  if (!xField) {
    return null;
  }
  const xFieldFmt = xField.display || getDisplayProcessor({ field: xField, timeZone, theme });
  let tooltip = null;
  let xVal = xFieldFmt(xField.values[focusedPointIdx]).text;
  if (!renderTooltip) {
    if (mode === TooltipDisplayMode.Single && focusedSeriesIdx !== null) {
      const field = otherProps.data.fields[focusedSeriesIdx];
      if (!field) {
        return null;
      }
      const dataIdx = (_a2 = focusedPointIdxs == null ? void 0 : focusedPointIdxs[focusedSeriesIdx]) != null ? _a2 : focusedPointIdx;
      xVal = xFieldFmt(xField.values[dataIdx]).text;
      const fieldFmt = field.display || getDisplayProcessor({ field, timeZone, theme });
      const display = fieldFmt(field.values[dataIdx]);
      tooltip = /* @__PURE__ */ React__default.createElement(
        SeriesTable,
        {
          series: [
            {
              color: display.color || FALLBACK_COLOR,
              label: getFieldDisplayName(field, otherProps.data, otherProps.frames),
              value: display ? formattedValueToString(display) : null
            }
          ],
          timestamp: xVal
        }
      );
    }
    if (mode === TooltipDisplayMode.Multi) {
      let series = [];
      const frame = otherProps.data;
      const fields = frame.fields;
      const sortIdx = [];
      for (let i = 0; i < fields.length; i++) {
        const field = frame.fields[i];
        if (!field || field === xField || field.type === FieldType.time || field.type !== FieldType.number || ((_c = (_b2 = field.config.custom) == null ? void 0 : _b2.hideFrom) == null ? void 0 : _c.tooltip) || ((_e = (_d = field.config.custom) == null ? void 0 : _d.hideFrom) == null ? void 0 : _e.viz)) {
          continue;
        }
        const v = otherProps.data.fields[i].values[focusedPointIdxs[i]];
        const display = field.display(v);
        sortIdx.push(v);
        series.push({
          color: display.color || FALLBACK_COLOR,
          label: getFieldDisplayName(field, frame, otherProps.frames),
          value: display ? formattedValueToString(display) : null,
          isActive: focusedSeriesIdx === i
        });
      }
      if (sortOrder !== SortOrder.None) {
        const sortRef = [...series];
        const sortFn = arrayUtils.sortValues(sortOrder);
        series.sort((a, b) => {
          const aIdx = sortRef.indexOf(a);
          const bIdx = sortRef.indexOf(b);
          return sortFn(sortIdx[aIdx], sortIdx[bIdx]);
        });
      }
      tooltip = /* @__PURE__ */ React__default.createElement(SeriesTable, { series, timestamp: xVal });
    }
  } else {
    tooltip = renderTooltip(otherProps.data, focusedSeriesIdx, focusedPointIdx);
  }
  return /* @__PURE__ */ React__default.createElement(Portal, { className: isActive ? style.tooltipWrapper : void 0 }, tooltip && coords && /* @__PURE__ */ React__default.createElement(VizTooltipContainer, { position: { x: coords.x, y: coords.y }, offset: { x: TOOLTIP_OFFSET, y: TOOLTIP_OFFSET } }, tooltip));
};
function isCursorOutsideCanvas({ left, top }, canvas) {
  if (left === void 0 || top === void 0) {
    return false;
  }
  return left < 0 || left > canvas.width || top < 0 || top > canvas.height;
}
function positionTooltip(u, bbox) {
  let x, y;
  const cL = u.cursor.left || 0;
  const cT = u.cursor.top || 0;
  if (isCursorOutsideCanvas(u.cursor, bbox)) {
    const idx = u.posToIdx(cL);
    if (cT < 0 || cT > bbox.height) {
      let pos = findMidPointYPosition(u, idx);
      if (pos) {
        y = bbox.top + pos;
        if (cL >= 0 && cL <= bbox.width) {
          x = bbox.left + u.valToPos(u.data[0][u.posToIdx(cL)], u.series[0].scale);
        }
      }
    }
  } else {
    x = bbox.left + cL;
    y = bbox.top + cT;
  }
  return { x, y };
}
const getStyles = (theme) => ({
  tooltipWrapper: css({
    "z-index": theme.zIndex.portal + 1 + " !important"
  })
});

export { TooltipPlugin, positionTooltip };
//# sourceMappingURL=TooltipPlugin.js.map
