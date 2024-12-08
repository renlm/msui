import { RefObject } from 'react';
import { TimeOption } from '@grafana/data';
/** @internal */
export interface UseListFocusProps {
    localRef: RefObject<HTMLUListElement>;
    options: TimeOption[];
}
/** @internal */
export type UseListFocusReturn = [(event: React.KeyboardEvent) => void];
/** @internal */
export declare const useListFocus: ({ localRef, options }: UseListFocusProps) => UseListFocusReturn;
