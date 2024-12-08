import React from 'react';
import { GrafanaTheme2, ThemeRichColor } from '@grafana/data';
export declare const ThemeDemo: () => React.JSX.Element;
interface RichColorDemoProps {
    theme: GrafanaTheme2;
    color: ThemeRichColor;
}
export declare function RichColorDemo({ theme, color }: RichColorDemoProps): React.JSX.Element;
export declare function TextColors({ t }: {
    t: GrafanaTheme2;
}): React.JSX.Element;
export declare function ShadowDemo({ name, shadow }: {
    name: string;
    shadow: string;
}): React.JSX.Element;
export declare function ActionsDemo(): React.JSX.Element;
export {};
