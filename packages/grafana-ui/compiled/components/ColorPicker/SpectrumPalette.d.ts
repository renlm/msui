import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface SpectrumPaletteProps {
    color: string;
    onChange: (color: string) => void;
}
declare const SpectrumPalette: ({ color, onChange }: SpectrumPaletteProps) => React.JSX.Element;
export declare const getStyles: (theme: GrafanaTheme2) => {
    wrapper: string;
    root: string;
    colorInput: string;
};
export default SpectrumPalette;
