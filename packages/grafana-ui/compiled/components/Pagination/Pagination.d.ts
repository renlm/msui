import React from 'react';
export interface Props {
    /** The current page index being shown. */
    currentPage: number;
    /** Number of total pages. */
    numberOfPages: number;
    /** Callback function for fetching the selected page.  */
    onNavigate: (toPage: number) => void;
    /** When set to true and the pagination result is only one page it will not render the pagination at all. */
    hideWhenSinglePage?: boolean;
    /** Small version only shows the current page and the navigation buttons. */
    showSmallVersion?: boolean;
    className?: string;
}
export declare const Pagination: ({ currentPage, numberOfPages, onNavigate, hideWhenSinglePage, showSmallVersion, className, }: Props) => React.JSX.Element | null;
