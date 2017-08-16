import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPlayingComponent } from './games-playing.component';

describe('GamesPlayingComponent', () => {
  let component: GamesPlayingComponent;
  let fixture: ComponentFixture<GamesPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesPlayingComponent ]
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
