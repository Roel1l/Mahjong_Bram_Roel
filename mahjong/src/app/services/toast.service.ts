import { Injectable, OnInit } from '@angular/core';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Injectable()
export class ToastService {
    
constructor(
    private toasterService: ToasterService
){ };

 public toasterconfig : ToasterConfig = 
        new ToasterConfig({
            showCloseButton: false, 
            tapToDismiss: true, 
            timeout: 1500
        });

 public showSuccess(title: string,message: string): void {
     //types: success
        this.toasterService.pop("success", title, message);
    }

    public showError(title: string,message: string): void {
     //types: success
        this.toasterService.pop("error", title, message);
    }

     public showInfo(title: string,message: string): void {
     //types: success
        this.toasterService.pop("info", title, message);
    }

}
