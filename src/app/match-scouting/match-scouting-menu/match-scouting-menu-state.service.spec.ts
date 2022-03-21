import { TestBed } from '@angular/core/testing';

import { MatchScoutingMenuStateService } from './match-scouting-menu-state.service';

describe('MatchScoutingMenuStateService', () => {
  let service: MatchScoutingMenuStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchScoutingMenuStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
