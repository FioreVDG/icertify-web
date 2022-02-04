import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentImageViewerComponent } from './document-image-viewer.component';

describe('DocumentImageViewerComponent', () => {
  let component: DocumentImageViewerComponent;
  let fixture: ComponentFixture<DocumentImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentImageViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
