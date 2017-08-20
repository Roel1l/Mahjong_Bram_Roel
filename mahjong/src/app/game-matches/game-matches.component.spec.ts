//Components
import { GameMatchesComponent } from './game-matches.component';

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "app/app-routing.module";
import { RouterTestingModule } from "@angular/router/testing";

//services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";

//Pipes
import { MyMatchesPipe } from "app/pipes/my-matches.pipe";
import { TileService } from "app/services/tile.service";



describe('GameMatchesComponent', () => {
  let component: GameMatchesComponent;
  let fixture: ComponentFixture<GameMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule],
      declarations: [ GameMatchesComponent,MyMatchesPipe],
      providers: [GameService, UserService,ToastService,SocketService,TileService] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
