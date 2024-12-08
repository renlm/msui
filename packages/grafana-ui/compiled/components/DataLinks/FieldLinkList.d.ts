import React from 'react';
import { Field, LinkModel } from '@grafana/data';
type Props = {
    links: Array<LinkModel<Field>>;
};
/**
 * @internal
 */
export declare function FieldLinkList({ links }: Props): React.JSX.Element;
export {};
