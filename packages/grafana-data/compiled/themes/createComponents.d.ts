import { ThemeColors } from './createColors';
import { ThemeShadows } from './createShadows';
/** @beta */
export interface ThemeComponents {
    /** Applies to normal buttons, inputs, radio buttons, etc */
    height: {
        sm: number;
        md: number;
        lg: number;
    };
    input: {
        background: string;
        borderColor: string;
        borderHover: string;
        text: string;
    };
    tooltip: {
        text: string;
        background: string;
    };
    panel: {
        padding: number;
        headerHeight: number;
        borderColor: string;
        boxShadow: string;
        background: string;
    };
    dropdown: {
        background: string;
    };
    overlay: {
        background: string;
    };
    dashboard: {
        background: string;
        padding: number;
    };
    textHighlight: {
        background: string;
        text: string;
    };
    sidemenu: {
        width: number;
    };
    menuTabs: {
        height: number;
    };
    horizontalDrawer: {
        defaultHeight: number;
    };
    table: {
        rowHoverBackground: string;
    };
}
export declare function createComponents(colors: ThemeColors, shadows: ThemeShadows): ThemeComponents;
