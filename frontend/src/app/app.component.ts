import { GlobalsService } from './services/globals.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title: string;
  // redirectPage: string[];

  constructor(public router: Router, gs: GlobalsService) {
    // this.title = gs.APPNAME;
    // this.redirectPage = gs.LANDINGPAGE_NAV;

    // router.navigate(this.redirectPage);
  }
}