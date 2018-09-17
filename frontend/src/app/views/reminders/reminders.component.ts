import { Component, OnInit } from '@angular/core';
import { TestingBackendService, Cat } from '../../services/testing-backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  members: Cat[] = null;

  constructor(tb: TestingBackendService) {
    tb.getAllCats().subscribe(res => {
      this.members = res;
      console.log(this.members);
    })
  }

  ngOnInit() {
  }

}
