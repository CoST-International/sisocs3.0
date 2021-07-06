import { TestBed } from '@angular/core/testing';

import { PurposesService } from './purposes.service';

describe('PurposesService', () => {
  let service: PurposesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurposesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
