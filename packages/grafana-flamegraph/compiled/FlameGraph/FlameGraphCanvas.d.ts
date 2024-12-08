import React from 'react';
import { ClickedItemData, ColorScheme, ColorSchemeDiff, SelectedView, TextAlign } from '../types';
import { GetExtraContextMenuButtonsFunction } from './FlameGraphContextMenu';
import { CollapsedMap, FlameGraphDataContainer, LevelItem } from './dataTransform';
type Props = {
    data: FlameGraphDataContainer;
    rangeMin: number;
    rangeMax: number;
    matchedLabels: Set<string> | undefined;
    setRangeMin: (range: number) => void;
    setRangeMax: (range: number) => void;
    style?: React.CSSProperties;
    onItemFocused: (data: ClickedItemData) => void;
    focusedItemData?: ClickedItemData;
    textAlign: TextAlign;
    onSandwich: (label: string) => void;
    colorScheme: ColorScheme | ColorSchemeDiff;
    root: LevelItem;
    direction: 'children' | 'parents';
    depth: number;
    totalProfileTicks: number;
    totalProfileTicksRight?: number;
    totalViewTicks: number;
    showFlameGraphOnly?: boolean;
    collapsedMap: CollapsedMap;
    setCollapsedMap: (collapsedMap: CollapsedMap) => void;
    collapsing?: boolean;
    getExtraContextMenuButtons?: GetExtraContextMenuButtonsFunction;
    selectedView: SelectedView;
    search: string;
};
declare const FlameGraphCanvas: ({ data, rangeMin, rangeMax, matchedLabels, setRangeMin, setRangeMax, onItemFocused, focusedItemData, textAlign, onSandwich, colorScheme, totalProfileTicks, totalProfileTicksRight, totalViewTicks, root, direction, depth, showFlameGraphOnly, collapsedMap, setCollapsedMap, collapsing, getExtraContextMenuButtons, selectedView, search, }: Props) => React.JSX.Element;
export declare const convertPixelCoordinatesToBarCoordinates: (pos: {
    x: number;
    y: number;
}, root: LevelItem, direction: 'children' | 'parents', depth: number, pixelsPerTick: number, totalTicks: number, rangeMin: number, collapsedMap: CollapsedMap) => LevelItem | undefined;
export default FlameGraphCanvas;
