//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';
import { GameTemplate } from '../models/game-template';

//Services
import { GameService } from '../services/game.service';
import { TemplateService } from '../services/game-template.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

 allGames: Game[];
  filteredGames: Game[];

  templates = ['Any', 'Dragon','Monkey','Ox','Ram','Rooster','Shanghai','Snake'];
  states = ['Any','Open','Playing','Finished'];
  selectedTemplate: string = 'any';
  selectedState: string = 'any';

  
  constructor(
    private router: Router,
    private gameService: GameService,
    private templateService: TemplateService,
    private userService: UserService) { }

    ngOnInit() {
    this.getGames();
    this.getTemplates();
  }

  getGames(): void {
    var self = this;
    this.gameService.getGamesByUser(this.userService.getUser()._id).then(
      function (games) {
        self.allGames = games;
        self.filteredGames = games;
      });
  }

  getTemplates(): void {
    var self = this;
    this.templateService.getTemplates().then(
      function (templates) {
        self.templates = [];
        self.templates.push("Any");
        for (var template of templates) {
          self.templates.push(template._id);
        }
      });
  }

  goToDetail(game: Game): void {
    this.router.navigate(['/games', game._id]);
  }

  filter(): void {
    this.filteredGames = [];
    for (var game of this.allGames) {
        if(game.gameTemplate._id.toUpperCase().includes(this.selectedTemplate.toUpperCase()) || this.selectedTemplate.toUpperCase() == "ANY") {
          if(game.state.toUpperCase().includes(this.selectedState.toUpperCase()) || this.selectedState.toUpperCase() == "ANY"){
            this.filteredGames.push(game);
          }
        }
    }
  }

}
