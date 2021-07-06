import { TestBed } from '@angular/core/testing';

import { AdvancesService } from './advances.service';

describe('AdvancesService', () => {
  let service: AdvancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
