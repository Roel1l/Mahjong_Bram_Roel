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
  tiles: Tile[];
  matches: Tile[];
  previousStack: Tile[]; 

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
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getTiles();
        this.getMatches();
        
      });
      
  }

    getTiles() {
    var self = this;
    self.tiles = [];
    this.tileService.getAllTilesByGame(this.game._id).then(
      function (response) {
        self.tiles = response;
      }
    )
  }

   getMatches() : void {
    var self = this;
    self.matches = [];
    this.tileService.getTilesByGame(this.game._id, true).then(
      function (response) {
        self.matches = response;
        console.log(self.matches)
      }
    );
  }


log(){
  // console.log('Current tile list');
  // console.log(this.tiles);
  // console.log('Current match list');
  // console.log(this.matches);
  // console.log('Current stack list');
  // console.log(this.previousStack);

}


  previous() {
    // //Get first two tiles 
    // var match1 = this.previousStack[0];
    // var match2 = this.previousStack[1];

    // //Remove them from the stack
    // console.log("a" + this.matches);
    // this.previousStack.pop();
    // this.previousStack.pop();

    // //Re-add to tiles 
    // this.tiles.push(match1);
    // this.tiles.push(match2);

    // //Re-add to matches 
    // this.matches.push(match1);
    // this.matches.push(match2);

    // console.log("b" + this.matches.length);


  }

  next() {
   
    //Get first two tiles 
    var tile1 = this.matches[0];
    var tile2 = this.matches[1];

    // //Remove them from the tile arr
    this.removeTileById(tile1._id);
    this.removeTileById(tile2._id);

    // //Add them to the stack 
    this.previousStack.push(tile1);
    this.previousStack.push(tile2);

    // //Remove them from the matches array 
    this.matches.splice(0,2);
    console.log(this.matches);
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
