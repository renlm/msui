import React from 'react';
import { DataFrame, GrafanaTheme2 } from '@grafana/data';
import { GetExtraContextMenuButtonsFunction } from './FlameGraph/FlameGraphContextMenu';
export type Props = {
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
export default FlameGraphContainer;
