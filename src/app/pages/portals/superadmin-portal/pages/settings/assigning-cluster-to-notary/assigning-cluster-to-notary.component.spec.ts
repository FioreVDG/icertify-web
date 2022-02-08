import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigningClusterToNotaryComponent } from './assigning-cluster-to-notary.component';

describe('AssigningClusterToNotaryComponent', () => {
  let component: AssigningClusterToNotaryComponent;
  let fixture: ComponentFixture<AssigningClusterToNotaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigningClusterToNotaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigningClusterToNotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
