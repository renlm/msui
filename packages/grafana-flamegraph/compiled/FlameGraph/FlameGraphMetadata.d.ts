import React from 'react';
import { ClickedItemData } from '../types';
import { FlameGraphDataContainer } from './dataTransform';
type Props = {
    data: FlameGraphDataContainer;
    totalTicks: number;
    onFocusPillClick: () => void;
    onSandwichPillClick: () => void;
    focusedItem?: ClickedItemData;
    sandwichedLabel?: string;
};
declare const FlameGraphMetadata: React.MemoExoticComponent<({ data, focusedItem, totalTicks, sandwichedLabel, onFocusPillClick, onSandwichPillClick }: Props) => React.JSX.Element>;
export default FlameGraphMetadata;
