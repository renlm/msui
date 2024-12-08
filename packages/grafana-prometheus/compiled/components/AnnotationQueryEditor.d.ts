import React from 'react';
import { AnnotationQuery } from '@grafana/data';
import { PromQuery } from '../types';
import { PromQueryEditorProps } from './types';
type Props = PromQueryEditorProps & {
    annotation?: AnnotationQuery<PromQuery>;
    onAnnotationChange?: (annotation: AnnotationQuery<PromQuery>) => void;
};
export declare function AnnotationQueryEditor(props: Props): React.JSX.Element;
export {};
