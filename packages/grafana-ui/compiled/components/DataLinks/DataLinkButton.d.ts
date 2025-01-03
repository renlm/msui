import React from 'react';
import { Field, LinkModel } from '@grafana/data';
import { ButtonProps } from '../Button';
type DataLinkButtonProps = {
    link: LinkModel<Field>;
    buttonProps?: ButtonProps;
};
/**
 * @internal
 */
export declare function DataLinkButton({ link, buttonProps }: DataLinkButtonProps): React.JSX.Element;
export {};
