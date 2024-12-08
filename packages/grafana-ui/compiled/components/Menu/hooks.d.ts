import { RefObject } from 'react';
/** @internal */
export interface UseMenuFocusProps {
    localRef: RefObject<HTMLDivElement>;
    isMenuOpen?: boolean;
    close?: () => void;
    onOpen?: (focusOnItem: (itemId: number) => void) => void;
    onClose?: () => void;
    onKeyDown?: React.KeyboardEventHandler;
}
/** @internal */
export type UseMenuFocusReturn = [(event: React.KeyboardEvent) => void];
/** @internal */
export declare const useMenuFocus: ({ localRef, isMenuOpen, close, onOpen, onClose, onKeyDown, }: UseMenuFocusProps) => UseMenuFocusReturn;
