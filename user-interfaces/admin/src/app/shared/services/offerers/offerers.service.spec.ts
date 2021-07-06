import { TestBed } from '@angular/core/testing';

import { OfferersService } from './offerers.service';

describe('OfferersService', () => {
  let service: OfferersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
