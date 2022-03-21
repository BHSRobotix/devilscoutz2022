import { Injectable } from '@angular/core';
import { TbaSimpleMatch } from '../../services/tba/the-blue-alliance.types';

@Injectable({
  providedIn: 'root'
})
export class MatchScoutingMenuStateService {

  lastMatchScouted = 0;
  viewMatches = 'all';

  matches: { [key: string]: TbaSimpleMatch[] } = { };

  constructor() { }
}
