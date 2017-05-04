import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private toasterService: ToasterService
  ) { };

 public toasterconfig : ToasterConfig = 
        new ToasterConfig({
            showCloseButton: false, 
            tapToDismiss: true, 
            timeout: 1500
        });

 popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }
}
