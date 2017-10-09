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
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  game: Game;
  players: any[];
  matches: Tile[];

   constructor(
      private gameService: GameService,
      private route: ActivatedRoute,
      private tileService: TileService,
      private socketService: SocketService,
    ) {}

ngOnInit() {
    this.matches = [];
    this.players = [];
    this.route.parent.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getUserData(game);
        this.subscribeToSocket();
      });
  }

  getMatches() : void {
    var self = this;
    
    this.tileService.getTilesByGame(this.game._id, true).then(
      function (response) {
        self.matches = response;
        self.getDisplayData();
      }
    );
  }

   getUserData(game: Game) : void {
    var self = this;
   self.players = [];
    game.players.forEach(function(player){
     var retValue = {
       id: player._id,
       displayName: player.name,
       score: 0
     };
     self.players.push(retValue);
    });
    this.getMatches();
  }

  getDisplayData() : void {
    var self = this;
    console.log(this.matches);
    self.matches.forEach(function(match){
        self.players.forEach(function(player){
          if(player.id == match.match.foundBy){
            player.score += 0.5;
          }
        })
    })
  }
  //TODO wordt 4 keer gecalled. waarom? als ik em uitcomment op andere olekken wordt ie hier minder gecalled
  subscribeToSocket(): void {
    this.socketService.match.subscribe(data => {
      
      this.players.forEach(function(player){
        if(player.id == data[0].match.foundBy){
          player.score++;
        }
      })
    });
  }

}


