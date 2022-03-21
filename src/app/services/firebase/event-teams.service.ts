import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { TbaTeam } from '../tba/the-blue-alliance.types';

export interface EventTeam extends TbaTeam {
  eventKey?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventTeamsService {

  constructor(private firestore: AngularFirestore) { }

  getTeamsAtEvent(eventKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('eventTeams',
      ref => ref
        .where('eventKey', '==', eventKey)
    ).get();
  }

  getEventsForTeam(teamNumber: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('eventTeams',
      ref => ref
        // convert to number for query
        .where('team_number', '==', parseInt(teamNumber, 10))
    ).get();
  }

}
