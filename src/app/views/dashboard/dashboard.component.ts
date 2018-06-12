
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { NotesService, Note } from '../../services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  rForm: FormGroup;
  newNote: Note = null;

  constructor(private ns: NotesService, private fb: FormBuilder) {
    this.newNote = this.ns.getEmptyNote();

    this.rForm = fb.group({
      'titleValidation': [null, Validators.required],
    })
  }

  addNote() {
    this.ns.addNote(this.newNote);
    this.newNote = this.ns.getEmptyNote();
    this.rForm.reset();
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
