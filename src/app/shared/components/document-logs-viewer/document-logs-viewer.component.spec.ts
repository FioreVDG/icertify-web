import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLogsViewerComponent } from './document-logs-viewer.component';

describe('DocumentLogsViewerComponent', () => {
  let component: DocumentLogsViewerComponent;
  let fixture: ComponentFixture<DocumentLogsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentLogsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentLogsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
