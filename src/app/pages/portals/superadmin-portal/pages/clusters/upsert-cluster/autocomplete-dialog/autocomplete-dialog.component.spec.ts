import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDialogComponent } from './autocomplete-dialog.component';

describe('AutocompleteDialogComponent', () => {
  let component: AutocompleteDialogComponent;
  let fixture: ComponentFixture<AutocompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
