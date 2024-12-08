import * as H from 'history';
import { UrlQueryMap } from '@grafana/data';
import { LocationUpdate } from './LocationSrv';
/**
 * @public
 * A wrapper to help work with browser location and history
 */
export interface LocationService {
    partial: (query: Record<string, any>, replace?: boolean) => void;
    push: (location: H.Path | H.LocationDescriptor<any>) => void;
    replace: (location: H.Path | H.LocationDescriptor<any>) => void;
    reload: () => void;
    getLocation: () => H.Location;
    getHistory: () => H.History;
    getSearch: () => URLSearchParams;
    getSearchObject: () => UrlQueryMap;
    /**
     * This is from the old LocationSrv interface
     * @deprecated use partial, push or replace instead */
    update: (update: LocationUpdate) => void;
}
/** @internal */
export declare class HistoryWrapper implements LocationService {
    private readonly history;
    constructor(history?: H.History);
    getHistory(): H.History<unknown>;
    getSearch(): URLSearchParams;
    partial(query: Record<string, any>, replace?: boolean): void;
    push(location: H.Path | H.LocationDescriptor): void;
    replace(location: H.Path | H.LocationDescriptor): void;
    reload(): void;
    getLocation(): H.Location<unknown>;
    getSearchObject(): UrlQueryMap;
    /** @deprecated use partial, push or replace instead */
    update(options: LocationUpdate): void;
}
/**
 * @public
 * Parses a location search string to an object
 * */
export declare function locationSearchToObject(search: string | number): UrlQueryMap;
/**
 * @public
 */
export declare let locationService: LocationService;
/**
 * Used for tests only
 * @internal
 */
export declare const setLocationService: (location: LocationService) => void;
/** @internal */
export declare const navigationLogger: (...t: any[]) => void;
