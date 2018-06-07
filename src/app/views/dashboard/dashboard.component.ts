
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Note, GlobalsService, Content, ToDo } from '../../services/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  newTitle: string;
  newToDos: any[];

  /**
   * newNoteTasks should be an array such that each todo checkbox and input is bound to done and task respectively.
   * id's should be assigned to each checkbox, task and deleteTask button so array can be spliced accordingly.
   */

  constructor(private gs: GlobalsService, private as: AuthService, private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes');
    this.notes = this.notesCollection.valueChanges();

    this.resetValues();
  }

  resetValues() {
    this.newTitle = '';
    this.newToDos = [{done: false, task: '', lastDoneBy: ''}];
  }

  addTask() {
    this.newToDos.push({done: false, task: '', lastDoneBy: ''});
  }

  addNote() {
    var toDos = this.newToDos.map(obj => {
      if (obj.done) {
        return this.gs.getToDo(obj.done, obj.task, this.as.userDetails.userId);
      } else {
        return this.gs.getToDo(obj.done, obj.task, '');
      }
    });
    
    var content = this.gs.getContent(toDos);
    var note = this.gs.getNote(this.as.userDetails.userId, this.newTitle, content, [], '');
    this.afs.collection('notes').doc(note.noteId).set(note).then(__ => { this.resetValues(); });

    // this.afs.collection('notes').add({'title': this.title, 'content': this.content}); // auto-generates an Id
  }

  // updateNote() {}

  print() {
    console.log(this.newToDos);
  }

  deleteNote(id: string) {
    this.afs.doc(`notes/${id}`).delete();
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
