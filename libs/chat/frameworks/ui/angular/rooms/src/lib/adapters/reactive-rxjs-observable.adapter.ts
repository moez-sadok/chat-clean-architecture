import { IReactive } from "@cca/core-view";
import { ChangeDetectorRef } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IAngularChangeDetectable } from "./angular-change-detectable";

export class ReactiveRxjsObservableAdapter<T> implements IReactive<T>, IAngularChangeDetectable {
    private readonly _subject = new BehaviorSubject<T>(undefined as T);
    readonly data$: Observable<T> = this._subject.asObservable();

    get data(): T {
        return this._subject.getValue();
    }

    set(data: T): void {
        this._subject.next(data);
    }

    change(updater: (val: T) => T): void {
        this._subject.next(updater(this._subject.getValue()));
    }

    bindChangeDetection(cdRef: ChangeDetectorRef): void {
        this.data$.subscribe(() => cdRef.markForCheck());
    }
}
