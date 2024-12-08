import React from 'react';
import { IconName } from '../../types/icon';
import { ButtonVariant } from '../Button';
export interface ConfirmModalProps {
    /** Toggle modal's open/closed state */
    isOpen: boolean;
    /** Title for the modal header */
    title: string;
    /** Modal content */
    body: React.ReactNode;
    /** Modal description */
    description?: React.ReactNode;
    /** Text for confirm button */
    confirmText: string;
    /** Variant for confirm button */
    confirmVariant?: ButtonVariant;
    /** Text for dismiss button */
    dismissText?: string;
    /** Variant for dismiss button */
    dismissVariant?: ButtonVariant;
    /** Icon for the modal header */
    icon?: IconName;
    /** Additional styling for modal container */
    modalClass?: string;
    /** Text user needs to fill in before confirming */
    confirmationText?: string;
    /** Text for alternative button */
    alternativeText?: string;
    /** Confirm button variant */
    confirmButtonVariant?: ButtonVariant;
    /** Confirm action callback
     * Return a promise to disable the confirm button until the promise is resolved
     */
    onConfirm(): void | Promise<void>;
    /** Dismiss action callback */
    onDismiss(): void;
    /** Alternative action callback */
    onAlternative?(): void;
}
export declare const ConfirmModal: ({ isOpen, title, body, description, confirmText, confirmVariant, confirmationText, dismissText, dismissVariant, alternativeText, modalClass, icon, onConfirm, onDismiss, onAlternative, confirmButtonVariant, }: ConfirmModalProps) => JSX.Element;
