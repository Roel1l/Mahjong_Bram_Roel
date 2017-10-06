//compileComponents
import { MatchHistoryComponent } from './match-history.component';
import { TileComponent } from "app/tile/tile.component";

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";

//services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";
import { TileService } from "app/services/tile.service";
import { MyMatchesPipe } from "app/pipes/my-matches.pipe";

describe('MatchHistoryComponent', () => {
  let component: MatchHistoryComponent;
  let fixture: ComponentFixture<MatchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule],
      declarations: [ MatchHistoryComponent , TileComponent, MyMatchesPipe],
      providers: [GameService, UserService,ToastService,SocketService,TileService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
