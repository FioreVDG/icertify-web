import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtVideoComponent } from './rt-video.component';

describe('RtVideoComponent', () => {
  let component: RtVideoComponent;
  let fixture: ComponentFixture<RtVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
