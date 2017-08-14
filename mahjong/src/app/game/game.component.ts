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
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends UserDependendComponent implements OnInit {

  game: Game;
  isInGame: Boolean;

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
    this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => {
        this.game = game;
        this.checkParticipation();
        this.subscribeToSocket();
      });
  }

   subscribeToSocket(): void{
    this.socketService.connectToGame(this.game._id);
    this.socketService.start.subscribe(data => {
      this.reloadGame();
    });
    this.socketService.end.subscribe(data => {
      this.reloadGame();
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


  checkParticipation(): void{
    var self = this;

    //Set to default values
    self.isInGame = false;

    //Check if user is in game/admin
    this.game.players.forEach(function (player) {
      if (player._id == self.user._id) {
        //User exists in game, set isInGame to true
        self.isInGame = true;
      }
    });
  }

  
  goBack(): void {
     this.router.navigate(['/games']);
  }

}
