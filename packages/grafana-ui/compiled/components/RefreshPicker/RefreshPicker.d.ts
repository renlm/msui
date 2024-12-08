import React, { PureComponent } from 'react';
import { SelectableValue } from '@grafana/data';
import { ToolbarButtonVariant } from '../ToolbarButton';
export declare const defaultIntervals: string[];
export interface Props {
    intervals?: string[];
    onRefresh?: () => void;
    onIntervalChanged: (interval: string) => void;
    value?: string;
    tooltip?: string;
    isLoading?: boolean;
    isLive?: boolean;
    text?: string;
    noIntervalPicker?: boolean;
    showAutoInterval?: boolean;
    width?: string;
    primary?: boolean;
    isOnCanvas?: boolean;
}
export declare class RefreshPicker extends PureComponent<Props> {
    static offOption: {
        label: string;
        value: string;
        ariaLabel: string;
    };
    static liveOption: {
        label: string;
        value: string;
        ariaLabel: string;
    };
    static autoOption: {
        label: string;
        value: string;
        ariaLabel: string;
    };
    static isLive: (refreshInterval?: string) => boolean;
    constructor(props: Props);
    onChangeSelect: (item: SelectableValue<string>) => void;
    getVariant(): ToolbarButtonVariant;
    render(): React.JSX.Element;
}
export declare function translateOption(option: string): {
    label: string;
    value: string;
    ariaLabel: string;
} | {
    label: string;
    value: string;
    ariaLabel?: undefined;
};
export declare function intervalsToOptions({ intervals, showAutoInterval, }?: {
    intervals?: string[];
    showAutoInterval?: boolean;
}): Array<SelectableValue<string>>;
