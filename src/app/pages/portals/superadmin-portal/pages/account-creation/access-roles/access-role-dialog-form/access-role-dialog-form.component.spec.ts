import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleDialogFormComponent } from './access-role-dialog-form.component';

describe('AccessRoleDialogFormComponent', () => {
  let component: AccessRoleDialogFormComponent;
  let fixture: ComponentFixture<AccessRoleDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleDialogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRoleDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
