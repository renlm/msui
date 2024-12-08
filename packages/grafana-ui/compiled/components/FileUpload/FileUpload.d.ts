import React, { FormEvent } from 'react';
import { ComponentSize } from '../../types/size';
export interface Props {
    /** Callback function to handle uploaded file  */
    onFileUpload: (event: FormEvent<HTMLInputElement>) => void;
    /** Accepted file extensions */
    accept?: string;
    /** Overwrite or add to style */
    className?: string;
    /** Button size */
    size?: ComponentSize;
    /** Show the file name */
    showFileName?: boolean;
}
export declare const FileUpload: ({ onFileUpload, className, children, accept, size, showFileName, }: React.PropsWithChildren<Props>) => React.JSX.Element;
