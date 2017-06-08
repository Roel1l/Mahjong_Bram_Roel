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
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent extends UserDependendComponent implements OnInit {

  @Input() game: Game;
  tiles: Tile[]
  clickedTile1: Tile = null;
  clickedTile2: Tile = null;

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
        this.getTiles();
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
      console.log("Chose first tile");
    }
    else if (this.clickedTile2 == null) {
      this.clickedTile2 = tile;
      console.log("Chose second tile");
      if(this.validateMatch(this.clickedTile1, this.clickedTile2, this.tiles)){
        this.tileService.matchTile(this.game._id,this.clickedTile1._id,this.clickedTile2._id);
        var index= this.tiles.indexOf(this.clickedTile1);
        this.tiles.splice(index,1);
        index = this.tiles.indexOf(this.clickedTile2);
        this.tiles.splice(index,2);
      } 
      this.clickedTile1 = null;
      this.clickedTile2 = null;
    }
    //console.log(tile);
  }

  /*
    TODO 
    - dit is echt dikke stront beter zorgrn we er gewoon voor dat je tiles met neigbours uberhaupt niet aan kan klikken ofzo 
    - Tile equality wordt bepaald aan de hand van naam/suit, is dit genoeg?
    - Check toevoegen voor 2 keer zelfde tile aanklikken  <<NIET HIET MAAR IN HANDLECLICKED
    - Loop breaken bij matchinvalid (return werkt niet, break kan niet kan wel wazige shit doen om het te stoppen maar had ik nu geen zin in)
  */
  validateMatch(a: Tile, b: Tile, allTiles: Tile[]): boolean {

    if (a == b) { console.log("Smerige cheater"); return false }; //Return false if user clicked the same tile twice

    var matchValid = true;          //Keep track of wether match is valid
    var aNeighBourFound = false;    //Used to detect if a tile has multiple neighbours
    var bNeighBourFound = false;

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
            if (aNeighBourFound) {                                    //A neighbour has already been found, match is invalid
              console.log("Tile a is surrounded");
              matchValid = false;
            }
            aNeighBourFound = true;
          }
        }
      }

      //Check b for left/right neighbours
      if (z == b.zPos) {
        if (y == b.yPos || y == b.yPos + 1 || y == b.yPos - 1) {
          if (x == b.xPos + 2 || x == b.xPos - 2) {
            if (bNeighBourFound) {
              console.log("Tile b is surrounded");
              matchValid = false;
            }
            bNeighBourFound = true;
          }
        }
      }

    });

    if (matchValid) {
      console.log('Tiles valid for matching, checking equality');
      return (a.tile.name == b.tile.name && a.tile.suit == b.tile.suit); //Return tiles' equality
    }
    return false;

  }

}
