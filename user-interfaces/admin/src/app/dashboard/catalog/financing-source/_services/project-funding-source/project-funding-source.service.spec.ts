import { TestBed } from '@angular/core/testing';

import { ProjectFundingSourceService } from './project-funding-source.service';

describe('ProjectFundingSourceService', () => {
  let service: ProjectFundingSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFundingSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
