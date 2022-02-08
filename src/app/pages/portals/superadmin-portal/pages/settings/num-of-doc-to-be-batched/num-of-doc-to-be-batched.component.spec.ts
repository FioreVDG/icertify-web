import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumOfDocToBeBatchedComponent } from './num-of-doc-to-be-batched.component';

describe('NumOfDocToBeBatchedComponent', () => {
  let component: NumOfDocToBeBatchedComponent;
  let fixture: ComponentFixture<NumOfDocToBeBatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumOfDocToBeBatchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumOfDocToBeBatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
