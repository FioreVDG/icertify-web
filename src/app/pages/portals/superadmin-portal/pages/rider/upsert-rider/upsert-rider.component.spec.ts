import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertRiderComponent } from './upsert-rider.component';

describe('UpsertRiderComponent', () => {
  let component: UpsertRiderComponent;
  let fixture: ComponentFixture<UpsertRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertRiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
