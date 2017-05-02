//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Services
import { GameService } from '../services/game.service';
import { TemplateService } from '../services/game-template.service';

//Models
import { Game } from '../models/game';
import { GameTemplate } from '../models/game-template';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  templates = ['Dragon','Monkey','Ox','Ram','Rooster','Shanghai','Snake'];
  model = new Game(1, 32, 'Ox');
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private router: Router, private gameService: GameService, private templateService: TemplateService) { 
  }

  newGame() {
    //TODO Send current model data + user name to gameservice and create a new game
    alert('Creating game : ' + this.model.gameTemplate + " - " + this.model.minPlayers + " - " + this.model.maxPlayers);
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
          self.templates.push(template._id);
        }
      });
  }
}
