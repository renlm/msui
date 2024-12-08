import React from 'react';
import { Props as IconButtonProps } from '../IconButton/IconButton';
interface MultiValueContainerProps {
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const MultiValueContainer: ({ innerProps, children }: React.PropsWithChildren<MultiValueContainerProps>) => React.JSX.Element;
export type MultiValueRemoveProps = {
    innerProps: IconButtonProps;
};
export declare const MultiValueRemove: ({ children, innerProps }: React.PropsWithChildren<MultiValueRemoveProps>) => React.JSX.Element;
export {};
