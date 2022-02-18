import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleFormComponent } from './access-role-form.component';

describe('AccessRoleFormComponent', () => {
  let component: AccessRoleFormComponent;
  let fixture: ComponentFixture<AccessRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
