import React from 'react';
import { FieldType, DataFrame, GrafanaTheme2, DataFrameDTO } from '@grafana/data';
import { IconName } from '@grafana/ui';

type LevelItem = {
    start: number;
    value: number;
    valueRight?: number;
    itemIndexes: number[];
    children: LevelItem[];
    level: number;
    parents?: LevelItem[];
};
type CollapseConfig = {
    items: LevelItem[];
    collapsed: boolean;
};
declare function getMessageCheckFieldsResult(wrongFields: CheckFieldsResult): string;
type CheckFieldsResult = {
    wrongTypeFields: Array<{
        name: string;
        expectedTypes: FieldType[];
        type: FieldType;
    }>;
    missingFields: string[];
};
declare function checkFields(data: DataFrame): CheckFieldsResult | undefined;

type ClickedItemData = {
    posX: number;
    posY: number;
    label: string;
    item: LevelItem;
};
declare enum SelectedView {
    TopTable = "topTable",
    FlameGraph = "flameGraph",
    Both = "both"
}

type GetExtraContextMenuButtonsFunction = (clickedItemData: ClickedItemData, data: DataFrame, state: {
    selectedView: SelectedView;
    isDiff: boolean;
    search: string;
    collapseConfig?: CollapseConfig;
}) => ExtraContextMenuButton[];
type ExtraContextMenuButton = {
    label: string;
    icon: IconName;
    onClick: () => void;
};

type Props = {
    /**
     * DataFrame with the profile data. The dataFrame needs to have the following fields:
     * label: string - the label of the node
     * level: number - the nesting level of the node
     * value: number - the total value of the node
     * self: number - the self value of the node
     * Optionally if it represents diff of 2 different profiles it can also have fields:
     * valueRight: number - the total value of the node in the right profile
     * selfRight: number - the self value of the node in the right profile
     */
    data?: DataFrame;
    /**
     * Whether the header should be sticky and be always visible on the top when scrolling.
     */
    stickyHeader?: boolean;
    /**
     * Provides a theme for the visualization on which colors and some sizes are based.
     */
    getTheme: () => GrafanaTheme2;
    /**
     * Various interaction hooks that can be used to report on the interaction.
     */
    onTableSymbolClick?: (symbol: string) => void;
    onViewSelected?: (view: string) => void;
    onTextAlignSelected?: (align: string) => void;
    onTableSort?: (sort: string) => void;
    /**
     * Elements that will be shown in the header on the right side of the header buttons. Useful for additional
     * functionality.
     */
    extraHeaderElements?: React.ReactNode;
    /**
     * Extra buttons that will be shown in the context menu when user clicks on a Node.
     */
    getExtraContextMenuButtons?: GetExtraContextMenuButtonsFunction;
    /**
     * If true the flamegraph will be rendered on top of the table.
     */
    vertical?: boolean;
    /**
     * If true only the flamegraph will be rendered.
     */
    showFlameGraphOnly?: boolean;
    /**
     * Disable behaviour where similar items in the same stack will be collapsed into single item.
     */
    disableCollapsing?: boolean;
};
declare const FlameGraphContainer: ({ data, onTableSymbolClick, onViewSelected, onTextAlignSelected, onTableSort, getTheme, stickyHeader, extraHeaderElements, vertical, showFlameGraphOnly, disableCollapsing, getExtraContextMenuButtons, }: Props) => React.JSX.Element | null;

declare const data: DataFrameDTO;

export { FlameGraphContainer as FlameGraph, Props, checkFields, data, getMessageCheckFieldsResult };
