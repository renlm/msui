import React from 'react';
export declare const SelectOptionGroup: React.FunctionComponent<{
    label: React.ReactNode;
    options: import("react-select").Options<any>;
    data: {
        label: string;
        expanded: boolean;
        options: any[];
    };
    children: React.ReactNode;
    className?: string | undefined;
    cx: import("react-select").CX;
    setValue: (newValue: any, action: import("react-select").SetValueAction, option?: any) => void;
    isMulti: boolean;
    selectProps: import("react-select/dist/declarations/src/Select").Props<any, any, import("react-select").GroupBase<any>>;
    getClassNames: <Key extends keyof import("react-select/dist/declarations/src/styles").StylesProps<Option, IsMulti, Group>>(propertyName: Key, props: import("react-select/dist/declarations/src/styles").StylesProps<any, any, import("react-select").GroupBase<any>>[Key]) => string | undefined;
    getStyles: import("react-select").GetStyles<any, any, import("react-select").GroupBase<any>>;
    innerProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    clearValue: () => void;
    getValue: () => import("react-select").Options<any>;
    hasValue: boolean;
    isRtl: boolean;
    selectOption: (newValue: any) => void;
    Heading: React.ComponentType<import("react-select").GroupHeadingProps<any, any, import("react-select").GroupBase<any>>>;
    headingProps: import("react-select/dist/declarations/src/components/Group").ForwardedHeadingProps<any, import("react-select").GroupBase<any>>;
}>;
