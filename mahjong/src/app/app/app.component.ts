import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { UserService } from "app/services/user.service";
import { User } from '../models/user';
import {Location} from '@angular/common';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends UserDependendComponent implements OnInit {
  
  authUrl: string =  'https://mahjongmayhem.herokuapp.com/auth/avans/?callbackUrl=http://localhost:420';
  
  constructor(
    private router: Router,
    private location: Location,
    userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService
  ) {
    super(userService); 
  };

   ngOnInit() {
    super.ngOnInit();

    this.tryProcessCallback();
   }

   tryProcessCallback(): void {
    var username: string;
    var token: string;

    //Try getting username and token from url parameters
    if(window.location.search.substring(1)){
       var params: string[] = window.location.search.substring(1).split('&');
       if(params.length == 2)
       {
         if(params[0].split('=')[0] == 'username'){
           username = params[0].split('=')[1];
         }
         if(params[1].split('=')[0] == 'token'){
           token = params[1].split('=')[1];
         }
       }
    }

    //If username and token were found login
    if(username && token)
    {
       var loggedInUserInfo: User = {
         _id: username,
         name: "",
         token: token
       }

       this.userService.User.next(loggedInUserInfo);

       console.log(this.userService.User);
       var x: string[] = this.location.path().split('?');
       this.location.replaceState(x[0]);
    }
  }

  logout(): void {
    this.userService.User.next(null);
  }

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
