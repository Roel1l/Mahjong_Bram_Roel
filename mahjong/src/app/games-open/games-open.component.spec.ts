//Components
import { GamesOpenComponent } from './games-open.component';
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

describe('GamesOpenComponent', () => {
  let component: GamesOpenComponent;
  let fixture: ComponentFixture<GamesOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule, FormsModule ],
      declarations: [ GamesOpenComponent, MyGamesPipe ],
      providers: [GameService, UserService,TemplateService, ToastService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
