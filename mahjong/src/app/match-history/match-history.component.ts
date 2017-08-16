import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router'

//Models
import { Game } from '../models/game';
import { User } from '../models/user';
import { Tile } from '../models/tile';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
import { TileService } from '../services/tile.service';
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent extends UserDependendComponent implements OnInit {

  @Input() game: Game;
  tiles: Tile[];          //All tiles in the game, used to display the board 
  matches: Tile[];        //All matches that where made
  previousStack: Tile[];  //All matches that have been "processed" in the match history used for previous button 

  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService,
    private tileService: TileService,
    private socketService: SocketService,
    public toastService: ToastService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.previousStack = [];
    this.route.parent.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getTiles();
        this.getMatches();
        this.previousStack = [];
      });

  }

  getTiles() {
    var self = this;
    self.tiles = [];
    this.tileService.getAllTilesByGame(this.game._id).then(
      function (response) {
        self.tiles = response;
        console.log(self.tiles);
      }
    )
  }

  getMatches(): void {
    var self = this;
    self.matches = [];
    this.tileService.getTilesByGame(this.game._id, true).then(
      function (response) {
        self.matches = response;
      }
    );
  }

  previous() {
    var match = this.previousStack.shift(); //Remove first entry from previousStack
    this.matches.unshift(match);            //Add to tile/matches as first entry
    this.tiles.unshift(match);

    var match2 = this.previousStack.shift();
    this.matches.unshift(match2);
    this.tiles.unshift(match2);
  }

  next() {
    var match = this.matches.shift();     //Remove first entry from matches
    this.removeTileById(match._id);       //Remove by id from tiles
    this.previousStack.unshift(match);    //Add as first entry in previousStack

    var match2 = this.matches.shift();
    this.removeTileById(match2._id);
    this.previousStack.unshift(match2);
  }

  removeTileById(id: string): void {
    for (var i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i]._id == id) {
        this.tiles.splice(i, 1);
        return;
      }
    }
  }

}
