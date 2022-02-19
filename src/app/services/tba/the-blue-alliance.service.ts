import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TbaEvent, TbaSimpleMatch, TbaSimpleTeam} from './the-blue-alliance.types';

const BASE_URL = 'https://www.thebluealliance.com/api/v3';
const AUTH_KEY_NAME = 'X-TBA-Auth-Key';
const AUTH_KEY_VAL = 'oQZ3WEhD8dmZ2UeKg9uFxo4z06q7jh4ARMWTXXy1Z7qBZ2yNktLp1sbn3siCFBKN';

const CURRENT_YEAR = '2022';

const headers = () => {
  return { headers: new HttpHeaders({ 'X-TBA-Auth-Key': AUTH_KEY_VAL} ) };
};

@Injectable({ providedIn: 'root' })
export class TheBlueAllianceService {

  constructor(private readonly http: HttpClient) { }

  getEventsByYear(year: string): Observable<TbaEvent[]> {
    return this.http.get<TbaEvent[]>(`${BASE_URL}/events/${year}`, headers());
  }

  // convenience method to get this year's events
  getEvents(): Observable<TbaEvent[]> {
    return this.getEventsByYear(CURRENT_YEAR);
  }

  getEventByKey(eventKey: string): Observable<TbaEvent> {
    return this.http.get<TbaEvent>(`${BASE_URL}/event/${eventKey}`, headers());
  }

  getTeamsAtEvent(eventKey: string): Observable<TbaSimpleTeam[]> {
    return this.http.get<TbaSimpleTeam[]>(`${BASE_URL}/event/${eventKey}/teams/simple`, headers());
  }

  getMatchesAtEvent(eventKey: string): Observable<TbaSimpleMatch[]> {
    return this.http.get<TbaSimpleMatch[]>(`${BASE_URL}/event/${eventKey}/matches/simple`, headers());
  }

}
