import React from 'react';
import { ExemplarTraceIdDestination } from '../types';
type Props = {
    value: ExemplarTraceIdDestination;
    onChange: (value: ExemplarTraceIdDestination) => void;
    onDelete: () => void;
    disabled?: boolean;
};
export declare function ExemplarSetting({ value, onChange, onDelete, disabled }: Props): React.JSX.Element;
export {};
