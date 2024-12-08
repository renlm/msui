import React__default, { useCallback } from 'react';
import { DataHoverEvent, DataHoverClearEvent } from '@grafana/data';
import { LegendDisplayMode } from '@grafana/schema';
import '../PanelChrome/index.js';
import { VizLegendList } from './VizLegendList.js';
import { VizLegendTable } from './VizLegendTable.js';
import { SeriesVisibilityChangeBehavior } from './types.js';
import { mapMouseEventToMode } from './utils.js';
import { usePanelContext } from '../PanelChrome/PanelContext.js';
import { SeriesVisibilityChangeMode } from '../PanelChrome/types.js';

function VizLegend({
  items,
  displayMode,
  sortBy: sortKey,
  seriesVisibilityChangeBehavior = SeriesVisibilityChangeBehavior.Isolate,
  sortDesc,
  onLabelClick,
  onToggleSort,
  placement,
  className,
  itemRenderer,
  readonly,
  isSortable
}) {
  const { eventBus, onToggleSeriesVisibility, onToggleLegendSort } = usePanelContext();
  const onMouseOver = useCallback(
    (item, event) => {
      eventBus == null ? void 0 : eventBus.publish({
        type: DataHoverEvent.type,
        payload: {
          raw: event,
          x: 0,
          y: 0,
          dataId: item.label
        }
      });
    },
    [eventBus]
  );
  const onMouseOut = useCallback(
    (item, event) => {
      eventBus == null ? void 0 : eventBus.publish({
        type: DataHoverClearEvent.type,
        payload: {
          raw: event,
          x: 0,
          y: 0,
          dataId: item.label
        }
      });
    },
    [eventBus]
  );
  const onLegendLabelClick = useCallback(
    (item, event) => {
      var _a;
      if (onLabelClick) {
        onLabelClick(item, event);
      }
      if (onToggleSeriesVisibility) {
        onToggleSeriesVisibility(
          (_a = item.fieldName) != null ? _a : item.label,
          seriesVisibilityChangeBehavior === SeriesVisibilityChangeBehavior.Hide ? SeriesVisibilityChangeMode.AppendToSelection : mapMouseEventToMode(event)
        );
      }
    },
    [onToggleSeriesVisibility, onLabelClick, seriesVisibilityChangeBehavior]
  );
  switch (displayMode) {
    case LegendDisplayMode.Table:
      return /* @__PURE__ */ React__default.createElement(
        VizLegendTable,
        {
          className,
          items,
          placement,
          sortBy: sortKey,
          sortDesc,
          onLabelClick: onLegendLabelClick,
          onToggleSort: onToggleSort || onToggleLegendSort,
          onLabelMouseOver: onMouseOver,
          onLabelMouseOut: onMouseOut,
          itemRenderer,
          readonly,
          isSortable
        }
      );
    case LegendDisplayMode.List:
      return /* @__PURE__ */ React__default.createElement(
        VizLegendList,
        {
          className,
          items,
          placement,
          onLabelMouseOver: onMouseOver,
          onLabelMouseOut: onMouseOut,
          onLabelClick: onLegendLabelClick,
          itemRenderer,
          readonly
        }
      );
    default:
      return null;
  }
}
VizLegend.displayName = "VizLegend";

export { VizLegend };
//# sourceMappingURL=VizLegend.js.map
