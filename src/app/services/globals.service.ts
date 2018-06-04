import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APPNAME:           string = 'To Do'
  public LANDINGPAGE_NAV:   string[] = ['']
  public LOGINPAGE_NAV:     string[] = ['login']
  public LOGINPAGE_STR:     string = '/login';

  // public DEBUG: boolean = true;

  // log(...args) {
  //   if (this.DEBUG) {
  //     console.log(...args);
  //   }
  // }

  constructor() { }
}

export interface firestoreUserDetails {
  userId: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}