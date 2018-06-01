import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APPNAME: string = 'To Do'
  public LANDINGPAGE: string[] = ['dashboard']

  constructor() { }
}
