import { Observable } from 'rxjs';
import { DataQueryRequest, DataSourceApi, PanelData, QueryRunner } from '@grafana/data';
/**
 * @internal
 */
export type QueryRunnerFactory = () => QueryRunner;
/**
 * Used to bootstrap the {@link createQueryRunner} during application start.
 *
 * @internal
 */
export declare const setQueryRunnerFactory: (instance: QueryRunnerFactory) => void;
/**
 * Used to create QueryRunner instances from outside the core Grafana application.
 * This is helpful to be able to create a QueryRunner to execute queries in e.g. an app plugin.
 *
 * @internal
 */
export declare const createQueryRunner: () => QueryRunner;
type RunRequestFn = (datasource: DataSourceApi, request: DataQueryRequest, queryFunction?: typeof datasource.query) => Observable<PanelData>;
/**
 * Used to exspose runRequest implementation to libraries, i.e. @grafana/scenes
 *
 * @internal
 */
export declare function setRunRequest(fn: RunRequestFn): void;
export declare function getRunRequest(): RunRequestFn;
export {};
