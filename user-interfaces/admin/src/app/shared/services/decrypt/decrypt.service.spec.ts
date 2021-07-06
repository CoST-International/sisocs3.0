import { TestBed } from '@angular/core/testing';

import { DecryptService } from './decrypt.service';

describe('DecryptService', () => {
  let service: DecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
