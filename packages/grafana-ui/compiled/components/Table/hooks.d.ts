import React from 'react';
import { VariableSizeList } from 'react-window';
import { DataFrame } from '@grafana/data';
import { GrafanaTableState } from './types';
/**
  To have the custom vertical scrollbar always visible (https://github.com/grafana/grafana/issues/52136),
  we need to bring the element from the VariableSizeList scope to the outer Table container scope,
  because the VariableSizeList scope has overflow. By moving scrollbar to container scope we will have
  it always visible since the entire width is in view.
  Select the scrollbar element from the VariableSizeList scope
 */
export declare function useFixScrollbarContainer(variableSizeListScrollbarRef: React.RefObject<HTMLDivElement>, tableDivRef: React.RefObject<HTMLDivElement>): void;
/**
  react-table caches the height of cells, so we need to reset them when expanding/collapsing rows.
  We use `lastExpandedOrCollapsedIndex` since collapsed rows disappear from `expandedIndexes` but still keep their expanded
  height.
 */
export declare function useResetVariableListSizeCache(extendedState: GrafanaTableState, listRef: React.RefObject<VariableSizeList>, data: DataFrame, hasUniqueId: boolean): void;
