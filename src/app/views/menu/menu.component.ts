import { AuthService } from './../../services/auth.service';
import { GlobalsService } from './../../services/globals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gs: GlobalsService, private authService: AuthService) { }

  ngOnInit() {
  }

}
