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
import { ToastService } from "app/services/toast.service";

//Socket
import * as io from '../../socket.io.js';


@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent extends UserDependendComponent implements OnInit {

  @Input() game: Game;
  tiles: Tile[]
  clickedTile1: Tile = null;
  clickedTile2: Tile = null;
  private socket: any;

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

  ngOnInit() {
    super.ngOnInit();
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.getTiles();
        this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + this.game._id);
        this.setSocketMessages();
      });
  }

  setSocketMessages() {
    this.socket.on('start', (data) => {
      console.log('Socket says GameStarted');
      console.log(data);
    });
    this.socket.on('match', (data) => {
      this.toastService.showInfo('Another player got a match!');
      this.removeTileById(data[0]._id);
      this.removeTileById(data[1]._id);
    });
  }


  getTiles() {
    var self = this;
    self.tiles = [];
    this.tileService.getTilesByGame(this.game._id, false).then(
      function (response) {
        self.tiles = response;
      }
    )
  }

  handleTileClicked(tile: Tile): void {
    if (this.clickedTile1 == null) {
      this.clickedTile1 = tile;
    }
    else if (this.clickedTile2 == null) {
      this.clickedTile2 = tile;
      if (this.validateMatch(this.clickedTile1, this.clickedTile2, this.tiles)) {
        this.tileService.postMatch(this.game._id, this.clickedTile1._id, this.clickedTile2._id);
        this.removeTileById(this.clickedTile1._id);
        this.removeTileById(this.clickedTile2._id);
      }
      else {
        this.toastService.showError("Invalid Match");
      }
      this.clickedTile1.tileIsClicked = false;
      this.clickedTile2.tileIsClicked = false;
      this.clickedTile1 = null;
      this.clickedTile2 = null;
    }
  }

  removeTileById(id: string): void {
    for (var i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i]._id == id) {
        this.tiles.splice(i, 1);
        return;
      }
    }
  }
  
  validateMatch(a: Tile, b: Tile, allTiles: Tile[]): boolean {

    if (a == b) { console.log("Smerige cheater"); return false }; //Return false if user clicked the same tile twice

    var matchValid = true;          //Keep track of wether match is valid
    var aNeighBour = null;    //Used to detect if a tile has multiple neighbours
    var bNeighBour = null;

    allTiles.forEach(function (tile) {

      var x = tile.xPos;
      var y = tile.yPos;
      var z = tile.zPos;

      //Check a for upper neighbours
      if (x == a.xPos || x == a.xPos - 1 || x == a.xPos + 1) {      //Tile overlaps a's x 
        if (y == a.yPos || y == a.yPos - 1 || y == a.yPos + 1) {    //Tile overlaps a's y
          if (z > a.zPos) {                                         //Tile is placed above a
            console.log("Tile a has an upper neighbour");
            matchValid = false;
          }
        }
      }

      //Check b for upper neighbours
      if (x == b.xPos || x == b.xPos - 1 || x == b.xPos + 1) {
        if (y == b.yPos || y == b.yPos - 1 || y == b.yPos + 1) {
          if (z > b.zPos) {
            console.log("Tile b has an upper neighbour");
            matchValid = false;
          }
        }
      }

                            //Check a for left/right neighbours
      if (z == a.zPos) {                                              //Tile is on the same height as a
        if (y == a.yPos || y == a.yPos + 1 || y == a.yPos - 1) {      //Tile is one the same y axis as a
          if (x == a.xPos + 2 || x == a.xPos - 2) {                   //Tile is positioned directly to the right or left of a
            if (aNeighBour != null && aNeighBour.xPos != x) {         //A neighbour has already been found, if this neighbours x is not equal to the current neighbours x both sides are surrounded
              console.log("Tile a is surrounded");
              matchValid = false;
            }
            aNeighBour = tile;
          }
        }
      }

      //Check b for left/right neighbours
      if (z == b.zPos) {
        if (y == b.yPos || y == b.yPos + 1 || y == b.yPos - 1) {
          if (x == b.xPos + 2 || x == b.xPos - 2) {
            if (bNeighBour != null && bNeighBour.xPos != x) {
              console.log("Tile b is surrounded");
              matchValid = false;
            }
            bNeighBour = tile;
          }
        }
      }

    });

    if (matchValid) {
      console.log('Tiles valid for matching, checking equality');
      if (a.tile.matchesWholeSuit) {
        return (a.tile.suit == b.tile.suit);
      };
      return (a.tile.name == b.tile.name && a.tile.suit == b.tile.suit); //Return tiles' equality
    }
    return false;

  }

}
