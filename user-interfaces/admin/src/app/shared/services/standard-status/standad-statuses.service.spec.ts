import { TestBed } from '@angular/core/testing';

import { StandadStatusesService } from './standad-statuses.service';

describe('StandadStatusesService', () => {
  let service: StandadStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandadStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
