import { ChangeDetectorRef } from "@angular/core";
import { IReactive } from "@cca/core-view";
export interface IAngularChangeDetectable {
    bindChangeDetection(cdRef: ChangeDetectorRef): void;
}

export abstract class AChangeDetectableComponent {

    constructor(protected cdRef: ChangeDetectorRef, rvm: IReactive<any>) {
        if (this.isChangeDetectable(rvm)) rvm.bindChangeDetection(this.cdRef);
    }

    private isChangeDetectable(obj: unknown): obj is IAngularChangeDetectable {
        return typeof obj === 'object' && obj !== null && 'bindChangeDetection' in obj;
    }
}
