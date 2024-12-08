import React__default from 'react';
import { getValueFromDimension } from '@grafana/data';
import '../../../components/VizTooltip/VizTooltip.js';
import '../../../components/VizTooltip/VizTooltipContainer.js';
import { SeriesTable } from '../../../components/VizTooltip/SeriesTable.js';
import { getMultiSeriesGraphHoverInfo } from '../utils.js';

const MultiModeGraphTooltip = ({ dimensions, activeDimensions, pos, timeZone }) => {
  let activeSeriesIndex = null;
  if (activeDimensions.xAxis === null) {
    return null;
  }
  if (activeDimensions.yAxis) {
    activeSeriesIndex = activeDimensions.yAxis[0];
  }
  const time = activeDimensions.xAxis[1] ? getValueFromDimension(dimensions.xAxis, activeDimensions.xAxis[0], activeDimensions.xAxis[1]) : pos.x;
  const hoverInfo = getMultiSeriesGraphHoverInfo(dimensions.yAxis.columns, dimensions.xAxis.columns, time);
  const timestamp = hoverInfo.time;
  const series = hoverInfo.results.map((s, i) => {
    return {
      color: s.color,
      label: s.label,
      value: s.value,
      isActive: activeSeriesIndex === i
    };
  });
  return /* @__PURE__ */ React__default.createElement(SeriesTable, { series, timestamp });
};
MultiModeGraphTooltip.displayName = "MultiModeGraphTooltip";

export { MultiModeGraphTooltip };
//# sourceMappingURL=MultiModeGraphTooltip.js.map
