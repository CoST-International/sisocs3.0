import { TestBed } from '@angular/core/testing';

import { PrequalificationService } from './prequalification.service';

describe('PrequalificationService', () => {
  let service: PrequalificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrequalificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
