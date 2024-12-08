import React from 'react';
import { ExemplarTraceIdDestination } from '../types';
type Props = {
    options?: ExemplarTraceIdDestination[];
    onChange: (value: ExemplarTraceIdDestination[]) => void;
    disabled?: boolean;
};
export declare function ExemplarsSettings({ options, onChange, disabled }: Props): React.JSX.Element;
export {};
