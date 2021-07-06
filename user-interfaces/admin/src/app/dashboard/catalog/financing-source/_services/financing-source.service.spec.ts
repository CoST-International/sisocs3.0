import { TestBed } from '@angular/core/testing';

import { FinancingSourceService } from './financing-source.service';

describe('FinancingSourceService', () => {
  let service: FinancingSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancingSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
