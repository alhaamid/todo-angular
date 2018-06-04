import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { GlobalsService, firestoreUserDetails } from './../../services/globals.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  detailsSubscription: Subscription = new Subscription();
  details: firestoreUserDetails = null;

  constructor(private gs: GlobalsService, private authService: AuthService) {
    console.log("constructor called");
    this.detailsSubscription.add(this.authService.userDetails.subscribe(res => {
      this.details = res;
    }));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.detailsSubscription.unsubscribe();
    console.log("unsubcribed");
  }

}
