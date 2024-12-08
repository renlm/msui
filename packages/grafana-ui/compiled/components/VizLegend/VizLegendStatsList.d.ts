import React from 'react';
import { DisplayValue } from '@grafana/data';
interface Props {
    stats: DisplayValue[];
}
/**
 * @internal
 */
export declare const VizLegendStatsList: {
    ({ stats }: Props): React.JSX.Element | null;
    displayName: string;
};
export {};
