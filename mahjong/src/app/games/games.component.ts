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
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent extends UserDependendComponent implements OnInit  {
  
  allGames: Game[];
  filteredGames: Game[];

  templates = ['Any', 'Dragon','Monkey','Ox','Ram','Rooster','Shanghai','Snake'];
  states = ['Any','Open','Playing','Finished'];
  selectedTemplate: string = 'any';
  selectedState: string = 'any';
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
            if(this.showMyGamesOnly){
              if(game.createdBy._id == this.user._id){
                  //Check if current logged in user created game
                  this.filteredGames.push(game);
              }
              else{
                for (var player of game.players) {
                  if(player._id == this.user._id){
                     //Check if current logged in user is  playing in the game
                     this.filteredGames.push(game);
                  }
                }
              }
            }
            else this.filteredGames.push(game);
          }
        }
    }
  }


}
