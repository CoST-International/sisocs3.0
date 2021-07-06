import { TestBed } from '@angular/core/testing';

import { TenderOffererService } from './tender-offerer.service';

describe('TenderOffererService', () => {
  let service: TenderOffererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderOffererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
