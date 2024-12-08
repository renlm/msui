import { QueryResultMeta } from '../types/data';
import { Field, DataFrame, DataFrameDTO, FieldDTO } from '../types/dataFrame';
import { FunctionalVector } from '../vector/FunctionalVector';
/** @deprecated */
export type MutableField<T = any> = Field<T>;
/** @deprecated */
type MutableVectorCreator = (buffer?: unknown[]) => unknown[];
export declare const MISSING_VALUE: undefined;
/**
 * MutableDataFrame is a complex wrapper around the DataFrame interface
 *
 * @deprecated use standard DataFrame, or create one with PartialDataFrame
 */
export declare class MutableDataFrame<T = any> extends FunctionalVector<T> implements DataFrame {
    name?: string;
    refId?: string;
    meta?: QueryResultMeta;
    fields: MutableField[];
    private first;
    private creator;
    constructor(source?: DataFrame | DataFrameDTO, creator?: MutableVectorCreator);
    get length(): number;
    addFieldFor(value: unknown, name?: string): Field;
    addField(f: Field | FieldDTO, startLength?: number): Field;
    validate(): void;
    private parsers;
    /**
     * @deprecated unclear if this is actually used
     */
    setParser(field: Field, parser: (v: string) => any): (v: string) => any;
    private parseValue;
    /**
     * This will add each value to the corresponding column
     */
    appendRow(row: unknown[]): void;
    /** support standard array push syntax */
    push(...vals: T[]): number;
    reverse(): this;
    /**
     * Add values from an object to corresponding fields. Similar to appendRow but does not create new fields.
     */
    add(value: T): void;
    set(index: number, value: T): void;
    /**
     * Get an object with a property for each field in the DataFrame
     */
    get(idx: number): T;
    /**
     * The simplified JSON values used in JSON.stringify()
     */
    toJSON(): DataFrameDTO;
}
export {};
