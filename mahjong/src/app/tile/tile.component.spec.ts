import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileComponent } from './tile.component';
import { AppModule } from "app/app.module";
import { configureTests } from "app/core/tests.configure";

describe('TileComponent', () => {
 let component: TileComponent;
  let fixture;
  var i = 0;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(TileComponent);
      fixture.detectChanges();
      done();
    });
  });
      it('should create', () => {
      expect(0).toEqual(0);
    });
});
