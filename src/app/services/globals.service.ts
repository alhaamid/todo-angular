import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APPNAME: string = 'To Do';

  public LANDING_PAGE = new pageDetails('', '/', ['']);
  public LOGIN_PAGE = new pageDetails('login', '/login', ['login']);
  public REMINDERS_PAGE = new pageDetails('reminders', '/reminders', ['reminders']);
  public SETTINGS_PAGE = new pageDetails('settings', '/settings', ['settings']);
  public YOUR_ACCOUNT_PAGE = new pageDetails('your-account', '/your-account', ['your-account']);

  // public DEBUG: boolean = true;

  // log(...args) {
  //   if (this.DEBUG) {
  //     console.log(...args);
  //   }
  // }

  constructor() { }
}

class pageDetails {
  constructor(public STR: string, public ROUTE: string, public NAV: string[]) {}
}

export interface firestoreUserDetails {
  userId: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}