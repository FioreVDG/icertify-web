import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingNotarizedDocumentComponent } from './uploading-notarized-document.component';

describe('UploadingNotarizedDocumentComponent', () => {
  let component: UploadingNotarizedDocumentComponent;
  let fixture: ComponentFixture<UploadingNotarizedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadingNotarizedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingNotarizedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
