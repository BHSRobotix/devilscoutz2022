import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { forkJoin, from, Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { eventKeyFromMatchId } from '../../shared/util.methods';

const CURRENT_PERFORMANCE_VERSION: PerformanceVersion = 'v1';
export type PerformanceVersion = 'v1';
export type ClimbLevel = 'none' | 'low' | 'medium' | 'high' | 'traversal';

export interface ScoutedPerformance {
  autoTaxi: boolean;
  autoHighGoalsScored: number;
  autoLowGoalsScored: number;
  teleHighGoalsScored: number;
  teleLowGoalsScored: number;
  climbLevel: ClimbLevel;
  matchId: string;
  scoutId: string;
  team: string;  // just the number but as a string
}

export interface StoredPerformance extends ScoutedPerformance {
  eventKey: string; // firebase query limitations forced adding this
  version: PerformanceVersion;
}

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  constructor(private firestore: AngularFirestore) { }

  postScoutingReport(scoutedPerf: ScoutedPerformance): Observable<DocumentReference<unknown>> {
    const perf: StoredPerformance = {
      ...scoutedPerf,
      eventKey: eventKeyFromMatchId(scoutedPerf.matchId),
      version: CURRENT_PERFORMANCE_VERSION };
    return from(this.firestore.collection('performances').add(perf));
  }

  getScoutingReportsForTeamAtEvent(teamNum: string, eventKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('performances',
      ref => ref
        .where('eventKey', '==', eventKey)
        .where('team', '==', teamNum)
    ).get();
  }

  getScoutingReportsForEvent(eventKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('performances',
      ref => ref
        .where('eventKey', '==', eventKey)
    ).get();
  }

}
