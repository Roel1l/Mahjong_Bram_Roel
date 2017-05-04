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
      .subscribe(game => this.game = game);
      this.currentUser = this.userService.getUser();
  }

  goBack(): void {
    this.location.back();
  }

  //TODO hoort dit niet te redirecten?//refreshen
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
