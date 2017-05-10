//Modules
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { TileComponent } from "app/tile/tile.component";

//Models
import { Game } from '../models/game';
import { User } from '../models/user';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html', 
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent extends UserDependendComponent implements OnInit {

  @Input() game: Game;
  isInGame: Boolean;
  isAdmin: Boolean;
  players: Array<String>;
  loading: Boolean;
  
  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.checkParticipation();
      });
  }

  checkParticipation() {
    var self = this;

    //Set to default values
    self.isAdmin = false;
    self.isInGame = false;

    //Check if user is in game/admin
    this.game.players.forEach(function (player) {
      if (player._id == self.user._id) {
        //User exists in game, set isInGame to true
        self.isInGame = true;
      }
    });
    if (self.user.name == self.game.createdBy.name) {
      self.isAdmin = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

startGame(): void {
    this.gameService.startGame(this.game._id).then(() => {
      location.reload();
    })
  }

  joinGame(): void {
    this.gameService.joinGame(this.game._id).then(() => {
      var player = { "_id": "1", name: "You" }
      this.game.players.push(player);
    })
  }

  leaveGame(): void {
    this.gameService.leaveGame(this.game._id).then(() => {
      this.router.navigate(['/games']);
    });
  }

  deleteGame(): void {
    this.gameService.deleteGame(this.game._id).then(() => {
      this.router.navigate(['/games']);
    });
  }
}
