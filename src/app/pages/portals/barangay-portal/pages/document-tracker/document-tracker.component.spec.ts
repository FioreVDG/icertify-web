import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTrackerComponent } from './document-tracker.component';

describe('DocumentTrackerComponent', () => {
  let component: DocumentTrackerComponent;
  let fixture: ComponentFixture<DocumentTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
