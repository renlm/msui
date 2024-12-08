import React from 'react';
declare const HandleTooltip: (props: {
    value: number;
    children: React.ReactElement;
    visible: boolean;
    placement: 'top' | 'right';
    tipFormatter?: () => React.ReactNode;
}) => React.JSX.Element;
export default HandleTooltip;
