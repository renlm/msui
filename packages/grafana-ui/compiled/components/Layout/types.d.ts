import { ResponsiveProp } from './utils/responsiveness';
export type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';
export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexGrow = number;
type FlexShrink = number;
type FlexBasis = 'auto' | 'initial' | '0' | `${number}%` | `${number}px`;
type Flex = FlexGrow | `${FlexGrow}` | `${FlexGrow} ${FlexShrink}` | `${FlexGrow} ${FlexShrink} ${FlexBasis}`;
export type FlexProps = {
    /** Sets the property `flex-grow` */
    grow?: ResponsiveProp<FlexGrow>;
    /** Sets the property `flex-shrink` */
    shrink?: ResponsiveProp<FlexShrink>;
    /** Sets the property `flex-basis` */
    basis?: ResponsiveProp<FlexBasis>;
    /** Sets the property `flex` */
    flex?: ResponsiveProp<Flex>;
};
export {};
