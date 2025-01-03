import { ComponentType } from 'react';
import { StandardEditorProps, FieldConfigOptionsRegistry, StandardEditorContext } from '../field';
import { GrafanaTheme2 } from '../themes';
import { MatcherConfig, FieldConfig, Field, DataFrame, TimeZone, ScopedVars, ValueLinkConfig, LinkModel, DataLink } from '../types';
import { OptionsEditorItem } from './OptionsUIRegistryBuilder';
import { OptionEditorConfig } from './options';
import { InterpolateFunction } from './panel';
export interface DynamicConfigValue {
    id: string;
    value?: any;
}
export interface ConfigOverrideRule {
    matcher: MatcherConfig;
    properties: DynamicConfigValue[];
}
/**
 * Describes config override rules created when interacting with Grafana.
 *
 * @internal
 */
export interface SystemConfigOverrideRule extends ConfigOverrideRule {
    __systemRef: string;
}
/**
 * Guard functionality to check if an override rule is of type {@link SystemConfigOverrideRule}.
 * It will only return true if the {@link SystemConfigOverrideRule} has the passed systemRef.
 *
 * @param ref system override reference
 * @internal
 */
export declare function isSystemOverrideWithRef<T extends SystemConfigOverrideRule>(ref: string): (override: ConfigOverrideRule) => override is T;
/**
 * Guard functionality to check if an override rule is of type {@link SystemConfigOverrideRule}.
 * It will return true if the {@link SystemConfigOverrideRule} has any systemRef set.
 *
 * @internal
 */
export declare const isSystemOverride: (override: ConfigOverrideRule) => override is SystemConfigOverrideRule;
export interface FieldConfigSource<TOptions = any> {
    defaults: FieldConfig<TOptions>;
    overrides: ConfigOverrideRule[];
}
export interface FieldOverrideContext extends StandardEditorContext<any> {
    field?: Field;
    dataFrameIndex?: number;
}
/** @deprecated Use StandardEditorProps instead */
export type FieldConfigEditorProps<TValue, TSettings extends {}> = StandardEditorProps<TValue, TSettings>;
/** @deprecated Use StandardEditorProps instead */
export type FieldOverrideEditorProps<TValue, TSettings extends {}> = StandardEditorProps<TValue, TSettings>;
export interface FieldConfigEditorConfig<TOptions, TSettings = any, TValue = any> extends OptionEditorConfig<TOptions, TSettings, TValue> {
    /**
     * Function that allows specifying whether or not this field config should apply to a given field.
     * @param field
     */
    shouldApply?: (field: Field) => boolean;
    /** Indicates that option shoukd not be available in the Field config tab */
    hideFromDefaults?: boolean;
    /** Indicates that option should not be available for the overrides */
    hideFromOverrides?: boolean;
}
export interface FieldConfigPropertyItem<TOptions = any, TValue = any, TSettings extends {} = any> extends OptionsEditorItem<TOptions, TSettings, StandardEditorProps<TValue, TSettings>, TValue> {
    override: ComponentType<StandardEditorProps<TValue, TSettings>>;
    /** true for plugin field config properties */
    isCustom?: boolean;
    /** Hides option from the Field config tab */
    hideFromDefaults?: boolean;
    /** Indicates that option should not be available for the overrides */
    hideFromOverrides?: boolean;
    /** Convert the override value to a well typed value */
    process: (value: any, context: FieldOverrideContext, settings?: TSettings) => TValue | undefined | null;
    /** Checks if field should be processed */
    shouldApply: (field: Field) => boolean;
}
export type DataLinkPostProcessorOptions = {
    frame: DataFrame;
    field: Field;
    dataLinkScopedVars: ScopedVars;
    replaceVariables: InterpolateFunction;
    timeZone?: TimeZone;
    config: ValueLinkConfig;
    link: DataLink;
    linkModel: LinkModel;
};
export type DataLinkPostProcessor = (options: DataLinkPostProcessorOptions) => LinkModel<Field> | undefined;
export interface ApplyFieldOverrideOptions {
    data?: DataFrame[];
    fieldConfig: FieldConfigSource;
    fieldConfigRegistry?: FieldConfigOptionsRegistry;
    replaceVariables: InterpolateFunction;
    theme: GrafanaTheme2;
    timeZone?: TimeZone;
    dataLinkPostProcessor?: DataLinkPostProcessor;
}
export declare enum FieldConfigProperty {
    Unit = "unit",
    Min = "min",
    Max = "max",
    Decimals = "decimals",
    DisplayName = "displayName",
    NoValue = "noValue",
    Thresholds = "thresholds",
    Mappings = "mappings",
    Links = "links",
    Color = "color",
    Filterable = "filterable"
}
