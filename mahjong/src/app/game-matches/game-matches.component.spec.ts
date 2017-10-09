//Components
import { GameMatchesComponent } from './game-matches.component';

//Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

//services
import { GameService } from "app/services/game.service";
import { UserService } from "app/services/user.service";
import { ToastService } from "app/services/toast.service";
import { SocketService } from "app/services/socket.service";
import { TileService } from "app/services/tile.service";

//Pipes
import { MyMatchesPipe } from "app/pipes/my-matches.pipe";



describe('GameMatchesComponent', () => {
  let component: GameMatchesComponent;
  let fixture: ComponentFixture<GameMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule],
      declarations: [ GameMatchesComponent,MyMatchesPipe],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            parent: { params: Observable.of({ id: 'test' })}
          }
        },GameService, UserService,ToastService,SocketService,TileService] 
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
