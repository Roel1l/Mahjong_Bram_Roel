import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMatchesComponent } from './game-matches.component';

describe('GameMatchesComponent', () => {
  let component: GameMatchesComponent;
  let fixture: ComponentFixture<GameMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMatchesComponent ]
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
