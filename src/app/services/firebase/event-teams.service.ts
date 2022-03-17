import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
}
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import { TbaSimpleEvent, TbaSimpleTeam } from '../tba/the-blue-alliance.types';

@Injectable({
  providedIn: 'root'
})
export class EventTeamsService {

  constructor(private firestore: AngularFirestore) { }

  getTeamsAtEvent(eventKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('eventTeams',
      ref => ref
        .where('eventkey', '==', eventKey)
    ).get();
  }

}
