import React from 'react';
import { ComponentSize } from '../../types/size';
export interface Props {
    /** Confirm action callback */
    onConfirm(): void;
    /** Button size */
    size?: ComponentSize;
    /** Disable button click action */
    disabled?: boolean;
    'aria-label'?: string;
    /** Close after delete button is clicked */
    closeOnConfirm?: boolean;
}
export declare const DeleteButton: ({ size, disabled, onConfirm, "aria-label": ariaLabel, closeOnConfirm }: Props) => React.JSX.Element;
