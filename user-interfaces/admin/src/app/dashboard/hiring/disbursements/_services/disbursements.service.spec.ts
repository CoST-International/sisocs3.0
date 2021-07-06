import { TestBed } from '@angular/core/testing';

import { DisbursementsService } from './disbursements.service';

describe('DisbursementsService', () => {
  let service: DisbursementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisbursementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
