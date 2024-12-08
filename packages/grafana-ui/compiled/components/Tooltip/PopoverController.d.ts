import { Placement } from '@popperjs/core';
import { Component } from 'react';
import { PopoverContent } from './types';
type PopperControllerRenderProp = (showPopper: () => void, hidePopper: () => void, popperProps: {
    show: boolean;
    placement: Placement;
    content: PopoverContent;
}) => JSX.Element;
interface Props {
    placement?: Placement;
    content: PopoverContent;
    className?: string;
    children: PopperControllerRenderProp;
    hideAfter?: number;
}
interface State {
    show: boolean;
}
declare class PopoverController extends Component<Props, State> {
    private hideTimeout;
    state: {
        show: boolean;
    };
    showPopper: () => void;
    hidePopper: () => void;
    render(): JSX.Element;
}
export { PopoverController };
