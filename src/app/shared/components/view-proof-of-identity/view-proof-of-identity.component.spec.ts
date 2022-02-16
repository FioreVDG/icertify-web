import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProofOfIdentityComponent } from './view-proof-of-identity.component';

describe('ViewProofOfIdentityComponent', () => {
  let component: ViewProofOfIdentityComponent;
  let fixture: ComponentFixture<ViewProofOfIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProofOfIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProofOfIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
