import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthResolveService implements Resolve<any> {
  // https://stackoverflow.com/questions/39190427/angular2-resolve-before-canactivate?rq=1

  constructor(public authService: AuthService, public router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    console.log("resolving..");
    
    return new Promise<any>((res, rej) => {
      if (this.authService.isLoggedIn()) {
        res(this.authService.userDetails);
      } else {
        res(false);
      }
    })
  }

}