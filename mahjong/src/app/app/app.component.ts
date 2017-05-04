import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { UserService } from "app/services/user.service";
import { User } from '../models/user';
import {Location} from '@angular/common';

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
    userService: UserService
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

    username = this.router.parseUrl(this.router.url).queryParams['username'];
    token = this.router.parseUrl(this.router.url).queryParams['token'];

    if(username && token)
    {
       var loggedInUserInfo: User = {
         _id: username,
         name: "",
         token: token
       }

       this.userService.User.next(loggedInUserInfo);
    }

    
    //this.location.replaceState("/");
  }

  logout(): void {
    this.userService.User.next(null);
  }

}
