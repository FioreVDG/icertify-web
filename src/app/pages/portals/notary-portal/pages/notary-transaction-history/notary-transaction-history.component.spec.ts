import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryTransactionHistoryComponent } from './notary-transaction-history.component';

describe('NotaryTransactionHistoryComponent', () => {
  let component: NotaryTransactionHistoryComponent;
  let fixture: ComponentFixture<NotaryTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
