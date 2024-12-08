import React, { HTMLAttributes, PropsWithChildren } from 'react';
export interface RenderUserContentAsHTMLProps<T = HTMLSpanElement> extends Omit<HTMLAttributes<T>, 'dangerouslySetInnerHTML'> {
    component?: keyof React.ReactHTML;
    content: string;
}
export declare function RenderUserContentAsHTML<T>({ component, content, ...rest }: PropsWithChildren<RenderUserContentAsHTMLProps<T>>): JSX.Element;
