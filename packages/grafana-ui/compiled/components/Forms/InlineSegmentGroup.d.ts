import React from 'react';
export interface Props {
    grow?: boolean;
    className?: string;
}
/** @beta */
export declare const InlineSegmentGroup: {
    ({ children, className, grow, ...htmlProps }: React.PropsWithChildren<Props>): React.JSX.Element;
    displayName: string;
};
