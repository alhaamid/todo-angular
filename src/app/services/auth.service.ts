import { GlobalsService, firestoreUserDetails } from './globals.service';
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
  public userDetails: Observable<firestoreUserDetails>;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router, private gs: GlobalsService) {
    this.authState = afa.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.userDetails = this.afs.doc<firestoreUserDetails>(`users/${user.uid}`).valueChanges();
      } else {
        this.userDetails = of(null);
      }
    });
  }

  signInWithGoogle(nextPage) {
    this.afa.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
    .then(credential => {
      this.updateUserData(credential.user);
      if (credential.user) {
        this.userDetails = credential.user;
        console.log("Subscribed in signInWithGoogle:", this.isLoggedIn());
      } 
      else {
        this.userDetails = null;
        console.log("Subscribed in signInWithGoogle:", this.isLoggedIn());
        if (!(this.router.url === this.gs.LOGINPAGE_STR)) {
          this.router.navigate(this.gs.LOGINPAGE_NAV);
        }
      }
    })
    .then((res) => {
      console.log("navigating from login to", nextPage);
      this.router.navigate(nextPage);
    })
    .catch((err) => console.log("ERROR: " + err));
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<firestoreUserDetails> = this.afs.doc(`users/${user.uid}`);

    const data: firestoreUserDetails = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    return userRef.set(data);
  }

  isLoggedIn() {
    return this.userDetails != null;
  }
  
  logout() {
    this.userDetails = null;
    this.afa.auth.signOut()
  }
}
