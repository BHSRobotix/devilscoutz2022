import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import UserCredential = firebase.auth.UserCredential;
import { getUnauthenticatedUser } from '../../shared/anonymizer.utils';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const userLocalStorageKey = '_dbtzScoutingUser';

// User is mostly fields that come with the Google auth object
// But 'authenticated' and 'guest' booleans do not come from Google
// but instead are derived here in code for business logic reasons
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  authenticated: boolean;
  guest: boolean;
}

// ScoutingUser adds two fields we intend to track in our own
// scouting database
export interface ScoutingUser extends User {
  nickname?: string;
  role?: 'guest' | 'scout' | 'lead-scout' | 'admin';
}

const EMPTY_USER: ScoutingUser = {
  uid: '', email: '', displayName: '', photoURL: '', emailVerified: false,
  authenticated: false, guest: true, role: 'guest'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: ScoutingUser;
  private user$: BehaviorSubject<ScoutingUser>;

  constructor(private fireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) {
    this.user = this.getUserFromLocalStorage();
    this.user$ = new BehaviorSubject<ScoutingUser>(this.user);
  }

  get isLoggedIn(): boolean {
    return this.user?.authenticated || (this.user?.guest && !!this.user?.uid);
  }

  get loggedInUser(): BehaviorSubject<ScoutingUser> {
    return this.user$;
  }

  doGoogleLogin(): Promise<any> {
    const provider: AuthProvider = new firebase.auth.GoogleAuthProvider();
    return this.fireAuth.signInWithPopup(provider)
      .then((cred: UserCredential) => {
        const user: ScoutingUser = {
          uid: cred.user?.uid || '',
          email: cred.user?.email || '',
          displayName: cred.user?.displayName || '',
          photoURL: cred.user?.photoURL || '',
          emailVerified: cred.user?.emailVerified || false,
          authenticated: true,
          guest: false,
          role: 'scout'  // start as a minimum of scout, let observable below update
        };
        this.user = user;
        this.user$.next(user);
        this.putUserIntoLocalStorage(user);

        // Go to Firebase scouting-users table to figure out what roles people have
        if (!!this.user.uid) {
          this.firestore.collection('scoutingUsers',
            ref => ref.where('uid', '==', this.user?.uid))
            .get()
            .subscribe((querySnapshot) => {
              querySnapshot.forEach((doc: any) => {
                this.user.role = doc.data().role;
                this.user.nickname = doc.data().nickname;
                this.user$.next(this.user);
                this.putUserIntoLocalStorage(this.user);
              });
            });
        }
        // this.router.navigateByUrl('/menu');
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  doUnauthenticatedLogin(): void {
    this.user = getUnauthenticatedUser();
    this.user$.next(this.user);
    this.putUserIntoLocalStorage(this.user);
  }

  doLogout(): void {
    this.user = EMPTY_USER;
    this.user$.next(this.user);
    this.removeUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): ScoutingUser {
    if (!!localStorage) {
      const storedUser = localStorage.getItem(userLocalStorageKey);
      if (!!storedUser) {
        return JSON.parse(storedUser) as ScoutingUser;
      }
    }
    return EMPTY_USER;
  }

  private putUserIntoLocalStorage(user: ScoutingUser): void {
    if (!!localStorage) {
      localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
    }
  }

  private removeUserFromLocalStorage(): void {
    if (!!localStorage) {
      localStorage.removeItem(userLocalStorageKey);
    }
  }

}
