//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToasterModule, ToasterService} from 'angular2-toaster';

//Components
import { AppComponent } from './app/app.component';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameComponent } from './new-game/new-game.component';

//Services
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { TemplateService } from './services/game-template.service';
import { ToastService } from './services/toast.service'; //Custom toasterservice with configured toast
import { TileService } from './services/tile.service';
//RoutingModule
import { AppRoutingModule } from './app-routing.module';
import { TileComponent } from './tile/tile.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { MyGamesPipe } from "app/pipes/my-games.pipe";


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailComponent,
    NewGameComponent,
    TileComponent,
    PlayGameComponent,
    MyGamesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToasterModule

  ],
  providers: [GameService, UserService, TemplateService, ToasterService,ToastService,TileService, MyGamesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
