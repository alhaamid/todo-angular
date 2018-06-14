import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService, Note } from '../../services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from "@angular/animations";
import { GlobalsService } from '../../services/globals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('note', [
      transition('void <=> *', animate('1000ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
        style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0px)', offset: 1}),
      ]))),
      transition('* => void', animate('1000ms ease-out', keyframes([
        style({opacity: 1, transform: 'translateY(0px)', offset: 0}),
        style({opacity: 0.5, transform: 'translateY(-10px)', offset: 0.5}),
        style({opacity: 0, transform: 'translateY(-20px)', offset: 1}),
      ])))

      /**
       * Usage: 
       * <p [@note]='state' (click)="animatMe()"> I will animate </p>
       * animateMe() {
       *  this.state = (this.state === 'small' ? 'large' : 'small')
       * }
       */
    ]),
    // trigger('note', [ // all is name of animation, array is where different animation specific functions will reside
    //   transition('* => *', [ // any state to any state
    //     query(':enter', style({opacity: 0}), {optional: true}), // assign opacity zero to any elementts that are entering
  
    //     query(':enter', stagger("50ms", [ // stagger takes elements in dom and sets the delay for each element's animation
    //       animate('.6s ease-in', keyframes([
    //         style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
    //         style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
    //         style({opacity: 1, transform: 'translateY(0)', offset: 1})
    //       ]))
    //     ]), {optional: true}),
  
    //     query(':leave', stagger("50ms", [ // stagger takes elements in dom and sets the delay for each element's animation
    //       animate('.6s ease-in', keyframes([
    //         style({opacity: 1, transform: 'translateY(0)', offset: 0}),
    //         style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
    //         style({opacity: 0, transform: 'translateY(-20px)', offset: 1})
    //       ]))
    //     ]), {optional: true})
  
    //   ])
    // ])
  ]
})
export class DashboardComponent implements OnInit {
  titlePlaceholder: string = 'Title..';
  taskPlaceholder: string = 'Task..';

  rForm: FormGroup;
  
  newNote: Note = null;
  allNotes: Note[] = null;
  notesSub: Subscription;

  constructor(private ns: NotesService, private fb: FormBuilder, private gs: GlobalsService) {
    this.newNote = this.ns.getEmptyNote();
    this.notesSub = this.ns.notesObservable.subscribe(res => {
      if (!(this.allNotes === res)) {
        this.allNotes = res;
        if (gs.DEBUG) console.log("notes updated.", this.allNotes, res);
      }
    })

    this.rForm = fb.group({
      'titleValidation': [null, Validators.required],
    })
  }

  getNextNoteIndex() {
    let temp = 0;
    this.allNotes.map(note => {
      temp = Math.max(temp, note.noteIndex)
    });
    return temp + 1;
  }

  addNote() {
    this.newNote.noteIndex = this.getNextNoteIndex();
    this.ns.setNote(this.newNote);

    this.newNote = this.ns.getEmptyNote();
    this.rForm.reset();
  }

  deleteNote(noteIndex_: number) {
    this.ns.deleteNote(this.allNotes[noteIndex_]);
    this.allNotes.splice(noteIndex_, 0);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.notesSub.unsubscribe();
    if (this.gs.DEBUG) console.log("unsubscribed from notesObservable");
  }

}

// trigger('note', [
//   state('small', style({
//     transform: 'scale(1)'
//   })), 
//   state('large', style({
//     transform: 'scale(1.2)'
//   })),
//   transition('small => large', animate('1000ms ease-in', keyframes([
//     style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
//     style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
//   ])))

//   /**
//    * Usage: 
//    * <p [@note]='state' (click)="animatMe()"> I will animate </p>
//    * animateMe() {
//    *  this.state = (this.state === 'small' ? 'large' : 'small')
//    * }
//    */
// ]),

// animations: [
//   trigger('note', [ // all is name of animation, array is where different animation specific functions will reside
//     transition('* => *', [ // any state to any state
//       query(':enter', style({opacity: 0}), {optional: true}), // assign opacity zero to any elementts that are entering

//       query(':enter', stagger("50ms", [ // stagger takes elements in dom and sets the delay for each element's animation
//         animate('.6s ease-in', keyframes([
//           style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
//           style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
//           style({opacity: 1, transform: 'translateY(0)', offset: 1})
//         ]))
//       ]), {optional: true}),

//       query(':leave', stagger("50ms", [ // stagger takes elements in dom and sets the delay for each element's animation
//         animate('.6s ease-in', keyframes([
//           style({opacity: 1, transform: 'translateY(0)', offset: 0}),
//           style({opacity: .5, transform: 'translateY(-10px)', offset: 0.5}),
//           style({opacity: 0, transform: 'translateY(-20px)', offset: 1})
//         ]))
//       ]), {optional: true})

//     ])
//   ])
// ]

// animations: [
//   trigger('fade', [
//     transition('* => *', [
//       style({opacity: 0}),
//       animate(1000)
//     ]),

//     transition('* => void', [
//       style({opacity: 1}),
//       animate(1000, style({opacity: 0}))
//     ])
//   ])
// ]