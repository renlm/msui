import React, { PureComponent } from 'react';
import { JsonExplorerConfig } from './json_explorer/json_explorer';
interface Props {
    className?: string;
    json: {};
    config?: JsonExplorerConfig;
    open?: number;
    onDidRender?: (formattedJson: {}) => void;
}
export declare class JSONFormatter extends PureComponent<Props> {
    private wrapperRef;
    static defaultProps: {
        open: number;
        config: {
            animateOpen: boolean;
        };
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    renderJson: () => void;
    render(): React.JSX.Element;
}
export {};
