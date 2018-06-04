import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APPNAME:           string = 'To Do'
  public LANDINGPAGE_NAV:   string[] = ['']
  public LOGINPAGE_NAV:     string[] = ['login']
  public LOGINPAGE_STR:     string = '/login';

  constructor() { }
}
