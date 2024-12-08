import React, { Component } from 'react';
export interface ModalsContextState {
    component: React.ComponentType<any> | null;
    props: any;
    showModal: <T>(component: React.ComponentType<T>, props: T) => void;
    hideModal: () => void;
}
export declare const ModalsContext: React.Context<ModalsContextState>;
interface ModalsProviderProps {
    children: React.ReactNode;
    /** Set default component to render as modal. Useful when rendering modals from Angular */
    component?: React.ComponentType<any> | null;
    /** Set default component props. Useful when rendering modals from Angular */
    props?: any;
}
/**
 * @deprecated.
 * Not the real implementation used by core.
 */
export declare class ModalsProvider extends Component<ModalsProviderProps, ModalsContextState> {
    constructor(props: ModalsProviderProps);
    showModal: <T>(component: React.ComponentType<T>, props: T) => void;
    hideModal: () => void;
    render(): React.JSX.Element;
}
export declare const ModalRoot: () => React.JSX.Element;
export declare const ModalsController: React.Consumer<ModalsContextState>;
export {};
