export interface CancelablePromise<T> {
    promise: Promise<T>;
    cancel: () => void;
}
export interface CancelablePromiseRejection {
    isCanceled: boolean;
}
export declare function isCancelablePromiseRejection(promise: unknown): promise is CancelablePromiseRejection;
export declare const makePromiseCancelable: <T>(promise: Promise<T>) => CancelablePromise<T>;
