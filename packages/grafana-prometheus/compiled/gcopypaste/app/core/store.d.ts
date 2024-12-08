type StoreValue = string | number | boolean | null;
export declare class Store {
    get(key: string): any;
    set(key: string, value: StoreValue): void;
    getBool(key: string, def: boolean): boolean;
    getObject<T = unknown>(key: string): T | undefined;
    getObject<T = unknown>(key: string, def: T): T;
    setObject(key: string, value: unknown): boolean;
    exists(key: string): boolean;
    delete(key: string): void;
}
declare const store: Store;
export default store;
