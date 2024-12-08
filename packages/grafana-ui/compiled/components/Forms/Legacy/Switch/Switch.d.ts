import { Placement } from '@popperjs/core';
import React from 'react';
import { Themeable2 } from '../../../../types';
export interface Props extends Themeable2 {
    label: string;
    checked: boolean;
    disabled?: boolean;
    className?: string;
    labelClass?: string;
    switchClass?: string;
    tooltip?: string;
    tooltipPlacement?: Placement;
    transparent?: boolean;
    onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}
export interface State {
    id: string;
}
export declare const Switch: React.FunctionComponent<{
    label: string;
    tooltip?: string | undefined;
    transparent?: boolean | undefined;
    disabled?: boolean | undefined;
    onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
    className?: string | undefined;
    checked: boolean;
    tooltipPlacement?: Placement | undefined;
    labelClass?: string | undefined;
    switchClass?: string | undefined;
}>;
