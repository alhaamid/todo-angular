import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  remindersTitle: string = "Reminders";
  yourAccountTitle: string = "Account Details";
  settingsTitle: string = "Settings";

  constructor(public rs: RoutingService, public gs: GlobalsService, public authService: AuthService) { }

  ngOnInit() {
  }

}
