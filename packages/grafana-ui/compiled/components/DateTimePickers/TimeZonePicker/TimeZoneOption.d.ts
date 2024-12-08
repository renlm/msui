import React, { PropsWithChildren, RefCallback } from 'react';
import { SelectableValue } from '@grafana/data';
interface Props {
    isFocused: boolean;
    isSelected: boolean;
    innerProps: JSX.IntrinsicElements['div'];
    innerRef: RefCallback<HTMLDivElement>;
    data: SelectableZone;
}
export interface SelectableZone extends SelectableValue<string> {
    searchIndex: string;
}
export declare const WideTimeZoneOption: (props: PropsWithChildren<Props>) => React.JSX.Element | null;
export declare const CompactTimeZoneOption: (props: React.PropsWithChildren<Props>) => React.JSX.Element | null;
export {};
