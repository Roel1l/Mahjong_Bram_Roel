//Modules
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

//models
import { Game } from '../models/game';
import { User } from '../models/user';
import { Tile } from '../models/tile';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { TileService } from '../services/tile.service';
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'app-game-matches',
  templateUrl: './game-matches.component.html',
  styleUrls: ['./game-matches.component.scss']
})
export class GameMatchesComponent extends UserDependendComponent implements OnInit {

   constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService,
    private tileService: TileService,
    public toastService: ToastService
  ) {
    super(userService);
  }

  @Input() game: Game;
  matches: Tile[];

ngOnInit() {
    super.ngOnInit();
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getMatches();
      });
  }

  getMatches() {
    var self = this;
    self.matches = [];
    this.tileService.getTilesByGame(this.game._id, true).then(
      function (response) {
        self.matches = response;
      }
    )
  }

}
