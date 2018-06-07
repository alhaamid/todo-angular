import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollection: AngularFirestoreCollection<Note> = null;
  notesObservable: Observable<Note[]> = null;

  allNotes: Note[] = null;

  newTitle: string;
  newToDos: any[];

  /**
   * newNoteTasks should be an array such that each todo checkbox and input is bound to done and task respectively.
   * id's should be assigned to each checkbox, task and deleteTask button so array can be spliced accordingly.
   */

  constructor(private gs: GlobalsService, private as: AuthService, public afs: AngularFirestore) { 
    this.notesCollection = this.afs.collection('notes');// change this so only notes of current user are extracted
    this.notesObservable = this.notesCollection.valueChanges();
    this.notesObservable.subscribe(res => {
      this.allNotes = res;
    })

    this.resetValues(); // should also be called in the dashboard constructor
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
        return this.getToDo(obj.done, obj.task, this.as.userDetails.userId);
      } else {
        return this.getToDo(obj.done, obj.task, '');
      }
    });
    var content = this.getContent(toDos);
    var note = this.getNote(this.as.userDetails.userId, this.newTitle, content, [], '');
    this.afs.collection('notes').doc(note.noteId).set(note);

    this.resetValues();

    // this.afs.collection('notes').add({'title': this.title, 'content': this.content}); // auto-generates an Id
  }

  // updateNote() {}

  print() {
    console.log(this.newTitle);
    console.log(this.newToDos);
  }

  deleteNote(id: string) {
    this.afs.doc(`notes/${id}`).delete();
  }

  getUniqueId() {
    return this.afs.createId();
  }

  getNote(creatorId_: string, title_: string, content_: Content, collaborators_?: string[], reminderId_?: string ) {
    const note: Note = {
      noteId: this.getUniqueId(),
      creatorId: creatorId_,
      title: title_,
      content: content_,
      collaborators: collaborators_,
      reminderId: reminderId_
    }
    return note;
  }

  getContent(toDos_: ToDo[]) {
    const content: Content = {
      contentId: this.getUniqueId(),
      toDos: toDos_
    }
    return content;
  }

  getToDo(done_: boolean, task_: string, lastDoneBy_: string) {
    const toDo: ToDo = {
      toDoId: this.getUniqueId(),
      done: done_,
      task: task_,
      lastDoneBy: lastDoneBy_
    }
    return toDo;
  }
}

interface Note {
  /**
   * creatorId: userId of creater
   * collaborators: array of userIds of all users with whom the creater has shared these notes.
   * reminderId: This will be the reminderId of the document in "Reminders" collection
   */
  noteId: string;
  creatorId: string;
  title: string;
  content: Content;
  collaborators?: string[];
  reminderId?: string;
}

interface Content {
  contentId: string;
  toDos: ToDo[];
}

interface ToDo {
  toDoId: string;
  done: boolean;
  task: string;
  lastDoneBy: string; // userId of the user who did this Todo last time.
}