import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReleasingToCourierComponent } from './document-releasing-to-courier.component';

describe('DocumentReleasingToCourierComponent', () => {
  let component: DocumentReleasingToCourierComponent;
  let fixture: ComponentFixture<DocumentReleasingToCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReleasingToCourierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReleasingToCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
