import React, { ReactNode } from 'react';
import { Accept, DropzoneOptions } from 'react-dropzone';
type BackwardsCompatibleDropzoneOptions = Omit<DropzoneOptions, 'accept'> & {
    accept?: string | string[] | Accept;
};
export interface FileDropzoneProps {
    /**
     * Use the children property to have custom dropzone view.
     */
    children?: ReactNode;
    /**
     * Use this property to override the default behaviour for the react-dropzone options.
     * @default {
     *  maxSize: Infinity,
     *  minSize: 0,
     *  multiple: true,
     *  useFsAccessApi: false,
     *  maxFiles: 0,
     * }
     */
    options?: BackwardsCompatibleDropzoneOptions;
    /**
     * Use this to change the FileReader's read.
     */
    readAs?: 'readAsArrayBuffer' | 'readAsText' | 'readAsBinaryString' | 'readAsDataURL';
    /**
     * Use the onLoad function to get the result from FileReader.
     */
    onLoad?: (result: string | ArrayBuffer | null) => void;
    /**
     * The fileListRenderer property can be used to overwrite the list of files. To not to show
     * any list return null in the function.
     */
    fileListRenderer?: (file: DropzoneFile, removeFile: (file: DropzoneFile) => void) => ReactNode;
    onFileRemove?: (file: DropzoneFile) => void;
}
export interface DropzoneFile {
    file: File;
    id: string;
    error: DOMException | null;
    progress?: number;
    abortUpload?: () => void;
    retryUpload?: () => void;
}
export declare function FileDropzone({ options, children, readAs, onLoad, fileListRenderer, onFileRemove }: FileDropzoneProps): React.JSX.Element;
export declare function getMimeTypeByExtension(ext: string): "text/plain" | "application/octet-stream";
export declare function transformAcceptToNewFormat(accept?: string | string[] | Accept): Accept | undefined;
export declare function FileDropzoneDefaultChildren({ primaryText, secondaryText }: {
    primaryText?: string | undefined;
    secondaryText?: string | undefined;
}): React.JSX.Element;
export {};
