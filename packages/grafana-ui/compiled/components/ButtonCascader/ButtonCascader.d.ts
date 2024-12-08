import { BaseOptionType } from 'rc-cascader';
import React from 'react';
import { IconName } from '../../types/icon';
import { ButtonProps } from '../Button';
import { CascaderOption } from '../Cascader/Cascader';
export interface ButtonCascaderProps {
    options: CascaderOption[];
    children?: string;
    icon?: IconName;
    disabled?: boolean;
    value?: string[];
    fieldNames?: {
        label: keyof BaseOptionType;
        value: keyof BaseOptionType;
        children: keyof BaseOptionType;
    };
    loadData?: (selectedOptions: CascaderOption[]) => void;
    onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
    onPopupVisibleChange?: (visible: boolean) => void;
    className?: string;
    variant?: ButtonProps['variant'];
    buttonProps?: ButtonProps;
    hideDownIcon?: boolean;
}
export declare const ButtonCascader: {
    (props: ButtonCascaderProps): React.JSX.Element;
    displayName: string;
};
