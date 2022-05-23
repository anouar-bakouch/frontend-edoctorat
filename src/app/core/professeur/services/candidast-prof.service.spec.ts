import { TestBed } from '@angular/core/testing';

import { CandidastProfService } from './candidast-prof.service';

describe('CandidastProfService', () => {
  let service: CandidastProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidastProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
