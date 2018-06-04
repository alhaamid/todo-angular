import { AuthService } from './../../services/auth.service';
import { firestoreUserDetails, GlobalsService } from './../../services/globals.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.css']
})
export class YourAccountComponent implements OnInit {
  detailsSubscription: Subscription = new Subscription();
  details: firestoreUserDetails = null;

  constructor(private gs: GlobalsService, private authService: AuthService) {
    console.log("constructor called");
    this.detailsSubscription.add(this.authService.userDetails.subscribe(res => {
      this.details = res;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.detailsSubscription.unsubscribe();
    console.log("unsubcribed");
  }

}
