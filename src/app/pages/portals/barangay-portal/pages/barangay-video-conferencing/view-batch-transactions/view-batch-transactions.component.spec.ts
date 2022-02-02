import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatchTransactionsComponent } from './view-batch-transactions.component';

describe('ViewBatchTransactionsComponent', () => {
  let component: ViewBatchTransactionsComponent;
  let fixture: ComponentFixture<ViewBatchTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBatchTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatchTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
