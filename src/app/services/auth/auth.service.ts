import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// const provider = new GoogleAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userData: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // this.userData = angularFireAuth.authState;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    console.log('isloggedin?');
    return false;
    // const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  doGoogleAuth(): Promise<void> {
    return this.authorizeUser(new GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          // this.router.navigate(['somewhere']);
          console.log(res);
        }
      });
  }

  authorizeUser(provider: any): Promise<void> {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {

        // this.ngZone.run(() => {
        //   this.router.navigate(['somewhere']);
        // });
        console.log(result.user);
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     if (res) {
  //       this.router.navigate(['dashboard']);
  //     }
  //   });
  // }
  // // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // /* Sign up */
  // SignUp(email: string, password: string) {
  //   this.angularFireAuth
  //     .auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(res => {
  //       console.log('You are Successfully signed up!', res);
  //     })
  //     .catch(error => {
  //       console.log('Something is wrong:', error.message);
  //     });
  // }
  //
  // /* Sign in */
  // SignIn(email: string, password: string) {
  //   this.angularFireAuth
  //     .auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(res => {
  //       console.log('You're in!');
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });
  // }
  //
  // /* Sign out */
  // SignOut() {
  //   this.angularFireAuth
  //     .auth
  //     .signOut();
  // }

}


