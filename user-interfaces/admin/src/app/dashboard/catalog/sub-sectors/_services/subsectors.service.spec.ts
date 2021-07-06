import { TestBed } from '@angular/core/testing';

import { SubsectorsService } from './subsectors.service';

describe('SubsectorsService', () => {
  let service: SubsectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
