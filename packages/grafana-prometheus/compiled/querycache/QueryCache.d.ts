import { DataFrame, DataQueryRequest, Field } from '@grafana/data';
import { PromQuery } from '../types';
type TargetIdent = string;
type TargetSig = string;
type TimestampMs = number;
type SupportedQueryTypes = PromQuery;
export declare const defaultPrometheusQueryOverlapWindow = "10m";
interface TargetCache {
    sig: TargetSig;
    prevTo: TimestampMs;
    frames: DataFrame[];
}
export interface CacheRequestInfo<T extends SupportedQueryTypes> {
    requests: Array<DataQueryRequest<T>>;
    targSigs: Map<TargetIdent, TargetSig>;
    shouldCache: boolean;
}
export interface DatasourceProfileData {
    interval?: string;
    expr: string;
    datasource: string;
}
interface ProfileData extends DatasourceProfileData {
    identity: string;
    bytes: number | null;
    dashboardUID: string;
    panelId?: number;
    from: string;
    queryRangeSeconds: number;
    refreshIntervalMs: number;
}
/**
 * Get field identity
 * This is the string used to uniquely identify a field within a "target"
 * @param field
 */
export declare const getFieldIdent: (field: Field) => string;
/**
 * NOMENCLATURE
 * Target: The request target (DataQueryRequest), i.e. a specific query reference within a panel
 * Ident: Identity: the string that is not expected to change
 * Sig: Signature: the string that is expected to change, upon which we wipe the cache fields
 */
export declare class QueryCache<T extends SupportedQueryTypes> {
    private overlapWindowMs;
    private getTargetSignature;
    private getProfileData?;
    private perfObeserver?;
    private shouldProfile;
    sendEventsInterval: number;
    pendingRequestIdsToTargSigs: Map<string, ProfileData>;
    pendingAccumulatedEvents: Map<string, {
        requestCount: number;
        savedBytesTotal: number;
        initialRequestSize: number;
        lastRequestSize: number;
        panelId: string;
        dashId: string;
        expr: string;
        refreshIntervalMs: number;
        sent: boolean;
        datasource: string;
        from: string;
        queryRangeSeconds: number;
    }>;
    cache: Map<string, TargetCache>;
    constructor(options: {
        getTargetSignature: (request: DataQueryRequest<T>, target: T) => string;
        overlapString: string;
        profileFunction?: (request: DataQueryRequest<T>, target: T) => DatasourceProfileData;
    });
    private profile;
    sendPendingTrackingEvents: () => void;
    requestInfo(request: DataQueryRequest<T>): CacheRequestInfo<T>;
    procFrames(request: DataQueryRequest<T>, requestInfo: CacheRequestInfo<T> | undefined, respFrames: DataFrame[]): DataFrame[];
}
export {};
