import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTrackerTableComponent } from './document-tracker-table.component';

describe('DocumentTrackerTableComponent', () => {
  let component: DocumentTrackerTableComponent;
  let fixture: ComponentFixture<DocumentTrackerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTrackerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTrackerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
