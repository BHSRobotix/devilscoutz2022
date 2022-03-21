import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { AuthService, ScoutingUser } from '../auth/auth.service';

export interface SimpleScoutingUser {
  uid: string;
  nickname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoutingUsersService {

  constructor(private firestore: AngularFirestore,
              private auth: AuthService) { }

  getScoutingUser(uid: string): Observable<QuerySnapshot<unknown>> {
    return this.firestore.collection('scoutingUsers',
      ref => ref
        .where('uid', '==', uid)
    ).get();
  }

  updateNickname(uid: string, newNickname: string): void {
    // TODO - would be nice to know if this is really working - an observable response should be done
    this.firestore.collection('scoutingUsers',
      ref => ref
        .where('uid', '==', uid)
    ).get().subscribe(
      snapshot => {
        if (snapshot.empty) {
          const newFields: Partial<ScoutingUser> = {
            uid,
            nickname: newNickname,
            role: 'scout'
          };
          this.firestore.collection('scoutingUsers').add(newFields)
            .then(() => {
              this.auth.updateUser(newFields);
            });
        } else {
          snapshot.forEach((foundDoc) => {
            // There should be only one but I guess this will update the last one
            const newFields: Partial<ScoutingUser> = {
              nickname: newNickname
            };
            this.firestore.collection('scoutingUsers').doc(foundDoc.id).update(newFields)
              .then(() => {
                this.auth.updateUser(newFields);
              });
          });
        }
      });
  }
}
