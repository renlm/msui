import React from 'react';
import { FlameGraphDataContainer } from '../FlameGraph/dataTransform';
import { ColorScheme, ColorSchemeDiff } from '../types';
type Props = {
    data: FlameGraphDataContainer;
    onSymbolClick: (symbol: string) => void;
    search?: string;
    matchedLabels?: Set<string>;
    sandwichItem?: string;
    onSearch: (str: string) => void;
    onSandwich: (str?: string) => void;
    onTableSort?: (sort: string) => void;
    colorScheme: ColorScheme | ColorSchemeDiff;
};
declare const FlameGraphTopTableContainer: React.MemoExoticComponent<({ data, onSymbolClick, search, matchedLabels, onSearch, sandwichItem, onSandwich, onTableSort, colorScheme, }: Props) => React.JSX.Element>;
export default FlameGraphTopTableContainer;
