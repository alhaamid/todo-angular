import { AuthService } from './../../services/auth.service';
import { GlobalsService } from './../../services/globals.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.css']
})
export class YourAccountComponent implements OnInit {
  detailsSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, public gs: GlobalsService) {
    this.gs.IN_PROGRESS = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
