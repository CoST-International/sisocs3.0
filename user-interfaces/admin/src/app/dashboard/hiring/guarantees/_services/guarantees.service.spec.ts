import { TestBed } from '@angular/core/testing';

import { GuaranteesService } from './guarantees.service';

describe('GuaranteesService', () => {
  let service: GuaranteesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
