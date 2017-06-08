import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'app-toast',
  template: `<div id="snackbar" class="{{toastClass}}">{{toastText}}</div>`,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  private toastText: string;
  private toastClass: string;

  constructor(private toastService: ToastService){
    
    this.toastService.toast.subscribe((text) => this.showToast(text));
  }

  showToast(text: string): void {
    this.toastText = text;
    this.toastClass = "show";
    setTimeout(() => {
       this.toastClass = "";
    }, 3000);
  }
}