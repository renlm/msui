import React, { ReactElement } from 'react';
import { ComponentSize } from '../../types/size';
import { ButtonVariant } from '../Button';
export interface Props {
    /** Confirm action callback */
    onConfirm(): void;
    children: string | ReactElement;
    /** Custom button styles */
    className?: string;
    /** Button size */
    size?: ComponentSize;
    /** Text for the Confirm button */
    confirmText?: string;
    /** Disable button click action */
    disabled?: boolean;
    /** Variant of the Confirm button */
    confirmVariant?: ButtonVariant;
    /** Hide confirm actions when after of them is clicked */
    closeOnConfirm?: boolean;
    /** Optional on click handler for the original button */
    onClick?(): void;
    /** Callback for the cancel action */
    onCancel?(): void;
}
export declare const ConfirmButton: {
    ({ children, className, closeOnConfirm, confirmText, confirmVariant, disabled, onCancel, onClick, onConfirm, size, }: Props): React.JSX.Element;
    displayName: string;
};
