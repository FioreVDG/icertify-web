import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarialComponent } from './notarial.component';

describe('NotarialComponent', () => {
  let component: NotarialComponent;
  let fixture: ComponentFixture<NotarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
