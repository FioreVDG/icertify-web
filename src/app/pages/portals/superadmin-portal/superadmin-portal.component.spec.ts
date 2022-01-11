import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminPortalComponent } from './superadmin-portal.component';

describe('SuperadminPortalComponent', () => {
  let component: SuperadminPortalComponent;
  let fixture: ComponentFixture<SuperadminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
