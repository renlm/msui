import React from 'react';
import { Field, LinkModel } from '@grafana/data';
interface VizTooltipFooterProps {
    dataLinks: Array<LinkModel<Field>>;
    annotate?: () => void;
}
export declare const ADD_ANNOTATION_ID = "add-annotation-button";
export declare const VizTooltipFooter: ({ dataLinks, annotate }: VizTooltipFooterProps) => React.JSX.Element;
export {};
