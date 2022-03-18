import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchScoutingMenuStateService {

  lastMatchScouted = 0;
  viewMatches = 'all';

  constructor() { }
}
