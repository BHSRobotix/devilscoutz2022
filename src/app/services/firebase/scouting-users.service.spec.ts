import { TestBed } from '@angular/core/testing';

import { ScoutingUsersService } from './scouting-users.service';

describe('ScoutingUsersService', () => {
  let service: ScoutingUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoutingUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
