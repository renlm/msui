import { Property } from 'csstype';
import React from 'react';
import { ThemeVizHue } from '@grafana/data';
interface NamedColorsGroupProps {
    hue: ThemeVizHue;
    selectedColor?: Property.Color;
    onColorSelect: (colorName: string) => void;
    key?: string;
}
declare const NamedColorsGroup: ({ hue, selectedColor, onColorSelect, ...otherProps }: NamedColorsGroupProps) => React.JSX.Element;
export default NamedColorsGroup;
