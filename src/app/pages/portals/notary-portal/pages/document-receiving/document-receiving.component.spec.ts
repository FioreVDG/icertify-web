import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReceivingComponent } from './document-receiving.component';

describe('DocumentReceivingComponent', () => {
  let component: DocumentReceivingComponent;
  let fixture: ComponentFixture<DocumentReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
