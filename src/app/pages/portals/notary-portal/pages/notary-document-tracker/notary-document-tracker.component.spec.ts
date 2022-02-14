import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryDocumentTrackerComponent } from './notary-document-tracker.component';

describe('NotaryDocumentTrackerComponent', () => {
  let component: NotaryDocumentTrackerComponent;
  let fixture: ComponentFixture<NotaryDocumentTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryDocumentTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryDocumentTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
