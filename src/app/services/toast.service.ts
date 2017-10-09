import { Injectable, OnInit } from '@angular/core';
import { ToastComponent } from "app/toast/toast.component";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ToastService {

    constructor( ) { };

    public toast: Subject<string> = new Subject<string>();

    public showSuccess(title: string): void {
        this.toast.next(title);
    }

    public showError(title: string): void {
        this.toast.next(title);
    }

    public showInfo(title: string): void {
        this.toast.next(title);
    }
}
