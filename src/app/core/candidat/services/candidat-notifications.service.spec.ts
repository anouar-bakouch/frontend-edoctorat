import { TestBed } from '@angular/core/testing';

import { CandidatNotificationsService } from './candidat-notifications.service';

describe('CandidatNotificationsService', () => {
  let service: CandidatNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
