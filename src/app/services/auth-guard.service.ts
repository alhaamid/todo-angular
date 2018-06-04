import { GlobalsService } from './globals.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService, private gs: GlobalsService) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      if (this.authService.isLoggedIn()) {
        console.log("good to go");
        res(true);
      } else {
        /* adding this block makes sure that if the user didn't log out, 
        then the user won't be redirected to the login page and would be logged in behind the scenes. */
        this.authService.authState.subscribe( (user) => {
          if (user) {
            this.authService.userDetails = user;
            console.log("Authenticated in auth-guard:", this.authService.isLoggedIn());
            res(true);
          } else {
            this.authService.userDetails = null;
            console.log("Authenticated in auth-guard:", this.authService.isLoggedIn());
            console.log("navigating to login page");
            this.router.navigate(this.gs.LOGINPAGE_NAV);
            res(false);
          }
        });
      }

    })
  }
}
