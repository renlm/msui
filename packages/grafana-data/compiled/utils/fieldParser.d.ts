import { Field } from '../types/dataFrame';
export declare function makeFieldParser(value: unknown, field: Field): ((value: string) => number) | ((value: string) => boolean) | ((value: string) => string);
