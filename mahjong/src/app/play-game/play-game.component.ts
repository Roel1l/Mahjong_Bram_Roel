//Modules
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';
import { Tile } from '../models/tile';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { TileService } from '../services/tile.service';
@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent extends UserDependendComponent implements OnInit {

  @Input() game: Game;
  tiles: Tile[];
  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService,
    private tileService: TileService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
      });
  }

  getTiles(){
    var self = this;
    this.tileService.getTylesByGame(this.game._id,false).then(
      function(response){
        console.log(response);
        self.tiles = response;
      }
    )
  }

}
