import React, { AriaRole, ReactNode } from 'react';
interface Props {
    /**
     * Provide a button to render below the message
     */
    button?: ReactNode;
    hideImage?: boolean;
    /**
     * Override the default image for the variant
     */
    image?: ReactNode;
    /**
     * Message to display to the user
     */
    message: string;
    /**
     * Which variant to use. Affects the default image shown.
     */
    variant: 'call-to-action' | 'not-found' | 'completed';
    /**
     * Use to set `alert` when needed. See documentation for the use case
     */
    role?: AriaRole;
}
export declare const EmptyState: ({ button, children, image, message, hideImage, variant, role, }: React.PropsWithChildren<Props>) => React.JSX.Element;
export {};
