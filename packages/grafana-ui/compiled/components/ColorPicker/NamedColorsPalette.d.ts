import React from 'react';
export interface NamedColorsPaletteProps {
    color?: string;
    onChange: (colorName: string) => void;
}
export declare const NamedColorsPalette: ({ color, onChange }: NamedColorsPaletteProps) => React.JSX.Element;
