/// <reference types="react" />
export type SliderMarks = Record<number, React.ReactNode | {
    style?: React.CSSProperties;
    label?: string;
}>;
