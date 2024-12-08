import React, { PropsWithChildren } from 'react';
interface Props {
    className?: string;
    root?: HTMLElement;
    forwardedRef?: React.ForwardedRef<HTMLDivElement>;
}
export declare function Portal(props: PropsWithChildren<Props>): React.ReactPortal;
/** @internal */
export declare function getPortalContainer(): HTMLElement;
/** @internal */
export declare function PortalContainer(): React.JSX.Element;
export declare const RefForwardingPortal: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export {};
