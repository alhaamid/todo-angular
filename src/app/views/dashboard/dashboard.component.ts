import { AuthService } from './../../services/auth.service';
import { GlobalsService } from './../../services/globals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private gs: GlobalsService, private authService: AuthService) { 
  }

  ngOnInit() {
  }

}
