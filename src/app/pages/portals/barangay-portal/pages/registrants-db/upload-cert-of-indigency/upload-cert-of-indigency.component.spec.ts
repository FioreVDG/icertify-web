import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertOfIndigencyComponent } from './upload-cert-of-indigency.component';

describe('UploadCertOfIndigencyComponent', () => {
  let component: UploadCertOfIndigencyComponent;
  let fixture: ComponentFixture<UploadCertOfIndigencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCertOfIndigencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCertOfIndigencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
