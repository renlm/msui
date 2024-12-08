/** @beta */
export interface ThemeShape {
    /**
     * @deprecated Use `theme.shape.radius.default`, `theme.shape.radius.pill` or `theme.shape.radius.circle` instead
     */
    borderRadius: (amount?: number) => string;
    radius: Radii;
}
interface Radii {
    default: string;
    pill: string;
    circle: string;
}
/** @internal */
export interface ThemeShapeInput {
    borderRadius?: number;
}
export declare function createShape(options: ThemeShapeInput): ThemeShape;
export {};
