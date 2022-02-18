import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleTableComponent } from './access-role-table.component';

describe('AccessRoleTableComponent', () => {
  let component: AccessRoleTableComponent;
  let fixture: ComponentFixture<AccessRoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
