import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { Game } from "app/models/game";
import { UserService } from "app/services/user.service";
import { UserDependendComponent } from "app/core/UserDependend.base";



@Pipe({ name: 'myGames' })
export class MyGamesPipe extends UserDependendComponent implements PipeTransform, OnInit {

  filteredGames: Game[];

  constructor(userService: UserService) {
    super(userService);
    super.ngOnInit();
  }




  transform(allGames: Game[], selectedTemplate, selectedState, myGamesOnly) {

    var self = this;
    self.filteredGames = new Array<Game>();

    self.filteredGames = [];
    for (var game of allGames) {
      if (game.gameTemplate._id.toUpperCase().includes(selectedTemplate.toUpperCase()) || selectedTemplate.toUpperCase() == "ANY") {
        if (game.state.toUpperCase().includes(selectedState.toUpperCase()) || selectedState.toUpperCase() == "ANY") {
          if (myGamesOnly) {
            if (game.createdBy._id == self.user._id) {
              //Check if current logged in user created game
              self.filteredGames.push(game);
            }
            else {
              for (var player of game.players) {
                if (player._id == self.user._id) {
                  //Check if current logged in user is  playing in the game
                  self.filteredGames.push(game);
                }
              }
            }
          }
          else self.filteredGames.push(game);
        }
      }
    }
    return self.filteredGames;
  }
}
