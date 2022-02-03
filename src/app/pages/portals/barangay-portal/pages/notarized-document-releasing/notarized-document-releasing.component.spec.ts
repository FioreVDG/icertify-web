import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarizedDocumentReleasingComponent } from './notarized-document-releasing.component';

describe('NotarizedDocumentReleasingComponent', () => {
  let component: NotarizedDocumentReleasingComponent;
  let fixture: ComponentFixture<NotarizedDocumentReleasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarizedDocumentReleasingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarizedDocumentReleasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
