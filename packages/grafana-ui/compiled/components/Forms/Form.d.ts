import React, { HTMLProps } from 'react';
import { Mode, DefaultValues, SubmitHandler, FieldValues } from 'react-hook-form';
import { FormAPI } from '../../types';
interface FormProps<T extends FieldValues> extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
    validateOn?: Mode;
    validateOnMount?: boolean;
    validateFieldsOnMount?: string | string[];
    defaultValues?: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    children: (api: FormAPI<T>) => React.ReactNode;
    /** Sets max-width for container. Use it instead of setting individual widths on inputs.*/
    maxWidth?: number | 'none';
}
/**
 * @deprecated use the `useForm` hook from react-hook-form instead
 */
export declare function Form<T extends FieldValues>({ defaultValues, onSubmit, validateOnMount, validateFieldsOnMount, children, validateOn, maxWidth, ...htmlProps }: FormProps<T>): React.JSX.Element;
export {};
