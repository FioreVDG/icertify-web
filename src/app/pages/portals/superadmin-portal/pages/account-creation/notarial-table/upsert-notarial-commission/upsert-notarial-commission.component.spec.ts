import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertNotarialCommissionComponent } from './upsert-notarial-commission.component';

describe('UpsertNotarialCommissionComponent', () => {
  let component: UpsertNotarialCommissionComponent;
  let fixture: ComponentFixture<UpsertNotarialCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertNotarialCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertNotarialCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
