import { UsePluginComponentResult } from './getPluginExtensions';
export type UsePluginComponent<Props extends object = {}> = (id: string) => UsePluginComponentResult<Props>;
export declare function setPluginComponentHook(hook: UsePluginComponent): void;
export declare function usePluginComponent<Props extends object = {}>(id: string): UsePluginComponentResult<Props>;
