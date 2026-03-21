export interface IReactive<T> {
    readonly data: T;
    set(data: T): void;
    change(updater: (val: T) => T): void;
}