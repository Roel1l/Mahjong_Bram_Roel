//Modules
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";

//Socket
import * as io from '../../socket.io.js';
import { ToastService } from "app/services/toast.service";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent extends UserDependendComponent implements OnInit {

  game: Game;
  isInGame: Boolean;
  isAdmin: Boolean;
  loading: Boolean;
  private socket: any;

  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService,
    private toastService: ToastService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + this.game._id);
        this.checkParticipation();
        this.setSocketMessages();
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
    if (self.user._id == self.game.createdBy._id) {
      self.isAdmin = true;
    }
  }

  setSocketMessages() {
    this.socket.on('start', (data) => {
      this.reloadGame();
      this.toastService.showSuccess("Game started");
    });
    this.socket.on('end', (data) => {
      this.reloadGame();
      this.toastService.showSuccess("Game ended");
    });
    this.socket.on('playerJoined', (data) => {
      this.reloadGame();
      this.toastService.showSuccess("Player joined");
    });
  }

  reloadGame(): void {
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {

        this.game = game;
        this.checkParticipation();
      });
  }

  goBack(): void {
    this.location.back();
  }

  startGame(): void {
    this.gameService.startGame(this.game._id).then(() => {
      // this.router.navigate(['/games/' + this.game._id + '/play']);
    })
  }

  playGame(): void {
    this.router.navigate(['/games/' + this.game._id + '/play']);
  }

  joinGame(): void {
    this.gameService.joinGame(this.game._id).then(() => {
    });
  }

  leaveGame(): void {
    this.gameService.leaveGame(this.game._id).then(() => {
      this.isInGame = false;
      for (var i = 0; i < this.game.players.length; i++) {
        if (this.game.players[i]._id == this.user._id) this.game.players.splice(i, 1);
      }
    });
  }

  deleteGame(): void {
    this.gameService.deleteGame(this.game._id).then(() => {
      this.router.navigate(['/games']);
    });
  }
}
