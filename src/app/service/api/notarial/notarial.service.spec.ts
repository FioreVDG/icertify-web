import { TestBed } from '@angular/core/testing';

import { NotarialService } from './notarial.service';

describe('NotarialService', () => {
  let service: NotarialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotarialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
