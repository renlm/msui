/// <reference types="react" />
import type { PluginExtension, PluginExtensionLink, PluginExtensionComponent } from '@grafana/data';
export type GetPluginExtensions<T = PluginExtension> = (options: GetPluginExtensionsOptions) => GetPluginExtensionsResult<T>;
export type UsePluginExtensions<T = PluginExtension> = (options: GetPluginExtensionsOptions) => UsePluginExtensionsResult<T>;
export type GetPluginExtensionsOptions = {
    extensionPointId: string;
    context?: object | Record<string | symbol, unknown>;
    limitPerPlugin?: number;
};
export type GetPluginExtensionsResult<T = PluginExtension> = {
    extensions: T[];
};
export type UsePluginExtensionsResult<T = PluginExtension> = {
    extensions: T[];
    isLoading: boolean;
};
export type UsePluginComponentResult<Props = {}> = {
    component: React.ComponentType<Props> | undefined | null;
    isLoading: boolean;
};
export declare function setPluginExtensionGetter(instance: GetPluginExtensions): void;
export declare const getPluginExtensions: GetPluginExtensions;
export declare const getPluginLinkExtensions: GetPluginExtensions<PluginExtensionLink>;
export declare const getPluginComponentExtensions: <Props = {}>(options: {
    extensionPointId: string;
    limitPerPlugin?: number;
}) => {
    extensions: Array<PluginExtensionComponent<Props>>;
};
