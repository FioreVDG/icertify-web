import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryPortalComponent } from './notary-portal.component';

describe('NotaryPortalComponent', () => {
  let component: NotaryPortalComponent;
  let fixture: ComponentFixture<NotaryPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
