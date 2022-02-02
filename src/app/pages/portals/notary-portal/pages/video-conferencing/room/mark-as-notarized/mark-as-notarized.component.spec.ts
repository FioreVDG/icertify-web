import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsNotarizedComponent } from './mark-as-notarized.component';

describe('MarkAsNotarizedComponent', () => {
  let component: MarkAsNotarizedComponent;
  let fixture: ComponentFixture<MarkAsNotarizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAsNotarizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAsNotarizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
