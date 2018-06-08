import { Injectable } from '@angular/core';

/**
 * normalize all calls to users/ and notes collection
 */

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

  public USERS_COLLECTION: string = 'users';
  public NOTES_COLLECTION: string = 'notes';

  public DEBUG: boolean = false;

  constructor() { }
}

class pageDetails {
  constructor(public STR: string, public ROUTE: string, public NAV: string[]) {}
}