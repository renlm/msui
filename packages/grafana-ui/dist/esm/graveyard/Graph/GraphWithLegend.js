import { css } from '@emotion/css';
import React__default from 'react';
import { CustomScrollbar } from '../../components/CustomScrollbar/CustomScrollbar.js';
import { VizLegend } from '../../components/VizLegend/VizLegend.js';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Graph } from './Graph.js';

const shouldHideLegendItem = (data, hideEmpty = false, hideZero = false) => {
  const isZeroOnlySeries = data.reduce((acc, current) => acc + (current[1] || 0), 0) === 0;
  const isNullOnlySeries = !data.reduce((acc, current) => acc && current[1] !== null, true);
  return hideEmpty && isNullOnlySeries || hideZero && isZeroOnlySeries;
};
const GraphWithLegend = (props) => {
  const {
    series,
    timeRange,
    width,
    height,
    showBars,
    showLines,
    showPoints,
    sortLegendBy,
    sortLegendDesc,
    legendDisplayMode,
    legendVisibility,
    placement,
    onSeriesToggle,
    onToggleSort,
    hideEmpty,
    hideZero,
    isStacked,
    lineWidth,
    onHorizontalRegionSelected,
    timeZone,
    children,
    ariaLabel
  } = props;
  const { graphContainer, wrapper, legendContainer } = useStyles2(getGraphWithLegendStyles, props.placement);
  const legendItems = series.reduce((acc, s) => {
    return shouldHideLegendItem(s.data, hideEmpty, hideZero) ? acc : acc.concat([
      {
        label: s.label,
        color: s.color || "",
        disabled: !s.isVisible,
        yAxis: s.yAxis.index,
        getDisplayValues: () => s.info || []
      }
    ]);
  }, []);
  return /* @__PURE__ */ React__default.createElement("div", { className: wrapper, "aria-label": ariaLabel }, /* @__PURE__ */ React__default.createElement("div", { className: graphContainer }, /* @__PURE__ */ React__default.createElement(
    Graph,
    {
      series,
      timeRange,
      timeZone,
      showLines,
      showPoints,
      showBars,
      width,
      height,
      isStacked,
      lineWidth,
      onHorizontalRegionSelected
    },
    children
  )), legendVisibility && /* @__PURE__ */ React__default.createElement("div", { className: legendContainer }, /* @__PURE__ */ React__default.createElement(CustomScrollbar, { hideHorizontalTrack: true }, /* @__PURE__ */ React__default.createElement(
    VizLegend,
    {
      items: legendItems,
      displayMode: legendDisplayMode,
      placement,
      sortBy: sortLegendBy,
      sortDesc: sortLegendDesc,
      onLabelClick: (item, event) => {
        if (onSeriesToggle) {
          onSeriesToggle(item.label, event);
        }
      },
      onToggleSort
    }
  ))));
};
const getGraphWithLegendStyles = (_theme, placement) => ({
  wrapper: css({
    display: "flex",
    flexDirection: placement === "bottom" ? "column" : "row"
  }),
  graphContainer: css({
    minHeight: "65%",
    flexGrow: 1
  }),
  legendContainer: css({
    padding: "10px 0",
    maxHeight: placement === "bottom" ? "35%" : "none"
  })
});

export { GraphWithLegend };
//# sourceMappingURL=GraphWithLegend.js.map
