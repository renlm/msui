import { ComponentType } from 'react';
import { NumberFieldConfigSettings, SliderFieldConfigSettings, SelectFieldConfigSettings, StringFieldConfigSettings } from '../field';
import { RegistryItem, Registry } from '../utils/Registry';
import { OptionEditorConfig } from './options';
/**
 * Option editor registry item
 */
export interface OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue> extends RegistryItem, OptionEditorConfig<TOptions, TSettings, TValue> {
    /**
     * React component used to edit the options property
     */
    editor: ComponentType<TEditorProps>;
    getItemsCount?: (value?: TValue) => number;
}
/**
 * Describes an API for option editors UI builder
 */
interface OptionsUIRegistryBuilderAPI<TOptions, TEditorProps, T extends OptionsEditorItem<TOptions, any, TEditorProps, any>> {
    addNumberInput?<TSettings extends NumberFieldConfigSettings = NumberFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, number>): this;
    addSliderInput?<TSettings extends SliderFieldConfigSettings = SliderFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, number>): this;
    addTextInput?<TSettings extends StringFieldConfigSettings = StringFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    addStringArray?<TSettings extends StringFieldConfigSettings = StringFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, string[]>): this;
    addSelect?<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: OptionEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio?<TOption, TSettings extends SelectFieldConfigSettings<TOption> = SelectFieldConfigSettings<TOption>>(config: OptionEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, boolean>): this;
    addUnitPicker?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    addColorPicker?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    /**
     * Enables custom editor definition
     * @param config
     */
    addCustomEditor<TSettings, TValue>(config: OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue>): this;
    /**
     * Returns registry of option editors
     */
    getRegistry: () => Registry<T>;
}
export declare abstract class OptionsUIRegistryBuilder<TOptions, TEditorProps, T extends OptionsEditorItem<TOptions, any, TEditorProps, any>> implements OptionsUIRegistryBuilderAPI<TOptions, TEditorProps, T> {
    private properties;
    addCustomEditor<TSettings, TValue>(config: T & OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue>): this;
    getRegistry(): Registry<T>;
    getItems(): T[];
}
export {};
