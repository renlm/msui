import React, { AnchorHTMLAttributes } from 'react';
import { GrafanaTheme2, ThemeTypographyVariantTypes } from '@grafana/data';
import { IconName } from '../../types';
type TextLinkVariants = keyof Omit<ThemeTypographyVariantTypes, 'code'>;
interface TextLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
    /** url to which redirect the user, external or internal */
    href: string;
    /** Color to use for text */
    color?: keyof GrafanaTheme2['colors']['text'];
    /** Specify if the link will redirect users to a page in or out Grafana */
    external?: boolean;
    /** True when the link will be displayed inline with surrounding text, false if it will be displayed as a block. Depending on this prop correspondant default styles will be applied */
    inline?: boolean;
    /** The default variant is 'body'. To fit another styles set the correspondent variant as it is necessary also to adjust the icon size. `code` is excluded, as it is not fit for links. */
    variant?: TextLinkVariants;
    /** Override the default weight for the used variant */
    weight?: 'light' | 'regular' | 'medium' | 'bold';
    /** Set the icon to be shown. An external link will show the 'external-link-alt' icon as default.*/
    icon?: IconName;
    children: string;
}
export declare const TextLink: React.ForwardRefExoticComponent<TextLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const getLinkStyles: (theme: GrafanaTheme2, inline: boolean, variant?: keyof ThemeTypographyVariantTypes, weight?: TextLinkProps['weight'], color?: TextLinkProps['color']) => string;
export {};
