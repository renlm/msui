import { BaseOptionType as RCCascaderOption, CascaderProps } from 'rc-cascader';
import { CascaderOption } from './Cascader';
type onChangeType = ((values: string[], options: CascaderOption[]) => void) | undefined;
export declare const onChangeCascader: (onChanged: onChangeType) => CascaderProps['onChange'];
type onLoadDataType = ((options: CascaderOption[]) => void) | undefined;
export declare const onLoadDataCascader: (onLoadData: onLoadDataType) => (options: RCCascaderOption[]) => void;
export {};
