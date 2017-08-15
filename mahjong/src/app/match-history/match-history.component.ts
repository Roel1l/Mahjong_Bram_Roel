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
    this.route.parent.params
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


}


  previous() {



  }

  next() {
   
  }

}
