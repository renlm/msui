import { RegistryItem } from '../utils/Registry';
import { GrafanaTheme2 } from './types';
export interface ThemeRegistryItem extends RegistryItem {
    isExtra?: boolean;
    build: () => GrafanaTheme2;
}
/**
 * @internal
 * Only for internal use, never use this from a plugin
 **/
export declare function getThemeById(id: string): GrafanaTheme2;
/**
 * @internal
 * For internal use only
 */
export declare function getBuiltInThemes(includeExtras?: boolean): ThemeRegistryItem[];
