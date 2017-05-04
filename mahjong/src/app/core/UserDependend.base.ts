import { OnInit } from "@angular/core";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";

export class UserDependendComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.User.subscribe((user) => {
        this.user = user;
    })
  }

}