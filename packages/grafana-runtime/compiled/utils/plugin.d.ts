/// <reference types="systemjs" />
import { PanelPlugin } from '@grafana/data';
/**
 * Option to specify a plugin css that should be applied for the dark
 * and the light theme.
 *
 * @public
 */
export interface PluginCssOptions {
    light: string;
    dark: string;
}
/**
 * Use this to load css for a Grafana plugin by specifying a {@link PluginCssOptions}
 * containing styling for the dark and the light theme.
 *
 * @param options - plugin styling for light and dark theme.
 * @public
 */
export declare function loadPluginCss(options: PluginCssOptions): Promise<System.Module | void>;
interface PluginImportUtils {
    importPanelPlugin: (id: string) => Promise<PanelPlugin>;
    getPanelPluginFromCache: (id: string) => PanelPlugin | undefined;
}
export declare function setPluginImportUtils(utils: PluginImportUtils): void;
export declare function getPluginImportUtils(): PluginImportUtils;
export {};
