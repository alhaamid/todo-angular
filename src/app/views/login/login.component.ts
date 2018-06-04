import { GlobalsService } from './../../services/globals.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  nextPage: string = '';

  constructor(private authService: AuthService, private gs: GlobalsService, private router: Router) {
    console.log("loaded login. loggedin: ", authService.isLoggedIn());
  }

  signIn() {
    // show animation for signing in
    this.authService.signInWithGoogle()
    .then(userCredentials => {
      if (userCredentials) {
        this.router.navigate(this.gs.LANDING_PAGE.NAV);
      }
    }).catch(errorMsg => {
      // show error for rejection
      this.router.navigate(this.gs.LOGIN_PAGE.NAV);
    })
  }

  ngOnInit() {
  }

}
