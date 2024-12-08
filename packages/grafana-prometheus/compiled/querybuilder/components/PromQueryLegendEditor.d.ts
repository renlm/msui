import React from 'react';
export interface PromQueryLegendEditorProps {
    legendFormat: string | undefined;
    onChange: (legendFormat: string) => void;
    onRunQuery: () => void;
}
/**
 * Tests for this component are on the parent level (PromQueryBuilderOptions).
 */
export declare const PromQueryLegendEditor: React.NamedExoticComponent<PromQueryLegendEditorProps>;
export declare function getLegendModeLabel(legendFormat: string | undefined): string | undefined;
