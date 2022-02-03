import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarizedDocumentReceivingComponent } from './notarized-document-receiving.component';

describe('NotarizedDocumentReceivingComponent', () => {
  let component: NotarizedDocumentReceivingComponent;
  let fixture: ComponentFixture<NotarizedDocumentReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarizedDocumentReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarizedDocumentReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
