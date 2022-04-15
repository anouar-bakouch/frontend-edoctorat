import { TestBed } from '@angular/core/testing';

import { IsCandidatGuard } from './is-candidat.guard';

describe('IsCandidatGuard', () => {
  let guard: IsCandidatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCandidatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
