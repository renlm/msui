import React from 'react';
export declare const skeletonAnimation: {
    animationName: string;
    animationDelay: string;
    animationTimingFunction: string;
    animationDuration: string;
    animationFillMode: string;
};
interface SkeletonProps {
    /**
     * Spread these props at the root of your skeleton to handle animation logic
     */
    rootProps: {
        style: React.CSSProperties;
    };
}
export type SkeletonComponent<P = {}> = React.ComponentType<P & SkeletonProps>;
/**
 * Use this to attach a skeleton as a static property on the component.
 * e.g. if you render a component with `<Component />`, you can render the skeleton with `<Component.Skeleton />`.
 * @param Component   A functional or class component
 * @param Skeleton    A functional or class skeleton component
 * @returns           A wrapped component with a static skeleton property
 */
export declare const attachSkeleton: <C extends object, P>(Component: C, Skeleton: SkeletonComponent<P>) => C & {
    Skeleton: (props: P) => React.JSX.Element;
};
export {};
