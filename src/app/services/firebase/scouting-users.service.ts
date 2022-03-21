import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

export interface SimpleScoutingUser {
  uid: string;
  nickname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoutingUsersService {

  constructor(private firestore: AngularFirestore) { }

  getScoutingUser(uid: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('scoutingUsers',
      ref => ref
        .where('uid', '==', uid)
    ).get();
  }
}
