import { TestBed } from '@angular/core/testing';

import { AcquisitionsService } from './acquisitions.service';

describe('AcquisitionsService', () => {
  let service: AcquisitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquisitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
