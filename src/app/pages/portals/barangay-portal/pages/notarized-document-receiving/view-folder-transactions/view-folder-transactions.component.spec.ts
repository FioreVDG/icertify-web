import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFolderTransactionsComponent } from './view-folder-transactions.component';

describe('ViewFolderTransactionsComponent', () => {
  let component: ViewFolderTransactionsComponent;
  let fixture: ComponentFixture<ViewFolderTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFolderTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFolderTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
