import React from 'react';
interface MarkerProps {
    /** x position relative to plotting area bounding box*/
    x: number;
    /** y position relative to plotting area bounding box*/
    y: number;
}
export declare const Marker: ({ x, y, children }: React.PropsWithChildren<MarkerProps>) => React.JSX.Element;
export {};
