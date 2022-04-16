import { TestBed } from '@angular/core/testing';

import { IsDPoleGuard } from './is-dpole.guard';

describe('IsDPoleGuard', () => {
  let guard: IsDPoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsDPoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
