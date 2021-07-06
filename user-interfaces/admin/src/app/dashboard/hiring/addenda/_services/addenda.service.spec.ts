import { TestBed } from '@angular/core/testing';

import { AddendaService } from './addenda.service';

describe('AddendaService', () => {
  let service: AddendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
