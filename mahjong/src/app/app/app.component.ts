import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    userService: UserService,
    private activatedRoute: ActivatedRoute
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

    
   // username = this.QueryString().username;
    
   // console.log(this.QueryString());


    if(username && token)
    {
      console.log("hoi");
     

       var loggedInUserInfo: User = {
         _id: username,
         name: "",
         token: token
       }

       this.userService.User.next(loggedInUserInfo);
       var x: string[] = this.location.path().split('?');
       this.location.replaceState(x[0]);
    }

  }

  logout(): void {
    this.userService.User.next(null);
  }

  QueryString(){
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }
}
