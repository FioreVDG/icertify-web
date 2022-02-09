import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertClusterComponent } from './upsert-cluster.component';

describe('UpsertClusterComponent', () => {
  let component: UpsertClusterComponent;
  let fixture: ComponentFixture<UpsertClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertClusterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
