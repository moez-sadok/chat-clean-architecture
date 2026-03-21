import { ChangeDetectorRef } from "@angular/core";

export interface IAngularChangeDetectable {
    bindChangeDetection(cdRef: ChangeDetectorRef): void;
}

export function isChangeDetectable(obj: unknown): obj is IAngularChangeDetectable {
    return typeof obj === 'object' && obj !== null && 'bindChangeDetection' in obj;
}
