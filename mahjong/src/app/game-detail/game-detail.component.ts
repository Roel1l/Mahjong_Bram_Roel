//Modules
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

//Models
import { Game } from '../models/game';

//Services
import { GameService } from '../services/game.service';



@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  @Input() game: Game;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
     this.route.params
      .switchMap((params: Params) => this.gameService.getGame(params['id']))
      .subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back();
  }

  joinGame(): void {
    console.log(this.game);
  }
}
