import { TestBed } from '@angular/core/testing';

import { AwardMethodService } from './award-method.service';

describe('AwardMethodService', () => {
  let service: AwardMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
