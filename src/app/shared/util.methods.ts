import { EventTeam } from '../services/firebase/event-teams.service';
import { regionNameToAbbr } from './regions.utils';

export function teamKeyToNum(tmKey: string): number {
  return parseInt(tmKey.slice(3), 10);
}

// Note - this function is very NE District dependent and probably quite fragile
export function shortenEventName(eventName: string): string {
  const startIndex = eventName.startsWith('NE District ') ?
    'NE District '.length :
    eventName.startsWith('NE District ') ? 'New England FIRST '.length : 0;
  const endIndex = eventName.endsWith(' Event') ?
    eventName.length - ' Event'.length :
    eventName.length;
  return eventName.substring(startIndex, endIndex);
}

export function eventKeyFromMatchId(matchId: string): string {
  const underscorePos = matchId.indexOf('_');
  return matchId.substring(0, underscorePos);
}

export function matchNumFromMatchId(matchId: string): string {
  const underscorePos = matchId.indexOf('_');
  return matchId.slice(underscorePos + 3); // assume _qm for qual match
}

export function getLocation(team?: EventTeam): string {
  return !!team ? `${ team.city }, ${ regionNameToAbbr(team.state_prov) }` : '';
}
