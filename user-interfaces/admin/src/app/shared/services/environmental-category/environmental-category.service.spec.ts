import { TestBed } from '@angular/core/testing';

import { EnvironmentalCategoryService } from './environmental-category.service';

describe('EnvironmentalCategoryService', () => {
  let service: EnvironmentalCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentalCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
