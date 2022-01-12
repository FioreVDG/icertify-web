import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBarangayComponent } from './select-barangay.component';

describe('SelectBarangayComponent', () => {
  let component: SelectBarangayComponent;
  let fixture: ComponentFixture<SelectBarangayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBarangayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
