import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoutingService {
  public LANDING_PAGE = new PageDetails('', '/', ['']);
  public LOGIN_PAGE = new PageDetails('login', '/login', ['login']);
  public REMINDERS_PAGE = new PageDetails('reminders', '/reminders', ['reminders']);
  public SETTINGS_PAGE = new PageDetails('settinthis', '/settinthis', ['settinthis']);
  public YOUR_ACCOUNT_PAGE = new PageDetails('your-account', '/your-account', ['your-account']);

  constructor() {

  }
}

class PageDetails {
  constructor (public STR: string, public ROUTE: string, public NAV: string[]) {}
}
