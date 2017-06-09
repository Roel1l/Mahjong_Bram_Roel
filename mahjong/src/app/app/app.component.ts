import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { UserService } from "app/services/user.service";
import { User } from '../models/user';
import {Location} from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UserDependendComponent implements OnInit {
  
  authUrl: string =  'https://mahjongmayhem.herokuapp.com/auth/avans/?callbackUrl=http://localhost:420';
  
  constructor(
    private router: Router,
    private location: Location,
    userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
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
       var loggedInUser: User = {
         _id: username,
         name: "",
         token: token
       }

       this.userService.User.next(loggedInUser);
       localStorage.setItem('user', JSON.stringify(loggedInUser));

       var x: string[] = this.location.path().split('?');
       this.location.replaceState(x[0]);
    }
  }

  logout(): void {
    this.userService.User.next(null);
    localStorage.setItem('user', null);
  }
}
