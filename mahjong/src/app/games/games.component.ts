//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';

//Services
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(
     private router: Router,
     private gameService: GameService){ }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().then(games => this.games = games);
  }

  goToDetail(game: Game): void {
    if(game.state == "open" && game.maxPlayers > game.players.length) this.router.navigate(['/games', game._id]);
  }


}
