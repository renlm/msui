import React from 'react';
interface Props {
    name: string;
    disabled?: boolean;
    onRemove: (tag: string) => void;
}
/**
 * @internal
 * Only used internally by TagsInput
 * */
export declare const TagItem: ({ name, disabled, onRemove }: Props) => React.JSX.Element;
export {};
