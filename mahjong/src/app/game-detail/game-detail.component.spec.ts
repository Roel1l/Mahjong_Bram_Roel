//Components
import { GameDetailComponent } from "app/game-detail/game-detail.component";

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

//Services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";


describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule],
      declarations: [ GameDetailComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            parent: { params: Observable.of({ id: 'test' })}
          }
        },
        GameService, UserService,ToastService,SocketService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
