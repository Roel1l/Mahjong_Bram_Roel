import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesOpenComponent } from './games-open.component';

describe('GamesOpenComponent', () => {
  let component: GamesOpenComponent;
  let fixture: ComponentFixture<GamesOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesOpenComponent ]
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
