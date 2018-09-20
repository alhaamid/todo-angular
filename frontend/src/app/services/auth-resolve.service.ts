import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';
import { GlobalsService } from './globals.service';

@Injectable()
export class AuthResolveService implements Resolve<any> {
  // https://stackoverflow.com/questions/39190427/angular2-resolve-before-canactivate?rq=1

  constructor(private authService: AuthService, private router: Router, private gs: GlobalsService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    this.gs.log("resolving..");
    
    return new Promise<any>((res, rej) => {
      if (this.authService.isLoggedIn()) {
        res(this.authService.userDetailsObservable);
      } else {
        rej(false);
      }
    })
  }

}