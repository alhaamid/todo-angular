import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { GlobalsService } from './globals.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollection: AngularFirestoreCollection<Note> = null;
  notesObservable: Observable<Note[]> = null;

  allNotes: Note[] = null;
  newNote: Note = null;
  
  nextNoteIndex: number = 0;

  constructor(private gs: GlobalsService, private as: AuthService, public afs: AngularFirestore) { 
    this.notesCollection = this.afs.collection<Note>(`${this.gs.NOTES_COLLECTION}`, ref => {
      return ref.where('creatorId', '==', this.as.userDetails.userId).orderBy('noteIndex', 'desc');
    });
    this.notesObservable = this.notesCollection.valueChanges();
    this.notesObservable.subscribe(res => {
      this.allNotes = res;

      this.nextNoteIndex = 0;
      this.allNotes.map(note => {
        this.nextNoteIndex = Math.max(this.nextNoteIndex, note.noteIndex)
      });
      this.nextNoteIndex = this.nextNoteIndex + 1;
    })

    this.renewNote();
  }

  renewNote() {
    this.newNote = this.getNote(this.as.userDetails.userId, '', this.getContent([this.getToDo(false, '', '')]), [], '');
  }

  addToDo(noteIndex_: number, toDoIndex_: number) {
    this.allNotes[noteIndex_].content.toDos.splice(toDoIndex_, 0, this.getToDo(false, '', ''));
    this.updateNote(this.allNotes[noteIndex_].noteId); // updating note after changing it
  }

  addNewNoteToDo(toDoIndex_: number) {
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

    this.newNote.addedAt = firebase.firestore.FieldValue.serverTimestamp();
    this.newNote.noteIndex = this.getNextNoteIndex();

    this.afs.collection(`${this.gs.NOTES_COLLECTION}`).doc(this.newNote.noteId).set(this.newNote);
    this.renewNote();
  }

  updateNote(noteId_: string) {
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

  deleteNewNoteToDo(toDoIndex_: number) {
    this.newNote.content.toDos.splice(toDoIndex_, 1);
  }

  deleteNote(noteId_: string) {
    this.afs.doc(`${this.gs.NOTES_COLLECTION}/${noteId_}`).delete();
  }

  print(...i) {
    console.log(...i);
  }

  getUniqueId() {
    return this.afs.createId();
  }

  getNextNoteIndex() {
    return this.nextNoteIndex;
  }

  getNote(creatorId_: string, title_: string, content_: Content, collaborators_: string[], reminderId_: string) {
    const note: Note = {
      noteId: this.getUniqueId(),
      creatorId: creatorId_,
      title: title_,
      content: content_,
      collaborators: collaborators_,
      reminderId: reminderId_,
      addedAt: null, // this need to be updated when adding the note
      noteIndex: null // this need to be updated when adding the note
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
  
  addedAt: any; // for ordering. could add a note index
  noteIndex: number;
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

// this.afs.collection(`${this.gs.NOTES_COLLECTION}`).add({'title': this.title, 'content': this.content}); // auto-generates an Id
/**
 * M~F
 * E
 * A~
 * N
 */