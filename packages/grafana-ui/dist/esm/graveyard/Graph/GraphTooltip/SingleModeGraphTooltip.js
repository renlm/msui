import React__default from 'react';
import { getValueFromDimension, getColumnFromDimension, formattedValueToString, getFieldDisplayName } from '@grafana/data';
import '../../../components/VizTooltip/VizTooltip.js';
import '../../../components/VizTooltip/VizTooltipContainer.js';
import { SeriesTable } from '../../../components/VizTooltip/SeriesTable.js';

const SingleModeGraphTooltip = ({ dimensions, activeDimensions, timeZone }) => {
  if (activeDimensions.yAxis === null || activeDimensions.yAxis[1] === void 0 || activeDimensions.xAxis === null || activeDimensions.xAxis[1] === void 0) {
    return null;
  }
  const time = getValueFromDimension(dimensions.xAxis, activeDimensions.xAxis[0], activeDimensions.xAxis[1]);
  const timeField = getColumnFromDimension(dimensions.xAxis, activeDimensions.xAxis[0]);
  const processedTime = timeField.display ? formattedValueToString(timeField.display(time)) : time;
  const valueField = getColumnFromDimension(dimensions.yAxis, activeDimensions.yAxis[0]);
  const value = getValueFromDimension(dimensions.yAxis, activeDimensions.yAxis[0], activeDimensions.yAxis[1]);
  const display = valueField.display;
  const disp = display(value);
  return /* @__PURE__ */ React__default.createElement(
    SeriesTable,
    {
      series: [
        {
          color: disp.color,
          label: getFieldDisplayName(valueField),
          value: formattedValueToString(disp)
        }
      ],
      timestamp: processedTime
    }
  );
};
SingleModeGraphTooltip.displayName = "SingleModeGraphTooltip";

export { SingleModeGraphTooltip };
//# sourceMappingURL=SingleModeGraphTooltip.js.map
