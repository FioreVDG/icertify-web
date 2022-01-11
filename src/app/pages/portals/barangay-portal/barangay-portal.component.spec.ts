import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayPortalComponent } from './barangay-portal.component';

describe('BarangayPortalComponent', () => {
  let component: BarangayPortalComponent;
  let fixture: ComponentFixture<BarangayPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
