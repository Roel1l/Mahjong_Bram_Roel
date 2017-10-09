//Components
import { GamesFinishedComponent } from './games-finished.component';
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

describe('GamesFinishedComponent', () => {
  let component: GamesFinishedComponent;
  let fixture: ComponentFixture<GamesFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule, FormsModule ],
      declarations: [ GamesFinishedComponent, MyGamesPipe ],
      providers: [GameService, UserService,TemplateService, ToastService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
