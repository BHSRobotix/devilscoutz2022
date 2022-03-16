import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import { TbaSimpleEvent } from '../tba/the-blue-alliance.types';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private firestore: AngularFirestore) { }

  getEventsFromDistrict(districtKey: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('events',
        ref => ref.where('district.abbreviation', '==', districtKey))
      .get();
  }

  getEvents(): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('events').get();
  }

  getEventByKey(eventKey: string): Observable<DocumentSnapshot<unknown>> {
    // This should work because the event key is being used as the docId
    return this.firestore.collection('events').doc(eventKey).get();
  }

  postEvents(events: TbaSimpleEvent[]): void {
    events.forEach((evt: TbaSimpleEvent) => {
      this.firestore.collection('events').doc(evt.key).set(evt)
        .catch(error => console.error(`Error saving ${ evt.key }`, error));
    });
  }
}
