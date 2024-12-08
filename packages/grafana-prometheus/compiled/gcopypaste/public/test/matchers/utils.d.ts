/// <reference types="jest" />
import { Subscription } from 'rxjs';
export declare function forceObservableCompletion(subscription: Subscription, resolve: (args: any) => void): void;
export declare function expectObservableToBeDefined(received: unknown): jest.CustomMatcherResult | null;
export declare function expectObservableToBeObservable(received: unknown): jest.CustomMatcherResult | null;
export declare function expectObservable(received: unknown): jest.CustomMatcherResult | null;
