//Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//Services
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

//Models
import { Game } from '../models/game';
import { User } from '../models/user';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

   constructor(
     private router: Router,
     private gameService: GameService,
     private userService: UserService
     ){ }

  templates = ['Dragon','Monkey','Ox','Ram','Rooster','Shanghai','Snake'];
  model = new Game(1, 11, 'Ox');
  submitted = false;
  
  onSubmit() { this.submitted = true; }

  newGame(){
    //Todo move getting user to gameservice
     var user: User = this.userService.getUser();
     this.gameService.create(user, this.model)
    .then(game => {
      this.router.navigate(['/games', game._id]);
    });
  }


 

  ngOnInit() {
  }

}
