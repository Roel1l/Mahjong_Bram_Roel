import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFinishedComponent } from './games-finished.component';

describe('GamesFinishedComponent', () => {
  let component: GamesFinishedComponent;
  let fixture: ComponentFixture<GamesFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesFinishedComponent ]
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
