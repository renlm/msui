import { Unsubscribable, Observable } from 'rxjs';
import { EventBus, LegacyEmitter, BusEventHandler, BusEventType, LegacyEventHandler, BusEvent, AppEvent, EventFilterOptions } from './types';
/**
 * @alpha
 */
export declare class EventBusSrv implements EventBus, LegacyEmitter {
    private emitter;
    private subscribers;
    constructor();
    publish<T extends BusEvent>(event: T): void;
    subscribe<T extends BusEvent>(typeFilter: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
    getStream<T extends BusEvent = BusEvent>(eventType: BusEventType<T>): Observable<T>;
    newScopedBus(key: string, filter?: EventFilterOptions): ScopedEventBus;
    /**
     * Legacy functions
     */
    emit<T>(event: AppEvent<T> | string, payload?: T | any): void;
    on<T>(event: AppEvent<T> | string, handler: LegacyEventHandler<T>, scope?: any): void;
    off<T>(event: AppEvent<T> | string, handler: LegacyEventHandler<T>): void;
    removeAllListeners(): void;
}
/**
 * Wraps EventBus and adds a source to help with identifying if a subscriber should react to the event or not.
 */
declare class ScopedEventBus implements EventBus {
    path: string[];
    private eventBus;
    filterConfig: EventFilterOptions;
    constructor(path: string[], eventBus: EventBus, filter?: EventFilterOptions);
    publish<T extends BusEvent>(event: T): void;
    filter<T extends BusEvent>(event: T): boolean;
    getStream<T extends BusEvent>(eventType: BusEventType<T>): Observable<T>;
    subscribe<T extends BusEvent>(typeFilter: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
    removeAllListeners(): void;
    /**
     * Creates a nested event bus structure
     */
    newScopedBus(key: string, filter: EventFilterOptions): EventBus;
}
export {};
