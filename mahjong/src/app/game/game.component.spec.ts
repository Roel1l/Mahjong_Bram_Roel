//Components
import { GameComponent } from './game.component';

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";

//services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";
import { TemplateService } from "app/services/game-template.service";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      declarations: [GameComponent],
      providers: [GameService, UserService, ToastService, SocketService, TemplateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
