import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalsService } from './globals.service';
import { Injectable } from '@angular/core';
import { AuthService, FirestoreUser } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService, private gs: GlobalsService, private afs: AngularFirestore) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.authService.isLoggedIn()) {
        this.gs.log("good to go.");
        resolve(true);
      } else {
        /* The following block makes sure that if the user didn't log out, 
        then the user won't be redirected to the login page and would be logged in behind the scene. */
        this.authService.authState.subscribe( (user) => {
          if (user) {
            this.authService.userDetailsObservable = this.afs.doc<FirestoreUser>(`${this.gs.USERS_COLLECTION}/${user.uid}`).valueChanges();
            this.authService.userDetailsObservable.subscribe(response => {
              this.authService.userDetails = response;
              this.gs.log("Authenticated in auth-guard:", this.authService.isLoggedIn(), "for", this.router.url);
              resolve(true);
            })
          } else {
            this.authService.userDetailsObservable = null;
            this.gs.log("Authenticated in auth-guard:", this.authService.isLoggedIn());
            this.gs.log("navigating to login page");
            if (!(this.router.url === this.gs.LOGIN_PAGE.ROUTE)) {
              this.router.navigate(this.gs.LOGIN_PAGE.NAV);
            }
            resolve(false);
          }
        });
      }
    })
  }
}
