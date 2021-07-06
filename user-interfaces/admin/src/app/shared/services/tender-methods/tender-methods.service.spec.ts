import { TestBed } from '@angular/core/testing';

import { TenderMethodsService } from './tender-methods.service';

describe('TenderMethodsService', () => {
  let service: TenderMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
