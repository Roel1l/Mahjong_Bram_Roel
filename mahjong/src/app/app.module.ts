//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


//Components
import { AppComponent } from './app/app.component';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameComponent } from './new-game/new-game.component';
import { TileComponent } from './tile/tile.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { ToastComponent } from "app/toast/toast.component";


//Services
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { TemplateService } from './services/game-template.service';
import { ToastService } from './services/toast.service'; 
import { TileService } from './services/tile.service';
import { SocketService } from "app/services/socket.service";

//Utility
import { MyGamesPipe } from "app/pipes/my-games.pipe";
import { GameMatchesComponent } from './game-matches/game-matches.component';
import { MyMatchesPipe } from "app/pipes/my-matches.pipe";
import { MatchHistoryComponent } from './match-history/match-history.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailComponent,
    NewGameComponent,
    TileComponent,
    PlayGameComponent,
    MyGamesPipe,
    MyMatchesPipe,
    ToastComponent,
    GameMatchesComponent,
    MatchHistoryComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [GameService, UserService, TemplateService, ToastService,TileService,SocketService, MyGamesPipe, MyMatchesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
