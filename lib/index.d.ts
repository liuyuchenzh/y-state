export interface StateOption<T> {
    list: Item<T>[];
}
export interface Item<T> {
    name: string;
    value: T;
    watch(newVal: T, oldVal: T): any;
}
export declare type setState = {
    [key: string]: any;
} | string;
export default class State {
    [key: string]: any;
    constructor(option: StateOption<any>);
    proxy<T>(item: Item<T>): void;
    setState(data: setState, value?: any): void;
    getItem(key: string): any;
}
