import { TestBed } from '@angular/core/testing';

import { IsCEDGuard } from './is-ced.guard';

describe('IsCEDGuard', () => {
  let guard: IsCEDGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCEDGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
