//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { TemplateService } from '../services/game-template.service';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';
import { GameTemplate } from '../models/game-template';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

   constructor(
     private router: Router,
     private gameService: GameService,
     private userService: UserService,
     private templateService: TemplateService
     ){ }

  templates = [];
  model = new Game(2, 10,'Ox');
  submitted = false;
  selectedTemplate: string;

  onSubmit() { 
    this.submitted = true; 
    console.log('submit');
  }

  newGame(){
    //TODO move getting user to gameservice
     var user: User = this.userService.getUser();
     this.model.gameTemplate._id = this.selectedTemplate;
     this.model.gameTemplate.id = this.selectedTemplate;

     this.gameService.createGame(user, this.model)
    .then(game => {
      this.router.navigate(['/games', game._id]);
    });
  }


  ngOnInit() {
    this.getTemplates();
  }

  getTemplates(): void {
    var self = this;
    this.templateService.getTemplates().then(
      function (templates) {
        self.templates = [];
        for (var template of templates) {
          self.templates.push(template);
        }
         self.model = new Game(2, 10,self.templates[0]._id);
      });
  }
}