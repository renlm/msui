import React from 'react';
import { IconName } from '../../types';
export interface FilterPillProps {
    selected: boolean;
    label: string;
    onClick: React.MouseEventHandler<HTMLElement>;
    icon?: IconName;
}
export declare const FilterPill: ({ label, selected, onClick, icon }: FilterPillProps) => React.JSX.Element;
