export declare const selectOptionInTest: (input: HTMLElement, optionOrOptions: string | RegExp | Array<string | RegExp>) => Promise<void>;
export declare const getSelectParent: (input: HTMLElement) => HTMLElement | null | undefined;
export declare const clickSelectOption: (selectElement: HTMLElement, optionText: string) => Promise<void>;
