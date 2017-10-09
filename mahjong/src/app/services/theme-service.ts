import { Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";


@Injectable()
export class ThemeService {
    theme: number = 1;
    subject: Subject<number> =  new Subject<number>();

    changeTheme(){
        if(this.theme == 1) {
            this.theme = 2;
            this.subject.next(this.theme);
        }else{
            this.theme = 1;
            this.subject.next(this.theme);
        }
    }
}