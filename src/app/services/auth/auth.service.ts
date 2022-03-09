import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import UserCredential = firebase.auth.UserCredential;
import { getUnauthenticatedUser } from '../../shared/anonymizer.utils';
import { BehaviorSubject } from 'rxjs';

const userLocalStorageKey = '_dbtzScoutingUser';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  authenticated: boolean;
  guest: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null;
  private user$: BehaviorSubject<User | null>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.user = this.getUserFromLocalStorage();
    this.user$ = new BehaviorSubject<User | null>(this.user);
  }

  get isLoggedIn(): boolean {
    return this.user?.authenticated || this.user?.guest || false;
  }

  get loggedInUser(): BehaviorSubject<User | null> {
    return this.user$;
  }

  doGoogleLogin(): Promise<any> {
    const provider: AuthProvider = new firebase.auth.GoogleAuthProvider();
    return this.fireAuth.signInWithPopup(provider)
      .then((cred: UserCredential) => {
        const user = {
          uid: cred.user?.uid || '',
          email: cred.user?.email || '',
          displayName: cred.user?.displayName || '',
          photoURL: cred.user?.photoURL || '',
          emailVerified: cred.user?.emailVerified || false,
          authenticated: true,
          guest: false
        };
        this.user = user;
        this.user$.next(user);
        this.putUserIntoLocalStorage(user);
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
    this.user = null;
    this.user$.next(this.user);
    this.removeUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): User | null {
    if (!!localStorage) {
      const storedUser = localStorage.getItem(userLocalStorageKey);
      if (!!storedUser) {
        return JSON.parse(storedUser) as User;
      }
    }
    return null;
  }

  private putUserIntoLocalStorage(user: User): void {
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
