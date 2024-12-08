import React from 'react';
export declare function useCombinedRefs<T>(...refs: Array<React.MutableRefObject<T | null> | React.ForwardedRef<T | null> | ((instance: T | null) => void)>): React.MutableRefObject<T | null>;
