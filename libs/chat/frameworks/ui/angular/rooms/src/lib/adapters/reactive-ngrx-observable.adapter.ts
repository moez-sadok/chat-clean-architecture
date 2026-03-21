
import { IReactive } from "@cca/core-view";
import { BehaviorSubject, Observable } from "rxjs";

//TODO: make an adapter 
export interface INgChangeDetector {
    markForCheck(): void;
}

export class ReactiveRxjsObservableAdapter<T> implements IReactive<T> {
    private readonly _subject = new BehaviorSubject<T>(undefined as T);
    readonly data$: Observable<T> = this._subject.asObservable();

    constructor(private readonly changeDetector?: INgChangeDetector) {
        if (this.changeDetector) {
            console.log('ReactiveRxjsObservableAdapter: Subscribing to data changes');
            this.data$.subscribe(() => {
                console.log('ReactiveRxjsObservableAdapter: Data changed');
                this.changeDetector?.markForCheck();

            }
            );
        }

    }

    get data(): T {
        return this._subject.getValue();
    }

    set(data: T): void {
        this._subject.next(data);
    }

    change(updater: (val: T) => T): void {
        this._subject.next(updater(this._subject.getValue()));
    }
}
