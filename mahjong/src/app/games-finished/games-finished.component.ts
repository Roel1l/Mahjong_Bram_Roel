//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Models
import { Game } from '../models/game';
import { GameTemplate } from '../models/game-template';

//Services
import { GameService } from '../services/game.service';
import { TemplateService } from '../services/game-template.service';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
@Component({
  selector: 'app-games-finished',
  templateUrl: './games-finished.component.html',
  styleUrls: ['./games-finished.component.scss']
})
export class GamesFinishedComponent extends UserDependendComponent implements OnInit {

filteredGames: Game[];

  templates = ['Any', 'Dragon','Monkey','Ox','Ram','Rooster','Shanghai','Snake'];
  states = ['Any','Open','Playing','Finished'];
  selectedTemplate: string = 'any';
  selectedState: string = 'finished';
  showMyGamesOnly: boolean = false;


  constructor(
    private router: Router,
    private gameService: GameService,
    private templateService: TemplateService,
    userService: UserService
   ) 
   {
     super(userService);
   }

  ngOnInit() {
    super.ngOnInit();
    this.getGames();
    this.getTemplates();
  }

  getGames(): void {
    var self = this;
  
    this.gameService.getGames().then(
      function (games) {
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
    this.router.navigate(['/game', game._id]);
  }

}
