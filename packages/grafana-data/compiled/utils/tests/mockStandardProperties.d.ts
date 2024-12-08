import { ThresholdsMode } from '../../types';
export declare const mockStandardProperties: () => ({
    id: string;
    path: string;
    name: string;
    description: string;
    editor: () => null;
    override: () => null;
    process: <T>(value: T) => T;
    settings: {
        placeholder: string;
    };
    shouldApply: () => boolean;
} | {
    id: string;
    path: string;
    name: string;
    description: string;
    editor: () => null;
    override: () => null;
    process: (value: unknown, context: import("../../types").FieldOverrideContext, settings?: import("../../field").StringFieldConfigSettings | undefined) => string | null | undefined;
    settings: {
        placeholder: string;
        expandTemplateVars: boolean;
    };
    shouldApply: () => boolean;
} | {
    id: string;
    path: string;
    name: string;
    description: string;
    editor: () => null;
    override: () => null;
    process: <T>(value: T) => T;
    settings: {};
    defaultValue: {
        mode: ThresholdsMode;
        steps: {
            value: number;
            color: string;
        }[];
    };
    shouldApply: () => boolean;
} | {
    id: string;
    path: string;
    name: string;
    description: string;
    editor: () => null;
    override: () => null;
    process: <T>(value: T) => T;
    settings: {};
    defaultValue: never[];
    shouldApply: () => boolean;
})[];
