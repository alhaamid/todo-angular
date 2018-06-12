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
  }

  addToDo(note_: Note, toDoIndex_: number, set_: boolean) {
    note_.content.toDos.splice(toDoIndex_, 0, this.getToDo(false, '', ''));
    if (set_) {
      this.setNote(note_);
    }
  }

  addNote(note_: Note) {
    note_.addedAt = firebase.firestore.FieldValue.serverTimestamp();
    note_.noteIndex = this.getNextNoteIndex();

    this.setNote(note_);
    // console.log(note_);
    // note_ = this.getEmptyNote();
    // console.log(note_);
  }

  setNote(note_: Note) {
    this.updateLastDones(note_);
    this.afs.collection(`${this.gs.NOTES_COLLECTION}`).doc(note_.noteId).set(note_);
  }

  deleteToDo(note_: Note, toDoIndex_: number, set_: boolean) {
    note_.content.toDos.splice(toDoIndex_, 1);
    if (set_) {
      this.setNote(note_);
    }
  }

  deleteNote(note_: Note) {
    this.afs.doc(`${this.gs.NOTES_COLLECTION}/${note_.noteId}`).delete();
  }

  // Utilities
  getEmptyNote(): Note {
    return this.getNote(this.as.userDetails.userId, '', this.getContent([this.getToDo(false, '', '')]), [], '');
  }

  private updateLastDones(note_: Note) {
    note_.content.toDos.map(obj => {
      if (obj.done) {
        obj.lastDoneBy = this.as.userDetails.userId;
      }
    });
  }

  private print(...i) {
    console.log(...i);
  }

  private getUniqueId() {
    return this.afs.createId();
  }

  private getNextNoteIndex() {
    return this.nextNoteIndex;
  }

  private getNote(creatorId_: string, title_: string, content_: Content, collaborators_: string[], reminderId_: string) {
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

  private getContent(toDos_: ToDo[]) {
    const content: Content = {
      contentId: this.getUniqueId(),
      toDos: toDos_
    }
    return content;
  }

  private getToDo(done_: boolean, task_: string, lastDoneBy_: string) {
    const toDo: ToDo = {
      toDoId: this.getUniqueId(),
      done: done_,
      task: task_,
      lastDoneBy: lastDoneBy_
    }
    return toDo;
  }
}

export interface Note {
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

export interface Content {
  contentId: string;
  toDos: ToDo[];
}

export interface ToDo {
  toDoId: string;
  done: boolean;
  task: string;
  lastDoneBy: string; // userId of the latest user who did this task.
}