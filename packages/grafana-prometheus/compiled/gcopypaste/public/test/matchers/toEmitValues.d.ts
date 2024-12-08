/// <reference types="jest" />
import { Observable } from 'rxjs';
export declare function toEmitValues(received: Observable<unknown>, expected: unknown[]): Promise<jest.CustomMatcherResult>;
