import React, { PureComponent } from 'react';
import { SelectableValue, FieldReducerInfo } from '@grafana/data';
export interface Props {
    placeholder?: string;
    onChange: (stats: string[]) => void;
    stats: string[];
    allowMultiple?: boolean;
    defaultStat?: string;
    className?: string;
    width?: number;
    menuPlacement?: 'auto' | 'bottom' | 'top';
    inputId?: string;
    filterOptions?: (ext: FieldReducerInfo) => boolean;
}
export declare class StatsPicker extends PureComponent<Props> {
    static defaultProps: Partial<Props>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    checkInput: () => void;
    onSelectionChange: (item: SelectableValue<string>) => void;
    render(): React.JSX.Element;
}
