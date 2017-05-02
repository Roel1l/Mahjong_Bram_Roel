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

  allGames: Game[];
  filteredGames: Game[];
  date: Date;

  constructor(
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.date = new Date();
    this.getGames();
  }

  getGames(): void {
    var self = this;
    this.gameService.getGames().then(
      function (games) {
        self.allGames = games;
        self.filteredGames = games;
      });
  }

  goToDetail(game: Game): void {
  }

  search(term: string): void {
    this.filteredGames = [];
    term = term.toUpperCase();
    for (var game of this.allGames) {
      if (game.createdBy.name.toUpperCase().includes(term) || game.gameTemplate._id.toUpperCase().includes(term) || game.state.toUpperCase().includes(term)) {
        this.filteredGames.push(game);
      }
    }
  }

}
