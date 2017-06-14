import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from "app/app.module";
import { configureTests } from "app/core/tests.configure";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(AppComponent);
      fixture.detectChanges();
      done();
    });

  });

     it('should create', async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
});