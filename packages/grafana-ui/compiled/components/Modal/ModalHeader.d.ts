import React from 'react';
import { IconName } from '../../types';
interface Props {
    title: string;
    id?: string;
    /** @deprecated */
    icon?: IconName;
    /** @deprecated */
    iconTooltip?: string;
}
/** @internal */
export declare const ModalHeader: ({ icon, iconTooltip, title, children, id }: React.PropsWithChildren<Props>) => React.JSX.Element;
export {};
