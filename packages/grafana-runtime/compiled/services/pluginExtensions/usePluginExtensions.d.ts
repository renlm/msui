/// <reference types="react" />
import { PluginExtensionComponent, PluginExtensionLink } from '@grafana/data';
import { GetPluginExtensionsOptions, UsePluginExtensions, UsePluginExtensionsResult } from './getPluginExtensions';
export declare function setPluginExtensionsHook(hook: UsePluginExtensions): void;
/**
 * @deprecated Use either usePluginLinks() or usePluginComponents() instead.
 */
export declare function usePluginExtensions(options: GetPluginExtensionsOptions): UsePluginExtensionsResult;
export declare function usePluginLinks(options: GetPluginExtensionsOptions): {
    links: PluginExtensionLink[];
    isLoading: boolean;
};
export declare function usePluginComponents<Props = {}>(options: GetPluginExtensionsOptions): {
    components: Array<React.ComponentType<Props>>;
    isLoading: boolean;
};
/**
 * @deprecated Use usePluginLinks() instead.
 */
export declare function usePluginLinkExtensions(options: GetPluginExtensionsOptions): UsePluginExtensionsResult<PluginExtensionLink>;
/**
 * @deprecated Use usePluginComponents() instead.
 */
export declare function usePluginComponentExtensions<Props = {}>(options: GetPluginExtensionsOptions): {
    extensions: Array<PluginExtensionComponent<Props>>;
    isLoading: boolean;
};
