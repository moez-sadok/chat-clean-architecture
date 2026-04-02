import { ChangeDetectorRef } from "@angular/core";
import { IReactive } from "core/view/reactive";
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


//old solution used inside the component

// Framework-layer concern: if the reactive adapter needs CD, bind it (no need it with signals, but needed for RxJS-based reactive view)
// if (isChangeDetectable(this.chatview.vm)) {
//   this.chatview.vm.bindChangeDetection(this.cdRef);
// }

// export function isChangeDetectable(obj: unknown): obj is IAngularChangeDetectable {
//     return typeof obj === 'object' && obj !== null && 'bindChangeDetection' in obj;
// }