import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAgreementComponent } from './modify-agreement.component';

describe('ModifyAgreementComponent', () => {
  let component: ModifyAgreementComponent;
  let fixture: ComponentFixture<ModifyAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
