/**
 * @public
 * @deprecated use a simple Arrays
 */
export declare abstract class FunctionalVector<T = unknown> {
    abstract get length(): number;
    abstract get(index: number): T;
    iterator(): Generator<T, void, unknown>;
    set(index: number, value: T): void;
    add(value: T): void;
    push(...vals: T[]): number;
    [Symbol.iterator](): Generator<T, void, unknown>;
    forEach(iterator: (row: T, index: number, array: T[]) => void): void;
    map<V>(transform: (item: T, index: number, array: T[]) => V): V[];
    filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
    at(index: number): T | undefined;
    toArray(): T[];
    join(separator?: string | undefined): string;
    toJSON(): any;
    [n: number]: T;
    pop(): T | undefined;
    concat(...items: Array<ConcatArray<T>>): T[];
    reverse(): T[];
    shift(): T | undefined;
    sort(compareFn?: ((a: T, b: T) => number) | undefined): this;
    splice(start: number, deleteCount?: number | undefined): T[];
    unshift(...items: T[]): number;
    fill(value: T, start?: number | undefined, end?: number | undefined): this;
    copyWithin(target: number, start: number, end?: number | undefined): this;
    [Symbol.unscopables]: {};
    slice(start?: number | undefined, end?: number | undefined): T[];
    indexOf(searchElement: T, fromIndex?: number | undefined): number;
    lastIndexOf(searchElement: T, fromIndex?: number | undefined): number;
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    includes(searchElement: T, fromIndex?: number | undefined): boolean;
    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This | undefined): U[];
    flat<A, D extends number = 1>(this: A, depth?: D | undefined): Array<FlatArray<A, D>>;
}
/**
 * Use functional programming with your vector
 *
 * @deprecated use a simple Arrays
 */
export declare function vectorator<T>(vector: FunctionalVector<T>): {
    [Symbol.iterator](): Generator<T, void, unknown>;
    forEach(iterator: (row: T, index: number, array: T[]) => void): void;
    map<V>(transform: (item: T, index: number, array: T[]) => V): V[];
    /** Add a predicate where you return true if it should *keep* the value */
    filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
};
