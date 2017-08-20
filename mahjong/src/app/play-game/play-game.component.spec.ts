import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//Components
import { PlayGameComponent } from './play-game.component';
import { TileComponent } from "app/tile/tile.component";
import { ScoreboardComponent } from "app/scoreboard/scoreboard.component";
import { GameMatchesComponent } from "app/game-matches/game-matches.component";

//Modules
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";

//Services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";
import { TileService } from "app/services/tile.service";
import { MyMatchesPipe } from "app/pipes/my-matches.pipe";

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      declarations: [PlayGameComponent,MyMatchesPipe, TileComponent, ScoreboardComponent, GameMatchesComponent],
      providers: [GameService, UserService,ToastService,SocketService,TileService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
