import { TestBed } from '@angular/core/testing';

import { EventSelectorService } from './event-selector.service';

describe('EventSelectorService', () => {
  let service: EventSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
