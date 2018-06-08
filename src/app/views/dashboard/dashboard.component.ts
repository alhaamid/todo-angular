
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { GlobalsService } from '../../services/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /**
   * newNoteTasks should be an array such that each todo checkbox and input is bound to done and task respectively.
   * id's should be assigned to each checkbox, task and deleteTask button so array can be spliced accordingly.
   */
  titlePlaceholder: string = 'Title..';
  taskPlaceholder: string = 'Task..';

  constructor(private ns: NotesService) {
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
