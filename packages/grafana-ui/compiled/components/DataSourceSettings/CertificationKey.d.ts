import React, { ChangeEvent, MouseEvent } from 'react';
interface Props {
    label: string;
    hasCert: boolean;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
export declare const CertificationKey: ({ hasCert, label, onChange, onClick, placeholder }: Props) => React.JSX.Element;
export {};
