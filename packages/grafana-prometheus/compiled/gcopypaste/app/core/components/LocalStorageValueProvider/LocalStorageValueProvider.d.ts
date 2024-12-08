import React from 'react';
export interface Props<T> {
    storageKey: string;
    defaultValue: T;
    children: (value: T, onSaveToStore: (value: T) => void, onDeleteFromStore: () => void) => React.ReactNode;
}
export declare const LocalStorageValueProvider: <T>(props: Props<T>) => React.JSX.Element;
