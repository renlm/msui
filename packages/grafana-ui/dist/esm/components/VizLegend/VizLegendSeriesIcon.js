import React__default, { useCallback } from 'react';
import { SeriesColorPicker } from '../ColorPicker/ColorPicker.js';
import '../PanelChrome/index.js';
import { SeriesIcon } from './SeriesIcon.js';
import { usePanelContext } from '../PanelChrome/PanelContext.js';

const VizLegendSeriesIcon = React__default.memo(({ seriesName, color, gradient, readonly, lineStyle }) => {
  const { onSeriesColorChange } = usePanelContext();
  const onChange = useCallback(
    (color2) => {
      return onSeriesColorChange(seriesName, color2);
    },
    [seriesName, onSeriesColorChange]
  );
  if (seriesName && onSeriesColorChange && color && !readonly) {
    return /* @__PURE__ */ React__default.createElement(SeriesColorPicker, { color, onChange, enableNamedColors: true }, ({ ref, showColorPicker, hideColorPicker }) => /* @__PURE__ */ React__default.createElement(
      SeriesIcon,
      {
        color,
        className: "pointer",
        ref,
        onClick: showColorPicker,
        onMouseLeave: hideColorPicker,
        lineStyle
      }
    ));
  }
  return /* @__PURE__ */ React__default.createElement(SeriesIcon, { color, gradient, lineStyle });
});
VizLegendSeriesIcon.displayName = "VizLegendSeriesIcon";

export { VizLegendSeriesIcon };
//# sourceMappingURL=VizLegendSeriesIcon.js.map
