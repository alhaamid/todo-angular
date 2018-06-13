import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { NotesService, Note } from '../../services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('note', [ // all is name of animation, array is where different animation specific functions will reside
      transition('* => *', [ // any state to any state
        // query(':enter', style({opacity: 0}), {optional: true}), // assign opacity zero to any elementts that are entering

        query(':enter', stagger("300ms", [ // stagger takes elements in dom and sets the delay for each element's animation
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true}),

        query(':leave', stagger("300ms", [ // stagger takes elements in dom and sets the delay for each element's animation
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
            style({opacity: 0, transform: 'translateY(-20px)', offset: 1})
          ]))
        ]), {optional: true})

      ])
    ])
  ]
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
