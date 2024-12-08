/// <reference types="react" />
import { SelectFieldConfigSettings, StandardEditorProps, StringFieldConfigSettings, NumberFieldConfigSettings, SliderFieldConfigSettings, UnitFieldConfigSettings, FieldNamePickerConfigSettings, StandardEditorContext } from '../field';
import { PanelOptionsSupplier } from '../panel/PanelPlugin';
import { OptionsEditorItem, OptionsUIRegistryBuilder } from '../types/OptionsUIRegistryBuilder';
import { FieldConfigPropertyItem, FieldConfigEditorConfig } from '../types/fieldOverrides';
import { PanelOptionsEditorConfig, PanelOptionsEditorItem } from '../types/panel';
/**
 * Fluent API for declarative creation of field config option editors
 */
export declare class FieldConfigEditorBuilder<TOptions> extends OptionsUIRegistryBuilder<TOptions, StandardEditorProps<any, any>, FieldConfigPropertyItem<TOptions>> {
    addNumberInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & NumberFieldConfigSettings, number>): this;
    addSliderInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & SliderFieldConfigSettings, number>): this;
    addTextInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string>): this;
    addSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: FieldConfigEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio<TOption, TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, boolean>): this;
    addColorPicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, string>): this;
    addUnitPicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & UnitFieldConfigSettings, string>): this;
    addFieldNamePicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
    addGenericEditor<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & any>, // & any... i give up!
    editor: (props: StandardEditorProps<TSettings>) => JSX.Element): this;
}
export interface NestedValueAccess {
    getValue: (path: string) => any;
    onChange: (path: string, value: any) => void;
    getContext?: (parent: StandardEditorContext<any, any>) => StandardEditorContext<any, any>;
}
export interface NestedPanelOptions<TSub = any> {
    path: string;
    category?: string[];
    defaultValue?: TSub;
    build: PanelOptionsSupplier<TSub>;
    values?: (parent: NestedValueAccess) => NestedValueAccess;
}
export declare class NestedPanelOptionsBuilder<TSub = any> implements OptionsEditorItem<TSub, any, any, any> {
    cfg: NestedPanelOptions<TSub>;
    path: string;
    category?: string[];
    defaultValue?: TSub;
    id: string;
    name: string;
    editor: () => null;
    constructor(cfg: NestedPanelOptions<TSub>);
    private getDefaultValue;
    getBuilder: () => PanelOptionsSupplier<TSub>;
    getNestedValueAccess: (parent: NestedValueAccess) => NestedValueAccess;
}
export declare function isNestedPanelOptions(item: unknown): item is NestedPanelOptionsBuilder;
/**
 * Fluent API for declarative creation of panel options
 */
export declare class PanelOptionsEditorBuilder<TOptions> extends OptionsUIRegistryBuilder<TOptions, StandardEditorProps, PanelOptionsEditorItem<TOptions>> {
    addNestedOptions<Sub>(opts: NestedPanelOptions<Sub>): this;
    addNumberInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & NumberFieldConfigSettings, number>): this;
    addSliderInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & SliderFieldConfigSettings, number>): this;
    addTextInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string>): this;
    addStringArray<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string[]>): this;
    addSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addMultiSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, boolean>): this;
    addColorPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, string>): this;
    addTimeZonePicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, string>): this;
    addUnitPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & UnitFieldConfigSettings, string>): this;
    addFieldNamePicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
    addDashboardPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
}
