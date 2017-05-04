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


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  @Input() game: Game;
  currentUser: User;
  isInGame: Boolean;
  isAdmin: Boolean;
  players: Array<String>;

  constructor(
     private router: Router,
    private gameService: GameService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
     this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game =>
       {
         this.game = game;
         console.log(this.game);
         this.checkParticipation();

      });
      this.currentUser = this.userService.getUser();
  }

  checkParticipation(){
    var self = this;

    //Set to default values
    self.isAdmin = false;
    self.isInGame  = false;

    //Check if user is in game/admin
    this.game.players.forEach(function(player){
      if(player._id == self.currentUser._id){
        //User exists in game, set isInGame to true
        self.isInGame = true;
      }
    });
    if(self.currentUser.name == self.game.createdBy.name){
        self.isAdmin = true;
    }
    console.log(this.isAdmin);

  }

  goBack(): void {
    this.location.back();
  }

  joinGame(): void {
    var user: User = this.userService.getUser();
    this.route.params.subscribe((params: Params) => {
        this.gameService.joinGame(params['id'], user);
    });
  }

  leaveGame(): void {
    var user: User = this.userService.getUser();
    this.route.params.subscribe((params: Params) => {
        this.gameService.leaveGame(params['id'], user);
    });
  }

  deleteGame(): void { 
    this.gameService.delete(this.game._id, this.currentUser).then(() => {
             this.router.navigate(['/games']);  
      });
  }
}
