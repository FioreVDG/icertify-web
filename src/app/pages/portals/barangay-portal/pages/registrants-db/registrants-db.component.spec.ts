import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantsDbComponent } from './registrants-db.component';

describe('RegistrantsDbComponent', () => {
  let component: RegistrantsDbComponent;
  let fixture: ComponentFixture<RegistrantsDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrantsDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
