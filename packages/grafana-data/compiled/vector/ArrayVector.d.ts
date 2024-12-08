/**
 * @public
 *
 * @deprecated use a simple Array<T>
 */
export declare class ArrayVector<T = unknown> extends Array<T> {
    get buffer(): T[];
    set buffer(values: T[]);
    /**
     * ArrayVector is deprecated and should not be used. If you get a Typescript error here, use plain arrays for field.values.
     */
    constructor(buffer: never);
    toJSON(): T[];
}
