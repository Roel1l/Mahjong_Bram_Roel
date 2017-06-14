import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameComponent } from './new-game.component';
import { FormsModule } from '@angular/forms';
import { configureTests } from '../core/tests.configure';
import { AppModule } from '../app.module';

describe('NewGameComponent', () => {
  let component: NewGameComponent;
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(NewGameComponent);
      fixture.detectChanges();
      done();
    });
  });
  it('should create', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
