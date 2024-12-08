/// <reference types="jest" />
import { Observable } from 'rxjs';
/**
 * Collect all the values emitted by the observables (also errors) and pass them to the expectations functions after
 * the observable ended (or emitted error). If Observable does not complete within OBSERVABLE_TEST_TIMEOUT_IN_MS the
 * test fails.
 */
export declare function toEmitValuesWith(received: Observable<any>, expectations: (actual: any[]) => void): Promise<jest.CustomMatcherResult>;
