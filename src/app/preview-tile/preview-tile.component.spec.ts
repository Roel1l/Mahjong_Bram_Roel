import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTileComponent } from './preview-tile.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastService } from "app/services/toast.service";

describe('PreviewTileComponent', () => {
  let component: PreviewTileComponent;
  let fixture: ComponentFixture<PreviewTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpModule],
      declarations: [ PreviewTileComponent ],
      providers: [ToastService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
