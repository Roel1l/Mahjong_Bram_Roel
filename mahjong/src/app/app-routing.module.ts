import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent }      from './games/games.component';
import { GameDetailComponent }  from './game-detail/game-detail.component';
import { NewGameComponent } from './new-game/new-game.component';
import { PlayGameComponent } from "app/play-game/play-game.component";

const routes: Routes = [
  // { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games',  component: GamesComponent },
  { path: 'games/new', component: NewGameComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'games/:id/play', component: PlayGameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}