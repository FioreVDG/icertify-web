import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayTransactionHistoryComponent } from './barangay-transaction-history.component';

describe('BarangayTransactionHistoryComponent', () => {
  let component: BarangayTransactionHistoryComponent;
  let fixture: ComponentFixture<BarangayTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
