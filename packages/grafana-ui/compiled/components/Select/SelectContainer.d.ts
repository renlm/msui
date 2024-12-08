import React from 'react';
import { ContainerProps as BaseContainerProps, GroupBase } from 'react-select';
import { CustomComponentProps } from './types';
export type SelectContainerProps<Option, isMulti extends boolean, Group extends GroupBase<Option>> = BaseContainerProps<Option, isMulti, Group> & CustomComponentProps<Option, isMulti, Group>;
export declare const SelectContainer: <Option, isMulti extends boolean, Group extends GroupBase<Option>>(props: SelectContainerProps<Option, isMulti, Group>) => React.JSX.Element;
