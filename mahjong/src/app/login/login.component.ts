//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from '../models/user';

//Services
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(
     private router: Router,
     private userService: UserService
  ) { }

  ngOnInit() {

  }

  login(): void {
    var user: User = this.getUser();
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }

  getUser(): User {
    return this.userService.getUser();
  }
}
