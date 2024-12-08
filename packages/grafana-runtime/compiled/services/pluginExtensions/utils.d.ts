import { type PluginExtension, type PluginExtensionComponent, type PluginExtensionLink } from '@grafana/data';
export declare function isPluginExtensionLink(extension: PluginExtension | undefined): extension is PluginExtensionLink;
export declare function isPluginExtensionComponent(extension: PluginExtension | undefined): extension is PluginExtensionComponent;
