import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigningBarangayToRiderComponent } from './assigning-barangay-to-rider.component';

describe('AssigningBarangayToRiderComponent', () => {
  let component: AssigningBarangayToRiderComponent;
  let fixture: ComponentFixture<AssigningBarangayToRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigningBarangayToRiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigningBarangayToRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
