import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGameComponent } from './play-game.component';
import { configureTests } from "app/core/tests.configure";
import { AppModule } from "app/app.module";

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(PlayGameComponent);
      fixture.detectChanges();
      done();
    });
  });
  it('should create', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});