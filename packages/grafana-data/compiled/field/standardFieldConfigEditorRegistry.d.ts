import { ComponentType } from 'react';
import { EventBus } from '../events';
import { DataFrame, InterpolateFunction, VariableSuggestionsScope, VariableSuggestion } from '../types';
import { Registry, RegistryItem } from '../utils/Registry';
import { FieldConfigOptionsRegistry } from './FieldConfigOptionsRegistry';
export interface StandardEditorContext<TOptions, TState = any> {
    data: DataFrame[];
    replaceVariables?: InterpolateFunction;
    eventBus?: EventBus;
    getSuggestions?: (scope?: VariableSuggestionsScope) => VariableSuggestion[];
    options?: TOptions;
    instanceState?: TState;
    isOverride?: boolean;
}
export interface StandardEditorProps<TValue = any, TSettings = any, TOptions = any, TState = any> {
    value: TValue;
    onChange: (value?: TValue) => void;
    context: StandardEditorContext<TOptions, TState>;
    id?: string;
    item: RegistryItem & {
        settings?: TSettings;
    };
}
export interface StandardEditorsRegistryItem<TValue = any, TSettings = any> extends RegistryItem {
    editor: ComponentType<StandardEditorProps<TValue, TSettings>>;
    settings?: TSettings;
}
export declare const standardFieldConfigEditorRegistry: FieldConfigOptionsRegistry;
export declare const standardEditorsRegistry: Registry<StandardEditorsRegistryItem<any, any>>;
