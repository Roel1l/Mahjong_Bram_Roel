//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Models
import { Game } from '../models/game';
import { GameTemplate } from '../models/game-template';

//Services
import { GameService } from '../services/game.service';
import { TemplateService } from '../services/game-template.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent extends UserDependendComponent implements OnInit {

  currentSubRoute: String;

  constructor(
    private router: Router,
    private gameService: GameService,
    private location: Location,
    userService: UserService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.router.events.subscribe(() => this.setSubRoute());
  }

  setSubRoute(): void{
    var x = window.location.href.split('/');
    this.currentSubRoute = x[x.length - 1];
  }

}
