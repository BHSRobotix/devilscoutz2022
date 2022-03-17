import { TestBed } from '@angular/core/testing';

import { EventTeamsService } from './event-teams.service';

describe('EventTeamsService', () => {
  let service: EventTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
