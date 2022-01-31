import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayVideoConferencingComponent } from './barangay-video-conferencing.component';

describe('BarangayVideoConferencingComponent', () => {
  let component: BarangayVideoConferencingComponent;
  let fixture: ComponentFixture<BarangayVideoConferencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayVideoConferencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayVideoConferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
