import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarialTableComponent } from './notarial-table.component';

describe('NotarialTableComponent', () => {
  let component: NotarialTableComponent;
  let fixture: ComponentFixture<NotarialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
