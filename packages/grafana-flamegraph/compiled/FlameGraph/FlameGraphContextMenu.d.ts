import React from 'react';
import { DataFrame } from '@grafana/data';
import { IconName } from '@grafana/ui';
import { ClickedItemData, SelectedView } from '../types';
import { CollapseConfig, FlameGraphDataContainer } from './dataTransform';
export type GetExtraContextMenuButtonsFunction = (clickedItemData: ClickedItemData, data: DataFrame, state: {
    selectedView: SelectedView;
    isDiff: boolean;
    search: string;
    collapseConfig?: CollapseConfig;
}) => ExtraContextMenuButton[];
export type ExtraContextMenuButton = {
    label: string;
    icon: IconName;
    onClick: () => void;
};
type Props = {
    data: FlameGraphDataContainer;
    itemData: ClickedItemData;
    onMenuItemClick: () => void;
    onItemFocus: () => void;
    onSandwich: () => void;
    onExpandGroup: () => void;
    onCollapseGroup: () => void;
    onExpandAllGroups: () => void;
    onCollapseAllGroups: () => void;
    getExtraContextMenuButtons?: GetExtraContextMenuButtonsFunction;
    collapseConfig?: CollapseConfig;
    collapsing?: boolean;
    allGroupsCollapsed?: boolean;
    allGroupsExpanded?: boolean;
    selectedView: SelectedView;
    search: string;
};
declare const FlameGraphContextMenu: ({ data, itemData, onMenuItemClick, onItemFocus, onSandwich, collapseConfig, onExpandGroup, onCollapseGroup, onExpandAllGroups, onCollapseAllGroups, getExtraContextMenuButtons, collapsing, allGroupsExpanded, allGroupsCollapsed, selectedView, search, }: Props) => React.JSX.Element;
export default FlameGraphContextMenu;
