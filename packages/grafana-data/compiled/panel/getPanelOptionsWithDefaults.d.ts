import { ConfigOverrideRule, DynamicConfigValue, FieldConfigSource } from '../types/fieldOverrides';
import { PanelPlugin } from './PanelPlugin';
interface Props {
    plugin: PanelPlugin;
    currentFieldConfig: FieldConfigSource;
    currentOptions: Record<string, unknown>;
    isAfterPluginChange: boolean;
}
export interface OptionDefaults {
    options: Record<string, unknown>;
    fieldConfig: FieldConfigSource;
}
/**
 * This will return the panel options with defaults applied.
 * Used internally, not intended for external use.
 * @internal
 */
export declare function getPanelOptionsWithDefaults({ plugin, currentOptions, currentFieldConfig, isAfterPluginChange, }: Props): OptionDefaults;
/**
 * Used internally, not intended for external use.
 * @internal
 */
export declare function filterFieldConfigOverrides(overrides: ConfigOverrideRule[], condition: (value: DynamicConfigValue) => boolean): ConfigOverrideRule[];
/**
 * Used internally, not intended for external use.
 * @internal
 */
export declare function restoreCustomOverrideRules(current: FieldConfigSource, old: FieldConfigSource): FieldConfigSource;
/**
 * Used internally, not intended for external use.
 * @internal
 */
export declare function isCustomFieldProp(prop: DynamicConfigValue): boolean;
/**
 * Used internally, not intended for external use.
 * @internal
 */
export declare function isStandardFieldProp(prop: DynamicConfigValue): boolean;
export {};
