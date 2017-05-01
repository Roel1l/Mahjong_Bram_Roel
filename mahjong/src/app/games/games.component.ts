//Modules
import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

//Models
import { Game } from '../models/game';

//Services
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];
  selectedGame: Game;
  constructor(
  //   private router: Router,
     private gameService: GameService){ }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames("st.vandermeer@student.avans.nl").then(games => this.games = games);
  }



}
