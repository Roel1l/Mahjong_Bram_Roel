//Modules
import { Component, OnInit, NgZone } from '@angular/core';
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
import { TileService } from '../services/tile.service';
import { SocketService } from "app/services/socket.service";

@Component({
  selector: 'app-game-matches',
  templateUrl: './game-matches.component.html',
  styleUrls: ['./game-matches.component.scss']
})
export class GameMatchesComponent  implements OnInit {

   constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private tileService: TileService,
    private socketService: SocketService,
  ) {
  
  }

  game: Game;
  matches: Tile[];
  inputValue: number;

ngOnInit() {
    this.inputValue = 0; 

    this.route.parent.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getMatches();
        this.subscribeToSocket();
      });
  }

  getMatches() : void {
    var self = this;
    this.tileService.getTilesByGame(this.game._id, true).then(
      function (response) {
        self.matches = response;
      }
    );
  }

  updateInput(input) : void{
    this.inputValue = input;
  }

  subscribeToSocket(): void {
    this.socketService.connectToGame(this.game._id);
    this.socketService.match.subscribe(data => {
      this.getMatches();
    });
  }

}
