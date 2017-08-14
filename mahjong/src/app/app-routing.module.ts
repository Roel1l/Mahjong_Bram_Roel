import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameComponent } from './new-game/new-game.component';
import { PlayGameComponent } from "app/play-game/play-game.component";
import { GameMatchesComponent } from './game-matches/game-matches.component';
import { GameComponent } from './game/game.component';
import { MatchHistoryComponent } from './match-history/match-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'games/new', component: NewGameComponent },
  {
    path: 'games/:id', component: GameComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: GameDetailComponent },
      { path: 'play', component: PlayGameComponent },
      { path: 'matches', component: GameMatchesComponent },
      { path: 'history', component: MatchHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }