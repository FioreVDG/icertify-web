import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrgyRoomComponent } from './brgy-room.component';

describe('BrgyRoomComponent', () => {
  let component: BrgyRoomComponent;
  let fixture: ComponentFixture<BrgyRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrgyRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrgyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
