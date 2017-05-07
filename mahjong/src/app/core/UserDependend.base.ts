import { OnInit } from "@angular/core";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";

export class UserDependendComponent implements OnInit {

  public user: User;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.User.subscribe((user) => {
        this.user = user;
    })
  }

}