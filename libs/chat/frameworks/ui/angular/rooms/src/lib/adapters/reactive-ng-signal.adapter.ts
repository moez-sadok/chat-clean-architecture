
import { IReactive } from "@cca/core-view";
import { signal } from "@angular/core";

export class ReactiveNgSignalAdapter<T> implements IReactive<T> {
    private readonly _ngSignal = signal<T>(undefined as T);

    get data(): T {
        return this._ngSignal();
    }

    set(data: T): void {
        this._ngSignal.set(data);
    }

    change(updater: (val: T) => T): void {
        this._ngSignal.update(updater);
    }
}