import { GlobalsService, FirestoreUser } from './globals.service';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState: Observable<firebase.User>;
  public userDetailsObservable: Observable<FirestoreUser> = null;
  public userDetails: FirestoreUser = null;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router, private gs: GlobalsService) {
    this.authState = afa.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.userDetailsObservable = this.afs.doc<FirestoreUser>(`users/${user.uid}`).valueChanges();
        this.userDetailsObservable.subscribe(res => {
          this.userDetails = res;
        });
      } else {
        this.userDetailsObservable = null;
      }
    });
  }

  signInWithGoogle() {
    return new Promise<any> ((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      this.afa.auth.signInWithPopup(provider)
      .then(credentials => {
        this.updateUserData(credentials.user).then(__ => {
          resolve(credentials.user);
        });
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<FirestoreUser> = this.afs.doc(`users/${user.uid}`);

    const data: FirestoreUser = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    return userRef.set(data);
  }

  isLoggedIn() {
    return this.userDetailsObservable != null;
  }
  
  logout() {
    this.userDetailsObservable = null;
    this.afa.auth.signOut()
  }
}

/** old version of signInWithGoogle */
// signInWithGoogle(nextPage) {
//   this.afa.auth.signInWithPopup(
//     new firebase.auth.GoogleAuthProvider()
//   )
//   .then(credential => {
//     if (credential.user) {
//       console.log(credential.user); // how to use this????
//       this.updateUserData(credential.user)
//       .then(res => {
//         console.log("Subscribed in signInWithGoogle:", this.isLoggedIn());
//         console.log("navigating from login to", nextPage);
//         this.router.navigate(nextPage);
//       })
//       .catch((err) => console.log("ERROR: " + err));
//       // this.userDetails = credential.user;
//     } 
//     else {
//       this.userDetails = null;
//       console.log("Subscribed in signInWithGoogle:", this.isLoggedIn());
//       if (!(this.router.url === this.gs.LOGIN_PAGE.ROUTE)) {
//         this.router.navigate(this.gs.LOGIN_PAGE.NAV);
//       }
//     }
//   })
// }
