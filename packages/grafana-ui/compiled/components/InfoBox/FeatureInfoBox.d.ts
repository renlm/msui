import React from 'react';
import { FeatureState } from '@grafana/data';
import { InfoBoxProps } from './InfoBox';
export interface FeatureInfoBoxProps extends Omit<InfoBoxProps, 'title' | 'urlTitle'> {
    title: string;
    featureState?: FeatureState;
}
/** @deprecated use Alert with severity info */
export declare const FeatureInfoBox: React.MemoExoticComponent<React.ForwardRefExoticComponent<FeatureInfoBoxProps & React.RefAttributes<HTMLDivElement>>>;
