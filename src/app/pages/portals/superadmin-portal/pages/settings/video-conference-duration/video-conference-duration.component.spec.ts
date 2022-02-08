import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenceDurationComponent } from './video-conference-duration.component';

describe('VideoConferenceDurationComponent', () => {
  let component: VideoConferenceDurationComponent;
  let fixture: ComponentFixture<VideoConferenceDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoConferenceDurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConferenceDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
