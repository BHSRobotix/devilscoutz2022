import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import { TbaSimpleEvent, TbaTeam } from '../tba/the-blue-alliance.types';
import { EventTeam } from './event-teams.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // Keep a few observables around so we can save hits on Firestore
  querySnapshotObservableCache: { [key: string]: Observable<QuerySnapshot<unknown>> } = { };
  documentSnapshotObservableCache: { [key: string]: Observable<DocumentSnapshot<unknown>> } = { };

  constructor(private firestore: AngularFirestore) { }

  getEventsFromDistrict(districtKey: string): Observable<QuerySnapshot<unknown>> {
    const hashKey = `getEventsFromDistrict_${ districtKey }`;
    if (!this.querySnapshotObservableCache[hashKey]) {
      this.querySnapshotObservableCache[hashKey] = this.firestore.collection('events',
          ref => ref.where('district.abbreviation', '==', districtKey)).get();
    }
    return this.querySnapshotObservableCache[hashKey];
  }

  getEvents(): Observable<QuerySnapshot<unknown>> {
    if (!this.querySnapshotObservableCache['getEvents']) {
      this.querySnapshotObservableCache['getEvents'] = this.firestore.collection('events').get();
    }
    return this.querySnapshotObservableCache['getEvents'];
  }

  getEventByKey(eventKey: string): Observable<DocumentSnapshot<unknown>> {
    const hashKey = `getEventByKey_${ eventKey }`;
    if (!this.documentSnapshotObservableCache[hashKey]) {
      // This should work because the event key is being used as the docId
      this.documentSnapshotObservableCache[hashKey] =
        this.firestore.collection('events').doc(eventKey).get();
    }
    return this.documentSnapshotObservableCache[hashKey];
  }

  postEvents(events: TbaSimpleEvent[]): void {
    events.forEach((evt: TbaSimpleEvent) => {
      this.firestore.collection('events').doc(evt.key).set(evt)
        .catch(error => console.error(`Error saving ${ evt.key }`, error));
    });
  }

  postEventTeams(eventKey: string, teams: TbaTeam[]): void {
    teams.forEach((tm: TbaTeam) => {
      const doc: EventTeam = tm;
      doc.eventKey = eventKey;
      this.firestore.collection('eventTeams').doc(eventKey +'_'+tm.key).set(doc)
        .catch(error => console.error(`Error saving ${ doc.key }`, error));
    });
  }
}
