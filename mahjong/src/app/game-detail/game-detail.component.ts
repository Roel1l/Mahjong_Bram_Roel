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
import { SocketService } from '../services/socket.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
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

  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    userService: UserService,
    private socketService: SocketService,
    private toastService: ToastService
  ) {
    super(userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.parent.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.checkParticipation();
        this.subscribeToSocket();
      });
  }

  checkParticipation(): void{
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

  subscribeToSocket(): void{
    this.socketService.start.subscribe(data => {
      this.reloadGame();
      this.toastService.showSuccess("Game started");
    });
    this.socketService.end.subscribe(data => {
      this.reloadGame();
      this.toastService.showSuccess("Game ended");
    });
    this.socketService.playerJoined.subscribe(data => {
      this.reloadGame();
      this.toastService.showSuccess("Player joined");
    });
  }

  reloadGame(): void {
    this.route.parent.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {

        this.game = game;
        this.checkParticipation();
      });
  }


  startGame(): void {
    this.gameService.startGame(this.game._id).then(() => {
    });
  }

  playGame(): void {
    this.router.navigate(['/games/' + this.game._id + '/play']);
  }

  joinGame(): void {
    this.gameService.joinGame(this.game._id).then(() => {
      this.isInGame = true;
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

}
