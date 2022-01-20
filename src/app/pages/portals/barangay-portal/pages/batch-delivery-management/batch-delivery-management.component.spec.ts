import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDeliveryManagementComponent } from './batch-delivery-management.component';

describe('BatchDeliveryManagementComponent', () => {
  let component: BatchDeliveryManagementComponent;
  let fixture: ComponentFixture<BatchDeliveryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDeliveryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDeliveryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
