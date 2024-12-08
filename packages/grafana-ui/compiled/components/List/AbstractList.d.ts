import React, { PureComponent } from 'react';
export interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    getItemKey?: (item: T) => string;
    className?: string;
}
interface AbstractListProps<T> extends ListProps<T> {
    inline?: boolean;
}
export declare class AbstractList<T> extends PureComponent<AbstractListProps<T>> {
    constructor(props: AbstractListProps<T>);
    render(): React.JSX.Element;
}
export {};
