import { GlobalsService } from './../../services/globals.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  nextPage: string = '';

  constructor(private authService: AuthService, private gs: GlobalsService, private router: Router, private rs: RoutingService) {
    if (this.gs.DEBUG) console.log("loaded login. loggedin: ", authService.isLoggedIn());
  }

  signIn() {
    // show animation for signing in
    this.authService.signInWithGoogle()
    .then(userCredentials => {
      if (userCredentials) {
        this.router.navigate(this.rs.LANDING_PAGE.NAV);
      }
    }).catch(errorMsg => {
      // show error for rejection
      this.router.navigate(this.rs.LOGIN_PAGE.NAV);
    })
  }

  ngOnInit() {
  }

}
