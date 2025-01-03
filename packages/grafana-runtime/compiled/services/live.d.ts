import { Observable } from 'rxjs';
import { DataFrameJSON, DataQueryRequest, DataQueryResponse, LiveChannelAddress, LiveChannelEvent, LiveChannelPresenceStatus, StreamingFrameOptions } from '@grafana/data';
/**
 * @alpha -- experimental
 */
export interface LiveDataFilter {
    fields?: string[];
}
export { StreamingFrameAction, type StreamingFrameOptions } from '@grafana/data';
/**
 * @alpha
 */
export interface LiveDataStreamOptions {
    addr: LiveChannelAddress;
    frame?: DataFrameJSON;
    key?: string;
    buffer?: Partial<StreamingFrameOptions>;
    filter?: LiveDataFilter;
}
/**
 * @alpha -- experimental: send a normal query request over websockt
 */
export interface LiveQueryDataOptions {
    request: DataQueryRequest;
    body: unknown;
}
/**
 * @alpha -- experimental
 */
export interface GrafanaLiveSrv {
    /**
     * Listen for changes to the main service
     */
    getConnectionState(): Observable<boolean>;
    /**
     * Watch for messages in a channel
     */
    getStream<T>(address: LiveChannelAddress): Observable<LiveChannelEvent<T>>;
    /**
     * Connect to a channel and return results as DataFrames
     */
    getDataStream(options: LiveDataStreamOptions): Observable<DataQueryResponse>;
    /**
     * Execute a query over the live websocket and potentiall subscribe to a live channel.
     *
     * Since the initial request and subscription are on the same socket, this will support HA setups
     *
     * @alpha -- this function requires the feature toggle `queryOverLive` to be set
     */
    getQueryData(options: LiveQueryDataOptions): Observable<DataQueryResponse>;
    /**
     * For channels that support presence, this will request the current state from the server.
     *
     * Join and leave messages will be sent to the open stream
     */
    getPresence(address: LiveChannelAddress): Promise<LiveChannelPresenceStatus>;
    /**
     * Publish into a channel
     *
     * @alpha -- experimental
     */
    publish(address: LiveChannelAddress, data: unknown): Promise<unknown>;
}
/**
 * Used during startup by Grafana to set the GrafanaLiveSrv so it is available
 * via the {@link getGrafanaLiveSrv} to the rest of the application.
 *
 * @internal
 */
export declare const setGrafanaLiveSrv: (instance: GrafanaLiveSrv) => void;
/**
 * Used to retrieve the GrafanaLiveSrv that allows you to subscribe to
 * server side events and streams
 *
 * @alpha -- experimental
 */
export declare const getGrafanaLiveSrv: () => GrafanaLiveSrv;
