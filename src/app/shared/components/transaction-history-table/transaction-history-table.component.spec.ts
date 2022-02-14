import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryTableComponent } from './transaction-history-table.component';

describe('TransactionHistoryTableComponent', () => {
  let component: TransactionHistoryTableComponent;
  let fixture: ComponentFixture<TransactionHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
