import { Field } from '../types/dataFrame';
type IndexComparer = (a: number, b: number) => number;
export declare const fieldIndexComparer: (field: Field, reverse?: boolean) => IndexComparer;
export {};
