import React, { SVGProps } from 'react';
export interface Props {
    width?: SVGProps<SVGElement>['width'];
    height?: SVGProps<SVGElement>['height'];
}
export declare const GrotCTA: {
    ({ width, height }: Props): React.JSX.Element;
    displayName: string;
};