import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({ providedIn: 'root' })
export class MatchesService {

  constructor(private firestore: AngularFirestore) { }

  getTeamMatchesFromEvent(teamKey: string, eventKey: string, qualsOnly = true): Observable<QuerySnapshot<unknown>[]> {
    // Because I can't figure out how to do a Firebase logical OR in the "where" clause,
    // instead we do two queries and return the forkJoin of them
    const observables: Observable<any>[] = [];
    const compLevelWhereOp = qualsOnly ? '==' : '!=';
    const compLevelWhereVal = qualsOnly ? 'qm' : '';
    observables.push(this.firestore.collection('matches',
        ref => ref
          .where('event_key', '==', eventKey)
          .where('alliances.blue.team_keys', 'array-contains', `frc${ teamKey }`)
          .where('comp_level', compLevelWhereOp, compLevelWhereVal)
      ).get());
    observables.push(this.firestore.collection('matches',
        ref => ref
          .where('event_key', '==', eventKey)
          .where('alliances.red.team_keys', 'array-contains', `frc${ teamKey}`)
          .where('comp_level', compLevelWhereOp, compLevelWhereVal)
      ).get());

    return forkJoin(observables);
  }

  getQualificationMatchesFromEvent(eventKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('matches',
      ref => ref
        .where('event_key', '==', eventKey)
        .where('comp_level', '==', 'qm')
    ).get();
  }

}
