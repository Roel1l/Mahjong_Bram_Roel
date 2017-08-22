//Components
import { GamesPlayingComponent } from './games-playing.component';
import { MyGamesPipe } from "app/pipes/my-games.pipe";

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';

//Services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { TemplateService } from "app/services/game-template.service";
import { SocketService } from "app/services/socket.service";
import { ToastService } from "app/services/toast.service";

describe('GamesPlayingComponent', () => {
  let component: GamesPlayingComponent;
  let fixture: ComponentFixture<GamesPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule, FormsModule ],
      declarations: [ GamesPlayingComponent, MyGamesPipe ],
      providers: [GameService, UserService,TemplateService, ToastService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
