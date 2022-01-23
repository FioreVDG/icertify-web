import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchFolderComponent } from './batch-folder.component';

describe('BatchFolderComponent', () => {
  let component: BatchFolderComponent;
  let fixture: ComponentFixture<BatchFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
