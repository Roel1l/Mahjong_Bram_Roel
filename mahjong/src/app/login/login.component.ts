//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

//Models
import { User } from '../models/user';

//Services
import { UserService } from '../services/user.service';

import { UserDependendComponent } from "app/core/UserDependend.base";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends UserDependendComponent implements OnInit {

  loggedIn: boolean;

  constructor(
     private router: Router,
     private location: Location,
     userService: UserService
  ) { 
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tryProcessCallback();
    this.loggedIn = this.user ? true : false;
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

    this.location.replaceState("/?");
  }

  logout(): void {
    this.userService.User.next(null);
    this.loggedIn = false;
  }

}
