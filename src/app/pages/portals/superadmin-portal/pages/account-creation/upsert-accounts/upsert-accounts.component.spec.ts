import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAccountsComponent } from './upsert-accounts.component';

describe('UpsertAccountsComponent', () => {
  let component: UpsertAccountsComponent;
  let fixture: ComponentFixture<UpsertAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
