import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Game } from '../models/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  @Input() game: Game;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
