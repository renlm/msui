import { ComponentType } from 'react';
import { KeyValue } from './data';
import { NavModel } from './navModel';
import { PluginMeta, GrafanaPlugin } from './plugin';
import { type PluginExtensionLinkConfig, PluginExtensionComponentConfig, PluginExtensionConfig } from './pluginExtensions';
/**
 * @public
 * The app container that is loading another plugin (panel or query editor)
 * */
export declare enum CoreApp {
    CloudAlerting = "cloud-alerting",
    UnifiedAlerting = "unified-alerting",
    Dashboard = "dashboard",
    Explore = "explore",
    Correlations = "correlations",
    Unknown = "unknown",
    PanelEditor = "panel-editor",
    PanelViewer = "panel-viewer"
}
export interface AppRootProps<T extends KeyValue = KeyValue> {
    meta: AppPluginMeta<T>;
    /**
     * base URL segment for an app, /app/pluginId
     */
    basename: string;
    /**
     * Pass the nav model to the container... is there a better way?
     * @deprecated Use PluginPage component exported from @grafana/runtime instead
     */
    onNavChanged: (nav: NavModel) => void;
    /**
     * The URL query parameters
     * @deprecated Use react-router instead
     */
    query: KeyValue;
    /**
     * The URL path to this page
     * @deprecated Use react-router instead
     */
    path: string;
}
export interface AppPluginMeta<T extends KeyValue = KeyValue> extends PluginMeta<T> {
}
export declare class AppPlugin<T extends KeyValue = KeyValue> extends GrafanaPlugin<AppPluginMeta<T>> {
    private _extensionConfigs;
    root?: ComponentType<AppRootProps<T>>;
    /**
     * Called after the module has loaded, and before the app is used.
     * This function may be called multiple times on the same instance.
     * The first time, `this.meta` will be undefined
     */
    init(meta: AppPluginMeta<T>): void;
    /**
     * Set the component displayed under:
     *   /a/${plugin-id}/*
     *
     * If the NavModel is configured, the page will have a managed frame, otheriwse it has full control.
     */
    setRootPage(root: ComponentType<AppRootProps<T>>): this;
    setComponentsFromLegacyExports(pluginExports: any): void;
    get extensionConfigs(): PluginExtensionConfig[];
    addLink<Context extends object>(extensionConfig: {
        targets: string | string[];
    } & Omit<PluginExtensionLinkConfig<Context>, 'type' | 'extensionPointId'>): this;
    addComponent<Props = {}>(extensionConfig: {
        targets: string | string[];
    } & Omit<PluginExtensionComponentConfig<Props>, 'type' | 'extensionPointId'>): this;
    exposeComponent<Props = {}>(componentConfig: {
        id: string;
    } & Omit<PluginExtensionComponentConfig<Props>, 'type' | 'extensionPointId'>): this;
    /** @deprecated Use .addLink() instead */
    configureExtensionLink<Context extends object>(extension: Omit<PluginExtensionLinkConfig<Context>, 'type'>): this;
    /** @deprecated Use .addComponent() instead */
    configureExtensionComponent<Props = {}>(extension: Omit<PluginExtensionComponentConfig<Props>, 'type'>): this;
}
/**
 * Defines life cycle of a feature
 * @internal
 */
export declare enum FeatureState {
    /** @deprecated in favor of experimental */
    alpha = "alpha",
    /** @deprecated in favor of preview */
    beta = "beta",
    /** used to mark experimental features with high/unknown risk */
    experimental = "experimental",
    /** used to mark features that are in public preview with medium/hight risk */
    privatePreview = "private preview",
    /** used to mark features that are in public preview with low/medium risk, or as a shared badge for public and private previews */
    preview = "preview"
}
