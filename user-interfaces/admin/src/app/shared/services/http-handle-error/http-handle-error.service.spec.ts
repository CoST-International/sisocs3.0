import { TestBed } from '@angular/core/testing';

import { HttpHandleErrorService } from './http-handle-error.service';

describe('HttpHandleErrorService', () => {
  let service: HttpHandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
