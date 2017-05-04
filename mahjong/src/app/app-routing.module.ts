import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent }      from './games/games.component';
import { GameDetailComponent }  from './game-detail/game-detail.component';
import { LoginComponent }      from './login/login.component';
import { NewGameComponent } from './new-game/new-game.component';
import { MyGamesComponent } from './my-games/my-games.component';
const routes: Routes = [
  // { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'games',  component: GamesComponent },
  { path: 'games/new', component: NewGameComponent },
  { path: 'games/my', component: MyGamesComponent},
  { path: 'games/:id', component: GameDetailComponent }
 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}