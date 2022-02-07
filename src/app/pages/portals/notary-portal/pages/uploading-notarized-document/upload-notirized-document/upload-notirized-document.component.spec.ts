import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNotirizedDocumentComponent } from './upload-notirized-document.component';

describe('UploadNotirizedDocumentComponent', () => {
  let component: UploadNotirizedDocumentComponent;
  let fixture: ComponentFixture<UploadNotirizedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadNotirizedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNotirizedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
