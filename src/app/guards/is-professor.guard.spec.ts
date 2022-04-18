import { TestBed } from '@angular/core/testing';

import { IsProfessorGuard } from './is-professor.guard';

describe('IsProfessorGuard', () => {
  let guard: IsProfessorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsProfessorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
