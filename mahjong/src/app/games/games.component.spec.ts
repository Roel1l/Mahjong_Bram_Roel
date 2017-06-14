import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { AppModule } from "app/app.module";
import { configureTests } from "app/core/tests.configure";

describe('GamesComponent', () => {
 let component: GamesComponent;
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(GamesComponent);
      fixture.detectChanges();
      done();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});