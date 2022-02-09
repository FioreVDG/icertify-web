import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsEnrouteComponent } from './mark-as-enroute.component';

describe('MarkAsEnrouteComponent', () => {
  let component: MarkAsEnrouteComponent;
  let fixture: ComponentFixture<MarkAsEnrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAsEnrouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAsEnrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
