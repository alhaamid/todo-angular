import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthResolveService implements Resolve<any> {

  constructor(public authService: AuthService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    console.log("resolving..");
    
    return new Promise<any>((res, rej) => {
      if (this.authService.isLoggedIn()) {
        res(this.authService.userDetails);
      } else {
        res(this.authService.userDetails);
      }
    })
    // console.log("Subscribed:", this.authService.isLoggedIn());

    // if (!this.authService.isLoggedIn()) {
    //   return new Promise<User>((res, rej) => {
    //     this.authService.user.subscribe( (user) => {
    //       if (user) {
    //         this.authService.userDetails = new User(user.displayName, user.email, user.emailVerified);
    //         console.log("Subscribed:", this.authService.isLoggedIn());
    //         // this.router.navisate([''])
    //       } else {
    //         this.authService.userDetails = null;
    //         console.log("Subscribed:", this.authService.isLoggedIn());
    //         this.router.navigate(['login'])
    //       }
    //       res(this.authService.userDetails);
    //       // console.log("Subscribed:", this.authService.isLoggedIn());
    //       // return user;
    //     });
    //   })
    // } else {
    //   return false;
    // }

    // this.authService.user.subscribe( (user) => {
    //   if (user) {
    //     this.authService.userDetails = new User(user.displayName, user.email, user.emailVerified);
    //     this.router.navigate(['login'])
    //   } else {
    //     this.authService.userDetails = null;
    //     this.router.navigate(['login'])
    //   }
    //   console.log("Subscribed:", this.authService.isLoggedIn());
    //   return user;
    // });
    // return this.authService.user;
  }

}