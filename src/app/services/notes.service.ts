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
  newNote: Note = null;

  // newTitle: string;
  // newToDos: any[];

  /**
   * newNoteTasks should be an array such that each todo checkbox and input is bound to done and task respectively.
   * id's should be assigned to each checkbox, task and deleteTask button so array can be spliced accordingly.
   */

  constructor(private gs: GlobalsService, private as: AuthService, public afs: AngularFirestore) { 
    this.notesCollection = this.afs.collection<Note>(`${this.gs.NOTES_COLLECTION}`, ref => {
      return ref.where('creatorId', '==', this.as.userDetails.userId).orderBy('createdAt', 'desc');
    });
    // change ^ so only notes of current user are extracted
    this.notesObservable = this.notesCollection.valueChanges();
    this.notesObservable.subscribe(res => {
      this.allNotes = res; // do any sorting here.
      // console.log(res);
    })

    this.renewNote(); // should also be called in the dashboard constructor
  }

  renewNote() {
    this.newNote = this.getNote(this.as.userDetails.userId, '', this.getContent([this.getToDo(false, '', '')]), [], '', null);
    // this.newTitle = '';
    // this.newToDos = [{done: false, task: '', lastDoneBy: ''}];
  }

  addToDo(noteIndex_: number, toDoIndex_: number) {
    this.allNotes[noteIndex_].content.toDos.splice(toDoIndex_, 0, this.getToDo(false, '', ''));
    this.updateNote(this.allNotes[noteIndex_].noteId);
  }

  addNewToDo(toDoIndex_: number) {
    // this.newNote.content.toDos.push(this.getToDo(false, '', ''));
    this.newNote.content.toDos.splice(toDoIndex_, 0, this.getToDo(false, '', ''));
  }

  addNewNote() {
    var toDos = this.newNote.content.toDos;

    this.newNote.content.toDos = toDos.map(obj => {
      if (obj.done) {
        return this.getToDo(obj.done, obj.task, this.as.userDetails.userId);
      } else {
        return this.getToDo(obj.done, obj.task, '');
      }
    });

    this.newNote.createdAt = new Date();

    this.afs.collection(`${this.gs.NOTES_COLLECTION}`).doc(this.newNote.noteId).set(this.newNote);
    this.renewNote();

    // this.afs.collection(`${this.gs.NOTES_COLLECTION}`).add({'title': this.title, 'content': this.content}); // auto-generates an Id
  }

  updateNote(noteId_: string) {
    // console.log(this.allNotes.filter(note => note.noteId==noteId_));
    var matchingNotes = this.allNotes.filter(note => note.noteId==noteId_);
    if (matchingNotes.length === 1) {
      this.afs.collection(`${this.gs.NOTES_COLLECTION}`).doc(noteId_).set(matchingNotes[0]);
    } else {
      if (this.gs.DEBUG) console.log("Matching notes have a length of", matchingNotes.length, "which should be 1");
    }
  }

  deleteToDo(noteIndex_: number, toDoIndex_: number) {
    this.allNotes[noteIndex_].content.toDos.splice(toDoIndex_, 1);
    this.afs.collection(`${this.gs.NOTES_COLLECTION}`).doc(this.allNotes[noteIndex_].noteId).set(this.allNotes[noteIndex_]);
  }

  deleteNewToDo(toDoIndex_: number) {
    this.newNote.content.toDos.splice(toDoIndex_, 1);
  }

  deleteNote(noteId_: string) {
    this.afs.doc(`notes/${noteId_}`).delete();
  }

  getCopy(obj: any) {
    return console.log(JSON.parse(JSON.stringify(obj)));
  }

  print(...i) {
    console.log(...i);
  }

  getUniqueId() {
    return this.afs.createId();
  }

  getNote(creatorId_: string, title_: string, content_: Content, collaborators_: string[], reminderId_: string, createdAt_: Date) {
    const note: Note = {
      noteId: this.getUniqueId(),
      creatorId: creatorId_,
      title: title_,
      content: content_,
      collaborators: collaborators_,
      reminderId: reminderId_,
      createdAt: createdAt_
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
  collaborators: string[];
  reminderId: string;
  
  createdAt: Date; // for ordering. could add a node index
}

interface Content {
  contentId: string;
  toDos: ToDo[];
}

interface ToDo {
  toDoId: string;
  done: boolean;
  task: string;
  lastDoneBy: string; // userId of the latest user who did this task.
}