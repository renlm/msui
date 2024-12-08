/// <reference types="lodash" />
import React, { PureComponent } from 'react';
import { DataFrame, CSVConfig } from '@grafana/data';
import { Themeable2 } from '../../types/theme';
interface Props extends Themeable2 {
    config?: CSVConfig;
    text: string;
    width: string | number;
    height: string | number;
    onSeriesParsed: (data: DataFrame[], text: string) => void;
}
interface State {
    text: string;
    data: DataFrame[];
}
/**
 * Expects the container div to have size set and will fill it 100%
 */
export declare class UnThemedTableInputCSV extends PureComponent<Props, State> {
    constructor(props: Props);
    readCSV: import("lodash").DebouncedFunc<() => void>;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    render(): React.JSX.Element;
}
export declare const TableInputCSV: React.FunctionComponent<{
    text: string;
    width: string | number;
    config?: CSVConfig | undefined;
    height: string | number;
    onSeriesParsed: (data: DataFrame[], text: string) => void;
}>;
export {};
