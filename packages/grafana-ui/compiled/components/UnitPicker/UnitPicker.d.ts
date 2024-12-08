import React, { PureComponent } from 'react';
import { SelectableValue } from '@grafana/data';
export interface UnitPickerProps {
    onChange: (item?: string) => void;
    value?: string;
    width?: number;
}
export declare class UnitPicker extends PureComponent<UnitPickerProps> {
    onChange: (value: SelectableValue<string>) => void;
    render(): React.JSX.Element;
}
