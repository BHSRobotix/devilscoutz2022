import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

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
}
