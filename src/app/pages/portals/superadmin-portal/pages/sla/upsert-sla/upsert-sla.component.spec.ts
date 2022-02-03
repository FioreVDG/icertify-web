import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertSlaComponent } from './upsert-sla.component';

describe('UpsertSlaComponent', () => {
  let component: UpsertSlaComponent;
  let fixture: ComponentFixture<UpsertSlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertSlaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
