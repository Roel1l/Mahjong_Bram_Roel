import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailComponent } from './game-detail.component';
import { AppModule } from "app/app.module";
import { configureTests } from "app/core/tests.configure";

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(GameDetailComponent);
      fixture.detectChanges();
      done();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
