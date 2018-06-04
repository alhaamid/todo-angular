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

  constructor(private authService: AuthService, private router: Router, private afa: AngularFireAuth) {
    console.log("loaded login. loggedin: ", authService.isLoggedIn());

    // afa.authState.subscribe(auth => {
    //   if (auth) {
    //     // console.log(auth)
    //     this.userName = auth.displayName;
    //     this.router.navigate([this.nextPage]);
    //   }
    // })
  }

  // signInWithGoogle() {
  //   this.authService.signInWithGoogle()
  //   .then((res) => {
  //       this.router.navigate([this.nextPage]);
  //       console.log("navigating from login to", this.nextPage)
  //     })
  //   .catch((err) => console.log("ERROR: " + err));
  // }

  ngOnInit() {
  }

}
